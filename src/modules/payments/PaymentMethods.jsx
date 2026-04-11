import { motion } from 'framer-motion';
import { useState } from 'react';
import { Smartphone, CreditCard, Wallet, Shield, CheckCircle, Lock, ArrowRight, Phone, Building2 } from 'lucide-react';

export default function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState('momo');

  const methods = [
    { id: 'momo', name: 'Mobile Money', icon: Smartphone, color: 'from-green-500 to-emerald-600', description: 'Paiement via MTN MoMo, Moov, Orange Money' },
    { id: 'card', name: 'Carte bancaire', icon: CreditCard, color: 'from-blue-500 to-cyan-600', description: 'Visa, Mastercard' },
    { id: 'bank', name: 'Virement bancaire', icon: Building2, color: 'from-purple-500 to-pink-600', description: 'Transfert direct' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
    >
      <div className="max-w-2xl mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full mb-3">
            <Wallet className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs font-semibold text-green-700 dark:text-green-400">Paiement sécurisé</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Modes de paiement</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Choisissez votre méthode de paiement préférée</p>
        </div>

        {/* Options de paiement */}
        <div className="space-y-3 mb-6">
          {methods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            return (
              <div
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`bg-white dark:bg-gray-800 rounded-xl p-4 border-2 cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-green-500 shadow-md' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{method.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{method.description}</p>
                  </div>
                  {isSelected && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Carte sécurisée */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-5 text-white text-center mb-6">
          <Shield className="w-10 h-10 mx-auto mb-3 opacity-90" />
          <h3 className="font-bold text-lg mb-1">Paiement 100% sécurisé</h3>
          <p className="text-sm text-green-100 mb-3">Système d'escrow - Argent bloqué jusqu'à livraison</p>
          <div className="flex justify-center gap-4 text-xs text-green-200">
            <span>✓ Sans frais cachés</span>
            <span>✓ Protection acheteur</span>
            <span>✓ Garantie livraison</span>
          </div>
        </div>

        {/* Bouton de paiement */}
        <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition shadow-md flex items-center justify-center gap-2">
          Payer avec {methods.find(m => m.id === selectedMethod)?.name}
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Sécurisé */}
        <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3 text-green-600" />
          <span>Transactions sécurisées par cryptage SSL</span>
        </div>
      </div>
    </motion.div>
  );
}
