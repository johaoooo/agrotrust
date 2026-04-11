import { useState } from 'react';
import { X, Plus, Sprout } from 'lucide-react';

export default function AddProductModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    crop: '',
    quantity: '',
    price: '',
    region: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici l'appel API pour créer l'annonce
    console.log('Annonce créée:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full shadow-2xl overflow-hidden">
        <div className="px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 flex justify-between items-center">
          <h2 className="text-white font-semibold flex items-center gap-2">
            <Plus className="w-4 h-4" /> Publier une annonce
          </h2>
          <button onClick={onClose} className="text-white/80 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          <input type="text" name="name" placeholder="Nom du produit" onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg text-sm" />
          <select name="crop" onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg text-sm">
            <option value="">Type de culture</option>
            <option value="mais">🌽 Maïs</option>
            <option value="tomate">🍅 Tomate</option>
            <option value="igname">🍠 Igname</option>
            <option value="manioc">🌿 Manioc</option>
          </select>
          <input type="number" name="quantity" placeholder="Quantité (kg)" onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg text-sm" />
          <input type="number" name="price" placeholder="Prix unitaire (FCFA/kg)" onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg text-sm" />
          <select name="region" onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg text-sm">
            <option value="">Région</option>
            <option value="zou">Zou</option>
            <option value="collines">Collines</option>
            <option value="borgou">Borgou</option>
          </select>
          <input type="date" name="date" onChange={handleChange} required className="w-full px-3 py-2 border rounded-lg text-sm" />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition">Publier l'annonce</button>
        </form>
      </div>
    </div>
  );
}
