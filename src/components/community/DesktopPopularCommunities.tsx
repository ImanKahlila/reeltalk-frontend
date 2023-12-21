import React from 'react';

// Components
import DesktopPopularCommunity from './DesktopPopularCommunity';

// Util
import { ICommunityObject } from '@/pages/community/[communityId]';

const DesktopPopularCommunities = ({
  popularCommunities,
}: {
  popularCommunities: ICommunityObject[];
}) => {
  return (
    <div className='mt-4 hidden md:block'>
      <h1 className='mb-2 text-xl font-normal tracking-[0.1px] text-pure-white'>
        Popular Communities
      </h1>
      <div className='mt-4 flex flex-col gap-8'>
        {popularCommunities
          ? popularCommunities.map(title => (
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
            ))
          : null}
      </div>
    </div>
  );
};

export default DesktopPopularCommunities;
