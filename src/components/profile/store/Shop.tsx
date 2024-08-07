import React from 'react';
import { usePlanSelectionContext } from '@/lib/planSelectionContext';
import {
  GEM_BUNDLES,
  SUBSCRIPTION_TIERS,
} from '@/components/profile/Constants';

type ShopProps = {
  compactView?: boolean; // Prop to control the view mode
};

const Shop: React.FC<ShopProps> = ({ compactView = false }) => {
  const { handlePlanSelect, isSelected } = usePlanSelectionContext();

  const memberBenefits = [
    '100 💎 Free Gems/month',
    'Access to Premium Content 👑',
    'Special Buff Badge 🏅',
    'Custom Profile Background ✏️',
    'Premium User Support',
  ];

  const gemUses = [
    'Join special communities 💬',
    'Award to lists 🎥',
    'Awards to users 🎖️ ',
  ];

  const CircleIcon = () => (
    <span className="absolute left-0 top-0 h-full flex items-center justify-center">
      <span className="w-2.5 h-2.5 rounded-full bg-orange-400"></span>
    </span>
  );

  return (
    <div className={`flex ${compactView? 'flex-col' +
      ' space-y-4':'flex-row space-x-6'}`}>
      <div className="flex flex-col space-y-2 text-pure-white mt-2 w-[320px]">
        <div>
          Premium Member benefits
          <div>
            <ul className="h-[170px] list-disc border-2 justify-center bg-second-surface border-primary rounded-xl mt-2 mb-4 px-2">
              {memberBenefits.map((benefit, index) => (
                <li
                  key={index}
                  className={`mt-${index === 0 ? '4' : '1'} ml-2 flex text-sm items-center text-left relative pl-6`}
                >
                  <CircleIcon />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          Subscription Tiers
          <div className="flex flex-row space-x-4">
            {SUBSCRIPTION_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col w-1/2 items-center justify-center border-2 rounded-xl mt-2 p-2 text-center ${isSelected(tier) ? 'border-primary bg-primary bg-opacity-25' : 'border-transparent bg-second-surface'}`}
                onClick={() => handlePlanSelect(tier)}
              >
                <p className="text-lg">{tier.name}</p>
                <p className="text-xs">{tier.billing}</p>
                <p className="text-primary font-bold text-lg mt-2">${tier.total}</p>
                {tier.monthly && (
                  <p className="text-xs text-medium-emphasis">(${tier.monthly}/month)</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row text-medium-emphasis items-center mt-2 text-left relative pl-6 text-sm">
          <CircleIcon />
          Automatic monthly renewal with the option to cancel at any time.
        </div>
      </div>
      <div className="flex flex-col space-y-4 text-pure-white mt-2 w-[350px]">
        <div>
          Why do I need Gems?
          <ol className={`${compactView?'h-fit pb-2':'h-[170px]'} list-decimal border-2 justify-center bg-second-surface border-transparent rounded-xl mt-2 px-4 list-inside mb-2`}>
            {gemUses.map((benefit, index) => (
              <li
                key={index}
                className={`mt-${index === 0 ? '4' : '1'} ml-1 items-center text-left text-sm`}
              >
                <span>{benefit}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2>Gem Bundles</h2>
          <div className="flex flex-row space-x-4">
            {GEM_BUNDLES.map((bundle, index) => (
              <div
                key={bundle.gems}
                className={`flex flex-col items-center justify-center border-2 rounded-xl mt-2 w-[120px] text-center relative ${isSelected(bundle) ? 'border-primary bg-primary bg-opacity-25' : 'border-transparent bg-second-surface'}`}
                onClick={() => handlePlanSelect(bundle)}
              >
                <div className="relative mt-2 flex justify-center items-center">
                  {index === 0 && (
                    <span role="img" aria-label="diamond" className="text-3xl">💎</span>
                  )}
                  {index === 1 && (
                    <div className="relative flex items-center">
                      <span role="img" aria-label="diamond" className="text-3xl">💎</span>
                      <span role="img" aria-label="diamond" className="text-3xl ml-[-22px] mb-[6px]" >💎</span>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="relative flex items-center">
                      <span role="img" aria-label="diamond" className="text-3xl">💎</span>
                      <span role="img" aria-label="diamond" className="text-3xl ml-[-22px] mb-[6px]" >💎</span>
                      <span role="img" aria-label="diamond" className="text-3xl ml-[-20px] mb-[1px]" >💎</span>
                    </div>
                  )}
                </div>
                <p className="top-0 left-0 right-0 text-lg">{bundle.gems}</p>
                <p className="text-sm text-medium-emphasis mb-1">{bundle.discount}</p>
                <div className="flex-grow w-full h-full bg-white bg-opacity-20 rounded-b-xl text-primary font-bold text-lg">
                  ${bundle.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
