import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  required = false,
  ...rest
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={label} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={label}
        name={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        alt={placeholder}
        className="mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
        {...rest}
      />
    </div>
  );
};

export default Input;