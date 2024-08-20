import axios from 'axios';
import { GEM, SUBSCRIPTION } from '@/components/profile/Constants';

interface PlanChosen {
  type: typeof SUBSCRIPTION| typeof GEM;
  name?: 'Premiere' | 'Platinum' | 'Basic';
  billing?: 'Monthly' | 'Annual';
  total?: number;
  monthly?: number;
  description: string;
  gems?: number;
  price?: number;
  discount?: string;
}

export const handleSuccessfulTransaction = async (planChosen: PlanChosen, idToken: string): Promise<void> => {

  const response = await (planChosen.type === SUBSCRIPTION
    ? handleSubscription(planChosen, idToken)
    : handleGemPurchase(planChosen, idToken));

  if (response.status !== 200 && response.status !== 201) {
    throw new Error('Failed to update user profile');
  }
  console.log('Update successful:', response.data);
};

const handleSubscription = async (planChosen: PlanChosen, idToken: string) => {
  const { name, billing } = planChosen;

  if (!name || !billing) {
    throw new Error('Invalid subscription details');
  }

  // Update user profile with the new subscription
  return axios.post(
    `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/setProfile`,
    // `http://localhost:8080/api/user/setProfile`,
    {
      'premiumStatus': planChosen.name,
    }, {
      headers: { Authorization: `Bearer ${idToken}` },
    },
  );
};

const handleGemPurchase = async (planChosen: PlanChosen, idToken: string) => {
  const { gems, description } = planChosen;
  if (gems === undefined) {
    throw new Error('Invalid gem details');
  }

  // Update user profile with the new gem balance
  return axios.post(
    // `https://us-central1-reeltalk-app.cloudfunctions.net/backend/gems/create-transaction`,
    `http://localhost:8080/gems/create-transaction`,
    {
      amount: gems,
      description: description,
      transaction_type: 'recharge',
      transactionData: {}
      //TODO: Integrate with invoice Stripe API to retrieve invoiceId and
      // populate transactionData
    },
    {
      headers: { Authorization: `Bearer ${idToken}` },
    },
  );
};
