import React from 'react';

// Components
import { Poster } from './Poster';
import Link from 'next/link';

// Util
import { useUserContext } from '@/lib/context';
import { ICommunityObject } from '@/pages/community/[communityId]';
import { ValidJoinRequestsData } from '@/pages/community/[communityId]';
import AdminView from './AdminView';
import Post from '@/components/discussions/Post';

interface DesktopViewProps {
  pageData: ICommunityObject;
  joinRequestsData: ValidJoinRequestsData | null;
  discussions: any[];
}

interface Discussion {
  id: string;
  //   content: string;
  userId: string;
  createAt: any;
  likes: string[];
  comments: string[];
  communityBelonged: string;
  tagged: string[];
}

function DesktopView({ pageData, joinRequestsData, discussions }: DesktopViewProps) {
  const { user } = useUserContext();
  const isAdmin = user?.uid === pageData.userId;
  const communityId = pageData.communityId;

  return (
    <div className='mx-auto mt-8 hidden max-w-[1120px] gap-8 px-4 md:flex'>
      {isAdmin ? (
        <AdminView pageData={pageData} joinRequestsData={joinRequestsData} />
      ) : (
        <div className='flex w-full min-w-[px] flex-col items-center justify-center gap-6 rounded-[8px] bg-first-surface'>
          {discussions.length === 0 ? (
            <p className='text-center tracking-eight text-high-emphasis'>
              There are no discussions in this community. <br /> Post the first thread here!
            </p>
          ) : (
            <div className='flex flex-col gap-6 lg:w-[46rem]'>
              {discussions.map(discussion => (
                <Post
                  key={discussion?.id}
                  discussionId={discussion?.discussionId}
                  userId={discussion?.userId}
                  createAt={discussion?.createAt}
                  likes={discussion?.likes}
                  comments={discussion?.comments}
                  // commentId={discussion?.comments}
                  communityBelonged={discussion?.communityBelonged}
                  body={discussion?.body}
                  tagged={discussion?.tagged}
                />
              ))}
            </div>
          )}
          {/* <button
            type='button'
            className='h-[34px] rounded-[4px] bg-primary px-4 font-semibold tracking-eight text-secondary'
          >
            Create new post
          </button> */}
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

///COMPARE WITH GITHUB CODE
///I MIGHT BE ONTO SOMETHING
///RESTRUCTURING COULD BE THE KEY
///HOPEFULLY
