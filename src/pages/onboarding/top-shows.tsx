import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

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

// Firebase
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import app from '@/firebase/firebase-config';

const db = getFirestore(app);

// Util
import suggestedShows from '@/lib/suggestedShows';
import { useAuthRequired } from '@/hooks/routeProtection';
import { useUserContext } from '@/lib/context';
import axios from 'axios';
import { debounce } from 'lodash';
import toast from 'react-hot-toast';

//
//
//
//
const TopShows = () => {
    const router = useRouter();
    useAuthRequired();
    const [movies, setMovies] = useState(suggestedShows);
    const [moviesToShow, setMoviesToShow] = useState(8);

    // Arr to hold selected media
    const [floaterSelection, setFloaterSelection] = useState<
        { id: number | string; title: string; poster: string; isApi: boolean }[]
    >([]);

    // Placeholder tracker, tracks how many placeholders needed for selectionFloater
    const selectionPlaceholder = [];
    for (let i = 0; i < 5 - floaterSelection.length; i++) {
        selectionPlaceholder.push({ id: i, title: '', poster: '' });
    }

    // Function to add a media selection
    function addSelectionHandler(
        id: number | string,
        title: string,
        poster: string, // poster Url
        newVal: boolean, // boolean for suggestedMovies indicating if selected
        isApi: boolean, // boolean flag indicating if movie selection is from API
    ) {
        if (!isApi) {
            // Updates the Suggested Movies
            setMovies(prev => {
                let newState = [...prev];
                let index = newState.findIndex(el => el.id === id);
                newState[index].selected = newVal;
                return newState;
            });
        }
        const selected = { id, title, poster, isApi };
        setFloaterSelection(prev => {
            let newState = [...prev];
            let movieIndex = newState.findIndex(el => el.id === id);
            if (movieIndex > -1) return newState; // If movie already selected return prev state
            newState.push(selected);
            return newState;
        });
    }

    // Function to remove a media selection
    function removeSelectionHandler(
        id: number | string,
        newVal: boolean,
        isApi: boolean, // boolean flag indicating if movie selection is from API
    ) {
        if (!isApi) {
            setMovies(prev => {
                let newState = [...prev];
                let index = newState.findIndex(el => el.id === id);
                newState[index].selected = newVal;
                return newState;
            });
        }
        setFloaterSelection(prev => {
            let newState = [...prev];
            let output = newState.filter(element => element.id !== id);
            return output;
        });
    }

    // Submit Selections to DB
    function onPageSubmitHandler() {
        if (user) {
            const docRef = doc(db, 'users', user!.uid);

            setDoc(
                docRef,
                {
                    top5Shows: floaterSelection,
                },
                { merge: true },
            )
                .then(() => {
                    router.push('/dashboard');
                })
                .catch(error => console.log(error));
        }
    }

    // Display's nothing if user is not authenticated
    const { user } = useUserContext();
    if (!user) return;
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
                        srcSet='/Onboarding/mobile-progress-5.png'
                    />
                    <Image
                        src={'/Onboarding/desktop-progress-5.png'}
                        fill
                        alt='progress'
                    ></Image>
                </picture>

                {/* Header */}
                <Header
                    addSelectionHandler={addSelectionHandler}
                    selectedLength={floaterSelection.length}
                />

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
                    prevPage='onboarding/top-movies'
                    onPageSubmit={onPageSubmitHandler}
                    valid={floaterSelection.length === 5}
                />
            </section>

            {/* FLOATING SELECTION */}
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
                                isApi={movie.isApi}
                            />
                        ))}
                        {selectionPlaceholder.map(movie => (
                            <MediaSelection
                                key={movie.id}
                                poster={''}
                                isApi={false}
                            />
                        ))}
                    </div>
                </div>

                <div className='hidden w-[236px] flex-col gap-4 md:flex md:justify-end'>
                    <Link
                        href={'/onboarding/top-movies'}
                        className='w-full rounded-lg border-2 border-high-emphasis p-[10px] text-center font-semibold tracking-[0.08px] text-high-emphasis'
                    >
                        Back
                    </Link>
                    {floaterSelection.length === 5 ? (
                        <button
                            onClick={onPageSubmitHandler}
                            className='w-full rounded-lg border-2 border-primary bg-primary p-[10px] text-center font-semibold tracking-[0.08px] text-black'
                        >
                            Next
                        </button>
                    ) : (
                        <Link
                            href={'/onboarding/top-shows'}
                            className='w-full rounded-lg border-2 border-high-emphasis p-[10px] text-center font-semibold tracking-[0.08px] text-high-emphasis'
                        >
                            Skip
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default TopShows;

//
//
//
//
interface HeaderProps {
    addSelectionHandler: (
        id: number | string,
        title: string,
        poster: string,
        newVal: boolean,
        isApi: boolean,
    ) => void;
    selectedLength: number;
}

const Header = ({ addSelectionHandler, selectedLength }: HeaderProps) => {
    // Controls open state of popover
    const [inputFocus, setInputFocus] = useState(false);

    //
    //
    // Input Api Movie Search logic
    const [queryMovies, setQueryMovies] = useState<any[]>([]);
    const [fetching, setFetching] = useState(false);

    const searchInputChangeHandler = debounce(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const queryParam = e.target.value.trim();
            if (!queryParam) {
                setQueryMovies([]);
                return;
            }

            // Create an array to store the promises for the two Axios requests
            const promises = [
                axios.post('http://localhost:8080/movies/search', {
                    input: queryParam,
                    titleType: 'tvSeries',
                    info: 'base_info',
                }),
                axios.post('http://localhost:8080/movies/search', {
                    input: queryParam,
                    titleType: 'tvSeries',
                    info: 'creators_directors_writers',
                }),
            ];

            setFetching(true);

            Promise.all(promises)
                .then(([moviesResponse, creditsResponse]) => {
                    const moviesData = moviesResponse.data;
                    const creditsData = creditsResponse.data;

                    // Create a new array to store the mapped values
                    const mappedArray = [];

                    if (moviesData.length === creditsData.length) {
                        for (let i = 0; i < moviesData.length; i++) {
                            const movieValue = moviesData[i];
                            const directorName =
                                creditsData[i].creators[0]?.credits[0]?.name
                                    .nameText.text;

                            const mappedValue = { ...movieValue, directorName };

                            mappedArray.push(mappedValue);
                        }

                        // Filter and sort the mappedArray
                        const filteredAndSortedArray = mappedArray
                            .filter(
                                (media: any) =>
                                    media.primaryImage !== null &&
                                    media.ratingsSummary.voteCount > 300,
                            )
                            .sort(
                                (a: any, b: any) =>
                                    b.ratingsSummary.voteCount -
                                    a.ratingsSummary.voteCount,
                            );
                        setQueryMovies(filteredAndSortedArray);
                    }
                })
                .catch(error => toast.error(error.message))
                .finally(() => setFetching(false));
        },
        500,
    );

    return (
        <header className='mx-auto mt-14 max-w-[600px] text-center'>
            <h1 className='text-[28px] font-medium tracking-[-0.42px] text-high-emphasis'>
                Select your top 5 TV shows
            </h1>
            <p className='mt-2 text-base tracking-[0.08px] text-high-emphasis'>
                Selecting your top 5 TV-shows will enable us to suggest
                like-minded users and nearby communities for exciting watch
                parties and movie premiere gatherings.
            </p>

            <Popover open={inputFocus}>
                <PopoverTrigger className='w-full'>
                    <div className='mx-auto mt-6 flex h-14 max-w-[344px] items-center justify-start gap-[10px] rounded-lg bg-first-surface px-6 py-[6px] focus-within:bg-high-emphasis md:mt-8 md:max-w-[544px]'>
                        {fetching ? <Spinner /> : <SearchIcon />}
                        <input
                            className='w-full border-none bg-transparent py-[11px] text-pure-white outline-none focus:text-secondary'
                            type='text'
                            placeholder='Search'
                            onChange={searchInputChangeHandler}
                            onFocus={() => setInputFocus(true)}
                            onBlur={() => setInputFocus(false)}
                        />
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className='relative bottom-3 w-[344px] rounded-t-none p-0 md:w-[544px]'
                    onOpenAutoFocus={(event: Event) => event.preventDefault()}
                >
                    {queryMovies.length === 0 ? (
                        <div className='p-4'>No results...</div>
                    ) : (
                        <ScrollArea className='h-[288px]'>
                            {/* Popover Options */}
                            {queryMovies.map(movie => (
                                <SearchOption
                                    key={movie.id}
                                    id={movie.id}
                                    title={movie.originalTitleText.text}
                                    posterUrl={movie.primaryImage?.url}
                                    year={movie.releaseYear?.year}
                                    director={movie.directorName}
                                    addSelectionHandler={addSelectionHandler}
                                    selectedLength={selectedLength}
                                />
                            ))}
                        </ScrollArea>
                    )}
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

const Spinner = () => {
    return (
        <div className='spinner_container' aria-label='Loading...'>
            <i className='spinner_item spinner_item--warning'></i>
            <i className='spinner_item spinner_item--warning'></i>
        </div>
    );
};
