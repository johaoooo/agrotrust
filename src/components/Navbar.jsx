import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Sprout, 
  FileText, 
  User, 
  Bell, 
  Menu, 
  X,
  LogOut,
  Settings,
  HelpCircle,
  LogIn
} from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  // Tous les liens du menu - toujours visibles
  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, color: 'text-emerald-500' },
    { name: 'Offres', href: '/offres', icon: Sprout, color: 'text-green-500' },
    { name: 'Contrats', href: '/contrats', icon: FileText, color: 'text-blue-500' },
    { name: 'Mon Compte', href: '/mon-compte', icon: User, color: 'text-purple-500' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const getInitials = () => {
    if (user && user.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return 'U';
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-700 rounded-xl rotate-45 group-hover:rotate-90 transition-transform duration-300 shadow-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                <Sprout className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 dark:from-emerald-400 dark:to-green-600 bg-clip-text text-transparent">
                AgroTrust
              </span>
            </div>
          </Link>

          {/* Liens de navigation - Desktop - TOUJOURS VISIBLES */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`group relative flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.href)
                      ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900/30'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${link.color} group-hover:scale-110 transition-transform`} />
                  <span>{link.name}</span>
                  {isActive(link.href) && (
                    <span className="absolute inset-x-4 bottom-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions à droite */}
          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900"></span>
              </motion.button>
            )}

            <DarkModeToggle />

            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-700 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-bold">{getInitials()}</span>
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user?.name?.split(' ')[0] || 'Compte'}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                    >
                      <div className="p-2">
                        <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 mb-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1 capitalize">{user?.role}</p>
                        </div>
                        <Link to="/mon-compte" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                          <User className="w-4 h-4" /> Mon profil
                        </Link>
                        <Link to="/parametres" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                          <Settings className="w-4 h-4" /> Paramètres
                        </Link>
                        <Link to="/aide" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                          <HelpCircle className="w-4 h-4" /> Aide
                        </Link>
                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                        >
                          <LogOut className="w-4 h-4" /> Déconnexion
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition shadow-md"
              >
                <LogIn className="w-4 h-4" />
                Connexion
              </Link>
            )}

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.name} to={link.href} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    isActive(link.href) ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900/30'
                  }`}>
                    <Icon className={`w-5 h-5 ${link.color}`} />
                    <span className="font-medium">{link.name}</span>
                  </Link>
                );
              })}
              {!isAuthenticated && (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-green-600 font-medium rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition">
                  <LogIn className="w-5 h-5" />
                  Connexion
                </Link>
              )}
              {isAuthenticated && (
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                  <LogOut className="w-5 h-5" />
                  Déconnexion
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
