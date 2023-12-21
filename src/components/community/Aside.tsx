import React from 'react';
import Link from 'next/link';

// Components
import SearchIcon from '@/components/layout/SearchIcon';

const Aside = ({ tags }: { tags: string[] }) => {
  return (
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
  );
};

export default Aside;
