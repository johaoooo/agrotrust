import { motion } from 'framer-motion';
import { DollarSign, Users, GraduationCap, TrendingUp, Shield, Truck } from 'lucide-react';

const cards = [
  {
    icon: DollarSign,
    title: "Micro-crédit",
    description: "Accédez à des prêts adaptés aux agriculteurs avec des taux préférentiels",
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-50 dark:bg-green-900/20"
  },
  {
    icon: Users,
    title: "Mise en relation",
    description: "Connectez-vous directement avec les acheteurs et vendez à meilleur prix",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-900/20"
  },
  {
    icon: GraduationCap,
    title: "Formations",
    description: "Apprenez les meilleures pratiques agricoles et techniques modernes",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-50 dark:bg-purple-900/20"
  },
  {
    icon: TrendingUp,
    title: "Marché garanti",
    description: "Vendez vos produits à des prix justes sans intermédiaires",
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50 dark:bg-orange-900/20"
  },
  {
    icon: Shield,
    title: "Assurance récolte",
    description: "Protégez vos cultures contre les aléas climatiques",
    color: "from-teal-500 to-green-500",
    bg: "bg-teal-50 dark:bg-teal-900/20"
  },
  {
    icon: Truck,
    title: "Logistique",
    description: "Service de transport pour acheminer vos produits",
    color: "from-indigo-500 to-purple-500",
    bg: "bg-indigo-50 dark:bg-indigo-900/20"
  }
];

export default function ValueCards() {
  return (
    <div className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Pourquoi choisir{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              AgroTrust
            </span>
            ?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Une solution complète pour transformer l'agriculture au Bénin
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`}></div>
              <div className="p-6">
                <div className={`w-14 h-14 ${card.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className={`w-7 h-7 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
