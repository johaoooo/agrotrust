import { motion } from 'framer-motion';

const offers = [
  { id: 1, name: 'Ferme Yaka', region: 'Zou', crop: 'Maïs', qty: '2 tonnes', date: '15/06', score: 4.8, price: '450 FCFA/kg' },
  { id: 2, name: 'Coop Wéma', region: 'Borgou', crop: 'Tomate', qty: '500 kg', date: '22/06', score: 4.5, price: '600 FCFA/kg' },
  { id: 3, name: 'Ferme Kpomassè', region: 'Collines', crop: 'Igname', qty: '1.2 tonnes', date: '30/06', score: 4.2, price: '800 FCFA/kg' },
  { id: 4, name: 'Coopérative Agbanga', region: 'Zou', crop: 'Manioc', qty: '3 tonnes', date: '10/07', score: 4.9, price: '350 FCFA/kg' },
  { id: 5, name: 'Ferme Bio-Savè', region: 'Collines', crop: 'Anacarde', qty: '800 kg', date: '25/07', score: 4.6, price: '1200 FCFA/kg' },
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
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1 }
};

export default function OffersList({ selectedCrop, selectedRegion }) {
  const filtered = offers.filter(o => 
    (selectedCrop === 'all' || o.crop === selectedCrop) &&
    (selectedRegion === 'all' || o.region === selectedRegion)
  );

  if (filtered.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center"
      >
        <p className="text-gray-500 dark:text-gray-400">Aucune offre ne correspond à vos filtres.</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4"
    >
      <h2 className="text-xl font-bold text-green-800 dark:text-green-400 mb-3">🌾 Offres de récoltes futures</h2>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {filtered.map(offer => (
          <motion.div 
            key={offer.id} 
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
            className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start flex-wrap gap-3">
              <div>
                <h3 className="font-bold text-lg dark:text-white">{offer.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{offer.crop} – {offer.qty} – disponible {offer.date}</p>
                <p className="text-sm text-green-600 dark:text-green-400">⭐ {offer.score} • {offer.region}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-700 dark:text-green-400">{offer.price}</p>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-2 bg-green-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-green-700 transition"
                >
                  Faire offre →
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
