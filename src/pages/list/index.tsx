import React, { useEffect, useState, useMemo } from 'react';
import ListTile from '@/components/list/ListTile';
import { getRecentlyViewedLists, getRecommendedLists } from '@/services/api';
import { useUserContext } from '@/lib/context';

interface List {
  listId: string;
  name: string;
  coverPhoto: string;
  ownerProfile: {
    displayName: string;
    isPublic?: boolean;
  };
}

interface ListSectionProps {
  title: string;
  lists: List[];
  showLastUpdated?: boolean;
  createdByFallback?: boolean;
  isPublicFallback?:boolean;
}

const ListSection: React.FC<ListSectionProps> = ({ title, lists, showLastUpdated = false, createdByFallback = false ,isPublicFallback= false}) => (
  <div className="pb-4">
    <div className="flex flex-row justify-between">
      <h1 className="text-pure-white text-lg mb-2">{title}</h1>
      <button className="text-primary mr-7">More</button>
    </div>
    <div className="grid grid-cols-3 md:grid-cols-7 gap-x-6 md:gap-x-8">
      {lists.map(list => (
        <ListTile
          key={list.listId}
          title={list.name}
          imageUrl={list.coverPhoto}
          createdBy={createdByFallback ? list.ownerProfile.displayName || 'Anonymous' : undefined}
          showLastUpdated={showLastUpdated}
          isPublic={isPublicFallback}
        />
      ))}
    </div>
  </div>
);

const ListHomePage: React.FC = () => {
  const [recommendedLists, setRecommendedLists] = useState<List[]>([]);
  const [recentlyViewedLists, setRecentlyViewedLists] = useState<List[]>([]);
  const { idToken } = useUserContext();

  useEffect(() => {
    const fetchLists = async () => {
      const recommended = await getRecommendedLists(idToken);
      setRecommendedLists(recommended);

      // const recentlyViewed = await getRecentlyViewedLists(idToken);
      // setRecentlyViewedLists(recentlyViewed);
    };

    if (idToken) {
      fetchLists();
    }
  }, [idToken]);

  // Memoize sections to avoid re-renders
  const listSections = useMemo(() => {
    return [
      { title: 'Recommended for you', lists: recommendedLists, createdByFallback: true },
      { title: 'Recently Viewed', lists: recommendedLists, showLastUpdated: true }, //// Replace recommendedLists with actual Recently viewed Lists data
      { title: 'My Lists', lists: recommendedLists ,isPublicFallback: true}, // Replace
      // recommendedLists with actual My Lists data
      { title: 'Top 10', lists: recommendedLists, createdByFallback: true }, // Replace recommendedLists with Top 10 data
    ];
  }, [recommendedLists, recentlyViewedLists]);

  return (
    <section className="mx-auto flex max-w-[1070px] flex-col gap-4 px-4 py-12 md:px-0 md:flex-row-reverse md:justify-between">
      <div className="flex flex-col">
        {listSections.map((section, idx) => (
          <ListSection
            key={idx}
            title={section.title}
            lists={section.lists}
            showLastUpdated={section.showLastUpdated}
            createdByFallback={section.createdByFallback}
            isPublicFallback={section.isPublicFallback}
          />
        ))}
      </div>
    </section>
  );
};

export default ListHomePage;
