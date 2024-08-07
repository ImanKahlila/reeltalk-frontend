import axios from 'axios';
import { useUserContext } from '@/lib/context';

interface PlanChosen {
  type: 'subscription' | 'gems';
  name?: 'Premiere' | 'Platinum' | 'Basic';
  billing?: 'Monthly' | 'Annual';
  total?: number;
  monthly?: number;
  description: string;
  gems?: number;
  price?: number;
  discount?: string;
}

interface CurrentSubscription {
  name: 'Premiere' | 'Platinum' | 'Basic';
  billing: 'Monthly' | 'Annual';
  startDate: Date;
  renewalDate?: Date;
}

const updateUserProfile = async (planChosen: PlanChosen, idToken: string): Promise<void> => {
  const response = await (planChosen.type === 'subscription'
    ? handleSubscription(planChosen, idToken)
    : handleGemPurchase(planChosen, idToken));

  if (response.status !== 200) {
    throw new Error('Failed to update user profile');
  }

  console.log('Update successful:', response.data);
};

const handleSubscription = async (planChosen: PlanChosen, idToken: string) => {
  const { name, billing } = planChosen;

  if (!name || !billing) {
    throw new Error('Invalid subscription details');
  }

  const currentSubscription: CurrentSubscription = {
    name,
    billing,
    startDate: new Date(),
  };

  // Update user profile with the new subscription
  return axios.post(
    // `https://us-central1-reeltalk-app.cloudfunctions.net/backend/api/user/setProfile`,
    `http://localhost:8080/api/user/setProfile`,
    currentSubscription,
    {
      headers: { Authorization: `Bearer ${idToken}` },
    },
  );
};

const handleGemPurchase = async (planChosen: PlanChosen, idToken: string) => {
  const { gems } = planChosen;

  if (gems === undefined) {
    throw new Error('Invalid gem details');
  }

  // Update user profile with the new gem balance
  return axios.post(
    // `https://us-central1-reeltalk-app.cloudfunctions.net/backend/gems/reward-user`,
    `http://localhost:8080/gems/reward-user`,
    {
      amount: gems,
      type: 'recharge',
    },
    {
      headers: { Authorization: `Bearer ${idToken}` },
    },
  );
};

export const handleSuccessfulTransaction = async (planChosen: PlanChosen): Promise<void> => {
  try {
    const { idToken } = useUserContext();

    await updateUserProfile(planChosen, idToken);
  } catch (error) {
    console.error('Error handling successful transaction:', error);
  }
};
