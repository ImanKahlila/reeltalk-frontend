import React from 'react';

const Spinner = () => {
  return (
    <div className='spinner_container' aria-label='Loading...'>
      <i className='spinner_item spinner_item--warning'></i>
      <i className='spinner_item spinner_item--warning'></i>
    </div>
  );
};

export default Spinner;
