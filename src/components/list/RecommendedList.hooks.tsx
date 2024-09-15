import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '@/lib/context';

interface IRecommendedList {
  id: string;
  name: string;
  genres: string[];
}

export const useRetrieveRecommendedLists = () => {
  const { idToken } = useUserContext(); 
  const [recommendedLists, setRecommendedLists] = useState<IRecommendedList[]>([]);
  const [fetchingRecommendedLists, setFetchingRecommendedLists] = useState(true);

  useEffect(() => {
    async function retrieveRecommendedLists() {
      try {
        let response = await axios.get(
          'https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/lists/recommended',
            // 'http://localhost:8080/api/lists/recommended',
          {
            headers: {
              Authorization: `Bearer ${idToken}`, // Pass token for authentication
            },
          }
        );
        setRecommendedLists(response.data); 
      } catch (error: any) {
        console.error("Error fetching recommended lists:", error);
      } finally {
        setFetchingRecommendedLists(false);
      }
    }

    retrieveRecommendedLists();
  }, [idToken]);

  return { recommendedLists, fetchingRecommendedLists };
};
