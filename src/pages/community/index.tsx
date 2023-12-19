import React from 'react';
import Link from 'next/link';
import SearchIcon from '@/components/layout/SearchIcon';

import { useRetrieveJoinedCommunites } from '@/components/community/CommunityPage.Hooks';
import JoinedCommunities from '@/components/community/JoinedCommunities';
import DesktopPopularCommunity from '@/components/community/DesktopPopularCommunity';
import Community from '@/components/community/Community';

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

const DUMMY_POP_COM = [
  {
    id: 'p1',
    title: 'Spider Guys',
    imageUrl:
      'https://storage.googleapis.com/reeltalk-app.appspot.com/communityImages/H6sHupzEoyLWEgRfeox3/wp8328251.jpg_1701133522093?GoogleAccessId=firebase-adminsdk-147wm%40reeltalk-app.iam.gserviceaccount.com&Expires=16447046400&Signature=bBLq6abGnIBIkwOilcZlDzepsAKi2zwsoQEGESi6FFCZ15tUdP89SBRZVZyrYaKAABks0fm80el93iZRXLkWkhXcA%2B%2F79YMVVv0f24cPAWa2yAVbQ13uC%2FAIdKOUHsp4IV09O3Qc9eFU0SYoBv%2B7OdKgz9uIL3LR4qAPDMbMKuwAJaF4rljCNnAycXCQ5SdI7hfJM0Qjw2dlD%2Bvj%2Bwe1ikZX%2FFEKVqtJS6JAysOKA0VYSGJ9vVa3IsVn3GhgXo4oISQ2lbPRu7idlGKJs5RZ1Ho9aF3SAum%2BkoYzwiVSuBcQcn8w7ADEzLSJnmbTx0LdNG01Q%2FCkPpajjckRtlcBIA%3D%3D',
    isPublic: false,
    members: 300,
    description:
      'Join the ultimate Spider-Man hangout! Share your favorite Spidey moments, connect with web-heads, and celebrate the iconic hero. Swing into the excitement with us!',
    url: '/community/geACoPYrDWq1g4RcMAN4',
  },
  {
    id: 'j2',
    title: 'Studio Ghibli',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/reeltalk-app.appspot.com/o/communityImage%2F14j9jP03strFhDmDmScz%2FHERON_IMAX_Poster_Digital.jpg_1702265471547?alt=media',
    isPublic: true,
    members: 300,
    url: '/community/14j9jP03strFhDmDmScz',
    description:
      'Discover the ultimate online haven for Studio Ghibli fans! Immerse yourself in spirited discussions, fan theories, and exclusive events. Join us and let the enchantment unfold!',
  },
];

const CommunityPage = () => {
  const { joinedCommunities, fetchingJoinedCommunities } = useRetrieveJoinedCommunites();

  return (
    <section className='mx-auto flex max-w-[1120px] flex-col gap-4 p-4 md:flex-row-reverse md:justify-between'>
      {/* Search / General Info */}
      <div className='mx-auto max-w-[352px] md:m-0'>
        <form className='flex h-14 items-center justify-start gap-[10px] rounded-lg bg-first-surface px-6 py-[6px] focus-within:outline focus-within:outline-2 focus-within:outline-pure-white'>
          <SearchIcon />
          <input
            className='w-full border-none bg-transparent py-[11px] text-pure-white outline-none'
            type='text'
            placeholder='Search for a community'
          />
        </form>
        <div className='mt-4 rounded-lg bg-first-surface px-5 py-6'>
          <p className='text-high-emphasis'>
            Welcome to our community of TV and movie fanatics! This is a space for people who love
            discussing and dissecting all things television and film to connect over their shared
            passion. Join in on the latest conversations about popular shows, cult classics, box
            office hits, and everything in between.
          </p>
          <div className='mx-auto mt-4 flex max-w-[256px] flex-col gap-4'>
            <button className='flex h-12 w-full items-center justify-center rounded-lg bg-primary p-[10px] text-base font-semibold tracking-eight text-secondary'>
              Manage my communities
            </button>
            <Link
              href={'/community/create-community'}
              className='flex h-12 w-full items-center justify-center rounded-lg bg-pure-white p-[10px] text-base font-semibold tracking-eight text-secondary'
            >
              Create new community
            </Link>
          </div>
        </div>
        <div className='mt-4 rounded-lg bg-first-surface p-4 leading-8 md:py-8'>
          <h1 className='font-semibold tracking-eight text-high-emphasis'>
            Browse communities by tags
          </h1>
          {tags.map((tag, index) => (
            <Link
              key={index}
              className='inline-block pr-4 font-medium tracking-eight text-primary'
              href={'/communities'}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* COMMUNITIES */}
      <div className='mx-auto flex w-full max-w-[352px] flex-col gap-4 md:max-w-none'>
        <JoinedCommunities
          joinedCommunities={joinedCommunities}
          fetchingJoinedCommunities={fetchingJoinedCommunities}
        />

        {/* MOBILE POPULAR COMMUNITIES */}
        <div className='md:hidden'>
          <h1 className='mb-2 text-xl font-normal tracking-[0.1px] text-pure-white'>
            Popular Communities
          </h1>
          <div className='flex h-fit gap-4 rounded-lg bg-first-surface p-4'>
            {DUMMY_POP_COM.map(title => (
              <Community
                key={title.id}
                title={title.title}
                imageUrl={title.imageUrl}
                isPublic={title.isPublic}
                members={title.members}
                url={title.url}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP POPULAR COMMUNITIES */}
        <div className='mt-4 hidden md:block'>
          <h1 className='mb-2 text-xl font-normal tracking-[0.1px] text-pure-white'>
            Popular Communities
          </h1>
          <div className='mt-4 flex flex-col gap-8'>
            {DUMMY_POP_COM.map(title => (
              <DesktopPopularCommunity
                key={title.id}
                title={title.title}
                members={title.members}
                imageUrl={title.imageUrl}
                isPublic={title.isPublic}
                description={title.description}
                url={title.url}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityPage;
