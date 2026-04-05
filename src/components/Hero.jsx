import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Import des styles Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Hero() {
  // Tes images locales (dans public/images/)
  const slides = [
    { image: "/images/agri.jpg" },
    { image: "/images/agri1.jpg" },
    { image: "/images/agri2.jpg" }
  ];

  return (
    <div className="relative bg-gradient-to-r from-green-700 to-green-500 dark:from-green-900 dark:to-green-700">
      {/* Carrousel Swiper en arrière-plan (opacité réduite) */}
      <div className="absolute inset-0 opacity-30">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Contenu texte original */}
      <div className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Growing Smarter. Farming Better.
          </motion.h1>
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl mb-6 max-w-2xl mx-auto text-white"
          >
            Mise en relation directe agriculteurs ↔ acheteurs vérifiés<br />
            Paiement sécurisé Mobile Money • Livraison certifiée sur place
          </motion.p>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-500 text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
            >
              Explorer les récoltes →
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Je suis agriculteur (USSD *700#)
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
