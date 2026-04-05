import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Hero() {
  const slides = [
    { image: "/images/agri.jpg" },
    { image: "/images/agri1.jpg" },
    { image: "/images/agri2.jpg" }
  ];

  return (
    <div className="relative bg-gradient-to-r from-green-600 to-green-500 dark:from-green-800 dark:to-green-700">
      {/* Carrousel en arrière-plan */}
      <div className="absolute inset-0">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                {/* Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                ></div>
                {/* Overlay sombre pour la lisibilité du texte */}
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Contenu texte */}
      <div className="relative z-10 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg"
          >
            La première bourse agricole qui paie avant la récolte.
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base md:text-lg mb-5 max-w-2xl mx-auto text-white drop-shadow-md"
          >
            Mise en relation directe agriculteurs ↔ acheteurs vérifiés<br />
            Paiement sécurisé Mobile Money • Livraison certifiée sur place
          </motion.p>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-green-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition shadow-lg"
            >
              Explorer les récoltes →
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Je suis agriculteur (USSD *700#)
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
