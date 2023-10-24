import React from 'react';
import Image from 'next/image';

const ValueSection = () => {
    return (
        <section className='bg-pure-white py-36'>
            {/* Value 1 Container */}
            <div className='mx-auto flex max-w-sm flex-col items-center justify-between md:max-w-[960px] md:flex-row'>
                {/* Image */}
                <div className='relative left-1 min-h-[647px] min-w-[326px]'>
                    <Image
                        src={'/LandingPage/Value-Discover.png'}
                        fill
                        alt=''
                    ></Image>
                </div>

                {/* Content */}
                <header className='max-w-[462px] text-center md:text-left'>
                    <h2 className='text-4xl font-semibold'>
                        Discover engaging content
                    </h2>
                    <p className='mt-[10px] text-xl font-medium'>
                        Content tailored for you so you can find engaging
                        content about films and TV shows.
                    </p>
                </header>
            </div>

            {/* Value 2 Container */}
            <div className='mx-auto mt-24 flex w-full max-w-sm flex-col items-center justify-between overflow-x-hidden md:max-w-[960px] md:flex-row-reverse'>
                {/* Image */}
                <div className='relative left-1 min-h-[647px] min-w-[326px]'>
                    <Image
                        src={'/LandingPage/Value-Conversations-1.png'}
                        fill
                        alt=''
                    ></Image>
                    <Image
                        src={'/LandingPage/Value-Conversations-2.png'}
                        height={479.22}
                        width={400}
                        alt=''
                        className='absolute -left-8 top-20 min-h-[479.22px] min-w-[400px]'
                    ></Image>
                </div>

                {/* Content */}
                <header className='max-w-[462px] text-center md:text-right'>
                    <h2 className='text-4xl font-semibold'>
                        Have reel conversations
                    </h2>
                    <p className='mt-[10px] text-xl font-medium'>
                        Engage in lively discussions about your favorite movies
                        and TV shows.
                    </p>
                </header>
            </div>

            {/* Value 3 Container */}
            <div className='mx-auto mt-24 flex max-w-sm flex-col items-center justify-between md:max-w-[960px] md:flex-row'>
                {/* Image */}
                <div className='relative left-1 min-h-[506.08px] min-w-[265.17px]'>
                    <Image
                        src={'/LandingPage/placeholder-phone.png'}
                        fill
                        alt=''
                    ></Image>
                </div>

                {/* Content */}
                <header className='mt-8 max-w-[462px] text-center md:text-left'>
                    <h2 className='text-4xl font-semibold'>Find your niche</h2>
                    <p className='mt-[10px] text-xl font-medium'>
                        Start or join vibrant communities that will unleash
                        meaningful and engaging chats.
                    </p>
                </header>
            </div>
        </section>
    );
};

export default ValueSection;
