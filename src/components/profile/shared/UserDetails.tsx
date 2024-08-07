import Image from 'next/image';
import UserImg from '@/assets/user.png';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/selectors';

export const ProfileImage = () => {
  const userInfo = useSelector(selectUser);
  const imageUrl = userInfo?.imageUrl;

  return (
    <div className='flex h-[100px] w-[100px] items-center'>
      <Image
        src={imageUrl && imageUrl !== '' ? imageUrl : UserImg}
        width={100}
        height={100}
        alt=""
        className="rounded-full"
      />
    </div>
  );
};

export const Name = () => {
  const userInfo = useSelector(selectUser);
  const displayName = userInfo?.displayName;

  const formatDisplayName = (name: string) => {
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

export const Status = () => {
  const userInfo = useSelector(selectUser);
  const premiumStatus = userInfo?.premiumStatus;

  return <>Status: {premiumStatus}</>;
};

export const Gems = () => {
  const userInfo = useSelector(selectUser);
  return (<>{userInfo?.gems}</>)
}
