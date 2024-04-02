import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '@/lib/context';

import React from 'react';

// Components
import Link from 'next/link';

// Util
import { ICommunityObject } from '@/pages/community/[communityId]';
import { useRouter } from 'next/router';
import { Poster } from '@/components/community/communityId/Poster';
import FullPost from '@/components/discussions/FullPost';
import DiscussionSidebar from '@/components/discussions/DiscussionSidebar';
import CommunitySnippet from '@/components/community/CommunitySnippet';

import { NextPageContext } from 'next';
import nookies from 'nookies';
import { doc, getDoc, getFirestore, DocumentData } from 'firebase/firestore';
import app from '@/firebase/firebase-config';
import CreatedCommunity from '@/components/community/communityId/CreatedCommunity';

interface Discussion {
  id: string;
  discussionId: string;
  body: string;
  userId: string;
  createAt: any;
  likes: string[];
  comments: string[];
  communityBelonged: string;
  tagged: string[];
}

const db = getFirestore(app);

interface ValidJoinRequestsData {
  displayName: string;
  userId: string;
}

interface Props {
  data: string;
  validJoinRequests: string;
  discussions: any[];
}

const DiscussionPage: React.FC<Props> = ({ data, validJoinRequests, discussions }) => {
  const pageData: ICommunityObject = data ? JSON.parse(data) : null;
  const joinRequestsData: ValidJoinRequestsData[] | null = validJoinRequests
    ? JSON.parse(validJoinRequests)?.validUserData
    : null;

  const { user, idToken } = useUserContext();

  console.log(idToken)

  const DISCUSSIONS_TO_LOAD = 1;

  const [discussion, setDiscussion] = useState<any>([]);
  const [discussionsToDisplay, setDiscussionsToDisplay] = useState<Discussion[]>([]);
  const [loadCount, setLoadCount] = useState(0);
  const [communityInfo, setCommunityInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const discussionId = router.query.discussionId;
  const communityId = router.query.communityId;

  useEffect(() => {
    const fetchCommunityDetails = async () => {
      try {
        if (communityId) {
          const response = await axios.get(
            `https://us-central1-reeltalk-app.cloudfunctions.net/backend/communities/${communityId}/`,
            // `http://localhost:8080/communities/${communityId}/`,
            {
              headers: { Authorization: `Bearer ${idToken}` },
            },
          );
          const communityData = response.data;

          setCommunityInfo(communityData);
        }
      } catch (error) {
        console.error('Error fetching community details:', error);
        setError('Error fetching community details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCommunityDetails();
  }, [discussion, communityId, discussionId, idToken]);

  //TODO: Make sure to fix rerender issue in case refresh etc...
  useEffect(() => {
    const fetchDiscussion = async () => {
      try {
        const response = await axios.get<Record<string, Discussion>>(
            `https://us-central1-reeltalk-app.cloudfunctions.net/backend/communities/${communityId}/discussions/${discussionId}/`,
        //   `http://localhost:8080/communities/${communityId}/discussions/${discussionId}/`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );

        setDiscussion(response.data);
        console.log(discussion);
        setLoadCount(1);
      } catch (error) {
        console.error('Error fetching discussions:', error);
      }
    };

    fetchDiscussion();
  }, [discussion, communityId, discussionId, idToken]);

  //TODO: POSSIBLE FIX FOR RENDER ISSUE
  //Is to maybe match all useffect depencies that
  //may intertwine
  //UPDATED TODO: CHECK IF IT WORKS

  return (
    <section className='mx-4 my-[1.438rem] flex flex-col justify-center gap-4 lg:flex-row lg:gap-8'>
      <div className='flex flex-col gap-6 lg:w-[46rem]'>
        <FullPost
          key={discussion?.id}
          discussionId={String(discussionId)}
          userId={discussion?.userId}
          createAt={discussion?.createAt}
          likes={discussion?.likes}
          comments={discussion?.comments}
          communityBelonged={discussion?.communityBelonged}
          body={discussion?.body}
          tagged={discussion?.tagged}
        />
      </div>
      <DiscussionSidebar>
        <div className='flex w-full min-w-[320px] max-w-[352px] flex-col gap-6'>
          <div>
            <CommunitySnippet pageData={pageData} />
          </div>
          <div className='flex w-full flex-col gap-4 rounded-[8px] bg-first-surface px-4 py-8'>
            <h2 className='font-semibold tracking-eight text-high-emphasis'>About the community</h2>
            <p className='text-medium-emphasis'>{communityInfo?.communityData?.description}</p>
          </div>
          <div className='flex w-full flex-col gap-4 rounded-[8px] bg-first-surface px-4 py-8'>
            <h2 className='font-semibold tracking-eight text-high-emphasis'>
              Related movies/TV-shows
            </h2>
            <div className='flex justify-start gap-1'>
              {communityInfo?.communityData?.content
                ? communityInfo?.communityData?.content.map((media: any) => {
                    return <Poster key={media.id} poster={media.poster} />;
                  })
                : null}
            </div>
          </div>
          <div className='flex w-full flex-col gap-4 rounded-[8px] bg-first-surface px-4 py-8'>
            <h2 className='font-semibold tracking-eight text-high-emphasis'>Rules</h2>
            <p className='tracking-eight text-medium-emphasis'>
              {communityInfo?.communityData?.rules}
            </p>
          </div>
        </div>
      </DiscussionSidebar>
    </section>
  );
};

export default DiscussionPage;

export async function getServerSideProps(context: NextPageContext) {
  const communityId = context.query.communityId;
  const idToken = nookies.get(context).idToken;

  try {
    const docRef = doc(db, `/communities/${communityId}`);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      return {
        notFound: true,
      };
    }

    const data: DocumentData | ICommunityObject = docSnapshot.data();

    let validJoinRequests = null;

    if (!data.isPublic) {
      const response = await axios.get(
        `https://us-central1-reeltalk-app.cloudfunctions.net/backend/communities/join-community/${communityId}/`,
        // `http://localhost:8080/communities/join-community/${communityId}/`,
        {
          headers: { Authorization: `Bearer ${idToken}` },
        },
      );

      validJoinRequests = response.data;
    }

    const discussionsResponse = await axios.get(
        `https://us-central1-reeltalk-app.cloudfunctions.net/backend/communities/${communityId}/discussions/`,
    //   `http://localhost:8080/communities/${communityId}/discussions/`,
      {
        headers: { Authorization: `Bearer ${idToken}` },
      },
    );

    const discussionsArray = Object.values(discussionsResponse.data);

    console.log(discussionsArray);

    return {
      props: {
        data: JSON.stringify(data),
        validJoinRequests: JSON.stringify(validJoinRequests),
        discussions: discussionsArray,
      },
    };
  } catch (error) {
    console.log('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
}
