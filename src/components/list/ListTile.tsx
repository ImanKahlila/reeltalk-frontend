import React from 'react';
import Image from 'next/image';

interface ListProps {
  title: string;
  imageUrl: string;
  createdBy: string;
}

const ListTile: React.FC<ListProps> = ({ title, imageUrl, createdBy }) => {
  return (
    <div className="col-span-1  w-[152px] h-[297.93px] ">
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
      <h3 className="mt-2 text-sm text-white">{title}</h3>
      <p className="text-medium-emphasis">{createdBy}</p>
      </div>
    </div>
  );
};

export default ListTile;
