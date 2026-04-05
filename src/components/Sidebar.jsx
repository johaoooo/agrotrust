import { motion } from 'framer-motion';

export default function Sidebar({ setSelectedCrop, setSelectedRegion }) {
  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="space-y-6"
    >
      {/* Filtres */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
        <h3 className="font-bold text-green-800 dark:text-green-400 mb-3">🔍 Filtres</h3>
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

      {/* Escrow */}
      <motion.div 
        whileHover={{ x: 5 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border-l-4 border-green-500"
      >
        <h3 className="font-bold text-green-800 dark:text-green-400">💰 Escrow sécurisé</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Acompte bloqué KKiaPay<br />
          Libéré à livraison terrain
        </p>
      </motion.div>

      {/* Prédiction IA */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
      >
        <h3 className="font-bold text-green-800 dark:text-green-400">🌦️ Prédiction IA (Open-Meteo)</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Rendement estimé maïs : 2.4 t/ha<br />
          Risque pluie : faible<br />
          Température moyenne : 28°C
        </p>
      </motion.div>

      {/* Score confiance */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
        <h3 className="font-bold text-green-800 dark:text-green-400">📊 Score de confiance</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
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
        <h3 className="font-bold text-green-800 dark:text-green-400">💳 Micro-crédit disponible</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-3">
          Sur contrat signé – avance jusqu'à 500 000 FCFA<br />
          Taux : 5-8% remboursable à livraison
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-yellow-500 text-green-900 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
        >
          Demander une avance →
        </motion.button>
      </motion.div>

      {/* Partenaires */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
        <h3 className="font-bold text-green-800 dark:text-green-400">🤝 Partenaires</h3>
        <div className="flex gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
          <span>MTN MoMo</span>
          <span>•</span>
          <span>Moov</span>
          <span>•</span>
          <span>Orange Money</span>
        </div>
      </div>
    </motion.div>
  );
}
