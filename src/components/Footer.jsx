import { motion } from 'framer-motion';
import { 
  Sprout, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard,
  Smartphone,
  Shield,
  ChevronRight,
  Clock,
  Heart
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platforme: [
      { name: 'Dashboard', href: '#' },
      { name: 'Explorer les offres', href: '#' },
      { name: 'Comment ça marche', href: '#' },
      { name: 'Devenir agriculteur', href: '#' },
      { name: 'Devenir acheteur', href: '#' },
    ],
    ressources: [
      { name: 'FAQ', href: '#' },
      { name: 'Centre d\'aide', href: '#' },
      { name: 'Blog agricole', href: '#' },
      { name: 'Témoignages', href: '#' },
      { name: 'Devenir agent terrain', href: '#' },
    ],
    legal: [
      { name: 'Mentions légales', href: '#' },
      { name: 'Confidentialité', href: '#' },
      { name: 'CGU', href: '#' },
      { name: 'Cookies', href: '#' },
    ]
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 mt-16">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-white">Restez informé</h3>
              <p className="text-sm text-gray-400">Recevez les nouvelles offres et actualités</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Votre email"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition shadow-lg">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Colonne 1 - Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">AgroTrust</span>
            </div>
            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
              La Bourse Agricole Communautaire de l'Afrique de l'Ouest. 
              Connecter les agriculteurs aux acheteurs vérifiés pour une 
              agriculture plus juste et durable.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-green-500" />
                <span>+229 01 23 45 67</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-green-500" />
                <span>contact@agrotrust.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-green-500" />
                <span>Cotonou, Bénin</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-green-500" />
                <span>Lun - Ven: 8h - 18h</span>
              </div>
            </div>
          </div>

          {/* Colonne 2 - Plateforme */}
          <div>
            <h3 className="font-semibold text-white mb-4">Plateforme</h3>
            <ul className="space-y-2">
              {footerLinks.platforme.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-green-400 transition flex items-center gap-1 group">
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 - Ressources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Ressources</h3>
            <ul className="space-y-2">
              {footerLinks.ressources.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-green-400 transition flex items-center gap-1 group">
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 - Légal & Partenaires */}
          <div>
            <h3 className="font-semibold text-white mb-4">Légal</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-gray-400 hover:text-green-400 transition flex items-center gap-1 group">
                    <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Partenaires paiement */}
            <h3 className="font-semibold text-white mb-3">Paiement sécurisé</h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 text-xs bg-gray-800 px-2 py-1 rounded-lg text-gray-300">
                <CreditCard className="w-3 h-3" /> MTN MoMo
              </span>
              <span className="inline-flex items-center gap-1 text-xs bg-gray-800 px-2 py-1 rounded-lg text-gray-300">
                <Smartphone className="w-3 h-3" /> Moov
              </span>
              <span className="inline-flex items-center gap-1 text-xs bg-gray-800 px-2 py-1 rounded-lg text-gray-300">
                <Shield className="w-3 h-3" /> Orange Money
              </span>
            </div>
          </div>
        </div>

        {/* Bas du footer - Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} AgroTrust – Tous droits réservés
          </p>
          <p className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-1">
            Fait avec <Heart className="w-3 h-3 text-red-500" /> au Bénin
          </p>
        </div>
      </div>
    </footer>
  );
}
