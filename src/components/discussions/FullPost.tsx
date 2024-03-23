import React, { use, useEffect, useState } from 'react';
import LikesReplies from '../shared/LikesReplies';
import Image from 'next/image';
import axios from 'axios';
import { useUserContext } from '@/lib/context';
import FullStartPost from './FullStartPost';
import { Comment } from './comment';

interface FullPostProps {
  discussionId: string;
  userId: string;
  createAt: any;
  likes: string[];
  comments: string[];
  communityBelonged: string;
  tagged: string[];
  content: string; // Add content prop
}
const FullPost: React.FC<FullPostProps> = ({
  discussionId,
  userId,
  createAt,
  likes,
  comments,
  communityBelonged,
  tagged,
  content,
}) => {
  const { user, idToken } = useUserContext();

  const [communityInfo, setCommunityInfo] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    const fetchUserDetails = async () => {
      try {
        if (userId) {
          // const response = await axios.get(`http://localhost:8080/api/user/profile/${userId}/`,
          const response = await axios.get(
            `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/profile/${userId}/`,
            {
              headers: { Authorization: `Bearer ${idToken}` },
            },
          );
          const userData = response.data;

          if (userData) {
            setUserInfo(userData);
            console.log(userData);
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Error fetching user details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, idToken]);

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
    <div className='flex w-full flex-col gap-[0.625rem] rounded-lg bg-first-surface px-6 py-4 '>
      <div className='flex h-[2.357rem] gap-2'>
        <div className='flex grow flex-col justify-center text-xs lg:justify-end'>
          <div className='flex flex-col'>
            <div className='flex h-4 items-center gap-1 text-high-emphasis lg:hidden'>
              <div>Posted by</div>
              <Image width={16} height={16} src='/Discussions/ProfileIcon.png' alt='profile icon' />
              <div>{userInfo?.displayName}</div>
            </div>
            <div className='hidden h-4 items-center gap-1 text-high-emphasis lg:flex'>
              <div>Posted by</div>
              <Image width={16} height={16} src='/Discussions/ProfileIcon.png' alt='profile icon' />
              <div>{userInfo?.displayName}</div>
            </div>
            <div className='grow text-white/[0.6]'>{formattedDate}</div>
          </div>
        </div>
      </div>
      <h2 className='text-base text-high-emphasis'>{content}</h2>
      <LikesReplies likes={likes?.length} replies={comments?.length} />
      <div className='my-2'>
        <FullStartPost communityBelonged={communityBelonged} discussionId={discussionId} />
      </div>

      {/* Comment on a Discussion */}
      {comments?.map((comment, index) => (
        <Comment
          key={index}
          idToken={idToken}
          discussionId={discussionId}
          communityBelonged={communityBelonged}
          userId={'testing'}
          commentId={comment}
          likes={2}
          replies={2}
        />
      ))}
    </div>
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

export default FullPost;
