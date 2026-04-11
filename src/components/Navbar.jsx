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
  CheckCircle,
  Truck,
  GraduationCap,
  Users,
  Calendar,
  Shield,
  CreditCard,
  ShoppingBag,
  ChevronDown,
  Leaf,
  Heart,
  BookOpen,
  MessageCircle,
  Award,
  Phone,
  Info,
  Flower2
} from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const notificationRef = useRef(null);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Commande confirmée', message: 'Votre commande de maïs a été confirmée', time: 'Il y a 2 heures', read: false, icon: CheckCircle, color: 'text-green-500' },
    { id: 2, title: 'Livraison en cours', message: 'Votre commande de tomate est en livraison', time: 'Il y a 5 heures', read: false, icon: Truck, color: 'text-blue-500' },
    { id: 3, title: 'Nouvelle offre', message: 'Un nouveau produit bio est disponible', time: 'Il y a 1 jour', read: true, icon: Leaf, color: 'text-emerald-500' },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, read: true } : notif)
    );
  };

  const menuItems = [
    { name: 'Offres', href: '/offres', icon: Sprout },
    { name: 'Contrats', href: '/contrats', icon: FileText },
    { 
      name: 'Services', 
      icon: Leaf,
      dropdown: [
        { name: 'Conseils de semis', href: '/conseils-semis', icon: Flower2 },
        { name: 'Micro-crédit', href: '/micro-credit', icon: CreditCard },
        { name: 'Formation', href: '/formation', icon: GraduationCap },
        { name: 'Certification', href: '/certification', icon: Shield },
        { name: 'Calendrier des semis', href: '/calendrier-semis', icon: Calendar },
      ]
    },
    { 
      name: 'Communauté', 
      icon: Users,
      dropdown: [
        { name: 'Forum', href: '/communaute', icon: MessageCircle },
        { name: 'Entraide', href: '/entraide', icon: Heart },
      ]
    },
    { 
      name: 'Ressources', 
      icon: BookOpen,
      dropdown: [
        { name: 'À propos', href: '/a-propos', icon: Info },
        { name: 'Contact', href: '/contact', icon: Phone },
        { name: 'Aide', href: '/aide', icon: HelpCircle },
        { name: 'Support', href: '/support', icon: MessageCircle },
      ]
    },
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

  const getDisplayName = () => {
    if (!user) return 'Compte';
    if (user.username) return user.username;
    if (user.name) return user.name;
    if (user.email) return user.email.split('@')[0];
    return 'Utilisateur';
  };

  const getUserRole = () => {
    if (!user) return '';
    if (user.role === 'admin') return 'Administrateur';
    if (user.role === 'agriculteur') return 'Agriculteur';
    if (user.role === 'acheteur') return 'Acheteur';
    return user.role || 'Membre';
  };

  const getInitials = () => {
    const displayName = getDisplayName();
    return displayName.charAt(0).toUpperCase();
  };

  const handleDropdownToggle = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link to="/" className="flex items-center space-x-3 cursor-pointer group shrink-0">
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
            {menuItems.map((item) => {
              const Icon = item.icon;
              const hasDropdown = item.dropdown && item.dropdown.length > 0;
              
              if (hasDropdown) {
                return (
                  <div key={item.name} className="relative">
                    <button
                      onClick={() => handleDropdownToggle(item.name)}
                      className={`flex items-center gap-1.5 px-3 py-2 font-medium transition-all duration-200 rounded-lg text-sm ${
                        openDropdown === item.name
                          ? 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute left-0 mt-1 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                        >
                          <div className="py-1">
                            {item.dropdown.map((subItem) => {
                              const SubIcon = subItem.icon;
                              return (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  onClick={() => setOpenDropdown(null)}
                                  className={`flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                                    isActive(subItem.href)
                                      ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                                  }`}
                                >
                                  <SubIcon className="w-4 h-4" />
                                  {subItem.name}
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative flex items-center gap-1.5 px-3 py-2 font-medium transition-all duration-200 rounded-lg text-sm ${
                    isActive(item.href)
                      ? 'text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {isActive(item.href) && (
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
            <div className="hidden md:flex items-center gap-1">
              <Link to="/dashboard" className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition">
                <LayoutDashboard className="w-4 h-4" />
              </Link>
              <Link to="/mes-commandes" className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition">
                <ShoppingBag className="w-4 h-4" />
              </Link>
            </div>

            {/* NOTIFICATIONS - Version corrigée */}
            {isAuthenticated && (
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full transition hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {isNotificationOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
                    >
                      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="text-center py-8">
                            <Bell className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Aucune notification</p>
                          </div>
                        ) : (
                          notifications.map((notif) => {
                            const Icon = notif.icon;
                            return (
                              <div
                                key={notif.id}
                                onClick={() => markAsRead(notif.id)}
                                className={`p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer ${
                                  !notif.read ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''
                                }`}
                              >
                                <div className="flex gap-3">
                                  <div className="flex-shrink-0">
                                    <div className={`p-2 rounded-full bg-gray-100 dark:bg-gray-700 ${notif.color}`}>
                                      <Icon className="w-4 h-4" />
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{notif.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{notif.message}</p>
                                    <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                                  </div>
                                  {!notif.read && <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-2"></div>}
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
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-700 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-sm font-bold">{getInitials()}</span>
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-200">{getDisplayName()}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

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
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{getDisplayName()}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'admin@glebge.com'}</p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 capitalize">{getUserRole()}</p>
                        </div>
                        <Link to="/dashboard" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                          <LayoutDashboard className="w-4 h-4" /> Tableau de bord
                        </Link>
                        <Link to="/mon-compte" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                          <User className="w-4 h-4" /> Mon profil
                        </Link>
                        <Link to="/parametres" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                          <Settings className="w-4 h-4" /> Paramètres
                        </Link>
                        <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                          <LogOut className="w-4 h-4" /> Déconnexion
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium text-sm hover:from-green-700 hover:to-emerald-700 transition shadow-md">
                <LogIn className="w-4 h-4" /> Connexion
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
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg">
            <div className="px-4 py-3 space-y-2 max-h-[80vh] overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const hasDropdown = item.dropdown && item.dropdown.length > 0;
                if (hasDropdown) {
                  return (
                    <div key={item.name}>
                      <div className="flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-200 font-medium">
                        <div className="flex items-center gap-3"><Icon className="w-5 h-5" /><span>{item.name}</span></div>
                      </div>
                      <div className="ml-6 space-y-1">
                        {item.dropdown.map((subItem) => {
                          const SubIcon = subItem.icon;
                          return (
                            <Link key={subItem.name} to={subItem.href} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${isActive(subItem.href) ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                              <SubIcon className="w-4 h-4" /> {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link key={item.name} to={item.href} onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive(item.href) ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                    <Icon className="w-5 h-5" /><span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-2 mt-2">
                <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg transition hover:bg-gray-50 dark:hover:bg-gray-800">
                  <LayoutDashboard className="w-5 h-5" /> Tableau de bord
                </Link>
                <Link to="/mes-commandes" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 rounded-lg transition hover:bg-gray-50 dark:hover:bg-gray-800">
                  <ShoppingBag className="w-5 h-5" /> Mes commandes
                </Link>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-2 mt-2">
                {!isAuthenticated ? (
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-green-600 font-medium rounded-lg transition hover:bg-green-50 dark:hover:bg-green-900/30">
                    <LogIn className="w-5 h-5" /> Connexion
                  </Link>
                ) : (
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-red-600 rounded-lg transition hover:bg-red-50 dark:hover:bg-red-900/20">
                    <LogOut className="w-5 h-5" /> Déconnexion
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
