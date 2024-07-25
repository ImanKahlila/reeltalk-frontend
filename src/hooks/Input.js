import { useState, useEffect } from 'react';

export const useField = (type, initialValue = '', validation = {}) => {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    validate(value);
  }, [value]);

  const validate = (value) => {
    const newErrors = [];
    if (validation.required && !value) {
      newErrors.push('This field is required');
    }
    if (validation.pattern && value && !new RegExp(validation.pattern).test(value)) {
      newErrors.push('Invalid value');
    }
    setErrors(newErrors);
    setIsValid(newErrors.length === 0);
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
    isValid,
  };
};

export const useDropdown = (options = []) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const isValid = selectedValue !== '';

  const Dropdown = () => (
    <select
      value={selectedValue}
      onChange={handleChange}
      className="w-full px-3 py-2 rounded-md border bg-transparent"
    >
      {options.map((option, idx) => (
        <option key={idx} value={option}>{option}</option>
      ))}
    </select>
  );

  return {
    selectedValue,
    isValid,
    Dropdown,
  };
};
