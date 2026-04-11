import { motion } from 'framer-motion';
import { useState } from 'react';
import { Users, MessageCircle, Calendar, Heart, Share2, UserPlus, ArrowRight, Lock, Sparkles, CheckCircle } from 'lucide-react';

export default function Communaute() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
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
      setFormData({ name: '', email: '' });
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
    >
      <div className="max-w-lg mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full mb-3">
            <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs font-semibold text-green-700 dark:text-green-400">Communauté</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Rejoignez la communauté</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Échangez et partagez avec d'autres agriculteurs</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <Users className="w-5 h-5 text-green-600 dark:text-green-400 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900 dark:text-white">500+</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Membres</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <MessageCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900 dark:text-white">1.2k+</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Messages</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
            <p className="text-lg font-bold text-gray-900 dark:text-white">45</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Événements</p>
          </div>
        </div>

        {/* Forum */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-5">
          <div className="border-b border-gray-200 dark:border-gray-700 px-5 py-3 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              Forum d'échange
            </h2>
            <button className="text-xs text-green-600 dark:text-green-400 hover:text-green-700">Voir tout →</button>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-sm">👨‍🌾</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Jean K.</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Comment améliorer mon rendement de maïs ?</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Il y a 2h • 5 réponses</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-sm">👩‍🌾</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Ami A.</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Quel engrais choisir pour la tomate ?</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Hier • 12 réponses</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-sm">👨‍🔬</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Dr. Adjei</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Conseils pour l'irrigation en saison sèche</p>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Hier • 8 réponses</p>
              </div>
            </div>
          </div>
        </div>

        {/* Prochains événements */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-5">
          <div className="border-b border-gray-200 dark:border-gray-700 px-5 py-3 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
            <h2 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
              Événements à venir
            </h2>
            <button className="text-xs text-green-600 dark:text-green-400 hover:text-green-700">Voir tout →</button>
          </div>
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-center text-xs font-bold text-gray-900 dark:text-white">15<br/>Avr</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Atelier sur les semences bio</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">En ligne • 15h00</p>
              </div>
              <button className="text-xs text-green-600 dark:text-green-400 hover:text-green-700">S'inscrire</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-center text-xs font-bold text-gray-900 dark:text-white">22<br/>Avr</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Formation agriculture durable</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Cotonou • 9h00</p>
              </div>
              <button className="text-xs text-green-600 dark:text-green-400 hover:text-green-700">S'inscrire</button>
            </div>
          </div>
        </div>

        {/* Rejoindre */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-5 text-white text-center">
          <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-90" />
          <h3 className="font-bold text-lg mb-1">Rejoignez la communauté</h3>
          <p className="text-sm text-green-100 mb-4">Échangez avec 500+ agriculteurs</p>
          
          {success ? (
            <div className="bg-white/20 rounded-lg py-2">
              <CheckCircle className="w-5 h-5 mx-auto mb-1 text-white" />
              <p className="text-sm text-white">Inscription réussie !</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              <input type="text" name="name" placeholder="Votre nom" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg text-gray-800 dark:text-gray-900 text-sm placeholder-gray-500" />
              <input type="email" name="email" placeholder="Votre email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 rounded-lg text-gray-800 dark:text-gray-900 text-sm placeholder-gray-500" />
              <button type="submit" disabled={loading} className="w-full bg-white text-green-700 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition disabled:opacity-50 flex items-center justify-center gap-1">
                {loading ? 'Envoi...' : 'Rejoindre'}
                <UserPlus className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Sécurisé */}
        <div className="mt-5 text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3 text-green-600 dark:text-green-400" />
          <span>Rejoignez une communauté active et bienveillante</span>
        </div>
      </div>
    </motion.div>
  );
}
