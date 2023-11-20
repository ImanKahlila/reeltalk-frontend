import React, { useState, useRef } from 'react';
import Image from 'next/image';

// Components
import SearchOption from '@/components/onboarding/SearchOption';
import CrossIconSVG from '@/components/Icons/crossIcon';
import SearchIcon from '@/components/layout/SearchIcon';
import PlusIcon from '@/components/Icons/plusIcon';

// ShadCN/UI
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

// util
import { debounce } from 'lodash';

// Hooks
import useMediaSearch from '@/hooks/useMediaSearch';

const CreateCommunityPage = () => {
    const tagInputRef = useRef<HTMLInputElement | null>(null);
    const [relatedTitlesSelection, setRelatedTitlesSelection] = useState<
        { id: string | number; title: string; poster: string; isApi: boolean }[]
    >([]);

    // Placeholder tracker, tracks how many placeholders needed for relatedTitlesSelections
    const selectionPlaceholder = [];
    for (let i = 0; i < 4 - relatedTitlesSelection.length; i++) {
        selectionPlaceholder.push({ id: i, title: '', poster: '' });
    }

    // Function to add media selection
    function addSelectionHandler(
        id: string | number,
        title: string,
        poster: string,
        isApi: boolean,
    ) {
        const selected = { id, title, poster, isApi };
        setRelatedTitlesSelection(prev => {
            let newState = [...prev];
            let movieIndex = newState.findIndex(el => el.id === id);
            if (movieIndex > -1) return newState;
            newState.push(selected);
            return newState;
        });
    }

    // Function to remove media selection
    function removeSelectionHandler(id: number | string) {
        setRelatedTitlesSelection(prev => {
            let newState = [...prev];
            let output = newState.filter(element => element.id !== id);
            return output;
        });
    }

    // Tags logic
    const [tags, setTags] = useState<string[]>([]);

    function addTagHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const inputValue = tagInputRef.current!.value.trim();
        setTags(prev => {
            let newState = [...prev];
            newState.push(inputValue);
            return newState;
        });
        tagInputRef.current!.value = '';
    }

    function removeTagHandler(index: number) {
        setTags(prev => {
            let newState = [...prev];
            newState.splice(index, 1);
            return newState;
        });
    }

    return (
        <section className='mx-auto max-w-[904px] p-4 md:pt-[40px] lg:px-0'>
            <header className='mx-auto mb-4 max-w-[343px] md:mx-0'>
                <h1 className='text-xl font-medium tracking-[0.1px] text-pure-white md:mb-[40px] md:text-[28px]'>
                    Create your community
                </h1>
            </header>

            <div className='mx-auto mb-12 flex max-w-[343px] flex-col gap-6 md:max-w-none md:flex-row md:gap-[20px] lg:gap-[40px]'>
                {/* COMMUNITY POSTER */}
                <div className='flex max-w-[120px] flex-col gap-4'>
                    <picture className='relative block h-[153.787px] min-w-[120px] overflow-hidden rounded-md'>
                        <Image src={'/Pixel-160.png'} fill alt=''></Image>
                    </picture>
                    <button className='flex h-[34px] w-full items-center justify-center rounded bg-primary px-4 font-semibold tracking-[0.24px] text-secondary'>
                        Edit
                    </button>
                </div>

                {/* INPUTS + RADIO PUBLIC/PRIVATE */}
                <div className='flex max-w-[352px] flex-col gap-6'>
                    <div>
                        <label
                            className='mb-1 font-medium tracking-eight text-high-emphasis'
                            htmlFor='community-name'
                        >
                            Name your community
                        </label>
                        <p className='mb-2 tracking-eight text-medium-emphasis'>
                            22 characters remaining.
                        </p>
                        <input
                            className='w-full rounded-lg border border-medium-emphasis bg-first-surface py-3 pl-6 pr-3 tracking-eight text-high-emphasis placeholder-disabled'
                            placeholder='Community Name'
                            type='text'
                            id='community-name'
                        />
                    </div>
                    <div>
                        <label
                            className='mb-1 font-medium tracking-eight text-high-emphasis'
                            htmlFor='community-name'
                        >
                            Describe the community
                        </label>
                        <textarea
                            className='mt-2 h-24 w-full resize-none rounded-lg border border-medium-emphasis bg-first-surface py-3 pl-6 pr-3 tracking-eight text-high-emphasis placeholder-disabled'
                            placeholder='What is your community about?'
                            id='community-name'
                        />
                    </div>
                    <div>
                        <label
                            className='mb-1 font-medium tracking-eight text-high-emphasis'
                            htmlFor='community-name'
                        >
                            Rules
                        </label>
                        <textarea
                            className='mt-2 h-24 w-full resize-none rounded-lg border border-medium-emphasis bg-first-surface pb-[14px] pl-6 pr-3 pt-[18px] tracking-eight text-high-emphasis placeholder-disabled placeholder:text-xs'
                            placeholder={`1. Only true fans should join this group\n2. No disrespectful or hateful comments EVER\n3. If your post has a spoiler with no warning, you may be banned`}
                            id='community-name'
                        />
                    </div>
                    <div>
                        <h2 className='mb-1 font-medium tracking-eight text-high-emphasis'>
                            Community type
                        </h2>
                        <div>
                            <label
                                className='flex cursor-pointer items-center gap-2 font-medium tracking-eight text-high-emphasis'
                                htmlFor='public'
                                aria-checked='true'
                                role='radio'
                            >
                                <input
                                    type='radio'
                                    id='public'
                                    name='communityType'
                                    className='sr-only'
                                    defaultChecked
                                />
                                <span
                                    role='presentation'
                                    aria-hidden='true'
                                    className='radio inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-gray'
                                >
                                    <span className='inline-block h-2 w-2 rounded-full bg-secondary'></span>
                                </span>
                                <span>Public</span>
                            </label>
                        </div>
                        <p className='tracking-eight text-medium-emphasis'>
                            Anyone can view, post, and comment on this
                            community.
                        </p>
                        <div>
                            <label
                                className='flex cursor-pointer items-center gap-2 font-medium tracking-eight text-high-emphasis'
                                htmlFor='private'
                            >
                                <input
                                    type='radio'
                                    id='private'
                                    name='communityType'
                                    className='sr-only'
                                />
                                <span className='radio inline-flex h-4 w-4 items-center justify-center rounded-full border-2 border-gray'>
                                    <span className='inline-block h-2 w-2 rounded-full bg-secondary'></span>
                                </span>
                                <span>Private</span>
                            </label>
                        </div>
                        <p className='tracking-eight text-medium-emphasis'>
                            Only approved or invited users can view and post to
                            this community.
                        </p>
                    </div>
                </div>

                {/* SEARCH INPUT + COVER PHOTO + TAGS */}
                <div className='max-w-[352px]'>
                    <div className='mb-8'>
                        <h2 className='mb-1 font-medium tracking-eight text-high-emphasis'>
                            Which movies/TV-shows is it about?
                        </h2>
                        <p className='mb-2 tracking-eight text-medium-emphasis'>
                            Attach a movie or TV show to make it easier for
                            other users to discover and join your community.
                        </p>
                        <SearchRelatedMediaInput
                            addSelectionHandler={addSelectionHandler}
                            selectedLength={relatedTitlesSelection.length}
                        />
                        <div className='mt-4 flex justify-between'>
                            {relatedTitlesSelection.map(title => (
                                <RelatedMediaSelection
                                    key={title.id}
                                    id={title.id}
                                    poster={title.poster}
                                    removeSelectionHandler={
                                        removeSelectionHandler
                                    }
                                />
                            ))}
                            {selectionPlaceholder.map(placeholder => (
                                <div
                                    key={placeholder.id}
                                    className='relative h-[120px] w-[80px] border-2 border-dashed border-gray'
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Cover Photo */}
                    <div className='mb-8'>
                        <h2 className='mb-1 font-medium tracking-eight text-high-emphasis'>
                            Cover photo (optional)
                        </h2>
                        <div className='flex h-[120px] w-full items-center justify-center border-2 border-dashed border-gray'>
                            <PlusIcon />
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <h2 className='mb-2 font-medium tracking-eight text-high-emphasis'>
                            Tags (optional)
                        </h2>
                        <form
                            onSubmit={addTagHandler}
                            className='mb-5 flex h-14 items-center justify-start gap-[10px] rounded-lg bg-first-surface px-6 py-[6px] focus-within:outline focus-within:outline-2 focus-within:outline-pure-white'
                        >
                            <SearchIcon />
                            <input
                                className='w-full border-none bg-transparent text-pure-white outline-none'
                                type='text'
                                placeholder='Search'
                                maxLength={50}
                                ref={tagInputRef}
                            />
                            <button className='sr-only' type='submit'></button>
                        </form>
                        <div className='flex flex-wrap gap-x-3 gap-y-[14px]'>
                            {tags.map((tag, index) => (
                                <Tag
                                    key={index}
                                    index={index}
                                    tag={tag}
                                    removeTagHandler={removeTagHandler}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Community Button */}
            <button
                type='button'
                disabled
                className='mx-auto block h-12 w-64 rounded-lg bg-gray p-[10px] font-medium tracking-eight text-disabled'
            >
                Create community
            </button>
        </section>
    );
};

export default CreateCommunityPage;

//
//
//
//
interface SearchRelatedMediaInputProps {
    addSelectionHandler: (
        id: string | number,
        title: string,
        poster: string,
        newVal: boolean,
        isApi: boolean,
    ) => void;
    selectedLength: number;
}

function SearchRelatedMediaInput({
    addSelectionHandler,
    selectedLength,
}: SearchRelatedMediaInputProps) {
    // Controls open state of popover
    const [inputFocus, setInputFocus] = useState(false);

    // Custom hook for searching Media from API
    const { queryMedia, fetching, searchMedia } = useMediaSearch();

    const searchInputChangeHandler = debounce(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const queryParam = e.target.value.trim();
            searchMedia(queryParam, null); // Passing null returns movies and tvSeries
        },
        500,
    );

    return (
        <Popover open={inputFocus}>
            <PopoverTrigger className='w-full min-w-[343px] md:min-w-[352px]'>
                <div className='mx-auto mt-2 flex h-14 w-[343px] items-center justify-start gap-[10px] rounded-lg bg-first-surface px-6 py-[6px] focus-within:bg-high-emphasis md:w-[352px] md:max-w-[544px]'>
                    {fetching ? <Spinner /> : <SearchIcon />}
                    <input
                        className='w-full border-none bg-transparent py-[11px] tracking-eight text-pure-white outline-none focus:text-secondary'
                        type='text'
                        placeholder='Search'
                        onChange={searchInputChangeHandler}
                        onFocus={() => setInputFocus(true)}
                        onBlur={() => setInputFocus(false)}
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent
                className='relative bottom-3 w-[343px] rounded-t-none p-0 md:w-[352px]'
                onOpenAutoFocus={(event: Event) => event.preventDefault()}
            >
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
            </PopoverContent>
        </Popover>
    );
}

interface RelatedMediaSelectionProps {
    id: number | string;
    poster: string;
    removeSelectionHandler: (id: number | string) => void;
}

function RelatedMediaSelection({
    id,
    poster,
    removeSelectionHandler,
}: RelatedMediaSelectionProps) {
    return (
        <div
            onClick={() => removeSelectionHandler(id)}
            className='relative h-[120px] w-[80px] cursor-pointer border-2 border-dashed border-gray'
        >
            <picture>
                <Image src={poster} fill alt=''></Image>
            </picture>
        </div>
    );
}

interface TagProps {
    index: number;
    tag: string;
    removeTagHandler: (index: number) => void;
}

function Tag({ index, tag, removeTagHandler }: TagProps) {
    return (
        <div
            key={index}
            onClick={() => removeTagHandler(index)}
            className='relative inline-flex h-[34px] cursor-pointer rounded-full border border-high-emphasis px-4 py-[4px] font-medium tracking-eight text-high-emphasis'
        >
            {tag}
            <CrossIconSVG className='absolute -right-3 -top-3 ' />
        </div>
    );
}

const Spinner = () => {
    return (
        <div className='spinner_container' aria-label='Loading...'>
            <i className='spinner_item spinner_item--warning'></i>
            <i className='spinner_item spinner_item--warning'></i>
        </div>
    );
};