import React from 'react';
import { NextPageContext } from 'next';

import axios from 'axios';
import nookies from 'nookies';

// Firebase
import { doc, getDoc, getFirestore, Timestamp, DocumentData } from 'firebase/firestore';
import app from '@/firebase/firebase-config';
import { useUserContext } from '@/lib/context';
const db = getFirestore(app);

import CreatedCommunity from '@/components/community/communityId/CreatedCommunity';

export interface ICommunityObject {
  content: { id: string; isApi: boolean; poster: string; title: string }[];
  coverPhoto: string;
  createdAt: Timestamp;
  description: string;
  discussions: [];
  communityImage: string;
  isPublic: boolean;
  joinRequests?: string[];
  members: string[];
  name: string;
  rules: string;
  tags: string[];
  userId: string;
  communityId: string;
}

export type ValidJoinRequestsData = {
  displayName: string;
  userId: string;
}[];

const CreatedCommunityPage: React.FC<{ data?: string; validJoinRequests: string }> = ({
  data,
  validJoinRequests,
}) => {
  const pageData: ICommunityObject = data ? JSON.parse(data) : null;
  const joinRequestsData: ValidJoinRequestsData | null = data
    ? JSON.parse(validJoinRequests)?.validUserData
    : null;

  const { user } = useUserContext();
  if (!user) return;

  return (
    <section className='p-4 pb-20 md:px-0 md:pt-0'>
      <CreatedCommunity pageData={pageData} joinRequestsData={joinRequestsData} />
    </section>
  );
};

export default CreatedCommunityPage;

export async function getServerSideProps(context: NextPageContext) {
  const communityId = context.query.communityId;
  const idToken = nookies.get(context).idToken;

  let response = null;
  try {
    const docRef = doc(db, `/communities/${communityId}`);
    const docSnapShot = await getDoc(docRef);

    if (!docSnapShot.exists()) {
      return {
        notFound: true,
      };
    }
    const data: DocumentData | ICommunityObject = docSnapShot.data();

    if (!data.isPublic) {
      response = await axios.get(
        `http://localhost:8080/communities/join-community/${communityId}`,
        {
          headers: { Authorization: `Bearer ${idToken}` },
        },
      );
    }

    return {
      props: {
        data: JSON.stringify(data),
        validJoinRequests: JSON.stringify(response?.data || null),
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
