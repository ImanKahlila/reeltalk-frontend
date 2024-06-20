import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '@/lib/context';
import { useRouter } from 'next/router';

import ProfileTabBar from '@/components/profile/ProfileTabBar';

import UserImg from '@/assets/user.png';
import Image from 'next/image';

export default function ProfilePage() {
  const { user, idToken } = useUserContext();

  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const router = useRouter();
  const userId = router.query.userId;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/profile/${userId}`,
            // `http://localhost:8080/backend/api/user/profile/${userId}`,
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
  }, [idToken, userId]);

  const formatFirestoreTimestamp = (timestamp:any) => {
    if (!timestamp || !timestamp._seconds || !timestamp._nanoseconds) {
      return 'Invalid Date';
    }

    // Convert Firestore timestamp to a JavaScript Date object
    const dateObject = new Date(
      timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000
    );

    const isDateValid = !isNaN(dateObject.getTime());

    // Format the birthday if it's valid
    const formattedBirthday = isDateValid
      ? dateObject.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
      : 'Invalid Date';
  return formattedBirthday;
  }
  const formatDisplayName = (name:string) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };


  return (
    <section className='mx-4 my-[1.438rem] flex flex-col justify-center gap-4 lg:flex-row lg:gap-8'>
      <div className='flex flex-col gap-4 lg:w-[900px]'>
        <div className='flex items-center'>
          <div className='flex h-[100px] w-[100px] items-center'>
            <Image src={userInfo?.imageUrl ?? UserImg} width={100} height={100}  alt={''} className='h-[100px] w-[100px] rounded-full' />
          </div>
          <div className='px-[32px]'>
            <div>
              <h1 className='text-high-emphasis md:text-[36px]'>{formatDisplayName(userInfo?.displayName)}</h1>
            </div>
            <div className='flex items-center py-3'>
              <p className='text-medium-emphasis md:text-[16px]'>📍 {userInfo?.location}</p>
              {/* <p className='text-medium-emphasis md:text-[16px]'>📍 {userInfo?.location}</p> */}
              <span className='px-2 text-medium-emphasis md:text-[20px]'>•</span>
              {/*<p className='text-medium-emphasis md:text-[16px] '>🎂 April 23, 2001</p>*/}
              { <p className='text-medium-emphasis md:text-[16px] '>
                🎂 {formatFirestoreTimestamp(userInfo?.birthday)}
              </p> }
            </div>
            <div>
              <p className='text-medium-emphasis md:text-[16px]'>{userInfo?.bio}</p>
            </div>
          </div>
        </div>
        <ProfileTabBar userId={String(userId)} />
      </div>
    </section>
  );
}
