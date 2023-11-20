import React from 'react';

interface Props {
    className?: string;
}

const PlusIcon = ({ className }: Props) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='26'
            height='26'
            viewBox='0 0 26 26'
            fill='none'
            className={className}
        >
            <path
                d='M1 13H25M13 1V25'
                stroke='white'
                strokeOpacity='0.92'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
            />
        </svg>
    );
};

export default PlusIcon;
