import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Firebase
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import app from '@/firebase/firebase-config';
import { useUserContext } from '@/lib/context';

const db = getFirestore(app);

const CreatedCommunityPage = () => {
  const { user } = useUserContext();
  const router = useRouter();
  const { communityId } = router.query;

  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function getData() {
      if (user) {
        const docRef = doc(db, `/communities/${communityId}`);
        const docSnapShot = (await getDoc(docRef)).data();
        setPageData(docSnapShot);
      }
    }

    getData();
  }, [communityId, user]);

  return (
    <>
      <picture className='relative mx-auto block h-[11.11vw] max-h-[160px] w-full max-w-[1440px]'>
        {pageData ? (
          <Image className='object-cover' src={pageData.coverPhoto[0]} fill alt=''></Image>
        ) : null}
        <div className='bg-custom-gradient relative h-full w-full bg-black'></div>
      </picture>
      <section>{JSON.stringify(pageData)}</section>
    </>
  );
};

export default CreatedCommunityPage;
