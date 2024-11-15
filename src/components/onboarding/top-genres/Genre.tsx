import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { motion } from 'framer-motion';

interface ComponentProps {
  name: string;
  id: string;
  selected: boolean;
  toggleSelectedGenre: (id: string, newVal: boolean) => void;
  totalSelected: number;
  emoji: string;
}

const Genre = (props: ComponentProps) => {
  const { name, id, selected, toggleSelectedGenre, totalSelected, emoji } = props;
  const [isChecked, setIsChecked] = useState(selected);

  function onChangeHandler() {
    if (totalSelected < 3 || isChecked) {
      // Manages checkbox state in this component
      setIsChecked(!isChecked);

      // Updates genres array in parent component
      toggleSelectedGenre(id, !isChecked);
    } else {
      toast.error('Oops! Select just 3 genres.', { id: 'error' });
    }
  }

  return (
    <motion.label
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
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
    </motion.label>
  );
};

export default Genre;
