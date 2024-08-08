import React from 'react';

interface TransactionProps {
  transaction: {
    id:string,
    createdAt: string,
    amount: number,
    type: string,
    transaction_type: string,
    description?: string
  };
  index: number;
}
export const Transaction = ({ transaction, index }: TransactionProps) => {

  const getMonthAndDay = (dateString:any) => {
    const date = new Date(dateString);

    // Options to format date as "MMM dd"
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };

    return date.toLocaleDateString('en-US', options);
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
      <div className='w-8'>
        <p className='flex flex-wrap'>{getMonthAndDay(transaction.createdAt).toUpperCase()}</p>
      </div>
      <div className='flex-grow text-left ml-2'>
        <p>You {transaction.transaction_type === 'reward' ? 'are rewarded' : transaction.transaction_type} {transaction.amount}💎</p>
        <p
          className="text-xs flex flex-nowrap">{truncateText(transaction.description || '', 30)}</p>
      </div>
      <div className='w-15 text-right'>
        <p
          className={`flex flex-wrap ${transaction.type === 'credit' ? 'text-dark-green' : 'text-dark-red'}`}>
          {transaction.type === 'credit' ? '+' : '-'} {transaction.amount} 💎
        </p>
      </div>
    </div>
  );
};
