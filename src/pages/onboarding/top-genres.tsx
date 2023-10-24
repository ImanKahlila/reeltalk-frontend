import React, { useState } from 'react';
import Image from 'next/image';
import SearchIcon from '@/components/layout/SearchIcon';
import Genre from '@/components/onboarding/Genre';
import Buttons from '@/components/onboarding/Buttons';
import ChevronIcon from '@/components/layout/ChevronIcon';

import { useRouter } from 'next/router';
import { useUserContext } from '@/lib/context';

import debounce from 'lodash/debounce';

// Firebase
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import app from '@/firebase/firebase-config';

const db = getFirestore(app);

// Genres Data
import initialGenres from '@/lib/genresData';

const TopGenresPage = () => {
    const [genresToShow, setGenresToShow] = useState(20);
    const [genres, setGenres] =
        useState<{ name: string; selected: boolean; id: string }[]>(
            initialGenres,
        );

    // filtered genres to display when searching
    const [filteredData, setFilteredData] = useState(initialGenres);

    // Debounced Filtering function
    const inputChangeHandler = debounce(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.toLowerCase();
            const dataCopy = [...genres];
            const filteredData = dataCopy.filter(movie => {
                return movie.name.toLowerCase().includes(value);
            });
            setFilteredData(filteredData);
        },
        500,
    );

    const totalSelected = genres.reduce((accumulator, currentValue) => {
        if (currentValue.selected) {
            return accumulator + 1;
        }
        return accumulator;
    }, 0);

    // Toggles genre selected on click
    const toggleSelectedGenre = (newVal: boolean, id: string) => {
        if (totalSelected < 5 || !newVal) {
            setGenres(prevState => {
                let newState = [...prevState];
                let index = newState.findIndex(val => val.id === id);
                newState[index].selected = newVal;
                return newState;
            });
        }
    };

    const { user } = useUserContext();
    const router = useRouter();

    function pageSubmitHandler() {
        if (user) {
            const top5Genres = genres
                .filter(genre => genre.selected === true)
                .map(genre => genre.name);
            const docRef = doc(db, 'users', user!.uid);
            setDoc(
                docRef,
                {
                    topGenres: top5Genres,
                },
                { merge: true },
            )
                .then(() => {
                    router.push('/onboarding/top-movies');
                })
                .catch(error => console.log(error));
        }
    }

    return (
        <section className='mx-auto max-w-sm px-4 py-12 md:max-w-none md:px-0'>
            {/* Progress Image Container */}
            <picture className='relative mx-auto block h-5 w-[258px] md:w-[437.75px]'>
                <source
                    media='(max-width: 767px)'
                    srcSet='/Onboarding/mobile-progress-3.png'
                />
                <Image
                    src={'/Onboarding/desktop-progress-3.png'}
                    fill
                    alt='progress'
                ></Image>
            </picture>

            {/* Header */}
            <Header inputChangeHandler={inputChangeHandler} />

            {/* Select */}
            <div className='mx-auto mt-14 grid grid-cols-2 gap-x-[23px] gap-y-4 md:max-w-[896px] md:grid-cols-4 md:gap-6 md:px-2 lg:grid-cols-5'>
                {filteredData.slice(0, genresToShow).map(genre => (
                    <Genre
                        key={genre.id}
                        name={genre.name}
                        id={genre.id}
                        selected={genre.selected}
                        onSelect={toggleSelectedGenre}
                        totalSelected={totalSelected}
                    />
                ))}
            </div>

            {/* Show More / Show Less Button */}
            {filteredData.length > 20 ? (
                <ShowMoreButton
                    onShowMoreHandler={() => setGenresToShow(33)}
                    genresToShow={genresToShow}
                />
            ) : null}

            <Buttons
                prevPage='/onboarding/birthday'
                onPageSubmit={pageSubmitHandler}
                valid={totalSelected === 5}
                required
            />
        </section>
    );
};

export default TopGenresPage;

interface HeaderProps {
    inputChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header = ({ inputChangeHandler }: HeaderProps) => {
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

interface ShowMoreButtonProps {
    onShowMoreHandler: () => void;
    genresToShow: number;
}

const ShowMoreButton = ({
    onShowMoreHandler,
    genresToShow,
}: ShowMoreButtonProps) => {
    return (
        <>
            {genresToShow === 20 ? (
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
