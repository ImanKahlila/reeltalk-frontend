import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import UserIcon from '../Icons/userIcon';
import { Skeleton } from '../ui/skeleton';
import axios from 'axios';
import { useUserContext } from '@/lib/context';

const UserCommunity = ({ communityId }: any) => {
  //   const { communityId, name, isPublic, communityImage, members } = props;
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    // When the image is loaded, set the state to indicate that the image is ready
    setImageLoaded(true);
  };

  const [communityInfo, setCommunityInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user, idToken } = useUserContext();

  useEffect(() => {
    const fetchCommunityDetails = async () => {
      try {
        if (communityId) {
        const response = await axios.get(
          `https://us-central1-reeltalk-app.cloudfunctions.net/backend/communities/${communityId}/`,
          //   `http://localhost:8080/communities/${communityId}/`,
          {
            headers: { Authorization: `Bearer ${idToken}` },
          },
        );
        const communityData = response.data.communityData;

        if (communityData) {
          setCommunityInfo(communityData);
        }
        }
      } catch (error) {
        console.error('Error fetching community details:', error);
        setError('Error fetching community details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunityDetails();
  }, [communityId, idToken]);

  return (
    <Link href={`/community/${communityId}`} className='w-[102.188px]'>
      <div className='relative block h-[153.787px] overflow-hidden rounded-md'>
        <div
          className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        >
          <Image
            className='object-cover'
            src={communityInfo?.communityImage || ''}
            layout='fill'
            alt=''
          />
        </div>
        {isLoading && <Skeleton className='h-[153.787px] flex-grow rounded-md' />}
      </div>
      <div className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <h2 className='mt-2 text-sm tracking-eight text-high-emphasis'>
          {truncateString(communityInfo?.name || '')}
        </h2>
        <div className='mt-[10px] text-xs tracking-[0.06px] text-medium-emphasis'>
          <span>{communityInfo?.isPublic ? 'Public' : 'Private'}</span>
          <span className='px-2'>·</span>{' '}
          <UserIcon className='relative bottom-[1px] inline-block' />{' '}
          <span className='pl-1'>{communityInfo?.members?.length + 1 || 0}</span>
        </div>
      </div>
    </Link>
  );
};

export default UserCommunity;

// Helper Function
function truncateString(str: string) {
  if (str?.length > 12) {
    return str.substring(0, 12) + '...';
  } else {
    return str;
  }
}
