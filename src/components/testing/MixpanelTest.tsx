"use client";

import React, { useState } from 'react';
import { useMixpanel } from '@/hooks/useMixpanel';
import { 
  trackUserLogin, 
  trackUserLogout, 
  trackContentCreated, 
  trackButtonClick,
  trackSearch,
  trackError,
  updateUserProfile
} from '@/utils/mixpanel/trackingEvents';

/**
 * Test component for Mixpanel functionality
 * This component can be temporarily added to any page to test Mixpanel tracking
 */
const MixpanelTest: React.FC = () => {
  const { track, identify, setUser, reset, trackClick, isReady } = useMixpanel();
  const [testResults, setTestResults] = useState<string[]>([]);
  const [userId, setUserId] = useState('test-user-123');

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testBasicTracking = () => {
    track('Test Event', { test_property: 'test_value' });
    addResult('✅ Basic event tracked');
  };

  const testUserIdentification = () => {
    identify(userId);
    setUser({
      $email: 'test@example.com',
      $name: 'Test User',
      user_type: 'customer',
      subscription_plan: 'premium'
    });
    addResult('✅ User identified and properties set');
  };

  const testAuthEvents = () => {
    trackUserLogin('email', userId);
    addResult('✅ Login event tracked');
  };

  const testContentEvents = () => {
    trackContentCreated('blog_post', 'post-123');
    addResult('✅ Content creation event tracked');
  };

  const testSearchEvent = () => {
    trackSearch('test query', 5);
    addResult('✅ Search event tracked');
  };

  const testErrorEvent = () => {
    trackError('test_error', 'Test error message', 'MixpanelTest component');
    addResult('✅ Error event tracked');
  };

  const testButtonClick = () => {
    trackButtonClick('Test Button', 'MixpanelTest component');
    trackClick('Custom Click Test');
    addResult('✅ Button click events tracked');
  };

  const testUserLogout = () => {
    trackUserLogout();
    addResult('✅ Logout event tracked and user reset');
  };

  const clearResults = () => {
    setTestResults([]);
  };

  if (!isReady) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
        <h3 className="font-bold text-yellow-800">⚠️ Mixpanel Not Ready</h3>
        <p className="text-yellow-700">
          Mixpanel is not initialized yet. Check the console for initialization errors.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🧪 Mixpanel Testing Dashboard</h2>
      
      <div className="mb-4 p-3 bg-green-100 border border-green-400 rounded">
        <p className="text-green-800">
          ✅ Mixpanel is ready! All tracking functions are available.
        </p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Test User ID:
        </label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter test user ID"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={testBasicTracking}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Test Basic Event
        </button>
        
        <button
          onClick={testUserIdentification}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Test User ID
        </button>
        
        <button
          onClick={testAuthEvents}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Test Login
        </button>
        
        <button
          onClick={testContentEvents}
          className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
        >
          Test Content
        </button>
        
        <button
          onClick={testSearchEvent}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
        >
          Test Search
        </button>
        
        <button
          onClick={testErrorEvent}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Test Error
        </button>
        
        <button
          onClick={testButtonClick}
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
        >
          Test Clicks
        </button>
        
        <button
          onClick={testUserLogout}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Test Logout
        </button>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-800">Test Results</h3>
          <button
            onClick={clearResults}
            className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400 transition-colors"
          >
            Clear
          </button>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded p-3 max-h-40 overflow-y-auto">
          {testResults.length === 0 ? (
            <p className="text-gray-500 italic">No tests run yet. Click buttons above to test Mixpanel tracking.</p>
          ) : (
            <ul className="space-y-1">
              {testResults.map((result, index) => (
                <li key={index} className="text-sm text-gray-700 font-mono">
                  {result}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <p className="mb-2">
          <strong>Instructions:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Open browser DevTools and check the Console tab</li>
          <li>Look for Mixpanel initialization and tracking messages</li>
          <li>Check the Network tab for requests to Mixpanel endpoints</li>
          <li>Verify events appear in your Mixpanel dashboard</li>
        </ul>
      </div>
    </div>
  );
};

export default MixpanelTest;
