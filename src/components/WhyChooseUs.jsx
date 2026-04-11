import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  PiggyBank, 
  Handshake, 
  GraduationCap, 
  Truck, 
  ShieldCheck, 
  ChartNoAxesCombined,
  Headphones,
  MapPin,
  TrendingUp,
  Users,
  Award,
  Star,
  Rocket,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: PiggyBank,
    title: "Micro-crédit",
    description: "Financement accessible sans garantie",
    stat: "Taux à partir de 5%",
    color: "#10b981"
  },
  {
    icon: Handshake,
    title: "Vente directe",
    description: "Sans intermédiaires",
    stat: "+40% de revenus",
    color: "#3b82f6"
  },
  {
    icon: GraduationCap,
    title: "Formation",
    description: "Accompagnement expert",
    stat: "50+ modules",
    color: "#8b5cf6"
  },
  {
    icon: Truck,
    title: "Logistique",
    description: "Transport garanti",
    stat: "Livraison 48h",
    color: "#f59e0b"
  },
  {
    icon: ShieldCheck,
    title: "Paiement sécurisé",
    description: "Transactions protégées",
    stat: "100% garanti",
    color: "#14b8a6"
  },
  {
    icon: ChartNoAxesCombined,
    title: "Suivi temps réel",
    description: "Tableau de bord",
    stat: "Analytics avancé",
    color: "#ef4444"
  },
  {
    icon: Headphones,
    title: "Support 24/7",
    description: "Assistance dédiée",
    stat: "Réponse < 1h",
    color: "#ec4899"
  },
  {
    icon: MapPin,
    title: "Couverture nationale",
    description: "Présence partout",
    stat: "77 communes",
    color: "#06b6d4"
  }
];

// Composant de compteur animé
const AnimatedCounter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span ref={ref} className="text-2xl md:text-4xl font-bold">
      {count}{suffix}
    </span>
  );
};

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <section ref={sectionRef} className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, type: "spring" }}
            className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full mb-5"
          >
            <Star className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Pourquoi AgroTrust</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Pourquoi choisir{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              AgroTrust
            </span>
            ?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-gray-600 dark:text-gray-400"
          >
            La plateforme qui transforme l'agriculture au Bénin
          </motion.p>
        </motion.div>

        {/* Cartes */}
        <motion.div 
          style={{ opacity, scale }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative h-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
                
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ backgroundColor: feature.color }}
                />
                
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
                  style={{ backgroundColor: feature.color }}
                />
                
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon style={{ color: feature.color }} className="w-7 h-7" />
                </motion.div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                <motion.div 
                  className="flex items-center gap-1.5 pt-3 border-t border-gray-100 dark:border-gray-700"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <TrendingUp className="w-3.5 h-3.5" style={{ color: feature.color }} />
                  <span className="text-xs font-semibold" style={{ color: feature.color }}>
                    {feature.stat}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bande de statistiques DYNAMIQUE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-8 md:p-10 text-center text-white relative overflow-hidden">
            
            {/* Effet de particules flottantes */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                  }}
                  animate={{
                    y: ["0%", "100%", "0%"],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                <Rocket className="w-12 h-12 mx-auto mb-4 text-white/80" />
                <p className="text-xl md:text-2xl font-bold mb-2">
                  Rejoignez une communauté d'agriculteurs
                </p>
                <p className="text-lg mb-8 text-white/90">en pleine croissance</p>
              </motion.div>
              
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-center">
                {/* Carte 1 - Agriculteurs */}
                <motion.div
                  initial={{ scale: 0, rotateY: 90 }}
                  whileInView={{ scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 min-w-[140px]"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  >
                    <Users className="w-8 h-8 mb-2" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-bold">
                    <AnimatedCounter target={5000} suffix="+" />
                  </div>
                  <div className="text-sm mt-1 opacity-90">Agriculteurs</div>
                  <motion.div 
                    className="w-12 h-0.5 bg-white/50 mt-3"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  />
                </motion.div>
                
                {/* Carte 2 - FCFA */}
                <motion.div
                  initial={{ scale: 0, rotateY: 90 }}
                  whileInView={{ scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 min-w-[140px]"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  >
                    <PiggyBank className="w-8 h-8 mb-2" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-bold">
                    <AnimatedCounter target={50} suffix="M+" />
                  </div>
                  <div className="text-sm mt-1 opacity-90">FCFA distribués</div>
                  <motion.div 
                    className="w-12 h-0.5 bg-white/50 mt-3"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  />
                </motion.div>
                
                {/* Carte 3 - Satisfaction */}
                <motion.div
                  initial={{ scale: 0, rotateY: 90 }}
                  whileInView={{ scale: 1, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7, duration: 0.6, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 min-w-[140px]"
                >
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Award className="w-8 h-8 mb-2" />
                  </motion.div>
                  <div className="text-3xl md:text-4xl font-bold">
                    <AnimatedCounter target={98} suffix="%" />
                  </div>
                  <div className="text-sm mt-1 opacity-90">Satisfaction</div>
                  <motion.div 
                    className="w-12 h-0.5 bg-white/50 mt-3"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    transition={{ delay: 1, duration: 0.5 }}
                  />
                </motion.div>
              </div>

              {/* Bouton CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-emerald-600 px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  <Zap className="w-4 h-4" />
                  Rejoindre maintenant
                  <Rocket className="w-4 h-4" />
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
