import React from 'react';
import Image from 'next/image';

const ValueSection = () => {
  return (
    <section className='bg-pure-white md:px-4'>
      {/* Value 1 Container */}
      <div className='mx-auto max-w-[292px] py-5 pb-32 md:max-w-none md:pt-32'>
        <div className='mx-auto flex max-w-sm flex-col items-center justify-between md:max-w-[960px] md:flex-row'>
          {/* Image */}
          <picture className='relative block aspect-[128/227] w-[90%] md:max-w-[293px]'>
            <Image src={'/LandingPage/Value-Discover.png'} fill alt=''></Image>
          </picture>
          {/* Content */}
          <header className='max-w-[462px] text-center text-secondary md:text-left'>
            <h2 className='text-[22px] font-semibold tracking-[-0.11px] md:text-4xl md:tracking-[-0.54px]'>
              Discover engaging content
            </h2>
            <p className='mt-2 text-[17px] tracking-normal md:text-xl'>
              Content tailored for you so you can find engaging content about films and TV shows.
            </p>
          </header>
        </div>

        {/* Value 2 Container */}
        <div className='mx-auto mt-[84px] flex max-w-sm flex-col items-center justify-between md:max-w-[960px] md:flex-row-reverse'>
          {/* Image */}
          <picture className='relative block aspect-[128/227] w-[90%] md:max-w-[293px]'>
            <Image src={'/LandingPage/Value-Conversations.png'} fill alt=''></Image>
          </picture>
          {/* Content */}
          <header className='max-w-[462px] text-center text-secondary md:text-left'>
            <h2 className='text-[22px] font-semibold tracking-[-0.11px] md:text-4xl md:tracking-[-0.54px]'>
              Have reel conversations
            </h2>
            <p className='mt-2 text-[17px] tracking-normal md:text-xl'>
              Engage in lively discussions about your favorite movies and Tv shows.
            </p>
          </header>
        </div>

        {/* Value 3 Container */}
        <div className='mx-auto mt-[84px] flex max-w-sm flex-col items-center justify-between md:max-w-[960px] md:flex-row'>
          {/* Image */}
          <picture className='relative block aspect-[128/227] w-[90%] md:max-w-[293px]'>
            <Image src={'/LandingPage/Value-Niche.png'} fill alt=''></Image>
          </picture>
          {/* Content */}
          <header className='max-w-[462px] text-center text-secondary md:text-left'>
            <h2 className='text-[22px] font-semibold tracking-[-0.11px] md:text-4xl md:tracking-[-0.54px]'>
              Find your niche
            </h2>
            <p className='mt-2 text-[17px] tracking-normal md:text-xl'>
              Start or join vibrant communities that will unleash meaningful and engaging chats.
            </p>
          </header>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;
