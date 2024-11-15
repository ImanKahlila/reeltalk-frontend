import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '@/redux/selectors';
import axios from 'axios';
import { useUserContext } from '@/lib/context';
import { fetchUserProfile } from '@/redux/userActions';
import { AppDispatch } from '@/redux/store';
import {
  BadgeProps,
} from '@/components/profile/shared/UserDetails';
import CustomBackground from '@/components/profile/shared/CustomBackground';
import { GEM, SUBSCRIPTION } from '@/components/profile/Constants';

interface ModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  planChosen: any;
}

const Modal: React.FC<ModalProps> = ({ showModal, setShowModal, planChosen }) => {
  const [currentPage, setCurrentPage] = React.useState('page-1');
  const userInfo = useSelector(selectUser);
  const { user, idToken } = useUserContext();
  const dispatch: AppDispatch = useDispatch();
  const userStatus = userInfo?.premiumStatus;
  const badge: BadgeProps['badge'] = userInfo?.badge;

  const [selectedBadge, setSelectedBadge] = useState<BadgeProps['badge']>(badge);

  const handleBadgeSelection = (badge: any) => {
    setSelectedBadge(badge);
  };

  const handleSave = async () => {
    const response = await axios.post(
      `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/set-badge`,
      // `http://localhost:8080/api/user/set-badge`,
      {
        'badge': selectedBadge,
      },
      {
        headers: { Authorization: `Bearer ${idToken}` },
      }
    );
    if (response.status !== 200) {
      throw new Error('Failed to update user profile');
    }
    if (user?.uid)
      dispatch(fetchUserProfile(user?.uid, idToken));
    setShowModal(false);
  };

  const renderSubscriptionContent = () => {
    switch (currentPage) {
      case 'page-1':
        return (
          <>
            <div className="flex flex-col items-center justify-center p-5 mt-4 rounded">
              <div className="relative w-20 h-20 mt-4">
                <Image
                  src="/Profile/payment/confetti.png"
                  fill
                  sizes="100%"
                  alt="status"
                />
              </div>
              <h3 className="text-xl">Congratulations 🎉</h3>
            </div>
            <div className="relative p-4 flex-auto">
              <p className="px-6 text-center text-medium-emphasis text-sm max-w-[400px] overflow-hidden text-ellipsis">
                Welcome to Premium! Now you can enjoy premium benefits
                like custom background, complimentary gems, and more.
                Thank you for supporting Reel Talk.
              </p>
            </div>
            <div className="flex flex-col items-center justify-end p-2 rounded-lg">
              <Link
                href={`/profile/view`}
                className="min-w-[140px] rounded-lg bg-primary p-2 text-center tracking-[0.08px] text-black"
                onClick={() => setCurrentPage('page-2')}
              >
                <span>Continue</span>
              </Link>
              <button
                className="px-6 py-3 rounded text-sm text-high-emphasis"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Skip
              </button>
            </div>
          </>
        );
      case 'page-2':
        return (
          <div>
            <div className="flex flex-col items-center justify-center pt-5 mt-4 rounded">
              <h3 className="text-xl">You are now {userStatus} status</h3>
            </div>
            <div className="relative p-4">
              <p className="ml-10 mr-8 text-center justify-center text-medium-emphasis text-sm">
                Want to start using a custom profile background now?
              </p>
            </div>
            <CustomBackground badgeSelection={handleBadgeSelection} selectedBadge={selectedBadge} layout="grid" />
            <div className="flex flex-col items-center justify-end p-2 rounded-lg mx-10">
              <Link
                href={`/profile/view`}
                className="min-w-[300px] rounded-lg bg-primary p-2 text-center tracking-[0.08px] text-black"
                onClick={() => handleSave()}
              >
                <span>Save</span>
              </Link>
              <button
                className="px-6 py-3 rounded text-sm text-high-emphasis"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Skip
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderGemsContent = () => {
    return (
      <div className="flex flex-col items-center justify-center p-5 mt-4 rounded">
        <div className="relative w-20 h-20 mt-4">
          <Image
            src="/Profile/payment/gem.png"
            fill
            sizes="100%"
            alt="Gems"
          />
        </div>
        <h3 className="text-xl"> {planChosen.gems} Gems</h3>
        <div className="relative p-4 flex-auto">
          <p className="px-6 text-center text-medium-emphasis text-sm max-w-[400px] overflow-hidden text-ellipsis">
            Congrats on purchasing {planChosen.gems} Gems. You can now award Gems to other users, lists, and join some exclusive private groups. Thank you for supporting our wonderful community!
          </p>
        </div>
        <div className="flex flex-col items-center justify-end p-2 rounded-lg">
          <Link
            href={`/profile/view`}
            className="min-w-[140px] rounded-lg bg-primary p-2 text-center tracking-[0.08px] text-black"
            onClick={() => setShowModal(false)}
          >
            <span>Okay</span>
          </Link>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (planChosen.type === SUBSCRIPTION) {
      return (
        <>
          {renderSubscriptionContent()}
          <div className="flex justify-center mt-2 mb-4">
            <button
              className={`w-2 h-2 ${currentPage === 'page-1' ? 'bg-primary' : 'bg-white'} rounded-full mx-1`}
              onClick={() => setCurrentPage('page-1')}
            ></button>
            <button
              className={`w-2 h-2 ${currentPage === 'page-2' ? 'bg-primary' : 'bg-white'} rounded-full mx-1`}
              onClick={() => setCurrentPage('page-2')}
            ></button>
          </div>
        </>
      );
    } else if (planChosen.type === GEM) {
      return renderGemsContent();
    }
    return null;
  };

  return (
    <>
      {showModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative mx-auto max-w-3xl">
            <div className="border-0 rounded-lg relative flex flex-col bg-second-surface">
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
      {showModal && <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>}
    </>
  );
};

export default Modal;
