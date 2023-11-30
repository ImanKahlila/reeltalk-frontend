import React from 'react';
import Image from 'next/image';

// Components
import PlusIcon from '../Icons/plusIcon';

interface ICommunityCoverUpload {
  coverImagePreview: string;
  setCoverImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const CommunityCoverUpload = ({ coverImagePreview, setCoverImage }: ICommunityCoverUpload) => {
  return (
    <div className='mb-8'>
      <h2 className='mb-1 font-medium tracking-eight text-high-emphasis'>Cover photo (optional)</h2>
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
            if (file && file.type.substring(0, 5) === 'image') {
              setCoverImage(file);
            } else {
              setCoverImage(null);
            }
          }}
        />
        {coverImagePreview ? (
          <Image className='object-cover' src={coverImagePreview!} fill alt=''></Image>
        ) : (
          <PlusIcon />
        )}
      </label>
    </div>
  );
};

export default CommunityCoverUpload;
