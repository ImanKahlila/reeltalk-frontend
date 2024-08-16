import React from 'react';

import {
  Name, Status,
  UserImageWithBadge,
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
        <div className="flex flex-row justify-between">
        <Link href={`/profile/view`} className="flex text-high-emphasis text-2xl">
          <ChevronLeft className="mt-1" />Store
        </Link>
        {/* Proceed to pay button */}
        <Link href={`/profile/subscriptions`} className="flex justify-end mt-4">
          <button disabled={amountToPay <= 0} className={`mr-2 text-black px-4 py-2 rounded-lg  ${amountToPay <= 0 ? 'opacity-60 cursor-not-allowed bg-medium-emphasis text-white' : 'bg-primary'}`}>
            Proceed to Payment
          </button>
        </Link>
        </div>
        <div className="flex items-center">
          <UserImageWithBadge/>
          <div className="px-[32px]">
            <Name/>
            <div className="text-medium-emphasis mt-2"><Status/></div>
          </div>
        </div>
        <Shop/>
      </div>
      <TransactionHistory/>
    </section>
  );
};

