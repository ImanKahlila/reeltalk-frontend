import React from 'react';

// Components
import Community from './Community';
import EllipseLoader from '../shared/EllipseLoader';

// Util
import { ICommunityObject } from '@/pages/community/[communityId]';

interface IJoinedCommunityProps {
  joinedCommunities: ICommunityObject[];
  fetchingJoinedCommunities: boolean;
}

const JoinedCommunities = ({
  joinedCommunities,
  fetchingJoinedCommunities,
}: IJoinedCommunityProps) => {
  return (
    <div>
      <h1 className='mb-2 text-xl font-normal tracking-[0.1px] text-pure-white'>
        Joined Communities
      </h1>

      <div className='flex h-fit gap-4 rounded-lg bg-first-surface p-4'>
        {fetchingJoinedCommunities ? <Loader /> : displayJoinedCommunities(joinedCommunities)}
      </div>
    </div>
  );
};

export default JoinedCommunities;

// Helper Function
function Loader() {
  return (
    <div className='flex h-52 w-full items-center justify-center'>
      <EllipseLoader />
    </div>
  );
}

function displayJoinedCommunities(joinedCommunities: IJoinedCommunityProps['joinedCommunities']) {
  if (joinedCommunities.length > 0) {
    return joinedCommunities.map((title: ICommunityObject) => (
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
        Join a community to see it here!
      </div>
    );
  }
}
