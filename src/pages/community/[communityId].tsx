import React, { useState } from 'react';
import Image from 'next/image';
import { NextPageContext } from 'next';

// Components
import UserIcon from '@/components/Icons/userIcon';
import TabsMobile from '@/components/community/MobileMainContent';
import DesktopMainContent from '@/components/community/DesktopMainContent';

// ShadCN/UI
import { Skeleton } from '@/components/ui/skeleton';

// Firebase
import { doc, getDoc, getFirestore, Timestamp } from 'firebase/firestore';
import app from '@/firebase/firebase-config';
import { useUserContext } from '@/lib/context';
const db = getFirestore(app);

interface ICreatedCommunityPageProps {
  data?: string;
}

export interface IPageData {
  content: { id: string; isApi: boolean; poster: string; title: string }[];
  coverPhoto: string[];
  createdAt: Timestamp;
  description: string;
  discussions: [];
  image: string[];
  isPublic: string;
  members: [];
  name: string;
  rules: string;
  tags: string[];
  userId: string;
}

const CreatedCommunityPage: React.FC<ICreatedCommunityPageProps> = ({ data }) => {
  const { user } = useUserContext();
  const pageData: IPageData = data ? JSON.parse(data) : null;

  // Skeleton Image Loader logic
  const [communityImageLoaded, setCommunityImageLoaded] = useState(false);
  const [coverImageLoaded, setCoverImageLoaded] = useState(false);

  const handleCommunityImageLoad = () => {
    setCommunityImageLoaded(true);
  };
  const handleCoverImageload = () => {
    setCoverImageLoaded(true);
  };

  if (!user) return;

  return (
    <section className='p-4 pb-20 md:px-0 md:pt-0'>
      <header className='relative mx-auto block h-[11.11vw] max-h-[170px] min-h-[160px] max-w-screen-2xl'>
        {pageData.coverPhoto ? (
          <>
            <Image
              className={`object-cover ${!coverImageLoaded ? 'invisible' : 'visible'}`}
              src={pageData.coverPhoto?.[0] || ''}
              onLoadingComplete={handleCoverImageload}
              onError={handleCoverImageload}
              fill
              alt=''
            ></Image>
            {!coverImageLoaded && <Skeleton className='absolute h-full w-full rounded-none' />}
          </>
        ) : null}
        <div className='bg-custom-gradient relative h-full w-full bg-black'></div>

        <div className='relative bottom-[126px] mx-auto flex h-[106.667px] max-w-[1120px] gap-3 md:bottom-[107px] md:gap-8 md:pl-4'>
          <picture className='relative block min-w-[80px] overflow-hidden rounded-md'>
            <Image
              className={`object-cover ${!communityImageLoaded ? 'invisible' : 'visible'}`}
              src={pageData?.image[0] || '/Pixel-160.png'}
              onLoadingComplete={handleCommunityImageLoad}
              onError={handleCommunityImageLoad}
              fill
              alt=''
            ></Image>
            {!communityImageLoaded && <Skeleton className='h-full w-full rounded-none' />}
          </picture>

          <div className='flex h-full flex-col justify-between md:justify-end md:gap-1'>
            <h1 className='text-[28px] font-medium tracking-[-0.42px] text-high-emphasis'>
              {pageData?.name}
            </h1>
            <div className='flex h-full flex-col justify-between md:h-fit md:flex-row md:items-center md:justify-start md:gap-6'>
              <div className='tracking-eight text-high-emphasis'>
                <span className=''>Public </span>
                <span className='px-2'>·</span>{' '}
                <UserIcon className='relative bottom-[1px] inline-block' />{' '}
                <span className='pl-1'>1</span>
              </div>
              <button
                type='button'
                className='h-[34px] w-fit rounded-[4px] bg-gray px-4 font-semibold tracking-eight text-secondary'
              >
                Joined
              </button>
            </div>
          </div>
        </div>
      </header>

      <TabsMobile pageData={pageData} />

      <DesktopMainContent pageData={pageData} />
    </section>
  );
};

export default CreatedCommunityPage;

export async function getServerSideProps(context: NextPageContext) {
  const communityId = context.query.communityId;

  try {
    const docRef = doc(db, `/communities/${communityId}`);
    const docSnapShot = await getDoc(docRef);

    if (!docSnapShot.exists()) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        data: JSON.stringify(docSnapShot.data()),
        notFound: false,
      },
    };
  } catch (error: any) {
    console.log('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
}
