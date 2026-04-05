import { motion } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-3">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-green-700 dark:text-green-400"
        >
          🌱 AgroTrust
        </motion.div>
        <div className="space-x-4 text-gray-600 dark:text-gray-300">
          <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition">Dashboard</a>
          <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition">Offres</a>
          <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition">Contrats</a>
          <a href="#" className="hover:text-green-600 dark:hover:text-green-400 transition">Mon Compte</a>
        </div>
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            Acheteur: Restaurant X
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
