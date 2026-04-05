import { motion } from 'framer-motion';
import { Leaf, Handshake, Shield, ArrowRight } from 'lucide-react';

const values = [
  {
    icon: Leaf,
    title: "Agriculture Durable",
    description: "Nous accompagnons des pratiques agricoles respectueuses de l'environnement et des sols.",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Handshake,
    title: "Vente Directe",
    description: "Plus d'intermédiaires. Les agriculteurs vendent directement aux acheteurs vérifiés.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Paiement Sécurisé",
    description: "Paiement Mobile Money avec escrow. L'argent est bloqué jusqu'à livraison certifiée.",
    color: "from-purple-500 to-pink-500"
  }
];

export default function Mission() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête inspiré du Dribbble */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Fresh From Farm
            <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              to Your Table
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
            Nous connectons directement les producteurs locaux aux consommateurs,
            pour une agriculture plus juste et transparente.
          </p>
        </motion.div>

        {/* Grille des valeurs - Style Dribbble */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className="group text-center"
              >
                {/* Icône en cercle */}
                <div className="flex justify-center mb-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                
                {/* Titre */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bouton CTA central */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Rejoindre la révolution agricole
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            🌱 Déjà +500 agriculteurs et 89 acheteurs nous font confiance
          </p>
        </motion.div>
      </div>
    </section>
  );
}
