import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/redux/selectors';
import {
  BadgeProps,
  ProfileImage,
} from '@/components/profile/shared/UserDetails';
import { Pencil } from 'lucide-react';
import CustomBackground from '@/components/profile/shared/CustomBackground';
import { useField } from '@/hooks/Input';
import Inputs from '@/components/onboarding/personalize/birthday/Inputs';
import {
  useValidateBirthday
} from '@/components/onboarding/personalize/birthday/Birthday.hooks';
import Link from 'next/link';
import { fetchUserProfile } from '@/redux/userActions';
import { useUserContext } from '@/lib/context';
import { AppDispatch } from '@/redux/store';
import useLocationHandler from '@/hooks/useLocationHandler';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Timestamp } from 'firebase/firestore';
import {
  extractDateValues
} from '@/components/onboarding/personalize/birthday/Birthday';
import { isExists } from 'date-fns';
import toast from 'react-hot-toast';
import { useUserInfo } from '@/hooks/useUserInfo';
import axios from 'axios';

interface EditProfileProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ showModal, setShowModal }) => {
  const userInfo = useSelector(selectUser);
  const { user, idToken } = useUserContext();
  const dispatch: AppDispatch = useDispatch();
  const imageUrl = userInfo?.imageUrl;
  const badge:BadgeProps['badge'] = userInfo?.badge;
  const [selectedBadge,setSelectedBadge]=useState<BadgeProps['badge']>(badge);
  const displayName = useField('text', userInfo?.displayName, { required: true });
  const userName = useField('text', userInfo?.name, { required: true });

  const {selectedLocation,handleLocationSelect,searchKey,locations,handleInputChange} = useLocationHandler();

  // const location = useField('text', userInfo?.location, { required: true });
  const bio = useField('text', userInfo?.bio, { required: false });
  const { birthdayValid,inputChangeHandler,isValueModified:isDobModified,yearValue, monthValue, dayValue } =
    useValidateBirthday(userInfo?.birthday);
  const { isBadgeAllowed } = useUserInfo();
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const maxLength = 200;
  const isLimitExceeded = bio.length > maxLength;
  let data;
  useEffect(() => {
    // Check if any of the values have changed
    const isChanged =
      userName.value!== userInfo?.name ||
      displayName.value !== userInfo?.displayName ||
      selectedLocation !== userInfo?.location ||
      bio.value !== userInfo?.bio || isDobModified ||
      selectedBadge !== badge;

    setIsSaveEnabled(isChanged);
  }, [displayName.value, selectedLocation, bio.value,isDobModified, selectedBadge, userInfo]);


  const handleBadgeSelection=(badge:any)=>{
    setSelectedBadge(badge)
  }
  const handleSave=async () => {
    const { year, month, day } = extractDateValues(yearValue, monthValue, dayValue);
    if (!birthdayValid || !isExists(year, month, day))
    {
      toast.error('Birthday date is invalid.');
      return
    }
    const birthday = Timestamp.fromDate(new Date(year, month, day))

     data = {
      'badge': selectedBadge,
      'displayName':displayName.value,
      'location':selectedLocation,
      'birthday':{
        _seconds: birthday.seconds,
        _nanoseconds: birthday.nanoseconds,
      },
      'bio':bio.value
    }
    // Update user profile with the selected badge
    const response = await axios.post(
      `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/setProfile`,
      // `http://localhost:8080/api/user/setProfile`,
      data, {
        headers: { Authorization: `Bearer ${idToken}` },
      },
    );
    if (response.status !== 200) {
      throw new Error('Failed to update user profile');
    }
    if(user?.uid)
      dispatch(fetchUserProfile(user?.uid,idToken));    setShowModal(false)
  }
  const renderContent = () => {
        return (
          <div className="w-[825px]">
            <div
              className="flex flex-col items-center justify-center p-5 mt-4 rounded">
              <h3 className="text-high-emphasis text-xl">Edit your profile</h3>
              <div className="relative w-16 h-16 mt-4">
                <ProfileImage imageUrl={imageUrl} size={60} />
                {/*TO-DO: Add functionality to update photo */}
                <div
                  className="absolute bottom-1 right-2 flex items-center justify-center w-4 h-4 bg-pure-white rounded-full">
                  <Pencil className="w-2 h-2 text-gray-600" />
                </div>
              </div>
            </div>
            <div className="relative px-4 flex-auto mx-10">
              <div
                className={`rounded justify-start text-pure-white pt-1 ${!isBadgeAllowed ? 'bg-black bg-opacity-60 opacity-50' : ''}`}>
                <label className="mx-2">
                  Background
                </label>
                <div className="mx-4 flex flex-row">
                  <CustomBackground badgeSelection={handleBadgeSelection}
                                    selectedBadge={selectedBadge}
                                    layout="single-line" size={40}/>


                </div>
              </div>

              <div className="flex flex-row space-x-10 mt-2">
                <div className="flex flex-col w-1/2">
                  <label className="block text-sm mb-1 text-pure-white">
                    User Name
                  </label>
                  <label className="block text-xs mb-1 text-medium-emphasis">This
                    user name will show on your profile</label>
                  <input
                    id="user-name"
                    value={userName.value}
                    onChange={userName.onChange}
                    className="px-3 py-2 rounded-lg bg-secondary text-high-emphasis placeholder-disabled focus:outline-none"
                    placeholder="User Name"
                  />
                </div>
                <div className="flex flex-col w-1/2 relative">
                  <label
                    className="block text-sm mb-1 text-pure-white">Location</label>
                  <label className="block text-xs mb-1 text-medium-emphasis">This
                    helps us recommend localized content</label>

                  <input
                    className={`px-3 py-2 ${selectedLocation !== null ? 'rounded' : 'rounded-t-lg'} bg-secondary text-high-emphasis placeholder-disabled focus:outline-none`}
                    placeholder="Your location"
                    value={searchKey}
                    onChange={handleInputChange}
                  />
                  {locations && locations.results.length > 0 && selectedLocation === null ? (
                    <ul
                      className="absolute top-full left-0 w-full bg-third-surface mt-0 p-0 text-pure-white z-50 shadow-lg">
                      <ScrollArea
                        className="bg-third-surface mt-0 p-0 rounded-b text-pure-white h-[161px] overflow-auto scroll-smooth">
                        {locations.results.map((location, index) => (
                          <li key={index}
                              className="p-1 cursor-pointer border-b border-b-white border-opacity-10"
                              onClick={() => handleLocationSelect(location)}>
                            <div className="ml-2">
                              {location}
                            </div>
                          </li>
                        ))}
                      </ScrollArea>
                    </ul>
                  ) : null}

                </div>
              </div>

              <div className="flex flex-row space-x-10 mt-2">
                <div className="flex flex-col w-1/2">
                  <label className="block text-sm mb-1 text-pure-white">
                    Display Name (Optional)
                  </label>
                  <label className="block text-xs mb-1 text-medium-emphasis">This does not change your user name</label>
                  <input
                    id="display-name"
                    value={displayName.value}
                    onChange={displayName.onChange}
                    className="px-3 py-2 rounded-lg bg-secondary text-high-emphasis placeholder-disabled focus:outline-none"
                    placeholder="Display Name"
                  />
                </div>
                <div className="flex flex-col w-1/2">
                  <label
                    className="block text-sm mb-1 text-pure-white">Birthday</label>
                  <label className="block text-xs mb-1 text-medium-emphasis">This helps us recommend age-appropriate content</label>

                  <div>
                  <Inputs inputChangeHandler={inputChangeHandler}
                          dob={userInfo?.birthday} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col ">
                <label
                  className="block text-sm text-pure-white">Bio</label>
                <label className="block text-xs mb-1 text-medium-emphasis">Who
                  are you?</label>
                <textarea
                  id="bio"
                  value={bio.value}
                  onChange={bio.onChange}
                  className="px-3 py-2 rounded-lg bg-secondary text-high-emphasis placeholder-disabled focus:outline-none"
                  placeholder="Bio"
                  data-maxlength="200"
                  rows={4}
                />
                <label
                  className={`block text-xs mt-2 mb-1 ${isLimitExceeded ? 'text-red-500' : 'text-medium-emphasis'}`}
                >
                  Character Limitation: {bio.length}/{maxLength}
                </label>

              </div>
            </div>
            <div
              className="flex flex-col items-center justify-end p-2 rounded-lg mx-10 mb-4">
              <Link
                href={`/profile/view`}
                className={`min-w-[250px] rounded-lg bg-primary p-2 text-center tracking-[0.08px] text-black ${!isSaveEnabled || isLimitExceeded? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={isSaveEnabled ? handleSave : undefined}
              >
                <span>Done</span>
              </Link>
            </div>
          </div>
        )
  };
  return (
    <>
      {showModal && (
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative max-w-6xl">
            {/*content*/}
            <div
              className="border-0 rounded-2xl relative flex flex-col bg-second-surface">
              {/*header*/}
              <button
                className="absolute top-0 right-4 mt-2 mr-2 text-medium-emphasis text-2xl"
                onClick={() => setShowModal(false)}
              >
                x
              </button>
              {renderContent()}
            </div>
          </div>
        </div>
      )}
      {showModal &&
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>}
    </>
  );
}
export default EditProfile