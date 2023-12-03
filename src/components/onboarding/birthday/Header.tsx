import React from 'react';
import { User } from 'firebase/auth';

interface IHeaderProps {
  user: User;
}

const Header = (props: IHeaderProps) => {
  const { user } = props;
  return (
    <header className='w-full text-center text-high-emphasis'>
      <h1 className='text-[28px] font-medium tracking-[-0.42px] '>
        Welcome{' '}
        {user?.displayName
          ? user.displayName.charAt(0).toUpperCase() + user.displayName.slice(1)
          : 'User'}
        !
        <br className='hidden md:block' /> Mind sharing your birthdate?
      </h1>
      <p className='mx-auto mt-[10px] text-base leading-[21.86px] tracking-[0.08px] md:max-w-[504px]'>
        To personalize your content recommendations and to ensure it&apos;s all age-appropriate,
        could you kindly share your date of birth with us?
      </p>
    </header>
  );
};

export default Header;
