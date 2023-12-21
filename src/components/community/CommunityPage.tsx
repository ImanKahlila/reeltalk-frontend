import React from 'react';

// Components
import Aside from './Aside';
import JoinedCommunities from './JoinedCommunities';
import DesktopPopularCommunities from './DesktopPopularCommunities';
import MobilePopularCommunities from './MobilePopularCommunities';

// Util/Hooks
import { ICommunityObject } from '@/pages/community/[communityId]';

interface CommunityPageProps {
  joinedCommunities: ICommunityObject[];
  fetchingJoinedCommunities: boolean;
  popularCommunities: ICommunityObject[];
  tags: string[];
}

const CommunityPage = ({
  joinedCommunities,
  fetchingJoinedCommunities,
  popularCommunities,
  tags,
}: CommunityPageProps) => {
  return (
    <>
      <Aside tags={tags} />

      {/* COMMUNITIES */}
      <div className='mx-auto flex w-full max-w-[352px] flex-col gap-4 md:max-w-none'>
        <JoinedCommunities
          joinedCommunities={joinedCommunities}
          fetchingJoinedCommunities={fetchingJoinedCommunities}
        />

        <MobilePopularCommunities popularCommunities={popularCommunities} />

        <DesktopPopularCommunities popularCommunities={popularCommunities} />
      </div>
    </>
  );
};

export default CommunityPage;
