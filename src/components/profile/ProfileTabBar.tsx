import { useEffect, useState } from 'react';
import { useUserContext } from '@/lib/context';
import axios from 'axios';
import UserPost from './UserPost';
import UserCommunity from './UserCommunity';
import { AboutMe } from '@/components/profile/AboutMe';

export default function ProfileTabBar({ userId }: any) {
  const [active, setActive] = useState<number>(0);
  const [postCount, setPostCount] = useState<number>(0);
  const [communityCount, setCommunityCount] = useState<number>(0);
  const [followerCount, setFollowerCount] = useState<number>(0);
  const [friendCount, setFriendCount] = useState<number>(0);

  const { user, idToken } = useUserContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          userPostsResponse,
          userCommunitiesResponse,
          userFollowersResponse,
          userFriendsResponse,
        ] = await Promise.all([
          axios.get(
            `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/discussions/${userId}`,
            { headers: { Authorization: `Bearer ${idToken}` } },
          ),
          axios.get(
            `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/profile/${userId}`,
            { headers: { Authorization: `Bearer ${idToken}` } },
          ),
          axios.get(
            `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/followers/${userId}`,
            { headers: { Authorization: `Bearer ${idToken}` } },
          ),
          axios.get(
            `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/friends/${userId}`,
            { headers: { Authorization: `Bearer ${idToken}` } },
          ),
        ]);

        setPostCount(userPostsResponse?.data?.length || 0);
        setCommunityCount(userCommunitiesResponse?.data?.data?.joinedCommunities?.length || 0);
        setFollowerCount(userFollowersResponse?.data?.data?.followers?.length || 0);
        setFriendCount(userFriendsResponse?.data?.data?.length || 0);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId, idToken]);

  const tabs: string[] = [
    `About Me`,
    `Posts(${postCount})`,
    `Communities(${communityCount})`,
    `Followers(${followerCount})`,
    `Friends(${friendCount})`,
  ];

  // Define content for each tab
  const tabContents = [
    <div key={0} className='mt-8'>
      <AboutMe userId={userId} />
    </div>,
    <div key={1} className='mt-8'>
      <UserPosts userId={userId} />
    </div>,
    <div key={2} className='mt-8'>
      <UserCommunities userId={userId} />
    </div>,
    <div key={3}>Followers Content</div>,
    <div key={4}>Friends Content</div>,
  ];

  return (
    <div>
      <div className='no-scrollbar relative flex h-[2.9rem] w-[calc(100vw-1rem)] overflow-y-visible overflow-x-scroll before:absolute before:bottom-[1px] before:h-[1px] before:w-full before:bg-[#515151] lg:w-full'>
        {tabs.map((e, i) => {
          return (
            <button
              data-text={e}
              className={`relative flex h-[2.875rem] items-center justify-center whitespace-nowrap px-3 before:absolute before:bottom-[1px] before:h-[1px] before:w-full before:bg-[#515151] after:absolute after:font-bold after:text-primary after:content-[attr(data-text)] ${
                active === i
                  ? 'border-b-2 border-primary text-white/0 before:hidden after:visible'
                  : 'text-disabled after:hidden'
              }`}
              key={i}
              onClick={() => setActive(i)}
            >
              {e}
            </button>
          );
        })}
      </div>
      <div className='tab-content'>{tabContents[active]}</div>
    </div>
  );
}

const UserPosts = ({ userId }: any) => {
  const [userDiscussions, setUserDiscussions] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user, idToken } = useUserContext();

  useEffect(() => {
    const fetchUserDiscussions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/backend/api/user/discussions/${userId}`,
          // `http://localhost:8080/api/user/discussions/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );
        const discussionsData = response.data;
        setUserDiscussions(discussionsData);
      } catch (error) {
        console.error('Error fetching user discussions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDiscussions();
  }, [userId, idToken]);

  return (
    <div className='mx-auto mb-12 flex max-w-[343px] flex-col gap-6 md:max-w-none md:gap-[20px] lg:gap-[40px]'>
      {userDiscussions?.map((discussion: any) => (
        <UserPost
          key={discussion?.id}
          discussionId={discussion?.discussionId}
          userId={discussion?.userId}
          createAt={discussion?.createAt}
          likes={discussion?.likes}
          comments={discussion?.comments}
          communityBelonged={discussion?.communityBelonged}
          body={discussion?.body}
          tagged={discussion?.tagged}
        />
      ))}
    </div>
  );
};

const UserCommunities = ({ userId }: any) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user, idToken } = useUserContext();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/backend/api/user/profile/${userId}`,
          // `http://localhost:8080/api/user/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );
        const userData = response.data.data;
        setUserInfo(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, idToken]);

  return (
    <div className='mx-auto mb-12 flex max-w-[343px] flex-col gap-6 md:max-w-none md:flex-row md:gap-[20px] lg:gap-[40px]'>
      {userInfo?.joinedCommunities?.map((community: any, index: number) => (
        <UserCommunity key={index} communityId={community} />
      ))}
    </div>
  );
};
