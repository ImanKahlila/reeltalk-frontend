import React from 'react';
import MovieTile from '@/components/lists/MovieTile';
import { List } from '@/redux/listsReducer';
import { formatTimeAgo } from '@/lib/utils';

const ListContent: React.FC<{ list: List ,index:number}> = ({ list,index }) => {
  return (
    <div className={index % 2 === 0 ? 'bg-first-surface' : ''}>
      <div className="grid grid-cols-8 overflow-hidden">
      {list.contentList?.map((movie, index) => (
          <MovieTile
            key={index}
            imageUrl={movie.primaryImage.url}
            title={movie.titleText.text}
          />
        ))}
      </div>

      <div className="m-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {list.genres?.map((g) => (
            <div
              key={g.name}
              className="flex justify-center items-center p-2 gap-2 w-fit h-[19px] bg-third-surface text-high-emphasis text-xs rounded-lg"
            >
              {g.name}
            </div>
          ))}
        </div>

        <div className="text-high-emphasis text-lg mt-2">{list.name}</div>

        <div className="mt-2 mb-2 flex flex-row items-center text-lg h-8">
          <img
            className="w-6 h-6 rounded-full"
            src={list.ownerProfile.imageUrl}
            alt="Rounded avatar"
          />
          <a className="ml-2 text-high-emphasis">{list.ownerProfile.displayName}</a>
          <div className="text-medium-emphasis">
            <span className="mx-1">•</span>
            <a>Updated {formatTimeAgo(list.lastUpdated)}</a>
            <span className="mx-1">•</span>
            <a>{list.contentList?.length || 0} titles</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListContent;
