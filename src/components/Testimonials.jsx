import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: "Koffi Mensah", role: "Agriculteur - Zou", content: "Grâce à Glégbé, j'ai vendu mon maïs avant de le planter. J'ai reçu une avance qui m'a permis d'acheter des intrants de qualité.", rating: 5, image: "👨‍🌾" },
  { name: "Amandine Guez", role: "Restauratrice - Cotonou", content: "Je trouve des produits frais directement auprès des producteurs. Prix transparents et livraison certifiée.", rating: 5, image: "👩‍🍳" },
  { name: "Dr. Adjei", role: "Expert agricole - FAO", content: "Une solution innovante qui résout le problème d'accès au marché pour les petits agriculteurs.", rating: 5, image: "👨‍🔬" },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full mb-4">
            <Quote className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-600">Témoignages</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Ils nous font confiance</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-3xl">{t.image}</div>
                <div><h3 className="font-bold text-gray-900 dark:text-white">{t.name}</h3><p className="text-sm text-gray-500">{t.role}</p></div>
              </div>
              <div className="flex gap-1 mb-3">{[...Array(t.rating)].map((_, j) => (<Star key={j} className="w-4 h-4 fill-yellow-500 text-yellow-500" />))}</div>
              <p className="text-gray-600 dark:text-gray-300 text-sm italic">"{t.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
