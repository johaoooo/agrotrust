import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, MapPin, Sprout, Droplets, Thermometer, AlertCircle, 
  ChevronRight, Sun, CloudRain, Wind, TrendingUp, Clock, 
  CheckCircle, AlertTriangle, Leaf, Search
} from 'lucide-react';

export default function ConseilsAgricoles() {
  const [selectedCulture, setSelectedCulture] = useState('mais');
  const [selectedRegion, setSelectedRegion] = useState('zou');
  const [conseil, setConseil] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allConseils, setAllConseils] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [currentSeason, setCurrentSeason] = useState('');

  const cultures = [
    { value: 'mais', label: '🌽 Maïs', emoji: '🌽', cycle: '90-120 jours', difficulte: 'Moyenne' },
    { value: 'tomate', label: '🍅 Tomate', emoji: '🍅', cycle: '60-80 jours', difficulte: 'Difficile' },
    { value: 'igname', label: '🍠 Igname', emoji: '🍠', cycle: '180-210 jours', difficulte: 'Moyenne' },
    { value: 'manioc', label: '🌿 Manioc', emoji: '🌿', cycle: '240-360 jours', difficulte: 'Facile' },
    { value: 'anacarde', label: '🥜 Anacarde', emoji: '🥜', cycle: '3-5 ans', difficulte: 'Moyenne' },
  ];

  const regions = [
    { value: 'zou', label: 'Zou', sol: 'Argilo-sableux', altitude: '50-200m' },
    { value: 'collines', label: 'Collines', sol: 'Ferralitique', altitude: '200-400m' },
    { value: 'borgou', label: 'Borgou', sol: 'Sablo-argileux', altitude: '300-500m' },
    { value: 'atlantique', label: 'Atlantique', sol: 'Sableux', altitude: '0-50m' },
    { value: 'oueme', label: 'Ouémé', sol: 'Argileux', altitude: '10-100m' },
  ];

  useEffect(() => {
    fetchConseils();
    determinerSaison();
  }, []);

  useEffect(() => {
    if (allConseils.length > 0) {
      const found = allConseils.find(
        c => c.culture === selectedCulture && c.region === selectedRegion
      );
      setConseil(found || null);
      genererRecommandation(found);
    }
  }, [selectedCulture, selectedRegion, allConseils]);

  const determinerSaison = () => {
    const mois = new Date().getMonth();
    if (mois >= 3 && mois <= 8) {
      setCurrentSeason('Grande saison des pluies');
    } else if (mois >= 9 && mois <= 11) {
      setCurrentSeason('Petite saison des pluies');
    } else {
      setCurrentSeason('Saison sèche');
    }
  };

  const fetchConseils = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/conseils/calendrier/');
      const data = await response.json();
      setAllConseils(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const genererRecommandation = (data) => {
    if (!data) {
      setRecommendation(null);
      return;
    }

    const moisActuel = new Date().getMonth() + 1;
    const joursActuels = new Date().getDate();
    
    // Analyser les périodes
    const estPeriodeSemis = (debut, fin) => {
      const moisDebut = extraireMois(debut);
      const moisFin = extraireMois(fin);
      return moisActuel >= moisDebut && moisActuel <= moisFin;
    };

    const extraireMois = (periode) => {
      const moisMap = {
        'Janvier': 1, 'Février': 2, 'Mars': 3, 'Avril': 4, 'Mai': 5, 'Juin': 6,
        'Juillet': 7, 'Août': 8, 'Septembre': 9, 'Octobre': 10, 'Novembre': 11, 'Décembre': 12
      };
      for (const [nom, num] of Object.entries(moisMap)) {
        if (periode.includes(nom)) return num;
      }
      return 4;
    };

    const estFavorable = estPeriodeSemis(data.date_debut_semis, data.date_fin_semis);
    
    let niveau = 'info';
    let message = '';
    let action = '';

    if (estFavorable) {
      niveau = 'success';
      message = `✅ C'est le moment idéal pour semer le ${cultures.find(c => c.value === selectedCulture)?.label} dans la région ${regions.find(r => r.value === selectedRegion)?.label} !`;
      action = 'Commencez les semis dès maintenant pour une récolte optimale.';
    } else {
      niveau = 'warning';
      message = `⏰ La période de semis n'est pas encore commencée ou est déjà terminée.`;
      action = `Préparez votre terrain et attendez la période ${data.date_debut_semis} - ${data.date_fin_semis}.`;
    }

    setRecommendation({
      niveau,
      message,
      action,
      favorable: estFavorable,
      moisRestants: estFavorable ? 0 : 2
    });
  };

  const getSaisonIcon = () => {
    if (currentSeason.includes('Grande saison')) return <CloudRain className="w-5 h-5 text-blue-500" />;
    if (currentSeason.includes('Petite saison')) return <CloudRain className="w-5 h-5 text-cyan-500" />;
    return <Sun className="w-5 h-5 text-yellow-500" />;
  };

  const getNiveauColor = (niveau) => {
    switch(niveau) {
      case 'success': return 'bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700';
      case 'warning': return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-500 text-yellow-700';
      default: return 'bg-blue-100 dark:bg-blue-900/30 border-blue-500 text-blue-700';
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 shadow-lg">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-green-200 dark:border-green-800">
        <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl flex items-center justify-center animate-pulse">
          <Sprout className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">🌱 Algorithme de conseils agricoles</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Analyse intelligente des périodes favorables</p>
        </div>
        <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-white/50 dark:bg-gray-800/50 rounded-full">
          {getSaisonIcon()}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{currentSeason}</span>
        </div>
      </div>

      {/* Filtres avec recherche intelligente */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Sprout className="w-4 h-4 inline mr-1" />
            Culture
          </label>
          <select
            value={selectedCulture}
            onChange={(e) => setSelectedCulture(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
          >
            {cultures.map(c => (
              <option key={c.value} value={c.value}>
                {c.label} - Cycle: {c.cycle}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Région
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition"
          >
            {regions.map(r => (
              <option key={r.value} value={r.value}>
                {r.label} - Sol: {r.sol}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Résultats avec algorithme */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-sm text-gray-500 mt-3">Analyse en cours...</p>
          </motion.div>
        ) : conseil ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {/* Recommandation algorithmique */}
            {recommendation && (
              <div className={`rounded-xl p-4 border-l-4 ${getNiveauColor(recommendation.niveau)}`}>
                <div className="flex items-start gap-3">
                  {recommendation.favorable ? (
                    <CheckCircle className="w-6 h-6 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-6 h-6 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold">{recommendation.message}</p>
                    <p className="text-sm mt-1 opacity-90">{recommendation.action}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Périodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">📅 Période de semis</h3>
                </div>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {conseil.date_debut_semis} - {conseil.date_fin_semis}
                </p>
                <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-1000"
                    style={{ width: recommendation?.favorable ? '100%' : '30%' }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {recommendation?.favorable ? '✅ Période active' : '⏳ En attente'}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Sprout className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">🌾 Période de récolte</h3>
                </div>
                <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                  {conseil.date_debut_recolte} - {conseil.date_fin_recolte}
                </p>
              </div>
            </div>

            {/* Conditions idéales */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center hover:scale-105 transition-transform">
                <Thermometer className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                <p className="text-xs text-gray-500">Température idéale</p>
                <p className="text-sm font-bold">{conseil.temperature_optimale || '25-30°C'}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center hover:scale-105 transition-transform">
                <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                <p className="text-xs text-gray-500">Pluviométrie</p>
                <p className="text-sm font-bold">{conseil.pluviometrie || '800-1200 mm'}</p>
              </div>
            </div>

            {/* Conseils détaillés */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white">💡 Recommandations personnalisées</h3>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {conseil.conseils}
              </p>
            </div>

            {/* Informations supplémentaires */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-2 text-center">
                <span className="font-semibold">🌱 Culture</span>
                <p className="mt-1">{cultures.find(c => c.value === selectedCulture)?.cycle}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-950/30 rounded-xl p-2 text-center">
                <span className="font-semibold">🏞️ Type de sol</span>
                <p className="mt-1">{regions.find(r => r.value === selectedRegion)?.sol}</p>
              </div>
            </div>

            {/* Prévisions */}
            {conseil.previsions_meteo && (
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-xl p-3 text-sm">
                <div className="flex items-center gap-2">
                  <CloudRain className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">📡 Prévisions météo :</span>
                </div>
                <p className="mt-1 text-blue-700 dark:text-blue-300">{conseil.previsions_meteo}</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12 text-gray-500"
          >
            <AlertCircle className="w-16 h-16 mx-auto mb-3 opacity-50" />
            <p className="font-medium">Aucune donnée disponible</p>
            <p className="text-sm mt-1">Pour cette culture et cette région</p>
            <p className="text-xs mt-3">Consultez un technicien agricole pour des conseils personnalisés</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicateur d'algorithme */}
      <div className="mt-4 pt-3 border-t border-green-200 dark:border-green-800 text-center">
        <div className="inline-flex items-center gap-2 text-xs text-gray-500">
          <TrendingUp className="w-3 h-3" />
          <span>Analyse basée sur les données météo et les cycles culturaux</span>
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
