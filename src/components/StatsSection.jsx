import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const stats = [
  { 
    image: "/images/i.jpg", 
    value: 512, 
    suffix: '+',
    label: 'Agriculteurs actifs',
    alt: 'Agriculteurs'
  },
  { 
    image: "/images/i1.jpg", 
    value: 89, 
    suffix: '+',
    label: 'Acheteurs vérifiés',
    alt: 'Acheteurs'
  },
  { 
    image: "/images/i2.jpg", 
    value: 12, 
    suffix: 'M',
    label: 'FCFA investis',
    alt: 'Investissements'
  },
  { 
    image: "/images/i3.jpg", 
    value: 4.8, 
    suffix: '/5',
    label: 'Note moyenne',
    alt: 'Notes'
  },
  { 
    image: "/images/i4.jpg", 
    value: 1240, 
    suffix: '+',
    label: 'Tonnes vendues',
    alt: 'Tonnes'
  },
  { 
    image: "/images/i.jpg", 
    value: 98, 
    suffix: '%',
    label: 'Livraisons réussies',
    alt: 'Livraisons'
  },
];

function CountUp({ end, suffix, duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {isInView ? count : 0}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 bg-gray-900 dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            AgroTrust en <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">chiffres</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            L'impact de notre plateforme sur l'écosystème agricole ouest-africain
          </p>
        </motion.div>

        {/* Grille des stats avec images en fond */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl"
              style={{ height: '280px' }}
            >
              {/* Image en fond */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={stat.image} 
                  alt={stat.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay sombre pour la lisibilité du texte */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
              </div>
              
              {/* Contenu par-dessus l'image */}
              <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
                {/* Valeur dynamique */}
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                
                {/* Label */}
                <div className="text-base md:text-lg text-green-400 font-semibold tracking-wide">
                  {stat.label}
                </div>

                {/* Ligne décorative */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full group-hover:w-24 transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
