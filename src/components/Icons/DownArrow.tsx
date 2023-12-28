type DownArrow = React.SVGAttributes<SVGElement>;

export default function DownArrow({ ...props }: DownArrow) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='8'
      fill='none'
      viewBox='0 0 12 8'
    >
      <path
        fill='#fff'
        fillOpacity='0.92'
        d='M6 7.375a.63.63 0 01-.456-.2L.187 1.709A.62.62 0 010 1.253C0 .901.27.625.629.625c.18 0 .332.069.45.18L6 5.828 10.922.804a.657.657 0 01.449-.179c.36 0 .629.276.629.628 0 .18-.062.331-.18.456L6.456 7.175a.619.619 0 01-.456.2z'
      ></path>
    </svg>
  );
}
