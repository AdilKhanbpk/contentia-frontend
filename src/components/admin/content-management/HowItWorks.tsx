"use client";
import React, { useState } from "react";

export default function HowItWorks() {

  // New state variables for "How It Works" fields
  const [howItWorksTitle1, setHowItWorksTitle1] = useState<string>("");
  const [howItWorksSubtitle1, setHowItWorksSubtitle1] = useState<string>("");
  const [stepTitles, setStepTitles] = useState<string[]>(["", "", "", ""]);
  const [stepDescriptions, setStepDescriptions] = useState<string[]>(["", "", "", ""]);

  return (
    <div className="flex flex-col px-4 sm:px-6 md:px-12 lg:pl-72 lg:mt-28">

      {/* "How It Works" fields */}
      <h2 className="text-lg font-semibold mb-6">How It Works</h2>

      {/* Section Title */}
      <div className="mt-4 w-1/2">
        <label className="block text-sm font-semibold">How It Works Section Title - 1</label>
        <input
          type="text"
          placeholder="Nasıl Çalışır?"
          value={howItWorksTitle1}
          onChange={(e) => setHowItWorksTitle1(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
        />
      </div>

      {/* Section Subtitle */}
      <div className="mt-4 w-1/2">
        <label className="block text-sm font-semibold">How It Works Section Subtitle - 1</label>
        <input
          type="text"
          placeholder="Tek bir platformda, UGC içeriklerine kolayca erişin"
          value={howItWorksSubtitle1}
          onChange={(e) => setHowItWorksSubtitle1(e.target.value)}
          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
        />
      </div>

      {/* Step Titles and Descriptions */}
      {stepTitles.map((stepTitle, index) => (
        <div key={index} className="mt-4 w-1/2">
          <label className="block text-sm font-semibold">How It Works Step Title - {index + 1}</label>
          <input
            type="text"
            placeholder={`Step ${index + 1} Title`}
            value={stepTitles[index]}
            onChange={(e) => {
              const newStepTitles = [...stepTitles];
              newStepTitles[index] = e.target.value;
              setStepTitles(newStepTitles);
            }}
            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
          />

          <label className="block text-sm font-semibold mt-2">How It Works Step Description - {index + 1}</label>
          <input
            type="text"
            placeholder={`Step ${index + 1} Description`}
            value={stepDescriptions[index]}
            onChange={(e) => {
              const newStepDescriptions = [...stepDescriptions];
              newStepDescriptions[index] = e.target.value;
              setStepDescriptions(newStepDescriptions);
            }}
            className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none"
          />
        </div>
      ))}

      {/* Save Button */}
      <div className="flex justify-end my-6">
        <button className="ButtonBlue text-white px-8 py-1 rounded-lg font-semibold">
          Save
        </button>
      </div>
    </div>
  );
}
