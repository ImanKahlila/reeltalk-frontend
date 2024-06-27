import React from 'react';

import { BirthdayComboBox } from '@/components/onboarding/birthday/BirthdayComboBox';
import { daysOfMonth, monthsOfYear } from '@/lib/inputsData';

// Values for Birthday Inputs
export type Keys = { value: string; label: string }[];
const years: Keys = [];
for (let year = 2024; year >= 1923; year--) {
  years.push({ value: year.toString(), label: year.toString() });
}

interface IInputsProps {
  inputChangeHandler: (inputType: string, value: string) => void;
}

const Inputs = (props: IInputsProps) => {
  const { inputChangeHandler } = props;
  return (
    <form className='mx-auto mt-4 flex gap-2 text-high-emphasis'>
      <BirthdayComboBox
        placeholder={'Day'}
        keys={daysOfMonth}
        inputMode='numeric'
        inputChangeHandler={inputChangeHandler}
        inputType='day'
      />
      <BirthdayComboBox
        placeholder={'Month'}
        keys={monthsOfYear}
        inputMode='text'
        inputChangeHandler={inputChangeHandler}
        inputType='month'
      />
      <BirthdayComboBox
        placeholder={'Year'}
        keys={years}
        inputMode='numeric'
        inputChangeHandler={inputChangeHandler}
        inputType='year'
      />
    </form>
  );
};

export default Inputs;
