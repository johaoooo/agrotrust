import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Calendar, Star, TrendingUp, Wheat, Apple, Sprout, Leaf, Nut,
  X, User, Phone, Package, Shield, CheckCircle, Truck, ShoppingCart,
  CreditCard, Smartphone, Check, ArrowRight, Lock, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { produitsAPI, commandesAPI } from '../services/api';

export default function Offres() {
  const [filter, setFilter] = useState('all');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [orderModal, setOrderModal] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [orderStep, setOrderStep] = useState('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [produits, setProduits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  // Charger les produits depuis l'API
  useEffect(() => {
    const fetchProduits = async () => {
      setIsLoading(true);
      try {
        const data = await produitsAPI.getAll();
        console.log('Produits chargés:', data);
        setProduits(data);
      } catch (err) {
        console.error('Erreur chargement produits:', err);
        setError('Impossible de charger les produits. Vérifiez que le backend est lancé.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduits();
  }, []);

  const filteredOffers = filter === 'all' 
    ? produits 
    : produits.filter(o => o.region?.toLowerCase() === filter);

  const handleOrderClick = (offer, e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    setOrderModal(offer);
    setQuantity(offer.minOrder?.toString() || '100');
    setDeliveryAddress(user?.address || '');
    setOrderStep('form');
    setError('');
  };

  const calculateTotal = () => {
    const qty = parseFloat(quantity) || 0;
    return qty * (orderModal?.prix_unitaire || 0);
  };

  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('fr-FR') + ' FCFA';
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const orderData = {
        produit_id: orderModal.id,
        quantite: parseFloat(quantity),
        adresse_livraison: deliveryAddress,
        mode_paiement: paymentMethod,
      };
      
      const result = await commandesAPI.create(orderData);
      setOrderStep('confirmation');
      setOrderModal({ ...orderModal, commandeId: result.id });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmOrder = async () => {
    setLoading(true);
    try {
      setOrderStep('success');
      setTimeout(() => {
        setOrderModal(null);
        setOrderStep('form');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (culture) => {
    const icons = {
      'mais': Wheat,
      'tomate': Apple,
      'igname': Sprout,
      'manioc': Leaf,
      'anacarde': Nut,
    };
    const Icon = icons[culture?.toLowerCase()] || Package;
    return Icon;
  };

  const getIconColor = (culture) => {
    const colors = {
      'mais': 'from-yellow-500 to-amber-500',
      'tomate': 'from-red-500 to-rose-500',
      'igname': 'from-orange-500 to-amber-500',
      'manioc': 'from-green-500 to-emerald-500',
      'anacarde': 'from-amber-500 to-orange-500',
    };
    return colors[culture?.toLowerCase()] || 'from-green-500 to-emerald-500';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error && produits.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-500 rounded-xl p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">Erreur de chargement</h2>
          <p className="text-red-600 dark:text-red-300">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Toutes les offres</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {produits.length} produits disponibles
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>Toutes</button>
            <button onClick={() => setFilter('zou')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === 'zou' ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>Zou</button>
            <button onClick={() => setFilter('collines')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === 'collines' ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>Collines</button>
            <button onClick={() => setFilter('borgou')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === 'borgou' ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>Borgou</button>
          </div>
        </div>

        {filteredOffers.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Aucun produit trouvé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOffers.map((offer) => {
              const Icon = getIconComponent(offer.culture);
              const iconColor = getIconColor(offer.culture);
              return (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -3 }}
                  onClick={() => setSelectedOffer(offer)}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 group cursor-pointer"
                >
                  <div className={`relative h-20 bg-gradient-to-r ${iconColor} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{offer.nom}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{offer.culture} – {offer.quantite} {offer.unite}</p>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-500 dark:text-gray-400">
                      <span className="inline-flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" />{offer.region}</span>
                      <span className="inline-flex items-center gap-0.5"><Calendar className="w-2.5 h-2.5" />{offer.date_disponible?.split('-').reverse().join('/')}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-sm font-bold text-green-600 dark:text-green-400">{formatPrice(offer.prix_unitaire)}/{offer.unite}</div>
                      <button onClick={(e) => handleOrderClick(offer, e)} className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-2.5 py-1 rounded-md text-[10px] font-medium hover:from-green-700 hover:to-emerald-700 transition shadow-sm flex items-center gap-1">
                        <ShoppingCart className="w-3 h-3" /> Commander
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Modal commande - gardée identique */}
      <AnimatePresence>
        {orderModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOrderModal(null)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-xl max-w-sm w-full shadow-2xl overflow-hidden">
              {orderStep === 'form' && (
                <>
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <div><h2 className="font-semibold text-gray-900 dark:text-white">{orderModal.nom}</h2><p className="text-xs text-gray-500 dark:text-gray-400">{orderModal.culture}</p></div>
                      <button onClick={() => setOrderModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <form onSubmit={handleSubmitOrder} className="p-4 space-y-3">
                    {error && <div className="bg-red-100 text-red-700 p-2 rounded-lg text-xs">{error}</div>}
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Quantité ({orderModal.unite})</label>
                      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min={orderModal.minOrder || 100} step="100" required className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                      <div className="flex justify-between mt-0.5"><p className="text-[10px] text-gray-500">Minimum: {orderModal.minOrder || 100} {orderModal.unite}</p><p className="text-[10px] text-gray-500">Stock: {orderModal.quantite} {orderModal.unite}</p></div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Adresse de livraison</label>
                      <textarea value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} rows="2" required className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none" placeholder="Votre adresse complète" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Mode de paiement</label>
                      <div className="flex gap-2">
                        <label className={`flex-1 flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition ${paymentMethod === 'momo' ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-gray-200 dark:border-gray-600'}`}>
                          <input type="radio" value="momo" checked={paymentMethod === 'momo'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-3.5 h-3.5 text-green-600" />
                          <Smartphone className="w-4 h-4 text-green-600" />
                          <span className="text-xs">Mobile Money</span>
                        </label>
                        <label className={`flex-1 flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition ${paymentMethod === 'card' ? 'border-green-500 bg-green-50 dark:bg-green-900/30' : 'border-gray-200 dark:border-gray-600'}`}>
                          <input type="radio" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-3.5 h-3.5 text-green-600" />
                          <CreditCard className="w-4 h-4 text-green-600" />
                          <span className="text-xs">Carte bancaire</span>
                        </label>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center mb-2"><span className="text-sm font-medium">Total</span><span className="text-lg font-bold text-green-600">{formatPrice(calculateTotal())}</span></div>
                      <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50 flex items-center justify-center gap-1">{loading ? 'Chargement...' : 'Continuer'} <ArrowRight className="w-3.5 h-3.5" /></button>
                    </div>
                  </form>
                </>
              )}
              {orderStep === 'confirmation' && (
                <>
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700"><h2 className="font-semibold text-gray-900 dark:text-white">Confirmation</h2></div>
                  <div className="p-4 space-y-2">
                    <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p className="text-[10px] text-gray-500">Produit</p><p className="text-sm font-medium">{orderModal.nom}</p><p className="text-xs">{parseFloat(quantity).toLocaleString()} {orderModal.unite}</p></div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p className="text-[10px] text-gray-500">Livraison</p><p className="text-xs">{deliveryAddress}</p></div>
                    <div className="flex justify-between items-center pt-2"><span className="text-sm font-medium">Total</span><span className="text-lg font-bold text-green-600">{formatPrice(calculateTotal())}</span></div>
                    <div className="flex gap-2 pt-2"><button onClick={() => setOrderStep('form')} className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-medium hover:bg-gray-50 transition">Retour</button><button onClick={confirmOrder} disabled={loading} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-1.5 rounded-lg text-xs font-semibold hover:from-green-700 hover:to-emerald-700 transition">{loading ? 'Chargement...' : 'Confirmer'}</button></div>
                  </div>
                </>
              )}
              {orderStep === 'success' && (
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3"><Check className="w-6 h-6 text-green-600" /></div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">Commande confirmée !</h2>
                  <p className="text-xs text-gray-500">Votre commande a été envoyée au producteur.</p>
                  <button onClick={() => { setOrderModal(null); setOrderStep('form'); }} className="mt-4 text-green-600 text-sm">Fermer</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
