import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sprout, MapPin, Calendar, Thermometer, Droplets, AlertCircle, ChevronRight, Sun, CloudRain, Plus, Wheat, Apple, Sprout as Igname, Leaf, Nut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ConseilsAgricoles() {
  const [selectedCulture, setSelectedCulture] = useState('mais');
  const [selectedRegion, setSelectedRegion] = useState('zou');
  const [conseil, setConseil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentSeason, setCurrentSeason] = useState('');
  const { isAuthenticated } = useAuth();

  const cultures = [
    { value: 'mais', label: 'Maïs', icon: Wheat, color: 'from-yellow-500 to-amber-600' },
    { value: 'tomate', label: 'Tomate', icon: Apple, color: 'from-red-500 to-rose-600' },
    { value: 'igname', label: 'Igname', icon: Igname, color: 'from-orange-500 to-amber-600' },
    { value: 'manioc', label: 'Manioc', icon: Leaf, color: 'from-green-500 to-emerald-600' },
  ];

  const regions = [
    { value: 'zou', label: 'Zou', icon: MapPin },
    { value: 'collines', label: 'Collines', icon: MapPin },
    { value: 'borgou', label: 'Borgou', icon: MapPin },
  ];

  useEffect(() => {
    const mois = new Date().getMonth();
    if (mois >= 3 && mois <= 8) setCurrentSeason('Grande saison des pluies');
    else if (mois >= 9 && mois <= 11) setCurrentSeason('Petite saison des pluies');
    else setCurrentSeason('Saison sèche');
    fetchConseil();
  }, [selectedCulture, selectedRegion]);

  const fetchConseil = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    setConseil({
      date_debut_semis: '15 Avril',
      date_fin_semis: '30 Mai',
      date_debut_recolte: '15 Août',
      date_fin_recolte: '30 Septembre',
      temperature_optimale: '25-30°C',
      pluviometrie: '800-1200 mm',
      conseils: 'Semer après les premières pluies. Espacement de 80x40 cm.',
      previsions_meteo: 'Pluies régulières attendues'
    });
    setLoading(false);
  };

  const getCurrentCultureIcon = () => {
    const culture = cultures.find(c => c.value === selectedCulture);
    const Icon = culture?.icon || Wheat;
    return <Icon className="w-5 h-5 text-white" />;
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-5 shadow-lg border border-green-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-green-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Sprout className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Conseils de semis</h2>
        </div>
        <div className="flex items-center gap-1 text-xs">
          {currentSeason.includes('Pluies') ? <CloudRain className="w-4 h-4 text-blue-500" /> : <Sun className="w-4 h-4 text-yellow-500" />}
          <span className="text-gray-600 dark:text-gray-400">{currentSeason}</span>
        </div>
      </div>

      {isAuthenticated && (
        <button className="w-full mb-4 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center justify-center gap-2">
          <Plus className="w-4 h-4" />
          Publier une annonce de récolte
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="relative">
          <select 
            value={selectedCulture} 
            onChange={(e) => setSelectedCulture(e.target.value)} 
            className="w-full px-3 py-2 pl-9 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none"
          >
            {cultures.map(c => {
              const Icon = c.icon;
              return (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              );
            })}
          </select>
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {getCurrentCultureIcon()}
          </div>
        </div>
        <div className="relative">
          <select 
            value={selectedRegion} 
            onChange={(e) => setSelectedRegion(e.target.value)} 
            className="w-full px-3 py-2 pl-9 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none"
          >
            {regions.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">Chargement...</div>
      ) : conseil ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700">
              <Calendar className="w-4 h-4 text-green-600 dark:text-green-400 mx-auto mb-1" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Semis</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{conseil.date_debut_semis} - {conseil.date_fin_semis}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700">
              <Sprout className="w-4 h-4 text-amber-600 dark:text-amber-400 mx-auto mb-1" />
              <p className="text-xs text-gray-500 dark:text-gray-400">Récolte</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{conseil.date_debut_recolte} - {conseil.date_fin_recolte}</p>
            </div>
          </div>
          <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
            <p className="text-sm text-gray-800 dark:text-gray-200">{conseil.conseils}</p>
          </div>
          {conseil.previsions_meteo && (
            <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-2 text-center">
              <p className="text-xs text-blue-700 dark:text-blue-300">📡 {conseil.previsions_meteo}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">Aucune donnée</div>
      )}
    </div>
  );
}
