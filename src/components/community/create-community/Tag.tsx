import React from 'react';

import CrossIconSVG from '../../Icons/crossIcon';

interface ITagProps {
  index: number;
  tag: string;
  removeTagHandler: (index: number) => void;
}

export default function Tag({ index, tag, removeTagHandler }: ITagProps) {
  return (
    <div
      key={index}
      onClick={() => removeTagHandler(index)}
      className='relative inline-flex h-[34px] cursor-pointer rounded-full border border-high-emphasis px-4 py-[4px] font-medium tracking-eight text-high-emphasis'
    >
      {tag}
      <CrossIconSVG className='absolute -right-3 -top-3 ' />
    </div>
  );
}
