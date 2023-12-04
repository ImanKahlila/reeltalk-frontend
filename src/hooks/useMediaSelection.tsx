import { useState } from 'react';
import suggestedMovies from '@/lib/suggestedMovies';
import suggestedShows from '@/lib/suggestedShows';

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

const useMediaSelection = (mediaType: 'movies' | 'series') => {
  const suggestedMedia = mediaType === 'movies' ? suggestedMovies : suggestedShows;

  const [media, setMedia] = useState<Media>(suggestedMedia);
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
  return { media, floaterSelection, addSelectionHandler, removeSelectionHandler };
};

export default useMediaSelection;
