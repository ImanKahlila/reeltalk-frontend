import React from 'react';
import { NextPageContext } from 'next';

import axios from 'axios';
import nookies from 'nookies';

// Firebase
import { doc, getDoc, getFirestore, DocumentData } from 'firebase/firestore';
import app from '@/firebase/firebase-config';
import { useUserContext } from '@/lib/context';
const db = getFirestore(app);

import CreatedCommunity from '@/components/community/communityId/CreatedCommunity';

// interface ICommunityObject {
//   content: { id: string; isApi: boolean; poster: string; title: string }[];
//   coverPhoto: string;
//   createdAt: any;
//   description: string;
//   discussions: any[];
//   communityImage: string;
//   isPublic: boolean;
//   joinRequests?: string[];
//   members: string[];
//   name: string;
//   rules: string;
//   tags: string[];
//   userId: string;
//   communityId: string;
// }

export interface ICommunityObject {
  content: { id: string; isApi: boolean; poster: string; title: string }[];
  coverPhoto: string;
  createdAt: any;
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

// interface ValidJoinRequestsData {
//   displayName: string;
//   userId: string;
// }

export type ValidJoinRequestsData = {
  displayName: string;
  userId: string;
}[];

// interface Props {
//   data: string;
//   validJoinRequests: string;
//   discussions: any[];
// }

// const CreatedCommunityPage: React.FC<Props> = ({ data, validJoinRequests, discussions }) => {
//   const pageData: ICommunityObject = data ? JSON.parse(data) : null;
//   const joinRequestsData: ValidJoinRequestsData[] | null = validJoinRequests
//     ? JSON.parse(validJoinRequests)?.validUserData
//     : null;

//   const { user } = useUserContext();

//   if (!user) {
//     // Redirect to login page or show a message to the user
//     return <div>Please login to view this page.</div>;
//   }

//   return (
//     <section className='p-4 pb-20 md:px-0 md:pt-0'>
//       <CreatedCommunity
//         pageData={pageData}
//         joinRequestsData={joinRequestsData}
//         discussions={discussions}
//       />
//     </section>
//   );
// };

// export default CreatedCommunityPage;

// export async function getServerSideProps(context: NextPageContext) {
//   const communityId = context.query.communityId;
//   const idToken = nookies.get(context).idToken;

//   try {
//     const docRef = doc(db, `/communities/${communityId}`);
//     const docSnapshot = await getDoc(docRef);

//     if (!docSnapshot.exists()) {
//       return {
//         notFound: true,
//       };
//     }

//     const data: DocumentData | ICommunityObject = docSnapshot.data();

//     let validJoinRequests = null;

//     if (!data.isPublic) {
//       const response = await axios.get(
//         `https://us-central1-reeltalk-app.cloudfunctions.net/backend/communities/join-community/${communityId}/`,
//         // `http://localhost:8080/communities/join-community/${communityId}/`,
//         {
//           headers: { Authorization: `Bearer ${idToken}` },
//         },
//       );

//       validJoinRequests = response.data;
//     }

//     const discussionsResponse = await axios.get(
//       `https://us-central1-reeltalk-app.cloudfunctions.net/backend/communities/${communityId}/discussions/`,
//     //   `http://localhost:8080/communities/${communityId}/discussions/`,
//       {
//         headers: { Authorization: `Bearer ${idToken}` },
//       },
//     );

//     const discussionsArray = Object.values(discussionsResponse.data);

//     console.log(discussionsArray);

//     return {
//       props: {
//         data: JSON.stringify(data),
//         validJoinRequests: JSON.stringify(validJoinRequests),
//         discussions: discussionsArray,
//       },
//     };
//   } catch (error) {
//     console.log('Error fetching data:', error);
//     return {
//       notFound: true,
//     };
//   }
// }

/////CHECK GET SERVER SIDE PROPS
/////CHECK PREVIOUS CODE ON GITHUB
/////CHECK WHAT FILES ARE IN IMPORT PATH

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
        `https://us-central1-reeltalk-app.cloudfunctions.net/api/communities/join-community/${communityId}`,
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
