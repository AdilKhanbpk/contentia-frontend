"use client";

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useTokenContext } from '@/context/TokenCheckingContext';

const AuthDebugPage = () => {
    const { user, loading: reduxLoading, token: reduxToken } = useSelector(
        (state: RootState) => state.login
    );
    const { token: contextToken, isAuthenticated, loading: contextLoading } = useTokenContext();

    const localStorageToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    const localStorageUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Authentication Debug Page</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Redux State */}
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3">Redux State</h2>
                    <div className="space-y-2 text-sm">
                        <p><strong>Loading:</strong> {reduxLoading ? 'true' : 'false'}</p>
                        <p><strong>Token:</strong> {reduxToken ? `${reduxToken.substring(0, 20)}...` : 'null'}</p>
                        <p><strong>User Role:</strong> {user?.role || 'null'}</p>
                        <p><strong>User Email:</strong> {user?.email || 'null'}</p>
                        <p><strong>User ID:</strong> {user?._id || 'null'}</p>
                    </div>
                </div>

                {/* Token Context */}
                <div className="bg-blue-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3">Token Context</h2>
                    <div className="space-y-2 text-sm">
                        <p><strong>Loading:</strong> {contextLoading ? 'true' : 'false'}</p>
                        <p><strong>Is Authenticated:</strong> {isAuthenticated ? 'true' : 'false'}</p>
                        <p><strong>Token:</strong> {contextToken ? `${contextToken.substring(0, 20)}...` : 'null'}</p>
                    </div>
                </div>

                {/* LocalStorage */}
                <div className="bg-green-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3">LocalStorage</h2>
                    <div className="space-y-2 text-sm">
                        <p><strong>Token:</strong> {localStorageToken ? `${localStorageToken.substring(0, 20)}...` : 'null'}</p>
                        <p><strong>User:</strong> {localStorageUser ? 'Present' : 'null'}</p>
                        {localStorageUser && (
                            <div className="mt-2">
                                <p><strong>User Data:</strong></p>
                                <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto">
                                    {JSON.stringify(JSON.parse(localStorageUser), null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-yellow-100 p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-3">Actions</h2>
                    <div className="space-y-2">
                        <button 
                            onClick={() => window.location.reload()}
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Refresh Page
                        </button>
                        <button 
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Clear Storage & Refresh
                        </button>
                    </div>
                </div>
            </div>

            {/* Current URL Info */}
            <div className="mt-6 bg-purple-100 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-3">Current Page Info</h2>
                <div className="space-y-2 text-sm">
                    <p><strong>Current URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'N/A'}</p>
                    <p><strong>Pathname:</strong> {typeof window !== 'undefined' ? window.location.pathname : 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};

export default AuthDebugPage;
