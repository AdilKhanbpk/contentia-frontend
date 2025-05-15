"use client";

import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

interface AnalyticsErrorHandlerProps {
  error?: string | null;
}

const AnalyticsErrorHandler: React.FC<AnalyticsErrorHandlerProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4 rounded shadow-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Google Analytics Error
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              There was an issue connecting to Google Analytics. This might be due to:
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>The Google Analytics project has been deleted or reconfigured</li>
              <li>API credentials have expired or been revoked</li>
              <li>Network connectivity issues</li>
            </ul>
            <p className="mt-2">
              Please contact your administrator to update the Google Analytics configuration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsErrorHandler;
