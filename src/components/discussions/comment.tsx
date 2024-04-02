import Image from 'next/image';
import LikesReplies from '../shared/LikesReplies';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface CommentProps {
  discussionId: string;
  communityBelonged: string;
  commentId: string;
  idToken: any;
  key: any;
}

export function Comment({
  key,
  discussionId,
  communityBelonged,
  commentId,
  idToken,
}: CommentProps) {
  const [commentInfo, setCommentInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Convert createAt to a Date object
  const dateObject = new Date(
    commentInfo?.createAt?._seconds * 1000 + commentInfo?.createAt?._nanoseconds / 1000000,
  );
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

  useEffect(() => {
    const fetchCommentDetails = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-reeltalk-app.cloudfunctions.net/backend/communities/${communityBelonged}/discussions/${discussionId}/comments/${commentId}`,
        //   `http://localhost:8080/communities/${communityBelonged}/discussions/${discussionId}/comments/${commentId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );
        const commentData = response.data;
        setCommentInfo(commentData);
        setIsLoading(false); // Set loading state to false after data fetch attempt
      } catch (error) {
        console.error('Error fetching comment:', error);
        setIsLoading(false); // Set loading state to false even in case of error
      }
    };

    fetchCommentDetails();
  }, [commentId, discussionId, communityBelonged, idToken]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (commentInfo && commentInfo.userId) {
          const response = await axios.get(
            `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/profile/${commentInfo.userId}`,
            // `http://localhost:8080/api/user/profile/${commentInfo.userId}`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            },
          );
          const userData = response.data.data; // Assuming the user data is nested under 'data'
          setUserInfo(userData);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserDetails();
  }, [commentInfo, idToken]);

  // Render comment content if commentInfo is available
  if (!isLoading && commentInfo) {
    return (
      <div className='flex'>
        <div className='h-7 w-7 pr-2'>
          <Image width={28} height={28} src='/Discussions/ProfileIcon2.png' alt='profile icon' />
        </div>

        <div key={key} className='flex grow flex-col gap-2 rounded '>
          <div className='flex grow flex-col gap-2 rounded-lg bg-white/[0.12] p-2'>
            <div className='flex h-[1.188rem] justify-between gap-2 text-[0.875rem] text-high-emphasis'>
              <p className='text-sm text-high-emphasis'>{userInfo?.displayName}</p>

              {/* TODO: ADD TIMESTAMP */}
              <p className='text-xs text-high-emphasis'>{formattedDate}</p>
            </div>
            <div className='flex h-[1.188rem] gap-2 text-[0.875rem] text-high-emphasis'>
              <p className='text-sm text-high-emphasis'>{commentInfo.comment}</p>
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex gap-3'>
              <button className='text-sm text-white/[0.6]'>Like</button>
              <button className='text-sm text-white/[0.6]'>Reply</button>
            </div>
            <LikesReplies
              likes={commentInfo?.likes?.length}
              replies={commentInfo?.replies?.length}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
