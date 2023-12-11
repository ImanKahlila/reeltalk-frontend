import React, { ChangeEvent } from 'react';

interface ICreateCommunityInputs {
  nameValue: string;
  descriptionValue: string;
  rulesValue: string;
  inputChangeHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  communityTypeChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CreateCommunityInputs = ({
  nameValue,
  descriptionValue,
  rulesValue,
  inputChangeHandler,
  communityTypeChangeHandler,
}: ICreateCommunityInputs) => {
  return (
    <div className='flex max-w-[352px] flex-col gap-6'>
      <div>
        <label
          className='mb-1 font-medium tracking-eight text-high-emphasis'
          htmlFor='community-name'
        >
          Name your community
        </label>
        <p className='mb-2 tracking-eight text-medium-emphasis'>22 characters remaining.</p>
        <input
          className='w-full rounded-lg border border-medium-emphasis bg-first-surface py-3 pl-6 pr-3 tracking-eight text-high-emphasis placeholder-disabled'
          placeholder='Community Name'
          type='text'
          name='name'
          id='community-name'
          value={nameValue}
          onChange={inputChangeHandler}
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
          name='description'
          value={descriptionValue}
          onChange={inputChangeHandler}
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
          name='rules'
          value={rulesValue}
          onChange={inputChangeHandler}
        />
      </div>

      {/* Radios */}
      <div>
        <h2 className='mb-1 font-medium tracking-eight text-high-emphasis'>Community type</h2>
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
          Anyone can view, post, and comment on this community.
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
          Only approved or invited users can view and post to this community.
        </p>
      </div>
    </div>
  );
};

export default CreateCommunityInputs;
