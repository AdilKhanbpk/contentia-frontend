'use client';

import { useState } from 'react';

const initializePayment = async (paymentData: any) => {
    const response = await fetch('http://localhost:8000/api/paytr/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
    });

    const result = await response.json();
    if (response.ok && result.success) {
        return result.token;
    } else {
        throw new Error(result.error || 'Payment initialization failed.');
    }
};

export default function PaytrPage() {
    const [iframeUrl, setIframeUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        try {
            setLoading(true);

            const token = await initializePayment({
                user_ip: '127.0.0.1',
                email: 'customer@example.com',
                payment_amount: '100000', // Amount in kuruş
                user_name: 'John Doe',
                user_address: 'Test Address',
                user_phone: '5555555555'
            });

            setIframeUrl(`https://www.paytr.com/odeme/guvenli/${token}`);
        } catch (error: any) {
            console.error('Payment initialization failed:', error.message);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            {!iframeUrl ? (
                <button
                    onClick={handlePayment}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    disabled={loading}
                >
                    {loading ? 'Processing...' : 'Start Payment'}
                </button>
            ) : (
                <iframe
                    src={iframeUrl}
                    id="paytriframe"
                    frameBorder={0}
                    scrolling="no"
                    style={{ width: '100%', height: '600px' }}
                ></iframe>
            )}
        </div>
    );
}
