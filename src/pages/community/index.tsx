import React from 'react';
import UserIcon from '@/components/Icons/userIcon';
import Link from 'next/link';
import Image from 'next/image';
import SearchIcon from '@/components/layout/SearchIcon';
import LikeIcon from '@/components/Icons/likeIcon';
import MessageBubbleIcon from '@/components/Icons/messageBubbleIcon';

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

const DUMMY_JOINED_COMM = [
  {
    id: 'j1',
    title: 'Spider Guys',
    imageUrl:
      'https://storage.googleapis.com/reeltalk-app.appspot.com/communityImages/H6sHupzEoyLWEgRfeox3/wp8328251.jpg_1701133522093?GoogleAccessId=firebase-adminsdk-147wm%40reeltalk-app.iam.gserviceaccount.com&Expires=16447046400&Signature=bBLq6abGnIBIkwOilcZlDzepsAKi2zwsoQEGESi6FFCZ15tUdP89SBRZVZyrYaKAABks0fm80el93iZRXLkWkhXcA%2B%2F79YMVVv0f24cPAWa2yAVbQ13uC%2FAIdKOUHsp4IV09O3Qc9eFU0SYoBv%2B7OdKgz9uIL3LR4qAPDMbMKuwAJaF4rljCNnAycXCQ5SdI7hfJM0Qjw2dlD%2Bvj%2Bwe1ikZX%2FFEKVqtJS6JAysOKA0VYSGJ9vVa3IsVn3GhgXo4oISQ2lbPRu7idlGKJs5RZ1Ho9aF3SAum%2BkoYzwiVSuBcQcn8w7ADEzLSJnmbTx0LdNG01Q%2FCkPpajjckRtlcBIA%3D%3D',
    isPublic: true,
    members: 300,
    url: '/community/geACoPYrDWq1g4RcMAN4',
  },
  {
    id: 'j2',
    title: 'Studio Ghibli',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/reeltalk-app.appspot.com/o/communityImage%2F14j9jP03strFhDmDmScz%2FHERON_IMAX_Poster_Digital.jpg_1702265471547?alt=media',
    isPublic: false,
    members: 300,
    url: '/community/14j9jP03strFhDmDmScz',
  },
];

const DUMMY_POP_COM = [
  {
    id: 'p1',
    title: 'Disney Animations',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg',
    isPublic: true,
    members: 300,
    description:
      'Disney Animations is a community for fans of classic Walt Disney animated films. ',
  },
  {
    id: 'p2',
    title: 'Potterheads',
    imageUrl:
      'https://m.media-amazon.com/images/M/MV5BOTA3MmRmZDgtOWU1Ny00ZDc5LWFkN2YtNzNlY2UxZmY0N2IyXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg',
    isPublic: true,
    members: 300,
    description: 'Potterhead is a community for fans of Harry Potter film series. ',
  },
];

const CommunityPage = () => {
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

      {/* Communities */}
      <div className='mx-auto flex w-full max-w-[352px] flex-col gap-4 md:max-w-none'>
        <div>
          <h1 className='mb-2 text-xl font-normal tracking-[0.1px] text-pure-white'>
            Joined Communities
          </h1>
          <div className='flex h-fit gap-4 rounded-lg bg-first-surface p-4'>
            {DUMMY_JOINED_COMM.map(title => (
              <Communities
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

        {/* Mobile Pop */}
        <div className='md:hidden'>
          <h1 className='mb-2 text-xl font-normal tracking-[0.1px] text-pure-white'>
            Popular Communities
          </h1>
          <div className='flex h-fit gap-4 rounded-lg bg-first-surface p-4'>
            {DUMMY_POP_COM.map(dummy => (
              <Communities
                key={dummy.id}
                title={dummy.title}
                imageUrl={dummy.imageUrl}
                isPublic={dummy.isPublic}
                members={dummy.members}
                url={'/communities/H6sHupzEoyLWEgRfeox3'}
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
              <DesktopPopularCommunities
                key={title.id}
                title={title.title}
                members={title.members}
                imageUrl={title.imageUrl}
                isPublic={title.isPublic}
                description={title.description}
                url={'/communities/H6sHupzEoyLWEgRfeox3'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityPage;

interface CommunitiesProps {
  title: string;
  isPublic: boolean;
  imageUrl: string;
  members: number;
  description?: string;
  url: string;
}

function Communities({ title, isPublic, imageUrl, members, url }: CommunitiesProps) {
  console.log(url);
  return (
    <Link href={url} className='w-[102.188px]'>
      <picture className='relative block h-[153.787px] overflow-hidden rounded-md'>
        <Image className='object-cover' src={imageUrl} fill alt=''></Image>
      </picture>
      <h2 className='mt-2 text-sm tracking-eight text-high-emphasis'>{truncateString(title)}</h2>
      <div className='mt-[10px] text-xs tracking-[0.06px] text-medium-emphasis'>
        <span>{isPublic ? 'Public' : 'Private'}</span>
        <span className='px-2'>
          ·
        </span> <UserIcon className='relative bottom-[1px] inline-block' />{' '}
        <span className='pl-1'>{members.toString()}</span>
      </div>
    </Link>
  );
}

function DesktopPopularCommunities({
  title,
  isPublic,
  imageUrl,
  members,
  description,
}: CommunitiesProps) {
  return (
    <div className='flex h-fit gap-8 bg-first-surface p-2'>
      {/* Community Poster */}
      <div className='flex min-w-[102.188px] flex-col gap-3'>
        <picture className='relative block h-[153.787px] overflow-hidden rounded-md'>
          <Image src={imageUrl} fill alt=''></Image>
        </picture>
        <button className='flex h-[34px] w-full items-center justify-center rounded bg-primary px-4 font-semibold tracking-[0.24px] text-secondary'>
          Join
        </button>
      </div>

      {/* Community Info */}
      <div className='w-full'>
        <h2 className='font-medium tracking-[0.24px] text-high-emphasis'>{title}</h2>
        <div className='mt-1 text-xs tracking-[0.06px] text-medium-emphasis'>
          <span>{isPublic ? 'Public' : 'Private'}</span>
          <span className='px-2'>·</span>{' '}
          <UserIcon className='relative bottom-[1px] inline-block' />{' '}
          <span className='pl-1'>{members.toString()}</span>
        </div>

        <p className='tracking-eight text-high-emphasis'>{description}</p>

        <div className='mt-4 flex flex-col gap-2 rounded-lg bg-second-surface p-2 text-high-emphasis'>
          <div className='flex gap-4'>
            <picture className='relative block  h-[35px] min-w-[35px]'>
              <Image src={'/memoji.png'} fill alt=''></Image>
            </picture>
            <div>
              <h3 className='text-high-emphasis'>
                Jennifer L. <span className='pl-2 text-sm text-medium-emphasis'>2h ago</span>
              </h3>
              <p>In your opinion, what are the top 5 scenes of Frozen?</p>
            </div>
          </div>
          <div className='flex gap-[10px] text-xs tracking-[0.24px] text-medium-emphasis'>
            <div className='flex items-center gap-[10px]'>
              <LikeIcon className='inline-block' />
              <span>30 likes</span>{' '}
            </div>
            <div className='flex items-center gap-[5px]'>
              <MessageBubbleIcon className='inline-block' /> <span>52 replies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Function
function truncateString(str: string) {
  if (str.length > 12) {
    return str.substring(0, 12) + '...';
  } else {
    return str;
  }
}
