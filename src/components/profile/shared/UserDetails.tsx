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
}

export const UserImageWithBadge = () => {
  const userInfo = useSelector(selectUser);
  const imageUrl = userInfo?.imageUrl;
  const badge = userInfo?.badge;

  return (
    <div className="relative h-[100px] w-[100px]">
      <ProfileImage imageUrl={imageUrl} badge={badge} />
      <Badge badge={badge} />
    </div>
  );
};

interface ProfileImageProps {
  imageUrl: string;
  badge?: BadgeProps['badge'];
}

export const ProfileImage: React.FC<ProfileImageProps> = ({ imageUrl, badge }) => {
  return (
    <Image
      src={imageUrl && imageUrl !== '' ? imageUrl : UserImg}
      width={100}
      height={100}
      alt="profile-pic"
      className="rounded-full ring-4"
      style={{ boxShadow: `0 0 0 4px ${badge?.color}` }}
    />
  );
};

export const Badge: React.FC<BadgeProps> = ({ badge }) => {
  if (!badge) return null;

  return (
    <span
      className={`absolute w-4 h-4 ${
        badge.position === 'top'
          ? '-top-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          : 'bottom-2 right-1 transform translate-x-1/2 translate-y-1/2'
      }`}
    >
      <img src={badge.emoji} alt="badge"/>
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
