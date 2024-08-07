import React, { useEffect, useState } from 'react';
import { useDropdown, useField } from '@/hooks/Input';
import { usePlanSelectionContext } from '@/lib/planSelectionContext';
import Modal from '@/components/profile/store/Modal';
import Image from 'next/image';
import { COUNTRIES } from '@/components/profile/Constants';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useUserContext } from '@/lib/context';
import toast from 'react-hot-toast';
import { chain } from 'lodash';
import { HandleSuccessfulTransaction } from '@/services/transactionHandler';

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublicKey) {
  throw new Error('Missing Stripe publishable key');
}

const stripePromise = loadStripe(stripePublicKey);
const cardImages = [
  '/Profile/payment/cards/visa.png',
  '/Profile/payment/cards/master.png',
  '/Profile/payment/cards/discover.png',
  '/Profile/payment/cards/amex.png',
  '/Profile/payment/cards/paypal.png',
];

const PaymentBox = () => {
  // Get Stripe and Elements context
  const stripe = useStripe();
  const elements = useElements();

  const { amountToPay,resetSelectedPlan, planChosen} = usePlanSelectionContext();
  const [showModal, setShowModal] = React.useState(false);
  const {idToken } = useUserContext();
  const [loading, setLoading] = useState<boolean>(false);

  const firstName = useField('text', '', { required: true });
  const lastName = useField('text', '', { required: true });
  // Removed cardNumber, expirationDate, and cvv fields as they are handled by Stripe Elements
  const email = useField('email', '', {
    required: true,
    pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
  });
  const address = useField('text', '', { required: true });
  const city = useField('text', '', { required: true });
  const state = useField('text', '', { required: true });
  // 5-digit or 9-digit with hypen ZIP codes
  const postalCode = useField('text', '', {
    required: true,
    pattern: '^[0-9]{5}(-[0-9]{4})?$',
  });

  const countryDropdown = useDropdown(COUNTRIES);

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [cardError, setCardError] = useState<string | null>(null);

  // Validate form fields
  useEffect(() => {
    const isValid =
      firstName.isValidInput&&
      lastName.isValidInput &&
      email.isValidInput &&
      address.isValidInput &&
      city.isValidInput &&
      state.isValidInput &&
      postalCode.isValidInput &&
      countryDropdown.isValidInput &&
      amountToPay > 0;

    setIsFormValid(isValid);
  }, [
    firstName.isValidInput,
    lastName.isValidInput,
    email.isValidInput,
    address.isValidInput,
    city.isValidInput,
    state.isValidInput,
    postalCode.isValidInput,
    countryDropdown.isValidInput,amountToPay
  ]);

  // Handle Stripe Element changes to capture any errors
  const handleCardChange = (event: any) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }
  };


  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) {
      console.error('Form is not valid');
      return;
    }

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);

    const resetFormValues = () =>{
      firstName.reset();
      lastName.reset();
      email.reset();
      address.reset();
      city.reset();
      state.reset();
      postalCode.reset();
      countryDropdown.reset();
      cardElement?.clear();
      elements.getElement(CardExpiryElement)?.clear();
      elements.getElement(CardCvcElement)?.clear();
    }

    if (!cardElement) {
      console.error("CardElement is not available");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        // `https://us-central1-reeltalk-app.cloudfunctions.net/backend/payment/create`,
        'http://localhost:8080/payment/create',
        {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description:planChosen.description,
          amount: Math.round(amountToPay * 100), // Stripe amount is in cents
          currency: 'usd',
          billing_details: {
            name: `${firstName.value} ${lastName.value}`,
            email: email.value,
            address: {
              line1: address.value,
              city: city.value,
              state: state.value,
              postal_code: postalCode.value,
              country: countryDropdown.selectedValue,
            },
          },
        }),
      });
      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${firstName.value} ${lastName.value}`,
            email: email.value,
            address: {
              line1: address.value,
              city: city.value,
              state: state.value,
              postal_code: postalCode.value,
              country: countryDropdown.selectedValue,
            },
          },
        },
      });
      if (error) {
        toast.error(error.message||"There is error in processing the payment");
        setIsFormValid(false);
      } else if (paymentIntent?.status === 'succeeded') {
        //TODO: Test this method after backend implementation
        // await handleSuccessfulTransaction(planChosen)
        //TODO: handle if the subscription/gem update fails
        resetSelectedPlan();
        resetFormValues();
        setShowModal(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  // Stripe Element styles
  const elementStyles = {
    base: {
      fontSize: '16px',
      color: '#fff',
      '::placeholder': {
        color: '#FFFFFF60',
      },
    },
    invalid: {
      color: '#FF453A',
    },
    complete: {
      color: '#fff',
    },
  };


  return (
    <div className="mt-2 flex flex-col bg-second-surface rounded-xl border-transparent p-2 text-high-emphasis">
      <form className="space-y-4 p-4" onSubmit={handleSubmit}>
        <div className="flex flex-row items-center justify-between">
          <p className="text-lg">Payment Information</p>
          <div className="flex flex-row gap-2">
            {cardImages.map((src, index) => (
              <div key={index} className="relative w-10 h-6">
                <Image
                  src={src}
                  sizes="100%"
                  fill
                  alt={`Card ${index}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row space-x-2">
          <div className="flex flex-col w-1/2">
            <label htmlFor="first-name" className="block text-sm mb-1">First
              Name</label>
            <input
              id="first-name"
              value={firstName.value}
              onChange={firstName.onChange}
              className="px-3 py-2 rounded-md border bg-transparent placeholder-disabled"
              placeholder="First Name"
            />
            {firstName.errors.map((error, idx) => (
              <p key={idx} className="text-red-500 text-xs">{error}</p>
            ))}
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="last-name" className="block text-sm mb-1">Last
              Name</label>
            <input
              id="last-name"
              value={lastName.value}
              onChange={lastName.onChange}
              className="px-3 py-2 rounded-md border bg-transparent placeholder-disabled"
              placeholder="Last Name"
            />
            {lastName.errors.map((error, idx) => (
              <p key={idx} className="text-red-500 text-xs">{error}</p>
            ))}
          </div>
        </div>

        <div className="flex flex-row space-x-2">
          <div className="w-2/4">
            <label htmlFor="card-number" className="block text-sm mb-1">Card
              Number</label>
            <div role="group" aria-labelledby="card-number-label">
              <CardNumberElement
                id="card-number"
                className="w-full px-3 py-2 rounded-md border bg-transparent"
                options={{
                  style: elementStyles,
                  placeholder: '---- ---- ---- ----',

                }}
                onChange={handleCardChange}
              />
            </div>
            {cardError && <p className="text-red-500 text-xs">{cardError}</p>}
          </div>
          <div className="w-1/4">
            <label htmlFor="expiration-date" className="block text-sm mb-1">Expiration
              Date</label>
            <div role="group" aria-labelledby="expiration-date-label">
              <CardExpiryElement
                id="expiration-date"
                className="w-full px-3 py-2 rounded-md border bg-transparent"
                options={{
                  style: elementStyles,
                  placeholder: 'MM/YY',
                }}
                onChange={handleCardChange}
              />
            </div>
          </div>

          <div className="w-1/4">
            <label htmlFor="cvv" className="block text-sm mb-1">CVV
              <span
                className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full border">!</span>
            </label>
            <div role="group" aria-labelledby="cvv-label">
              <CardCvcElement
                id="cvv"
                className="w-full px-3 py-2 rounded-md border bg-transparent"
                options={{
                  style: elementStyles,
                  placeholder: '---',
                }}
                onChange={handleCardChange}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm mb-1">Email</label>
          <input
            id="email"
            value={email.value}
            onChange={email.onChange}
            className="w-full px-3 py-2 rounded-md border bg-transparent placeholder-disabled"
            placeholder="xxxx@mail.com"
          />
          {email.errors.map((error, idx) => (
            <p key={idx} className="text-red-500 text-xs">{error}</p>
          ))}
        </div>

        <div>
          <label htmlFor="address"
                 className="block text-sm mb-1">Address</label>
          <input
            id="address"
            value={address.value}
            onChange={address.onChange}
            className="w-full px-3 py-2 rounded-md border bg-transparent placeholder-disabled"
            placeholder="Address"
          />
          {address.errors.map((error, idx) => (
            <p key={idx} className="text-red-500 text-xs">{error}</p>
          ))}
        </div>

        <div className="flex flex-row space-x-2">
          <div className="w-1/3">
            <label htmlFor="city" className="block text-sm mb-1">City</label>
            <input
              id="city"
              value={city.value}
              onChange={city.onChange}
              className="w-full px-3 py-2 rounded-md border bg-transparent placeholder-disabled"
              placeholder="City"
            />
            {city.errors.map((error, idx) => (
              <p key={idx} className="text-red-500 text-xs">{error}</p>
            ))}
          </div>

          <div className="w-1/3">
            <label htmlFor="state" className="block text-sm mb-1">State</label>
            <input
              id="state"
              value={state.value}
              onChange={state.onChange}
              className="w-full px-3 py-2 rounded-md border bg-transparent placeholder-disabled"
              placeholder="State"
            />
            {state.errors.map((error, idx) => (
              <p key={idx} className="text-red-500 text-xs">{error}</p>
            ))}
          </div>

          <div className="w-1/3">
            <label htmlFor="postal-code" className="block text-sm mb-1">Postal
              Code</label>
            <input
              id="postal-code"
              value={postalCode.value}
              onChange={postalCode.onChange}
              className="w-full px-3 py-2 rounded-md border bg-transparent placeholder-disabled"
              placeholder="Postal Code"
            />
            {postalCode.errors.map((error, idx) => (
              <p key={idx} className="text-red-500 text-xs">{error}</p>
            ))}
          </div>
        </div>

        <div className="w-1/3">
          <label htmlFor="country"
                 className="block text-sm mb-1">Country</label>
          <countryDropdown.Dropdown />
        </div>

        <button
          type="submit"
          className={`w-full px-3 py-2 rounded-md text-white ${isFormValid ? 'bg-primary' : 'bg-gray cursor-not-allowed'}`}
          disabled={!isFormValid || loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-2 w-2 mr-3" viewBox="0 0 24 24">
              </svg>
              Processing...
            </>
          ) : (
            `Pay $${amountToPay}`
          )}
        </button>

        {showModal ? (
          <Modal showModal={showModal} setShowModal={setShowModal} />
        ) : null}
      </form>
    </div>
  );
};

// Wrap the PaymentBox component in Stripe's Elements provider
const WrappedPaymentBox = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentBox />
    </Elements>
  );
};

export default WrappedPaymentBox;
