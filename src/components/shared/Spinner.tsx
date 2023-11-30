import React from 'react';

interface ISpinnerProps {
  className: string;
}

const Spinner = ({ className }: ISpinnerProps) => {
  return (
    <div className={`spinner_container ${className}`} aria-label='Loading...'>
      <i className='spinner_item spinner_item--warning'></i>
      <i className='spinner_item spinner_item--warning'></i>
    </div>
  );
};

export default Spinner;
