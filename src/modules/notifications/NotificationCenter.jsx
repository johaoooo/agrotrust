import { useState, useEffect } from 'react';
import { Bell, CheckCircle, Truck, Package, X } from 'lucide-react';
import { commandesAPI } from '../../services/api';

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const data = await commandesAPI.getNotifications();
      setNotifications(data.slice(0, 10));
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const getIcon = (type) => {
    if (type.includes('commande')) return Package;
    if (type.includes('livraison')) return Truck;
    return CheckCircle;
  };

  const unreadCount = notifications.filter(n => !n.est_lu).length;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border z-50">
          <div className="p-3 border-b">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Aucune notification</p>
              </div>
            ) : (
              notifications.map((notif) => {
                const Icon = getIcon(notif.type);
                return (
                  <div key={notif.id} className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${!notif.est_lu ? 'bg-green-50' : ''}`}>
                    <div className="flex gap-3">
                      <Icon className="w-4 h-4 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">{notif.titre}</p>
                        <p className="text-xs text-gray-500">{notif.message}</p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {new Date(notif.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
