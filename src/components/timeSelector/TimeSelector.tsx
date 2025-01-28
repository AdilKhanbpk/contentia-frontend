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

  const handleClick = (value: string) => {
    setSelectedTime((prevValue) => (prevValue === value ? '' : value));
  };

  const isValidTimeButton = (child: ReactNode): child is ReactElement<ButtonProps> => {
    return React.isValidElement(child) && 'value' in child.props;
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (isValidTimeButton(child)) {
      const { value, className, ...restProps } = child.props;
      const isSelected = selectedTime === value;
      return cloneElement(child, {
        onClick: () => handleClick(value),
        className: `px-2  py-0 rounded-full text-xs font-medium ${
          isSelected ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'
        } transition-all duration-300 ${className || ''}`,
        ...restProps,
      });
    }

    return child;
  });

  return <div className="flex space-x-2">{childrenWithProps}</div>;
};

export default TimeSelector;
