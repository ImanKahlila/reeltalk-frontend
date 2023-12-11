import LikesReplies from "../shared/LikesReplies";
import Image from 'next/image';

export default function Post() {
  return (
    <div className='flex w-full flex-col gap-[0.625rem] rounded-lg bg-first-surface px-6 py-4 '>
      <div className='flex h-[2.357rem] gap-2'>
        <Image width={24} height={37.71} src='/Discussions/suits.jpg' alt='movie thumbnail' />
        <div className='flex grow flex-col justify-end text-xs'>
          <div className='text-primary'>The Best Closers in the City</div>
          <div className='flex'>
            <div className='grow text-white/[0.6]'>2h ago</div>
            <div className='flex h-4 items-center gap-1 text-high-emphasis'>
              <div>Posted by</div>
              <Image width={16} height={16} src='/Discussions/ProfileIcon.png' alt='profile icon' />
              <div>Jennifer L.</div>
            </div>
          </div>
        </div>
      </div>
      <h2 className='text-base text-high-emphasis'>
        In your opinion, what are the top 5 scenes of Suits?
      </h2>
      <LikesReplies likes={30} replies={52} />
      <div className='flex grow flex-col gap-2 rounded bg-white/[0.12] p-2'>
        <div className='flex h-[1.188rem] gap-2 text-[0.875rem] text-white/[0.92]'>
          <Image width={16} height={16} src='/Discussions/ProfileIcon2.png' alt='profile icon' />
          Jane L.
        </div>
        <p className='text-xs text-high-emphasis'>
          My favorite scene will always be from season 4 episode 8 when Harvey found out about
          louis&#39; deal with forstman. The side by side wal see morek by harvey and louis will always
          be one of my favorite shots of all time.
        </p>
        <LikesReplies likes={2} replies={2} />
      </div>
    </div>
  );
}
