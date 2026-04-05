import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { 
  MapPin, 
  Calendar, 
  Star, 
  TrendingUp, 
  Sprout,
  Apple,
  Wheat,
  Flower2,
  Leaf,
  Nut,
  Package
} from 'lucide-react';

const offers = [
  { 
    id: 1, 
    name: 'Ferme Yaka', 
    region: 'Zou', 
    crop: 'Maïs', 
    qty: '2 tonnes', 
    date: '15/06', 
    score: 4.8, 
    price: '450 FCFA/kg',
    icon: Wheat,
    iconColor: 'from-yellow-500 to-amber-600',
    trend: '+12%'
  },
  { 
    id: 2, 
    name: 'Coop Wéma', 
    region: 'Borgou', 
    crop: 'Tomate', 
    qty: '500 kg', 
    date: '22/06', 
    score: 4.5, 
    price: '600 FCFA/kg',
    icon: Apple,
    iconColor: 'from-red-500 to-rose-600',
    trend: '+8%'
  },
  { 
    id: 3, 
    name: 'Ferme Kpomassè', 
    region: 'Collines', 
    crop: 'Igname', 
    qty: '1.2 tonnes', 
    date: '30/06', 
    score: 4.2, 
    price: '800 FCFA/kg',
    icon: Sprout,
    iconColor: 'from-orange-500 to-amber-600',
    trend: '+5%'
  },
  { 
    id: 4, 
    name: 'Coopérative Agbanga', 
    region: 'Zou', 
    crop: 'Manioc', 
    qty: '3 tonnes', 
    date: '10/07', 
    score: 4.9, 
    price: '350 FCFA/kg',
    icon: Leaf,
    iconColor: 'from-green-500 to-emerald-600',
    trend: '+15%'
  },
  { 
    id: 5, 
    name: 'Ferme Bio-Savè', 
    region: 'Collines', 
    crop: 'Anacarde', 
    qty: '800 kg', 
    date: '25/07', 
    score: 4.6, 
    price: '1200 FCFA/kg',
    icon: Nut,
    iconColor: 'from-amber-500 to-orange-600',
    trend: '+20%'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: { x: 0, opacity: 1 }
};

export default function OffersList({ selectedCrop, selectedRegion }) {
  const filtered = offers.filter(o => 
    (selectedCrop === 'all' || o.crop === selectedCrop) &&
    (selectedRegion === 'all' || o.region === selectedRegion)
  );

  if (filtered.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400">Aucune offre ne correspond à vos filtres.</p>
      </div>
    );
  }

  return (
    <div>
      {/* En-tête avec compteur */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          🌾 Offres de récoltes futures
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          {filtered.length} offres
        </span>
      </div>

      {/* Liste des offres */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {filtered.map((offer) => {
          const Icon = offer.icon;
          return (
            <motion.div
              key={offer.id}
              variants={itemVariants}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transition-all duration-200"
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  
                  {/* Partie gauche : icône + infos */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Icône Lucide professionnelle */}
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${offer.iconColor} flex items-center justify-center shadow-md shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Infos principales */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {offer.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                          <Star className="w-3 h-3 fill-current" />
                          {offer.score}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full">
                          <TrendingUp className="w-3 h-3" />
                          {offer.trend}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {offer.crop} – {offer.qty}
                      </p>
                      
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {offer.region}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          disponible {offer.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Partie droite : prix + bouton */}
                  <div className="text-right shrink-0">
                    <div className="text-xl font-bold text-green-600 dark:text-green-400">
                      {offer.price}
                    </div>
                    <button className="mt-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:from-green-700 hover:to-emerald-700 transition shadow-sm hover:shadow">
                      Faire offre →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
