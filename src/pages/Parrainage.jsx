import { useState } from 'react';
import { 
  Share2, Copy, Check, Gift, Users, Award, Crown, 
  Mail, MessageCircle, Link, TrendingUp, Wallet
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Parrainage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('stats');
  
  const parrainCode = user?.username || 'GLB2025';
  const parrainLink = `https://glebge.com/ref/${parrainCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(parrainLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    { value: '12', label: 'Parrainages', icon: Users, change: '+3' },
    { value: '25k', label: 'Gains', icon: Wallet, change: '+5k' },
    { value: 'Top 10', label: 'Classement', icon: Crown, change: '+5' },
  ];

  const levels = [
    { name: 'Débutant', min: 0, reward: '0 FCFA', icon: Award },
    { name: 'Ambassadeur', min: 5, reward: '25k FCFA', icon: TrendingUp },
    { name: 'Leader', min: 15, reward: '75k FCFA', icon: Crown },
    { name: 'Elite', min: 30, reward: '150k FCFA', icon: Gift },
  ];

  const referrals = [
    { name: 'Jean D.', date: '02/04', status: 'validé', gain: '5k' },
    { name: 'Marie S.', date: '30/03', status: 'validé', gain: '5k' },
    { name: 'Koffi M.', date: '28/03', status: 'attente', gain: '...' },
  ];

  const currentLevel = levels[1];
  const nextLevel = levels[2];
  const progress = 70;

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-green-600 rounded-xl mb-3">
          <Share2 className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Parrainage</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Parrainez et gagnez des récompenses</p>
      </div>

      {/* Stats - 3 blocs compacts */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-1">
                <Icon className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-xl font-bold text-gray-800 dark:text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-0.5 font-medium">{stat.change}</div>
            </div>
          );
        })}
      </div>

      {/* Code */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg p-4 mb-6">
        <div className="text-center text-white mb-2">
          <p className="text-xs text-green-100">Votre code de parrainage</p>
          <p className="text-2xl font-mono tracking-wider text-white mt-1">{parrainCode}</p>
        </div>
        <button
          onClick={handleCopy}
          className="w-full bg-white dark:bg-gray-800 text-green-600 dark:text-green-400 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition shadow-sm"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Code copié !' : 'Copier le code'}
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden mb-6 border border-gray-200 dark:border-gray-700">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {['stats', 'levels', 'list'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 text-sm font-medium transition ${
                activeTab === tab
                  ? 'text-green-600 dark:text-green-400 border-b-2 border-green-600 bg-green-50 dark:bg-green-900/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {tab === 'stats' && '📊 Progression'}
              {tab === 'levels' && '🏆 Niveaux'}
              {tab === 'list' && '👥 Parrainages'}
            </button>
          ))}
        </div>

        <div className="p-4">
          {activeTab === 'stats' && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">{currentLevel.name}</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">{nextLevel.name}</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Niveau actuel</p>
                  <p className="text-base font-bold text-gray-800 dark:text-white mt-1">{currentLevel.name}</p>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">{currentLevel.reward}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Prochain niveau</p>
                  <p className="text-base font-bold text-gray-800 dark:text-white mt-1">{nextLevel.name}</p>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">{nextLevel.reward}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'levels' && (
            <div className="space-y-2">
              {levels.map((level, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <level.icon className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">{level.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{level.min}+ parrainages</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-green-600 dark:text-green-400">{level.reward}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'list' && (
            <div className="space-y-2">
              {referrals.map((ref, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600">
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{ref.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{ref.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      ref.status === 'validé' 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {ref.status === 'validé' ? '✓ Validé' : '⏳ En attente'}
                    </span>
                    <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">{ref.gain} FCFA</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Partage */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
        <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">📢 Partager mon lien</p>
        <div className="flex gap-3 justify-center">
          <a href={`https://wa.me/?text=${parrainLink}`} target="_blank" rel="noopener" className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center text-white hover:scale-105 transition shadow-sm">
            <MessageCircle className="w-4 h-4" />
          </a>
          <a href={`mailto:?body=${parrainLink}`} className="w-9 h-9 bg-[#ea4335] rounded-full flex items-center justify-center text-white hover:scale-105 transition shadow-sm">
            <Mail className="w-4 h-4" />
          </a>
          <button onClick={handleCopy} className="w-9 h-9 bg-gray-600 dark:bg-gray-700 rounded-full flex items-center justify-center text-white hover:scale-105 transition shadow-sm">
            <Link className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
