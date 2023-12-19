import React from 'react';
import { ICommunityObject } from '@/pages/community/[communityId]';
import Community from './Community';
import EllipseLoader from '../shared/EllipseLoader';

interface IJoinedCommunityProps {
  joinedCommunities: any;
  fetchingJoinedCommunities: boolean;
}

const JoinedCommunities = (props: IJoinedCommunityProps) => {
  const { joinedCommunities, fetchingJoinedCommunities } = props;
  return (
    <div>
      <h1 className='mb-2 text-xl font-normal tracking-[0.1px] text-pure-white'>
        Joined Communities
      </h1>
      <div className='flex h-fit gap-4 rounded-lg bg-first-surface p-4'>
        {!fetchingJoinedCommunities ? ( // not fetching
          joinedCommunities.length > 0 ? (
            joinedCommunities.map((title: ICommunityObject) => (
              <Community
                key={title.communityId}
                title={title.name}
                imageUrl={title.communityImage}
                isPublic={title.isPublic}
                members={title.members.length}
                url={`/community/${title.communityId}`}
              />
            ))
          ) : (
            <div className='flex h-52 w-full items-center justify-center text-high-emphasis'>
              Join a community to see it here!
            </div>
          )
        ) : null}
        {fetchingJoinedCommunities ? (
          <div className='flex h-52 w-full items-center justify-center'>
            <EllipseLoader />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default JoinedCommunities;
