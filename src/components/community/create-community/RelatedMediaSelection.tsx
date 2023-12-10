import React from 'react';
import Image from 'next/image';

import { IRelatedTitlesSelection } from './CreateCommunity.hooks';

interface IRelatedMediaSelectionProps {
  relatedTitlesSelection: IRelatedTitlesSelection['relatedTitles'];
  removeSelectionHandler: (id: number | string) => void;
  selectionPlaceholder: {
    id: number;
    title: string;
    poster: string;
  }[];
}
const RelatedMediaSelection = ({
  relatedTitlesSelection,
  removeSelectionHandler,
  selectionPlaceholder,
}: IRelatedMediaSelectionProps) => {
  return (
    <div className='mt-4 flex justify-between'>
      {relatedTitlesSelection.map(title => (
        <Media
          key={title.id}
          id={title.id}
          poster={title.poster}
          removeSelectionHandler={removeSelectionHandler}
        />
      ))}
      {selectionPlaceholder.map(placeholder => (
        <div
          key={placeholder.id}
          className='relative h-[120px] w-[80px] border-2 border-dashed border-gray'
        ></div>
      ))}
    </div>
  );
};

export default RelatedMediaSelection;

interface IMediaProps {
  id: number | string;
  poster: string;
  removeSelectionHandler: (id: number | string) => void;
}

function Media({ id, poster, removeSelectionHandler }: IMediaProps) {
  return (
    <div
      onClick={() => removeSelectionHandler(id)}
      className='relative h-[120px] w-[80px] cursor-pointer border-2 border-dashed border-gray'
    >
      <picture>
        <Image src={poster} fill alt=''></Image>
      </picture>
    </div>
  );
}
