import React from 'react';

const CircleEllipsis = () => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <rect width="25" height="25" rx="12.5" fill="#3A3A3C" />
      <circle cx="8" cy="12.5" r="1.5" fill="#FAFAFA" />
      <circle cx="12.5" cy="12.5" r="1.5" fill="#FAFAFA" />
      <circle cx="17" cy="12.5" r="1.5" fill="#FAFAFA" />
    </svg>
  );
};

export default CircleEllipsis;
