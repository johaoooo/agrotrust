import { motion } from 'framer-motion';
import { Star, Quote, User, Building2 } from 'lucide-react';

const testimonials = [
  {
    name: "Koffi Mensah",
    role: "Agriculteur - Zou",
    content: "Grâce à AgroTrust, j'ai vendu mon maïs avant même de le planter. J'ai reçu une avance qui m'a permis d'acheter des intrants de qualité.",
    rating: 5,
    type: "farmer",
    image: "👨‍🌾"
  },
  {
    name: "Amandine Guez",
    role: "Restauratrice - Cotonou",
    content: "Je trouve des produits frais directement auprès des producteurs. Prix transparents et livraison certifiée. Je recommande !",
    rating: 5,
    type: "buyer",
    image: "👩‍🍳"
  },
  {
    name: "Dr. Adjei",
    role: "Expert agricole - FAO",
    content: "Une solution innovante qui résout le problème d'accès au marché pour les petits agriculteurs. Le modèle est prometteur.",
    rating: 5,
    type: "expert",
    image: "👨‍🔬"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full mb-4">
            <Quote className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-semibold text-green-600 dark:text-green-400">Ils nous font confiance</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Ce qu'ils disent de <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">AgroTrust</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Building2 className="w-3 h-3" />
                    {testimonial.role}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Rejoignez <span className="font-bold text-green-600">500+ agriculteurs</span> et <span className="font-bold text-blue-600">89+ acheteurs</span> qui nous font confiance
          </p>
        </motion.div>
      </div>
    </section>
  );
}
