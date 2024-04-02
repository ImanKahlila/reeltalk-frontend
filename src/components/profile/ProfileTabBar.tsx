// import { useEffect, useState } from 'react';
// import TopUserMovies from './TopUserMovies';
// import TopUserShows from './TopUserShows';
// import { useUserContext } from '@/lib/context';
// import axios from 'axios';
// import { ChevronRight } from 'lucide-react';
// import UserPost from './UserPost';
// import UserCommunity from './UserCommunity';
// import { Skeleton } from '../ui/skeleton';

// export default function ProfileTabBar({ userId }: any) {
//   const [active, setActive] = useState<number>(0);
//   const [postCount, setPostCount] = useState<number>(0);
//   const [communityCount, setCommunityCount] = useState<number>(0);
//   const [followerCount, setFollowerCount] = useState<number>(0);
//   const [friendCount, setFriendCount] = useState<number>(0);

//   const { user, idToken } = useUserContext();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userPostsResponse = await axios.get(
//           `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/discussions/${userId}`,
//           //   `http://localhost:8080/api/user/discussions/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${idToken}`,
//             },
//           },
//         );
//         const userCommunitiesResponse = await axios.get(
//           `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/profile/${userId}`,
//           //   `http://localhost:8080/api/user/profile/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${idToken}`,
//             },
//           },
//         );
//         const userFollowersResponse = await axios.get(
//           `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/profile/${userId}`,
//           //   `http://localhost:8080/api/user/profile/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${idToken}`,
//             },
//           },
//         );
//         const userFriendsResponse = await axios.get(
//           `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/profile/${userId}`,
//           //   `http://localhost:8080/api/user/profile/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${idToken}`,
//             },
//           },
//         );

//         setPostCount(userPostsResponse?.data?.length);
//         setCommunityCount(userCommunitiesResponse?.data?.data?.joinedCommunities?.length);
//         // setFollowerCount(userFollowersResponse?.data?.data?.folowers?.length);
//         // setFriendCount(userFriendsResponse?.data?.data?.length);
//         setFollowerCount(0);
//         setFriendCount(0);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [userId, idToken]);

//   const tabs: string[] = [
//     `About Me`,
//     `Posts(${postCount})`,
//     `Communities(${communityCount})`,
//     `Followers(${followerCount})`,
//     `Friends(${friendCount})`,
//   ];

//   // Define content for each tab
//   const tabContents = [
//     <div key={0} className='mt-8'>
//       <AboutMe userId={userId} />
//     </div>,
//     <div key={1} className='mt-8'>
//       <UserPosts userId={userId} />
//     </div>,
//     <div key={2} className='mt-8'>
//       <UserCommunities userId={userId} />
//     </div>,
//     <div key={3}>Followers Content</div>,
//     <div key={4}>Friends Content</div>,
//   ];

//   return (
//     <div>
//       <div className='no-scrollbar relative flex h-[2.9rem] w-[calc(100vw-1rem)] overflow-y-visible overflow-x-scroll before:absolute before:bottom-[1px] before:h-[1px] before:w-full before:bg-[#515151] lg:w-full'>
//         {tabs.map((e, i) => {
//           return (
//             <button
//               data-text={e}
//               className={`relative flex h-[2.875rem] items-center justify-center whitespace-nowrap px-3 before:absolute before:bottom-[1px] before:h-[1px] before:w-full before:bg-[#515151] after:absolute after:font-bold after:text-primary after:content-[attr(data-text)] ${
//                 active === i
//                   ? 'border-b-2 border-primary text-white/0 before:hidden after:visible'
//                   : 'text-disabled after:hidden'
//               }`}
//               key={i}
//               onClick={() => setActive(i)}
//             >
//               {e}
//             </button>
//           );
//         })}
//       </div>
//       <div className='tab-content'>{tabContents[active]}</div>
//     </div>
//   );
// }

// const AboutMe = ({ userId }: any) => {
//   const [userInfo, setUserInfo] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const { user, idToken } = useUserContext();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/profile/${userId}`,
//           // `http://localhost:8080/api/user/profile/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${idToken}`,
//             },
//           },
//         );
//         const userData = response.data.data;
//         setUserInfo(userData);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [userId, idToken]);

//   return (
//     <div className='mx-auto flex max-w-[343px] flex-col gap-6 md:max-w-none md:flex-row md:gap-[20px] lg:gap-[40px]'>
//       {isLoading ? (
//         <Skeleton className='w-full' />
//       ) : (
//         <>
//           <div className='flex w-full flex-col gap-4 rounded-[8px]'>
//             <div className='flex w-full flex-col rounded-[8px] bg-first-surface px-4 pb-[180px] pt-4'>
//               <h2 className='font-light tracking-eight text-high-emphasis'>
//                 Profile Strength:{' '}
//                 <span className='font-bold tracking-eight text-high-emphasis'>
//                   {userInfo?.profileLevel}
//                 </span>
//               </h2>
//               <div className='flex items-center text-sm'>
//                 <p className='font- text-disabled'>Up Next:</p>
//                 <span className='pl-1 font-semibold text-disabled'>Reel Enthusiast</span>
//                 <p className='font-thin text-disabled'>
//                   <ChevronRight />
//                 </p>
//               </div>
//             </div>

//             <div className='flex w-full justify-between gap-4 rounded-[8px] bg-first-surface px-4 py-4'>
//               <p className='text-medium-emphasis'>Your Screen Gems</p>
//               <p className='pr-8 text-medium-emphasis'>10💎</p>
//             </div>
//           </div>

//           <div className='w-full max-w-[372px]'>
//             <div className='mb-8'>
//               <div className='mb-8'>
//                 <h2 className='mb-3 font-medium tracking-eight text-high-emphasis'>
//                   Favorite genres
//                 </h2>
//                 <p className='mb-2 tracking-eight text-medium-emphasis'>
//                   {userInfo?.favoriteGenres[0]?.name}, {userInfo?.favoriteGenres[1]?.name}, and{' '}
//                   {userInfo?.favoriteGenres[2]?.name}
//                 </p>
//               </div>

//               <h2 className='mb-3 font-medium tracking-eight text-high-emphasis'>Top 5 Movies</h2>
//               <div className='flex space-x-2'>
//                 {userInfo?.favoriteMovies?.map((movie: any) => (
//                   <TopUserMovies key={movie?.id} poster={movie?.primaryImage?.url} />
//                 ))}
//               </div>

//               <h2 className='mb-3 font-medium tracking-eight text-high-emphasis'>Top 5 TV shows</h2>
//               <div className='flex space-x-2'>
//                 {userInfo?.favoriteShows?.map((show: any) => (
//                   <TopUserShows key={show?.id} poster={show?.primaryImage?.url} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// const UserPosts = ({ userId }: any) => {
//   const [userDiscussions, setUserDiscussions] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const { user, idToken } = useUserContext();

//   useEffect(() => {
//     const fetchUserDiscussions = async () => {
//       try {
//         const response = await axios.get(
//           `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/discussions/${userId}`,
//           // `http://localhost:8080/api/user/discussions/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${idToken}`,
//             },
//           },
//         );
//         const discussionsData = response.data;
//         setUserDiscussions(discussionsData);
//       } catch (error) {
//         console.error('Error fetching user discussions:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserDiscussions();
//   }, [userId, idToken]);

//   return (
//     <div className='mx-auto mb-12 flex max-w-[343px] flex-col gap-6 md:max-w-none md:flex-row md:gap-[20px] lg:gap-[40px]'>
//       {userDiscussions?.map((discussion: any) => (
//         <UserPost
//           key={discussion?.id}
//           discussionId={discussion?.discussionId}
//           userId={discussion?.userId}
//           createAt={discussion?.createAt}
//           likes={discussion?.likes}
//           comments={discussion?.comments}
//           communityBelonged={discussion?.communityBelonged}
//           body={discussion?.body}
//           tagged={discussion?.tagged}
//         />
//       ))}
//     </div>
//   );
// };

// const UserCommunities = ({ userId }: any) => {
//   const [userInfo, setUserInfo] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const { user, idToken } = useUserContext();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/profile/${userId}`,
//           // `http://localhost:8080/api/user/profile/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${idToken}`,
//             },
//           },
//         );
//         const userData = response.data.data;
//         setUserInfo(userData);
//       } catch (error) {
//         console.error('Error fetching user:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [userId, idToken]);

//   return (
//     <div className='mx-auto mb-12 flex max-w-[343px] flex-col gap-6 md:max-w-none md:flex-row md:gap-[20px] lg:gap-[40px]'>
//       {userInfo?.joinedCommunities?.map((community: any, index: number) => (
//         <UserCommunity key={index} communityId={community} />
//       ))}
//     </div>
//   );
// };

import { useEffect, useState } from 'react';
import TopUserMovies from './TopUserMovies';
import TopUserShows from './TopUserShows';
import { useUserContext } from '@/lib/context';
import axios from 'axios';
import { ChevronRight } from 'lucide-react';
import UserPost from './UserPost';
import UserCommunity from './UserCommunity';
import { Skeleton } from '../ui/skeleton';

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

const AboutMe = ({ userId }: any) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user, idToken } = useUserContext();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
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
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, idToken]);

  return (
    <div className='mx-auto flex max-w-[343px] flex-col gap-6 md:max-w-none md:flex-row md:gap-[20px] lg:gap-[40px]'>
      {isLoading ? (
        <Skeleton className='w-full' />
      ) : (
        <>
          <div className='flex w-full flex-col gap-4 rounded-[8px]'>
            <div className='flex w-full flex-col rounded-[8px] bg-first-surface px-4 pb-[180px] pt-4'>
              <h2 className='font-light tracking-eight text-high-emphasis'>
                Profile Strength:{' '}
                <span className='font-bold tracking-eight text-high-emphasis'>
                  {userInfo?.profileLevel || ''}
                </span>
              </h2>
              <div className='flex items-center text-sm'>
                <p className='font- text-disabled'>Up Next:</p>
                <span className='pl-1 font-semibold text-disabled'>Reel Enthusiast</span>
                <p className='font-thin text-disabled'>
                  <ChevronRight />
                </p>
              </div>
            </div>

            <div className='flex w-full justify-between gap-4 rounded-[8px] bg-first-surface px-4 py-4'>
              <p className='text-medium-emphasis'>Your Screen Gems</p>
              <p className='pr-8 text-medium-emphasis'>10💎</p>
            </div>
          </div>

          <div className='w-full max-w-[372px]'>
            <div className='mb-8'>
              <div className='mb-8'>
                <h2 className='mb-3 font-medium tracking-eight text-high-emphasis'>
                  Favorite genres
                </h2>
                <p className='mb-2 tracking-eight text-medium-emphasis'>
                  {userInfo?.favoriteGenres?.[0]?.name}, {userInfo?.favoriteGenres?.[1]?.name}, and{' '}
                  {userInfo?.favoriteGenres?.[2]?.name}
                </p>
              </div>

              <h2 className='mb-3 font-medium tracking-eight text-high-emphasis'>Top 5 Movies</h2>
              <div className='flex space-x-2'>
                {userInfo?.favoriteMovies?.map((movie: any) => (
                  <TopUserMovies key={movie?.id} poster={movie?.primaryImage?.url} />
                ))}
              </div>

              <h2 className='mb-3 font-medium tracking-eight text-high-emphasis'>Top 5 TV shows</h2>
              <div className='flex space-x-2'>
                {userInfo?.favoriteShows?.map((show: any) => (
                  <TopUserShows key={show?.id} poster={show?.primaryImage?.url} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const UserPosts = ({ userId }: any) => {
  const [userDiscussions, setUserDiscussions] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { user, idToken } = useUserContext();

  useEffect(() => {
    const fetchUserDiscussions = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/discussions/${userId}`,
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
    <div className='mx-auto mb-12 flex max-w-[343px] flex-col gap-6 md:max-w-none md:flex-row md:gap-[20px] lg:gap-[40px]'>
      {userDiscussions?.map((discussion: any) => (
        <div className='flex flex-col'>
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
        </div>
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
