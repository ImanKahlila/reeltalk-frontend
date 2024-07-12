import React from 'react';
import Media from './Media';

import { Media as MediaType, FloaterSelection } from '../../../hooks/useMediaSelection';

interface ISuggestedMediaProps {
  media: MediaType;
  mediaToShow: number;
  addSelectionHandler: (
    id: string,
    title: string,
    poster: string,
    isApi: boolean,
    newVal?: boolean,
  ) => void;
  floaterSelection: FloaterSelection;
  removeSelectionHandler: (id: string, newVal: boolean, isApi: boolean) => void;
  errorFetching: boolean;
}

const placeholderUrl = '/Onboarding/placeholder-image-on-error.png';

const SuggestedMedia = (props: ISuggestedMediaProps) => {
  const {
    media,
    mediaToShow,
    addSelectionHandler,
    floaterSelection,
    removeSelectionHandler,
    errorFetching,
  } = props;

  const placeholderMediaToShow = 6;
  const displayMedia = errorFetching ? Array(placeholderMediaToShow).fill(null) : media.slice(0, mediaToShow);

  return (
    <div className='mx-auto mt-14 max-w-[343px] md:max-w-none '>
      <h2 className='text-xl font-medium leading-normal tracking-[0.1px] text-high-emphasis'>
        Movies you might like
      </h2>

      <div className='mt-4 grid w-full grid-cols-3-auto justify-items-center gap-x-[27.5px] gap-y-4 md:grid-cols-6 md:gap-6'>
        {displayMedia.map((media, index) => (
          <Media
            key={media ? media.id : index}
            id={media ? media.id : `placeholder-${index}`}
            title={media ? media.title : ''}
            year={media ? media.releaseYear : ''}
            posterUrl={media ? media.poster : placeholderUrl}
            addSelectionHandler={addSelectionHandler}
            selected={media ? media.selected : false}
            selectedLength={floaterSelection.length}
            removeSelectionHandler={removeSelectionHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedMedia;
