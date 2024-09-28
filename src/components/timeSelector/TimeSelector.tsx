"use client";
import React, { ReactNode, ReactElement, useState, cloneElement } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

interface TimeSelectorProps {
  children: ReactNode;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ children }) => {
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Function to handle click events
  const handleClick = (value: string) => {
    setSelectedTime((prevValue) => (prevValue === value ? '' : value)); // Toggle selection
  };

  // Type guard to check if the child is a valid React element with 'value' prop
  const isValidTimeButton = (child: ReactNode): child is ReactElement<ButtonProps> => {
    return React.isValidElement(child) && 'value' in child.props;
  };

  // Map over children and apply styles based on whether the button is selected
  const childrenWithProps = React.Children.map(children, (child) => {
    if (isValidTimeButton(child)) {
      const { value, className, ...restProps } = child.props;

      // Determine if this button is selected
      const isSelected = selectedTime === value;

      // Clone the element with updated onClick and className props
      return cloneElement(child, {
        onClick: () => handleClick(value),
        className: `px-2  py-0 rounded-full text-xs font-medium ${
          isSelected ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'
        } transition-all duration-300 ${className || ''}`,
        ...restProps,
      });
    }

    return child; // Return child as is if it's not a valid button
  });

  return <div className="flex space-x-2">{childrenWithProps}</div>;
};

export default TimeSelector;
