import React from 'react';
import Genre from '@/components/onboarding/top-genres/Genre';

import { Genre as TypeGenre } from './TopGenres.hooks';

import { AnimatePresence, motion } from 'framer-motion';

interface IGenresProps {
  filteredGenres: TypeGenre;
  toggleSelectedGenre: (id: string, newVal: boolean) => void;
  totalSelected: number;
  isModalView?: boolean
}

const Genres = (props: IGenresProps) => {
  const { filteredGenres, toggleSelectedGenre, totalSelected,isModalView } = props;

  return (
    <div className='h-[1042px] md:h-[608px] lg:h-[468px]'>
      <motion.div
        layout
        className={`mx-auto ${isModalView ?'p-3':'mt-14'} grid grid-cols-2' +
          ' gap-x-[23px] gap-y-4 
    ${isModalView ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5'}
    md:max-w-[896px] md:gap-6 md:px-2`}
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
    </div>
  );
};

export default Genres;
