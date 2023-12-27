import StartPost from '@/components/discussions/StartPost';
import Post from '@/components/discussions/Post';
import Sidebar, {DiscussionsSearch} from '@/components/discussions/Sidebar';
import TabBar from '@/components/discussions/TabBar';
import ActiveDiscussion from '@/components/discussions/ActiveDiscussion';

export default function DiscussionPage() {
  return (
    <section className='my-[1.438rem] flex flex-col lg:flex-row justify-center lg:gap-8 gap-4 mx-4'>
        <DiscussionsSearch className='relative lg:hidden flex h-[3.5rem] w-full items-center overflow-hidden rounded-lg bg-white/[0.02] px-6'/>
      <div className='flex lg:w-[46rem] flex-col gap-6'>
        <StartPost />
        <TabBar />
        <Post />
        <Post />
        <Post />
      </div>
      <Sidebar>
        <ActiveDiscussion />
        <ActiveDiscussion />
        <ActiveDiscussion />
      </Sidebar>
    </section>
  );
}


