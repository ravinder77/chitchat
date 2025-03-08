import React from 'react';

const CheckboxInput = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center cursor-pointer select-none">
      {/* Hidden native checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {/* Custom checkbox design */}
      <div className="w-6 h-6 flex items-center justify-center border-2 rounded transition-colors duration-200 ease-in-out
                      border-gray-400 bg-white
                      group-hover:border-blue-400
                      checked:bg-blue-500 checked:border-blue-500">
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      {label && <span className="ml-3 text-gray-700">{label}</span>}
    </label>
  );
};

export default CheckboxInput;
