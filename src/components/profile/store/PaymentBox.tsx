import React, { useEffect, useState } from 'react';
import { useDropdown, useField } from '@/hooks/Input';
import { usePlanSelectionContext } from '@/lib/planSelectionContext';

export const PaymentBox=()=>{
  const { amountToPay } = usePlanSelectionContext();

  const  firstName = useField('text', '', { required: true });
  const lastName  = useField('text', '', { required: true });
  // cardNumber value consists of 13 to 19 digits.
  const cardNumber = useField('tel', '', { required: true, pattern: '^[0-9]{13,19}$' });
  // MM between 01 and 12 and YY last two digits of the year
  const expirationDate = useField('text', '', { required: true, pattern: '^(0[1-9]|1[0-2])\/?([0-9]{2})$' });
  // cvv value consists of 3 or 4 digits
  const cvv = useField('text', '', { required: true, pattern: '^[0-9]{3,4}$' });
  // basic email pattern
  const email = useField('email', '', { required: true, pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' });
  const address = useField('text', '', { required: true });
  const city = useField('text', '', { required: true });
  const state = useField('text', '', { required: true });
  // 5-digit or 9-digit with hypen ZIP codes
  const postalCode = useField('text', '', { required: true, pattern: '^[0-9]{5}(-[0-9]{4})?$' });

  const countryDropdown = useDropdown(['United States', 'Canada']);

  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  useEffect(() => {
    const isValid =
      firstName.isValid &&
      lastName.isValid &&
      cardNumber.isValid &&
      expirationDate.isValid &&
      cvv.isValid &&
      email.isValid &&
      address.isValid &&
      city.isValid &&
      state.isValid &&
      postalCode.isValid &&
      countryDropdown.isValid;
    setIsFormValid(isValid);
  }, [
    firstName.isValid,
    lastName.isValid,
    cardNumber.isValid,
    expirationDate.isValid,
    cvv.isValid,
    email.isValid,
    address.isValid,
    city.isValid,
    state.isValid,
    postalCode.isValid,
    countryDropdown.isValid
  ]);
  const handleSubmit = (event:any) => {
    event.preventDefault();
    if (isFormValid) {
      // Handle form submission
    } else {
      console.error('Form is not valid');
    }
  };

  return (<div
      className="flex flex-col w-2/3 bg-second-surface rounded-xl border-transparent p-2 text-high-emphasis">
      <form className="space-y-4 p-4" onSubmit={handleSubmit}>
        <p className="text-lg">Payment Information</p>
        <div className="flex flex-row space-x-2">
          <div className="flex flex-col w-1/2">
            <label htmlFor="first-name" className="block text-sm mb-1">First
              Name</label>
            <input
              id="first-name"
              {...firstName}
              className="px-3 py-2 rounded-md border bg-transparent"
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
              {...lastName}
              className="px-3 py-2 rounded-md border bg-transparent"
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
            <input
              id="card-number"
              {...cardNumber}
              className="w-full px-3 py-2 rounded-md border bg-transparent"
              inputMode="tel"
              pattern="^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$"
              placeholder="---- ---- ---- ----"
              required
            />
            {cardNumber.errors.map((error, idx) => (
              <p key={idx} className="text-red-500 text-xs">{error}</p>
            ))}
          </div>
          <div className="w-1/4">
            <label htmlFor="expiration-date" className="block text-sm mb-1">Expiration
              Date</label>
            <input
              id="expiration-date"
              {...expirationDate}
              className="w-full px-3 py-2 rounded-md border bg-transparent"
              placeholder="MM/YY"
              required
            />
            {expirationDate.errors.map((error, idx) => (
              <p key={idx} className="text-red-500 text-xs">{error}</p>
            ))}
          </div>
          <div className="w-1/4">
            <label htmlFor="cvv" className="block text-sm mb-1">CVV</label>
            <input
              id="cvv"
              {...cvv}
              className="w-full px-3 py-2 rounded-md border bg-transparent"
              placeholder="---"
              required
            />
            {cvv.errors.map((error, idx) => (
              <p key={idx} className="text-red-500 text-xs">{error}</p>
            ))}
          </div>
        </div>
        <p className="text-lg">Billing Address</p>
        <div>
          <label htmlFor="email" className="block text-sm mb-1">Email
            Address</label>
          <input
            id="email"
            {...email}
            className="w-full px-3 py-2 rounded-md border bg-transparent"
            placeholder="xxxx@mail.com"
            required
          />
          {email.errors.map((error, idx) => (
            <p key={idx} className="text-red-500 text-xs">{error}</p>
          ))}
        </div>
        <div className="flex flex-row space-x-2">
          <div className="w-2/3">
            <label htmlFor="address"
                   className="block text-sm mb-1">Address</label>
            <input
              id="address"
              {...address}
              className="w-full px-3 py-2 rounded-md border bg-transparent"
              placeholder="Address"
              required
            />
            {address.errors.map((error, idx) => (
              <p key={idx} className="text-red-500 text-xs">{error}</p>
            ))}
          </div>
          <div className="w-1/3">
            <label htmlFor="city" className="block text-sm mb-1">City</label>
            <input
              id="city"
              {...city}
              className="w-full px-3 py-2 rounded-md border bg-transparent"
              placeholder="City"
              required
            />
            {city.errors.map((error, idx) => (
              <p key={idx} className="text-red-500 text-xs">{error}</p>
            ))}
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <div className="w-1/3">
            <label htmlFor="country"
                   className="block text-sm mb-1">Country</label>
            <countryDropdown.Dropdown />
          </div>
          <div className="w-1/3">
            <label htmlFor="state"
                   className="block text-sm mb-1">State/Province</label>
            <input
              id="state"
              {...state}
              className="w-full px-3 py-2 rounded-md border bg-transparent"
              placeholder="State"
              required
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
              {...postalCode}
              className="w-full px-3 py-2 rounded-md border bg-transparent"
              placeholder="Postal Code"
              required
            />
            {postalCode.errors.map((error, idx) => (
              <p key={idx} className="text-red-500 text-xs">{error}</p>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className={`w-full px-3 py-2 rounded-md text-white ${isFormValid ? 'bg-primary' : 'bg-gray cursor-not-allowed'}`}
          disabled={!isFormValid}
        >
          Pay ${amountToPay}
        </button>
      </form>
    </div>
  )
}