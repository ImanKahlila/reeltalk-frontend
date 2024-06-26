import { useEffect, useState } from 'react';

export type Genre = {
  name: string;
  selected: boolean;
  id: string;
  emoji: string;
}[];

export const useGetGenres = (initialGenres: Genre) => {
  const [genres, setGenres] = useState<Genre>([]);
  const [filteredGenres, setFilteredGenres] = useState<Genre>([]);

  // Tracks number of selected genres
  const totalSelected = calculateTotalSelected(genres);

  function toggleSelectedGenre(id: string, newVal: boolean) {
    if (totalSelected < 3 || !newVal) {
      setGenres(prevState =>
        prevState.map(genre => (genre.id === id ? { ...genre, selected: newVal } : genre)),
      );
      setFilteredGenres(genres);
    }
  }

  useEffect(() => {
    async function retrieveGenres() {
      let genres = initialGenres.map(genre => {
        return { ...genre, selected: false };
      });
      setGenres(genres);
      setFilteredGenres(genres);
    }
    retrieveGenres();
  }, [initialGenres]);

  return {
    genres,
    filteredGenres,
    totalSelected,
    setFilteredGenres,
    setGenres,
    toggleSelectedGenre,
  };
};

// Helper
const calculateTotalSelected = (genres: Genre) => {
  return genres.reduce((accumulator, currentValue) => {
    return currentValue.selected ? accumulator + 1 : accumulator;
  }, 0);
};
