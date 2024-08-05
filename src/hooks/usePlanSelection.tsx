import { useState } from 'react';

const usePlanSelection = () => {
  const [planChosen, setPlanChosen] = useState(null);
  const [amountToPay, setAmountToPay] = useState(0);

  const handlePlanSelect = (selectedPlan: any) => {
    if (planChosen && JSON.stringify(planChosen) === JSON.stringify(selectedPlan)) {
      setPlanChosen(null);
      setAmountToPay(0);
    } else {
      setPlanChosen(selectedPlan);
      setAmountToPay(selectedPlan.price || selectedPlan.total);
    }
  };

  const isSelected = (plan: any) => {
    return planChosen && JSON.stringify(planChosen) === JSON.stringify(plan);
  };

  const getSelectedPlan = () => {
    return planChosen;
  };

  const resetSelectedPlan = () => {
    setPlanChosen(null);
    setAmountToPay(0);
  };

  return { planChosen, handlePlanSelect, isSelected, getSelectedPlan, amountToPay ,resetSelectedPlan};
};

export default usePlanSelection;
