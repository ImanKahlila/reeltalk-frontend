import React from 'react';

interface MyComponentProps {
    className: string;
}

const UserIcon = ({ className }: MyComponentProps) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='12'
            height='14'
            viewBox='0 0 12 14'
            fill='none'
            className={className}
        >
            <path
                d='M1.21925 12.293H10.7808C11.5437 12.293 12 11.9593 12 11.4053C12 9.68342 9.69695 7.30743 5.99642 7.30743C2.30303 7.30743 0 9.68342 0 11.4053C0 11.9593 0.456327 12.293 1.21925 12.293ZM6.00355 6.1128C7.5294 6.1128 8.8556 4.83135 8.8556 3.16282C8.8556 1.51433 7.5294 0.292969 6.00355 0.292969C4.47771 0.292969 3.15151 1.54103 3.15151 3.17617C3.15151 4.83135 4.47058 6.1128 6.00355 6.1128Z'
                fill='white'
                fillOpacity='0.6'
            />
        </svg>
    );
};

export default UserIcon;
