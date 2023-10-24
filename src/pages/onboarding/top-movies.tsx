import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Components
import SearchIcon from '@/components/layout/SearchIcon';
import ChevronIcon from '@/components/layout/ChevronIcon';
import Buttons from '@/components/onboarding/Buttons';
import Media from '@/components/onboarding/Media';
import SearchOption from '@/components/onboarding/SearchOption';
import MediaSelection from '@/components/onboarding/MediaSelection';

// ShadCN/UI
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { ScrollArea } from '@/components/ui/scroll-area';

// Util
import suggestedMovies from '@/lib/suggestedMovies';

//
//
//
//
const TopMovies = () => {
    const [movies, setMovies] = useState(suggestedMovies);
    const [moviesToShow, setMoviesToShow] = useState(8);

    // Arr to hold selected values
    const [floaterSelection, setFloaterSelection] = useState<
        { id: number; title: string; poster: string }[]
    >([]);

    // Placeholder tracker
    const selectionPlaceholder = [];
    for (let i = 0; i < 5 - floaterSelection.length; i++) {
        selectionPlaceholder.push({ id: i, title: '', poster: '' });
    }

    // FN to add a selection
    function addSelectionHandler(
        id: number,
        title: string,
        poster: string,
        newVal: boolean,
    ) {
        setMovies(prev => {
            let newState = [...prev];
            let index = newState.findIndex(el => el.id === id);
            newState[index].selected = newVal;
            return newState;
        });
        const selected = { id, title, poster };
        setFloaterSelection(prev => {
            let newState = [...prev];
            newState.push(selected);
            return newState;
        });
    }

    // FN to remove a selection
    function removeSelectionHandler(id: number, newVal: boolean) {
        setMovies(prev => {
            let newState = [...prev];
            let index = newState.findIndex(el => el.id === id);
            newState[index].selected = newVal;
            return newState;
        });
        setFloaterSelection(prev => {
            let newState = [...prev];
            let output = newState.filter(el => el.id !== id);
            return output;
        });
    }

    return (
        <>
            <section
                className={`relative mx-auto px-4 pt-12 md:max-w-[696px] md:px-0 ${
                    moviesToShow !== 8 ? 'md:pb-48' : 'md:pb-32'
                }`}
            >
                {/* Progress Image Container */}
                <picture className='relative mx-auto block h-5 w-[258px] md:w-[437.75px]'>
                    <source
                        media='(max-width: 767px)'
                        srcSet='/Onboarding/mobile-progress-4.png'
                    />
                    <Image
                        src={'/Onboarding/desktop-progress-4.png'}
                        fill
                        alt='progress'
                    ></Image>
                </picture>

                {/* Header */}
                {/* TODO: implement */}
                <Header inputChangeHandler={() => {}} />

                {/* Suggested Movies */}
                <div className='mx-auto mt-14 max-w-[343px] md:max-w-none '>
                    <h2 className='text-xl font-medium leading-normal tracking-[0.1px] text-high-emphasis'>
                        Movies you might like
                    </h2>

                    <div className='mt-4 grid w-full grid-cols-3-auto justify-items-center gap-x-[27.5px] gap-y-4 md:grid-cols-6 md:gap-6'>
                        {movies.slice(0, moviesToShow).map(movie => (
                            <Media
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                year={movie.releaseYear}
                                posterUrl={movie.poster}
                                addSelectionHandler={addSelectionHandler}
                                selected={movie.selected}
                                selectedLength={floaterSelection.length}
                                removeSelectionHandler={removeSelectionHandler}
                            />
                        ))}
                    </div>
                </div>
                <ShowMoreButton
                    onShowMoreHandler={() => setMoviesToShow(16)}
                    moviesToShow={moviesToShow}
                />

                <Buttons
                    className='md:hidden'
                    prevPage='onboarding/top-genres'
                />
            </section>

            {/* Selections */}
            <div className='glass mt-6 h-fit w-screen justify-center bg-[#333333] p-4 pb-[22px] md:fixed md:bottom-0 md:flex md:gap-12 md:border-t-[1px] md:border-first-surface md:bg-primary-rgba md:p-6'>
                <div className='flex flex-col gap-6'>
                    <h2 className='md:trackin-[0.1px] text-center font-semibold tracking-[0.08px] text-high-emphasis md:text-start md:text-xl md:font-medium'>
                        Your top 5 selections
                    </h2>
                    <div className='mx-auto mt-2 flex justify-between gap-3'>
                        {floaterSelection.map(movie => (
                            <MediaSelection
                                key={movie.id}
                                id={movie.id}
                                poster={movie.poster}
                                removeSelectionHandler={removeSelectionHandler}
                            />
                        ))}
                        {selectionPlaceholder.map(movie => (
                            <MediaSelection key={movie.id} poster={''} />
                        ))}
                    </div>
                </div>

                <div className='hidden w-[236px] flex-col gap-4 md:flex md:justify-end'>
                    <Link
                        href={'/onboarding/top-genres'}
                        className='w-full rounded-lg border-2 border-high-emphasis p-[10px] text-center font-semibold tracking-[0.08px] text-high-emphasis'
                    >
                        Back
                    </Link>
                    <Link
                        href={'/onboarding/top-shows'}
                        className='w-full rounded-lg border-2 border-high-emphasis p-[10px] text-center font-semibold tracking-[0.08px] text-high-emphasis'
                    >
                        Skip
                    </Link>
                </div>
            </div>
        </>
    );
};

export default TopMovies;

//
//
//
//
interface HeaderProps {
    inputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header = ({ inputChangeHandler }: HeaderProps) => {
    // Controls open state of popover
    const [inputFocus, setInputFocus] = useState(false);

    return (
        <header className='mx-auto mt-14 max-w-[600px] text-center'>
            <h1 className='text-[28px] font-medium tracking-[-0.42px] text-high-emphasis'>
                Select your top 5 movies
            </h1>
            <p className='mt-2 text-base tracking-[0.08px] text-high-emphasis'>
                Selecting your top 5 movies will enable us to suggest
                like-minded users and nearby communities for exciting watch
                parties and movie premiere gatherings.
            </p>

            <Popover open={inputFocus}>
                <PopoverTrigger className='w-full'>
                    <div className='mx-auto mt-6 flex h-14 max-w-[344px] items-center justify-start gap-[10px] rounded-lg bg-first-surface px-6 py-[6px] focus-within:bg-high-emphasis md:mt-8 md:max-w-[544px]'>
                        <SearchIcon />
                        <input
                            className='w-full border-none bg-transparent py-[11px] text-pure-white outline-none focus:text-secondary'
                            type='text'
                            placeholder='Search'
                            onChange={inputChangeHandler}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className='relative bottom-3 w-[344px] rounded-t-none p-0 md:w-[544px]'
                    onOpenAutoFocus={(event: Event) => event.preventDefault()}
                >
                    <ScrollArea className='h-[288px]'>
                        {/* Popover Options */}
                        {suggestedMovies.map(movie => (
                            <SearchOption
                                key={movie.id}
                                title={movie.title}
                                posterUrl={movie.poster}
                                year={movie.releaseYear}
                            />
                        ))}
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </header>
    );
};

//
//
//
//
interface ShowMoreButtonProps {
    onShowMoreHandler: () => void;
    moviesToShow: number;
}

const ShowMoreButton = ({
    onShowMoreHandler,
    moviesToShow,
}: ShowMoreButtonProps) => {
    return (
        <>
            {moviesToShow === 8 ? (
                <div className='mb-[64px] flex justify-center'>
                    <button
                        className='mt-6 flex items-center font-semibold text-medium-emphasis'
                        onClick={onShowMoreHandler}
                    >
                        show more
                        <ChevronIcon className='ml-1 h-4 w-4' />
                    </button>
                </div>
            ) : null}
        </>
    );
};
