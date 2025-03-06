import React, { useState } from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { processRefund } from '../lib/stripe';
import toast from 'react-hot-toast';

interface CancelBookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  amount: number;
  onCancel: () => void;
}

const CancelBookingDialog: React.FC<CancelBookingDialogProps> = ({
  isOpen,
  onClose,
  bookingId,
  amount,
  onCancel
}) => {
  const [step, setStep] = useState<'confirm' | 'reason' | 'processing'>('confirm');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!reason) {
      toast.error('Please provide a reason for cancellation');
      return;
    }

    setLoading(true);
    setStep('processing');

    try {
      // Process the refund
      const refundSuccess = await processRefund(bookingId, amount);
      
      if (refundSuccess) {
        toast.success('Booking cancelled and refund processed successfully');
        onCancel();
      } else {
        throw new Error('Failed to process refund');
      }
    } catch (error) {
      toast.error('Failed to cancel booking. Please try again.');
      setStep('reason');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {step === 'confirm' && (
          <>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              Cancel Booking
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to cancel this booking? You will receive a full refund if cancelled within the cancellation policy.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Keep Booking
              </button>
              <button
                onClick={() => setStep('reason')}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Yes, cancel
              </button>
            </div>
          </>
        )}

        {step === 'reason' && (
          <>
            <button
              onClick={() => setStep('confirm')}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Cancellation Reason
            </h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Please tell us why you're cancelling
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
              >
                <option value="">Select a reason</option>
                <option value="schedule_conflict">Schedule Conflict</option>
                <option value="change_of_plans">Change of Plans</option>
                <option value="found_alternative">Found Alternative Venue</option>
                <option value="event_cancelled">Event Cancelled</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Confirm Cancellation
              </button>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2DD4BF] mx-auto mb-4"></div>
            <p className="text-gray-900 font-medium">Processing your cancellation</p>
            <p className="text-sm text-gray-500 mt-2">Please don't close this window...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CancelBookingDialog;