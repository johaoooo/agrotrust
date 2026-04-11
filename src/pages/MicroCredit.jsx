import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, ArrowRight, ChevronRight, ChevronLeft,
  DollarSign, Calendar, User, Phone, Mail, FileText,
  CheckCircle, Wallet, TrendingUp, Clock
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MicroCredit() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    montant: '',
    duree: '',
    nom: '',
    telephone: '',
    email: '',
    projet: ''
  });
  const [simulationResult, setSimulationResult] = useState(null);

  const montants = [50000, 100000, 250000, 500000, 750000, 1000000];
  const durees = [3, 6, 9, 12, 18, 24];

  // Calcul automatique
  useEffect(() => {
    if (formData.montant && formData.duree) {
      const taux = 0.05;
      const mensualite = (formData.montant * (1 + taux * (formData.duree / 12))) / formData.duree;
      setSimulationResult({
        mensualite: Math.round(mensualite),
        total: Math.round(mensualite * formData.duree),
        interets: Math.round(mensualite * formData.duree - formData.montant)
      });
    }
  }, [formData.montant, formData.duree]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    alert("✅ Demande envoyée ! Un conseiller vous contactera sous 48h.");
    // Reset form
    setStep(1);
    setFormData({ montant: '', duree: '', nom: '', telephone: '', email: '', projet: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* En-tête simplifié */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg mb-4 mx-auto">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Micro-crédit Agricole
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
            Simulez votre prêt en 3 étapes
          </p>
        </motion.div>

        {/* Indicateur de progression */}
        <div className="flex justify-between items-center mb-8 px-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step >= s 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}>
                {step > s ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              {s < 3 && (
                <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                  step > s ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Formulaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {/* Étape 1: Montant et durée */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      Montant (FCFA)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {montants.map((m) => (
                        <button
                          key={m}
                          onClick={() => setFormData({ ...formData, montant: m })}
                          className={`p-3 rounded-xl text-center transition-all duration-200 ${
                            formData.montant === m
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          <span className="font-medium text-sm">{m.toLocaleString()} FCFA</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      Durée (mois)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {durees.map((d) => (
                        <button
                          key={d}
                          onClick={() => setFormData({ ...formData, duree: d })}
                          className={`p-3 rounded-xl text-center transition-all duration-200 ${
                            formData.duree === d
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          <span className="font-medium">{d} mois</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={nextStep}
                    disabled={!formData.montant || !formData.duree}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                  >
                    Continuer
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}

              {/* Étape 2: Résultat simulation */}
              {step === 2 && simulationResult && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-700/50 dark:to-gray-700/50 rounded-xl p-5">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-center mb-4">
                      Résultat de la simulation
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-600">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Montant emprunté</span>
                        <span className="font-bold text-emerald-600">{formData.montant.toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-600">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Durée</span>
                        <span className="font-bold text-blue-600">{formData.duree} mois</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-600">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Mensualité</span>
                        <span className="text-xl font-bold text-emerald-600">{simulationResult.mensualite.toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-600">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Total à rembourser</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{simulationResult.total.toLocaleString()} FCFA</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">Intérêts</span>
                        <span className="font-medium text-orange-600">{simulationResult.interets.toLocaleString()} FCFA</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={prevStep}
                      className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      Retour
                    </button>
                    <button
                      onClick={nextStep}
                      className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg transition flex items-center justify-center gap-2"
                    >
                      Continuer
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Étape 3: Formulaire contact */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-600" />
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Jean Agriculteur"
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      placeholder="+229 01 23 45 67"
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-emerald-600" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jean@agrotrust.com"
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-emerald-600" />
                      Projet
                    </label>
                    <textarea
                      name="projet"
                      value={formData.projet}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Décrivez votre projet..."
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={prevStep}
                      className="flex-1 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!formData.nom || !formData.telephone || !formData.projet}
                      className="flex-1 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition"
                    >
                      Envoyer
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Taux d'intérêt indicatif */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
            <TrendingUp className="w-3 h-3" />
            Taux d'intérêt à partir de 5% par an
            <Clock className="w-3 h-3 ml-2" />
            Réponse sous 48h
          </p>
        </div>
      </div>
    </div>
  );
}
