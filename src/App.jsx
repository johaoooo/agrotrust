import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MapSection from './components/MapSection';
import OffersList from './components/OffersList';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function AppContent() {
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900 flex flex-col transition-colors">
      <Navbar />
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <MapSection />
            <OffersList 
              selectedCrop={selectedCrop}
              selectedRegion={selectedRegion}
            />
          </div>
          <div className="lg:w-1/3">
            <Sidebar 
              setSelectedCrop={setSelectedCrop}
              setSelectedRegion={setSelectedRegion}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
