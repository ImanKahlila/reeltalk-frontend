import { useState, useEffect } from 'react';
import { useUserContext } from '@/lib/context';

// Firebase
import { Timestamp, doc, getDoc, getFirestore, DocumentData } from 'firebase/firestore';
import app from '@/firebase/firebase-config';
const db = getFirestore(app);
import axios from 'axios';

import { ICommunityObject } from '@/pages/community/[communityId]';

interface UserData {
  agreedToGuideline: boolean;
  birthday: Timestamp;
  createdCommunities: string[];
  displayName: string;
  joinedCommunities: string[];
  top5Movies: any[];
  top5Shows: any[];
  topGenres: string[];
}

export const useRetrieveJoinedCommunites = () => {
  const { user, idToken } = useUserContext();
  const [userData, setUserData] = useState<UserData | DocumentData | null>(null);
  // console.log(userData); //TODO: Figure out why this re renders 5 times
  const [joinedCommunities, setJoinedCommunities] = useState<ICommunityObject[]>([]);
  const [fetchingJoinedCommunities, setFetchingingJoinedCommunities] = useState(true);

  useEffect(() => {
    async function retrieveUserData() {
      if (!user) return;

      try {
        const docRef = doc(db, `/users/${user.uid}`);
        const docSnapShot = await getDoc(docRef);
        if (!docSnapShot.exists()) return;

        setUserData(docSnapShot.data());
      } catch (error: any) {
        console.log(error.message);
      }
    }

    retrieveUserData();
  }, [user]);

  useEffect(() => {
    async function retrieveJoinedCommunities() {
      if (!userData) return;
      const joinedCommunities = userData.joinedCommunities;
      const joinedDataArray: ICommunityObject[] = [];
      try {
        await Promise.all(
          joinedCommunities.map(async (communityId: string) => {
            let response = await axios.get(
              `https://us-central1-reeltalk-app.cloudfunctions.net/api/communities/${communityId}`,
              {
                headers: {
                  Authorization: `Bearer ${idToken}`,
                },
              },
            );
            joinedDataArray.push(response.data.communityData);
          }),
        );
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setJoinedCommunities(joinedDataArray);
        setFetchingingJoinedCommunities(false);
      }
    }

    retrieveJoinedCommunities();
    // eslint-disable-next-line
  }, [user, userData]);

  return { joinedCommunities, fetchingJoinedCommunities };
};

export const useRetrievePopularCommunities = () => {
  const { idToken } = useUserContext();
  const [popularCommunities, setPopularCommunities] = useState<ICommunityObject[]>([]);
  const [fetchingPopularCommunities, setFetchingPopularCommunties] = useState(true);

  useEffect(() => {
    async function retrievePopularCommunities() {
      try {
        let response = await axios.get(
          'https://us-central1-reeltalk-app.cloudfunctions.net/api/communities',
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );
        setPopularCommunities(response.data);
      } catch (error: any) {
        // Handle error
      } finally {
        setFetchingPopularCommunties(false);
      }
    }

    retrievePopularCommunities();
  }, [idToken]);
  return { popularCommunities, fetchingPopularCommunities };
};
