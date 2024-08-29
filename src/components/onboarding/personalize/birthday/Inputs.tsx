import React from 'react';

import { BirthdayComboBox } from '@/components/onboarding/personalize/birthday/BirthdayComboBox';
import { daysOfMonth, monthsOfYear } from '@/lib/inputsData';
import { formattedBirthday } from '@/components/profile/shared/UserDetails';

// Values for Birthday Inputs
export type Keys = { value: string; label: string }[];
const years: Keys = [];
for (let year = 2024; year >= 1923; year--) {
  years.push({ value: year.toString(), label: year.toString() });
}

interface IInputsProps {
  inputChangeHandler: (inputType: string, value: string) => void;
  isOnboardingPage?:boolean
  dob?:string
}

const Inputs = (props: IInputsProps) => {
  const { inputChangeHandler,isOnboardingPage,dob } = props;
  let formattedDate = formattedBirthday(dob);

  let [month, day, year] = formattedDate !== 'Invalid Date'
    ? formattedDate.replace(',', '').split(' ')
    : ['Invalid', '', ''];
  return (
    <form className='mx-auto flex gap-2 text-high-emphasis'>
      <BirthdayComboBox
        placeholder={'Day'}
        keys={daysOfMonth}
        inputMode='numeric'
        inputChangeHandler={inputChangeHandler}
        inputType='day'
        value={day}
        isOnboardingPage={isOnboardingPage}
      />
      <BirthdayComboBox
        placeholder={'Month'}
        keys={monthsOfYear}
        inputMode='text'
        inputChangeHandler={inputChangeHandler}
        inputType='month'
        value={month}
        isOnboardingPage={isOnboardingPage}
      />
      <BirthdayComboBox
        placeholder={'Year'}
        keys={years}
        inputMode='numeric'
        inputChangeHandler={inputChangeHandler}
        inputType='year'
        value={year}
        isOnboardingPage={isOnboardingPage}
      />
    </form>
  );
};

export default Inputs;
