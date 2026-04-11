import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Package, 
  Heart, 
  Share2, 
  Star,
  Truck,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  ArrowRight,
  Leaf
} from 'lucide-react';

const mockOffers = [
  {
    id: 1,
    title: "Maïs blanc bio",
    category: "Céréales",
    price: 25000,
    unit: "tonne",
    quantity: 5,
    location: "Zou",
    farmer: "Jean Adjanohoun",
    rating: 4.8,
    reviews: 24,
    image: "/images/mais.jpg",
    isOrganic: true,
    delivery: true
  },
  {
    id: 2,
    title: "Soja de qualité",
    category: "Légumineuses",
    price: 30000,
    unit: "tonne",
    quantity: 3,
    location: "Collines",
    farmer: "Marie Soglo",
    rating: 4.9,
    reviews: 18,
    image: "/images/soja.jpg",
    isOrganic: true,
    delivery: true
  },
  {
    id: 3,
    title: "Tomate fraîche",
    category: "Maraîchage",
    price: 15000,
    unit: "caisse",
    quantity: 50,
    location: "Atlantique",
    farmer: "Paul Dossou",
    rating: 4.7,
    reviews: 32,
    image: "/images/tomate.jpg",
    isOrganic: false,
    delivery: true
  },
  {
    id: 4,
    title: "Manioc premium",
    category: "Tubercules",
    price: 20000,
    unit: "tonne",
    quantity: 8,
    location: "Borgou",
    farmer: "Fatou Saka",
    rating: 4.9,
    reviews: 15,
    image: "/images/manioc.jpg",
    isOrganic: true,
    delivery: true
  },
  {
    id: 5,
    title: "Piment rouge",
    category: "Épices",
    price: 8000,
    unit: "kg",
    quantity: 100,
    location: "Mono",
    farmer: "Koffi Akoué",
    rating: 4.6,
    reviews: 22,
    image: "/images/piment.jpg",
    isOrganic: true,
    delivery: true
  },
  {
    id: 6,
    title: "Riz local",
    category: "Céréales",
    price: 18000,
    unit: "sac",
    quantity: 20,
    location: "Ouémé",
    farmer: "Amina Bello",
    rating: 4.8,
    reviews: 28,
    image: "/images/riz.jpg",
    isOrganic: false,
    delivery: true
  }
];

const OffersList = ({ selectedCrop, selectedRegion }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedOffers, setLikedOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    setTimeout(() => {
      setOffers(mockOffers);
      setLoading(false);
    }, 500);
  }, []);

  const filteredOffers = offers.filter(offer => {
    if (selectedCrop !== 'all' && !offer.title.toLowerCase().includes(selectedCrop.toLowerCase())) return false;
    if (selectedRegion !== 'all' && offer.location !== selectedRegion) return false;
    return true;
  });

  const pageCount = Math.ceil(filteredOffers.length / itemsPerPage);
  const paginatedOffers = filteredOffers.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const toggleLike = (id) => {
    setLikedOffers(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm animate-pulse">
            <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-5 space-y-3">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredOffers.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucune offre trouvée</h3>
        <p className="text-gray-500 dark:text-gray-400">Aucune offre ne correspond à vos critères</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {paginatedOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              {/* Badge Bio */}
              {offer.isOrganic && (
                <div className="absolute top-3 left-3 z-10 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                  <Leaf className="w-3 h-3" />
                  Bio
                </div>
              )}
              
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Actions rapides */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => toggleLike(offer.id)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${likedOffers.includes(offer.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                  <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {/* Contenu */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      {offer.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                      {offer.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{offer.rating}</span>
                    <span className="text-xs text-gray-500">({offer.reviews})</span>
                  </div>
                </div>
                
                {/* Informations */}
                <div className="space-y-2 mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{offer.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Package className="w-4 h-4" />
                    <span>{offer.quantity} {offer.unit}(s) disponibles</span>
                  </div>
                </div>
                
                {/* Prix */}
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {offer.price.toLocaleString()} FCFA
                      </span>
                      <span className="text-xs text-gray-500">/{offer.unit}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">Livraison</span>
                    </div>
                  </div>
                </div>
                
                {/* Bouton commander */}
                <button className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2.5 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group">
                  <ShoppingBag className="w-4 h-4" />
                  Commander
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-1">
            {Array.from({ length: pageCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                  currentPage === idx
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(pageCount - 1, prev + 1))}
            disabled={currentPage === pageCount - 1}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default OffersList;
