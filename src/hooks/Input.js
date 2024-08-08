import { useState, useEffect } from 'react';

export const useField = (type, initialValue = '', validation = {}) => {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState([]);
  const [isValidInput, setIsValidInput] = useState(false);

  useEffect(() => {
    validate(value);
  }, [value]);

  const reset = () => {
    setValue(initialValue)
  }
  const validate = (value) => {
    const newErrors = [];
    if (validation.required && !value) {
      newErrors.push('This field is required');
    }
    if (validation.pattern && value && !new RegExp(validation.pattern).test(value)) {
      newErrors.push('Invalid value');
    }
    setErrors(newErrors);
    setIsValidInput(newErrors.length === 0);
  };

  const onChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    validate(newValue); // Validate on change
  };

  // Clear errors when value is empty or changes
  useEffect(() => {
    if (!value) {
      setErrors([]);
    }
  }, [value]);

  return {
    type,
    value,
    onChange,
    errors,
    isValidInput,
    reset
  };
};


export const useDropdown = (options = []) => {
  const initialValue= options[0]?options[0]:''
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const reset = () =>{
    setSelectedValue(initialValue);
  }

  const isValidInput = selectedValue !== '';

  const Dropdown = () => (
    <select
      value={selectedValue}
      onChange={handleChange}
      className="w-full px-3 py-2 rounded-md border bg-transparent"
    >
      {options.map((option, idx) => (
        <option key={idx} value={option.value}>{option.name}</option>
      ))}
    </select>
  );

  return {
    selectedValue,
    isValidInput,
    Dropdown,
    reset
  };
};
