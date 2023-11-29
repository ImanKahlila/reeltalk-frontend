const suggestedShows = [
  {
    id: 1,
    selected: false,
    title: 'Breaking Bad',
    releaseYear: '2008-2013',
    poster:
      'https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg',
  },
  {
    id: 2,
    selected: false,
    title: 'Band of Brothers',
    releaseYear: 2001,
    poster:
      'https://m.media-amazon.com/images/M/MV5BMTI3ODc2ODc0M15BMl5BanBnXkFtZTYwMjgzNjc3._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 3,
    selected: false,
    title: 'Chernobyl',
    releaseYear: 2019,
    poster:
      'https://m.media-amazon.com/images/M/MV5BMmI2OTMxZTUtMTM5OS00MGNiLWFhNGMtYzJiODUwYjRmODA5XkEyXkFqcGdeQXVyMTM0NTc2NDgw._V1_.jpg',
  },
  {
    id: 4,
    selected: false,
    title: 'The Wire',
    releaseYear: '2002-2008',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZmY5ZDMxODEtNWIwOS00NjdkLTkyMjktNWRjMDhmYjJjN2RmXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_QL75_UX190_CR0,2,190,281_.jpg',
  },
  {
    id: 5,
    selected: false,
    title: 'The Sopranos',
    releaseYear: '1997-2007',
    poster:
      'https://m.media-amazon.com/images/M/MV5BNmU3MjkzZWQtOTk1Ni00OTNiLWJhMmMtNmEyN2JjZjUzZDUyXkEyXkFqcGdeQXVyNDIyNjA2MTk@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 6,
    selected: false,
    title: 'Game of Thrones',
    releaseYear: '2011-2017',
    poster:
      'https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 7,
    selected: false,
    title: 'Sherlock',
    releaseYear: '2010-2017',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMWEzNTFlMTQtMzhjOS00MzQ1LWJjNjgtY2RhMjFhYjQwYjIzXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg',
  },
  {
    id: 8,
    selected: false,
    title: 'The Office',
    releaseYear: '2005-2017',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg',
  },
  {
    id: 9,
    selected: false,
    title: 'Planet Earth II',
    releaseYear: '2016',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMGZmYmQ5NGQtNWQ1MC00NWZlLTg0MjYtYjJjMzQ5ODgxYzRkXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 10,
    selected: false,
    title: 'Planet Earth',
    releaseYear: '2006-2023',
    poster:
      'https://m.media-amazon.com/images/M/MV5BMzMyYjg0MGMtMTlkMy00OGFiLWFiNTYtYmFmZWNmMDFlMzkwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
  },
  {
    id: 11,
    selected: false,
    title: 'Avatar: The Last Airbender',
    releaseYear: '2005-2008',
    poster:
      'https://m.media-amazon.com/images/M/MV5BODc5YTBhMTItMjhkNi00ZTIxLWI0YjAtNTZmOTY0YjRlZGQ0XkEyXkFqcGdeQXVyODUwNjEzMzg@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 12,
    selected: false,
    title: 'Blue Planet II',
    releaseYear: 2017,
    poster:
      'https://m.media-amazon.com/images/M/MV5BNDZiNDllMTAtOTgxZi00NzNiLWFhNzUtOGUwZWZjZGNjZTMyXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg',
  },
  {
    id: 13,
    selected: false,
    title: 'Rick and Morty',
    releaseYear: '2013-',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg',
  },
  {
    id: 14,
    selected: false,
    title: 'Dragon Ball',
    releaseYear: 1986,
    poster:
      'https://m.media-amazon.com/images/M/MV5BYzI0YjYxY2UtNzRjNS00NTZiLTgzMDItNGEzMjU5MmE0ZWJmXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
  },
  {
    id: 15,
    selected: false,
    title: 'The Last Dance',
    releaseYear: 2020,
    poster:
      'https://m.media-amazon.com/images/M/MV5BY2U1ZTU4OWItNGU2MC00MTg1LTk4NzUtYTk3ODhjYjI0MzlmXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UX190_CR0,1,190,281_.jpg',
  },
  {
    id: 16,
    selected: false,
    title: 'Attack on Titan',
    releaseYear: '2013-2023',
    poster:
      'https://m.media-amazon.com/images/M/MV5BZWJlODhhYTEtZjg3YS00NjNmLTgwNTMtMjBmYTZhYjQzMDJkXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
  },
];

export default suggestedShows;
