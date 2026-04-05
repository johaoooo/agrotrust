import { useState, useEffect, useRef } from 'react';
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
  LogIn,
  Package,
  CheckCircle,
  Clock,
  Truck,
  XCircle
} from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '../context/AuthContext';
import { commandesAPI } from '../services/api';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const notificationRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  // Charger les notifications
  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
      // Rafraîchir toutes les 30 secondes
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // Fermer le dropdown au clic en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await commandesAPI.getNotifications();
      setNotifications(data);
      setUnreadCount(data.filter(n => !n.est_lu).length);
    } catch (err) {
      console.error('Erreur chargement notifications:', err);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await commandesAPI.marquerNotificationLue(notificationId);
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, est_lu: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.est_lu);
    for (const notif of unreadNotifications) {
      await commandesAPI.marquerNotificationLue(notif.id);
    }
    setNotifications(notifications.map(n => ({ ...n, est_lu: true })));
    setUnreadCount(0);
  };

  const getNotificationIcon = (type) => {
    const icons = {
      commande_nouvelle: Package,
      commande_confirmee: CheckCircle,
      commande_payee: CheckCircle,
      commande_livree: Truck,
      commande_annulee: XCircle,
      paiement_recu: CheckCircle,
      livraison_prevue: Clock,
    };
    const Icon = icons[type] || Bell;
    return <Icon className="w-4 h-4" />;
  };

  const getNotificationColor = (type) => {
    const colors = {
      commande_nouvelle: 'text-blue-500',
      commande_confirmee: 'text-green-500',
      commande_payee: 'text-purple-500',
      commande_livree: 'text-emerald-500',
      commande_annulee: 'text-red-500',
    };
    return colors[type] || 'text-gray-500';
  };

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, color: 'text-emerald-500' },
    { name: 'Offres', href: '/offres', icon: Sprout, color: 'text-green-500' },
    { name: 'Contrats', href: '/contrats', icon: FileText, color: 'text-blue-500' },
    { name: 'Mes commandes', href: '/mes-commandes', icon: Package, color: 'text-indigo-500' },
    { name: 'Mon Compte', href: '/mon-compte', icon: User, color: 'text-purple-500' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const getInitials = () => {
    if (user && user.username) {
      return user.username.slice(0, 2).toUpperCase();
    }
    if (user && user.name) {
      return user.name.slice(0, 2).toUpperCase();
    }
    return 'U';
  };

  const getDisplayName = () => {
    if (user && user.username) {
      return user.username;
    }
    if (user && user.name) {
      return user.name.split(' ')[0];
    }
    return 'Compte';
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-700 rounded-xl rotate-45 group-hover:rotate-90 transition-transform duration-300 shadow-md"></div>
              <div className="absolute inset-0 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                <Sprout className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 dark:from-emerald-400 dark:to-green-600 bg-clip-text text-transparent">
                Glégbé
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative flex items-center gap-2 px-4 py-2 font-medium transition-all duration-200 ${
                    active 
                      ? 'text-green-700 dark:text-green-400' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                  <span className={active ? 'font-semibold' : ''}>{link.name}</span>
                  {active && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-green-500 rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications */}
            {isAuthenticated && (
              <div className="relative" ref={notificationRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full transition"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                    >
                      <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                        {unreadCount > 0 && (
                          <button onClick={markAllAsRead} className="text-xs text-green-600 hover:text-green-700">
                            Tout marquer comme lu
                          </button>
                        )}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-gray-500">
                            <Bell className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm">Aucune notification</p>
                          </div>
                        ) : (
                          notifications.map((notif) => {
                            const Icon = getNotificationIcon(notif.type);
                            const iconColor = getNotificationColor(notif.type);
                            return (
                              <div 
                                key={notif.id} 
                                className={`p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer ${!notif.est_lu ? 'bg-green-50 dark:bg-green-900/20' : ''}`}
                                onClick={() => {
                                  if (!notif.est_lu) markAsRead(notif.id);
                                  if (notif.lien) navigate(notif.lien);
                                  setIsNotificationsOpen(false);
                                }}
                              >
                                <div className="flex gap-3">
                                  <div className={`flex-shrink-0 ${iconColor}`}>
                                    <Icon />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{notif.titre}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{notif.message}</p>
                                    <p className="text-[10px] text-gray-400 mt-1">
                                      {new Date(notif.created_at).toLocaleString('fr-FR')}
                                    </p>
                                  </div>
                                  {!notif.est_lu && (
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                                  )}
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            <DarkModeToggle />

            {isAuthenticated ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-700 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-bold">{getInitials()}</span>
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-200">
                    {getDisplayName()}
                  </span>
                </motion.button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                    >
                      <div className="p-2">
                        <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700 mb-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.username || user?.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1 capitalize">{user?.role}</p>
                        </div>
                        <Link to="/mon-compte" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                          <User className="w-4 h-4" /> Mon profil
                        </Link>
                        <Link to="/mes-commandes" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                          <Package className="w-4 h-4" /> Mes commandes
                        </Link>
                        <Link to="/parametres" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                          <Settings className="w-4 h-4" /> Paramètres
                        </Link>
                        <Link to="/aide" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                          <HelpCircle className="w-4 h-4" /> Aide
                        </Link>
                        <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
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
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium text-sm hover:from-green-700 hover:to-emerald-700 transition shadow-md"
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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link 
                    key={link.name} 
                    to={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                      active 
                        ? 'text-green-700 dark:text-green-400 font-semibold' 
                        : 'text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'scale-110' : ''}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
              {!isAuthenticated && (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-green-600 font-medium rounded-lg transition">
                  <LogIn className="w-5 h-5" />
                  Connexion
                </Link>
              )}
              {isAuthenticated && (
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 rounded-lg transition">
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
