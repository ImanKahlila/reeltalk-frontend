import React from 'react';

// Componentts
import CommunityPage from '@/components/community/CommunityPage';

// Util/Hooks
import {
  useRetrieveJoinedCommunites,
  useRetrievePopularCommunities,
} from '@/components/community/CommunityPage.Hooks';

const tags = [
  'pixar',
  'marvel',
  'guardiansofgalaxy',
  'bestofbest',
  'BritishTv',
  'action',
  'BritishComedy',
  'Drama',
  'SurprisingEnd',
];

const CommunityHomePage = () => {
  const { joinedCommunities, fetchingJoinedCommunities } = useRetrieveJoinedCommunites();
  const { popularCommunities, fetchingPopularCommunities } = useRetrievePopularCommunities();

  return (
    <section className='mx-auto flex max-w-[1120px] flex-col gap-4 p-4 md:flex-row-reverse md:justify-between'>
      <CommunityPage
        joinedCommunities={joinedCommunities}
        fetchingJoinedCommunities={fetchingJoinedCommunities}
        popularCommunities={popularCommunities}
        fetchingPopularCommunities={fetchingPopularCommunities}
        tags={tags}
      />
    </section>
  );
};

export default CommunityHomePage;
