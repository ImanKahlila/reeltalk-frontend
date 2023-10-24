import React from 'react';

interface ComponentProps {
    height: number;
    width: number;
}

const AppStoreSVG = ({ height, width }: ComponentProps) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={`${width}`}
            height={`${height}`}
            viewBox='0 0 192 59'
            fill='none'
        >
            <path
                d='M184.776 57.4095H7.22488C3.6267 57.4095 0.710938 54.4938 0.710938 50.8956V8.83424C0.710938 5.23607 3.6267 2.32031 7.22488 2.32031H184.776C188.375 2.32031 191.29 5.23607 191.29 8.83424V50.8956C191.29 54.4938 188.375 57.4095 184.776 57.4095Z'
                fill='#222222'
            />
            <mask
                id='mask0_409_3527'
                // style='mask-type:luminance'
                maskUnits='userSpaceOnUse'
                x='0'
                y='1'
                width='192'
                height='58'
            >
                <path d='M0 1.61719H191.999V58.9673H0V1.61719Z' fill='white' />
            </mask>
            <g mask='url(#mask0_409_3527)'>
                <path
                    d='M7.22393 3.04014C4.02555 3.04014 1.42342 5.64227 1.42342 8.84064V50.902C1.42342 54.1004 4.02555 56.7025 7.22393 56.7025H184.779C187.977 56.7025 190.579 54.1004 190.579 50.902V8.84064C190.579 5.64227 187.977 3.04014 184.779 3.04014H7.22393ZM184.779 58.1294H7.22393C3.23974 58.1294 0 54.8862 0 50.902V8.84064C0 4.85646 3.23974 1.61328 7.22393 1.61328H184.779C188.763 1.61328 192.003 4.85646 192.003 8.84064V50.902C192.003 54.8862 188.763 58.1294 184.779 58.1294Z'
                    fill='#A7A9AB'
                />
            </g>
            <path
                d='M66.5827 16.3966L65.852 14.1081C65.6728 13.5428 65.5212 12.9121 65.3833 12.3745H65.3557C65.2213 12.9121 65.08 13.5566 64.918 14.1081L64.2012 16.3966H66.5827ZM63.9254 17.6752L63.1258 20.3084H61.375L64.3528 11.0234H66.5138L69.5295 20.3084H67.7132L66.8722 17.6752'
                fill='white'
            />
            <path
                d='M72.0601 13.6055L73.1492 17.0037C73.3422 17.5965 73.4766 18.1342 73.6007 18.6856H73.6421C73.7662 18.1342 73.9178 17.6103 74.097 17.0037L75.1723 13.6055H76.9473L74.3865 20.3124H72.7219L70.2266 13.6055'
                fill='white'
            />
            <path
                d='M82.0573 17.0345C80.8579 17.0207 79.7136 17.2689 79.7136 18.2891C79.7136 18.9508 80.141 19.2541 80.6786 19.2541C81.3645 19.2541 81.8505 18.8129 82.0125 18.3304C82.0573 18.2063 82.0573 18.0823 82.0573 17.9582V17.0345ZM83.7082 18.7026C83.7082 19.3092 83.7357 19.902 83.8184 20.3122H82.2882L82.1676 19.5712H82.1227C81.7264 20.0916 81.0233 20.4638 80.141 20.4638C78.7899 20.4638 78.0352 19.4884 78.0352 18.4683C78.0352 16.7864 79.5344 15.9213 82.0125 15.9351V15.8248C82.0125 15.3836 81.8367 14.653 80.6511 14.653C79.9893 14.653 79.3 14.8598 78.8451 15.1493L78.5142 14.0464C79.0105 13.7431 79.8791 13.457 80.9406 13.457C83.0878 13.457 83.7082 14.8184 83.7082 16.2935'
                fill='white'
            />
            <path
                d='M86.1043 13.6111H87.7966V20.318H86.1043V13.6111ZM86.9418 12.6461C86.38 12.6461 86.0078 12.2325 86.0078 11.7362C86.0078 11.2123 86.3904 10.8125 86.9591 10.8125C87.5346 10.8125 87.8931 11.2123 87.9069 11.7362C87.9069 12.2325 87.5346 12.6461 86.9591 12.6461'
                fill='white'
            />
            <path
                d='M90.2266 20.3106H91.9223V10.5156H90.2266V20.3106Z'
                fill='white'
            />
            <path
                d='M97.9323 17.0345C96.7329 17.0207 95.5886 17.2689 95.5886 18.2891C95.5886 18.9508 96.016 19.2541 96.5536 19.2541C97.243 19.2541 97.7255 18.8129 97.8909 18.3304C97.9323 18.2063 97.9323 18.0823 97.9323 17.9582V17.0345ZM99.5832 18.7026C99.5832 19.3092 99.6107 19.902 99.6934 20.3122H98.1666L98.0426 19.5712H98.0012C97.6014 20.0916 96.8983 20.4638 96.016 20.4638C94.6684 20.4638 93.9102 19.4884 93.9102 18.4683C93.9102 16.7864 95.4128 15.9213 97.8909 15.9351V15.8248C97.8909 15.3836 97.7117 14.653 96.5261 14.653C95.8643 14.653 95.175 14.8598 94.7235 15.1493L94.3927 14.0464C94.889 13.7431 95.7541 13.457 96.8156 13.457C98.9628 13.457 99.5832 14.8184 99.5832 16.2935'
                fill='white'
            />
            <path
                d='M103.677 17.5396C103.677 17.6775 103.69 17.8154 103.718 17.9394C103.897 18.6287 104.49 19.125 105.217 19.125C106.279 19.125 106.927 18.2841 106.927 16.9227C106.927 15.7371 106.361 14.7721 105.231 14.7721C104.542 14.7721 103.911 15.2684 103.732 16.0128C103.704 16.1369 103.677 16.2885 103.677 16.454V17.5396ZM101.981 10.5156H103.677V14.5239H103.704C104.118 13.876 104.845 13.4521 105.851 13.4521C107.492 13.4521 108.66 14.8134 108.647 16.8538C108.647 19.2629 107.12 20.4623 105.603 20.4623C104.735 20.4623 103.966 20.1314 103.484 19.3043H103.456L103.373 20.3106H101.926C101.953 19.8557 101.981 19.1113 101.981 18.4357'
                fill='white'
            />
            <path
                d='M110.645 20.3106H112.337V10.5156H110.645V20.3106Z'
                fill='white'
            />
            <path
                d='M118.929 16.2522C118.943 15.6318 118.667 14.6116 117.54 14.6116C116.492 14.6116 116.051 15.5629 115.982 16.2522H118.929ZM115.982 17.4343C116.024 18.6475 116.975 19.1714 118.05 19.1714C118.833 19.1714 119.384 19.0473 119.908 18.8681L120.156 20.0227C119.577 20.2743 118.777 20.45 117.816 20.45C115.638 20.45 114.355 19.1162 114.355 17.0655C114.355 15.2044 115.486 13.457 117.637 13.457C119.811 13.457 120.528 15.2458 120.528 16.7209C120.528 17.038 120.501 17.2861 120.473 17.4343'
                fill='white'
            />
            <path
                d='M128.935 19.2403C129.897 19.2403 130.572 18.3028 130.572 16.9415C130.572 15.8937 130.103 14.6805 128.949 14.6805C127.749 14.6805 127.267 15.8524 127.267 16.969C127.267 18.2615 127.915 19.2403 128.918 19.2403H128.935ZM128.88 20.4673C126.991 20.4673 125.52 19.1714 125.52 17.0104C125.52 14.8046 126.964 13.457 128.99 13.457C130.986 13.457 132.323 14.8598 132.323 16.9001C132.323 19.3644 130.586 20.4673 128.894 20.4673'
                fill='white'
            />
            <path
                d='M134.321 15.6042C134.321 14.8322 134.297 14.1842 134.27 13.6052H135.741L135.824 14.6116H135.865C136.169 14.0877 136.899 13.457 138.016 13.457C139.184 13.457 140.397 14.2118 140.397 16.3349V20.3122H138.702V16.5279C138.702 15.5629 138.343 14.8322 137.423 14.8322C136.748 14.8322 136.279 15.3147 136.1 15.8248C136.044 15.9627 136.017 16.1694 136.017 16.3624V20.3122H134.321'
                fill='white'
            />
            <path
                d='M148.201 11.8828V13.6026H149.811V14.8709H148.201V17.8177C148.201 18.6449 148.422 19.0585 149.066 19.0585C149.37 19.0585 149.535 19.0447 149.728 18.9895L149.756 20.2682C149.508 20.3682 149.053 20.4474 148.529 20.4474C147.898 20.4474 147.388 20.2406 147.071 19.8994C146.699 19.5134 146.533 18.893 146.533 18.0107V14.8709H145.582V13.6026H146.533V12.3515'
                fill='white'
            />
            <path
                d='M151.695 10.5156H153.391V14.5101H153.419C153.625 14.1931 153.915 13.9311 154.26 13.7519C154.604 13.5624 155.001 13.4521 155.428 13.4521C156.572 13.4521 157.768 14.2069 157.768 16.3575V20.3106H156.076V16.5367C156.076 15.5717 155.717 14.8272 154.78 14.8272C154.122 14.8272 153.653 15.2684 153.46 15.7785C153.405 15.9301 153.391 16.1093 153.391 16.2886V20.3106H151.695'
                fill='white'
            />
            <path
                d='M164.327 16.2522C164.341 15.6318 164.066 14.6116 162.935 14.6116C161.887 14.6116 161.45 15.5629 161.381 16.2522H164.327ZM161.381 17.4343C161.422 18.6475 162.37 19.1714 163.445 19.1714C164.231 19.1714 164.782 19.0473 165.303 18.8681L165.554 20.0227C164.975 20.2743 164.176 20.45 163.211 20.45C161.036 20.45 159.754 19.1162 159.754 17.0655C159.754 15.2044 160.884 13.457 163.032 13.457C165.206 13.457 165.923 15.2458 165.923 16.7209C165.923 17.038 165.896 17.2861 165.868 17.4343'
                fill='white'
            />
            <path
                d='M42.85 29.3152C42.8052 24.721 46.6101 22.4842 46.7859 22.3808C44.6318 19.2376 41.2921 18.8102 40.1169 18.7757C37.3148 18.4828 34.5955 20.4576 33.1687 20.4576C31.7108 20.4576 29.5084 18.8068 27.1407 18.855C24.087 18.9033 21.2333 20.6713 19.6686 23.4113C16.4426 29.005 18.8483 37.2215 21.9433 41.7434C23.4942 43.956 25.3002 46.4306 27.668 46.341C29.9841 46.2445 30.8491 44.8659 33.6443 44.8659C36.4153 44.8659 37.2287 46.341 39.6447 46.2859C42.1296 46.2445 43.6944 44.0629 45.1867 41.8261C46.9789 39.2894 47.6958 36.7907 47.7234 36.6632C47.6648 36.6425 42.8982 34.8227 42.85 29.3152Z'
                fill='white'
            />
            <path
                d='M38.2871 15.8042C39.5313 14.2463 40.3895 12.1233 40.1483 9.97266C38.3457 10.0554 36.0917 11.2203 34.7923 12.7437C33.6447 14.0878 32.6141 16.2901 32.883 18.358C34.9095 18.5097 36.9878 17.3379 38.2871 15.8042Z'
                fill='white'
            />
            <path
                d='M70.795 38.0879L69.1958 33.1491C69.0269 32.6459 68.7099 31.4568 68.2411 29.5888H68.186C67.9999 30.3918 67.6966 31.5809 67.2864 33.1491L65.7148 38.0879H70.795ZM76.3233 45.977H73.0939L71.3258 40.4212H65.1841L63.4987 45.977H60.3555L66.4489 27.0625H70.2057'
                fill='white'
            />
            <path
                d='M88.9021 39.1072C88.9021 37.7768 88.6023 36.6843 88.0026 35.8227C87.3477 34.9266 86.4689 34.4751 85.366 34.4751C84.6181 34.4751 83.9357 34.7267 83.3325 35.2195C82.7259 35.7193 82.3261 36.3672 82.1366 37.1737C82.0435 37.5459 81.9987 37.8527 81.9987 38.0939V40.3686C81.9987 41.3612 82.302 42.1987 82.9086 42.8811C83.5186 43.567 84.3079 43.9048 85.2798 43.9048C86.4241 43.9048 87.3133 43.467 87.944 42.5847C88.585 41.7059 88.9021 40.5478 88.9021 39.1072ZM91.9902 38.9935C91.9902 41.313 91.3629 43.15 90.1084 44.4941C88.9848 45.6935 87.589 46.2897 85.9278 46.2897C84.1287 46.2897 82.8397 45.6418 82.0539 44.3528H81.9987V51.5388H78.9658V36.8325C78.9658 35.3746 78.9313 33.8788 78.8555 32.3417H81.5196L81.6885 34.5061H81.7471C82.7569 32.8759 84.2907 32.0625 86.3482 32.0625C87.9543 32.0625 89.3019 32.7001 90.3738 33.9719C91.4491 35.2471 91.9902 36.9187 91.9902 38.9935Z'
                fill='white'
            />
            <path
                d='M104.59 39.1072C104.59 37.7768 104.29 36.6843 103.691 35.8227C103.036 34.9266 102.157 34.4751 101.054 34.4751C100.306 34.4751 99.6271 34.7267 99.0205 35.2195C98.4104 35.7193 98.0175 36.3672 97.8314 37.1737C97.7349 37.5459 97.6901 37.8527 97.6901 38.0939V40.3686C97.6901 41.3612 97.99 42.1987 98.5966 42.8811C99.2066 43.567 99.9958 43.9048 100.971 43.9048C102.112 43.9048 103.001 43.467 103.635 42.5847C104.27 41.7059 104.59 40.5478 104.59 39.1072ZM107.675 38.9935C107.675 41.313 107.051 43.15 105.796 44.4941C104.673 45.6935 103.28 46.2897 101.616 46.2897C99.8201 46.2897 98.5311 45.6418 97.7418 44.3528H97.6901V51.5388H94.6572V36.8325C94.6572 35.3746 94.6193 33.8788 94.5469 32.3417H97.211L97.3799 34.5061H97.4385C98.4449 32.8759 99.9786 32.0625 102.036 32.0625C103.646 32.0625 104.986 32.7001 106.065 33.9719C107.141 35.2471 107.675 36.9187 107.675 38.9935Z'
                fill='white'
            />
            <path
                d='M125.212 40.6703C125.212 42.2764 124.653 43.586 123.53 44.5993C122.296 45.7022 120.583 46.2536 118.381 46.2536C116.344 46.2536 114.71 45.8607 113.473 45.0749L114.176 42.5521C115.51 43.3551 116.967 43.7549 118.56 43.7549C119.701 43.7549 120.59 43.4999 121.227 42.9863C121.862 42.4694 122.179 41.7801 122.179 40.9184C122.179 40.1533 121.92 39.5019 121.396 38.978C120.872 38.4542 120 37.9682 118.784 37.5167C115.472 36.2794 113.817 34.47 113.817 32.0919C113.817 30.5375 114.396 29.2623 115.558 28.2697C116.716 27.2771 118.26 26.7773 120.187 26.7773C121.91 26.7773 123.34 27.0806 124.481 27.6769L123.723 30.148C122.658 29.569 121.451 29.2761 120.104 29.2761C119.035 29.2761 118.205 29.538 117.608 30.0619C117.105 30.5306 116.85 31.1027 116.85 31.7748C116.85 32.5227 117.136 33.1396 117.719 33.6256C118.222 34.0736 119.139 34.5596 120.469 35.0869C122.096 35.7417 123.292 36.5069 124.06 37.3857C124.826 38.2646 125.212 39.3606 125.212 40.6703Z'
                fill='white'
            />
            <path
                d='M135.236 34.607H131.896V41.2278C131.896 42.9131 132.485 43.7541 133.668 43.7541C134.205 43.7541 134.657 43.7093 135.012 43.6162L135.095 45.9151C134.502 46.1425 133.712 46.2528 132.741 46.2528C131.545 46.2528 130.607 45.8875 129.932 45.1603C129.26 44.4296 128.922 43.2027 128.922 41.4828V34.607H126.93V32.3323H128.922V29.837L131.896 28.9375V32.3323H135.236'
                fill='white'
            />
            <path
                d='M147.161 39.1486C147.161 37.8906 146.889 36.8153 146.344 35.9123C145.714 34.8232 144.804 34.2786 143.625 34.2786C142.409 34.2786 141.481 34.8232 140.847 35.9123C140.303 36.8153 140.037 37.9112 140.037 39.2071C140.037 40.4651 140.303 41.5404 140.847 42.44C141.502 43.5291 142.419 44.0736 143.601 44.0736C144.756 44.0736 145.666 43.5222 146.32 42.4124C146.882 41.4956 147.161 40.4065 147.161 39.1486ZM150.305 39.052C150.305 41.1475 149.708 42.8673 148.509 44.2149C147.254 45.6004 145.59 46.2897 143.515 46.2897C141.509 46.2897 139.917 45.6246 138.728 44.2977C137.542 42.9707 136.949 41.2957 136.949 39.2761C136.949 37.1599 137.559 35.4298 138.786 34.0856C140.01 32.7346 141.661 32.0625 143.735 32.0625C145.738 32.0625 147.351 32.7277 148.564 34.0546C149.726 35.3505 150.305 37.0117 150.305 39.052Z'
                fill='white'
            />
            <path
                d='M160.16 35.0093C159.86 34.9541 159.543 34.9266 159.205 34.9266C158.14 34.9266 157.313 35.3298 156.734 36.1328C156.231 36.8463 155.979 37.7424 155.979 38.8246V45.983H152.949L152.974 36.6395C152.974 35.0644 152.936 33.6341 152.863 32.3417H155.503L155.614 34.9541H155.693C156.013 34.058 156.52 33.3343 157.209 32.7932C157.885 32.3072 158.616 32.0625 159.401 32.0625C159.681 32.0625 159.936 32.0832 160.16 32.1176'
                fill='white'
            />
            <path
                d='M170.816 37.7284C170.836 36.8323 170.64 36.0533 170.23 35.3985C169.706 34.5576 168.896 34.1336 167.814 34.1336C166.825 34.1336 166.018 34.5472 165.401 35.3709C164.898 36.0258 164.595 36.8116 164.509 37.7284H170.816ZM173.704 38.5142C173.704 39.0587 173.669 39.5137 173.597 39.8893H164.509C164.54 41.2369 164.981 42.2674 165.825 42.9774C166.59 43.615 167.583 43.9286 168.8 43.9286C170.144 43.9286 171.371 43.715 172.477 43.2841L172.953 45.39C171.66 45.9483 170.137 46.2344 168.376 46.2344C166.263 46.2344 164.602 45.6105 163.395 44.3629C162.193 43.1222 161.586 41.4506 161.586 39.3551C161.586 37.2975 162.144 35.5846 163.271 34.2198C164.447 32.7585 166.039 32.0312 168.038 32.0312C170.002 32.0312 171.495 32.7585 172.505 34.2198C173.308 35.3778 173.704 36.8116 173.704 38.5142Z'
                fill='white'
            />
        </svg>
    );
};

export default AppStoreSVG;