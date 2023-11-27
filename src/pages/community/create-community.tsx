import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Components
import SearchOption from '@/components/onboarding/SearchOption';
import CrossIconSVG from '@/components/Icons/crossIcon';
import SearchIcon from '@/components/layout/SearchIcon';
import PlusIcon from '@/components/Icons/plusIcon';

// ShadCN/UI
import { ScrollArea } from '@/components/ui/scroll-area';

// util
import toast from 'react-hot-toast';
import { debounce } from 'lodash';

// Hooks
import useMediaSearch from '@/hooks/useMediaSearch';
import axios from 'axios';
import { useUserContext } from '@/lib/context';

const CreateCommunityPage = () => {
    // User Context
    const { user } = useUserContext();

    const router = useRouter();

    const [relatedTitlesSelection, setRelatedTitlesSelection] = useState<
        { id: string | number; title: string; poster: string; isApi: boolean }[]
    >([]);

    // Placeholder tracker, tracks how many placeholders needed for relatedTitlesSelections
    const selectionPlaceholder = [];
    for (let i = 0; i < 4 - relatedTitlesSelection.length; i++) {
        selectionPlaceholder.push({ id: i, title: '', poster: '' });
    }

    const [communityType, setCommunityType] = useState('public');

    function communityTypeChangeHandler(
        e: React.ChangeEvent<HTMLInputElement>,
    ) {
        setCommunityType(e.target.value);
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

    function addTagHandler(query: string) {
        setTags(prev => {
            let newState = [...prev];
            newState.push(query);
            return newState;
        });
    }

    function removeTagHandler(index: number) {
        setTags(prev => {
            let newState = [...prev];
            newState.splice(index, 1);
            return newState;
        });
    }

    const [nameValue, setNameValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [rulesValue, setRulesValue] = useState('');

    const isValid =
        nameValue.trim() !== '' &&
        descriptionValue.trim() !== '' &&
        rulesValue.trim() !== '' &&
        relatedTitlesSelection.length !== 0;

    function nameInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setNameValue(e.currentTarget.value);
    }
    function descriptionInputChangeHandler(
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) {
        setDescriptionValue(e.currentTarget.value);
    }
    function rulesInputChangeHandler(
        e: React.ChangeEvent<HTMLTextAreaElement>,
    ) {
        setRulesValue(e.currentTarget.value);
    }

    const CreateCommunityPage = async () => {
        if (user) {
            try {
                const data = {
                    name: nameValue,
                    description: descriptionValue,
                    rules: rulesValue,
                    isPublic: communityType === 'public',
                    content: relatedTitlesSelection,
                    tags: tags,
                    userId: user.uid,
                };

                const formData = new FormData();
                formData.append('coverPhoto', coverImage as Blob); // Add images to FormData instance
                formData.append('image', communityImage as Blob);

                // map data to FormData instance
                Object.entries(data).forEach(([key, value]) => {
                    formData.append(
                        key,
                        Array.isArray(value)
                            ? JSON.stringify(value)
                            : String(value),
                    );
                });

                const response = await axios.post(
                    'http://localhost:8080/communities',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    },
                );
                if (response.status === 200) {
                    toast.success(response.data.message);
                    toast.success('Please wait to be redirected...');
                }

                // TODO: Response should have id of newly created community so we can navigate to it after creating it
                setTimeout(() => {
                    router.push('/community');
                }, 200);
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    };

    // Image and CoverImage Logic
    const [communityImage, setCommunityImage] = useState<File | null>();
    const [communityImagePreview, setCommunityImagePreview] = useState<
        string | null
    >();

    const [coverImage, setCoverImage] = useState<File | null>();
    const [coverImagePreview, setCoverImagePreview] = useState<string | null>();

    useEffect(() => {
        if (communityImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCommunityImagePreview(reader.result as string);
            };
            reader.readAsDataURL(communityImage);
        } else {
            setCommunityImagePreview(null);
        }
    }, [communityImage]);

    useEffect(() => {
        if (coverImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCoverImagePreview(reader.result as string);
            };
            reader.readAsDataURL(coverImage);
        } else {
            setCoverImagePreview(null);
        }
    }, [coverImage]);

    if (!user) return;

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
                        <Image
                            className='object-cover'
                            src={
                                communityImagePreview
                                    ? communityImagePreview
                                    : '/Pixel-160.png'
                            }
                            fill
                            alt=''
                        ></Image>
                    </picture>
                    <label
                        htmlFor='community-image'
                        className='flex h-[34px] w-full cursor-pointer items-center justify-center rounded bg-primary px-4 font-semibold tracking-[0.24px] text-secondary'
                    >
                        Edit
                    </label>
                    <input
                        id='community-image'
                        type='file'
                        className='sr-only'
                        accept='image/*'
                        onChange={event => {
                            const file = event.target.files?.[0];
                            if (file && file.type.substring(0, 5) === 'image') {
                                setCommunityImage(file);
                            } else {
                                setCommunityImage(null);
                            }
                        }}
                    />
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
                            value={nameValue}
                            onChange={nameInputChangeHandler}
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
                            value={descriptionValue}
                            onChange={descriptionInputChangeHandler}
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
                            value={rulesValue}
                            onChange={rulesInputChangeHandler}
                        />
                    </div>

                    {/* Radios */}
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
                                    value='public'
                                    className='sr-only'
                                    defaultChecked
                                    onChange={communityTypeChangeHandler}
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
                                    value='private'
                                    className='sr-only'
                                    onChange={communityTypeChangeHandler}
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
                        <label
                            htmlFor='community-cover'
                            className='relative flex h-[120px] w-full cursor-pointer items-center justify-center border-2 border-dashed border-gray'
                        >
                            <input
                                id='community-cover'
                                accept='image/*'
                                className='sr-only'
                                type='file'
                                onChange={event => {
                                    const file = event.target.files?.[0];
                                    if (
                                        file &&
                                        file.type.substring(0, 5) === 'image'
                                    ) {
                                        setCoverImage(file);
                                    } else {
                                        setCoverImage(null);
                                    }
                                }}
                            />
                            {coverImagePreview ? (
                                <Image
                                    className='object-cover'
                                    src={coverImagePreview!}
                                    fill
                                    alt=''
                                ></Image>
                            ) : (
                                <PlusIcon />
                            )}
                        </label>
                    </div>

                    {/* Tags */}
                    <div>
                        <h2 className='mb-2 font-medium tracking-eight text-high-emphasis'>
                            Tags (optional)
                        </h2>

                        <TagSearchInput
                            fetching={false} //TODO: Fix when implement tag searching
                            addTagHandler={addTagHandler}
                        />

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
                disabled={!isValid}
                onClick={CreateCommunityPage}
                className='mx-auto block h-12 w-64 rounded-lg bg-primary p-[10px] font-semibold tracking-eight text-secondary transition-colors duration-300 disabled:bg-gray disabled:text-disabled'
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
interface ISearchRelatedMediaInput {
    addSelectionHandler: (
        id: string | number,
        title: string,
        poster: string,
        isApi: boolean,
    ) => void;
    selectedLength: number;
}

function SearchRelatedMediaInput({
    addSelectionHandler,
    selectedLength,
}: ISearchRelatedMediaInput) {
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
        // Container
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

interface IRelatedMediaSelection {
    id: number | string;
    poster: string;
    removeSelectionHandler: (id: number | string) => void;
}

function RelatedMediaSelection({
    id,
    poster,
    removeSelectionHandler,
}: IRelatedMediaSelection) {
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

interface ITags {
    index: number;
    tag: string;
    removeTagHandler: (index: number) => void;
}

function Tag({ index, tag, removeTagHandler }: ITags) {
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

interface ITagSearchInput {
    fetching: boolean;
    addTagHandler: (query: string) => void;
}

function TagSearchInput({ fetching = false, addTagHandler }: ITagSearchInput) {
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
                                    <span className='tracking-eight'>
                                        {tagQuery}
                                    </span>{' '}
                                    <span className='tracking-eight text-gray'>
                                        create tag
                                    </span>
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

const Spinner = () => {
    return (
        <div className='spinner_container' aria-label='Loading...'>
            <i className='spinner_item spinner_item--warning'></i>
            <i className='spinner_item spinner_item--warning'></i>
        </div>
    );
};
