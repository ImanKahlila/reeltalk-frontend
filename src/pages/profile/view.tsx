import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/lib/context';

import ProfileTabBar from '@/components/profile/ProfileTabBar';

import Image from 'next/image';
import Link from 'next/link';
import {
  Gems,
  Name, Status,
  UserImageWithBadge,
} from '@/components/profile/shared/UserDetails';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchUserProfile } from '@/redux/userActions';
import { useRouter } from 'next/router';
import EditProfile from '@/components/profile/EditProfile';

export default function ProfilePage() {
  const { user,idToken } = useUserContext();
  const dispatch: AppDispatch = useDispatch();
  const { userInfo } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const userId= user?.uid;
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    if (userId && idToken) {
      dispatch(fetchUserProfile(userId,idToken));
    }
    }, [idToken, userId,dispatch]);

  useEffect(() => {
    if (router.query.redirectedFrom === 'specificPage') {
      setShowEditProfile(true);
    }
  }, [router.query]);

  return (
    <section className="mx-4 my-[1.438rem] flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
      <div className="flex flex-col gap-4 lg:w-[900px]">
        <div className="flex items-center">
          <UserImageWithBadge/>
          <div className="flex flex-col px-[32px]">
            <div className="flex flex-row"><Name /> <p className="justify-items-center ml-4 text-medium-emphasis mt-2 text-sm">💎 <Gems /></p></div>
            <div className="flex items-center py-3 text-sm">
              <p
                className="text-medium-emphasis  md:text-[16px]">🏆 {userInfo?.profileLevel}</p>
              <p
                className="text-medium-emphasis ml-4  md:text-[16px]">📍 {userInfo?.location}</p>
              {/*<span*/}
              {/*  className="px-2 text-medium-emphasis md:text-[20px]">•</span>*/}
              {/*<p className="text-medium-emphasis md:text-[16px] ">*/}
              {/*  🎂 {formattedBirthday(userInfo?.birthday)}*/}
              {/*</p>*/}
            </div>
            <div className="">
              <p
                className="text-medium-emphasis md:text-[16px]">{userInfo?.bio}</p>
            </div>
            <div className="flex space-x-2 cursor-pointer mt-2"
                 onClick={() => setShowEditProfile(true)}>
              <div
                // href="/profile/edit"
                className="min-w-[170px] rounded-lg border-2 bg-high-emphasis p-2 text-center tracking-[0.08px] text-black"
              >
                <span>Edit Profile</span>
              </div>
              <Link href="/profile/store"
                    className="min-w-[170px] rounded-lg border-2 border-pure-white p-2 text-center tracking-[0.08px] text-pure-white flex items-center cursor-pointer"
              >
                <div className="relative w-5 h-5">
                  <Image
                    src="/Profile/statusIcon.png"
                    layout="fill"
                    sizes="1005"
                    alt="status"
                  />
                </div>
                <span className="ml-2"><Status /></span>
              </Link>
            </div>
          </div>
        </div>
        <ProfileTabBar/>
      </div>
      {showEditProfile ? (
        <EditProfile showModal={showEditProfile}
                     setShowModal={setShowEditProfile} />
      ) : null}
    </section>
  );
}
