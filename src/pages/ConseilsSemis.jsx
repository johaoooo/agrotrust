import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Calendar, 
  Droplets, 
  Sun, 
  Thermometer, 
  Wind, 
  Leaf,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  TrendingUp,
  Sprout,
  Flower2,
  Apple,
  Wheat
} from 'lucide-react';

const cultures = [
  {
    id: 1,
    name: "Maïs",
    icon: Wheat,
    color: "from-yellow-500 to-amber-500",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
    saison: "Avril - Juillet",
    periode: "Grande saison des pluies",
    duree: "90-120 jours",
    conseils: [
      "Préparez le sol 2 semaines avant les premières pluies",
      "Espacement: 80cm entre les lignes, 40cm entre les plants",
      "Fertilisation: NPK 15-15-15 à 200kg/ha",
      "Désherbage 3 semaines après semis"
    ]
  },
  {
    id: 2,
    name: "Soja",
    icon: Sprout,
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-50 dark:bg-green-950/30",
    saison: "Mai - Août",
    periode: "Grande saison des pluies",
    duree: "80-110 jours",
    conseils: [
      "Semer après les premières pluies abondantes",
      "Inoculer les graines avec rhizobium",
      "Espacement: 50cm x 10cm",
      "Apport phosphoré recommandé"
    ]
  },
  {
    id: 3,
    name: "Manioc",
    icon: Flower2,
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-50 dark:bg-orange-950/30",
    saison: "Mars - Juin",
    periode: "Début grande saison",
    duree: "10-12 mois",
    conseils: [
      "Boutures de 20-25cm à planter inclinées",
      "Espacement: 1m x 1m",
      "Buttes ou planche selon sol",
      "Rebouturage après 3 mois"
    ]
  },
  {
    id: 4,
    name: "Riz",
    icon: Apple,
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    saison: "Juin - Septembre",
    periode: "Pleine saison",
    duree: "120-150 jours",
    conseils: [
      "Pépinière 25-30 jours avant repiquage",
      "Repiquage à 20cm x 20cm",
      "Maintien de 5-10cm d'eau",
      "Fertilisation azotée fractionnée"
    ]
  }
];

const saisons = [
  {
    nom: "Grande saison des pluies",
    periode: "Avril - Juillet",
    icon: Droplets,
    description: "Période idéale pour les céréales et légumineuses",
    cultures: ["Maïs", "Soja", "Niébé", "Arachide"]
  },
  {
    nom: "Petite saison des pluies",
    periode: "Septembre - Novembre",
    icon: Sun,
    description: "Adaptée pour les cultures maraîchères",
    cultures: ["Tomate", "Piment", "Oignon", "Chou"]
  },
  {
    nom: "Saison sèche",
    periode: "Décembre - Mars",
    icon: Wind,
    description: "Période d'irrigation pour cultures hors-saison",
    cultures: ["Riz irrigué", "Maraîchage", "Pomme de terre"]
  }
];

const ConseilsSemis = () => {
  const [selectedCulture, setSelectedCulture] = useState(cultures[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full mb-4">
            <Sprout className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">Conseils d'expert</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Conseils de <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">semis</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez les meilleures périodes et techniques pour vos cultures
          </p>
        </motion.div>

        {/* Calendrier des saisons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-green-600" />
            Calendrier des semis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {saisons.map((saison, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4">
                  <saison.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {saison.nom}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {saison.periode}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {saison.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {saison.cultures.map((culture, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                      {culture}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Conseils par culture */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Liste des cultures */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 px-2">
                Nos cultures
              </h3>
              <div className="space-y-2">
                {cultures.map((culture) => (
                  <button
                    key={culture.id}
                    onClick={() => setSelectedCulture(culture)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                      selectedCulture.id === culture.id
                        ? `bg-gradient-to-r ${culture.color} text-white shadow-lg`
                        : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <culture.icon className="w-5 h-5" />
                    <span className="font-medium">{culture.name}</span>
                    {selectedCulture.id === culture.id && (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Détails de la culture sélectionnée */}
          <motion.div
            key={selectedCulture.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${selectedCulture.color} flex items-center justify-center`}>
                  <selectedCulture.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedCulture.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedCulture.saison}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">Période de semis</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedCulture.saison}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
                  <Clock className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-500">Durée du cycle</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{selectedCulture.duree}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Conseils de semis
                </h3>
                <ul className="space-y-3">
                  {selectedCulture.conseils.map((conseil, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                    >
                      <Leaf className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">{conseil}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Alert météo */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <h4 className="font-semibold text-amber-800 dark:text-amber-400">Conseil météo</h4>
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {selectedCulture.name === "Maïs" && "Attention aux fortes pluies pendant la floraison."}
                  {selectedCulture.name === "Soja" && "Évitez les semis en période de sécheresse prolongée."}
                  {selectedCulture.name === "Manioc" && "Résistant à la sécheresse, idéal pour zones arides."}
                  {selectedCulture.name === "Riz" && "Nécessite une bonne maîtrise de l'eau."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-2">Besoin d'aide personnalisée ?</h3>
            <p className="mb-4 opacity-90">Consultez nos experts agricoles pour des conseils adaptés à votre région</p>
            <button className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
              Contacter un expert
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConseilsSemis;
