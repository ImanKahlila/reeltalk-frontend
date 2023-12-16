import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import toast from 'react-hot-toast';

// Components
import UserIcon from '@/components/Icons/userIcon';
import Spinner from '@/components/shared/Spinner';

// ShadCN/UI
import { Skeleton } from '@/components/ui/skeleton';

import { IPageData } from '@/pages/community/[communityId]';
import { cn } from '@/lib/utils';
import { useUserContext } from '@/lib/context';
import axios, { AxiosResponse } from 'axios';

const Header = ({ pageData }: { pageData: IPageData }) => {
  const router = useRouter();
  const { communityId } = router.query;
  const { user, idToken } = useUserContext();

  // TODO: Decide wether to put logic in parent component
  const isAdmin = user?.uid === pageData.userId;
  const [isMember, setIsMember] = useState(false);
  const isPublic = pageData.isPublic;
  const [pendingJoin, setPendingJoin] = useState(false); // If user true and page is private

  useEffect(() => {
    setIsMember(user ? pageData?.members.includes(user.uid) : false);
    setPendingJoin(user && !isPublic ? pageData.joinRequests.includes(user.uid) : false);
  }, [user, pageData, isPublic]);

  // Skeleton Image Loader logic
  const [communityImageLoaded, setCommunityImageLoaded] = useState(false);
  const [coverImageLoaded, setCoverImageLoaded] = useState(false);

  const handleCommunityImageLoad = () => {
    setCommunityImageLoaded(true);
  };
  const handleCoverImageload = () => {
    setCoverImageLoaded(true);
  };

  const [spinnerActive, setSpinnerActive] = useState(false);
  async function joinCommunityHandler() {
    if (!user || isAdmin) return;
    if (pendingJoin) {
      toast.error('Your request is pending for approval!', { position: 'bottom-center' });
      return;
    }
    const API = `http://localhost:8080/communities/join-community/${communityId}`;
    let response: AxiosResponse;
    try {
      setSpinnerActive(true);
      if (isMember || pendingJoin) {
        response = await new Promise(resolve =>
          setTimeout(() => {
            resolve('Completed'); //TODO: Update once Ronny fixes delete request
          }, 3000),
        );
        setIsMember(false);
      } else {
        response = await axios.post(
          API,
          { userId: user?.uid },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );
        toast.success(response.data.message);
        if (!isPublic) {
          // Private
          setPendingJoin(true);
          return;
        }
        setIsMember(true);
      }
    } catch (error) {
    } finally {
      setSpinnerActive(false);
    }
  }

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
              <MemberButton
                joinCommunityHandler={joinCommunityHandler}
                isAdmin={isAdmin}
                isMember={isMember}
                pendingJoin={pendingJoin}
                isPublic={isPublic}
                spinnerActive={spinnerActive}
              />
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
  pendingJoin: boolean;
  isPublic: boolean;
  spinnerActive: boolean;
  joinCommunityHandler(): Promise<void>;
}

function MemberButton({
  isAdmin,
  isMember,
  joinCommunityHandler,
  pendingJoin,
  isPublic,
  spinnerActive,
}: CustomButtonProps) {
  const display = isAdmin
    ? 'Admin'
    : pendingJoin
      ? 'Pending'
      : isMember
        ? 'Joined'
        : isPublic
          ? 'Join'
          : 'Ask to join';

  return (
    <button
      type='button'
      onClick={joinCommunityHandler}
      className={cn(
        'h-[34px] w-fit rounded-[4px] bg-primary px-4 font-semibold tracking-eight text-secondary transition-all duration-300',
        (isMember || isAdmin || pendingJoin) && 'bg-gray text-disabled',
      )}
    >
      {spinnerActive ? <Spinner /> : display}
    </button>
  );
}
