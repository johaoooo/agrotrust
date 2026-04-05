import { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ValueCards from '../components/ValueCards';
import MapSection from '../components/MapSection';
import Sidebar from '../components/Sidebar';
import OffersList from '../components/OffersList';
import StatsSection from '../components/StatsSection';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import AnimatedSection from '../components/AnimatedSection';

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
      
      <AnimatedSection direction="up" delay={0.1}>
        <ValueCards />
      </AnimatedSection>
      
      {/* Section Carte + Sidebar horizontale */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Carte - 2/3 */}
          <div className="lg:w-2/3">
            <AnimatedSection direction="left" delay={0.2}>
              <MapSection />
            </AnimatedSection>
          </div>
          
          {/* Sidebar horizontale - 1/3 */}
          <div className="lg:w-1/3">
            <AnimatedSection direction="right" delay={0.2}>
              <Sidebar 
                setSelectedCrop={setSelectedCrop} 
                setSelectedRegion={setSelectedRegion} 
              />
            </AnimatedSection>
          </div>
        </div>
      </div>
      
      {/* Offres de récoltes futures */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <AnimatedSection direction="up" delay={0.3}>
          <OffersList 
            selectedCrop={selectedCrop}
            selectedRegion={selectedRegion}
          />
        </AnimatedSection>
      </div>
      
      <StatsSection />
      <HowItWorks />
      <Testimonials />
    </motion.div>
  );
}
