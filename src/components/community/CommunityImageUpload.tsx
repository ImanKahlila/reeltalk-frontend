import React from 'react';
import Image from 'next/image';

interface ICommuntyImageUploadProps {
  communityImagePreview: string;
  setCommunityImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const CommunityImageUpload = ({
  communityImagePreview,
  setCommunityImage,
}: ICommuntyImageUploadProps) => {
  return (
    <div className='flex max-w-[120px] flex-col gap-4'>
      <picture className='relative block h-[153.787px] min-w-[120px] overflow-hidden rounded-md'>
        <Image className='object-cover' src={communityImagePreview} fill alt=''></Image>
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
  );
};

export default CommunityImageUpload;
