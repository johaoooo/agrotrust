import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Leaf, Users, Handshake, Shield, Target, Heart, Quote, Sparkles } from 'lucide-react';

export default function APropos() {
  const missionRef = useRef(null);
  const histoireRef = useRef(null);
  const valeursRef = useRef(null);
  const chiffresRef = useRef(null);
  
  const isMissionInView = useInView(missionRef, { once: true, margin: "-100px" });
  const isHistoireInView = useInView(histoireRef, { once: true, margin: "-100px" });
  const isValeursInView = useInView(valeursRef, { once: true, margin: "-100px" });
  const isChiffresInView = useInView(chiffresRef, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Leaf,
      title: 'Agriculture Durable',
      description: 'Nous promouvons des pratiques agricoles respectueuses de l\'environnement.',
      color: 'from-green-500 to-emerald-500',
      delay: 0
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Une plateforme qui connecte agriculteurs et acheteurs locaux.',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.1
    },
    {
      icon: Handshake,
      title: 'Confiance',
      description: 'Système de réputation et certifications pour des transactions sécurisées.',
      color: 'from-purple-500 to-pink-500',
      delay: 0.2
    },
    {
      icon: Shield,
      title: 'Sécurité',
      description: 'Paiement sécurisé avec escrow et livraison certifiée.',
      color: 'from-orange-500 to-amber-500',
      delay: 0.3
    },
    {
      icon: Target,
      title: 'Impact',
      description: 'Améliorer les revenus des agriculteurs et l\'accès aux produits frais.',
      color: 'from-red-500 to-rose-500',
      delay: 0.4
    },
    {
      icon: Heart,
      title: 'Engagement',
      description: 'Une agriculture plus juste et durable pour tous.',
      color: 'from-pink-500 to-rose-500',
      delay: 0.5
    }
  ];

  const stats = [
    { value: '500+', label: 'Agriculteurs actifs', delay: 0 },
    { value: '89+', label: 'Acheteurs vérifiés', delay: 0.1 },
    { value: '12M', label: 'FCFA investis', delay: 0.2 },
    { value: '98%', label: 'Livraisons réussies', delay: 0.3 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero section avec nouvelle image */}
      <div className="relative h-[320px] md:h-[380px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/images/agri2.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        </div>

        {/* Effet de particules */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -100],
                x: [0, (Math.random() - 0.5) * 100]
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: Math.random() * 5
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white/90">Bienvenue chez Glégbé</span>
              </motion.div>
              
              <motion.h1 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              >
                À propos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Glégbé</span>
              </motion.h1>
              
              <motion.p 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
              >
                La première bourse agricole communautaire qui connecte directement les agriculteurs aux acheteurs
              </motion.p>
            </motion.div>
          </div>
        </div>
        
        {/* Vague décorative en bas */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-12">
            <path fill="currentColor" fillOpacity="0.1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Mission */}
      <div ref={missionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 md:p-10 text-center shadow-xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Notre mission</h2>
          <p className="text-base md:text-lg text-green-100 max-w-3xl mx-auto">
            Transformer l'agriculture ouest-africaine en permettant aux agriculteurs de vendre leurs récoltes avant même de les planter, 
            grâce à un système de paiement sécurisé et de mise en relation directe avec des acheteurs vérifiés.
          </p>
        </motion.div>
      </div>

      {/* Histoire */}
      <div ref={histoireRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isHistoireInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Notre histoire</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Glégbé est né d'un constat simple : les petits agriculteurs d'Afrique de l'Ouest n'ont pas accès aux marchés.
              Ils dépendent d'intermédiaires qui fixent les prix après la récolte, les laissant dans une position de faiblesse.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Notre solution permet aux agriculteurs de publier leurs récoltes futures via USSD (sans internet),
              et aux acheteurs de faire des offres en toute confiance grâce à notre système d'escrow.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Aujourd'hui, Glégbé connecte des centaines d'agriculteurs et d'acheteurs à travers le Bénin,
              avec pour ambition de s'étendre dans toute l'Afrique de l'Ouest.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isHistoireInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-2xl p-8 text-center flex flex-col justify-center border border-green-200 dark:border-green-800 hover:scale-105 transition-transform duration-300"
          >
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-4"
            >
              🌱
            </motion.div>
            <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">"Du champ à la table, sans intermédiaire"</p>
            <p className="text-gray-600 dark:text-gray-400">— Notre vision depuis 2025</p>
          </motion.div>
        </div>
      </div>

      {/* Nos valeurs */}
      <div ref={valeursRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isValeursInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Nos valeurs</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isValeursInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: value.delay, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-all`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Chiffres clés */}
      <div ref={chiffresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isChiffresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white shadow-xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Glégbé en chiffres</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={isChiffresInView ? { scale: 1 } : { scale: 0 }}
                transition={{ delay: stat.delay, type: "spring", stiffness: 200 }}
                className="text-center"
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={isChiffresInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: stat.delay + 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-sm text-green-100 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
