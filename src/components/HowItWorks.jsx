import { motion } from 'framer-motion';
import { Smartphone, Globe, ShieldCheck, Wallet, Truck, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Smartphone,
    title: "1. Publication",
    description: "L'agriculteur publie sa récolte future via USSD *700#",
    color: "from-green-500 to-emerald-500",
    details: "Sans internet, juste un téléphone"
  },
  {
    icon: Globe,
    title: "2. Consultation",
    description: "L'acheteur consulte les offres sur la plateforme web",
    color: "from-blue-500 to-cyan-500",
    details: "Filtres par culture, région, quantité"
  },
  {
    icon: ShieldCheck,
    title: "3. Offre & Escrow",
    description: "L'acheteur fait une offre et bloque l'acompte",
    color: "from-purple-500 to-pink-500",
    details: "Paiement sécurisé Mobile Money"
  },
  {
    icon: Truck,
    title: "4. Livraison",
    description: "L'agriculteur livre la quantité convenue",
    color: "from-orange-500 to-amber-500",
    details: "Agent terrain certifie sur place"
  },
  {
    icon: Wallet,
    title: "5. Paiement",
    description: "L'argent est libéré automatiquement",
    color: "from-emerald-500 to-teal-500",
    details: "Virement direct sur Mobile Money"
  },
  {
    icon: CheckCircle,
    title: "6. Réputation",
    description: "Les deux parties s'évaluent mutuellement",
    color: "from-indigo-500 to-purple-500",
    details: "Score de confiance visible"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Comment ça <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">marche</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            De la publication de la récolte au paiement sécurisé, tout est transparent
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">{step.details}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Ligne de connexion entre les étapes (décorative) */}
        <div className="hidden lg:block relative mt-8">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 transform -translate-y-1/2 opacity-20"></div>
        </div>
      </div>
    </section>
  );
}
