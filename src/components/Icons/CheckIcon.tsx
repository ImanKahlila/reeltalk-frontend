import React from 'react';

interface Props {
  className?: string;
  checked?: boolean;
}

const CheckIconSVG = ({ className, checked }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className || ''}
    >
      <defs>
        <linearGradient id="orangeGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff7e5f" />
          <stop offset="100%" stopColor="#feb47b" />
        </linearGradient>
        <linearGradient id="grayGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c0c0c0" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </linearGradient>
      </defs>
      <circle cx="8" cy="8" r="8" fill={checked ? 'url(#orangeGradient)' : 'url(#grayGradient)'} />
      {checked && (
        <path
          d="M4 8.5L7 11.5L12.5 6L11 4.5L7 8.5L5.5 7L4 8.5z"
          fill="white"
        />
      )}
    </svg>
  );
};

export default CheckIconSVG;
