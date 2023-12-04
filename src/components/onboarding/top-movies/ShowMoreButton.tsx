import React from 'react';

import ChevronIcon from '@/components/layout/ChevronIcon';

interface ShowMoreButtonProps {
  onShowMoreHandler: () => void;
  moviesToShow: number;
}

const ShowMoreButton = ({ onShowMoreHandler, moviesToShow }: ShowMoreButtonProps) => {
  return (
    <>
      {moviesToShow === 8 ? (
        <div className='mb-[64px] flex justify-center'>
          <button
            className='mt-6 flex items-center font-semibold text-medium-emphasis'
            onClick={onShowMoreHandler}
          >
            show more
            <ChevronIcon className='ml-1 h-4 w-4' />
          </button>
        </div>
      ) : null}
    </>
  );
};

export default ShowMoreButton;
