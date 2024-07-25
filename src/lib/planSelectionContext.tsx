import React, { createContext, useContext, ReactNode } from 'react';
import usePlanSelection from '@/hooks/usePlanSelection';

interface PlanSelectionProviderProps {
  children: ReactNode;
}

const PlanSelectionContext = createContext<any>(null);

export const PlanSelectionProvider: React.FC<PlanSelectionProviderProps> = ({ children }) => {
  const planSelection = usePlanSelection();

  return (
    <PlanSelectionContext.Provider value={planSelection}>
      {children}
    </PlanSelectionContext.Provider>
  );
};

export const usePlanSelectionContext = () => useContext(PlanSelectionContext);
