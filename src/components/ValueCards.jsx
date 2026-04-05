import { Leaf, Handshake, Shield } from 'lucide-react';

const cards = [
  {
    icon: Leaf,
    title: "Agriculture Durable",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Handshake,
    title: "Vente Directe",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Paiement Sécurisé",
    color: "from-purple-500 to-pink-500"
  },
];

export default function ValueCards() {
  return (
    <section className="py-4 bg-transparent">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-1 sm:gap-4">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className="group text-center">
                <div
                  className={`w-10 h-10 sm:w-14 sm:h-14 mx-auto rounded-full bg-gradient-to-r ${card.color} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all hover:scale-105`}
                >
                  <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-[10px] sm:text-base font-semibold text-gray-800 dark:text-white mt-1 sm:mt-3">
                  {card.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
