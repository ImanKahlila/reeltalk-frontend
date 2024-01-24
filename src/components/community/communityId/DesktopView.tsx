import React from 'react';

// Components
import { Poster } from './Poster';
import Link from 'next/link';

// Util
import { useUserContext } from '@/lib/context';
import { ICommunityObject } from '@/pages/community/[communityId]';
import { ValidJoinRequestsData } from '@/pages/community/[communityId]';
import AdminView from './AdminView';

function DesktopView({
  pageData,
  joinRequestsData,
}: {
  pageData: ICommunityObject;
  joinRequestsData: ValidJoinRequestsData | null;
}) {
  const { user } = useUserContext();
  const isAdmin = user?.uid === pageData.userId;
  const communityId = pageData.communityId;

  return (
    <div className='mx-auto mt-6 hidden max-w-[1120px] gap-8 px-4 md:flex'>
      {isAdmin ? (
        <AdminView pageData={pageData} joinRequestsData={joinRequestsData} />
      ) : (
        <div className='flex h-[506px] w-full min-w-[px] flex-col items-center justify-center gap-6 rounded-[8px] bg-first-surface'>
          <p className='text-center tracking-eight text-high-emphasis'>
            There is no discussion in this community. <br /> Post the first thread here!
          </p>
          <button
            type='button'
            className='h-[34px] rounded-[4px] bg-primary px-4 font-semibold tracking-eight text-secondary'
          >
            Create new post
          </button>
        </div>
      )}

      <div className='flex w-full min-w-[320px] max-w-[352px] flex-col gap-6'>
        <div className='flex w-full flex-col gap-4 rounded-[8px] bg-first-surface px-4 py-8'>
          <h2 className='font-semibold tracking-eight text-high-emphasis'>About the community</h2>
          <p className='text-medium-emphasis'>{pageData.description}</p>
          <button
            type='button'
            className='mx-auto h-12 w-full max-w-[256px] rounded-lg bg-primary font-semibold tracking-eight text-secondary'
          >
            Create new post
          </button>
          {isAdmin && (
            <Link
              href={`/community/${communityId}/admin`}
              type='button'
              className='mx-auto flex h-12 w-full max-w-[256px] items-center justify-center rounded-lg bg-white font-semibold tracking-eight text-secondary'
            >
              Manage my community
            </Link>
          )}
        </div>
        <div className='flex w-full flex-col gap-4 rounded-[8px] bg-first-surface px-4 py-8'>
          <h2 className='font-semibold tracking-eight text-high-emphasis'>
            Related movies/TV-shows
          </h2>
          <div className='flex justify-start gap-1'>
            {pageData.content
              ? pageData.content.map(media => {
                  return <Poster key={media.id} poster={media.poster} />;
                })
              : null}
          </div>
        </div>
        <div className='flex w-full flex-col gap-4 rounded-[8px] bg-first-surface px-4 py-8'>
          <h2 className='font-semibold tracking-eight text-high-emphasis'>Rules</h2>
          <p className='tracking-eight text-medium-emphasis'>{pageData.rules}</p>
        </div>
      </div>
    </div>
  );
}

export default DesktopView;
