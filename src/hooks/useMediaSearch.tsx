import { useState, useRef } from 'react';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import toast from 'react-hot-toast';
import { useUserContext } from '@/lib/context';

// const backend_URL = 'https://us-central1-reeltalk-app.cloudfunctions.net/backend';
const backend_URL = 'http://localhost:8080';

const useMediaSearch = (titleType: 'movie' | 'tvSeries' | null) => {
  const [queryMedia, setQueryMedia] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);
  const { idToken } = useUserContext();
  const cancelTokenSource = useRef<CancelTokenSource | null>(null);

  const retrievePopularMedia = async () => {
    const mediaEndPoint = titleType==="movie"?"popular-movies":"popular-shows";
    try {
      const response = await axios.get(`${backend_URL}/movies/${mediaEndPoint}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data && response.data.data) {
        console.log(response.data.data);
        return  response.data.data.map((media: any) => ({
          id: media.id,
          selected: false,
          originalTitleText: { text: media.originalTitleText?.text },
          releaseYear: { year: media.releaseYear?.year },
          primaryImage: { url: media.primaryImage?.url },
          directorName: '',
          creatorName: '',
        }));
      } else {
        console.warn('Unexpected response structure:', response.data);
        return [];
      }
    } catch (error) {
      toast.error('Error retrieving popular media');
      return [];
    }
  };

  const searchMedia = async (queryParam: string) => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('Operation canceled due to new request.');
    }

    if (!queryParam) {
      const data = await retrievePopularMedia();
      setQueryMedia(data);
      return;
    }

    cancelTokenSource.current = axios.CancelToken.source();
    // Create an array to store the promises for the two Axios requests
    const promises: [Promise<AxiosResponse<any>>, Promise<AxiosResponse<any>>] = [
      axios.post(`${backend_URL}/movies/search`, {
        input: queryParam,
        titleType: titleType,
        info: 'base_info',
      },
        { cancelToken: cancelTokenSource.current.token }),
      axios.post(`${backend_URL}/movies/search`, {
        input: queryParam,
        titleType: titleType,
        info: 'creators_directors_writers',
      },
        { cancelToken: cancelTokenSource.current.token }),
    ];

    setFetching(true);
    try {
      const [moviesResponse, creditsResponse] = await Promise.all(promises);
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
    } catch (error: any) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        if (error.message == 'Request failed with status code 500') {
          toast.error('Server error, please try again later');
        } else {
          toast.error(error.message);
        }
      }
    } finally {
      setFetching(false);
    }
  };

  return { queryMedia, fetching, searchMedia };
};

export default useMediaSearch;
