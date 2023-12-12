import React, { useState } from 'react';
import Image from 'next/image';

// Components
import UserIcon from '@/components/Icons/userIcon';

// ShadCN/UI
import { Skeleton } from '@/components/ui/skeleton';

import { IPageData } from '@/pages/community/[communityId]';
import { cn } from '@/lib/utils';
import { useUserContext } from '@/lib/context';

const Header = ({ pageData }: { pageData: IPageData }) => {
  const { user } = useUserContext();
  const isAdmin = user?.uid === pageData.userId;
  const isMember = user ? pageData?.members.includes(user.uid) : false;
  const isPublic = pageData.isPublic === 'true';

  // Skeleton Image Loader logic
  const [communityImageLoaded, setCommunityImageLoaded] = useState(false);
  const [coverImageLoaded, setCoverImageLoaded] = useState(false);

  const handleCommunityImageLoad = () => {
    setCommunityImageLoaded(true);
  };
  const handleCoverImageload = () => {
    setCoverImageLoaded(true);
  };
  return (
    <header className='relative mx-auto block h-[11.11vw] max-h-[170px] min-h-[160px] max-w-screen-2xl'>
      {pageData.coverPhoto ? (
        <>
          <Image
            className={`object-cover ${!coverImageLoaded ? 'invisible' : 'visible'}`}
            src={pageData.coverPhoto || ''}
            onLoadingComplete={handleCoverImageload}
            onError={handleCoverImageload}
            fill
            alt=''
          ></Image>
          {!coverImageLoaded && <Skeleton className='absolute h-full w-full rounded-none' />}
        </>
      ) : null}
      <div className='bg-custom-gradient relative h-full w-full bg-black'></div>

      <div className='relative bottom-[126px] mx-auto flex h-[106.667px] max-w-[1120px] gap-3 md:bottom-[107px] md:gap-8 md:pl-4'>
        <picture className='relative block min-w-[80px] overflow-hidden rounded-md'>
          <Image
            className={`object-cover ${!communityImageLoaded ? 'invisible' : 'visible'}`}
            src={pageData?.communityImage || '/Pixel-160.png'}
            onLoadingComplete={handleCommunityImageLoad}
            onError={handleCommunityImageLoad}
            fill
            alt=''
          ></Image>
          {!communityImageLoaded && <Skeleton className='h-full w-full rounded-none' />}
        </picture>

        <div className='flex h-full flex-col justify-between md:justify-end md:gap-1'>
          <h1 className='text-[28px] font-medium tracking-[-0.42px] text-high-emphasis'>
            {pageData?.name}
          </h1>
          <div className='flex h-full flex-col justify-between md:h-fit md:flex-row md:items-center md:justify-start md:gap-6'>
            <div className='tracking-eight text-high-emphasis'>
              <span className=''>{isPublic ? 'Public' : 'Private'}</span>
              <span className='px-2'>·</span>{' '}
              <UserIcon className='relative bottom-[1px] inline-block' />{' '}
              <span className='pl-1'>{pageData.members.length || 1}</span>
            </div>
            <div className='flex gap-4'>
              {isMember ||
                (isAdmin && (
                  <button
                    className='h-[34px] w-fit rounded-[4px] bg-primary px-4 font-semibold tracking-eight text-secondary md:hidden'
                    type='button'
                  >
                    Create new post
                  </button>
                ))}
              <MemberButton isAdmin={isAdmin} isMember={isMember} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isAdmin: boolean;
  isMember: boolean;
}

function MemberButton({ isAdmin, isMember }: CustomButtonProps) {
  const display = isAdmin ? 'Admin' : isMember ? 'Joined' : 'Join';

  return (
    <button
      type='button'
      className={cn(
        'h-[34px] w-fit rounded-[4px] bg-primary px-4 font-semibold tracking-eight text-secondary',
        (isMember || isAdmin) && 'bg-gray text-disabled',
      )}
    >
      {display}
    </button>
  );
}
