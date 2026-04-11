import { motion } from 'framer-motion';
import { Smartphone, Globe, ShieldCheck, Wallet, Truck, CheckCircle } from 'lucide-react';

const steps = [
  { icon: Smartphone, title: "1. Publication", description: "L'agriculteur publie sa récolte via USSD *700#", color: "from-green-500 to-emerald-500" },
  { icon: Globe, title: "2. Consultation", description: "L'acheteur consulte les offres sur la plateforme", color: "from-blue-500 to-cyan-500" },
  { icon: ShieldCheck, title: "3. Offre & Escrow", description: "Offre et blocage de l'acompte sécurisé", color: "from-purple-500 to-pink-500" },
  { icon: Truck, title: "4. Livraison", description: "L'agriculteur livre la quantité convenue", color: "from-orange-500 to-amber-500" },
  { icon: Wallet, title: "5. Paiement", description: "L'argent est libéré automatiquement", color: "from-emerald-500 to-teal-500" },
  { icon: CheckCircle, title: "6. Réputation", description: "Évaluation mutuelle et score de confiance", color: "from-indigo-500 to-purple-500" },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Comment ça <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">marche</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            De la publication de la récolte au paiement sécurisé
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
