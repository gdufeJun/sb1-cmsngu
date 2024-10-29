import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  Icon: LucideIcon;
  rightElement?: React.ReactNode;
}

export default function FormInput({
  id,
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  Icon,
  rightElement,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          className="appearance-none relative block w-full pl-12 pr-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={placeholder}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}