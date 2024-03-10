import React from 'react';

// Components
import Community from './Community';
import EllipseLoader from '../shared/EllipseLoader';

// Util
import { ICommunityObject } from '@/pages/community/[communityId]';

interface IPopularCommunitiesProps {
  popularCommunities: ICommunityObject[];
  fetchingPopularCommunities: boolean;
}

const MobilePopularCommunities = ({
  popularCommunities,
  fetchingPopularCommunities,
}: IPopularCommunitiesProps) => {
  return (
    <div className='md:hidden'>
      <h1 className='mb-2 text-xl font-normal tracking-[0.1px] text-pure-white'>
        Popular Communities
      </h1>
      <div className='flex h-fit gap-4 rounded-lg bg-first-surface p-4'>
        {fetchingPopularCommunities ? <Loader /> : displayPopularCommunities(popularCommunities)}
      </div>
    </div>
  );
};

export default MobilePopularCommunities;

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
      <Community
        key={title.communityId}
        communityId={title.communityId}
        name={title.name}
        communityImage={title.communityImage}
        isPublic={title.isPublic}
        members={title.members}
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
