import { useState, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { useUserContext } from '@/lib/context';
import axios from 'axios';

const useJoinLeaveCommunity = (
  ownerId: string, // Community Creator Id
  isPublic: boolean,
  members: string[],
  communityId: string,
  joinRequests?: string[],
) => {
  const { user, idToken } = useUserContext();
  const isAdmin = user?.uid === ownerId;
  const [isMember, setIsMember] = useState(false);
  const [pendingJoin, setPendingJoin] = useState(false); // If u
  useEffect(() => {
    setIsMember(user ? members.includes(user.uid) : false);
    if (!joinRequests) return;
    setPendingJoin(user && !isPublic ? joinRequests.includes(user.uid) : false);
  }, [user, isPublic, joinRequests, members]);

  const [spinnerActive, setSpinnerActive] = useState(false);
  async function joinCommunityHandler() {
    if (!user || isAdmin) return;
    if (pendingJoin) {
      toast.error('Your request is pending for approval!', {
        id: 'pending',
        position: 'bottom-center',
      });
      return;
    }
    const API = `https://us-central1-reeltalk-app.cloudfunctions.net/api/communities/join-community/${communityId}`;
    let response: AxiosResponse;
    try {
      setSpinnerActive(true);
      if (isMember) {
        response = await axios.delete(API, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        setIsMember(false);
      } else {
        response = await axios.post(
          API,
          { userId: user?.uid },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );
        toast.success(response.data.message);
        if (!isPublic) {
          // Private
          setPendingJoin(true);
          return;
        }
        setIsMember(true);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setSpinnerActive(false);
    }
  }

  return { isAdmin, isMember, pendingJoin, spinnerActive, joinCommunityHandler };
};

export default useJoinLeaveCommunity;
