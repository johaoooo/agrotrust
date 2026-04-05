import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Shield, Edit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function MonCompte() {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Mon compte</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user?.name || 'Utilisateur'}</h2>
              <p className="text-green-100">{user?.role || 'Acheteur Premium'}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Mail className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                <p className="font-medium">{user?.email || 'restaurant@email.com'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Phone className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Téléphone</p>
                <p className="font-medium">{user?.phone || '+229 01 23 45 67'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <MapPin className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Adresse</p>
                <p className="font-medium">{user?.address || 'Cotonou, Bénin'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Statut</p>
                <p className="font-medium text-green-600">Vérifié</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
              <Edit className="w-4 h-4" />
              Modifier le profil
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
