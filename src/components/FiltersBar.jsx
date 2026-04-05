import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown, ChevronUp, MapPin, Sprout } from 'lucide-react';

export default function FiltersBar({ setSelectedCrop, setSelectedRegion }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* En-tête du filtre - toujours visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="font-semibold text-gray-900 dark:text-white">Filtres</span>
          {!isExpanded && (
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              (Cliquez pour affiner votre recherche)
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
        </motion.div>
      </button>

      {/* Contenu dépliable */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 dark:border-gray-700"
          >
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Sprout className="w-3.5 h-3.5 inline mr-1" />
                    Culture
                  </label>
                  <select 
                    onChange={(e) => setSelectedCrop(e.target.value)} 
                    className="w-full text-sm border border-gray-300 dark:border-gray-600 p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">🌾 Toutes les cultures</option>
                    <option value="Maïs">🌽 Maïs</option>
                    <option value="Tomate">🍅 Tomate</option>
                    <option value="Igname">🍠 Igname</option>
                    <option value="Manioc">🌿 Manioc</option>
                    <option value="Anacarde">🥜 Anacarde</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <MapPin className="w-3.5 h-3.5 inline mr-1" />
                    Région
                  </label>
                  <select 
                    onChange={(e) => setSelectedRegion(e.target.value)} 
                    className="w-full text-sm border border-gray-300 dark:border-gray-600 p-2.5 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="all">📍 Toutes les régions</option>
                    <option value="Zou">Zou</option>
                    <option value="Collines">Collines</option>
                    <option value="Borgou">Borgou</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={() => {
                    setSelectedCrop('all');
                    setSelectedRegion('all');
                  }}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
