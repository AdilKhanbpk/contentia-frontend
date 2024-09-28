"use client";

import React, { useState } from 'react';
import Beginning from '@/components/Creator/Beginning';
import ProfileInformation from '@/components/Creator/ProfileInformation';
import PaymentInformation from '@/components/Creator/PaymentInformation'
import Navbar from '@/components/navbar/Navbar';
import Preferences from '@/components/Creator/Preferences';

type Step = {
  label: string;
  component: JSX.Element | null;
};

const BecomeCreator: React.FC = () => {
  // State to track the active step
  const [activeStep, setActiveStep] = useState<string>('Başlangıç');

  // Define the steps with their corresponding components
  const steps: Step[] = [
    { label: 'Başlangıç', component: <Beginning /> },
    { label: 'Profil Bilgileri', component: <ProfileInformation /> },
    { label: 'Ödeme Bilgileri', component: <PaymentInformation/> }, // Add the relevant component when available
    { label: 'Tercihler', component: <Preferences/> }, // Add the relevant component when available
  ];

  return (
    <>
      <Navbar />
     <div className='bg-gray-100 mt-14 md:mt-24'>
     <div className="   w-[90vw] md:w-[80vw]  lg:w-[80vw] mx-auto mb-6">
        <div className="flex flex-wrap justify-between items-center   p-2">
          {steps.map((step) => (
            <div
              key={step.label}
              className="flex flex-col  items-center mb-4 md:mb-0 cursor-pointer  mt-6 "
              onClick={() => setActiveStep(step.label)}
            >
              <div
                className={`border-2  rounded-full w-24 md:w-32 lg:w-60 h-1 ${
                  activeStep === step.label ? 'border-blue-900 bg-blue-900 ' : 'border-gray-300 bg-gray-300'
                }`}
              />
              <h1 className={`${activeStep === step.label ? 'text-blue-800 font-bold' : 'text-gray-700'}`}>
                {step.label}
              </h1>
            </div>
          ))}
        </div>

        
      </div>
      {/* Render the active component */}
      <div className="p-4 ">
          {steps.find((step) => step.label === activeStep)?.component}
        </div>
     </div>
    </>
  );
};

export default BecomeCreator;
