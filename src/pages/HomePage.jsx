import { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import MapSection from '../components/MapSection';
import Sidebar from '../components/Sidebar';
import OffersList from '../components/OffersList';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';

export default function HomePage() {
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <WhyChooseUs />
      
      {/* Section Map et Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <MapSection />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Sidebar 
                setSelectedCrop={setSelectedCrop} 
                setSelectedRegion={setSelectedRegion} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Offres */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Offres disponibles
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Découvrez les meilleurs produits agricoles près de chez vous
            </p>
          </div>
          <div className="p-6">
            <OffersList selectedCrop={selectedCrop} selectedRegion={selectedRegion} />
          </div>
        </div>
      </div>

      <HowItWorks />
      <Testimonials />
    </motion.div>
  );
}
