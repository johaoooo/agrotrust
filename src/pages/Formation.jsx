import { motion } from 'framer-motion';
import { useState } from 'react';
import { GraduationCap, Video, BookOpen, Users, Award, Clock, Play, CheckCircle, Lock, ArrowRight } from 'lucide-react';

export default function Formation() {
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const formations = [
    { id: 1, title: "Agriculture durable", duration: "2h", level: "Débutant", icon: BookOpen, color: "from-green-500 to-emerald-600" },
    { id: 2, title: "Gestion des récoltes", duration: "1.5h", level: "Intermédiaire", icon: Video, color: "from-blue-500 to-cyan-600" },
    { id: 3, title: "Marketing agricole", duration: "3h", level: "Avancé", icon: Users, color: "from-purple-500 to-pink-600" },
    { id: 4, title: "Certification bio", duration: "4h", level: "Expert", icon: Award, color: "from-amber-500 to-orange-600" },
  ];

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
      setSelectedFormation(null);
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
            <GraduationCap className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs font-semibold text-green-700 dark:text-green-400">Formation</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Formations agricoles</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Devenez un expert en agriculture</p>
        </div>

        {/* Liste des formations */}
        <div className="space-y-3 mb-6">
          {formations.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${f.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{f.title}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" />{f.duration}</span>
                        <span className="text-xs text-gray-500">{f.level}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setSelectedFormation(f)} className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition flex items-center gap-1">
                    <Play className="w-3 h-3" /> Suivre
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal d'inscription */}
        {selectedFormation && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-sm w-full shadow-2xl overflow-hidden">
              <div className={`bg-gradient-to-r ${selectedFormation.color} px-5 py-3`}>
                <h3 className="text-white font-semibold">Inscription</h3>
                <p className="text-white/80 text-sm">{selectedFormation.title}</p>
              </div>
              <div className="p-5">
                {success ? (
                  <div className="text-center py-4">
                    <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-2" />
                    <p className="font-semibold">Inscription réussie !</p>
                    <p className="text-sm text-gray-500">Un lien vous a été envoyé par email.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text" name="name" placeholder="Nom complet" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700" />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700" />
                    <div className="flex gap-2 pt-2">
                      <button type="button" onClick={() => setSelectedFormation(null)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">Annuler</button>
                      <button type="submit" disabled={loading} className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-1">
                        {loading ? 'Envoi...' : 'S\'inscrire'} <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Sécurisé */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3 text-green-600 dark:text-green-400" />
          <span>Certificats reconnus à la fin de chaque formation</span>
        </div>
      </div>
    </motion.div>
  );
}
