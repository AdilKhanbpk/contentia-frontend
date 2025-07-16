import PayTRForm from '@/app/payments/page';

interface Props {
  onClose: () => void;
}

export default function PayTRModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>
        <PayTRForm  />
      </div>
    </div>
  );
}
