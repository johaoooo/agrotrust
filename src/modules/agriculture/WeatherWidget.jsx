import { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets } from 'lucide-react';

export default function WeatherWidget({ region }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation météo (à remplacer par API réelle)
    setTimeout(() => {
      setWeather({
        temp: 28,
        condition: 'ensoleillé',
        humidity: 65,
        wind: 12,
        rain: 0
      });
      setLoading(false);
    }, 500);
  }, [region]);

  const getWeatherIcon = () => {
    switch(weather?.condition) {
      case 'ensoleillé': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'pluie': return <CloudRain className="w-8 h-8 text-blue-500" />;
      default: return <Cloud className="w-8 h-8 text-gray-500" />;
    }
  };

  if (loading) {
    return <div className="animate-pulse bg-gray-200 rounded-xl h-32"></div>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 text-white">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-3xl font-bold">{weather?.temp}°C</p>
          <p className="text-sm opacity-90 capitalize">{weather?.condition}</p>
        </div>
        {getWeatherIcon()}
      </div>
      <div className="flex gap-4 mt-3 text-sm">
        <div className="flex items-center gap-1">
          <Droplets className="w-4 h-4" />
          <span>{weather?.humidity}%</span>
        </div>
        <div className="flex items-center gap-1">
          <Wind className="w-4 h-4" />
          <span>{weather?.wind} km/h</span>
        </div>
      </div>
    </div>
  );
}
