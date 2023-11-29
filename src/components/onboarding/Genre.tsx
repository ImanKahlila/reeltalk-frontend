import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface ComponentProps {
  name: string;
  id: string;
  selected: boolean;
  onSelect: (newVal: boolean, id: string) => void;
  totalSelected: number;
  emoji: string;
}

const Genre = ({ name, id, selected, onSelect, totalSelected, emoji }: ComponentProps) => {
  const [isChecked, setIsChecked] = useState(selected);

  function onChangeHandler() {
    if (totalSelected < 5 || isChecked) {
      // Manages checkbox state in this component
      setIsChecked(!isChecked);

      // Updates genres array in parent component
      onSelect(!isChecked, id);
    } else {
      toast.error('Oops! Select just 5 genres.');
    }
  }

  return (
    <label
      className={`flex h-fit w-full cursor-pointer items-center justify-between rounded-lg border-2 ${
        isChecked ? 'border-primary' : 'border-gray'
      } p-[11px] transition-colors duration-300 ${isChecked ? 'bg-primary' : 'bg-pure-white'}`}
    >
      <span className='text-[14px] font-semibold tracking-[0.07px] text-secondary'>
        {emoji} {name}
      </span>
      <input className='sr-only' type='checkbox' checked={isChecked} onChange={onChangeHandler} />
      <svg
        className={`block h-[20px] w-[20px] rounded-sm border-2 border-black bg-pure-white p-[2px]`}
        // This element is purely decorative so
        // we hide it for screen readers
        aria-hidden='true'
        viewBox='0 0 15 11'
        fill='none'
      >
        <path
          className={`transition-opacity duration-200 ${isChecked ? 'opacity-100' : 'opacity-0'}`}
          d='M1 4.5L5 9L14 1'
          strokeWidth='2'
          stroke='#000'
        />
      </svg>
    </label>
  );
};

export default Genre;
