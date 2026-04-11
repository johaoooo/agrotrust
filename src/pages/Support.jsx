import { motion } from 'framer-motion';
import { useState } from 'react';
import { Headphones, Mail, Clock, FileText, MessageCircle, Phone, ChevronRight, Send, CheckCircle, Lock, HelpCircle, BookOpen, Video } from 'lucide-react';

export default function Support() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  const faqs = [
    { q: "Comment passer une commande ?", a: "Connectez-vous, parcourez les offres et cliquez sur 'Faire offre'." },
    { q: "Comment suivre ma commande ?", a: "Rendez-vous dans 'Mes commandes' pour voir l'état de votre commande." },
    { q: "Comment contacter un agriculteur ?", a: "Utilisez notre système de messagerie intégré après commande." },
    { q: "Que faire en cas de litige ?", a: "Contactez notre support via le formulaire ci-dessous." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full mb-3">
            <Headphones className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs font-semibold text-green-700 dark:text-green-400">Support</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Comment pouvons-nous vous aider ?</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Une question ? Notre équipe est là pour vous répondre</p>
        </div>

        {/* Cartes d'info - corrigées pour le mode sombre */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Headphones className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="font-semibold text-sm text-gray-900 dark:text-white">Support 24/7</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">7j/7</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="font-semibold text-sm text-gray-900 dark:text-white">Réponse rapide</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Sous 24h</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="font-semibold text-sm text-gray-900 dark:text-white">Téléphone</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">+229 01 23 45 67</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="font-semibold text-sm text-gray-900 dark:text-white">Email</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">support@glebge.com</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulaire de contact */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700 px-5 py-3 bg-gray-50 dark:bg-gray-800/50">
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-green-600" />
                Envoyez-nous un message
              </h2>
            </div>
            <div className="p-5">
              {success ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900 dark:text-white">Message envoyé !</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Nous vous répondrons sous 24h.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input type="text" name="name" placeholder="Nom complet" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
                  <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
                  <input type="text" name="subject" placeholder="Sujet" value={formData.subject} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
                  <textarea name="message" placeholder="Message" rows="3" value={formData.message} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"></textarea>
                  <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-1">
                    {loading ? 'Envoi...' : 'Envoyer le message'}
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700 px-5 py-3 bg-gray-50 dark:bg-gray-800/50">
              <h2 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-green-600" />
                Questions fréquentes
              </h2>
            </div>
            <div className="p-4 space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0">
                  <p className="font-medium text-sm text-gray-900 dark:text-white">{faq.q}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{faq.a}</p>
                </div>
              ))}
              <div className="mt-2 pt-2 text-center">
                <button className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center justify-center gap-1">
                  Voir toutes les FAQs <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ressources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"><BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" /></div>
            <div><p className="text-sm font-medium text-gray-900 dark:text-white">Guide de l'utilisateur</p><p className="text-xs text-gray-500 dark:text-gray-400">Documentation complète</p></div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center"><Video className="w-4 h-4 text-blue-600 dark:text-blue-400" /></div>
            <div><p className="text-sm font-medium text-gray-900 dark:text-white">Tutoriels vidéo</p><p className="text-xs text-gray-500 dark:text-gray-400">Formation pas à pas</p></div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-center gap-3 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center"><FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" /></div>
            <div><p className="text-sm font-medium text-gray-900 dark:text-white">Centre d'aide</p><p className="text-xs text-gray-500 dark:text-gray-400">Articles et FAQ</p></div>
          </div>
        </div>

        {/* Sécurisé */}
        <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3 text-green-600 dark:text-green-400" />
          <span>Support client disponible 7j/7</span>
        </div>
      </div>
    </motion.div>
  );
}
