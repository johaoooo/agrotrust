import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Users, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:8000/api';

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      fetchConversations();
    }
  }, [isAuthenticated, isOpen]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const response = await fetch(`${API_URL}/chat/conversations/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      const data = await response.json();
      setConversations(data);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/chat/messages/?with=${selectedUser.id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      const data = await response.json();
      setMessages(data);
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(`${API_URL}/chat/messages/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          receiver: selectedUser.id,
          message: newMessage
        })
      });
      const data = await response.json();
      setMessages([...messages, data]);
      setNewMessage('');
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Fenêtre de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* En-tête */}
            <div className="px-4 py-3 bg-green-600 text-white flex justify-between items-center">
              <span className="font-semibold">Messages</span>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenu */}
            {!selectedUser ? (
              // Liste des conversations
              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">Aucune conversation</div>
                ) : (
                  conversations.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedUser(conv)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition border-b border-gray-100 dark:border-gray-700"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm">{conv.username}</p>
                        <p className="text-xs text-gray-500">{conv.role === 'agriculteur' ? '👨‍🌾 Agriculteur' : '🏪 Acheteur'}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            ) : (
              // Vue des messages
              <>
                <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 flex items-center gap-2">
                  <button onClick={() => setSelectedUser(null)} className="text-gray-600 dark:text-gray-300">←</button>
                  <span className="font-medium text-sm">{selectedUser.username}</span>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {loading ? (
                    <div className="text-center py-4 text-gray-500">Chargement...</div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">Aucun message</div>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === user?.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] p-2 rounded-lg text-sm ${msg.sender === user?.id ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'}`}>
                          {msg.message}
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <form onSubmit={sendMessage} className="p-2 border-t border-gray-200 dark:border-gray-700 flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Écrivez un message..."
                    className="flex-1 px-3 py-1.5 text-sm border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                  <button type="submit" className="bg-green-600 text-white p-1.5 rounded-lg hover:bg-green-700">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
