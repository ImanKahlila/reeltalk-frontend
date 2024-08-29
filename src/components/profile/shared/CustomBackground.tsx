import {
  Badge,
  BadgeProps,
  ProfileImage,
} from '@/components/profile/shared/UserDetails';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/selectors';
import { useUserContext } from '@/lib/context';

interface CustomBackgroundProps {
  badgeSelection: (badge: BadgeProps['badge']) => void;
  selectedBadge: BadgeProps['badge'];
  layout?: 'grid' | 'single-line'; // Added a layout prop
}

const CustomBackground: React.FC<CustomBackgroundProps> = ({ badgeSelection, selectedBadge, layout }) => {
  const { idToken } = useUserContext();
  const userInfo = useSelector(selectUser);
  const [badges ,setBadges]= useState<BadgeProps['badge'][]>([])
  const imageUrl = userInfo?.imageUrl;
  useEffect(() => {
    const fetchBadges = async () => {
      const response = await axios.get(
        `https://us-central1-reeltalk-app.cloudfunctions.net/backend/config/badges`,
        // `http://localhost:8080/config/badges`,
        {
          headers: { Authorization: `Bearer ${idToken}` },
        },
      );
      return response.data;
    }
    fetchBadges().then(badges => setBadges(badges));
  }, []);

  return (<div
      className={
        layout === 'grid'
          ? 'grid grid-cols-3 gap-2 mx-10 justify-items-center'
          : 'flex flex-row space-x-6 mt-4 justify-start'
      }
    >
      {
        badges.map((badge: BadgeProps['badge']) => (
          <div className="relative w-14 h-14 mb-6 cursor-pointer"
               key={badge.badgeId} onClick={() => badgeSelection(badge)}>
            <ProfileImage imageUrl={imageUrl} badge={badge} size={50}/>
            <Badge badge={badge}/>
            {
              (selectedBadge?.badgeId === badge.badgeId) &&
              <svg
                className="top-0 right-0 absolute  w-4 h-4 bg-dark-green rounded-full">
                <path
                  d="M4 8.5L7 11.5L12.5 6L11 4.5L7 8.5L5.5 7L4 8.5z"
                  fill="white"
                  strokeWidth="2"
                />
              </svg>
            }
          </div>

        ))}
    </div>
  )
}

export default CustomBackground