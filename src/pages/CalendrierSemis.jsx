import { motion } from 'framer-motion';
import { Calendar, Droplets, Sun, Thermometer, Wind, Leaf, ChevronRight, AlertCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const mois = [
  { nom: "Janvier", saison: "Sèche", couleur: "bg-amber-500", activites: ["Préparation des terres", "Entretien du matériel"] },
  { nom: "Février", saison: "Sèche", couleur: "bg-amber-500", activites: ["Nettoyage des champs", "Fertilisation"] },
  { nom: "Mars", saison: "Pré-pluies", couleur: "bg-emerald-400", activites: ["Semis du maïs", "Préparation pépinière"] },
  { nom: "Avril", saison: "Grandes pluies", couleur: "bg-green-600", activites: ["Semis du riz", "Plantation manioc"] },
  { nom: "Mai", saison: "Grandes pluies", couleur: "bg-green-600", activites: ["Semis du soja", "Entretien cultures"] },
  { nom: "Juin", saison: "Grandes pluies", couleur: "bg-green-600", activites: ["Sarclage", "Fertilisation"] },
  { nom: "Juillet", saison: "Grandes pluies", couleur: "bg-green-600", activites: ["Traitement phytosanitaire", "Récolte maïs"] },
  { nom: "Août", saison: "Pluies modérées", couleur: "bg-emerald-500", activites: ["Récolte soja", "Stockage"] },
  { nom: "Septembre", saison: "Petites pluies", couleur: "bg-blue-500", activites: ["Semis maraîchers", "Entretien"] },
  { nom: "Octobre", saison: "Petites pluies", couleur: "bg-blue-500", activites: ["Récolte riz", "Commercialisation"] },
  { nom: "Novembre", saison: "Sèche", couleur: "bg-amber-500", activites: ["Préparation contre-saison", "Nettoyage"] },
  { nom: "Décembre", saison: "Sèche", couleur: "bg-amber-500", activites: ["Irrigation", "Entretien"] },
];

const culturesSaison = {
  "Grandes pluies": ["🌽 Maïs", "🌾 Riz", "🥜 Soja", "🌱 Manioc"],
  "Petites pluies": ["🍅 Tomate", "🫑 Piment", "🧅 Oignon", "🥬 Chou"],
  "Sèche": ["🌶️ Piment", "🍆 Aubergine", "🥕 Carotte", "🥔 Pomme de terre"]
};

export default function CalendrierSemis() {
  const [selectedMois, setSelectedMois] = useState(mois[3]); // Avril par défaut
  const detailsRef = useRef(null);
  const moisActuel = new Date().getMonth();

  // Fonction pour gérer le clic sur un mois
  const handleMoisClick = (moisItem) => {
    setSelectedMois(moisItem);
    // Défilement automatique vers les détails après un court délai
    setTimeout(() => {
      if (detailsRef.current) {
        detailsRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-600">Calendrier agricole</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
            Calendrier des semis
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Cliquez sur un mois pour voir les détails</p>
        </motion.div>

        {/* Calendrier en grille */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-8">
          {mois.map((moisItem, index) => (
            <motion.button
              key={moisItem.nom}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleMoisClick(moisItem)}
              className={`p-3 rounded-xl text-center transition-all duration-300 ${
                selectedMois.nom === moisItem.nom
                  ? `${moisItem.couleur} text-white shadow-lg scale-105`
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
              } ${moisActuel === index ? 'ring-2 ring-emerald-500' : ''}`}
            >
              <p className="font-bold text-lg">{moisItem.nom.slice(0,3)}</p>
              <p className="text-xs opacity-90">{moisItem.saison}</p>
            </motion.button>
          ))}
        </div>

        {/* Détails du mois sélectionné - avec ref pour le scroll */}
        <div ref={detailsRef}>
          <motion.div
            key={selectedMois.nom}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Carte principale */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 ${selectedMois.couleur} rounded-xl flex items-center justify-center shadow-md`}>
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedMois.nom}</h2>
                  <p className="text-gray-500">Saison {selectedMois.saison}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  Activités recommandées
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedMois.activites.map((activite, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm">
                      {activite}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <h4 className="font-semibold text-amber-800 dark:text-amber-400">Conseil du mois</h4>
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {selectedMois.nom === "Janvier" && "Profitez de la saison sèche pour préparer vos terres et entretenir votre matériel."}
                  {selectedMois.nom === "Février" && "C'est le moment de nettoyer vos champs et d'apporter de la fertilisation."}
                  {selectedMois.nom === "Mars" && "Préparez vos pépinières pour les semis du maïs avant les premières pluies."}
                  {selectedMois.nom === "Avril" && "Profitez des premières pluies pour vos semis de riz et plantation de manioc."}
                  {selectedMois.nom === "Mai" && "Le soja est à semer maintenant. Pensez à entretenir vos cultures."}
                  {selectedMois.nom === "Juin" && "Fertilisez vos cultures en pleine croissance et faites le sarclage."}
                  {selectedMois.nom === "Juillet" && "Surveillez les maladies et préparez la récolte du maïs."}
                  {selectedMois.nom === "Août" && "C'est le moment de récolter le soja et de bien stocker vos produits."}
                  {selectedMois.nom === "Septembre" && "Débutez les semis de cultures maraîchères (tomate, piment)."}
                  {selectedMois.nom === "Octobre" && "Récoltez le riz et commencez la commercialisation de vos produits."}
                  {selectedMois.nom === "Novembre" && "Préparez vos terres pour la contre-saison."}
                  {selectedMois.nom === "Décembre" && "Si vous avez un système d'irrigation, c'est le moment pour les cultures hors-saison."}
                </p>
              </div>
            </div>

            {/* Cultures par saison */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                <Droplets className="w-4 h-4 text-emerald-600" />
                Cultures recommandées
              </h3>
              <div className="space-y-4">
                {Object.entries(culturesSaison).map(([saison, cultures]) => (
                  <div key={saison}>
                    <p className="text-sm font-medium text-gray-500 mb-2">{saison}</p>
                    <div className="flex flex-wrap gap-2">
                      {cultures.map((culture, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs">
                          {culture}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Thermometer className="w-4 h-4" />
                  <span>Température idéale: 25-30°C</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <Wind className="w-4 h-4" />
                  <span>Humidité recommandée: 60-80%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Légende */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-4 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            <span className="text-gray-600">Grandes pluies</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Petites pluies</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
            <span className="text-gray-600">Saison sèche</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
            <span className="text-gray-600">Pré-pluies</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
