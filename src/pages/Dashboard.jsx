import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, Package, ShoppingCart, TrendingUp, LogOut, 
  Sprout, Truck, CheckCircle, Clock, ArrowRight, 
  Calendar, MapPin, Phone, Mail, Shield, Star,
  PlusCircle, Eye, MessageCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { commandesAPI, produitsAPI } from '../services/api';

export default function Dashboard() {
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    produits: 0,
    commandes: 0,
    revenus: 0,
    enAttente: 0
  });
  const [recentCommandes, setRecentCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const commandes = await commandesAPI.getAll();
          setRecentCommandes(commandes.slice(0, 5));
          setStats({
            produits: 12,
            commandes: commandes.length,
            revenus: commandes.reduce((sum, c) => sum + parseFloat(c.prix_total || 0), 0),
            enAttente: commandes.filter(c => c.statut === 'en_attente').length
          });
        } catch (err) {
          console.error('Erreur chargement données:', err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formatPrice = (price) => {
    return parseFloat(price || 0).toLocaleString('fr-FR') + ' FCFA';
  };

  const getStatusBadge = (status) => {
    const statuses = {
      en_attente: { label: 'En attente', color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: Clock },
      confirmee: { label: 'Confirmée', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: CheckCircle },
      payee: { label: 'Payée', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', icon: CheckCircle },
      livree: { label: 'Livrée', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: Truck },
      terminee: { label: 'Terminée', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', icon: CheckCircle },
      annulee: { label: 'Annulée', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: CheckCircle },
    };
    const s = statuses[status] || statuses.en_attente;
    const Icon = s.icon;
    return <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${s.color}`}><Icon className="w-3 h-3" />{s.label}</span>;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* En-tête avec bienvenue */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Bonjour, {user.username || user.name}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user.role === 'agriculteur' ? '🌾 Agriculteur' : '🏪 Acheteur'} • Score de confiance: {user.trust_score || 4.7}/5
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => navigate('/offres')}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition shadow-md"
              >
                <PlusCircle className="w-4 h-4" />
                {user.role === 'agriculteur' ? 'Publier une offre' : 'Explorer les offres'}
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-600 dark:text-red-400 rounded-xl font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <Package className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.produits}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Mes produits</h3>
            <p className="text-xs text-gray-500 mt-1">+2 cette semaine</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <ShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.commandes}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Commandes</h3>
            <p className="text-xs text-gray-500 mt-1">{stats.enAttente} en attente</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{formatPrice(stats.revenus)}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Chiffre d'affaires</h3>
            <p className="text-xs text-green-600">+12% ce mois</p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30 rounded-2xl p-5 shadow-sm border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                <Star className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">4.8/5</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Note moyenne</h3>
            <p className="text-xs text-yellow-600">Basée sur 45 avis</p>
          </motion.div>
        </div>

        {/* Appel à l'action - Section mise en avant */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 text-white shadow-xl"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                <Truck className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Prêt à passer commande ?</h3>
                <p className="text-green-100 text-sm">Découvrez les meilleures offres du moment</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/offres')}
              className="flex items-center gap-2 px-6 py-3 bg-white text-green-700 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg group"
            >
              Explorer les offres
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </motion.div>

        {/* Deux colonnes: Commandes récentes + Actions rapides */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Commandes récentes */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center">
              <h2 className="font-semibold text-gray-900 dark:text-white">Commandes récentes</h2>
              <button onClick={() => navigate('/mes-commandes')} className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
                Voir tout <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentCommandes.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Package className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>Aucune commande pour le moment</p>
                  <button onClick={() => navigate('/offres')} className="mt-3 text-green-600 text-sm">Commencer vos achats →</button>
                </div>
              ) : (
                recentCommandes.map((commande) => (
                  <div key={commande.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{commande.produit_nom || 'Produit'}</p>
                        <p className="text-sm text-gray-500">{commande.quantite} kg • {formatPrice(commande.prix_total)}</p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(commande.created_at).toLocaleDateString('fr-FR')}</p>
                      </div>
                      <div className="text-right">
                        {getStatusBadge(commande.statut)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Actions rapides et infos */}
          <div className="space-y-5">
            {/* Actions rapides */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Actions rapides</h2>
              <div className="space-y-2">
                <button onClick={() => navigate('/offres')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition group">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg"><Eye className="w-4 h-4 text-green-600" /></div>
                  <span className="flex-1 text-left text-sm">Voir les offres</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition" />
                </button>
                <button onClick={() => navigate('/mes-commandes')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition group">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg"><ShoppingCart className="w-4 h-4 text-blue-600" /></div>
                  <span className="flex-1 text-left text-sm">Suivre mes commandes</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition" />
                </button>
                <button onClick={() => navigate('/mon-compte')} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition group">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg"><User className="w-4 h-4 text-purple-600" /></div>
                  <span className="flex-1 text-left text-sm">Modifier mon profil</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900 dark:text-white">Besoin d'aide ?</h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Notre équipe est disponible pour vous accompagner</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-xl text-sm font-medium hover:bg-blue-700 transition">
                Contacter le support
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
