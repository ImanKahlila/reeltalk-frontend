import { useEffect, useState } from 'react';
import axios from 'axios';

export type ReqBody = {
  key: string;
  scrollCount: number;
  limit: number;
};

type ResponseData = {
  results: string[];
};
const backend_URL = 'https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/movies/getPossibleGenres';
  // const backend_URL = 'http://localhost:8080';

const useLocationSelection = (key: string) => {
  const [errorFetching, setErrorFetching] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<ResponseData>({ results: [] });

  useEffect(() => {
    async function retrieveSuggestedLocation() {
      try {
        if (key !== '') {
          const body: ReqBody = { key, scrollCount: 0, limit: 30 };
          const response = await axios.post(`${backend_URL}/locations`, body, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.status !== 200) {
            setErrorFetching(true);
            return;
          }

          setLocationSuggestions(response.data);
        }
      } catch (error: any) {
        setErrorFetching(true);
        console.log(error.message);
      }
    }

    retrieveSuggestedLocation();
  }, [key]);

  return { locations: locationSuggestions, errorFetching };
};

export default useLocationSelection;
