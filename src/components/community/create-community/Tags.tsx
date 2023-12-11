import React from 'react';

// Components
import Tag from './Tag';
import TagSearchInput from './TagSearchInput';

interface ITagsProps {
  addTagHandler: (query: string) => void;
  removeTagHandler: (index: number) => void;
  tags: string[];
}

const Tags = ({ addTagHandler, removeTagHandler, tags }: ITagsProps) => {
  return (
    <div>
      <h2 className='mb-2 font-medium tracking-eight text-high-emphasis'>Tags (optional)</h2>
      <TagSearchInput
        fetching={false} //TODO: Fix when implement tag searching
        addTagHandler={addTagHandler}
      />
      <div className='flex flex-wrap gap-x-3 gap-y-[14px]'>
        {tags.map((tag, index) => (
          <Tag key={index} index={index} tag={tag} removeTagHandler={removeTagHandler} />
        ))}
      </div>
    </div>
  );
};

export default Tags;
