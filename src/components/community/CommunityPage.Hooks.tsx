import { useState, useEffect } from 'react';
import { useUserContext } from '@/lib/context';

// Firebase
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import app from '@/firebase/firebase-config';
const db = getFirestore(app);
import axios from 'axios';

export const useRetrieveJoinedCommunites = () => {
  const { user, idToken } = useUserContext();
  const [userData, setUserData] = useState<any>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<any>([]);
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
    if (!userData) return;
    async function retrieveJoinedCommunities() {
      const joinedCommunities = userData.joinedCommunities;
      const joinedDataArray: any[] = [];
      try {
        await Promise.all(
          joinedCommunities.map(async (communityId: string) => {
            let response = await axios.get(`http://localhost:8080/communities/${communityId}`, {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            });
            joinedDataArray.push(response.data.communityData);
          }),
        );
      } catch (error: any) {
        // Handle error if needed
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
