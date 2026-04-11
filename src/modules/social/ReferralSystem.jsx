import { motion } from 'framer-motion';
import { useState } from 'react';
import { Gift, Users, Award, Copy, CheckCircle, Share2, ArrowRight, Lock } from 'lucide-react';

export default function ReferralSystem() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const referralCode = "GLEGBE2025";
  const referralLink = `https://glebge.com/ref/${referralCode}`;

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ email: '', name: '' });
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12"
    >
      <div className="max-w-lg mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full mb-3">
            <Gift className="w-4 h-4 text-green-600" />
            <span className="text-xs font-semibold text-green-700 dark:text-green-400">Parrainage</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Parrainez un agriculteur</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Gagnez 10 000 FCFA par parrainage</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <Users className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-900 dark:text-white">5</p>
            <p className="text-xs text-gray-500">Parrainages</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center shadow-sm border border-gray-200 dark:border-gray-700">
            <Award className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <p className="text-xl font-bold text-gray-900 dark:text-white">50k</p>
            <p className="text-xs text-gray-500">Gagnés (FCFA)</p>
          </div>
        </div>

        {/* Code de parrainage */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-5">
          <div className="border-b border-gray-200 dark:border-gray-700 px-5 py-3 bg-gray-50 dark:bg-gray-800/50">
            <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Votre code</h2>
          </div>
          <div className="p-5">
            <div className="flex gap-2">
              <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 text-center font-mono text-sm font-semibold">
                {referralCode}
              </div>
              <button onClick={copyCode} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center gap-1">
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copié' : 'Copier'}
              </button>
            </div>
          </div>
        </div>

        {/* Lien de parrainage */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-5">
          <div className="border-b border-gray-200 dark:border-gray-700 px-5 py-3 bg-gray-50 dark:bg-gray-800/50">
            <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Votre lien</h2>
          </div>
          <div className="p-5">
            <div className="flex gap-2">
              <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2 text-xs font-mono truncate">
                {referralLink}
              </div>
              <button onClick={copyLink} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center gap-1">
                <Share2 className="w-4 h-4" /> Partager
              </button>
            </div>
          </div>
        </div>

        {/* Inviter par email */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700 px-5 py-3 bg-gray-50 dark:bg-gray-800/50">
            <h2 className="font-semibold text-gray-900 dark:text-white text-sm">Inviter par email</h2>
          </div>
          <div className="p-5">
            {success ? (
              <div className="text-center py-3">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Invitation envoyée !</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" name="name" placeholder="Nom de l'invité" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                <input type="email" name="email" placeholder="Email de l'invité" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-1">
                  {loading ? 'Envoi...' : 'Envoyer l\'invitation'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sécurisé */}
        <div className="mt-5 text-center text-xs text-gray-500 flex items-center justify-center gap-1">
          <Lock className="w-3 h-3 text-green-600" />
          <span>Gagnez 10 000 FCFA par agriculteur parrainé</span>
        </div>
      </div>
    </motion.div>
  );
}
