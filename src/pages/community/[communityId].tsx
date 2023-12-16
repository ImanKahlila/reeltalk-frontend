import React from 'react';
import { NextPageContext } from 'next';

// Firebase
import { doc, getDoc, getFirestore, Timestamp } from 'firebase/firestore';
import app from '@/firebase/firebase-config';
import { useUserContext } from '@/lib/context';
const db = getFirestore(app);

import CreatedCommunity from '@/components/community/communityId/CreatedCommunity';

export interface IPageData {
  content: { id: string; isApi: boolean; poster: string; title: string }[];
  coverPhoto: string;
  createdAt: Timestamp;
  description: string;
  discussions: [];
  communityImage: string;
  isPublic: boolean;
  joinRequests: string[];
  members: string[];
  name: string;
  rules: string;
  tags: string[];
  userId: string;
}

const CreatedCommunityPage: React.FC<{ data?: string }> = ({ data }) => {
  const pageData: IPageData = data ? JSON.parse(data) : null;

  const { user } = useUserContext();
  if (!user) return;

  return (
    <section className='p-4 pb-20 md:px-0 md:pt-0'>
      <CreatedCommunity pageData={pageData} />
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
