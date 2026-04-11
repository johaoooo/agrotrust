import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Leaf, Play, ChevronRight, ChevronLeft, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeCorner1, setActiveCorner1] = useState('top-right');
  const [activeCorner2, setActiveCorner2] = useState('bottom-left');
  
  // Images pour le slideshow principal
  const slideshowImages = [
    { src: '/images/mais.jpg', alt: 'Champ de maïs', title: 'Maïs - Culture principale' },
    { src: '/images/riz.jpg', alt: 'Rizières', title: 'Riz - Production locale' },
    { src: '/images/tomate.jpg', alt: 'Tomates fraîches', title: 'Tomate - Maraîchage' },
    { src: '/images/manioc.jpg', alt: 'Manioc', title: 'Manioc - Tubercule' }
  ];

  // Images pour les coins
  const cornerImages = [
    '/images/soja.jpg',
    '/images/piment.jpg',
    '/images/agri1.jpg',
    '/images/agri2.jpg',
    '/images/ar.jpg',
    '/images/i1.jpg',
    '/images/i2.jpg',
    '/images/i3.jpg',
    '/images/i4.jpg'
  ];

  const [cornerImage1, setCornerImage1] = useState(cornerImages[0]);
  const [cornerImage2, setCornerImage2] = useState(cornerImages[1]);

  // Positions avec plus d'espace pour les grandes images
  const cornerPositions = {
    'top-right': { top: -40, right: -40, bottom: 'auto', left: 'auto' },
    'top-left': { top: -40, left: -40, bottom: 'auto', right: 'auto' },
    'bottom-right': { bottom: -40, right: -40, top: 'auto', left: 'auto' },
    'bottom-left': { bottom: -40, left: -40, top: 'auto', right: 'auto' },
    'middle-right': { top: '50%', right: -40, transform: 'translateY(-50%)', bottom: 'auto', left: 'auto' },
    'middle-left': { top: '50%', left: -40, transform: 'translateY(-50%)', bottom: 'auto', right: 'auto' },
    'top-center': { top: -40, left: '50%', transform: 'translateX(-50%)', bottom: 'auto', right: 'auto' },
    'bottom-center': { bottom: -40, left: '50%', transform: 'translateX(-50%)', top: 'auto', right: 'auto' }
  };

  // Rotation des positions et changement d'images
  useEffect(() => {
    const corners = ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'middle-right', 'middle-left', 'top-center', 'bottom-center'];
    
    const interval = setInterval(() => {
      let newCorner1 = corners[Math.floor(Math.random() * corners.length)];
      let newCorner2 = corners[Math.floor(Math.random() * corners.length)];
      
      while (newCorner1 === newCorner2) {
        newCorner2 = corners[Math.floor(Math.random() * corners.length)];
      }
      
      setActiveCorner1(newCorner1);
      setActiveCorner2(newCorner2);
      
      const randomImage1 = cornerImages[Math.floor(Math.random() * cornerImages.length)];
      const randomImage2 = cornerImages[Math.floor(Math.random() * cornerImages.length)];
      
      setCornerImage1(randomImage1);
      setCornerImage2(randomImage2);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Slideshow automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length);
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Texte à gauche */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full mb-6 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Agriculture connectée au Bénin</span>
              <Zap className="w-4 h-4" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Cultivez votre avenir avec{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                AgroTrust
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              La première plateforme qui connecte les agriculteurs béninois aux marchés, 
              au micro-crédit et aux formations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/offres"
                className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 hover:gap-3"
              >
                Commencer
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/conseils-semis"
                className="border-2 border-green-600 text-green-600 dark:text-green-400 px-8 py-3 rounded-full font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Conseils de semis
              </Link>
            </motion.div>
          </motion.div>

          {/* Section image principale */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Cercle décoratif animé */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 360]
                }}
                transition={{ 
                  scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" }
                }}
                className="absolute -inset-12 rounded-full bg-gradient-to-r from-green-300/15 to-emerald-300/15 blur-2xl"
              />

              {/* Cadre principal */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 w-full max-w-sm mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.92, rotateY: -10 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 0.92, rotateY: 10 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 25 }}
                  >
                    <img
                      src={slideshowImages[currentImageIndex].src}
                      alt={slideshowImages[currentImageIndex].alt}
                      className="w-full h-[300px] md:h-[350px] object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent"></div>
                    
                    <motion.div 
                      className="absolute bottom-5 left-5 right-5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      <span className="text-white text-sm font-medium backdrop-blur-md bg-black/40 px-4 py-1.5 rounded-full inline-block">
                        {slideshowImages[currentImageIndex].title}
                      </span>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                {/* Effet de brillance */}
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </div>

                {/* Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Indicateurs */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {slideshowImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        currentImageIndex === idx 
                          ? 'w-8 h-1.5 bg-white shadow-lg' 
                          : 'w-2 h-1.5 bg-white/40 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Grande image 1 - style polaroid */}
              <motion.div
                key={`${activeCorner1}-${cornerImage1}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  top: cornerPositions[activeCorner1]?.top || 'auto',
                  right: cornerPositions[activeCorner1]?.right || 'auto',
                  bottom: cornerPositions[activeCorner1]?.bottom || 'auto',
                  left: cornerPositions[activeCorner1]?.left || 'auto',
                  transform: cornerPositions[activeCorner1]?.transform || 'none'
                }}
                transition={{ 
                  duration: 0.8, 
                  type: "spring", 
                  stiffness: 350,
                  damping: 30
                }}
                whileHover={{ scale: 1.08, rotate: 3, zIndex: 30 }}
                className="absolute w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 cursor-pointer z-20"
              >
                <img
                  src={cornerImage1}
                  alt="Culture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center py-1">
                  Culture béninoise
                </div>
              </motion.div>

              {/* Grande image 2 - style polaroid */}
              <motion.div
                key={`${activeCorner2}-${cornerImage2}`}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  top: cornerPositions[activeCorner2]?.top || 'auto',
                  right: cornerPositions[activeCorner2]?.right || 'auto',
                  bottom: cornerPositions[activeCorner2]?.bottom || 'auto',
                  left: cornerPositions[activeCorner2]?.left || 'auto',
                  transform: cornerPositions[activeCorner2]?.transform || 'none'
                }}
                transition={{ 
                  duration: 0.8, 
                  type: "spring", 
                  stiffness: 350,
                  damping: 30
                }}
                whileHover={{ scale: 1.08, rotate: -3, zIndex: 30 }}
                className="absolute w-40 h-40 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 cursor-pointer z-20"
              >
                <img
                  src={cornerImage2}
                  alt="Récolte"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center py-1">
                  Récolte abondante
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
