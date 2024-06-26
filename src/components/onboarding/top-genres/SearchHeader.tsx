import React from 'react';
import SearchIcon from '@/components/layout/SearchIcon';

interface ISearchHeaderProps {
  inputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchHeader = ({ inputChangeHandler }: ISearchHeaderProps) => {
  return (
    <header className='mt-14 text-center'>
      <h1 className='text-[28px] font-medium tracking-[-0.42px] text-high-emphasis'>
        Select your top 5 genres for movies and TV
      </h1>

      <div className='mx-auto mt-6 flex h-14 max-w-[344px] items-center justify-start gap-[10px] rounded-lg bg-first-surface px-6 py-[6px] focus-within:outline focus-within:outline-2 focus-within:outline-pure-white md:mt-8 md:max-w-[544px]'>
        <SearchIcon />
        <input
          className='w-full border-none bg-transparent py-[11px] text-pure-white outline-none'
          type='text'
          placeholder='Search'
          onChange={inputChangeHandler}
        />
      </div>
    </header>
  );
};

export default SearchHeader;
