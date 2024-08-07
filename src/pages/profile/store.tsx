import React from 'react';

import {
  Name, Status,
  ProfileImage,
} from '@/components/profile/shared/UserDetails';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import Shop from '@/components/profile/store/Shop';
import { usePlanSelectionContext } from '@/lib/planSelectionContext';
import TransactionHistory from '@/components/profile/store/TransactionHistory';

export default function StorePage() {
  const { amountToPay } = usePlanSelectionContext();

  return (
    <section className="mx-4 my-[1.438rem] flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
      <div className="flex flex-col space-y-2 gap-4 lg:w-[700px]">
        <Link href={`/profile/view`} className="flex text-high-emphasis text-2xl">
          <ChevronLeft className="mt-1" />Store
        </Link>
        <div className="flex items-center">
          <ProfileImage/>
          <div className="px-[32px]">
            <Name/>
            <div className="text-medium-emphasis mt-2"><Status/></div>
          </div>
        </div>
        <Shop/>
        {/* Proceed to pay button */}
        <Link href={`/profile/subscriptions`} className="flex justify-end mt-4">
          <button disabled={amountToPay <= 0} className={`bg-primary text-black px-4 py-2 rounded-lg ${amountToPay <= 0 ? 'opacity-50 cursor-not-allowed' : 'bg-primary'}`}>
            Proceed to pay
          </button>
        </Link>
      </div>
      <TransactionHistory/>
    </section>
  );
};

