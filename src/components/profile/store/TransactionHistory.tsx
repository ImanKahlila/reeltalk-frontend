import React, { useEffect, useState, useRef } from 'react';
import { Transaction } from '@/components/profile/store/Transaction';
import { ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import { useUserContext } from '@/lib/context';
import { Gems } from '@/components/profile/shared/UserDetails';

type Transaction = {
  id: string;
  createdAt: string;
  amount: number;
  type: string;
  transaction_type: string;
  description?: string;
};

const TransactionHistory: React.FC = () => {
  const { idToken } = useUserContext();
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
  const [lastTransactionId, setLastTransactionId] = useState<string | null>(null);
  const [hasMoreTransactions, setHasMoreTransactions] = useState(true);
  const [expandHistory, setExpandHistory] = useState(true);
  const [scrollHistory, setScrollHistory] = useState(false);

  const lastTransactionRef = useRef<HTMLDivElement | null>(null);

  const handleHistory = () => {
    setExpandHistory((prevState) => !prevState);
  };

  const handleScroll = async () => {
    if (hasMoreTransactions) {
      setScrollHistory(true);
      await fetchTransactionHistory();
    }else
      setScrollHistory((prevState) => !prevState);

  };

  const fetchTransactionHistory = async () => {
    try {
      const response = await axios.get(
        `https://us-central1-reeltalk-app.cloudfunctions.net/backend/gems/transactions?limit=10&startAfter=${lastTransactionId || ''}`,
        // `http://localhost:8080/gems/transactions?limit=10&startAfter=${lastTransactionId || ''}`,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      const data = response.data;

      if (data.data.length > 0 && lastTransactionId !== data.nextPage) {
        setTransactionHistory((prevHistory) => [...prevHistory, ...data.data]);
        setLastTransactionId(data.nextPage || null);
        setHasMoreTransactions(!!data.nextPage);
      } else {
        setHasMoreTransactions(false);
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  useEffect(() => {
    if (scrollHistory && lastTransactionRef.current) {
      lastTransactionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollHistory, transactionHistory]);

  return (
    <div className="flex flex-col mt-8 border-2 w-[320px] h-full text-pure-white bg-second-surface border-transparent rounded-xl bg-opacity-50 p-2 pb-10">
      <div className="flex flex-row relative mx-4">
        <div className="flex flex-col">
          <p className="font-semibold">Balance</p>
          <p className="text-2xl">
            <Gems />
            <span role="img" aria-label="diamond" className="ml-1">
              💎
            </span>
          </p>
        </div>
        <div className="absolute flex flex-row top-0 right-0 cursor-pointer" onClick={handleHistory}>
          History
          {expandHistory ? (
            <ChevronUp className="mx-2" />
          ) : (
            <ChevronDown className="mx-2" />
          )}
        </div>
      </div>

      {expandHistory && transactionHistory.length === 0 ? (
        <div className="flex flex-col text-medium-emphasis m-4 p-4 justify-start space-y-2 text-xs">
          <div className="text-center">
            <span className="rounded-full text-secondary inline-flex items-center justify-center w-6 h-6 bg-gray">
              !
            </span>
          </div>
          <div>
            <p>You currently have no transaction history.</p>
            <p>Once you earn gems, your earn and spend will be displayed here.</p>
          </div>
        </div>
      ) : expandHistory && transactionHistory.length > 0 ? (
        <div className="flex flex-col">
          <div className="overflow-y-auto max-h-[70vh]">
            {transactionHistory.map((transaction, index) => (
              <div
                key={index}
                ref={index === transactionHistory.length - 1 ? lastTransactionRef : null}
              >
                <Transaction transaction={transaction} index={index} />
              </div>
            ))}
          </div>
          {hasMoreTransactions && (
            <div className="flex justify-center items-center mt-2 cursor-pointer" onClick={handleScroll}>
              View more history
              <ChevronDown className="mx-2" />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default TransactionHistory;
