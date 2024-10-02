import React from 'react';
import Image from 'next/image';

interface ListProps {
  title: string;
  imageUrl: string;
  createdBy?: string;
  showLastUpdated?: boolean;
  isPublic?:boolean;
}

const ListTile: React.FC<ListProps> = ({ title, imageUrl, createdBy,showLastUpdated,isPublic }) => {
  return (
    <div className="col-span-1  w-[152px] h-[297.93px]">
      <div className="relative w-[151.98px] h-[224.93px] rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes='(max-width: 767px) 100vw, 96px'
        />
      </div>
      <div className="text-sm text-left">
      <h3 className="mt-2 text-sm text-white line-clamp-2 min-h-[40px]">{title}</h3>
        {createdBy && <p className="my-1 text-medium-emphasis min-h-[40px]">By {createdBy}</p>}
        {/* TODO: Add last updated data*/}
        {showLastUpdated && <p className="my-1 text-medium-emphasis">Updated {} ago</p>}
        {isPublic && <p className="my-1 text-medium-emphasis">{isPublic?'Public':'Private'}</p>}

      </div>
    </div>
  );
};

export default ListTile;
