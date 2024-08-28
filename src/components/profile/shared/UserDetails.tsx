import Image from 'next/image';
import UserImg from '@/assets/user.png';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/selectors';

export interface BadgeProps {
  badge: {
    badgeId: string;
    emoji: string;
    name: string;
    color: string;
    position: 'top' | 'bottom-right';
  };
  size?: number
}

export const UserImageWithBadge = () => {
  const userInfo = useSelector(selectUser);
  const imageUrl = userInfo?.imageUrl;
  const badge = userInfo?.badge;

  return (
    <div className="relative h-[100px] w-[100px]">
      <ProfileImage imageUrl={imageUrl} badge={badge} />
      <Badge badge={badge} size={5}/>
    </div>
  );
};

interface ProfileImageProps {
  imageUrl: string;
  badge?: BadgeProps['badge'];
  size?:number;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ imageUrl, badge,size }) => {
  const userInfo = useSelector(selectUser);
  const imageSize = size?size:100;
  const shadowColor = badge?.color || 'transparent';

  return (
    <Image
      src={imageUrl && imageUrl !== '' ? imageUrl : UserImg}
      width={imageSize}
      height={imageSize}
      alt="profile-pic"
      className="rounded-full"
      style={{ boxShadow: `0 0 0 ${(userInfo?.premiumStatus === 'Premium' || userInfo?.premiumStatus === 'Platinum') ? '4px' : '0'} ${shadowColor}` }}
    />
  );
};

export const Badge: React.FC<BadgeProps> = ({ badge,size }) => {
  if (!badge || !isPremiumOrPlatinumUser()) return null;
  const badgeSize = size?size:4;
  return (
    <span
      className={`absolute w-${badgeSize} h-${badgeSize}  ${
        badge.position === 'top'
          ? '-top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          : 'bottom-2 right-2 transform translate-x-1/2 translate-y-1/2'
      }`}
    >
  <img src={badge.emoji} alt="badge" />

    </span>
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

export const formattedBirthday = (timestamp:any) => {
  if (!timestamp || typeof timestamp._seconds !== 'number' || typeof timestamp._nanoseconds !== 'number') {
    return 'Invalid Date';
  }

  // Convert Firestore timestamp to a JavaScript Date object
  const dateObject = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);

  // Check if the date is valid
  const isDateValid = !isNaN(dateObject.getTime());

  // Format the birthday if it's valid
  return isDateValid
    ? dateObject.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    : 'Invalid Date';
};

export const isPremiumOrPlatinumUser=()=>{
  const userInfo = useSelector(selectUser);
  return( userInfo?.premiumStatus==='Premium' || userInfo?.premiumStatus==='Platinum')
}