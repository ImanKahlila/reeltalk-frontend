import StartPost from '@/components/discussions/StartPost';
import Post from '@/components/discussions/Post';
import Sidebar from '@/components/discussions/Sidebar';
import TabBar from '@/components/discussions/TabBar';
import ActiveDiscussion from '@/components/discussions/ActiveDiscussion';

export default function DiscussionPage() {
  return (
    <section className='my-[1.438rem] flex justify-center gap-8'>
      <div className='flex w-[46rem] flex-col gap-6'>
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


