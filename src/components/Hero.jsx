import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Leaf, TrendingUp, Shield } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Hero() {
  const slides = [
    { image: "/images/agri.jpg" },
    { image: "/images/agri1.jpg" },
    { image: "/images/agri2.jpg" },
  ];

  return (
    <div className="relative h-[280px] md:h-[320px] overflow-hidden">
      {/* Carrousel en arrière-plan */}
      <div className="absolute inset-0 w-full h-full">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <img 
                  src={slide.image} 
                  alt="Agriculture"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Badge décoratif à gauche */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md rounded-r-2xl py-3 px-3 border-l-4 border-green-500 shadow-lg"
        >
          <div className="flex flex-col gap-2">
            <div className="text-center">
              <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-0.5">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <p className="text-[9px] text-white/80">Bio</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-0.5">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <p className="text-[9px] text-white/80">Local</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-0.5">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <p className="text-[9px] text-white/80">Sécurisé</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contenu texte */}
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="bg-black/10 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-white/10"
          >
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-1 drop-shadow"
            >
              La première bourse agricole qui paie avant la récolte.
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[10px] md:text-xs lg:text-sm text-white/95 mb-1"
            >
              Mise en relation directe agriculteurs ↔ acheteurs vérifiés
            </motion.p>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-[9px] md:text-[11px] text-white/90 mb-3"
            >
              Paiement sécurisé Mobile Money • Livraison certifiée sur place
            </motion.p>
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-2 justify-center"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-700 px-3 py-1 rounded-lg font-semibold hover:bg-gray-100 transition shadow-md text-[10px] md:text-xs"
              >
                Explorer les récoltes →
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 text-white px-3 py-1 rounded-lg font-semibold hover:bg-white/30 transition border border-white/30 shadow-md text-[10px] md:text-xs"
              >
                Je suis agriculteur (USSD *700#)
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
