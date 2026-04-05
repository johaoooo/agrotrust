import { motion } from 'framer-motion';
import { CheckCircle, Clock, Truck, FileCheck } from 'lucide-react';

const contrats = [
  { id: 1, product: 'Maïs - 2 tonnes', farmer: 'Ferme Yaka', status: 'livraison', date: '15/06/2025' },
  { id: 2, product: 'Tomate - 500 kg', farmer: 'Coop Wéma', status: 'en_cours', date: '22/06/2025' },
  { id: 3, product: 'Igname - 1.2 tonnes', farmer: 'Ferme Kpomassè', status: 'termine', date: '30/05/2025' },
];

const statusConfig = {
  en_cours: { icon: Clock, label: 'En cours', color: 'text-yellow-500' },
  livraison: { icon: Truck, label: 'En livraison', color: 'text-blue-500' },
  termine: { icon: CheckCircle, label: 'Terminé', color: 'text-green-500' },
};

export default function Contrats() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Mes contrats</h1>
      
      <div className="space-y-4">
        {contrats.map((contrat) => {
          const StatusIcon = statusConfig[contrat.status].icon;
          return (
            <motion.div
              key={contrat.id}
              whileHover={{ scale: 1.01 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-center flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <FileCheck className="w-10 h-10 text-green-600" />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{contrat.product}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{contrat.farmer}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`flex items-center gap-1 text-sm font-medium ${statusConfig[contrat.status].color}`}>
                    <StatusIcon className="w-4 h-4" />
                    {statusConfig[contrat.status].label}
                  </span>
                  <button className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600">
                    Détails
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
