import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, TrendingUp, 
  Sprout, Truck, CheckCircle, Clock, 
  Calendar, Eye, CreditCard, 
  DollarSign, Star, 
  Activity, Package
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { commandesAPI } from '../services/api';

export default function DashboardHome() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    commandes: 0,
    revenus: 0,
    enAttente: 0,
    satisfaction: 98
  });
  const [recentCommandes, setRecentCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bon matin');
    else if (hour < 18) setGreeting('Bon après-midi');
    else setGreeting('Bonsoir');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const commandes = await commandesAPI.getAll();
          setRecentCommandes(commandes.slice(0, 4));
          setStats(prev => ({
            ...prev,
            commandes: commandes.length,
            revenus: commandes.reduce((sum, c) => sum + parseFloat(c.prix_total || 0), 0),
            enAttente: commandes.filter(c => c.statut === 'en_attente').length
          }));
        } catch (err) {
          console.error('Erreur chargement données:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [user]);

  const formatPrice = (price) => {
    return parseFloat(price || 0).toLocaleString('fr-FR') + ' FCFA';
  };

  const getStatusBadge = (status) => {
    const statuses = {
      en_attente: { label: 'En attente', color: 'bg-amber-500/15 text-amber-600 border-amber-200/50', icon: Clock },
      confirmee: { label: 'Confirmée', color: 'bg-emerald-500/15 text-emerald-600 border-emerald-200/50', icon: CheckCircle },
      livree: { label: 'Livrée', color: 'bg-blue-500/15 text-blue-600 border-blue-200/50', icon: Truck },
    };
    const s = statuses[status] || statuses.en_attente;
    const Icon = s.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${s.color}`}>
        <Icon className="w-3 h-3" />
        {s.label}
      </span>
    );
  };

  const statCards = [
    { title: 'Commandes', value: stats.commandes, icon: ShoppingCart, gradient: 'from-emerald-500 to-teal-600', change: '+12%' },
    { title: 'Revenus', value: formatPrice(stats.revenus), icon: DollarSign, gradient: 'from-blue-500 to-cyan-600', change: '+8%' },
    { title: 'En attente', value: stats.enAttente, icon: Clock, gradient: 'from-amber-500 to-orange-600', change: '-2%' },
    { title: 'Satisfaction', value: `${stats.satisfaction}%`, icon: Star, gradient: 'from-purple-500 to-pink-600', change: '+5%' },
  ];

  const quickActions = [
    { title: 'Explorer', icon: Eye, link: '/dashboard/offres', gradient: 'from-emerald-500 to-teal-600' },
    { title: 'Commandes', icon: ShoppingCart, link: '/dashboard/mes-commandes', gradient: 'from-blue-500 to-cyan-600' },
    { title: 'Crédit', icon: CreditCard, link: '/dashboard/micro-credit', gradient: 'from-purple-500 to-pink-600' },
    { title: 'Semis', icon: Calendar, link: '/dashboard/conseils-semis', gradient: 'from-orange-500 to-red-600' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-emerald-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* En-tête */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
          {greeting}, {user?.username || user?.name || 'Utilisateur'}
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {user?.role === 'admin' ? 'Administrateur' : user?.role === 'agriculteur' ? 'Agriculteur' : 'Acheteur'}
        </p>
      </motion.div>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                {stat.change}
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-500 mb-3">Actions rapides</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={action.title}
              onClick={() => navigate(action.link)}
              className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition"
            >
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${action.gradient} flex items-center justify-center`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{action.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Commandes récentes */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            <h2 className="font-medium text-gray-800 dark:text-white">Commandes récentes</h2>
          </div>
          {recentCommandes.length > 0 && (
            <button onClick={() => navigate('/dashboard/mes-commandes')} className="text-xs text-emerald-600">
              Voir tout
            </button>
          )}
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {recentCommandes.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Aucune commande</p>
            </div>
          ) : (
            recentCommandes.map((commande) => (
              <div key={commande.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    {commande.produit_nom || 'Produit'}
                  </p>
                  <p className="text-xs text-gray-500">{formatPrice(commande.prix_total)}</p>
                </div>
                {getStatusBadge(commande.statut)}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
