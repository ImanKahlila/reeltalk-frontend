import React, { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';

// Hooks
import {
  useCreateCommunity,
  useImageUpload,
  useRelatedMedia,
  useTags,
} from './CreateCommunity.hooks';

// Components
import CommunityImageUpload from '@/components/community/create-community/CommunityImageUpload';
import CommunityCoverUpload from '@/components/community/create-community/CommunityCoverUploads';
import CreateCommunityInputs from '@/components/community/create-community/CreateCommunityInputs';
import RelatedMediaSearchInput from '@/components/community/create-community/RelatedMediaSearchInput';
import RelatedMediaSelection from '@/components/community/create-community/RelatedMediaSelection';
import Tags from '@/components/community/create-community/Tags';
import Spinner from '@/components/shared/Spinner';

// Firebase
import { User } from 'firebase/auth';

const initialFormState = {
  name: '',
  description: '',
  rules: '',
};

const CreateCommunity = ({ user }: { user: User }) => {
  // Image and CoverImage Logic
  const {
    communityImage,
    setCommunityImage,
    communityImagePreview,
    coverImage,
    setCoverImage,
    coverImagePreview,
  } = useImageUpload();

  const {
    relatedTitlesSelection,
    selectionPlaceholder,
    addSelectionHandler,
    removeSelectionHandler,
  } = useRelatedMedia();

  const { tags, addTagHandler, removeTagHandler } = useTags();

  const [communityType, setCommunityType] = useState('public');
  function communityTypeChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setCommunityType(e.target.value);
  }

  const [formValues, setFormValues] = useState(initialFormState);
  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const router = useRouter();
  const [spinnerActive, setSpinnerActive] = useState(false);
  const CreateCommunityPage = async () => {
    setSpinnerActive(true);
    // Extracted request logic into seperate file
    await useCreateCommunity({
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

    setSpinnerActive(false);
  };

  const isValid =
    Object.values(formValues).every(value => value.trim() !== '') &&
    relatedTitlesSelection.length !== 0 &&
    communityImage instanceof File;

  return (
    <>
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
        className='mx-auto flex h-12 w-64 items-center justify-center rounded-lg bg-primary p-[10px] font-semibold tracking-eight text-secondary transition-colors duration-300 disabled:bg-gray disabled:text-disabled'
      >
        {spinnerActive ? <Spinner className='scale-150' /> : ' Create community'}
      </button>
    </>
  );
};

export default CreateCommunity;
