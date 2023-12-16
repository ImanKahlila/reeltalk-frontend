import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '@/lib/context';

export type Genre = {
  name: string;
  selected: boolean;
  id: string;
  emoji: string;
}[];

const backend_URL = 'https://us-central1-reeltalk-app.cloudfunctions.net/api/api';
// const backend_URL = 'http://localhost:8080';

export const useGetGenres = () => {
  const [genres, setGenres] = useState<Genre>([]);
  const [filteredGenres, setFilteredGenres] = useState<Genre>([]);
  const [errorFetching, setErrorFetching] = useState(false);

  // Tracks number of selected genres
  const totalSelected = calculateTotalSelected(genres);

  function toggleSelectedGenre(id: string, newVal: boolean) {
    if (totalSelected < 5 || !newVal) {
      setGenres(prevState =>
        prevState.map(genre => (genre.id === id ? { ...genre, selected: newVal } : genre)),
      );
      setFilteredGenres(genres);
    }
  }

  const { idToken } = useUserContext();

  useEffect(() => {
    async function retrieveGenres() {
      let response;
      try {
        response = await axios.get(`${backend_URL}/movies/getPossibleGenres`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
      } catch (error: any) {
        setErrorFetching(true);
        console.log(error.message);
      }
      let data = response?.data;
      let genres = data?.data.genres.map((genre: Genre) => {
        return { ...genre, selected: false };
      });
      if (response?.status !== 200) return;
      setGenres(genres);
      setFilteredGenres(genres);
    }
    retrieveGenres();
  }, [idToken]);

  return {
    genres,
    filteredGenres,
    totalSelected,
    setFilteredGenres,
    setGenres,
    toggleSelectedGenre,
    errorFetching,
  };
};

// Helper
const calculateTotalSelected = (genres: Genre) => {
  return genres.reduce((accumulator, currentValue) => {
    return currentValue.selected ? accumulator + 1 : accumulator;
  }, 0);
};
