import React, { use, useEffect, useState } from 'react';
import LikesReplies from '../shared/LikesReplies';
import Image from 'next/image';
import axios from 'axios';
import { useUserContext } from '@/lib/context';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface PostProps {
  discussionId: string;
  userId: string;
  createAt: any;
  likes: string[];
  comments: string[];
  communityBelonged: string;
  tagged: string[];
  content: string; // Add content prop
}

const Post: React.FC<PostProps> = ({
  discussionId,
  userId,
  createAt,
  likes,
  comments,
  communityBelonged,
  tagged,
  content,
}) => {
  const [communityInfo, setCommunityInfo] = useState<any>(null);
  const { user, idToken } = useUserContext();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { query } = useRouter();
  const { communityId } = query;

  useEffect(() => {
    const fetchCommunityDetails = async () => {
      try {
        if (communityBelonged) {
          const response = await axios.get(
            `https://us-central1-reeltalk-app.cloudfunctions.net/backend/communities/${communityBelonged}/`,
            // `http://localhost:8080/communities/${communityBelonged}/`,
            {
              headers: { Authorization: `Bearer ${idToken}` },
            },
          );
          const communityData = response.data;

          if (communityData) {
            setCommunityInfo(communityData);
            //   console.log(communityData)
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

  // Convert createAt to a Date object
  const dateObject = new Date(createAt?._seconds * 1000 + createAt?._nanoseconds / 1000000);
  const isDateValid = !isNaN(dateObject.getTime());

  // Format the date if it's valid
  const formattedDate = isDateValid
    ? dateObject.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
      })
    : 'Invalid Date';

  return (
    // <Link href={`${communityId}/discussions/${communityBelonged}`}
    <Link
      href={`${communityId}/discussions/${discussionId}`}
      className='flex w-full flex-col gap-[0.625rem] rounded-lg bg-first-surface px-6 py-4 hover:bg-black '
    >
      <div className='flex h-[2.357rem] gap-2'>
        <Image
          width={24}
          height={37.71}
          src={communityInfo?.communityData?.communityImage}
          alt='movie thumbnail'
        />
        <div className='flex grow flex-col justify-center text-xs lg:justify-end'>
          {/* <div className='text-primary'>The Best Closers in the City</div>
          <div className='text-primary'>{communityBelonged}</div> */}
          <div className='text-primary'>{communityInfo?.communityData?.name}</div>
          {/* <Author className='flex h-4 items-center gap-1 text-high-emphasis lg:hidden' /> */}
          <div className='flex h-4 items-center gap-1 text-high-emphasis lg:hidden'>
            <div>Posted by</div>
            <Image width={16} height={16} src='/Discussions/ProfileIcon.png' alt='profile icon' />
            {/* <div>Jennifer L.</div> */}
            <div>{userId}</div>
          </div>
          <div className='flex'>
            <div className='grow text-white/[0.6]'>{formattedDate}</div>
            <div className='hidden h-4 items-center gap-1 text-high-emphasis lg:flex'>
              <div>Posted by</div>
              <Image width={16} height={16} src='/Discussions/ProfileIcon.png' alt='profile icon' />
              {/* <div>Jennifer L.</div> */}
              <div>{userId}</div>
            </div>
          </div>
        </div>
      </div>
      {/* <h2 className='text-base text-high-emphasis'>{content}</h2> */}
      <h2 className='text-base text-high-emphasis'>{content}</h2>
      <LikesReplies likes={likes?.length} replies={comments?.length} />
      {/* Render additional discussion details if needed */}

      {/* Comment on a Discussion */}
      <div className='flex grow flex-col gap-2 rounded bg-white/[0.12] p-2'>
        <div className='flex h-[1.188rem] gap-2 text-[0.875rem] text-white/[0.92]'>
          <Image width={16} height={16} src='/Discussions/ProfileIcon2.png' alt='profile icon' />
          Jane L.
          <p className='text-xs text-high-emphasis'>{userId}</p>
        </div>
        {/* <p className='text-xs text-high-emphasis'>
           My favorite scene will always be from season 4 episode 8 when Harvey found out about
           louis&#39; deal with forstman. The side by side wal see morek by harvey and louis will
           always be one of my favorite shots of all time.
         </p> */}
        <p className='text-xs text-high-emphasis'>{comments}</p>
        <LikesReplies likes={2} replies={2} />
      </div>
    </Link>
  );
};

type Author = React.HTMLAttributes<HTMLDivElement>;

function Author({ ...props }: Author) {
  return (
    <div {...props}>
      <div>Posted by</div>
      <Image width={16} height={16} src='/Discussions/ProfileIcon.png' alt='profile icon' />
      <div>Jennifer L.</div>
      <div>Jennifer L.</div>
    </div>
  );
}

export default Post;
