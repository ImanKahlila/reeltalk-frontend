import React, { useState } from 'react';
import { debounce } from 'lodash';
import useMediaSearch from '@/hooks/useMediaSearch';
import Spinner from '../../shared/Spinner';
import SearchIcon from '../../layout/SearchIcon';
import { ScrollArea } from '../../ui/scroll-area';
import SearchOption from '../../onboarding/shared/SearchOption';

interface IRelatedMediaSearchInputProps {
  addSelectionHandler: (id: string | number, title: string, poster: string, isApi: boolean) => void;
  selectedLength: number;
}

function RelatedMediaSearchInput({
  addSelectionHandler,
  selectedLength,
}: IRelatedMediaSearchInputProps) {
  // Controls open state of dropdown
  const [inputFocus, setInputFocus] = useState(false);

  // Custom hook for searching Media from API
  const { queryMedia, fetching, searchMedia } = useMediaSearch(null);

  const searchInputChangeHandler = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const queryParam = e.target.value.trim();
    searchMedia(queryParam); // Passing null returns movies and tvSeries
  }, 500);

  return (
    <div className='relative mx-auto w-fit'>
      {/* Trigger */}
      <div className='relative mx-auto mt-2 flex h-14 w-[343px] items-center justify-start gap-[10px] rounded-lg bg-first-surface px-6 py-[6px] transition-colors duration-700 focus-within:bg-pure-white md:w-[352px]'>
        {fetching ? <Spinner /> : <SearchIcon />}
        <input
          className='w-full border-none bg-transparent py-[11px] tracking-eight text-pure-white outline-none focus:text-secondary'
          type='text'
          placeholder='Search'
          onChange={searchInputChangeHandler}
          onFocus={() => setInputFocus(true)}
          onBlur={() => {
            setTimeout(() => {
              setInputFocus(false);
            }, 100); //Delay here otherwise selections bug
          }}
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
          {/* Only Children allow to have padding else it will become visible */}
          {queryMedia.length === 0 ? (
            <div className='p-4'>No results...</div>
          ) : (
            <ScrollArea className='h-[444px]'>
              {/* Popover Options */}
              {queryMedia.map(media => (
                <SearchOption
                  key={media.id}
                  id={media.id}
                  title={media.originalTitleText.text}
                  posterUrl={media.primaryImage?.url}
                  year={media.releaseYear?.year}
                  director={media.directorName || ''}
                  creator={media.creatorName || ''}
                  addSelectionHandler={addSelectionHandler}
                  selectedLength={selectedLength}
                  maxSelection={4}
                />
              ))}
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}

export default RelatedMediaSearchInput;
