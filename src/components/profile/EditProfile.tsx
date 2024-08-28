import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/redux/selectors';
import {
  BadgeProps, isPremiumOrPlatinumUser,
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
import axios from 'axios';
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
  const {selectedLocation,handleLocationSelect,searchKey,locations,handleInputChange} = useLocationHandler();

  // const location = useField('text', userInfo?.location, { required: true });
  const bio = useField('text', userInfo?.bio, { required: false });
  const { birthdayValid,inputChangeHandler,isValueModified:isDobModified,yearValue, monthValue, dayValue } =
    useValidateBirthday(userInfo?.birthday);

  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  let data;
  useEffect(() => {
    // Check if any of the values have changed
    const isChanged =
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
    console.log("yearValue, monthValue, dayValue",yearValue, monthValue, dayValue);
    const { year, month, day } = extractDateValues(yearValue, monthValue, dayValue);
    console.log("year, month, day",year, month, day);
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
          <>
            <div
              className="flex flex-col items-center justify-center p-5 mt-4 rounded ">
              <h3 className="text-high-emphasis">Edit your profile</h3>
              <div className="relative w-20 h-20 mt-4">
                <ProfileImage imageUrl={imageUrl} />
                <Pencil
                  className="absolute bottom-0 right-0 rounded-full text-xs bg-pure-white p-1" />
              </div>
               {/*TO-DO: Add functionality to update photo  */}
              <div className="text-sm underline text-medium-emphasis">
                Change Photo
              </div>
            </div>
            <div className="relative p-4 flex-auto mx-10">
              {isPremiumOrPlatinumUser() &&
              <div className="justify-start text-pure-white">Background
                <CustomBackground badgeSelection={handleBadgeSelection}
                                  selectedBadge={selectedBadge}
                                  layout="single-line" />
              </div>
              }
              <div className="flex flex-row space-x-20">
                <div className="flex flex-col">
                  <label className="block text-sm mb-1 text-pure-white">Display
                    Name</label>
                  <input
                    id="display-name"
                    value={displayName.value}
                    onChange={displayName.onChange}
                    className="px-3 py-2 rounded-md bg-secondary text-medium-emphasis placeholder-disabled focus:outline-none"
                    placeholder="Display Name"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="block text-sm mb-1 text-pure-white">Location</label>
                  <input
                    className="px-3 py-2 rounded-md bg-secondary text-medium-emphasis placeholder-disabled focus:outline-none"
                    placeholder="Your location"
                    value={searchKey}
                    onChange={handleInputChange}
                  />
                  {locations && locations.results.length > 0 && selectedLocation === null ? (
                    <ul
                      className="bg-second-surface mt-0 p-0 rounded text-pure-white relative z-10">
                      <ScrollArea
                        className="bg-second-surface mt-0 p-0 rounded text-pure-white h-[30px] overflow-auto scroll-smooth">
                        {locations.results.map((location, index) => (
                          <li key={index} className="p-2 cursor-pointer" onClick={() => handleLocationSelect(location)}>
                            {location}
                          </li>
                        ))}
                      </ScrollArea>
                    </ul>
                  ) : ''}
                </div>

              </div>
              <div className="flex flex-row space-x-20 mt-5">
                <div className="flex flex-col">
                  <label
                    className="block text-sm m-1 text-pure-white">Bio</label>
                  <textarea
                    id="bio"
                    value={bio.value}
                    onChange={bio.onChange}
                    className="px-3 py-2 rounded-md bg-secondary text-medium-emphasis placeholder-disabled focus:outline-none"
                    placeholder="Bio"
                  />
                </div>
                <div className="flex flex-col">
                  <label
                    className="block text-sm mb-1 text-pure-white">Birthday</label>
                  <Inputs inputChangeHandler={inputChangeHandler} dob={userInfo?.birthday}/>
                </div>
            </div>
            </div>
            <div
              className="flex flex-col items-center justify-end p-2 rounded-lg mx-10 mb-4">
              <Link
                href={`/profile/view`}
                className={`min-w-[300px] rounded-lg bg-primary p-2 text-center tracking-[0.08px] text-black ${!isSaveEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={isSaveEnabled ? handleSave : undefined}
              >
                <span>Save</span>
              </Link>
            </div>
          </>
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
              className="border-0 rounded-lg relative flex flex-col bg-second-surface">
              {/*header*/}
              <button
                className="absolute top-0 right-0 mt-2 mr-2 text-medium-emphasis text-xl"
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