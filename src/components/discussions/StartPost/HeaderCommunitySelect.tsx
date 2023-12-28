import Image from 'next/image';
import DownArrow from '../../Icons/DownArrow';
import { useUserContext } from '@/lib/context';
import { useEffect, useState } from 'react';

type HeaderCommunitySelect = React.HTMLAttributes<HTMLDivElement>;

export default function HeaderCommunitySelect({ ...props }: HeaderCommunitySelect) {
  const { user } = useUserContext();
  const [dropdown, setDropdown] = useState(false);

  //Click anywhere outside the dropdown to collapse
  useEffect(() => {
    function handleTextExpand(e: MouseEvent) {
      const target = e.target as Element;
      if (target.tagName === 'svg') return;
      const isFocused = !!target.closest('.header-community-select');
      setDropdown(isFocused);
    }
    window.addEventListener('click', handleTextExpand);
    return () => window.removeEventListener('click', handleTextExpand);
  }, []);

  return (
    <div {...props}>
      {user?.photoURL && (
        <div className='flex h-4 grow items-center gap-1 text-high-emphasis'>
          <Image
            height={16}
            width={16}
            src={user?.photoURL}
            alt='profile icon'
            className='rounded-full'
          />
          {user.displayName}
        </div>
      )}
      <div
        onClick={() => {
          if (dropdown) return;
          setDropdown(true);
        }}
        className={`${
          dropdown
            ? 'h-[10.75rem] border-primary'
            : 'h-[2.875rem] cursor-pointer border-medium-emphasis'
        } ignore-collapse bg-third-surface absolute right-2 top-2 z-10 w-[14rem] rounded border-[1px] px-3 pt-[0.9rem] text-medium-emphasis transition-all`}
      >
        <div className='flex items-center'>
          <input
            type='text'
            placeholder='General Community'
            className={`${
              dropdown ? 'h-8 border-b-[1px] placeholder:text-transparent' : 'h-[2.75rem] cursor-pointer'
            } transition-all placeholder:text-xs placeholder:absolute placeholder:top-[0.9rem] ignore-collapse absolute left-0 top-0 w-full border-disabled bg-transparent pl-3 pr-8 outline-none`}
          />
          <DownArrow
            onClick={() => setDropdown(prev => !prev)}
            className={`${
              dropdown ? 'top-[0.75rem] ' : 'top-[1.1rem]'
            } absolute right-3 cursor-pointer transition-all`}
          />
        </div>
      </div>
    </div>
  );
}
