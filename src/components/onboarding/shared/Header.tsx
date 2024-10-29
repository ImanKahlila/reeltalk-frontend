import { useState, useEffect } from 'react';
import useMediaSearch from '@/hooks/useMediaSearch';
import Spinner from '@/components/shared/Spinner';
import SearchIcon from '@/components/layout/SearchIcon';

import { ScrollArea } from '@/components/ui/scroll-area';
import SearchOption from './SearchOption';
import { FloaterSelection } from '@/hooks/useMediaSelection';

interface HeaderProps {
  addSelectionHandler: (
    id: string,
    title: string,
    poster: string,
    isApi: boolean,
    newVal?: boolean,
  ) => void;
  selectedLength: number;
  removeSelectionHandler: (id: string, newVal: boolean, isApi: boolean) => void;
  floaterSelection: FloaterSelection;
  titleType: 'movie' | 'tvSeries' | null; // passing null will return movies and tvSeries
}

const Header = ({ addSelectionHandler, selectedLength, titleType, floaterSelection, removeSelectionHandler }: HeaderProps) => {
  // Controls open state of popover
  const [inputFocus, setInputFocus] = useState(false);
  const [queryParam, setQueryParam] = useState('');
  // Custom hook for searching Media from API
  const { queryMedia, searchMedia, fetching } = useMediaSearch(titleType);

  useEffect(() => {
    // Initialize or fetch popular media data when component mounts
    if (!queryParam) {
      searchMedia('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setQueryParam(value);
    searchMedia(value);
  };

  return (
    <header className='mx-auto mt-10 max-w-[600px] px-4 text-center'>
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
            value={queryParam}
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
            {queryParam ? (
              (queryMedia.length === 0 && !fetching) ? (
                <div
                  className="p-4 h-[288px] flex flex-col items-center justify-center">
                  <span
                    className="w-9 h-9 rounded-full border-4 border-gray flex items-center justify-center">
                    <SearchIcon strokeWidth={4} />
                  </span>
                  <p className="mt-2 text-center w-[210px] text-gray">
                    We couldn&apos;t find any matches for your search
                  </p>
                </div>
              ) : (
                <ScrollArea className="h-[288px]">
                  {queryMedia.map((media) => (
                    <SearchOption
                      key={media.id}
                      id={media.id}
                      title={media.originalTitleText.text}
                      posterUrl={media.primaryImage?.url}
                      year={media.releaseYear?.year}
                      director={media.directorName}
                      creator={media.creatorName}
                      addSelectionHandler={addSelectionHandler}
                      removeSelectionHandler={removeSelectionHandler}
                      floaterSelection={floaterSelection}
                      selectedLength={selectedLength}
                      maxSelection={5}
                    />
                  ))}
                </ScrollArea>
              )
            ) : <div className="p-4"><p className="text-left ml-2">Popular
              searches: </p>
              <ScrollArea className="h-[288px]">
                {queryMedia.map((media:any) => (
                  <SearchOption
                    key={media.id}
                    id={media.id}
                    title={media.originalTitleText.text}
                    posterUrl={media.primaryImage?.url}
                    year={media.releaseYear?.year}
                    director={media.directorName}
                    creator={media.creatorName}
                    addSelectionHandler={addSelectionHandler}
                    removeSelectionHandler={removeSelectionHandler}
                    floaterSelection={floaterSelection}
                    selectedLength={selectedLength}
                    maxSelection={5}
                  />
                ))}
              </ScrollArea>
            </div>}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
