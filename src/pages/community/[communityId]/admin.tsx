import React from 'react';
import { NextPageContext } from 'next';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import app from '@/firebase/firebase-config';
const db = getFirestore(app);
import { ICommunityObject } from '.';
import axios from 'axios';
import nookies from 'nookies';
import { useUserContext } from '@/lib/context';

const CommunityAdminPage: React.FC<{ data?: string }> = ({ data }) => {
  const pageData: ICommunityObject = data ? JSON.parse(data) : null;
  const { idToken } = useUserContext();

  async function approveRequest(request: string, action: boolean) {
    let response;
    try {
      response = await axios.post(
        `http://localhost:8080/communities/join-community/${pageData.communityId}/pendingRequest`,
        { action: action, requestedUserId: request },
        {
          headers: { Authorization: `Bearer ${idToken}` },
        },
      );
    } catch (error: any) {
      console.log(error.message);
    }
    console.log(response?.data.message);
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-primary'>Requests to Join</h1>
      {pageData.joinRequests?.map(request => (
        <div key={request} className='flex items-center gap-4'>
          <div className='text-medium-emphasis'>{request}</div>
          <button
            onClick={() => approveRequest(request, true)}
            className='rounded-sm bg-primary px-3 py-1 font-medium transition-colors duration-300 hover:bg-opacity-80'
          >
            Approve
          </button>
          <button
            onClick={() => approveRequest(request, false)}
            className='rounded-sm bg-red-700 px-3 py-1 font-medium text-pure-white transition-colors duration-300 hover:bg-opacity-80'
          >
            Deny
          </button>
        </div>
      ))}
      {!pageData?.joinRequests?.length && (
        <p className='text-medium-emphasis'>No join requests at the moment :(</p>
      )}
    </div>
  );
};

export default CommunityAdminPage;

export async function getServerSideProps(context: NextPageContext) {
  const communityId = context.query.communityId;
  const idToken = nookies.get(context).idToken;

  // TODO: Implement fetching from the backend
  let response;
  try {
    response = await axios.get(`http://localhost:8080/communities/join-community/${communityId}`, {
      headers: { Authorization: `Bearer ${idToken}` },
    });

    console.log(response.data);
  } catch (error: any) {
    console.log(error.message);
  }

  // TODO: Remove code fetching from firestore directly
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
