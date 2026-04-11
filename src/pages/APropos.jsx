import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { 
  Leaf, Users, Target, Heart, 
  Globe, TrendingUp, Shield, 
  CheckCircle, Zap, Star, Rocket,
  Quote, Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function APropos() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 150]);

  const stats = [
    { value: "5 000+", label: "Agriculteurs", gradient: "from-emerald-500 to-teal-500", delay: 0 },
    { value: "50M+", label: "FCFA distribués", gradient: "from-blue-500 to-cyan-500", delay: 0.1 },
    { value: "98%", label: "Satisfaction", gradient: "from-yellow-500 to-amber-500", delay: 0.2 },
    { value: "77", label: "Communes", gradient: "from-purple-500 to-pink-500", delay: 0.3 },
  ];

  const valeurs = [
    { title: "Innovation", description: "Des solutions technologiques adaptées aux réalités agricoles" },
    { title: "Confiance", description: "Relations transparentes et durables avec nos partenaires" },
    { title: "Impact", description: "Création de valeur pour les communautés rurales" },
    { title: "Solidarité", description: "Une communauté qui s'entraide et partage" },
  ];

  const equipe = [
    { nom: "Jean Adjanohoun", role: "CEO & Fondateur", description: "20 ans d'expérience" },
    { nom: "Marie Soglo", role: "Directrice Agriculture", description: "Experte en agronomie" },
    { nom: "Paul Dossou", role: "CTO", description: "Expert en solutions digitales" },
    { nom: "Amina Bello", role: "Relations Agriculteurs", description: "Liaison avec les coopératives" },
  ];

  const timeline = [
    { year: "2021", title: "Création", description: "Naissance d'AgroTrust" },
    { year: "2022", title: "Lancement", description: "Plateforme opérationnelle" },
    { year: "2023", title: "Expansion", description: "77 communes couvertes" },
    { year: "2024", title: "Impact", description: "50M FCFA distribués" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden bg-gradient-to-br from-emerald-900 to-teal-800">
        <div className="absolute inset-0 bg-black/30"></div>
        
        <motion.div 
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-20"></div>
        </motion.div>
        
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6"
            >
              <Leaf className="w-4 h-4 text-emerald-300" />
              <span className="text-sm text-white">Plateforme agricole certifiée</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Révolutionnons
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                l'agriculture
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-200 max-w-2xl mx-auto mb-8"
            >
              AgroTrust connecte les agriculteurs béninois aux marchés, au micro-crédit et aux formations.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/contact" className="px-8 py-3 bg-white text-emerald-700 rounded-xl font-semibold hover:shadow-lg transition">
                Nous contacter
              </Link>
              <Link to="/register" className="px-8 py-3 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold hover:bg-white/20 transition">
                Créer un compte
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full mb-4">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-emerald-600">Notre mission</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Transformer l'agriculture au Bénin
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              AgroTrust est né d'une conviction : l'agriculture béninoise a un potentiel énorme qui reste sous-exploité 
              faute d'accès aux marchés, au financement et à la formation.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Notre plateforme connecte directement les agriculteurs aux acheteurs, élimine les intermédiaires, 
              propose des micro-crédits adaptés et offre des formations pratiques.
            </p>
            <div className="flex flex-wrap gap-3">
              {["100% Béninois", "Impact social", "Développement durable"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl"
          >
            <Quote className="w-10 h-10 mb-4 opacity-80" />
            <p className="text-xl italic mb-6">
              "Faire du Bénin un leader de l'agriculture connectée en Afrique de l'Ouest"
            </p>
            <div className="pt-4 border-t border-white/20">
              <p className="font-semibold">Jean Adjanohoun</p>
              <p className="text-sm opacity-80">Fondateur & CEO</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Notre impact en chiffres</h2>
            <p className="text-emerald-100">Des résultats concrets depuis notre lancement</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: stat.delay }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-emerald-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Valeurs Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full mb-4">
            <Heart className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-emerald-600">Nos valeurs</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Ce qui nous guide</h2>
          <p className="text-gray-600 dark:text-gray-400">Des principes forts qui animent notre équipe</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valeurs.map((valeur, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{valeur.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{valeur.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Notre parcours</h2>
            <p className="text-gray-600 dark:text-gray-400">Quelques dates clés</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-emerald-600 mb-1">{item.year}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Équipe Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full mb-4">
            <Users className="w-4 h-4 text-emerald-600" />
            <span className="text-sm text-emerald-600">L'équipe</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Une équipe passionnée</h2>
          <p className="text-gray-600 dark:text-gray-400">Des experts au service des agriculteurs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipe.map((membre, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-white shadow-md">
                {membre.nom.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{membre.nom}</h3>
              <p className="text-emerald-600 dark:text-emerald-400 text-sm mb-2">{membre.role}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">{membre.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Final */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-10 text-center text-white">
          <h3 className="text-2xl font-bold mb-3">Rejoignez l'aventure AgroTrust</h3>
          <p className="text-emerald-100 mb-6 max-w-xl mx-auto">
            Que vous soyez agriculteur, acheteur ou partenaire, il y a une place pour vous.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="px-6 py-2 bg-white text-emerald-700 rounded-lg font-semibold hover:shadow-lg transition">
              Nous contacter
            </Link>
            <Link to="/register" className="px-6 py-2 bg-white/20 rounded-lg font-semibold hover:bg-white/30 transition">
              Créer un compte
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
