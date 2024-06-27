import React from 'react';
import { User } from 'firebase/auth';
import { getFirstName } from '@/lib/utils';

interface IHeaderProps {
  user: User;
}

const Header = (props: IHeaderProps) => {
  const { user } = props;
  return (
    <header className='w-full text-center text-high-emphasis'>
      <h1 className="text-[28px] font-medium tracking-[-0.42px] ">
        Welcome{' '}
        {getFirstName(user?.displayName)}!
        <br className='hidden md:block' /> Personalize your journey
      </h1>
      <div className='mx-auto mt-[10px] text-base leading-[21.86px] tracking-[0.08px] md:max-w-[504px]'>
        Letting us know helps provide personalized content tailored for you. Your info will be used to tailor our content for you. It won’t be shared with any third parties.
      </div>
    </header>
  );
};

export default Header;
