import React from 'react';

const SearchIcon = ({strokeWidth = 1.5}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='transparent'
      viewBox='0 0 24 24'
      strokeWidth={strokeWidth}
      stroke='#6D6D6D'
      className='h-[20px] min-w-[20px]'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
      />
    </svg>
  );
};

export default SearchIcon;
