import React from 'react';

interface ComponentProps {
  className: string;
}

const GreenCheckIcon = ({ className }: ComponentProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M20.2188 7.28118C20.5937 7.65608 20.5937 8.26392 20.2188 8.63882L11.2588 17.5988C10.8839 17.9737 10.2761 17.9737 9.90118 17.5988L4.78118 12.4788C4.40627 12.1039 4.40627 11.4961 4.78118 11.1212C5.15608 10.7463 5.76392 10.7463 6.13882 11.1212L10.58 15.5624L18.8612 7.28118C19.2361 6.90627 19.8439 6.90627 20.2188 7.28118Z'
        fill='#30D158'
      />
    </svg>
  );
};

export default GreenCheckIcon;
