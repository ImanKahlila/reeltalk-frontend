import { useState } from 'react';
import { debounce } from 'lodash';
import useMediaSearch from '@/hooks/useMediaSearch';
import Spinner from '@/components/shared/Spinner';
import SearchIcon from '@/components/layout/SearchIcon';

import { ScrollArea } from '@/components/ui/scroll-area';
import SearchOption from './SearchOption';

interface HeaderProps {
  addSelectionHandler: (
    id: string,
    title: string,
    poster: string,
    isApi: boolean,
    newVal?: boolean,
  ) => void;
  selectedLength: number;
  titleType: 'movie' | 'tvSeries' | null; // passing null will return movies and tvSeries
}

const Header = ({ addSelectionHandler, selectedLength, titleType }: HeaderProps) => {
  // Controls open state of popover
  const [inputFocus, setInputFocus] = useState(false);

  // Custom hook for searching Media from API
  const { queryMedia, searchMedia, fetching } = useMediaSearch(titleType);

  const searchInputChangeHandler = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const queryParam = e.target.value.trim();
    searchMedia(queryParam);
  }, 500);

  return (
    <header className='mx-auto mt-14 max-w-[600px] text-center'>
      <h1 className='text-[28px] font-medium tracking-[-0.42px] text-high-emphasis'>
        {`Select your top 5 ${titleType === 'movie' ? 'movies' : 'shows'}`}
      </h1>
      <p className='mt-2 text-base tracking-[0.08px] text-high-emphasis'>
        {`Selecting your top 5 ${
          titleType === 'movie' ? 'movies' : 'TV-shows'
        } will enable us to suggest like-minded users and nearby
        communities for exciting watch parties and movie premiere gatherings.`}
      </p>

      {/* SEARCH COMBOBOX */}
      <div className='relative mx-auto w-fit'>
        {/* Trigger */}
        <div className='relative mx-auto mt-6 flex h-14 w-full min-w-[344px] items-center justify-start gap-[10px] rounded-lg bg-first-surface px-6 py-[6px] transition-colors duration-700 focus-within:bg-pure-white md:min-w-[544px]'>
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
          className={`collapsible-dropdown absolute top-12 z-20 w-full max-w-[344px] rounded-b-md md:max-w-[544px] ${
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
              <div className='mr-auto p-4'>No results...</div>
            ) : (
              <ScrollArea className='h-[288px]'>
                {queryMedia.map(media => (
                  <SearchOption
                    key={media.id}
                    id={media.id}
                    title={media.originalTitleText.text}
                    posterUrl={media.primaryImage?.url}
                    year={media.releaseYear?.year}
                    director={media.directorName}
                    creator={media.creatorName}
                    addSelectionHandler={addSelectionHandler}
                    selectedLength={selectedLength}
                    maxSelection={5}
                  />
                ))}
              </ScrollArea>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
