import React, { useEffect, useState } from 'react';
import { Transaction } from '@/components/profile/store/Transaction';
import { ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import { useUserContext } from '@/lib/context';
import { Gems } from '@/components/profile/shared/UserDetails';

const TransactionHistory: React.FC = () => {
  const { idToken } = useUserContext();
  const [transactionHistory,setTransactionHistory]=useState([]);
  const [expandHistory, setExpandHistory] = useState(true);

  const handleHistory = () => {
    setExpandHistory((prevState) => !prevState);
  };

  const handleClearAll = async () => {
      try {
         await axios.delete(
          `https://us-central1-reeltalk-app.cloudfunctions.net/backend/gems/clear-history`,
          // `http://localhost:8080/gems/clear-history`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        );
        setTransactionHistory([]);
      } catch (error) {
        console.error(error)
      } finally {
        // setLoading(false)
      }
    };

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
          const response = await axios.get(
            `https://us-central1-reeltalk-app.cloudfunctions.net/backend/gems/transactions`,
            // `http://localhost:8080/gems/transactions`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            },
          );
          setTransactionHistory(response.data.data);
      } catch (error) {
        console.error(error)
      } finally {
        // setLoading(false)
      }
    };

    fetchTransactionHistory();
  }, []);

  return (
    <div className="flex flex-col mt-8 border-2 w-[320px] h-full text-pure-white bg-second-surface border-transparent rounded-xl bg-opacity-50 p-2 pb-10">
      <div className="flex flex-row relative mx-4">
        <div className="flex flex-col">
          <p className="font-semibold">Balance</p>
          <p className="text-2xl">
            <Gems/>
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
        {expandHistory && transactionHistory.length > 0 && (
          <div
            className="absolute flex flex-row bottom-0 right-0 mr-2 text-dark-red text-sm cursor-pointer"
            onClick={handleClearAll}
          >
            Clear all
          </div>
        )}
      </div>
      {expandHistory && (
        <div>
          {transactionHistory.map((transaction, index) => (
            <Transaction key={index} transaction={transaction} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
