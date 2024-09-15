import React from 'react';
import { useRetrieveRecommendedLists } from '@/components/list/RecommendedList.hooks';

const RecommendedListsComponent: React.FC = () => {
  const { recommendedLists, fetchingRecommendedLists } = useRetrieveRecommendedLists();

  if (fetchingRecommendedLists) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className='text-white'>Recommended Lists</h2>
      {recommendedLists.length > 0 ? (
        <ul>
          {recommendedLists.map((list) => (
            <li key={list.id}>
              <strong>{list.name}</strong> - Genres: {list.genres.join(', ')}
            </li>
          ))}
        </ul>
      ) : (
        <div className='text-white'>No recommended lists found.</div>
      )}
    </div>
  );
};

export default RecommendedListsComponent;
