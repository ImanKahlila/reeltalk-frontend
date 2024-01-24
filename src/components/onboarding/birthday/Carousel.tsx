import React, { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from '../../ui/skeleton';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';

const posters = [
  'https://m.media-amazon.com/images/M/MV5BMzcwYjEwMzEtZTZmMi00ZGFhLWJhZjItMDAzNDVkNjZmM2U5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
  'https://m.media-amazon.com/images/M/MV5BMTkzOGVmN2EtMjI0ZS00NjMxLThmNmUtZDg3ZjAyNzdlODg0XkEyXkFqcGdeQXVyNDI3NjU1NzQ@._V1_.jpg',
  'https://m.media-amazon.com/images/M/MV5BNzQxMDQ1NjA4N15BMl5BanBnXkFtZTcwNTE5MjQ3OA@@._V1_.jpg',
  'https://m.media-amazon.com/images/M/MV5BMjA2NTI1Mzg3N15BMl5BanBnXkFtZTcwMjYwNjAzMg@@._V1_FMjpg_UX1000_.jpg',
  'https://m.media-amazon.com/images/I/81J+55WHlNL._AC_UF894,1000_QL80_.jpg',
  'https://m.media-amazon.com/images/M/MV5BNDk0OTM1Mzk3M15BMl5BanBnXkFtZTgwNDg2NjIyMDE@._V1_.jpg',
  'https://m.media-amazon.com/images/M/MV5BMzcwYjEwMzEtZTZmMi00ZGFhLWJhZjItMDAzNDVkNjZmM2U5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
  'https://m.media-amazon.com/images/M/MV5BMTkzOGVmN2EtMjI0ZS00NjMxLThmNmUtZDg3ZjAyNzdlODg0XkEyXkFqcGdeQXVyNDI3NjU1NzQ@._V1_.jpg',
  'https://m.media-amazon.com/images/M/MV5BNzQxMDQ1NjA4N15BMl5BanBnXkFtZTcwNTE5MjQ3OA@@._V1_.jpg',
  'https://m.media-amazon.com/images/M/MV5BMjA2NTI1Mzg3N15BMl5BanBnXkFtZTcwMjYwNjAzMg@@._V1_FMjpg_UX1000_.jpg',
  'https://m.media-amazon.com/images/I/81J+55WHlNL._AC_UF894,1000_QL80_.jpg',
  'https://m.media-amazon.com/images/M/MV5BNDk0OTM1Mzk3M15BMl5BanBnXkFtZTgwNDg2NjIyMDE@._V1_.jpg',
];

const Carousel = () => {
  // Settings for Slider
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    speed: 15000,
    autoplaySpeed: 1000,
    cssEase: 'linear',
    swipe: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3.5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className='mx-auto mt-10 flex max-w-[536px] flex-col gap-3 rounded-lg bg-first-surface p-6 pb-[30px]'>
      <h2 className='mb-4 text-center font-semibold text-high-emphasis'>
        We love our birthday movies 🎉
      </h2>
      <Slider {...settings} aria-label='Bikes Gallery'>
        {posters.map((poster, index) => (
          <Poster key={index} imageUrl={poster} />
        ))}
      </Slider>
    </div>
  );
};

interface PosterProps {
  imageUrl: string;
}

const Poster = ({ imageUrl }: PosterProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    // When the image is loaded, set the state to indicate that the image is ready
    setImageLoaded(true);
  };
  return (
    <picture className='relative block h-[109.092px] w-[72px]'>
      <Image
        src={imageUrl}
        onLoad={handleImageLoad}
        onError={handleImageLoad}
        fill
        sizes='(max-width: 72px) 100vw, 72px'
        alt='poster'
        className={` max-w-[72px] ${!imageLoaded ? 'invisible' : 'visible'}`}
      ></Image>
      {!imageLoaded && <Skeleton className='h-[109.092px] w-[72px] rounded-none' />}
    </picture>
  );
};

export default Carousel;
