import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import LikesReplies from '@/components/shared/LikesReplies';
import { useUserContext } from '@/lib/context';

interface DiscussionProps {
  discussionId: string;
  userId: string;
  createAt: any;
  likes: number;
  comments: string[];
  communityBelonged: string;
  tagged: string[];
  body: string; // Add body prop
}

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

const ActiveDiscussion: React.FC<DiscussionProps> = ({
  discussionId,
  userId,
  comments,
  communityBelonged,
  createAt,
  likes,
  tagged,
  body,
}) => {
  const [communityInfo, setCommunityInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user, idToken } = useUserContext();

  const [discussions, setDiscussions] = useState<Discussion[]>([]);

  useEffect(() => {
    const fetchCommunityDetails = async () => {
      try {
        if (communityBelonged) {
          const response = await axios.get(
            // `https://us-central1-reeltalk-app.cloudfunctions.net/backend/communities/${communityBelonged}/`,
            `http://localhost:8080/communities/${communityBelonged}/`,
            {
              headers: { Authorization: `Bearer ${idToken}` },
            },
          );
          const communityData = response.data;

          if (communityData) {
            setCommunityInfo(communityData);
          }
        }
      } catch (error) {
        console.error('Error fetching community details:', error);
        setError('Error fetching community details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunityDetails();
  }, [communityBelonged, idToken]);

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
        // setLoadCount(prevCount => prevCount + 1);
      } catch (error) {
        console.error('Error fetching discussions:', error);
      }
    };

    if (idToken) {
      fetchDiscussions();
    }
  }, [idToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Convert createAt to a Date object
  const dateObject = new Date(createAt?._seconds * 1000 + createAt?._nanoseconds / 1000000);
  const isDateValid = !isNaN(dateObject.getTime());

  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - dateObject.getTime();

  let formattedDate;

  if (timeDifference < 60000) {
    // Less than a minute
    formattedDate = `${Math.floor(timeDifference / 1000)}s ago`;
  } else if (timeDifference < 3600000) {
    // Less than an hour
    formattedDate = `${Math.floor(timeDifference / 60000)}m ago`;
  } else if (timeDifference < 86400000) {
    // Less than a day
    formattedDate = `${Math.floor(timeDifference / 86400000)}d ago`;
  } else if (timeDifference < 2592000000) {
    // Less than a month (30 days)
    formattedDate = `${Math.floor(timeDifference / 86400000)}d ago`;
  } else if (timeDifference < 31536000000) {
    // Less than a year (365 days)
    const months = Math.floor(timeDifference / 2592000000);
    formattedDate = `${months === 1 ? '1 month' : `${months} months`} ago`;
  } else {
    // More than a year
    formattedDate = `${Math.floor(timeDifference / 31536000000)}y ago`;
  }

  /////USE THIS LATER ON TIMESTAMP
  const timestampSeconds = createAt?._seconds;
  const timestampMilliseconds = timestampSeconds * 1000 + createAt?._nanoseconds / 1000000;
  const currentDate = new Date(); // Current date and time

  // Calculate the difference in milliseconds
  const differenceInMilliseconds = currentDate.getTime() - timestampMilliseconds;

  // Convert milliseconds to days
  const millisecondsInADay = 1000 * 60 * 60 * 24; // Number of milliseconds in a day
  const differenceInDays = Math.floor(differenceInMilliseconds / millisecondsInADay);

  console.log(`It has been ${differenceInDays} days since the timestamp.`);

  return (
    <div className='flex flex-col gap-[0.563rem] rounded-lg bg-first-surface px-6 py-4'>
      <div className='flex h-12 gap-2'>
        <Image
          width={31}
          height={48}
          src={communityInfo?.communityData?.communityImage}
          alt='movie thumbnail'
        />
        <div className='text-xs'>
          {/* <div className='text-primary'>{communityInfo}</div> */}
          <div className='text-primary'>{communityInfo?.communityData?.name}</div>
          <div className='relative flex h-4 gap-1 text-high-emphasis'>
            <div>Posted by</div>
            <Image width={16} height={16} src='/Discussions/ProfileIcon.png' alt='profile icon' />
            <div>Jennifer L.</div>
            {/* <div>{userId}</div> */}
          </div>
          <div className='text-white/[0.6]'>{formattedDate}</div>
        </div>
      </div>
      <div className='text-high-emphasis'>{body}</div>
      <LikesReplies likes={likes} replies={comments?.length} />
    </div>
  );
};

export default ActiveDiscussion;
