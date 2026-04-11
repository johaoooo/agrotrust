import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, MessageCircle, Share2, ThumbsUp, 
  MapPin, Clock, HelpCircle, Plus, Send, X,
  Phone, Mail, User, Send as SendIcon, CheckCircle
} from 'lucide-react';
import { useState } from 'react';

export default function Entraide() {
  const [activeTab, setActiveTab] = useState('demandes');
  const [showForm, setShowForm] = useState(false);
  const [showAideModal, setShowAideModal] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const [messageSent, setMessageSent] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', description: '', region: '' });
  const [aideMessage, setAideMessage] = useState('');

  const [demandes, setDemandes] = useState([
    { id: 1, title: "Recherche semences de maïs", description: "Je cherche des semences de maïs de qualité pour la saison prochaine.", auteur: "Jean K.", region: "Zou", date: "Aujourd'hui", likes: 12, reponses: 5, contact: "jean.k@agrotrust.bj", phone: "+229 01 23 45 67" },
    { id: 2, title: "Prêt de matériel agricole", description: "Besoin d'un tracteur pour labourer 5 hectares.", auteur: "Marie S.", region: "Collines", date: "Hier", likes: 8, reponses: 3, contact: "marie.s@agrotrust.bj", phone: "+229 98 76 54 32" },
    { id: 3, title: "Conseils antiparasitaires", description: "Mes tomates sont attaquées, besoin de conseils naturels.", auteur: "Paul D.", region: "Atlantique", date: "Il y a 2 jours", likes: 15, reponses: 7, contact: "paul.d@agrotrust.bj", phone: "+229 12 34 56 78" },
  ]);

  const [offres, setOffres] = useState([
    { id: 1, title: "Don de plants de tomates", description: "J'ai des plants de tomates en surplus à donner.", auteur: "Amadou K.", region: "Ouémé", date: "Aujourd'hui", likes: 10, reponses: 4, contact: "amadou.k@agrotrust.bj", phone: "+229 23 45 67 89" },
    { id: 2, title: "Formation gratuite", description: "Cours sur les techniques de compostage ce samedi.", auteur: "Expert Agricole", region: "En ligne", date: "Hier", likes: 20, reponses: 12, contact: "expert@agrotrust.bj", phone: "+229 34 56 78 90" },
  ]);

  const handleLike = (id, type) => {
    const key = `${type}-${id}`;
    if (likedPosts.includes(key)) {
      setLikedPosts(likedPosts.filter(p => p !== key));
      if (type === 'demande') {
        setDemandes(demandes.map(d => d.id === id ? { ...d, likes: d.likes - 1 } : d));
      } else {
        setOffres(offres.map(o => o.id === id ? { ...o, likes: o.likes - 1 } : o));
      }
    } else {
      setLikedPosts([...likedPosts, key]);
      if (type === 'demande') {
        setDemandes(demandes.map(d => d.id === id ? { ...d, likes: d.likes + 1 } : d));
      } else {
        setOffres(offres.map(o => o.id === id ? { ...o, likes: o.likes + 1 } : o));
      }
    }
  };

  const handleAddPost = () => {
    if (!newPost.title || !newPost.description || !newPost.region) return;
    
    const post = {
      id: Date.now(),
      title: newPost.title,
      description: newPost.description,
      auteur: "Vous",
      region: newPost.region,
      date: "À l'instant",
      likes: 0,
      reponses: 0,
      contact: "votre@email.com",
      phone: "+229 XX XX XX XX"
    };

    if (activeTab === 'demandes') {
      setDemandes([post, ...demandes]);
    } else {
      setOffres([post, ...offres]);
    }
    
    setNewPost({ title: '', description: '', region: '' });
    setShowForm(false);
  };

  const handleSendMessage = () => {
    if (aideMessage.trim()) {
      setMessageSent(true);
      setTimeout(() => {
        setMessageSent(false);
        setShowAideModal(null);
        setAideMessage('');
      }, 2000);
    }
  };

  const currentItems = activeTab === 'demandes' ? demandes : offres;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 px-4 py-2 rounded-full mb-4">
            <Heart className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Entraide Agricole</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Forum d'entraide
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Échangez avec la communauté agricole
          </p>
        </div>

        {/* Onglets */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-6">
          <button
            onClick={() => setActiveTab('demandes')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              activeTab === 'demandes'
                ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            🙏 Demandes ({demandes.length})
          </button>
          <button
            onClick={() => setActiveTab('offres')}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
              activeTab === 'offres'
                ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            🎁 Offres ({offres.length})
          </button>
        </div>

        {/* Bouton publier */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full mb-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Publier une {activeTab === 'demandes' ? 'demande' : 'offre'}
        </button>

        {/* Formulaire */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-200 dark:border-gray-700 mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Nouvelle {activeTab === 'demandes' ? 'demande' : 'offre'}
                </h3>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Titre"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Description"
                  rows={3}
                  value={newPost.description}
                  onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <select
                  value={newPost.region}
                  onChange={(e) => setNewPost({ ...newPost, region: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Sélectionner une région</option>
                  <option value="Zou">Zou</option>
                  <option value="Collines">Collines</option>
                  <option value="Atlantique">Atlantique</option>
                  <option value="Borgou">Borgou</option>
                  <option value="Ouémé">Ouémé</option>
                  <option value="En ligne">En ligne</option>
                </select>
                <button
                  onClick={handleAddPost}
                  disabled={!newPost.title || !newPost.description || !newPost.region}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium disabled:opacity-50 transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Publier
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Liste des publications */}
        <div className="space-y-4">
          {currentItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">{item.auteur.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.auteur}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.region}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleLike(item.id, activeTab === 'demandes' ? 'demande' : 'offre')}
                      className={`flex items-center gap-1 text-sm transition ${
                        likedPosts.includes(`${activeTab === 'demandes' ? 'demande' : 'offre'}-${item.id}`)
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{item.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                      <MessageCircle className="w-4 h-4" />
                      <span>{item.reponses}</span>
                    </button>
                    <button 
                      onClick={() => setShowAideModal(item)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition ml-auto"
                    >
                      {activeTab === 'demandes' ? 'Aider' : 'Contacter'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {currentItems.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
              <Heart className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">Aucune publication</p>
              <button onClick={() => setShowForm(true)} className="mt-3 text-emerald-600 dark:text-emerald-400 text-sm">
                Publier la première →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal Aider / Contacter */}
      <AnimatePresence>
        {showAideModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAideModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {messageSent ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message envoyé !</h3>
                  <p className="text-gray-600 dark:text-gray-400">L'agriculteur vous répondra dans les plus brefs délais.</p>
                  <button
                    onClick={() => setShowAideModal(null)}
                    className="mt-6 px-6 py-2 bg-emerald-600 text-white rounded-lg"
                  >
                    Fermer
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {activeTab === 'demandes' ? 'Aider' : 'Contacter'} {showAideModal.auteur}
                    </h3>
                    <button
                      onClick={() => setShowAideModal(null)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">📝 {showAideModal.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{showAideModal.description}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Votre message
                      </label>
                      <textarea
                        value={aideMessage}
                        onChange={(e) => setAideMessage(e.target.value)}
                        rows={4}
                        placeholder={activeTab === 'demandes' 
                          ? "Décrivez comment vous pouvez aider..." 
                          : "Expliquez votre intérêt pour cette offre..."}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowAideModal(null)}
                        className="flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleSendMessage}
                        disabled={!aideMessage.trim()}
                        className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium disabled:opacity-50 transition flex items-center justify-center gap-2"
                      >
                        <SendIcon className="w-4 h-4" />
                        Envoyer
                      </button>
                    </div>

                    <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                      <p>Ou contactez directement :</p>
                      <p className="mt-1">
                        📧 {showAideModal.contact} | 📞 {showAideModal.phone}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
