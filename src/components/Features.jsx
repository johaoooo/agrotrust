import { motion } from 'framer-motion';
import { 
  Users, 
  Store, 
  TrendingUp, 
  Shield,
  ArrowRight,
  Sprout,
  Smartphone,
  Wallet,
  Award
} from 'lucide-react';

const features = [
  {
    id: 1,
    title: "👨‍🌾 Agriculteurs",
    subtitle: "Vendez avant de planter",
    icon: Sprout,
    gradient: "from-green-500 to-emerald-600",
    bgGradient: "from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30",
    points: [
      "Publiez vos récoltes futures via USSD *700#",
      "Recevez des avances sur contrat jusqu'à 500K FCFA",
      "Paiement garanti à la livraison",
      "Accès sans internet, juste un téléphone"
    ],
    cta: "Devenir agriculteur",
    ctaLink: "#",
    stats: "+245 agriculteurs",
    statColor: "text-green-600"
  },
  {
    id: 2,
    title: "🏪 Acheteurs",
    subtitle: "Achetez en toute confiance",
    icon: Store,
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30",
    points: [
      "Accès direct aux producteurs locaux",
      "Prix transparents sans intermédiaire",
      "Paiement sécurisé via Mobile Money",
      "Livraison certifiée par agent terrain"
    ],
    cta: "Devenir acheteur",
    ctaLink: "#",
    stats: "+89 acheteurs",
    statColor: "text-blue-600"
  },
  {
    id: 3,
    title: "🤝 Investisseurs",
    subtitle: "Financez l'agriculture durable",
    icon: TrendingUp,
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30",
    points: [
      "Financez des projets agricoles rentables",
      "Impact social et environnemental mesurable",
      "Retour sur investissement garanti",
      "Partenariats avec ONG et institutions"
    ],
    cta: "Devenir partenaire",
    ctaLink: "#",
    stats: "12M FCFA investis",
    statColor: "text-purple-600"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export default function Features() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de la section - Version plus stylée */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Badge décoratif */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 px-4 py-2 rounded-full mb-4"
          >
            <span className="text-green-600 dark:text-green-400 text-sm font-semibold">🚀 Notre écosystème</span>
          </motion.div>

          {/* Titre principal avec effet gradient */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400 bg-clip-text text-transparent">
              Une plateforme pour
            </span>
            <br />
            <span className="relative inline-block mt-2">
              tous les acteurs
              {/* Soulignement décoratif */}
              <svg className="absolute -bottom-3 left-0 w-full" height="8" viewBox="0 0 300 8" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 4 Q75 0 150 4 Q225 8 300 4" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>

          {/* Description avec icônes */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto flex items-center justify-center gap-2 flex-wrap">
            <span>🌍</span>
            Glégbé connecte l'écosystème agricole ouest-africain
            <span>🌱</span>
            <br />
            pour une agriculture plus juste et durable
          </p>

          {/* Petite ligne décorative */}
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-12 h-1 bg-green-500 rounded-full"></div>
            <div className="w-6 h-1 bg-emerald-500 rounded-full"></div>
            <div className="w-3 h-1 bg-green-400 rounded-full"></div>
          </div>
        </motion.div>

        {/* Grille des blocs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`relative bg-gradient-to-br ${feature.bgGradient} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group`}
              >
                {/* Badge statistique */}
                <div className="absolute top-4 right-4 z-10">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 ${feature.statColor} bg-white dark:bg-gray-800 rounded-full text-xs font-semibold shadow-md`}>
                    <Award className="w-3 h-3" />
                    {feature.stats}
                  </span>
                </div>

                {/* Dégradé de fond animé */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                {/* Contenu */}
                <div className="relative p-6">
                  {/* Icône animée */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Titre */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                    {feature.subtitle}
                  </p>

                  {/* Liste des points */}
                  <ul className="space-y-2 mb-6">
                    {feature.points.map((point, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${feature.gradient} mt-1.5`}></div>
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Bouton CTA */}
                  <motion.a
                    href={feature.ctaLink}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-gradient-to-r ${feature.gradient} hover:shadow-lg transition-all group/btn`}
                  >
                    {feature.cta}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.a>
                </div>

                {/* Décoration du bas */}
                <div className={`h-1 w-full bg-gradient-to-r ${feature.gradient}`}></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Message supplémentaire */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 dark:text-gray-400">
            🚀 Rejoignez une communauté de plus de <span className="font-bold text-green-600 dark:text-green-400">500+ agriculteurs</span> et 
            <span className="font-bold text-blue-600 dark:text-blue-400"> 89+ acheteurs</span> à travers le Bénin
          </p>
        </motion.div>
      </div>
    </section>
  );
}
