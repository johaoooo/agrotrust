import { motion } from 'framer-motion';
import { 
  Filter, Shield, CloudRain, TrendingUp, CreditCard, Building2, Wallet, Award, ChevronRight, MapPin, Sprout
} from 'lucide-react';
import { useState } from 'react';

export default function Sidebar({ setSelectedCrop, setSelectedRegion }) {
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      {/* Bloc Filtres dépliable - horizontal */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="font-medium text-gray-900 dark:text-white">Filtres</span>
          </div>
          <motion.div animate={{ rotate: isFiltersExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${isFiltersExpanded ? 'rotate-90' : ''}`} />
          </motion.div>
        </button>
        
        {isFiltersExpanded && (
          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select onChange={(e) => setSelectedCrop(e.target.value)} className="text-sm border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="all">🌾 Toutes cultures</option>
                <option value="Maïs">🌽 Maïs</option>
                <option value="Tomate">🍅 Tomate</option>
                <option value="Igname">🍠 Igname</option>
                <option value="Manioc">🌿 Manioc</option>
                <option value="Anacarde">🥜 Anacarde</option>
              </select>
              <select onChange={(e) => setSelectedRegion(e.target.value)} className="text-sm border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="all">📍 Toutes régions</option>
                <option value="Zou">Zou</option>
                <option value="Collines">Collines</option>
                <option value="Borgou">Borgou</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Grille horizontale pour tous les blocs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        
        {/* Bloc Escrow */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white">Escrow sécurisé</h3>
          </div>
          <p className="text-[10px] text-gray-600 dark:text-gray-400">Acompte bloqué • Libéré à livraison</p>
        </div>

        {/* Bloc Prédiction IA */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3">
          <div className="flex items-center gap-2 mb-1">
            <CloudRain className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white">Prédiction IA</h3>
          </div>
          <p className="text-[10px] text-gray-600 dark:text-gray-400">Maïs: 2.4 t/ha • Risque: faible • 28°C</p>
        </div>

        {/* Bloc Score de confiance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3">
          <div className="flex items-center gap-2 mb-1">
            <Award className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white">Score confiance</h3>
          </div>
          <p className="text-[10px] text-gray-600 dark:text-gray-400">4.7/5 • 120 livraisons • Vérifié</p>
        </div>

        {/* Bloc Micro-crédit */}
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 rounded-xl shadow-sm border border-yellow-200 dark:border-yellow-800 p-3">
          <div className="flex items-center gap-2 mb-1">
            <CreditCard className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400" />
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white">Micro-crédit</h3>
          </div>
          <p className="text-[10px] text-gray-600 dark:text-gray-400">Avance jusqu'à 500k FCFA • Taux 5-8%</p>
          <button className="mt-1.5 text-[10px] bg-yellow-500 text-white px-2 py-0.5 rounded-lg font-medium hover:bg-yellow-600 transition inline-flex items-center gap-0.5">
            Demander <ChevronRight className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* Bloc Partenaires */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
            <h3 className="text-xs font-semibold text-gray-900 dark:text-white">Partenaires</h3>
          </div>
          <div className="flex flex-wrap gap-1">
            <span className="inline-flex items-center gap-0.5 text-[9px] bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">MTN MoMo</span>
            <span className="inline-flex items-center gap-0.5 text-[9px] bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">Moov</span>
            <span className="inline-flex items-center gap-0.5 text-[9px] bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">Orange</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
