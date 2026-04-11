import { motion } from 'framer-motion';
import { Users, Store, TrendingUp, Package, CheckCircle, Sprout } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Agriculteurs actifs', icon: Users, color: 'from-green-500 to-emerald-600' },
  { value: '89+', label: 'Acheteurs vérifiés', icon: Store, color: 'from-blue-500 to-cyan-600' },
  { value: '12M', label: 'FCFA investis', icon: TrendingUp, color: 'from-purple-500 to-pink-600' },
  { value: '98%', label: 'Livraisons réussies', icon: Package, color: 'from-amber-500 to-orange-600' },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="text-white"
              >
                <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-100 mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
