import Image from 'next/image';
import DownArrow from '../../Icons/DownArrow';
import { useUserContext } from '@/lib/context';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ICommunityObject } from '@/pages/community/[communityId]';

type HeaderCommunitySelectProps = React.HTMLAttributes<HTMLDivElement> & {
  onSelect?: (communityName: string) => void;
};

export default function HeaderCommunitySelect({ onSelect, ...props }: HeaderCommunitySelectProps) {
  const { user, idToken } = useUserContext();
  const [dropdown, setDropdown] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<ICommunityObject | null>(null);

  const [communities, setCommunities] = useState<ICommunityObject[]>([]);

  useEffect(() => {
    async function fetchCommunities() {
      try {
        const response = await axios.get<ICommunityObject[]>(
            'https://us-central1-reeltalk-app.cloudfunctions.net/backend/communities', 
            // 'http://localhost:8080/communities', 
            {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        setCommunities(response.data);
      } catch (error) {
        console.error('Error fetching communities:', error);
      }
    }

    if (dropdown && idToken) {
      fetchCommunities();
    }
  }, [dropdown, idToken]);

  return (
    <div {...props}>
      {user?.photoURL && (
        <div className='flex h-4 grow items-center gap-1 text-high-emphasis'>
          <Image
            height={16}
            width={16}
            src={user?.photoURL}
            alt='profile icon'
            className='rounded-full'
          />
          {user.displayName}
        </div>
      )}

      <div
        onClick={() => setDropdown(prev => !prev)}
        className={`${
          dropdown
            ? 'h-[10.75rem] border-primary'
            : 'h-[2.875rem] cursor-pointer border-medium-emphasis'
        } ignore-collapse absolute right-2 top-2 z-10 w-[14rem] rounded border-[1px] 
          bg-third-surface px-3 pt-[9px] text-medium-emphasis transition-all`}
      >
        <div className='relative mb-6 flex items-center'>
          {!dropdown && (
            <div className='flex items-center'>
              <Image
                height={24}
                width={17}
                src={selectedCommunity?.communityImage || '/default-image.png'}
                alt={`${selectedCommunity?.name} Icon`}
                className='mr-2'
              />
              <p className='text-xs font-medium'>
                {selectedCommunity?.name || 'General Community'}
              </p>
            </div>
          )}
          <DownArrow
            className={`${
              dropdown ? 'top-[0.75rem] ' : ''
            } absolute right-3 cursor-pointer transition-all`}
          />
        </div>

        {dropdown && (
          <div className='mt-2 max-h-[8rem] overflow-y-auto'>
            <div className='flex items-center justify-between'>
              <p className='mb-1 text-xs font-medium'>Your Communities</p>
              <Link legacyBehavior href='/create-community'>
                <a className='text-[10px] font-medium text-primary '>Create New</a>
              </Link>
            </div>
            {communities.map(community => (
              <div className='hover:cursor-pointer' key={community.communityId}>
                <div
                  className='my-2 flex items-center'
                  onClick={() => {
                    setSelectedCommunity(community);
                    if (onSelect) {
                      onSelect(community.name);
                    }
                  }}
                >
                  <Image
                    height={37}
                    width={24}
                    src={community.communityImage}
                    alt={`${community.name} Icon`}
                    className='mr-2'
                  />
                  <p className='ml-2'>{community.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
