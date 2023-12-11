import { useState } from 'react';

const tabs: string[] = ['Following', 'Trending', 'For you', 'My posts (0)'];

export default function TabBar() {
    const [active, setActive] = useState<number>(0);
    return (
      <div className='flex h-[2.75rem] border-b-[1px] border-disabled'>
        {tabs.map((e, i) => {
          return (
            <button
              data-text={e}
              className={`relative flex h-[2.875rem] items-center justify-center px-3 after:absolute after:font-bold after:text-primary after:content-[attr(data-text)] ${
                active === i
                  ? 'border-b-2 border-primary text-white/0 after:visible'
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