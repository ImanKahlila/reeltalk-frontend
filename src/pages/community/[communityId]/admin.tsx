import React from 'react';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import axios from 'axios';
import nookies from 'nookies';
import { useUserContext } from '@/lib/context';

type JoinRequestData = {
  displayName: string;
  userId: string;
}[];

const CommunityAdminPage: React.FC<{ data?: string }> = ({ data }) => {
  const { query } = useRouter();
  const { communityId } = query;
  const joinRequestsData: JoinRequestData | null = data ? JSON.parse(data).validUserData : null;
  const { idToken } = useUserContext();

  async function approveRequest(request: string, action: boolean) {
    let response;
    try {
      response = await axios.post(
        `https://us-central1-reeltalk-app.cloudfunctions.net/api/communities/join-community/${communityId}/pendingRequest`,
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
      {joinRequestsData?.map(request => (
        <div key={request.userId} className='flex items-center gap-4'>
          <div className='text-high-emphasis'>{request.displayName}</div>
          <div className='text-medium-emphasis'>{request.userId}</div>
          <button
            onClick={() => approveRequest(request.userId, true)}
            className='rounded-sm bg-primary px-3 py-1 font-medium transition-colors duration-300 hover:bg-opacity-80'
          >
            Approve
          </button>
          <button
            onClick={() => approveRequest(request.userId, false)}
            className='rounded-sm bg-red-700 px-3 py-1 font-medium text-pure-white transition-colors duration-300 hover:bg-opacity-80'
          >
            Deny
          </button>
        </div>
      ))}
      {!joinRequestsData?.length && (
        <p className='text-medium-emphasis'>No join requests at the moment :(</p>
      )}
    </div>
  );
};

export default CommunityAdminPage;

export async function getServerSideProps(context: NextPageContext) {
  const communityId = context.query.communityId;
  const idToken = nookies.get(context).idToken;

  let response;
  try {
    response = await axios.get(`https://us-central1-reeltalk-app.cloudfunctions.net/api/communities/join-community/${communityId}`, {
      headers: { Authorization: `Bearer ${idToken}` },
    });

    return {
      props: {
        data: JSON.stringify(response.data),
      },
    };
  } catch (error: any) {
    console.log('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
}
