import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '@/lib/context';
import { useRouter } from 'next/router';

export default function StorePage() {
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


  return (
    <section className="mx-4 my-[1.438rem] flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
      <div className="flex flex-col space-y-2 gap-4 lg:w-[700px] text-high-emphasis">
       Edit Profile Section
      </div>
    </section>
  );
};

