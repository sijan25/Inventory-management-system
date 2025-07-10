import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      required = false,
      type = "text",
      icon,
      rightElement,
      className = "",
      containerClassName = "",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const getInputStyles = () => {
      if (variant === "form") {
        return `
        block w-full px-4 py-4 
        bg-gray-200 border-0 rounded-lg 
        focus:ring-2 focus:ring-indigo-500 focus:bg-white 
        transition-colors text-gray-900 placeholder-gray-500
        ${error ? "ring-2 ring-red-500 bg-red-50" : ""}
        ${className}
      `;
      }

      return `
      block w-full px-4 py-3.5 text-base
      ${icon ? "pl-12" : ""}
      ${rightElement ? "pr-12" : ""}
      border border-gray-300 rounded-lg
      focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
      placeholder-gray-400
      transition duration-150 ease-in-out
      ${error ? "border-red-300 focus:border-red-500 focus:ring-red-500" : ""}
      ${className}
    `;
    };

    return (
      <div className={`w-full ${containerClassName}`}>
        {label && (
          <label
            htmlFor={props.id || props.name}
            className="block text-base font-medium text-gray-700 mb-2"
          >
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            className={getInputStyles()}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
