import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserContext } from '@/lib/context';


export const useRetrieveRecommendedLists = () => {
    const { idToken } = useUserContext();
    const [recommendedLists, setRecommendedLists] =  useState<any[]>([]);
    const [fetchingRecommendedLists, setFetchingRecommendedLists] = useState(true);

  useEffect(() => {
    async function retrieveRecommendedLists() {
      try {
        let response = await axios.get(
        //   'https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/lists/recommended',
            'http://localhost:8080/api/lists/recommended',
          {
            headers: {
              Authorization: `Bearer ${idToken}`, 
            },
          }
        );
    
        setRecommendedLists(response.data.data); 
        console.log('Response data:', response.data.data);
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
