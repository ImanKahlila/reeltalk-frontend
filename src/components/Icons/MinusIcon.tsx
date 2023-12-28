type MinusIcon = React.SVGAttributes<SVGElement>;

export default function MinusIcon({ ...props }: MinusIcon) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      {...props}
    >
      <path
        d='M8 16C12.3765 16 16 12.3687 16 8C16 3.62354 12.3687 0 7.99217 0C3.62353 0 0 3.62354 0 8C0 12.3687 3.63138 16 8 16Z'
        fill='white'
      />
      <line x1='4' y1='7.99984' x2='12' y2='7.99984' stroke='#222222' strokeWidth='1.33333' />
    </svg>
  );
}
