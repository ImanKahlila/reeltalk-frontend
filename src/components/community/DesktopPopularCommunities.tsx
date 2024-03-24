import React from 'react';

// Components
import DesktopPopularCommunity from './DesktopPopularCommunity';
import EllipseLoader from '../shared/EllipseLoader';

// Util
import { ICommunityObject } from '@/pages/community/[communityId]';

interface IPopularCommunitiesProps {
  popularCommunities: ICommunityObject[];
  fetchingPopularCommunities: boolean;
}

const DesktopPopularCommunities = ({
  popularCommunities,
  fetchingPopularCommunities,
}: IPopularCommunitiesProps) => {
  return (
    <div className='mt-4 hidden md:block'>
      <h1 className='mb-2 text-xl font-normal tracking-[0.1px] text-pure-white'>
        Popular Communities
      </h1>
      <div className='mt-4 flex flex-col gap-8'>
        {fetchingPopularCommunities ? <Loader /> : displayPopularCommunities(popularCommunities)}
      </div>
    </div>
  );
};

export default DesktopPopularCommunities;

// Helper Function
function Loader() {
  return (
    <div className='flex h-52 w-full items-center justify-center'>
      <EllipseLoader />
    </div>
  );
}

function displayPopularCommunities(
  popularCommunities: IPopularCommunitiesProps['popularCommunities'],
) {
  if (popularCommunities?.length > 0) {
    return popularCommunities.map((title: ICommunityObject) => (
      <DesktopPopularCommunity
        key={title.communityId}
        communityId={title.communityId}
        name={title.name}
        members={title.members}
        communityImage={title.communityImage}
        isPublic={title.isPublic}
        description={title.description}
        userId={title.userId}
        joinRequests={title.joinRequests}
      />
    ));
  } else {
    return (
      <div className='flex h-52 w-full items-center justify-center text-high-emphasis'>
        Something went wrong...
      </div>
    );
  }
}
