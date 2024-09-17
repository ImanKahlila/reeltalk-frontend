import {
  BadgeProps,
  UserImageWithBadge,
} from '@/components/profile/shared/UserDetails';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '@/lib/context';
import { useUserInfo } from '@/hooks/useUserInfo';
import Link from 'next/link';

interface CustomBackgroundProps {
  badgeSelection: (badge: BadgeProps['badge']) => void;
  selectedBadge: BadgeProps['badge'];
  layout?: 'grid' | 'single-line';
  size?: number;
}

const CustomBackground: React.FC<CustomBackgroundProps> = ({ badgeSelection, selectedBadge, layout,size }) => {
  const { idToken } = useUserContext();
  const { isBadgeAllowed } = useUserInfo();
  const imageSize= size||50;
  const [badges ,setBadges]= useState<BadgeProps['badge'][]>([])
  useEffect(() => {
    const fetchBadges = async () => {
      const response = await axios.get(
        `https://us-central1-reeltalk-app.cloudfunctions.net/backend/profile/badges`,
        // `http://localhost:8080/profile/badges`,
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
          : 'flex flex-row space-x-2 mt-2 justify-start'
      }
    >
      {
        badges.length>0 && badges.map((badge: BadgeProps['badge']) => (
          <div className={`relative w-14 h-14 mb-2 ${isBadgeAllowed?'cursor-pointer':'cursor-not-allowed'}`}
               key={badge?.badgeId} onClick={() => badgeSelection(badge)}>
            <UserImageWithBadge  badge={badge} size={imageSize} displayBadges={true}/>
            {
              isBadgeAllowed && (selectedBadge?.badgeId === badge?.badgeId) &&
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
      {!isBadgeAllowed &&
        <div
          className="absolute right-6 p-2 rounded-lg mb-4">
          <Link
            href={`/profile/store`}
            className={`rounded-lg bg-pure-white px-4 py-2 mr-6 text-center m-1 text-sm text-secondary tracking-[0.08px] cursor-allowed`}
          >
            <span>Unlock Premium</span>
          </Link>
        </div>
      }
    </div>
  )
}

export default CustomBackground