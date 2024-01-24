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
  fetchingPopularCommunities: boolean;
  tags: string[];
}

const CommunityPage = ({
  joinedCommunities,
  fetchingJoinedCommunities,
  fetchingPopularCommunities,
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

        <MobilePopularCommunities
          popularCommunities={popularCommunities}
          fetchingPopularCommunities={fetchingPopularCommunities}
        />

        <DesktopPopularCommunities
          popularCommunities={popularCommunities}
          fetchingPopularCommunities={fetchingPopularCommunities}
        />
      </div>
    </>
  );
};

export default CommunityPage;
