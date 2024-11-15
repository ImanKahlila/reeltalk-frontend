import React from 'react';
import Image from 'next/image';

import { IRelatedTitlesSelection } from './CreateCommunity.hooks';
import { PlusIcon } from 'lucide-react';

interface IRelatedMediaSelectionProps {
  relatedTitlesSelection: IRelatedTitlesSelection['relatedTitles'];
  removeSelectionHandler: (id: string) => void;
  selectionPlaceholder: {
    id: string;
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
  id: string;
  poster: string;
  removeSelectionHandler: (id: string) => void;
}

function Media({ id, poster, removeSelectionHandler }: IMediaProps) {
  return (
    <div
      onClick={() => removeSelectionHandler(id)}
      className='relative h-[120px] w-[80px] cursor-pointer border-2 border-dashed border-gray'
    >
      <picture>
        <Image src={poster} fill alt=''></Image>
        <PlusIcon />
      </picture>
    </div>
  );
}
