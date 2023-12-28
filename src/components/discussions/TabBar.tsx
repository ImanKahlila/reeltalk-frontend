import { useState } from 'react';

const tabs: string[] = ['Following', 'Trending', 'For you', 'My posts (0)'];

export default function TabBar() {
  const [active, setActive] = useState<number>(0);
  return (
    <div className='no-scrollbar flex relative h-[2.9rem] w-[calc(100vw-1rem)] overflow-y-visible overflow-x-scroll lg:w-full before:absolute before:bottom-[1px] before:h-[1px] before:w-full before:bg-[#515151]'>
        {tabs.map((e, i) => {
          return (
            <button
              data-text={e}
              className={`relative flex h-[2.875rem] items-center justify-center whitespace-nowrap px-3 after:absolute after:font-bold after:text-primary after:content-[attr(data-text)] before:absolute before:bottom-[1px] before:h-[1px] before:w-full before:bg-[#515151] ${
                active === i
                  ? 'border-b-2 border-primary text-white/0 after:visible before:hidden'
                  : 'text-disabled after:hidden'
              }`}
              key={i}
              onClick={() => setActive(i)}
            >
              {e}
            </button>
          );
        })}
    </div>
  );
}
