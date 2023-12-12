import React from 'react';
import Genre from '@/components/onboarding/top-genres/Genre';

import { Genre as TypeGenre } from './TopGenres.hooks';

import { AnimatePresence, motion } from 'framer-motion';

interface IGenresProps {
  filteredGenres: TypeGenre;
  toggleSelectedGenre: (id: string, newVal: boolean) => void;
  totalSelected: number;
}

const Genres = (props: IGenresProps) => {
  const { filteredGenres, toggleSelectedGenre, totalSelected } = props;
  return (
    <motion.div
      layout
      className='mx-auto mt-14 grid grid-cols-2 gap-x-[23px] gap-y-4 md:max-w-[896px] md:grid-cols-4 md:gap-6 md:px-2 lg:grid-cols-5'
    >
      <AnimatePresence>
        {filteredGenres.map(genre => (
          <Genre
            key={genre.id}
            name={genre.name}
            id={genre.id}
            selected={genre.selected}
            toggleSelectedGenre={toggleSelectedGenre}
            totalSelected={totalSelected}
            emoji={genre.emoji}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default Genres;
