import React, { useState } from 'react';

import Spinner from '../../shared/Spinner';

import SearchIcon from '../../layout/SearchIcon';
import { ScrollArea } from '../../ui/scroll-area';

interface ITagSearchInput {
  fetching: boolean;
  addTagHandler: (query: string) => void;
}

export default function TagSearchInput({ fetching = false, addTagHandler }: ITagSearchInput) {
  const [tagQuery, setTagQuery] = useState<string>('');
  const [inputFocus, setInputFocus] = useState(false);

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.currentTarget.value.trimStart();
    setTagQuery(query as string);
  }

  function onSubmitTag(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addTagHandler(tagQuery);
    setTagQuery('');
  }

  return (
    // Container
    <form onSubmit={onSubmitTag} className='relative mx-auto mb-4 w-fit'>
      {/* Trigger */}
      <div className='relative mx-auto mt-2 flex h-14 w-[343px] items-center justify-start gap-[10px] rounded-lg bg-first-surface px-6 py-[6px] transition-colors duration-700 focus-within:bg-pure-white md:w-[352px]'>
        {fetching ? <Spinner /> : <SearchIcon />}
        <input
          className='w-full border-none bg-transparent py-[11px] tracking-eight text-pure-white outline-none focus:text-secondary'
          type='text'
          placeholder='Search'
          // onChange={searchInputChangeHandler}
          onChange={onChangeHandler}
          value={tagQuery}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          maxLength={24}
        />
      </div>

      {/* Trigger Content */}
      <div
        className={`collapsible-dropdown absolute top-12 z-20 w-full max-w-md rounded-b-md ${
          inputFocus ? 'dropdown-active' : ''
        }`}
      >
        <div
          className={`dropdown-content flex flex-col gap-4 rounded-md rounded-t-none border-none bg-secondary transition-colors duration-700 ${
            inputFocus ? 'bg-white' : ''
          } outline-none`}
        >
          {/* Only Children allow to have padding else hidden content will become visible */}
          {tagQuery.length < 1 ? (
            <div className='px-6 py-[13px]'>No Results...</div>
          ) : (
            <ScrollArea className='h-fit min-h-[48px]'>
              {/* Create new Tag */}
              {tagQuery ? (
                <button
                  type='submit'
                  className='flex w-full cursor-pointer items-center justify-between px-6 py-[13px] transition-colors duration-300 hover:bg-neutral-400'
                >
                  <span className='tracking-eight'>{tagQuery}</span>{' '}
                  <span className='tracking-eight text-gray'>create tag</span>
                </button>
              ) : null}
              {/* TODO: Queried tags */}
              {/* Some Code */}
            </ScrollArea>
          )}
        </div>
      </div>
    </form>
  );
}
