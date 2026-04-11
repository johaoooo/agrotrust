import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Settings, 
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Calendar,
  MessageCircle,
  FileText,
  Sprout,
  User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { name: 'Tableau de bord', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Mes commandes', icon: ShoppingBag, path: '/dashboard/mes-commandes' },
  { name: 'Mes offres', icon: Package, path: '/dashboard/offres' },
  { name: 'Micro-crédit', icon: CreditCard, path: '/dashboard/micro-credit' },
  { name: 'Conseils semis', icon: Calendar, path: '/dashboard/conseils-semis' },
  { name: 'Communauté', icon: MessageCircle, path: '/dashboard/communaute' },
  { name: 'Mes contrats', icon: FileText, path: '/dashboard/contrats' },
  { name: 'Mon compte', icon: User, path: '/dashboard/mon-compte' },
  { name: 'Paramètres', icon: Settings, path: '/dashboard/parametres' },
  { name: 'Aide', icon: HelpCircle, path: '/dashboard/aide' },
];

export default function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="relative bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 flex-shrink-0 overflow-y-auto h-screen sticky top-0"
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 z-10 w-6 h-6 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition"
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
            <Sprout className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              AgroTrust
            </span>
          )}
        </div>
      </div>

      <nav className="p-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
            `}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="text-sm font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">Déconnexion</span>}
        </button>
      </div>
    </motion.aside>
  );
}
