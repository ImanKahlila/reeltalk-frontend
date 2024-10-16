import React, { useEffect, useMemo } from 'react';
import ListTile from '@/components/lists/ListTile';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecommendedLists } from '@/redux/userActions';
import { selectRecommendedLists } from '@/redux/selectors';
import { AppDispatch } from '@/redux/store';
import Link from 'next/link';
import { useUserContext } from '@/lib/context';

interface List {
  listId: string;
  name: string;
  coverPhoto: string;
  type: string;
  ownerProfile: {
    displayName: string;
    showType?: boolean;
  };
}

interface ListSectionProps {
  title: string;
  lists: List[];
  showLastUpdated?: boolean;
  showCreatedBy?: boolean;
  showType?: boolean;
  className?: string;
  tileSize?: 'large' | 'small';
  moreLink: string;
}

const ListSection: React.FC<ListSectionProps> = ({
                                                   title,
                                                   lists,
                                                   showLastUpdated = false,
                                                   showCreatedBy = false,
                                                   showType = false,
                                                   className,
                                                   tileSize = 'large',
                                                   moreLink,
                                                 }) => (
  <div className={`${tileSize === 'small' ? 'pb-2' : 'pb-4'}`}>
    <div className={`${className || ''}`}>
      <div className="flex flex-col items-start p-0 w-full max-w-screen-xl mx-auto h-auto">
        <div className="flex flex-row justify-between w-full">
          <h1 className="text-pure-white text-lg mb-2">{title}</h1>
          {moreLink && (
            <Link href={moreLink}>
              <div className="text-primary mr-7">More</div>
            </Link>
          )}
        </div>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-x-6 md:gap-x-8 overflow-hidden">
          {lists.slice(0, 7).map((list) => (
            <ListTile
              key={list.listId}
              title={list.name}
              imageUrl={list.coverPhoto}
              createdBy={showCreatedBy ? list.ownerProfile.displayName || 'Anonymous' : undefined}
              lastUpdated={showLastUpdated}
              type={showType ? list.type : ''}
              tileSize={tileSize}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ListHomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recommendedLists = useSelector(selectRecommendedLists);
  const { idToken } = useUserContext();

  useEffect(() => {
    dispatch(fetchRecommendedLists(idToken));
  }, [dispatch]);

  // Memoize sections to avoid re-renders
  const listSections = useMemo(() => {
    return [
      { title: 'Recommended for you', lists: recommendedLists, showCreatedBy: true, moreLink: '/lists/recommended' },
      { title: 'Recently viewed', lists: recommendedLists, showLastUpdated: true, className: 'bg-second-surface p-2', tileSize: 'small', moreLink: '/lists/recommended' },
      { title: 'My lists', lists: recommendedLists, showType: true, moreLink: '/lists/recommended' },
      { title: 'Top 10', lists: recommendedLists, showCreatedBy: true, moreLink: '/lists/recommended' },
    ];
  }, [recommendedLists]);

  return (
    <section className="mx-auto flex max-w-[1100px] flex-col gap-4 px-4 py-12 md:px-0 md:flex-row-reverse md:justify-between">
      <div className="flex flex-col">
        {listSections.map((section, idx) => (
          <ListSection
            key={idx}
            title={section.title}
            lists={section.lists}
            showLastUpdated={section.showLastUpdated}
            showCreatedBy={section.showCreatedBy}
            showType={section.showType}
            className={section.className}
            moreLink={section.moreLink}
          />
        ))}
      </div>
    </section>
  );
};

export default ListHomePage;
