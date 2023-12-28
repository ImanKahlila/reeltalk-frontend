import React from 'react';
import Image from 'next/image';
import MinusIcon from '@/components/Icons/MinusIcon';

interface MediaSelectionProps {
  id?: string;
  poster: string;
  removeSelectionHandler?: (id: string, newVal: boolean, isApi: boolean) => void;
  isApi: boolean;
}

const MediaSelection = ({ id, poster, removeSelectionHandler, isApi }: MediaSelectionProps) => {
  return (
    <div className='relative h-[72px] w-12 cursor-pointer outline-dashed outline-2 outline-medium-emphasis'>
      {poster ? (
        <Image
          onClick={() => removeSelectionHandler!(id!, false, isApi)}
          src={poster}
          fill
          alt=''
        ></Image>
      ) : null}
      <MinusIcon className={`absolute -right-2 -top-2 ${poster ? 'block' : 'hidden'}`} />
    </div>
  );
};

export default MediaSelection;

