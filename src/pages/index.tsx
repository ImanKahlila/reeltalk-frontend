import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the library's CSS

import HeroSection from '@/components/LandingPage/HeroSection';
import ValueSection from '@/components/LandingPage/ValueSection';

export default function LandingPage() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <main>
      <HeroSection />
      <ValueSection />
    </main>
  );
}
