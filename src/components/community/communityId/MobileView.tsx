import React from 'react';

// Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Poster } from './Poster';

import { ICommunityObject } from '@/pages/community/[communityId]';
import AdminView from './AdminView';
import { useUserContext } from '@/lib/context';
import { ValidJoinRequestsData } from '@/pages/community/[communityId]';

export interface ITabsMobileProps {
  pageData: ICommunityObject;
}

function MobileView({
  pageData,
  joinRequestsData,
}: {
  pageData: ITabsMobileProps['pageData'];
  joinRequestsData: ValidJoinRequestsData | null;
}) {
  const { user } = useUserContext();
  const isAdmin = user?.uid === pageData.userId;

  return isAdmin ? (
    <AdminView pageData={pageData} joinRequestsData={joinRequestsData} className='md:hidden' />
  ) : (
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
export default MobileView;

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

function AboutTab({ pageData }: { pageData: ICommunityObject }) {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex w-full flex-col gap-4 rounded-sm bg-first-surface px-4 py-8'>
        <h2 className='font-semibold tracking-eight text-high-emphasis'>About the community</h2>
        <p className='text-medium-emphasis'>{pageData.description}</p>
      </div>
      <div className='flex w-full flex-col gap-4 rounded-sm bg-first-surface px-4 py-8'>
        <h2 className='font-semibold tracking-eight text-high-emphasis'>Related movies/TV-shows</h2>
        <div className='flex justify-start gap-1'>
          {pageData.content
            ? pageData.content.map(media => {
                return <Poster key={media.id} poster={media.poster} />;
              })
            : null}
        </div>
      </div>
      <div className='flex w-full flex-col gap-4 rounded-sm bg-first-surface px-4 py-8'>
        <h2 className='font-semibold tracking-eight text-high-emphasis'>Rules</h2>
        <p className='whitespace-pre-wrap break-words tracking-eight text-medium-emphasis'>
          {pageData.rules}
        </p>
      </div>
    </div>
  );
}
