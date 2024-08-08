import React, { useEffect } from 'react';
import { useUserContext } from '@/lib/context';

import ProfileTabBar from '@/components/profile/ProfileTabBar';

import Image from 'next/image';
import Link from 'next/link';
import {
  Name, Status,
  ProfileImage,
} from '@/components/profile/shared/UserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchUserProfile } from '@/redux/userActions';

export default function ProfilePage() {
  const { user,idToken } = useUserContext();
  const dispatch: AppDispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);

  const userId= user?.uid;

  useEffect(() => {
    if (userId && idToken) {
      dispatch(fetchUserProfile(userId,idToken));
    }
    }, [idToken, userId,dispatch]);
  const formatFirestoreTimestamp = (timestamp:any) => {
    if (!timestamp || typeof timestamp._seconds !== 'number' || typeof timestamp._nanoseconds !== 'number') {
      return 'Invalid Date';
    }

    // Convert Firestore timestamp to a JavaScript Date object
    const dateObject = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);

    // Check if the date is valid
    const isDateValid = !isNaN(dateObject.getTime());

    // Format the birthday if it's valid
    return isDateValid
      ? dateObject.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
      : 'Invalid Date';
  };

  return (
    <section className="mx-4 my-[1.438rem] flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
      <div className="flex flex-col gap-4 lg:w-[900px]">
        <div className="flex items-center">
          <ProfileImage/>
          <div className="px-[32px]">
            <Name/>
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
              <Link href="/profile/edit"
                    className="min-w-[140px] rounded-lg border-2 bg-high-emphasis p-2 text-center tracking-[0.08px] text-black"
              >
                <span>Edit Profile</span>
              </Link>
              <Link href="/profile/store"
                    className="min-w-[140px] rounded-lg border-2 border-pure-white p-2 text-center tracking-[0.08px] text-pure-white flex items-center"
              >
                <div className="relative w-5 h-5">
                  <Image
                    src="/Profile/statusIcon.png"
                    layout="fill"
                    sizes="1005"
                    alt="status"
                  />
                </div>
                <span className="ml-2"><Status/></span>
              </Link>
            </div>
          </div>
        </div>
        <ProfileTabBar/>
      </div>
    </section>
  );
}
