import React from 'react';
import RecommendedList from '@/components/list/RecommendedList'; 
import { useRetrieveRecommendedLists } from '@/components/list/RecommendedList.hooks'; 

const ListHomePage = () =>{
    const { recommendedLists, fetchingRecommendedLists } = useRetrieveRecommendedLists();

    if (fetchingRecommendedLists) {
      return <div>Loading...</div>;
    }

    return (
        <section className='mx-auto flex max-w-[1120px] flex-col gap-4 p-4 '>
        <h1 className='text-pure-white'>Recommended for you</h1>
        <div className='flex flex-wrap gap-3'>
          {recommendedLists.map((list: any) => (
            <RecommendedList
              key={list.listId}
              title={list.name}
              imageUrl={list.coverPhoto}
              createdBy={list.ownerProfile.displayName || 'Anonymous'}
            />
          ))}
        </div>
      </section>
    );
};

export default ListHomePage;
