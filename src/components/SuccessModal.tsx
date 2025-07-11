import { X, CheckCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface SuccessModalProps {
    onClose: () => void;
}

const SuccessModal = ({ onClose }: SuccessModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div ref={modalRef} className="relative bg-white rounded-lg shadow-lg max-w-2xl mx-auto p-8">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="h-6 w-6" />
                </button>

                <div className="animate-bounce mb-6">
                    <CheckCircle className="h-24 w-24 text-green-500 mx-auto" />
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    Başvurunuz Başarıyla Tamamlandı!
                </h2>
                
                {/* <div className="text-center space-y-4">
                    <p className="text-gray-600 text-lg">
                        Başvurunuz inceleniyor. Size en kısa sürede dönüş yapacağız.
                    </p>
                    
                    <div className="flex flex-col space-y-2">
                        <span className="text-sm text-gray-500">
                            Başvuru numaranız:
                        </span>
                        <span className="font-mono text-lg text-green-600 font-bold">
                            {`APP-${Date.now().toString().slice(-6)}`}
                        </span>
                    </div>
                </div> */}
                
                <div className="mt-8 flex justify-center">
                    <button 
                        onClick={() => window.location.href = '/'}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                    >
                        Ana Sayfaya Dön
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;