import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '@/lib/context';
import { useRouter } from 'next/router';

import {
  DisplayName,
  UserImage,
} from '@/components/profile/shared/UserDetails';
import { ChevronLeft, ChevronUp } from 'lucide-react';

export default function ProfilePage() {
  const { user, idToken } = useUserContext();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const userId = router.query.userId;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            // `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/profile/${userId}`,
            `http://localhost:8080/api/user/profile/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            },
          );
          const userData = response.data.data;
          setUserInfo(userData);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [idToken, userId]);

  const memberBenefits: string[] = [
    '100 💎 Free Gems/month',
    'Access to Premium Content 👑',
    'Special Buff Badge 🏅',
    'Custom Profile Background ✏️',
    'Premium User Support'
  ];

  const gemUses: string[] = [
    'Join special communities 💬',
    'Award to lists 🎥',
    'Awards to users 🎖️ '
  ];

  const subscriptionTiers = [
    {
      name: 'Premiere',
      billing: 'Monthly',
      total: 4.99,
      monthly: ''
    },
    {
      name: 'Platinum',
      billing: 'Annual',
      total: 49.99,
      monthly: 4.16
    }
  ];

  const gemBundles = [
    {
      gems: 100,
      price: 4.99,
      discount: 'Basic'
    },
    {
      gems: 500,
      price: 19.99,
      discount: '(20%+ Cheaper)'
    },
    {
      gems: 1000,
      price: 39.99,
      discount: '(20%+ Cheaper)'
    }
  ];

  const histories=[{
    date:"feb 22",
    gems:100,
    type:"credit",
    reason:"Your join “The Best Closers of "
  }
  // ,{
  //   date:"feb 14",
  //   gems:100,
  //   type:"debit",
  //   reason:"Your join “The Best Closers of "
  // }
  ]
  const isCredit = (type:string)=>{
    return type === "credit"
  }
  const CircleIcon = () => (
    <span className="absolute left-0 top-0 h-full flex items-center justify-center">
      <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
    </span>
  );

  return (
    <section
      className="mx-4 my-[1.438rem] flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
      <div className="flex flex-col space-y-2 gap-4 lg:w-[700px]">
        <div className="flex text-high-emphasis text-lg">
          <ChevronLeft></ChevronLeft>Store
        </div>
        <div className="flex items-center">
          <UserImage imageUrl={userInfo?.imageUrl} />
          <div className="px-[32px]">
            <DisplayName displayName={userInfo?.displayName} />
            <div
              className="text-medium-emphasis mt-2">Status: {userInfo?.status}</div>
          </div>
        </div>
        <div className="flex flex-row space-x-6">
          <div
            className="flex flex-col space-y-2 text-pure-white mt-2 text-sm w-[320px]">
            <div>
              Premium Member benefits
              <div>
                <ul
                  className="h-[170px] list-disc border-2 justify-center bg-second-surface border-primary rounded-xl mt-2 mb-2 p-2">
                  {memberBenefits.map((benefit, index) => (
                    <li key={index}
                        className="mt-2 ml-2 flex items-center text-left relative pl-6">
                      <CircleIcon />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              Subscription Tiers
              <div className="flex flex-row space-x-4">
                {subscriptionTiers.map((tier) => (
                  <div
                    key={tier.name}
                    className="flex flex-col w-1/2 items-center justify-center bg-second-surface border-2 border-transparent rounded-xl mt-2 p-2 text-center"
                  >
                    <p className="text-lg">{tier.name}</p>
                    <p className="text-xs">{tier.billing}</p>
                    <p
                      className="text-primary font-bold text-lg mt-2">${tier.total}</p>
                    {tier.monthly && (
                      <p className="text-xs">(${tier.monthly}/month)</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="flex flex-row text-pure-white items-center mt-2 text-left relative pl-6 text-sm">
              <CircleIcon />
              Automatic monthly renewal with the option to cancel at any time.
            </div>
          </div>
          <div
            className="flex flex-col space-y-4 text-pure-white mt-2 text-sm w-[350px]">
            <div>
              Why do I need Gems?
              <ol
                className="h-[170px] list-decimal border-2 justify-center bg-second-surface border-transparent rounded-xl mt-2 p-4 list-inside">
                {gemUses.map((benefit, index) => (
                  <li key={index} className="mt-2 ml-2 items-center text-left">
                    <span>{benefit}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2>Gem Bundles</h2>
              <div className="flex flex-row space-x-4">
                {gemBundles.map((bundle, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-start bg-second-surface border-2 border-transparent rounded-xl mt-2 w-[120px] text-center relative p-2"
                  >
                    {index === 0 && (
                      <span role="img" aria-label="diamond"
                            className="text-3xl mb-2">💎</span>
                    )}
                    {index === 1 && (
                      <div className="relative mb-2">
                        <span role="img" aria-label="diamond"
                              className="text-3xl absolute">💎</span>
                        <span role="img" aria-label="diamond"
                              className="text-3xl absolute left-[20px]">💎</span>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="relative mb-2 justify-center items-center">
                        <span role="img" aria-label="diamond"
                              className="text-3xl absolute">💎</span>
                        <span role="img" aria-label="diamond"
                              className="text-3xl absolute left-[20px]">💎</span>
                        <span role="img" aria-label="diamond"
                              className="text-3xl absolute left-[40px]">💎</span>
                      </div>
                    )}
                    <p className="text-lg mt-8">{bundle.gems}</p>
                    <p
                      className="text-sm text-high-emphasis">{bundle.discount}</p>
                    <div
                      className="flex-grow w-full h-full bg-white bg-opacity-20 rounded-b-xl text-primary font-bold text-lg">
                      ${bundle.price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
      <div
        className="flex flex-col border-2 w-[300px] h-full text-pure-white bg-second-surface border-transparent rounded-xl bg-opacity-25">
        <div className="flex flex-row relative">
          <div className="flex flex-col">
            <p className="">Balance</p>
            <p className="text-2xl"> {userInfo.gems}
              <span role="img" aria-label="diamond">💎</span>
            </p>
          </div>
          <div className="absolute flex flex-row top-0 right-0">
            History
            <ChevronUp />
          </div>
          <div className="absolute flex flex-row bottom-0 right-0 mr-2 text-dark-red text-sm">Clear all</div>
        </div>
        <div>
          {histories.map((history, index) => (
            <div
              key={index}
              className="flex flex-row items-center text-sm bg-second-surface border-transparent rounded-l mt-2 p-2 text-center"
            >
              <div className="w-10">
                <p className="flex flex-wrap">{history.date.toUpperCase()}</p>
              </div>
              <div className="flex-grow text-center">
                You {isCredit(history.type) ? "recharge" : "spent"} {history.gems}💎
              </div>
              <div className="w-15 text-right">
                <p className={`flex flex-wrap ${isCredit(history.type) ? 'text-dark-green' : 'text-dark-red'}`}>
                  {isCredit(history.type) ? "+" : "-"} {history.gems}💎
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
