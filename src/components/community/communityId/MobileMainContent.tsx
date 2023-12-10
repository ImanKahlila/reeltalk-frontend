import React from 'react';

// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Poster } from './Poster';

import { IPageData } from '@/pages/community/[communityId]';

interface ITabsMobileProps {
  pageData: IPageData;
}

function MobileMainContent({ pageData }: ITabsMobileProps) {
  return (
    <Tabs defaultValue='posts' className='mx-auto mt-4 max-w-lg md:hidden'>
      <TabsList className='relative bg-transparent font-normal text-disabled'>
        <TabsTrigger value='posts'>Posts</TabsTrigger>
        <TabsTrigger value='about'>About</TabsTrigger>
      </TabsList>
      <TabsContent className='mt-4' value='posts'>
        <PostsTab />
      </TabsContent>
      <TabsContent value='about' className='mt-4'>
        <AboutTab pageData={pageData} />
      </TabsContent>
    </Tabs>
  );
}
export default MobileMainContent;

function PostsTab() {
  return (
    <div className='flex h-[390px] w-full flex-col items-center justify-center gap-6 rounded-lg bg-first-surface p-4 text-center'>
      <p className='tracking-eight text-high-emphasis'>
        There is no discussion in this community. Post the first thread here!
      </p>
      <button
        type='button'
        className='flex h-[34px] items-center justify-center rounded-sm bg-primary px-4 font-medium tracking-eight  text-secondary'
      >
        Create new post
      </button>
    </div>
  );
}

function AboutTab({ pageData }: { pageData: IPageData }) {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex h-[188px] w-full flex-col gap-4 rounded-sm bg-first-surface px-4 py-8'>
        <h2 className='font-semibold tracking-eight text-high-emphasis'>About the community</h2>
        <p className='text-medium-emphasis'>{pageData.description}</p>
        <button
          type='button'
          className='mx-auto h-12 w-full max-w-[256px] rounded-lg bg-white font-semibold tracking-eight text-secondary'
        >
          Community settings
        </button>
      </div>
      <div className='flex w-full flex-col gap-4 rounded-sm bg-first-surface px-4 py-8'>
        <h2 className='font-semibold tracking-eight text-high-emphasis'>Related movies/TV-shows</h2>
        <div className='flex justify-start gap-1'>
          {pageData.content.map(media => {
            return <Poster key={media.id} poster={media.poster} />;
          })}
        </div>
      </div>
      <div className='flex w-full flex-col gap-4 rounded-sm bg-first-surface px-4 py-8'>
        <h2 className='font-semibold tracking-eight text-high-emphasis'>Rules</h2>
        <p className='tracking-eight text-medium-emphasis'>{pageData.rules}</p>
      </div>
    </div>
  );
}
