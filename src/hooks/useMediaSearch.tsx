import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const backend_URL = 'https://us-central1-reeltalk-app.cloudfunctions.net/api';

const useMediaSearch = (titleType: 'movie' | 'tvSeries' | null) => {
  const [queryMedia, setQueryMedia] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);

  const searchMedia = (queryParam: string) => {
    if (!queryParam) {
      setQueryMedia([]);
      return;
    }

    // Create an array to store the promises for the two Axios requests
    const promises = [
      axios.post(`${backend_URL}/movies/search`, {
        input: queryParam,
        titleType: titleType,
        info: 'base_info',
      }),
      axios.post(`${backend_URL}/movies/search`, {
        input: queryParam,
        titleType: titleType,
        info: 'creators_directors_writers',
      }),
    ];

    setFetching(true);

    Promise.all(promises)
      .then(([moviesResponse, creditsResponse]) => {
        const moviesData = moviesResponse.data;
        const creditsData = creditsResponse.data;

        // Create a new array to store the mapped values
        const mappedArray = [];

        if (moviesData.length === creditsData.length) {
          for (let i = 0; i < moviesData.length; i++) {
            const movieValue = moviesData[i];

            const directorName = creditsData[i].directors[0]?.credits[0]?.name.nameText.text;
            const creatorName = creditsData[i].creators[0]?.credits[0]?.name.nameText.text;

            const mappedValue = {
              ...movieValue,
              directorName,
              creatorName,
            };

            mappedArray.push(mappedValue);
          }

          // Filter and sort the mappedArray
          const filteredAndSortedArray = mappedArray
            .filter(
              (media: any) => media.primaryImage !== null && media.ratingsSummary.voteCount > 300,
            )
            .sort((a: any, b: any) => b.ratingsSummary.voteCount - a.ratingsSummary.voteCount);

          setQueryMedia(filteredAndSortedArray);
        }
      })
      .catch((error: any) => {
        if (error.message == 'Request failed with status code 500') {
          toast.error('Server error, please try again later');
        } else {
          toast.error(error.message);
        }
      })
      .finally(() => setFetching(false));
  };

  return { queryMedia, fetching, searchMedia };
};

export default useMediaSearch;
