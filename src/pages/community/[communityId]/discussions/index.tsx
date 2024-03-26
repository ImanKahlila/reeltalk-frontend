import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import StartPost from '@/components/discussions/StartPost';
import Post from '@/components/discussions/Post';
import Sidebar, { DiscussionsSearch } from '@/components/discussions/Sidebar';
import TabBar from '@/components/discussions/TabBar';
import ActiveDiscussion from '@/components/discussions/ActiveDiscussion';
import { useUserContext } from '@/lib/context';

import { useRouter } from 'next/router';

interface Discussion {
  discussionId: string;
  id: string;
  body: string;
  userId: string;
  createAt: any;
  likes: string[];
  comments: string[];
  communityBelonged: string;
  tagged: string[];
}

const DISCUSSIONS_TO_LOAD = 5;

export default function DiscussionPage() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [discussionsToDisplay, setDiscussionsToDisplay] = useState<Discussion[]>([]);
  const [loadCount, setLoadCount] = useState(0);

  const router = useRouter();

  const { user, idToken } = useUserContext();
//   const idToken = useMemo(() => idToken, []);
//   const communityIdMemoized = useMemo(() => '14j9jP03strFhDmDmScz', []); // Assuming a constant community ID

// const idToken = useMemo(() => nookies.get(context).idToken, []);
const communityId = useMemo(() => router.query.communityId, [router.query.communityId]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await axios.get<Record<string, Discussion>>(
          'https://us-central1-reeltalk-app.cloudfunctions.net/backend/communities/14j9jP03strFhDmDmScz/discussions/',
        //   'http://localhost:8080/communities/14j9jP03strFhDmDmScz/discussions/',
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        const discussionsArray = Object.values(response.data).map((discussionData: any) => {
          return {
            ...discussionData,
          };
        });

        setDiscussions(prevDiscussions => [...prevDiscussions, ...discussionsArray]);
        setLoadCount(prevCount => prevCount + 1);
      } catch (error) {
        console.error('Error fetching discussions:', error);
      }
    };

    if (idToken) {
      fetchDiscussions();
    }
  }, [idToken]);

  useEffect(() => {
    const startIndex = (loadCount - 1) * DISCUSSIONS_TO_LOAD;
    const endIndex = startIndex + DISCUSSIONS_TO_LOAD;
    setDiscussionsToDisplay(discussions.slice(startIndex, endIndex));
  }, [loadCount, discussions]);

  const loadMoreDiscussions = () => {
    setLoadCount(prevCount => prevCount + 1);
  };

  return (
    <section className='mx-4 my-[1.438rem] flex flex-col justify-center gap-4 lg:flex-row lg:gap-8'>
      <DiscussionsSearch className='relative flex h-[3.5rem] w-full items-center overflow-hidden rounded-lg bg-white/[0.02] px-6 lg:hidden' />
      <div className='flex flex-col gap-6 lg:w-[46rem]'>
        <StartPost />
        <TabBar />
        {discussionsToDisplay.map(discussion => (
          <Post
            key={discussion.id}
            discussionId={discussion.id}
            userId={discussion.userId}
            createAt={discussion.createAt}
            likes={discussion.likes}
            comments={discussion.comments}
            communityBelonged={discussion.communityBelonged}
            body={discussion?.body}
            tagged={discussion.tagged}
          />
        ))}
        {discussionsToDisplay.length < discussions.length && (
          <button onClick={loadMoreDiscussions} className='text-primary'>
            Load More
          </button>
        )}
      </div>
      <Sidebar>
        {discussionsToDisplay.map(discussion => (
          <ActiveDiscussion
            key={discussion.id}
            {...discussion}
            discussionId={discussion.id}
            userId={discussion.userId}
            comments={discussion.comments}
            communityBelonged={discussion.communityBelonged}
            createAt={discussion.createAt}
            likes={discussion.likes?.length}
            tagged={discussion.tagged}
            body={discussion.body}
          />
        ))}
      </Sidebar>
    </section>
  );
}
