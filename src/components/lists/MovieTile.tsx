import React from 'react';
import Image from 'next/image';

interface MovieProps {
  imageUrl: string;
  title:string
}

const MovieTile: React.FC<MovieProps> = ({ imageUrl,title}) => {

  return (
      <div
        className={`relative w-[83.25px] h-[117px] overflow-hidden`}>
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 767px) 100vw, 96px"
        />
    </div>
  );
};

export default MovieTile;
