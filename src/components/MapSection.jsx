import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapSection() {
  const farms = [
    { name: 'Ferme Yaka', lat: 7.25, lng: 2.18, crop: 'Maïs', region: 'Zou' },
    { name: 'Coop Wéma', lat: 9.35, lng: 2.67, crop: 'Tomate', region: 'Borgou' },
    { name: 'Ferme Kpomassè', lat: 7.85, lng: 2.45, crop: 'Igname', region: 'Collines' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-700">
        <MapPin className="w-5 h-5 text-green-600" />
        <h2 className="font-semibold text-gray-900 dark:text-white">Récoltes disponibles par zone</h2>
      </div>
      <MapContainer center={[8.5, 2.3]} zoom={7} className="h-80 w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {farms.map((farm, idx) => (
          <Marker key={idx} position={[farm.lat, farm.lng]}>
            <Popup><b>{farm.name}</b><br />{farm.crop}<br />{farm.region}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
