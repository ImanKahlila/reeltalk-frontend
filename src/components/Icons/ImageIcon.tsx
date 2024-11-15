type ImageIcon = React.SVGAttributes<SVGElement>;

export default function ImageIcon({ ...props }: ImageIcon) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      fill='none'
      viewBox='0 0 16 16'
    >
      <g fill='#fff' fillOpacity='0.92' clipPath='url(#clip0_6303_11628)'>
        <path d='M9.412 6.745a1.882 1.882 0 100-3.764 1.882 1.882 0 000 3.764zm0-2.51a.628.628 0 110 1.255.628.628 0 010-1.255z'></path>
        <path d='M13.804.47H1.254A1.255 1.255 0 000 1.727v12.549a1.255 1.255 0 001.255 1.255h12.549a1.255 1.255 0 001.255-1.255V1.725A1.255 1.255 0 0013.804.472zm0 13.805H1.254V10.51l3.138-3.137L7.9 10.88a1.255 1.255 0 001.769 0l.998-.998 3.137 3.138v1.255zm0-3.031L11.55 8.991a1.255 1.255 0 00-1.769 0l-.998.998-3.507-3.507a1.255 1.255 0 00-1.77 0L1.255 8.734V1.726h12.549v9.518z'></path>
      </g>
      <defs>
        <clipPath id='clip0_6303_11628'>
          <path fill='#fff' d='M0 0H15.059V16H0z'></path>
        </clipPath>
      </defs>
    </svg>
  );
}
