import { motion } from 'framer-motion';
import { MapPin, Calendar, Star } from 'lucide-react';

const offers = [
  { id: 1, name: 'Ferme Yaka', crop: 'Maïs', qty: '2 tonnes', date: '15/06', price: '450 FCFA/kg', region: 'Zou', score: 4.8 },
  { id: 2, name: 'Coop Wéma', crop: 'Tomate', qty: '500 kg', date: '22/06', price: '600 FCFA/kg', region: 'Borgou', score: 4.5 },
  { id: 3, name: 'Ferme Kpomassè', crop: 'Igname', qty: '1.2 tonnes', date: '30/06', price: '800 FCFA/kg', region: 'Collines', score: 4.2 },
];

export default function Offres() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Toutes les offres</h1>
      
      <div className="space-y-4">
        {offers.map((offer) => (
          <motion.div
            key={offer.id}
            whileHover={{ x: 5 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">{offer.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{offer.crop} – {offer.qty}</p>
                <div className="flex gap-3 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{offer.region}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{offer.date}</span>
                  <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />{offer.score}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-600">{offer.price}</div>
                <button className="mt-2 bg-green-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-green-700">Faire offre</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
