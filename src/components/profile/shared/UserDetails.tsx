import Image from 'next/image';
import UserImg from '@/assets/user.png';
import React from 'react';
import { useUserInfo } from '@/hooks/useUserInfo';

export interface BadgeProps {
  badge?: {
    badgeId: string;
    emoji: string;
    name: string;
    color: string;
    position: 'top' | 'bottom-right';
  };
  size?: number;
  displayBadges?: boolean;
}

export const UserImageWithBadge: React.FC<BadgeProps> = ({
                                                           badge,
                                                           size = 100, // Default size if not provided
                                                           displayBadges
                                                         }) => {
  const { imageUrl, badge: savedBadge } = useUserInfo();
  const chosenBadge = badge || savedBadge;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ProfileImage imageUrl={imageUrl} badge={chosenBadge} size={size} displayBadges={displayBadges} />
      {chosenBadge && (
        <Badge badge={chosenBadge} size={size ? size / 4 : 20} displayBadges={displayBadges} />
      )}
    </div>
  );
};

interface ProfileImageProps {
  imageUrl: string;
  badge?: BadgeProps['badge'];
  size?: number;
  displayBadges?: boolean;
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
                                                            imageUrl,
                                                            badge,
                                                            size = 100, // Default size if not provided
                                                            displayBadges
                                                          }) => {
  const shadowColor = badge?.color || 'transparent';
  const { isBadgeAllowed } = useUserInfo();

  return (
    <Image
      src={imageUrl && imageUrl !== '' ? imageUrl : UserImg}
      width={size}
      height={size}
      alt="profile-pic"
      className="rounded-full"
      style={{
        boxShadow: `0 0 0 ${isBadgeAllowed || displayBadges ? '4px' : '0px'} ${shadowColor}`,
      }}
    />
  );
};

export const Badge: React.FC<BadgeProps> = ({ badge, size = 20, displayBadges }) => {
  const { isBadgeAllowed } = useUserInfo();

  if (!badge || (!isBadgeAllowed && !displayBadges)) {
    return null;
  }

  const badgeSize = size || 20;

  return (
    <span
      className={`absolute ${
        badge.position === 'top'
          ? 'top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
          : 'bottom-0 right-0'
      }`}
      style={{ width: badgeSize, height: badgeSize }}
    >
      <img
        src={badge.emoji}
        alt="badge"
        className="w-full h-full object-contain"
      />
    </span>
  );
};

export const Name = () => {
  const { displayName } = useUserInfo();

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
  const { premiumStatus } = useUserInfo();
  return <>Status: {premiumStatus}</>;
};

export const Gems = () => {
  const { gems } = useUserInfo();
  return (<>{gems}</>);
};

export const formattedBirthday = (timestamp: any) => {
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
