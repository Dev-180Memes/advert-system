import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="overflow-hidden">
        <HeroSection />
      </div>
    </>
  )
}

export default Home;
