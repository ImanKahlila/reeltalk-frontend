import React from 'react';

// Components
import Community from './Community';

// Util
import { ICommunityObject } from '@/pages/community/[communityId]';

const MobilePopularCommunities = ({
  popularCommunities,
}: {
  popularCommunities: ICommunityObject[];
}) => {
  return (
    <div className='md:hidden'>
      <h1 className='mb-2 text-xl font-normal tracking-[0.1px] text-pure-white'>
        Popular Communities
      </h1>
      <div className='flex h-fit gap-4 rounded-lg bg-first-surface p-4'>
        {popularCommunities
          ? popularCommunities.map(title => (
              <Community
                key={title.communityId}
                communityId={title.communityId}
                name={title.name}
                members={title.members}
                communityImage={title.communityImage}
                isPublic={title.isPublic}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default MobilePopularCommunities;
