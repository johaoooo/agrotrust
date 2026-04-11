import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Phone, Mail, MapPin, Send, 
  MessageCircle, CheckCircle, AlertCircle,
  ChevronDown, ChevronUp
} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom || !formData.email || !formData.message) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    setSubmitted(true);
    setError('');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ nom: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full mb-3">
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-600">Contact</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Écrivez-nous
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            Une question ? Notre équipe vous répond rapidement
          </p>
        </div>

        {/* Formulaire compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="p-5">
              
              {submitted && (
                <div className="mb-4 p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <p className="text-emerald-700 dark:text-emerald-300 text-xs">Message envoyé !</p>
                </div>
              )}
              
              {error && (
                <div className="mb-4 p-2.5 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <p className="text-red-700 dark:text-red-300 text-xs">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Votre nom *"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Votre email *"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Votre message *"
                    className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-medium text-sm hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Bouton déplier */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            {isInfoOpen ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                Masquer les coordonnées
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                Voir nos coordonnées
              </>
            )}
          </button>
        </div>

        {/* Informations dépliables */}
        {isInfoOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-5"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700">
                
                <div className="p-4 text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Téléphone</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">+229 01 23 45 67</p>
                  <p className="text-xs text-gray-400 mt-1">Lun-Ven, 8h-18h</p>
                </div>

                <div className="p-4 text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">contact@glebge.com</p>
                  <p className="text-xs text-gray-400 mt-1">Réponse sous 24h</p>
                </div>

                <div className="p-4 text-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Adresse</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Cotonou, Bénin</p>
                  <p className="text-xs text-gray-400 mt-1">Lun-Ven</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
