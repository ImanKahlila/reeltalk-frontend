import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '@/lib/context';
import { useRouter } from 'next/router';
import { DisplayName, UserImage } from '@/components/profile/shared/UserDetails';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { PaymentBox } from '@/components/profile/store/PaymentBox';
import Shop from '@/components/profile/store/Shop';

export default function SubscriptionsPage() {
  const { user, idToken } = useUserContext();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { userId, amount } = router.query; // Destructure userId and amount directly

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

  return (
    <section
      className="mx-4 my-[1.438rem] flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
      <div className="flex flex-col space-y-2 gap-4 pl-20">
        <Link href={`/profile/${userId}/store`}
              className="flex text-high-emphasis text-2xl">
          <ChevronLeft className="mt-1" />Subscriptions
        </Link>
        <div className="flex items-center">
          <UserImage imageUrl={userInfo?.imageUrl} />
          <div className="px-[32px]">
            <div className="flex flex-row text-high-emphasis">
              <DisplayName displayName={userInfo?.displayName} />
              <p
                className="text-sm text-center justify-center right-0 bottom-0">💎{userInfo?.gems}</p>
            </div>
            <div
              className="text-medium-emphasis mt-2">Status: {userInfo?.status}</div>
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="">
          <PaymentBox amount={amount} /></div>
          <div className="">
          <Shop></Shop>
          </div>
        </div>
      </div>
    </section>
  );
}
