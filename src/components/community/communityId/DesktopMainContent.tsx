import React from 'react';

// Components
import { Poster } from '../Poster';

import { IPageData } from '@/pages/community/[communityId]';

interface IDesktopMainContentProps {
  pageData: IPageData;
}

function DesktopMainContent({ pageData }: IDesktopMainContentProps) {
  return (
    <div className='mx-auto mt-6 hidden max-w-[1120px] gap-8 px-4 md:flex'>
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
          <button
            type='button'
            className='mx-auto h-12 w-full max-w-[256px] rounded-lg bg-white font-semibold tracking-eight text-secondary'
          >
            Manage my community
          </button>
        </div>
        <div className='flex w-full flex-col gap-4 rounded-[8px] bg-first-surface px-4 py-8'>
          <h2 className='font-semibold tracking-eight text-high-emphasis'>
            Related movies/TV-shows
          </h2>
          <div className='flex justify-start gap-1'>
            {pageData.content.map(media => {
              return <Poster key={media.id} poster={media.poster} />;
            })}
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

export default DesktopMainContent;
