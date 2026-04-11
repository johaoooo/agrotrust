import { motion } from 'framer-motion';
import { BookOpen, Video, FileQuestion, Download, ExternalLink } from 'lucide-react';

export default function Aide() {
  const guides = [
    { title: "Guide de l'agriculteur", description: "Comment publier vos récoltes", icon: BookOpen },
    { title: "Guide de l'acheteur", description: "Comment passer commande", icon: BookOpen },
    { title: "Tutoriels vidéo", description: "Formation pas à pas", icon: Video },
    { title: "FAQ complète", description: "Questions fréquentes", icon: FileQuestion },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Centre d'aide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Tout ce que vous devez savoir pour utiliser Glégbé
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {guides.map((guide, index) => {
          const Icon = guide.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">{guide.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{guide.description}</p>
              <button className="text-green-600 text-sm flex items-center justify-center gap-1">
                Consulter <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Besoin d'aide supplémentaire ?</h2>
        <p className="mb-4 opacity-90">Notre équipe est là pour vous accompagner</p>
        <button className="bg-white text-green-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
          Contacter le support
        </button>
      </div>
    </motion.div>
  );
}
