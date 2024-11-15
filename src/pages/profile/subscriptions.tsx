import React from 'react';
import {
  Name,
  Status,
  UserImageWithBadge,
} from '@/components/profile/shared/UserDetails';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Shop from '@/components/profile/store/Shop';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import PaymentBoxWithElements from '@/components/profile/store/PaymentBox';

export default function SubscriptionsPage() {
  const { userInfo } = useSelector((state: RootState) => state.user);

  return (
    <section className="mx-4 my-[1.438rem] flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
      <div className="flex flex-col space-y-2 gap-4 pl-20">
        <Link href={`/profile/store`}
              className="flex text-high-emphasis text-2xl">
          <ChevronLeft className="mt-1" />Subscriptions
        </Link>
        <div className="flex flex-row space-x-8">
          <div className="flex flex-col w-2.5/5">
            <div className="flex items-center">
              <UserImageWithBadge />
              <div className="px-[32px]">
                <div className="flex flex-row justify-between items-center text-high-emphasis">
                  <Name/>
                  <p
                    className="text-sm ml-2 bg-second-surface">💎{userInfo?.gems}</p>
                </div>
                <div
                  className="text-medium-emphasis mt-2"><Status/></div>
              </div>
            </div>
              <PaymentBoxWithElements />
          </div>
          <div className="">
            <Shop compactView={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
