import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle, Clock, XCircle, Eye } from 'lucide-react';
import { commandesAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const statusConfig = {
  en_attente: { icon: Clock, label: 'En attente', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
  confirmee: { icon: CheckCircle, label: 'Confirmée', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  payee: { icon: Package, label: 'Payée', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  livree: { icon: Truck, label: 'Livrée', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
  terminee: { icon: CheckCircle, label: 'Terminée', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
  annulee: { icon: XCircle, label: 'Annulée', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' },
};

export default function MesCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchCommandes();
  }, []);

  const fetchCommandes = async () => {
    try {
      const data = await commandesAPI.getAll();
      setCommandes(data);
    } catch (err) {
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('fr-FR') + ' FCFA';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Mes commandes</h1>

      {commandes.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Aucune commande pour le moment</p>
        </div>
      ) : (
        <div className="space-y-4">
          {commandes.map((commande) => {
            const StatusIcon = statusConfig[commande.statut]?.icon || Package;
            const status = statusConfig[commande.statut] || { label: commande.statut, color: 'text-gray-500', bg: 'bg-gray-100' };
            return (
              <div key={commande.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-4">
                  <div className="flex flex-wrap justify-between items-start gap-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{commande.produit_nom}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">Commande #{commande.id} • {new Date(commande.created_at).toLocaleDateString('fr-FR')}</p>
                      <p className="text-sm mt-1">{commande.quantite} kg • {formatPrice(commande.prix_total)}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full ${status.bg} ${status.color}`}>
                        <StatusIcon className="w-3 h-3" /> {status.label}
                      </span>
                      <button className="block mt-2 text-xs text-green-600 hover:text-green-700 flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Détails
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
