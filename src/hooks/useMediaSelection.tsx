import { useEffect, useState } from 'react';
import { useUserContext } from '@/lib/context';

import axios from 'axios';

export type Media = {
  id: string;
  selected: boolean;
  title: string;
  releaseYear: number | string;
  poster: string;
}[];

export type FloaterSelection = {
  id: string;
  title: string;
  poster: string;
  isApi: boolean;
}[];

const backend_URL = 'https://us-central1-reeltalk-app.cloudfunctions.net/api/api';

const useMediaSelection = (mediaType: 'movies' | 'series') => {
  const { idToken } = useUserContext();
  const [errorFetching, setErrorFetching] = useState(false);

  useEffect(() => {
    async function retrieveSuggestedMedia() {
      try {
        let response;
        let mediaArray: Media;
        if (mediaType === 'movies') {
          response = await axios.get(`${backend_URL}/movies/getPossibleFilms`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });
          mediaArray = response.data.data.films;
        } else {
          response = await axios.get(`${backend_URL}/movies/getPossibleShows`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          });
          mediaArray = response.data.data.shows;
        }
        const mediaData = mediaArray.map(media => ({ ...media, selected: false }));
        if (response.status !== 200) return;
        setMedia(mediaData);
      } catch (error: any) {
        setErrorFetching(true);
        console.log(error.message);
      }
    }

    retrieveSuggestedMedia();
  }, [mediaType, idToken]);

  const [media, setMedia] = useState<Media>([]);
  const [floaterSelection, setFloaterSelection] = useState<FloaterSelection>([]);

  // Function to add a media selection
  function addSelectionHandler(
    id: string,
    title: string,
    poster: string, // poster Url
    isApi: boolean, // boolean flag indicating if media selection is from API
    newVal?: boolean, // boolean for suggestedMovies indicating if selected
  ) {
    if (!isApi && newVal) {
      // Updates the Suggested Movies
      setMedia(prev => {
        let newState = [...prev];
        let index = newState.findIndex(el => el.id === id);
        newState[index].selected = newVal;
        return newState;
      });
    }
    const selected = { id, title, poster, isApi };
    setFloaterSelection(prev => {
      let newState = [...prev];
      let index = newState.findIndex(el => el.id === id);
      if (index > -1) return newState; // If media already selected return prev state
      newState.push(selected);
      return newState;
    });
  }

  // Function to remove a media selection
  function removeSelectionHandler(
    id: string,
    newVal: boolean,
    isApi: boolean, // boolean flag indicating if media selection is from API
  ) {
    if (!isApi) {
      setMedia(prev => {
        let newState = [...prev];
        let index = newState.findIndex(el => el.id === id);
        newState[index].selected = newVal;
        return newState;
      });
    }
    setFloaterSelection(prev => {
      let newState = [...prev];
      let output = newState.filter(element => element.id !== id);
      return output;
    });
  }
  return { media, floaterSelection, addSelectionHandler, removeSelectionHandler, errorFetching };
};

export default useMediaSelection;
