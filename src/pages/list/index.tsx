import React, { useEffect, useState } from 'react';
import ListTile from '@/components/list/ListTile';
import { getRecentlyViewedLists, getRecommendedLists } from '@/services/api';
import { useUserContext } from '@/lib/context';

interface List {
  listId: string;
  name: string;
  coverPhoto: string;
  ownerProfile: {
    displayName: string;
  };
}

const ListHomePage: React.FC = () => {
  const [recommendedLists, setRecommendedLists] = useState<List[]>([]);
  const [recentlyViewedLists, setRecentlyViewedLists] = useState<List[]>([]);

  const { idToken } = useUserContext();

  useEffect(() => {
    const fetchLists = async () => {
      setRecommendedLists(await getRecommendedLists(idToken));
      // setRecentlyViewedLists(await getRecentlyViewedLists(idToken));
    };

    if (idToken) {
      fetchLists();
    }
  }, [idToken]);


  return (
    <section
      className='mx-auto flex max-w-[1120px] flex-col gap-4 px-4 py-12 md:px-0 md:flex-row-reverse md:justify-between'>
      <div className="flex flex-col">
        <div className="pb-4">
          <div className="flex flex-row justify-between">
            <h1 className="text-pure-white text-lg mb-2">Recommended for
              you</h1>
            <button className="text-primary mr-7">More</button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-x-6 md:gap-x-8">
            {recommendedLists.map((list: any) => (
              <ListTile
                key={list.listId}
                title={list.name}
                imageUrl={list.coverPhoto}
                createdBy={list.ownerProfile.displayName || 'Anonymous'}
              />
            ))}
          </div>
        </div>
        <div className="bg-second-surface p-2">
          <div className="flex flex-row justify-between">
            <h1 className="text-pure-white text-lg mb-2">Recently Viewed</h1>
            <button className="text-primary mr-7">More</button>
          </div>
          <div
            className="grid grid-cols-3 md:grid-cols-7 gap-x-6 md:gap-x-8 pl-2">
            //TODO: Replace with recently viewed list
            {recommendedLists.map((list: any) => (
              <ListTile
                key={list.listId}
                title={list.name}
                imageUrl={list.coverPhoto}
                showLastUpdated={true}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-between">
            <h1 className="text-pure-white text-lg my-2 pt-2">My Lists</h1>
            <button className="text-primary mr-7">More</button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-x-6 md:gap-x-8">
            //TODO: Replace with My list
            {recommendedLists.map((list: any) => (
              <ListTile
                key={list.listId}
                title={list.name}
                imageUrl={list.coverPhoto}
                isPublic={list.ownerProfile.isPublic}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="flex flex-row justify-between">
            <h1 className="text-pure-white text-lg my-2 pt-2">Top 10</h1>
            <button className="text-primary mr-7">More</button>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-7 gap-x-6 md:gap-x-8">
            //TODO: Replace with TOP 10 list
            {recommendedLists.map((list: any) => (
              <ListTile
                key={list.listId}
                title={list.name}
                imageUrl={list.coverPhoto}
                createdBy={list.ownerProfile.displayName || 'Anonymous'}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ListHomePage;
