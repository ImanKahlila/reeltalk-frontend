import React from 'react';
import Link from 'next/link';

// Define the props for the Buttons component
type ComponentProps = {
    valid?: boolean; // An optional boolean flag indicating whether the user can move to next step
    onPageSubmit?: () => void; // A optional function to handle page submission
    required?: boolean; // An optional boolean flag indicating if the page data is required
    nextPage?: string; // A required string representing the URL of the next page
    prevPage: string; // A required string representing the URL of the previous page
    lastStep?: boolean;
    className?: string;
};

const Buttons = ({
    valid = false,
    onPageSubmit,
    required = false,
    nextPage = '/',
    prevPage = '/',
    lastStep = false,
    className,
}: ComponentProps) => {
    return (
        <div
            className={`mx-auto mt-14 flex w-[340px] justify-between gap-5 text-base md:w-[544px] md:gap-8 ${
                className ? className : ''
            }`}
        >
            <Link
                href={prevPage}
                className='flex h-[44px] w-full min-w-[160px] items-center justify-center rounded-lg border-2 border-high-emphasis text-center font-semibold leading-normal tracking-[0.1px] text-pure-white md:h-[48px] md:min-w-[256px]'
            >
                Back
            </Link>
            {!required ? (
                valid ? (
                    <button
                        onClick={onPageSubmit}
                        className='w-full min-w-[160px] rounded-lg bg-primary font-semibold  leading-normal tracking-[0.08px] text-black md:min-w-[256px]'
                    >
                        {lastStep ? 'Done' : 'Next'}
                    </button>
                ) : (
                    <Link
                        href={nextPage}
                        className='flex h-[44px] w-full min-w-[160px] items-center justify-center rounded-lg border-2 border-high-emphasis text-center leading-normal tracking-[0.1px] text-pure-white md:h-[48px] md:min-w-[256px]'
                    >
                        Skip
                    </Link>
                )
            ) : valid ? (
                <button
                    onClick={onPageSubmit}
                    className='w-full min-w-[160px] rounded-lg bg-primary font-semibold leading-normal tracking-[0.08px]  text-black transition-colors duration-300 md:min-w-[256px]'
                >
                    {lastStep ? 'Done' : 'Next'}
                </button>
            ) : (
                <button className='w-full min-w-[160px] cursor-not-allowed rounded-lg bg-[#6d6d6d] p-[10px] font-medium tracking-[0.1px]  text-disabled md:min-w-[256px]'>
                    {lastStep ? 'Done' : 'Next'}
                </button>
            )}
        </div>
    );
};

export default Buttons;
