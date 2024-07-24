import React, { useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '@/lib/context';
import { useRouter } from 'next/router';

import ProfileTabBar from '@/components/profile/ProfileTabBar';

import Image from 'next/image';
import Link from 'next/link';
import {
  DisplayName,
  UserImage,
} from '@/components/profile/shared/UserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setError, setLoading, setUserInfo } from '@/redux/userReducer';

export default function ProfilePage() {
  const { idToken } = useUserContext();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);

  const router = useRouter();
  const userId = router.query.userId;
  // const userId= userInfo?.uid;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            // `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/profile/${userId}`,
            `http://localhost:8080/api/user/profile/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            },
          );
          const userData = response.data.data;
          dispatch(setUserInfo(userData))
        }
      } catch (error) {
        dispatch(setError(error))
      } finally {
        dispatch(setLoading(false))
      }
    };

    fetchUserDetails();
  }, [idToken, userId]);
  const formatFirestoreTimestamp = (timestamp:any) => {
    if (!timestamp || typeof timestamp._seconds !== 'number' || typeof timestamp._nanoseconds !== 'number') {
      return 'Invalid Date';
    }

    // Convert Firestore timestamp to a JavaScript Date object
    const dateObject = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);

    // Check if the date is valid
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
  };

  return (
    <section className='mx-4 my-[1.438rem] flex flex-col justify-center gap-4 lg:flex-row lg:gap-8'>
      <div className='flex flex-col gap-4 lg:w-[900px]'>
        <div className='flex items-center'>
            <UserImage imageUrl={userInfo?.imageUrl}/>
          <div className="px-[32px]">
            <DisplayName displayName={userInfo?.displayName}/>
            <div className="flex items-center py-3">
              <p
                className="text-medium-emphasis md:text-[16px]">📍 {userInfo?.location}</p>
              {/* <p className='text-medium-emphasis md:text-[16px]'>📍 {userInfo?.location}</p> */}
              <span
                className="px-2 text-medium-emphasis md:text-[20px]">•</span>
              {/*<p className='text-medium-emphasis md:text-[16px] '>🎂 April 23, 2001</p>*/}
              {<p className="text-medium-emphasis md:text-[16px] ">
                🎂 {formatFirestoreTimestamp(userInfo?.birthday)}
              </p>}
            </div>
            <div>
              <p
                className="text-medium-emphasis md:text-[16px]">{userInfo?.bio}</p>
            </div>
            <div className="flex space-x-2">
              <Link href={`/profile/${userId}/edit-profile`}
                className="min-w-[140px] rounded-lg border-2 bg-high-emphasis p-2 text-center tracking-[0.08px] text-black"
              >
                <span>Edit Profile</span>
              </Link>
              <Link href={`/profile/${userId}/store`}
                className="min-w-[140px] rounded-lg border-2 border-pure-white p-2 text-center tracking-[0.08px] text-pure-white flex items-center"
              >
                <div className="relative w-5 h-5">
                  <Image
                    src="/Profile/statusIcon.png"
                    layout="fill"
                    alt="status"
                  />
                </div>
                <span className="ml-2">Status: Basic</span>
              </Link>
            </div>
          </div>
        </div>
        <ProfileTabBar userId={userId}/>
      </div>
    </section>
  );
}
