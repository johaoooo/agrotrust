import { motion } from 'framer-motion';
import { 
  Filter, 
  Shield, 
  CloudRain, 
  TrendingUp, 
  CreditCard, 
  Building2,
  ChevronRight,
  Wallet,
  Award
} from 'lucide-react';

export default function Sidebar({ setSelectedCrop, setSelectedRegion }) {
  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      {/* Filtres - avec icône professionnelle */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-green-600 dark:text-green-400" />
          <h3 className="font-bold text-gray-900 dark:text-white">Filtres</h3>
        </div>
        
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Culture</label>
        <select 
          onChange={(e) => setSelectedCrop(e.target.value)} 
          className="w-full border dark:border-gray-600 p-2 rounded-lg mb-3 focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="all">Toutes cultures</option>
          <option value="Maïs">🌽 Maïs</option>
          <option value="Tomate">🍅 Tomate</option>
          <option value="Igname">🍠 Igname</option>
          <option value="Manioc">🌿 Manioc</option>
          <option value="Anacarde">🥜 Anacarde</option>
        </select>
        
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Région</label>
        <select 
          onChange={(e) => setSelectedRegion(e.target.value)} 
          className="w-full border dark:border-gray-600 p-2 rounded-lg focus:ring-green-500 focus:border-green-500 bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="all">Toutes régions</option>
          <option value="Zou">Zou</option>
          <option value="Collines">Collines</option>
          <option value="Borgou">Borgou</option>
        </select>
      </div>

      {/* Escrow sécurisé */}
      <motion.div 
        whileHover={{ x: 5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border-l-4 border-green-500"
      >
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
          <h3 className="font-bold text-gray-900 dark:text-white">Escrow sécurisé</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Acompte bloqué KKiaPay<br />
          Libéré à livraison terrain
        </p>
      </motion.div>

      {/* Prédiction IA */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <CloudRain className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-bold text-gray-900 dark:text-white">Prédiction IA (Open-Meteo)</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Rendement estimé maïs : 2.4 t/ha<br />
          Risque pluie : faible<br />
          Température moyenne : 28°C
        </p>
      </motion.div>

      {/* Score de confiance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <h3 className="font-bold text-gray-900 dark:text-white">Score de confiance</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Agriculteur moyen : 4.7/5<br />
          Basé sur 120 livraisons<br />
          🔒 Vérifié par agent terrain
        </p>
      </div>

      {/* Micro-crédit */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border-t-4 border-yellow-500"
      >
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <h3 className="font-bold text-gray-900 dark:text-white">Micro-crédit disponible</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          Sur contrat signé – avance jusqu'à 500 000 FCFA<br />
          Taux : 5-8% remboursable à livraison
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-green-900 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-amber-600 transition"
        >
          Demander une avance →
        </motion.button>
      </motion.div>

      {/* Partenaires */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h3 className="font-bold text-gray-900 dark:text-white">Partenaires</h3>
        </div>
        <div className="flex gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1"><Wallet className="w-3 h-3" /> MTN MoMo</span>
          <span>•</span>
          <span>Moov</span>
          <span>•</span>
          <span>Orange Money</span>
        </div>
      </div>
    </motion.div>
  );
}
