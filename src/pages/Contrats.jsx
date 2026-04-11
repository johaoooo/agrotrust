import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  Truck, 
  Package, 
  User, 
  MapPin, 
  Calendar,
  TrendingUp,
  ChevronRight,
  X,
  Phone,
  Download,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Fonction pour générer un PDF bien designé
const generatePDF = (contrat) => {
  // Créer le contenu HTML du PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Contrat #${contrat.id} - ${contrat.product}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          background: #f5f5f5;
          padding: 40px;
        }
        .contract {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #059669, #10b981);
          padding: 30px;
          text-align: center;
          color: white;
        }
        .header h1 {
          font-size: 28px;
          margin-bottom: 8px;
        }
        .header p {
          opacity: 0.9;
          font-size: 14px;
        }
        .content {
          padding: 30px;
        }
        .section {
          margin-bottom: 24px;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 20px;
        }
        .section-title {
          font-size: 18px;
          font-weight: bold;
          color: #059669;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .info-card {
          background: #f9fafb;
          padding: 12px;
          border-radius: 8px;
        }
        .info-label {
          font-size: 11px;
          color: #6b7280;
          margin-bottom: 4px;
        }
        .info-value {
          font-size: 14px;
          font-weight: 500;
          color: #1f2937;
        }
        .status {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }
        .status-en_cours { background: #fef3c7; color: #d97706; }
        .status-livraison { background: #dbeafe; color: #2563eb; }
        .status-termine { background: #d1fae5; color: #059669; }
        .tracking {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
        }
        .tracking-step {
          text-align: center;
          flex: 1;
        }
        .tracking-dot {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #e5e7eb;
          margin: 0 auto 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }
        .tracking-dot.completed {
          background: #059669;
          color: white;
        }
        .tracking-label {
          font-size: 11px;
          color: #6b7280;
        }
        .footer {
          background: #f9fafb;
          padding: 20px 30px;
          text-align: center;
          font-size: 11px;
          color: #9ca3af;
          border-top: 1px solid #e5e7eb;
        }
      </style>
    </head>
    <body>
      <div class="contract">
        <div class="header">
          <h1>🌱 Glégbé</h1>
          <p>Contrat d'achat agricole</p>
        </div>
        
        <div class="content">
          <div class="section">
            <div class="section-title">📄 Informations générales</div>
            <div class="grid-2">
              <div class="info-card">
                <div class="info-label">N° Contrat</div>
                <div class="info-value">#${contrat.id}</div>
              </div>
              <div class="info-card">
                <div class="info-label">Date</div>
                <div class="info-value">${contrat.date}</div>
              </div>
              <div class="info-card">
                <div class="info-label">Statut</div>
                <div class="info-value">
                  <span class="status status-${contrat.status}">${contrat.statusLabel}</span>
                </div>
              </div>
              <div class="info-card">
                <div class="info-label">Mode de paiement</div>
                <div class="info-value">${contrat.paymentMethod}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">🌾 Produit</div>
            <div class="grid-2">
              <div class="info-card">
                <div class="info-label">Produit</div>
                <div class="info-value">${contrat.product}</div>
              </div>
              <div class="info-card">
                <div class="info-label">Quantité</div>
                <div class="info-value">${contrat.quantity}</div>
              </div>
              <div class="info-card">
                <div class="info-label">Montant total</div>
                <div class="info-value" style="font-size: 18px; color: #059669;">${contrat.amount}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">👥 Parties</div>
            <div class="grid-2">
              <div class="info-card">
                <div class="info-label">Vendeur</div>
                <div class="info-value">${contrat.farmer}</div>
                <div class="info-label" style="margin-top: 8px;">Téléphone</div>
                <div class="info-value">${contrat.farmerPhone}</div>
              </div>
              <div class="info-card">
                <div class="info-label">Acheteur</div>
                <div class="info-value">${contrat.buyer}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">🚚 Livraison</div>
            <div class="grid-2">
              <div class="info-card">
                <div class="info-label">Date prévue</div>
                <div class="info-value">${contrat.deliveryDate}</div>
              </div>
              <div class="info-card">
                <div class="info-label">Adresse</div>
                <div class="info-value">${contrat.deliveryAddress}</div>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">📦 Suivi de commande</div>
            <div class="tracking">
              ${contrat.tracking.map((step, idx) => `
                <div class="tracking-step">
                  <div class="tracking-dot ${step.completed ? 'completed' : ''}">
                    ${step.completed ? '✓' : idx + 1}
                  </div>
                  <div class="tracking-label">${step.step}</div>
                  <div class="tracking-label" style="font-size: 9px;">${step.date}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="footer">
          <p>Ce document fait foi de contrat d'achat entre les parties.</p>
          <p>Généré le ${new Date().toLocaleDateString()} - Glégbé</p>
        </div>
      </div>
    </body>
    </html>
  `;

  // Créer un blob et télécharger
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `contrat_${contrat.id}_${contrat.product}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default function Contrats() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedContrat, setSelectedContrat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const { isAuthenticated, user } = useAuth();

  const contratsData = [
    { 
      id: 1, 
      product: 'Maïs', 
      quantity: '2 t', 
      farmer: 'Ferme Yaka', 
      farmerPhone: '+229 90 12 34 56',
      farmerEmail: 'contact@fermeyaka.bj',
      buyer: user?.name || 'Restaurant X',
      amount: '900 000 FCFA',
      date: '15/06/2025',
      status: 'en_cours',
      statusLabel: 'En cours',
      statusColor: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400',
      icon: Clock,
      deliveryDate: '22/06/2025',
      deliveryAddress: 'Cotonou, Bénin',
      paymentMethod: 'Mobile Money',
      tracking: [
        { step: 'Commande', date: '10/06', completed: true },
        { step: 'Préparation', date: '12/06', completed: true },
        { step: 'Livraison', date: '15/06', completed: false },
        { step: 'Livré', date: '22/06', completed: false }
      ]
    },
    { 
      id: 2, 
      product: 'Tomate', 
      quantity: '500 kg', 
      farmer: 'Coop Wéma',
      farmerPhone: '+229 91 23 45 67',
      farmerEmail: 'contact@coopwema.bj',
      buyer: user?.name || 'Restaurant X',
      amount: '300 000 FCFA',
      date: '22/06/2025',
      status: 'livraison',
      statusLabel: 'En livraison',
      statusColor: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400',
      icon: Truck,
      deliveryDate: '25/06/2025',
      deliveryAddress: 'Cotonou, Bénin',
      paymentMethod: 'Mobile Money',
      tracking: [
        { step: 'Commande', date: '15/06', completed: true },
        { step: 'Préparation', date: '18/06', completed: true },
        { step: 'Livraison', date: '22/06', completed: true },
        { step: 'Livré', date: '25/06', completed: false }
      ]
    },
    { 
      id: 3, 
      product: 'Igname', 
      quantity: '1.2 t', 
      farmer: 'Ferme Kpomassè',
      farmerPhone: '+229 92 34 56 78',
      farmerEmail: 'contact@fermekpomasse.bj',
      buyer: user?.name || 'Restaurant X',
      amount: '960 000 FCFA',
      date: '30/06/2025',
      status: 'termine',
      statusLabel: 'Terminé',
      statusColor: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400',
      icon: CheckCircle,
      deliveryDate: '05/07/2025',
      deliveryAddress: 'Cotonou, Bénin',
      paymentMethod: 'Carte bancaire',
      tracking: [
        { step: 'Commande', date: '20/06', completed: true },
        { step: 'Préparation', date: '25/06', completed: true },
        { step: 'Livraison', date: '28/06', completed: true },
        { step: 'Livré', date: '05/07', completed: true }
      ]
    }
  ];

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const handleContact = (contrat) => {
    setNotification({
      type: 'contact',
      message: `📞 Demande de contact envoyée à ${contrat.farmer}. Vous serez rappelé dans les plus brefs délais.`
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDownload = (contrat) => {
    generatePDF(contrat);
    setNotification({
      type: 'download',
      message: `📄 Téléchargement du contrat ${contrat.product} en cours...`
    });
    setTimeout(() => setNotification(null), 2000);
  };

  const statusFilters = [
    { value: 'all', label: 'Tous' },
    { value: 'en_cours', label: 'En cours' },
    { value: 'livraison', label: 'En livraison' },
    { value: 'termine', label: 'Terminés' },
  ];

  const filteredContrats = selectedStatus === 'all' 
    ? contratsData 
    : contratsData.filter(c => c.status === selectedStatus);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Veuillez vous connecter
        </h2>
        <p className="text-gray-500 mb-4">Vous devez être connecté pour voir vos contrats</p>
        <a 
          href="/login" 
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Se connecter
        </a>
      </div>
    );
  }

  return (
    <>
      {/* Notification toast - position fixe devant tout */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm"
          >
            {notification.type === 'contact' ? <MessageCircle className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        {/* En-tête compact */}
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mes contrats</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
            Suivez vos commandes et livraisons
          </p>
        </div>

        {/* Filtres compacts */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedStatus(filter.value)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                selectedStatus === filter.value
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Liste des contrats - Blocs compacts */}
        <div className="space-y-2">
          {filteredContrats.map((contrat, index) => {
            const StatusIcon = contrat.icon;
            return (
              <motion.div
                key={contrat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedContrat(contrat)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 cursor-pointer overflow-hidden"
              >
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${contrat.statusColor}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                        {contrat.product}
                      </h3>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${contrat.statusColor}`}>
                        {contrat.statusLabel}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-0.5">
                        <Package className="w-3 h-3" />
                        {contrat.quantity}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Calendar className="w-3 h-3" />
                        {contrat.date}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-green-600 dark:text-green-400">
                      {contrat.amount}
                    </div>
                  </div>

                  {/* Mini barre de progression */}
                  <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                      style={{ width: `${contrat.status === 'en_cours' ? 33 : contrat.status === 'livraison' ? 66 : 100}%` }}
                    ></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredContrats.length === 0 && (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">Aucun contrat dans cette catégorie</p>
          </div>
        )}
      </motion.div>

      {/* Modal détails contrat - Compacte */}
      <AnimatePresence>
        {selectedContrat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedContrat(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-800 rounded-xl max-w-sm w-full shadow-2xl overflow-hidden"
            >
              <div className={`px-4 py-2.5 ${selectedContrat.statusColor} border-b border-gray-100 dark:border-gray-700`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] opacity-70">Contrat #{selectedContrat.id}</p>
                    <h3 className="font-bold text-base">{selectedContrat.product}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedContrat(null)}
                    className="p-1 bg-white/20 rounded-full hover:bg-white/30 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-3 space-y-2 max-h-[70vh] overflow-y-auto">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">Statut</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${selectedContrat.statusColor}`}>
                    {selectedContrat.statusLabel}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-1.5">
                    <p className="text-[10px] text-gray-500">Quantité</p>
                    <p className="text-xs font-medium">{selectedContrat.quantity}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-1.5">
                    <p className="text-[10px] text-gray-500">Montant</p>
                    <p className="text-xs font-bold text-green-600">{selectedContrat.amount}</p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-1.5">
                  <p className="text-[10px] text-gray-500">Producteur</p>
                  <p className="text-xs font-medium">{selectedContrat.farmer}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{selectedContrat.farmerPhone}</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-1.5">
                    <p className="text-[10px] text-gray-500">Commande</p>
                    <p className="text-xs">{selectedContrat.date}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-1.5">
                    <p className="text-[10px] text-gray-500">Livraison</p>
                    <p className="text-xs">{selectedContrat.deliveryDate}</p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-1.5">
                  <p className="text-[10px] text-gray-500">Adresse</p>
                  <p className="text-xs">{selectedContrat.deliveryAddress}</p>
                </div>

                <div className="pt-1">
                  <p className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Suivi</p>
                  <div className="flex justify-between">
                    {selectedContrat.tracking.map((step, idx) => (
                      <div key={idx} className="text-center flex-1">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto text-[10px] ${
                          step.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-400'
                        }`}>
                          {step.completed ? '✓' : idx + 1}
                        </div>
                        <p className="text-[9px] mt-0.5 text-gray-500">{step.step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleContact(selectedContrat)}
                    className="flex-1 bg-green-600 text-white text-[11px] py-1.5 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    Contacter
                  </button>
                  <button
                    onClick={() => handleDownload(selectedContrat)}
                    className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-[11px] py-1.5 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition flex items-center justify-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
