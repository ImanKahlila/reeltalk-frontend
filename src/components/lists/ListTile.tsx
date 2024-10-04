import React from 'react';
import Image from 'next/image';

interface ListProps {
  title: string;
  imageUrl: string;
  createdBy?: string;
  showLastUpdated?: boolean;
  isPublic?:boolean;
  tileSize?: 'small' | 'large';
}

const ListTile: React.FC<ListProps> = ({ title, imageUrl, createdBy,showLastUpdated,isPublic, tileSize }) => {
  const defaultTileClass = 'w-[146.5px] h-[289.82px]';
  const defaultImageHeightClass = 'h-[216.82px]';

  const tileClass = tileSize === 'small' ? 'w-[142px] h-[316.93px]' : defaultTileClass;
  const imageHeightClass = tileSize === 'small' ? 'h-[224.93px]' : defaultImageHeightClass;

  return (
    <div className={`col-span-1 ${tileClass}`}>
      <div
        className={`relative w-full ${imageHeightClass} rounded-lg overflow-hidden`}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 767px) 100vw, 96px"
        />
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes='(max-width: 767px) 100vw, 96px'
        />
      </div>
      <div className="text-sm text-left">
        <h3
          className="mt-2 text-sm text-white line-clamp-2 min-h-[40px]">{title}</h3>
        {createdBy && <p
          className="my-1 text-medium-emphasis min-h-[40px]">By {createdBy}</p>}
        {/* TODO: Add last updated data*/}
        {showLastUpdated &&
          <p className="my-1 text-medium-emphasis">Updated {} ago</p>}
        {isPublic && <p
          className="my-1 text-medium-emphasis">{isPublic ? 'Public' : 'Private'}</p>}
      </div>
    </div>
  );
};

export default ListTile;
