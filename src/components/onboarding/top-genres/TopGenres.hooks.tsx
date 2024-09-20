import { useEffect, useState } from 'react';

export type Genre = {
  name: string;
  selected: boolean;
  id: string;
  emoji: string;
}[];


export const useGetGenres = (initialGenres: Genre,favoriteGenre?:Genre) => {
  const [genres, setGenres] = useState<Genre>([]);
  const [filteredGenres, setFilteredGenres] = useState<Genre>([]);

  // Tracks number of selected genres
  const totalSelected = calculateTotalSelected(genres);
  const top3Genres = genres
    .filter(genre => genre.selected)
    .map(({ name, id, emoji }) => ({ name, id, emoji }))
  function toggleSelectedGenre(id: string, newVal: boolean) {
    if (totalSelected < 5 || !newVal) {
      setGenres(prevState =>
        prevState.map(genre => (genre.id === id ? { ...genre, selected: newVal } : genre)),
      );
      setFilteredGenres(genres);
    }
  }

  useEffect(() => {
    async function retrieveGenres() {
      let genres = initialGenres.map(genre => {
        const isSelected = favoriteGenre?.some((fav) => fav.id === genre.id) ?? false;
        return { ...genre, selected: isSelected };      });
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
    top3Genres
  };
};

// Helper
const calculateTotalSelected = (genres: Genre) => {
  return genres.reduce((accumulator, currentValue) => {
    return currentValue.selected ? accumulator + 1 : accumulator;
  }, 0);
};