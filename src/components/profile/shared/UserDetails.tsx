import Image from 'next/image';
import UserImg from '@/assets/user.png';
import React from 'react';

interface UserImageProps {
  imageUrl?: string;
}

interface DisplayNameProps {
  displayName?: string;
}

export const UserImage: React.FC<UserImageProps> = ({ imageUrl }) => {
  return (
    <div className='flex h-[100px] w-[100px] items-center'>
    <Image
      src={imageUrl && imageUrl !== '' ? imageUrl : UserImg}
      width={100}
      height={100}
      alt=""
      className="h-[100px] w-[100px] rounded-full"
    /></div>
  );
};

export const DisplayName: React.FC<DisplayNameProps> = ({ displayName }) => {
  const formatDisplayName = (name:string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };
  const formattedName = displayName ? formatDisplayName(displayName) : '';

  return (
    <div>
      <h1 className="text-high-emphasis md:text-3xl">{formattedName}</h1>
    </div>
  );
};
