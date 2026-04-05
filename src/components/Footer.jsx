export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-900 dark:bg-gray-950 text-white mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Colonne 1 - Logo & Description */}
          <div>
            <div className="text-2xl font-bold mb-3">🌱 AgroTrust</div>
            <p className="text-green-200 dark:text-green-300 text-sm">
              La Bourse Agricole Communautaire de l'Afrique de l'Ouest.
              Connecter les agriculteurs aux acheteurs vérifiés.
            </p>
          </div>

          {/* Colonne 2 - Liens rapides */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Liens rapides</h3>
            <ul className="space-y-2 text-sm text-green-200 dark:text-green-300">
              <li><a href="#" className="hover:text-white transition">Accueil</a></li>
              <li><a href="#" className="hover:text-white transition">Explorer les offres</a></li>
              <li><a href="#" className="hover:text-white transition">Comment ça marche</a></li>
              <li><a href="#" className="hover:text-white transition">Devenir agriculteur</a></li>
              <li><a href="#" className="hover:text-white transition">Devenir acheteur</a></li>
            </ul>
          </div>

          {/* Colonne 3 - Ressources */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Ressources</h3>
            <ul className="space-y-2 text-sm text-green-200 dark:text-green-300">
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Centre d'aide</a></li>
              <li><a href="#" className="hover:text-white transition">Blog agricole</a></li>
              <li><a href="#" className="hover:text-white transition">Témoignages</a></li>
              <li><a href="#" className="hover:text-white transition">Devenir agent terrain</a></li>
            </ul>
          </div>

          {/* Colonne 4 - Contact & Mobile Money */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Contact</h3>
            <ul className="space-y-2 text-sm text-green-200 dark:text-green-300">
              <li>📞 +229 01 23 45 67</li>
              <li>✉️ contact@agrotrust.com</li>
              <li>📍 Cotonou, Bénin</li>
            </ul>
            <div className="mt-4">
              <p className="text-sm font-semibold mb-2">Paiement sécurisé via :</p>
              <div className="flex gap-3 text-sm">
                <span className="bg-green-800 dark:bg-green-900 px-2 py-1 rounded">MTN MoMo</span>
                <span className="bg-green-800 dark:bg-green-900 px-2 py-1 rounded">Moov</span>
                <span className="bg-green-800 dark:bg-green-900 px-2 py-1 rounded">Orange Money</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-green-800 dark:border-green-900 mt-8 pt-6 text-center text-sm text-green-300">
          <p>&copy; {currentYear} AgroTrust – Tous droits réservés</p>
          <p className="mt-1">
            <a href="#" className="hover:text-white transition">Mentions légales</a> | 
            <a href="#" className="hover:text-white transition ml-2">Confidentialité</a> | 
            <a href="#" className="hover:text-white transition ml-2">CGU</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
