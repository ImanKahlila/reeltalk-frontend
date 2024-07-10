
import React from 'react';

interface HistoryProps {
  history: {
    date: string;
    gems: number;
    type: string;
    reason?: string;
  };
}

const History = (index:number,{ history }: HistoryProps) => {
  const isCredit = (type: string) => {
    return type === "credit";
  };

  return (
    <div className={`flex flex-row items-center text-sm bg-second-surface border-transparent rounded-l mt-2 p-2 text-center ${index!=0 ? 'text-medium-emphasis' : ''}`}>
      <div className="w-10">
        <p className="flex flex-wrap">{history?.date.toUpperCase()}</p>
      </div>
      <div className="flex-grow text-left ml-2">
        <p>You {isCredit(history?.type) ? "recharge" : "spent"} {history.gems}💎</p>
        <p className="text-xs">{history?.reason}</p>
      </div>
      <div className="w-15 text-right">
        <p className={`flex flex-wrap ${isCredit(history.type) ? 'text-dark-green' : 'text-dark-red'}`}>
          {isCredit(history.type) ? "+" : "-"} {history.gems}💎
        </p>
      </div>
    </div>
  );
};

export default History;
