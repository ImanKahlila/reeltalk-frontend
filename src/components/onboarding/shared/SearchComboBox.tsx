import React, { useEffect, useState } from 'react';
import Spinner from '@/components/shared/Spinner';
import SearchIcon from '@/components/layout/SearchIcon';
import { ScrollArea } from '@/components/ui/scroll-area';
import SearchOption from '@/components/onboarding/shared/SearchOption';
import useMediaSearch from '@/hooks/useMediaSearch';
import { FloaterSelection } from '@/hooks/useMediaSelection';
import { MediaTypes } from '@/components/commonInterfaces';

interface HeaderProps {
  addSelectionHandler?: (
    id: string,
    title: string,
    poster: string,
    isApi: boolean,
    newVal?: boolean
  ) => void;
  selectedLength?: number;
  removeSelectionHandler?: (id: string, newVal: boolean, isApi: boolean) => void;
  floaterSelection?: FloaterSelection;
  titleType: MediaTypes | null; // Passing null will return movies and tvSeries
}

const SearchComboBox = ({
                          addSelectionHandler,
                          selectedLength,
                          titleType,
                          floaterSelection,
                          removeSelectionHandler,
                        }: HeaderProps) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [queryParam, setQueryParam] = useState('');

  // Custom hook for searching Media from API
  const { queryMedia, searchMedia, fetching } = useMediaSearch(titleType);

  useEffect(() => {
    // Fetch popular media data when component mounts or when search is cleared
    if (!queryParam) searchMedia('');
  }, [queryParam]);

  const searchInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setQueryParam(value);
    searchMedia(value);
  };

  // Input field layout based on titleType
  const renderSearchInput = () =>
    isHomeSearch ? (
      <div
      className="hidden h-[34px] w-[351px] items-center gap-[10px] rounded-lg bg-[#00000014] p-[6px] pl-6 lg:flex">
        <button
          type="submit"
          className="flex h-full cursor-pointer items-center border-none bg-transparent outline-none"
          aria-label="Search"
        >
          {fetching ? <Spinner /> : <SearchIcon />}
        </button>
        <input
          className="w-full border-none bg-transparent text-base text-secondary"
          type="text"
          placeholder="Search lists by genre, or mood... "
          value={queryParam}
          onChange={searchInputChangeHandler}
          onFocus={() => setInputFocus(true)}
          onBlur={() => {
            setTimeout(() => {
              setInputFocus(false);
            }, 100);
          }}
        />
    </div> ) : (
      <div
        className="relative mx-auto mt-6 flex h-14 w-full min-w-[344px] items-center justify-start gap-[10px] rounded-lg bg-first-surface px-6 py-[6px] transition-colors duration-700 focus-within:bg-pure-white md:min-w-[544px]">
        {fetching ? <Spinner /> : <SearchIcon />}
        <input
          className="w-full border-none bg-transparent py-[11px] tracking-eight text-pure-white outline-none focus:text-secondary"
          type="text"
          placeholder="Search"
          value={queryParam}
          onChange={searchInputChangeHandler}
          onFocus={() => setInputFocus(true)}
          onBlur={() => {
            setTimeout(() => {
              setInputFocus(false);
            }, 100); // Delay to prevent selections bug
          }}
        />
      </div>
    )
  ;
  const isHomeSearch = titleType === null;
  // Search results or popular searches list
  const renderSearchResults = () => (
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
        {queryParam ? (
          queryMedia.length === 0 && !fetching ? (
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
                  maxSelection={isHomeSearch?1:5}
                />
              ))}
            </ScrollArea>
          )
        ) : (
          <div className="p-4">
            <p className="text-left ml-2">Popular searches: </p>
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
                  maxSelection={isHomeSearch?1:5}
                />
              ))}
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative mx-auto w-fit">
      {renderSearchInput()}
      {renderSearchResults()}
    </div>
  );
};

export default SearchComboBox;
