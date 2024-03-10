import React, { useState } from 'react';
import axios from 'axios';

import FisrtWaitlistImg from '../../../public/LandingPage/Value-Niche.png';
import SecondWaitlistImg from '../../../public/LandingPage/Value-Discover.png';

// Firebase
import Image from 'next/image';
import SuccessModal from '../SuccessModal';

const WaitListSection = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isSuccessModalVisible, setSuccessModalVisible] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const handleSignup = async () => {
    try {
      if (!name || !email) {
        console.error('Name and email are required.');
        return;
      }

      if (!validateEmail(email)) {
        console.error('Invalid email format.');
        setIsEmailValid(false);
        return;
      }

      setIsEmailValid(true);

      const requestData = {
        name,
        email,
      };

      const response = await axios.post(
        'https://us-central1-reeltalk-app.cloudfunctions.net/api/waitlist/add',
        requestData,
      );

      if (response.status === 201) {
        console.log('User signed up successfully:', name, email);
        setName('');
        setEmail('');
        setSuccessModalVisible(true); // Show the success modal on successful signup
      } else {
        console.error('Error signing up. Status:', response.status);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const buttonClassName = `w-[242px] h-[44px] mx-auto flex items-center justify-center rounded-lg p-[10px] font-semibold tracking-eight text-secondary transition-colors duration-300 ${
    !name || !email || !isEmailValid ? 'bg-gray text-disabled' : 'bg-orange-dark text-black'
  }`;

  return (
    <>
      <div className='my-[48px] md:my-[24px]'>
        <header className='mx-auto mb-4 flex max-w-[320px] flex-col items-center'>
          <h1 className='flex h-[38px] justify-center text-xl font-medium tracking-[0.1px] text-high-emphasis md:mb-[20px] md:text-[28px]'>
            Join the Waitlist
          </h1>
          <p className='mb-2 text-center tracking-eight text-medium-emphasis sm:w-[270px]'>
            Create or join vibrant communities to engage in lively discussions about your favorite
            movies and TV shows.
          </p>
        </header>

        <div className='mx-auto mb-12 flex max-w-[200px] flex-col gap-6 lg:gap-[40px]'>
          <div className='max-w-[352px]'>
            <div className='mx-auto flex max-w-sm items-center justify-between'>
              <picture className='relative block aspect-[128/227] w-[50%] md:max-w-[293px]'>
                <Image src={FisrtWaitlistImg} fill alt=''></Image>
              </picture>
              <picture className='relative block aspect-[128/227] w-[50%] md:max-w-[293px]'>
                <Image src={SecondWaitlistImg} fill alt=''></Image>
              </picture>
            </div>
          </div>
        </div>
        <div className='mx-auto mb-12 flex max-w-[320px] flex-col md:max-w-[440px] md:flex-col lg:gap-[40px]'>
          <div className='mb-[24px] md:mb-0'>
            <input
              className='w-full rounded-lg border border-medium-emphasis bg-first-surface py-3 pl-6 pr-3 tracking-eight text-high-emphasis placeholder-disabled focus:border-primary focus:outline-none focus:ring-0'
              placeholder='Name'
              type='text'
              name='name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='mb-[24px] md:mb-[-10px]'>
            <input
              className={`w-full rounded-lg border focus:border-primary focus:outline-none focus:ring-0 ${
                !isEmailValid ? 'border-[#E57F7A]' : '' // Add red border for invalid email
              } border-medium-emphasis bg-first-surface py-3 pl-6 pr-3 tracking-eight text-high-emphasis placeholder-disabled`}
              placeholder='Email'
              type='email'
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='my-[48px]'>
        <button
          type='button'
          onClick={handleSignup}
          className={`mx-auto flex h-[44px] w-[242px] items-center justify-center rounded-lg p-[10px] font-semibold tracking-eight transition-colors duration-300 ${
            !name || !email || !validateEmail(email)
              ? 'bg-gray text-disabled'
              : 'bg-primary text-black'
          }`}
          disabled={!name || !email || !validateEmail(email)}
        >
          Notify me when app launches
        </button>
      </div>
      <SuccessModal visible={isSuccessModalVisible} onClose={() => setSuccessModalVisible(false)} />
    </>
  );
};

export default WaitListSection;
