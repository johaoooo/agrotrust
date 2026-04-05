import { motion } from 'framer-motion';
import { Leaf, Handshake, Shield } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const cards = [
  {
    icon: Leaf,
    title: "Agriculture Durable",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Handshake,
    title: "Vente Directe",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Paiement Sécurisé",
    color: "from-purple-500 to-pink-500"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function ValueCards() {
  return (
    <section className="py-8 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -5 }}
                className="group text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-4">
                  {card.title}
                </h3>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
