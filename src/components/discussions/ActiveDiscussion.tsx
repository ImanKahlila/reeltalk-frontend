import LikesReplies from '@/components/shared/LikesReplies';
import Image from 'next/image';

export default function ActiveDiscussion() {
  return (
    <div className='flex flex-col gap-[0.563rem] rounded-lg bg-first-surface px-6 py-4'>
      <div className='flex h-12 gap-2'>
        <Image width={31} height={48} src='/Discussions/suits.jpg' alt='movie thumbnail' />
        <div className='text-xs'>
          <div className='text-primary'>The Best Closers in the City</div>
          <div className='relative flex h-4 gap-1 text-high-emphasis'>
            <div>Posted by</div>
            <Image width={16} height={16} src='/Discussions/ProfileIcon.png' alt='profile icon' />
            <div>Jennifer L.</div>
          </div>
          <div className='text-white/[0.6]'>2h ago</div>
        </div>
      </div>
      <div className='text-high-emphasis'>In your opinion, what are the top 5 scenes of Suits?</div>
      <LikesReplies likes={30} replies={52} />
    </div>
  );
}
