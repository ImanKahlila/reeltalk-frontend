import React, { forwardRef } from 'react';

import GreenCheckIcon from '@/components/onboarding/GreenCheckIcon';

interface EmailInputProps {
  emailValid: boolean;
  emailChangeHandler: () => void;
}

const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>((props, ref) => {
  const { emailValid, emailChangeHandler } = props;
  return (
    <form className='mx-auto mt-[40px] flex max-w-xs flex-col gap-6'>
      <div
        className={`flex items-center justify-between gap-[10px] rounded-lg border border-solid bg-first-surface pl-6 pr-3 transition-all duration-500  ${
          emailValid ? 'border-primary' : 'border-medium-emphasis'
        }`}
      >
        <input
          className={`w-full bg-transparent py-[13px] text-base placeholder-gray outline-none`}
          type='text'
          placeholder='Email'
          ref={ref}
          onChange={emailChangeHandler}
        />
        <div>
          <GreenCheckIcon
            className={`opacity-0 transition-opacity duration-500 ${
              emailValid ? 'opacity-100' : ''
            }`}
          />
        </div>
      </div>
    </form>
  );
});

// Set display name for the component
EmailInput.displayName = 'EmailInput';

export default EmailInput;
