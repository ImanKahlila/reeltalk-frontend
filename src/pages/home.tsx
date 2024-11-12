// home.tsx
import React from 'react';
import Carousel from '@/components/home/Carousel'; 
import TopDiscussions from '@/components/home/TopDiscussions'; // Ensure this is a default import if TopDiscussions is exported as default
const HomePage = () => {
  return (
    <div>
      <Carousel/>
      <TopDiscussions/>
    </div>
  );
};

export default HomePage;