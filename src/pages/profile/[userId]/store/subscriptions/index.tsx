import React from 'react';
import { useRouter } from 'next/router';
import { DisplayName, UserImage } from '@/components/profile/shared/UserDetails';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { PaymentBox } from '@/components/profile/store/PaymentBox';
import Shop from '@/components/profile/store/Shop';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function SubscriptionsPage() {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const { userId } = router.query;

  return (
    <section className="mx-4 my-[1.438rem] flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
      <div className="flex flex-col space-y-2 gap-4 pl-20 w-full">
        <Link href={`/profile/${userId}/store`}
              className="flex text-high-emphasis text-2xl">
          <ChevronLeft className="mt-1" />Subscriptions
        </Link>
        <div className="flex flex-row space-x-8">
          <div className="flex flex-col w-2.5/5">
            <div className="flex items-center">
              <UserImage imageUrl={userInfo?.imageUrl} />
              <div className="px-[32px]">
                <div className="flex flex-row text-high-emphasis">
                  <DisplayName displayName={userInfo?.displayName} />
                  <p
                    className="text-sm flex flex-wrap">💎{userInfo?.gems}</p>
                </div>
                <div
                  className="text-medium-emphasis mt-2">Status: {userInfo?.status}</div>
              </div>
            </div>
            <div className="">
              <PaymentBox />
            </div>
          </div>
          <div className="">
            <Shop compactView={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
