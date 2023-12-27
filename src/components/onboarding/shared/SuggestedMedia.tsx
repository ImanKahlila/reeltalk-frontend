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

const SuggestedMedia = (props: ISuggestedMediaProps) => {
  const {
    media,
    mediaToShow,
    addSelectionHandler,
    floaterSelection,
    removeSelectionHandler,
    errorFetching,
  } = props;

  if (errorFetching) {
    return (
      <div className='mx-auto mt-14 w-fit py-10 text-medium-emphasis'>
        Error Fetching media.. Try refreshing the page
      </div>
    );
  }

  return (
    <div className='mx-auto mt-14 max-w-[343px] md:max-w-none '>
      <h2 className='text-xl font-medium leading-normal tracking-[0.1px] text-high-emphasis'>
        Movies you might like
      </h2>

      <div className='mt-4 grid w-full grid-cols-3-auto justify-items-center gap-x-[27.5px] gap-y-4 md:grid-cols-6 md:gap-6'>
        {media.slice(0, mediaToShow).map(media => (
          <Media
            key={media.id}
            id={media.id}
            title={media.title}
            year={media.releaseYear}
            posterUrl={media.poster}
            addSelectionHandler={addSelectionHandler}
            selected={media.selected}
            selectedLength={floaterSelection.length}
            removeSelectionHandler={removeSelectionHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedMedia;
