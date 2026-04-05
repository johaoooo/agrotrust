import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Calendar, Star, TrendingUp, Wheat, Apple, Sprout, Leaf, Nut,
  X, User, Phone, Package, Shield, CheckCircle, Truck, ShoppingCart,
  CreditCard, Smartphone, Check, ArrowRight, Lock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const offers = [
  { 
    id: 1, name: 'Ferme Yaka', region: 'Zou', crop: 'Maïs', qty: '2 tonnes', 
    date: '15/06', score: 4.8, price: 450, unit: 'kg', icon: Wheat,
    iconColor: 'from-yellow-500 to-amber-500', trend: '+12%', farmer: 'Koffi Mensah',
    farmerPhone: '+229 90 12 34 56', minOrder: 500, stock: 2000,
    description: 'Maïs biologique cultivé sans pesticides. Récolte prévue mi-juin.',
    certifications: ['Bio', 'Commerce équitable']
  },
  { 
    id: 2, name: 'Coop Wéma', region: 'Borgou', crop: 'Tomate', qty: '500 kg', 
    date: '22/06', score: 4.5, price: 600, unit: 'kg', icon: Apple,
    iconColor: 'from-red-500 to-rose-500', trend: '+8%', farmer: 'Coopérative Wéma',
    farmerPhone: '+229 91 23 45 67', minOrder: 100, stock: 500,
    description: 'Tomates fraîches de saison. Produites par 15 petits agriculteurs.',
    certifications: ['Label local']
  },
  { 
    id: 3, name: 'Ferme Kpomassè', region: 'Collines', crop: 'Igname', qty: '1.2 tonnes', 
    date: '30/06', score: 4.2, price: 800, unit: 'kg', icon: Sprout,
    iconColor: 'from-orange-500 to-amber-500', trend: '+5%', farmer: 'Jean Kpomassè',
    farmerPhone: '+229 92 34 56 78', minOrder: 200, stock: 1200,
    description: 'Igname de qualité supérieure. Conservation longue durée.',
    certifications: ['Produit local']
  },
  { 
    id: 4, name: 'Coopérative Agbanga', region: 'Zou', crop: 'Manioc', qty: '3 tonnes', 
    date: '10/07', score: 4.9, price: 350, unit: 'kg', icon: Leaf,
    iconColor: 'from-green-500 to-emerald-500', trend: '+15%', farmer: 'Coopérative Agbanga',
    farmerPhone: '+229 93 45 67 89', minOrder: 500, stock: 3000,
    description: 'Manioc frais, parfait pour la transformation (gari, tapioca).',
    certifications: ['Bio', 'Commerce équitable']
  },
  { 
    id: 5, name: 'Ferme Bio-Savè', region: 'Collines', crop: 'Anacarde', qty: '800 kg', 
    date: '25/07', score: 4.6, price: 1200, unit: 'kg', icon: Nut,
    iconColor: 'from-amber-500 to-orange-500', trend: '+20%', farmer: 'Mama Bio',
    farmerPhone: '+229 94 56 78 90', minOrder: 100, stock: 800,
    description: 'Noix d\'anacarde de première qualité. Récolte manuelle.',
    certifications: ['Bio', 'Commerce équitable', 'Export']
  },
];

export default function Offres() {
  const [filter, setFilter] = useState('all');
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [orderModal, setOrderModal] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [orderStep, setOrderStep] = useState('form');
  const { isAuthenticated, user } = useAuth();

  const filteredOffers = filter === 'all' 
    ? offers 
    : offers.filter(o => o.region.toLowerCase() === filter);

  const handleOrderClick = (offer, e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    setOrderModal(offer);
    setQuantity(offer.minOrder.toString());
    setDeliveryAddress(user?.address || '');
    setOrderStep('form');
  };

  const calculateTotal = () => {
    const qty = parseFloat(quantity) || 0;
    return qty * (orderModal?.price || 0);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('fr-FR') + ' FCFA';
  };

  const getMaxQuantity = () => {
    return orderModal?.stock || 0;
  };

  const isQuantityValid = () => {
    const qty = parseFloat(quantity) || 0;
    return qty >= (orderModal?.minOrder || 0) && qty <= getMaxQuantity();
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (isQuantityValid()) {
      setOrderStep('confirmation');
    }
  };

  const confirmOrder = () => {
    setOrderStep('success');
    setTimeout(() => {
      setOrderModal(null);
      setOrderStep('form');
    }, 2000);
  };

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
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Découvrez les récoltes disponibles près de chez vous</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setFilter('all')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === 'all' ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>Toutes</button>
            <button onClick={() => setFilter('zou')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === 'zou' ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>Zou</button>
            <button onClick={() => setFilter('collines')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === 'collines' ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>Collines</button>
            <button onClick={() => setFilter('borgou')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${filter === 'borgou' ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}>Borgou</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOffers.map((offer) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -3 }}
                onClick={() => setSelectedOffer(offer)}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 group cursor-pointer"
              >
                <div className={`relative h-20 bg-gradient-to-r ${offer.iconColor} flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-2 right-2">
                    <span className="inline-flex items-center gap-0.5 text-[10px] bg-white/20 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full">
                      <Star className="w-2.5 h-2.5 fill-yellow-500 text-yellow-500" />
                      {offer.score}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-white">{offer.name}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">{offer.crop} – {offer.qty}</p>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-500 dark:text-gray-400">
                    <span className="inline-flex items-center gap-0.5"><MapPin className="w-2.5 h-2.5" />{offer.region}</span>
                    <span className="inline-flex items-center gap-0.5"><Calendar className="w-2.5 h-2.5" />{offer.date}</span>
                  </div>
                  <div className="mt-1.5">
                    <span className="inline-flex items-center gap-0.5 text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-full">
                      <TrendingUp className="w-2.5 h-2.5" />{offer.trend}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-sm font-bold text-green-600 dark:text-green-400">{formatPrice(offer.price)}/{offer.unit}</div>
                    <button onClick={(e) => handleOrderClick(offer, e)} className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-2.5 py-1 rounded-md text-[10px] font-medium hover:from-green-700 hover:to-emerald-700 transition shadow-sm flex items-center gap-1">
                      <ShoppingCart className="w-3 h-3" /> Commander
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Modal description */}
      <AnimatePresence>
        {selectedOffer && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedOffer(null)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-xl max-w-sm w-full max-h-[80vh] overflow-y-auto shadow-2xl">
              <div className={`relative h-24 bg-gradient-to-r ${selectedOffer.iconColor} rounded-t-xl flex items-center justify-center`}>
                <selectedOffer.icon className="w-10 h-10 text-white" />
                <button onClick={() => setSelectedOffer(null)} className="absolute top-2 right-2 p-1 bg-white/20 rounded-full text-white hover:bg-white/30 transition"><X className="w-4 h-4" /></button>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="font-bold text-gray-900 dark:text-white">{selectedOffer.name}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{selectedOffer.crop}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold text-green-600 dark:text-green-400">{formatPrice(selectedOffer.price)}/{selectedOffer.unit}</div>
                    <div className="flex items-center gap-0.5 mt-0.5"><Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /><span className="text-xs text-gray-600 dark:text-gray-400">{selectedOffer.score}</span></div>
                  </div>
                </div>
                <div className="mb-3"><p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{selectedOffer.description}</p></div>
                <div className="mb-3 p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1">👨‍🌾 Producteur</p>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{selectedOffer.farmer}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{selectedOffer.farmerPhone}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                    <Package className="w-3 h-3 text-green-600 mx-auto mb-0.5" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Quantité min.</p>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">{selectedOffer.minOrder} {selectedOffer.unit}</p>
                  </div>
                  <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                    <Truck className="w-3 h-3 text-green-600 mx-auto mb-0.5" />
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Livraison</p>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">Bénin entier</p>
                  </div>
                </div>
                {selectedOffer.certifications.length > 0 && (
                  <div className="mb-3"><div className="flex flex-wrap gap-1 justify-center">{selectedOffer.certifications.map((cert, idx) => (<span key={idx} className="inline-flex items-center gap-0.5 text-[9px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-full"><Shield className="w-2.5 h-2.5" /> {cert}</span>))}</div></div>
                )}
                <button onClick={(e) => { setSelectedOffer(null); handleOrderClick(selectedOffer, e); }} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-green-700 hover:to-emerald-700 transition flex items-center justify-center gap-2 mt-2"><ShoppingCart className="w-4 h-4" /> Commander</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal commande avec dark mode corrigé */}
      <AnimatePresence>
        {orderModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOrderModal(null)} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-gray-800 rounded-xl max-w-sm w-full shadow-2xl overflow-hidden">
              {orderStep === 'form' && (
                <>
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <div><h2 className="font-semibold text-gray-900 dark:text-white">{orderModal.name}</h2><p className="text-xs text-gray-500 dark:text-gray-400">{orderModal.crop}</p></div>
                      <button onClick={() => setOrderModal(null)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <form onSubmit={handleSubmitOrder} className="p-4 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Quantité ({orderModal.unit})</label>
                      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min={orderModal.minOrder} max={getMaxQuantity()} step="100" required className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                      <div className="flex justify-between mt-0.5"><p className="text-[10px] text-gray-500">Minimum: {orderModal.minOrder} {orderModal.unit}</p><p className="text-[10px] text-gray-500">Stock: {getMaxQuantity()} {orderModal.unit}</p></div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Adresse de livraison</label>
                      <textarea value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} rows="2" required className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none" placeholder="Votre adresse complète" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Mode de paiement</label>
                      <div className="flex gap-2">
                        <label className={`flex-1 flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition ${
                          paymentMethod === 'momo' 
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/30' 
                            : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}>
                          <input type="radio" value="momo" checked={paymentMethod === 'momo'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-3.5 h-3.5 text-green-600" />
                          <Smartphone className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-gray-700 dark:text-gray-200 font-medium">Mobile Money</span>
                        </label>
                        <label className={`flex-1 flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition ${
                          paymentMethod === 'card' 
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/30' 
                            : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}>
                          <input type="radio" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} className="w-3.5 h-3.5 text-green-600" />
                          <CreditCard className="w-4 h-4 text-green-600" />
                          <span className="text-xs text-gray-700 dark:text-gray-200 font-medium">Carte bancaire</span>
                        </label>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center mb-2"><span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total</span><span className="text-lg font-bold text-green-600 dark:text-green-400">{formatPrice(calculateTotal())}</span></div>
                      <button type="submit" disabled={!isQuantityValid()} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50 flex items-center justify-center gap-1">Continuer <ArrowRight className="w-3.5 h-3.5" /></button>
                      <p className="text-center text-[10px] text-gray-500 dark:text-gray-400 mt-2 flex items-center justify-center gap-1"><Lock className="w-3 h-3" /> Paiement 100% sécurisé</p>
                    </div>
                  </form>
                </>
              )}
              {orderStep === 'confirmation' && (
                <>
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700"><h2 className="font-semibold text-gray-900 dark:text-white">Confirmation</h2></div>
                  <div className="p-4 space-y-2">
                    <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p className="text-[10px] text-gray-500 dark:text-gray-400">Produit</p><p className="text-sm font-medium text-gray-900 dark:text-white">{orderModal.name}</p><p className="text-xs text-gray-600 dark:text-gray-400">{parseFloat(quantity).toLocaleString()} {orderModal.unit}</p></div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg"><p className="text-[10px] text-gray-500 dark:text-gray-400">Livraison</p><p className="text-xs text-gray-900 dark:text-white">{deliveryAddress}</p></div>
                    <div className="flex justify-between items-center pt-2"><span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total</span><span className="text-lg font-bold text-green-600 dark:text-green-400">{formatPrice(calculateTotal())}</span></div>
                    <div className="flex gap-2 pt-2"><button onClick={() => setOrderStep('form')} className="flex-1 px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">Retour</button><button onClick={confirmOrder} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-1.5 rounded-lg text-xs font-semibold hover:from-green-700 hover:to-emerald-700 transition">Confirmer</button></div>
                  </div>
                </>
              )}
              {orderStep === 'success' && (
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3"><Check className="w-6 h-6 text-green-600" /></div>
                  <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1">Commande confirmée !</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Votre commande a été envoyée au producteur.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
