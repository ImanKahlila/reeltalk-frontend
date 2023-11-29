import React, { useEffect, useState, ChangeEvent } from 'react';

// Components
import CommunityImageUpload from '@/components/community/CommunityImageUpload';
import CommunityCoverUpload from '@/components/community/CommunityCoverUploads';
import CreateCommunityInputs from '@/components/community/CreateCommunityInputs';
import RelatedMediaSelection from '@/components/community/RelatedMediaSelection';
import Tags from '@/components/community/Tags';

// util
import { useRouter } from 'next/router';
import { useUserContext } from '@/lib/context';

// Hooks
import { useAuthRequired } from '@/hooks/routeProtection';
import RelatedMediaSearchInput from '@/components/community/RelatedMediaSearchInput';
import createCommunity from '@/lib/createCommunity';

const initialFormState = {
  name: '',
  description: '',
  rules: '',
};

export interface IRelatedTitlesSelection {
  relatedTitles: {
    id: string | number;
    title: string;
    poster: string;
    isApi: boolean;
  }[];
}
const CreateCommunityPage = () => {
  const { user } = useUserContext();
  useAuthRequired();
  const router = useRouter();

  const [relatedTitlesSelection, setRelatedTitlesSelection] = useState<
    IRelatedTitlesSelection['relatedTitles']
  >([]);

  // Placeholder tracker, tracks how many placeholders needed for relatedTitlesSelections
  const selectionPlaceholder: { id: number; title: string; poster: string }[] = [];
  for (let i = 0; i < 4 - relatedTitlesSelection.length; i++) {
    selectionPlaceholder.push({ id: i, title: '', poster: '' });
  }

  const [communityType, setCommunityType] = useState('public');
  function communityTypeChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setCommunityType(e.target.value);
  }

  // Function to add media selection
  function addSelectionHandler(id: string | number, title: string, poster: string, isApi: boolean) {
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

  const [formValues, setFormValues] = useState(initialFormState);

  const isValid =
    Object.values(formValues).every(value => value.trim() !== '') &&
    relatedTitlesSelection.length !== 0;

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const CreateCommunityPage = async () => {
    // Extracted request logic into seperate file
    createCommunity({
      user,
      nameValue: formValues.name,
      descriptionValue: formValues.description,
      rulesValue: formValues.rules,
      communityType,
      relatedTitlesSelection,
      tags,
      coverImage,
      communityImage,
      router,
    });
  };

  // Image and CoverImage Logic
  const [communityImage, setCommunityImage] = useState<File | null>();
  const [communityImagePreview, setCommunityImagePreview] = useState('/Pixel-160.png');

  const [coverImage, setCoverImage] = useState<File | null>();
  const [coverImagePreview, setCoverImagePreview] = useState('');

  useEffect(() => {
    if (communityImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCommunityImagePreview(reader.result as string);
      };
      reader.readAsDataURL(communityImage);
    } else {
      setCommunityImagePreview('/Pixel-160.png');
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
      setCoverImagePreview('');
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
        <CommunityImageUpload
          communityImagePreview={communityImagePreview}
          setCommunityImage={setCommunityImage}
        />

        <CreateCommunityInputs
          nameValue={formValues.name}
          descriptionValue={formValues.description}
          rulesValue={formValues.rules}
          inputChangeHandler={inputChangeHandler}
          communityTypeChangeHandler={communityTypeChangeHandler}
        />

        {/* SEARCH INPUT + COVER PHOTO + TAGS */}
        <div className='max-w-[352px]'>
          <div className='mb-8'>
            <h2 className='mb-1 font-medium tracking-eight text-high-emphasis'>
              Which movies/TV-shows is it about?
            </h2>
            <p className='mb-2 tracking-eight text-medium-emphasis'>
              Attach a movie or TV show to make it easier for other users to discover and join your
              community.
            </p>

            <RelatedMediaSearchInput
              addSelectionHandler={addSelectionHandler}
              selectedLength={relatedTitlesSelection.length}
            />

            <RelatedMediaSelection
              relatedTitlesSelection={relatedTitlesSelection}
              removeSelectionHandler={removeSelectionHandler}
              selectionPlaceholder={selectionPlaceholder}
            />
          </div>

          <CommunityCoverUpload
            coverImagePreview={coverImagePreview}
            setCoverImage={setCoverImage}
          />

          <Tags addTagHandler={addTagHandler} removeTagHandler={removeTagHandler} tags={tags} />
        </div>
      </div>

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
