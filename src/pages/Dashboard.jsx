import { motion } from 'framer-motion';
import { Activity, TrendingUp, Users, DollarSign } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Offres actives', value: '12', icon: Activity, color: 'from-blue-500 to-cyan-500' },
    { label: 'Contrats en cours', value: '8', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'Acheteurs intéressés', value: '24', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Volume total', value: '2.4M FCFA', icon: DollarSign, color: 'from-yellow-500 to-amber-500' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Activité récente</h2>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Nouvelle offre de maïs</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Ferme Yaka - 2 tonnes</p>
              </div>
              <span className="text-sm text-green-600 dark:text-green-400">En attente</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
