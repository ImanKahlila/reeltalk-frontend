import React, { use, useEffect, useState } from 'react';
import LikesReplies from '../shared/LikesReplies';
import Image from 'next/image';
import axios from 'axios';
import { useUserContext } from '@/lib/context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Skeleton } from '../ui/skeleton';

interface PostProps {
  discussionId: string;
  userId: string;
  createAt: any;
  likes: string[];
  comments: string[];
  communityBelonged: string;
  tagged: string[];
  body: string;
}

const UserPost: React.FC<PostProps> = ({
  discussionId,
  userId,
  createAt,
  likes,
  comments,
  communityBelonged,
  tagged,
  body,
}) => {
  const [communityInfo, setCommunityInfo] = useState<any>(null);
  const [commentInfo, setCommentInfo] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

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
    const fetchCommentDetails = async () => {
      try {
        if (comments) {
          const response = await axios.get(
            `https://us-central1-reeltalk-app.cloudfunctions.net/backend/communities/${communityBelonged}/discussions/${discussionId}/comments/${commentInfo?.commentId}`,
            // `http://localhost:8080/communities/${communityBelonged}/discussions/${discussionId}/comments/0J53xfBr9fR2GlN0rcUn`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            },
          );
          const commentData = response.data;
          setCommentInfo(commentData);
        }
      } catch (error) {
        console.error('Error fetching comment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommentDetails();
  }, [comments, idToken, commentInfo?.commentId, communityBelonged, discussionId]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/profile/${userId}`,
            // `http://localhost:8080/api/user/profile/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            },
          );
          const userData = response.data.data;
          setUserInfo(userData);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
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

  return (
    <Link
      href={`${communityId}/discussions/${discussionId}`}
      className='flex w-full flex-col gap-[0.625rem] rounded-lg bg-first-surface px-6 py-4 hover:bg-black '
    >
      {isLoading ? (
        <Skeleton className='w-full' />
      ) : (
        <>
          <div className='flex h-[2.357rem] gap-2'>
            <Image
              width={24}
              height={37.71}
              src={communityInfo?.communityData?.communityImage}
              alt='movie thumbnail'
            />
            <div className='flex grow flex-col justify-center text-xs lg:justify-end'>
              <div className='text-primary'>{communityInfo?.communityData?.name}</div>
              <div className='flex h-4 items-center gap-1 text-high-emphasis lg:hidden'>
                <div>Posted by</div>
                <Image
                  width={16}
                  height={16}
                  src='/Discussions/ProfileIcon.png'
                  alt='profile icon'
                />
                <div>{userInfo?.displayName}</div>
              </div>
              <div className='flex'>
                <div className='grow text-white/[0.6]'>{formattedDate}</div>
                <div className='hidden h-4 items-center gap-1 text-high-emphasis lg:flex'>
                  <div>Posted by</div>
                  <Image
                    width={16}
                    height={16}
                    src='/Discussions/ProfileIcon.png'
                    alt='profile icon'
                  />
                  <div>{userInfo?.displayName}</div>
                </div>
              </div>
            </div>
          </div>
          <h2 className='text-base text-high-emphasis'>{body}</h2>
          <LikesReplies likes={likes?.length} replies={comments?.length} />
          <div className='flex grow flex-col gap-2 rounded bg-white/[0.12] p-2'>
            <div className='flex h-[1.188rem] gap-2 text-[0.875rem] text-white/[0.92]'>
              <Image
                width={16}
                height={16}
                src='/Discussions/ProfileIcon2.png'
                alt='profile icon'
              />
              <p className='text-xs text-high-emphasis'>{userInfo?.displayName}</p>
            </div>
            <p className='text-xs text-high-emphasis'>{commentInfo?.comment}</p>
            <LikesReplies
              likes={commentInfo?.likes?.length}
              replies={commentInfo?.replies?.length}
            />
          </div>
        </>
      )}
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

export default UserPost;