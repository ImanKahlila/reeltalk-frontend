import SearchIcon from '@/components/layout/SearchIcon';

type DiscussionSidebar = React.HTMLAttributes<HTMLDivElement>;

export default function DiscussionSidebar({ ...props }: DiscussionSidebar) {
  return (
    <aside className='w-[22rem]'>
      <div className='hidden flex-col lg:flex'>{props.children}</div>
    </aside>
  );
}

type DiscussionsSearch = React.HTMLAttributes<HTMLDivElement>;

export function DiscussionsSearch({ ...props }: DiscussionsSearch) {
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
