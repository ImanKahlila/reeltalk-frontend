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

const backend_URL = 'https://us-central1-reeltalk-app.cloudfunctions.net/backend';
// const backend_URL = 'http://localhost:8080';

const useLocationSearch = (initialKey: string) => {
  const [errorFetching, setErrorFetching] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<ResponseData>({ results: [] });

  useEffect(() => {
    const source = axios.CancelToken.source(); // Create a cancel token source

    async function retrieveSuggestedLocation(key: string) {
      try {
        if (key !== '') {
          const body: ReqBody = { key, scrollCount: 0, limit: 30 };
          const response = await axios.post(`${backend_URL}/locations`, body, {
            headers: {
              'Content-Type': 'application/json',
            },
            cancelToken: source.token // Pass the cancel token to the request
          });

          if (response.status !== 200) {
            setErrorFetching(true);
            return;
          }

          setLocationSuggestions(response.data);
        } else {
          // Clear suggestions when input is empty
          setLocationSuggestions({ results: [] });
        }
      } catch (error: any) {
        if (!axios.isCancel(error)) {
          setErrorFetching(true);
          console.log(error.message);
        }
      }
    }

    retrieveSuggestedLocation(initialKey);

    return () => {
      source.cancel('Operation canceled by cleanup'); // Cancel request on cleanup
    };
  }, [initialKey]);

  const clearSuggestions = () => {
    setLocationSuggestions({ results: [] });
  };

  return { locations: locationSuggestions, errorFetching, clearSuggestions };
};

export default useLocationSearch;
