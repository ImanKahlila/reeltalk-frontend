import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Modal() {
  const [showModal, setShowModal] = useState(true);
  const [currentPage, setCurrentPage] = useState('page-1');
  const router = useRouter();
  const { userId } = router.query;
  const renderContent = () => {
    switch (currentPage) {
      case 'page-1':
        return (
          <>
            <div
              className="flex flex-col items-center justify-center p-5 mt-4 rounded">
              <div className="relative w-20 h-20 mt-4">
                <Image
                  src="/Profile/payment/confetti.png"
                  layout="fill"
                  alt="status"
                />
              </div>
              <h3 className="text-xl">
                Congratulations 🎉
              </h3>
            </div>
            <div className="relative p-4 flex-auto">
              <p
                className="ml-8 mr-8 text-center justify-center text-medium-emphasis text-sm">
                Welcome to Premium! Now you can enjoy premium benefits
                like custom background, complimentary gems, and more.
                Thank you for supporting Reel Talk.
              </p>
            </div>
            <div
              className="flex flex-col items-center justify-end p-2 rounded-lg">
              <Link href={`/profile/${userId}/edit-profile`}
                    className="min-w-[140px] rounded-lg bg-primary p-2 text-center tracking-[0.08px] text-black">
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
          <>
            <div
              className="flex flex-col items-center justify-between p-5 mt-4 rounded">
              <h3 className="text-2xl">
                Page 2 Content
              </h3>
            </div>
            <div className="flex flex-col items-center justify-end p-2 rounded-lg">
              <button
                className="px-6 py-3 rounded text-sm text-high-emphasis"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {showModal && (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg relative flex flex-col w-3/5 bg-second-surface">
              {/*header*/}
              <button
                className="absolute top-0 right-0 mt-2 mr-2 text-medium-emphasis text-xl"
                onClick={() => setShowModal(false)}
              >
                x
              </button>
              {renderContent()}
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
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>}
    </>
  );
}
