import SearchIcon from '@/components/layout/SearchIcon';

type Sidebar = React.HTMLAttributes<HTMLDivElement>;

export default function Sidebar({ ...props }: Sidebar) {
  return (
    <aside className='w-[22rem]'>
      <DiscussionsSearch className='relative lg:flex h-[3.5rem] w-full items-center overflow-hidden rounded-lg bg-white/[0.02] px-6 hidden' />
      <div className='mt-6 lg:flex flex-col gap-3 hidden'>
        <h2 className=' text-[1.25rem] text-high-emphasis'>Active discussions</h2>
        {props.children}
      </div>
    </aside>
  );
}

type DiscussionsSearch = React.HTMLAttributes<HTMLDivElement>

export function DiscussionsSearch({...props}:DiscussionsSearch) {
  return (
    <div {...props}>
      <SearchIcon />
      <input
        className='absolute left-0 top-0 flex h-full w-full items-center bg-transparent pl-[3.625rem] text-high-emphasis outline-none placeholder:text-medium-emphasis '
        placeholder='Search for a discussion'
      />
    </div>
  );
}
