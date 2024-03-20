import Image from 'next/image';
import LikesReplies from '../shared/LikesReplies';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface CommentProps {
  userId: string;
  discussionId: string;
  communityBelonged: string;
  commentId: string;
  likes: number;
  replies: number;
  idToken: any;
  key: any;
}

export function Comment({
  key,
  userId,
  discussionId,
  communityBelonged,
  commentId,
  likes,
  replies,
  idToken,
}: CommentProps) {
  const [commentInfo, setCommentInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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
        console.log(commentData)
      } catch (error) {
        console.error('Error fetching comment:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after data fetch attempt
      }
    };

    fetchCommentDetails();
  }, [commentId, discussionId, idToken]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/profile/${userId}/`,
            {
              headers: { Authorization: `Bearer ${idToken}` },
            },
          );
          const userData = response.data;
          if (userData) {
            setUserInfo(userData);
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
  }, [userId]);

  // Render comment content if commentInfo is available
  if (!isLoading && commentInfo) {
    return (
      <div className='flex'>
        <div className='h-7 w-7 pr-2'>
          <Image width={28} height={28} src='/Discussions/ProfileIcon2.png' alt='profile icon' />
        </div>

        <div key={key} className='flex grow flex-col gap-2 rounded '>
          <div className='flex grow flex-col gap-2 rounded-lg bg-white/[0.12] p-2'>
            <div className='flex h-[1.188rem] gap-2 text-[0.875rem] text-high-emphasis'>
              <p className='text-sm text-high-emphasis'>{userInfo?.displayName}</p>
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
