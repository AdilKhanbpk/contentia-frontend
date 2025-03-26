// src/components/LoadingSpinner.tsx
export default function LoadingSpinner() {
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='animate-spin rounded-full h-16 w-16 border-y-4 border-gray-900'></div>
        </div>
    );
}
