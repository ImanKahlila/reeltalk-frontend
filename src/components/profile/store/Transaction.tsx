import React from 'react';

interface HistoryProps {
  history: {
    date: string;
    gems: number;
    type: string;
    reason?: string;
  };
  index: number;
}
export const Transaction = ({ history, index }: HistoryProps) => {
  const isCredit = (type: string) => {
    return type === 'credit';
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div
      key={index}
      className={`flex flex-row items-center text-sm bg-third-surface border-transparent rounded-xl mt-2 p-2 text-center ${
        index !== 0 ? 'text-medium-emphasis' : ''
      }`}
    >
      <div className='w-10'>
        <p className='flex flex-wrap'>{history.date.toUpperCase()}</p>
      </div>
      <div className='flex-grow text-left ml-2'>
        <p>You {isCredit(history.type) ? 'recharged' : 'spent'} {history.gems}💎</p>
        <p
          className="text-xs flex flex-nowrap">{truncateText(history.reason || '', 30)}</p>
      </div>
      <div className='w-15 text-right'>
        <p
          className={`flex flex-wrap ${isCredit(history.type) ? 'text-dark-green' : 'text-dark-red'}`}>
          {isCredit(history.type) ? '+' : '-'} {history.gems}💎
        </p>
      </div>
    </div>
  );
};
