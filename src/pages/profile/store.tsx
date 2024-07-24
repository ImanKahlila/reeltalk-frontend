import React, { useState } from 'react';

import {
  DisplayName,
  UserImage,
} from '@/components/profile/shared/UserDetails';
import { ChevronDown, ChevronLeft, ChevronUp } from 'lucide-react';
import { Transaction } from '@/components/profile/store/Transaction';
import Link from 'next/link';
import Shop from '@/components/profile/store/Shop';
import { usePlanSelectionContext } from '@/lib/planSelectionContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function StorePage() {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const { amountToPay } = usePlanSelectionContext();
  const [expandHistory, setExpandHistory]=useState(true);

  const handleHistory=()=>{
    setExpandHistory(prevState => !prevState)
  }
  //TODO: Integrate Clear All API
  const handleClearAll=()=>{

  }
  //TODO: Integrate transaction API
  const histories = [{
    date: 'feb 22',
    gems: 100,
    type: 'credit',
    reason: 'Your join “The Best Closers of ',
  }
    , {
      date: 'feb 14',
      gems: 100,
      type: 'debit',
      reason: 'Your join “The Best Closers of ',
    },
  ];

  return (
    <section className="mx-4 my-[1.438rem] flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
      <div className="flex flex-col space-y-2 gap-4 lg:w-[700px]">
        <Link href={`/profile/view`} className="flex text-high-emphasis text-2xl">
          <ChevronLeft className="mt-1" />Store
        </Link>
        <div className="flex items-center">
          <UserImage imageUrl={userInfo?.imageUrl} />
          <div className="px-[32px]">
            <DisplayName displayName={userInfo?.displayName} />
            <div className="text-medium-emphasis mt-2">Status: {userInfo?.premiumStatus}</div>
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
      <div className="flex flex-col mt-8 border-2 w-[320px] h-full text-pure-white bg-second-surface border-transparent rounded-xl bg-opacity-50 p-2 pb-10">
        <div className="flex flex-row relative mx-4">
          <div className="flex flex-col">
            <p className="font-semibold">Balance</p>
            <p className="text-2xl">
              {userInfo.gems}
              <span role="img" aria-label="diamond" className="ml-1">💎</span>
            </p>
          </div>
          <div className="absolute flex flex-row top-0 right-0">
            History
            {expandHistory ?
              <ChevronUp className="mx-2" onClick={handleHistory} /> :
              <ChevronDown className="mx-2" onClick={handleHistory} />}
          </div>
          {expandHistory && <div
            className="absolute flex flex-row bottom-0 right-0 mr-2 text-dark-red text-sm" onClick={handleClearAll}>Clear
            all</div>}
        </div>
        <div>
          {expandHistory && histories.map((history, index) => (
            <Transaction key={index} transaction={history} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

