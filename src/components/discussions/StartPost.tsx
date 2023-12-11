import EmoteIcon from '@/components/Icons/EmoteIcon';
import GifIcon from '@/components/Icons/GifIcon';
import ImageIcon from '@/components/Icons/ImageIcon';

export default function StartPost() {
  return (
    <div className='h-[6.5rem] w-full overflow-hidden rounded-lg border-[1px] border-medium-emphasis bg-first-surface'>
      <input
        className='flex h-[3.375rem] w-full items-center bg-transparent px-4 text-high-emphasis outline-none placeholder:text-disabled'
        type='text'
        placeholder='Start a post'
      />
      <div className='flex h-[3.125rem] items-center border-[1px] border-disabled px-4'>
        <div className='flex h-full grow items-center gap-4'>
          <ImageIcon />
          <GifIcon />
          <EmoteIcon />
        </div>
        <button className='h-[2.125rem] w-16 rounded bg-primary font-bold text-secondary'>
          Post
        </button>
      </div>
    </div>
  );
}
