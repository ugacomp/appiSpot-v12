import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, Calendar, Clock, User, Building2, CreditCard, MessageSquare, Send, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import toast from 'react-hot-toast';

// Mock refund data
const mockRefund = {
  id: 'REF001',
  bookingId: 'BK001',
  amount: 450.00,
  reason: 'Event cancelled due to emergency',
  requestedBy: {
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567'
  },
  requestDate: '2025-02-19T10:30:00',
  status: 'pending',
  venue: {
    name: 'Downtown Event Space',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001'
  },
  booking: {
    date: '2025-02-25',
    time: '14:00 - 18:00',
    guestCount: 50,
    eventType: 'Corporate Event',
    originalAmount: 600.00
  },
  payment: {
    method: 'Credit Card',
    last4: '1234',
    brand: 'Visa',
    expiryDate: '12/25'
  },
  timeline: [
    {
      time: '2025-02-19T10:30:00',
      type: 'request_created',
      description: 'Refund request submitted'
    },
    {
      time: '2025-02-19T10:35:00',
      type: 'documentation_received',
      description: 'Supporting documentation received'
    },
    {
      time: '2025-02-19T11:00:00',
      type: 'under_review',
      description: 'Request under review by admin'
    }
  ],
  messages: [
    {
      id: 1,
      sender: 'guest',
      content: 'I need to cancel due to a family emergency. Attached medical documentation.',
      timestamp: '2025-02-19T10:30:00'
    },
    {
      id: 2,
      sender: 'admin',
      content: 'Thank you for providing the documentation. We are reviewing your request.',
      timestamp: '2025-02-19T10:45:00'
    },
    {
      id: 3,
      sender: 'guest',
      content: 'When can I expect to hear back about the refund?',
      timestamp: '2025-02-19T11:15:00'
    }
  ]
};

const AdminRefundDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState<'approve' | 'decline' | null>(null);

  const handleAction = (action: 'approve' | 'decline' | 'process') => {
    toast.success(`Refund ${action}d successfully`);
    setShowConfirmDialog(null);
    // In a real application, you would make an API call here
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    toast.success('Message sent successfully');
    setMessage('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin/refunds')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Refunds
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Refund Request #{mockRefund.id}
              </h1>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(mockRefund.status)}`}>
                  {mockRefund.status.charAt(0).toUpperCase() + mockRefund.status.slice(1)}
                </span>
                <span className="text-gray-500">
                  Requested on {new Date(mockRefund.requestDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
              {mockRefund.status === 'pending' && (
                <>
                  <button
                    onClick={() => setShowConfirmDialog('approve')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Approve Refund
                  </button>
                  <button
                    onClick={() => setShowConfirmDialog('decline')}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    Decline Refund
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Refund Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Refund Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Amount Requested</h3>
                  <p className="mt-1 text-2xl font-bold text-[#2DD4BF]">{formatCurrency(mockRefund.amount)}</p>
                  <p className="text-sm text-gray-500">Original amount: {formatCurrency(mockRefund.booking.originalAmount)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                  <div className="mt-1 flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="font-medium text-gray-900">{mockRefund.payment.brand} ending in {mockRefund.payment.last4}</p>
                      <p className="text-sm text-gray-500">Expires {mockRefund.payment.expiryDate}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500">Reason for Refund</h3>
                <p className="mt-1 text-gray-900">{mockRefund.reason}</p>
              </div>
            </div>

            {/* Booking Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Original Booking Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Venue</h3>
                  <div className="mt-1">
                    <p className="font-medium text-gray-900">{mockRefund.venue.name}</p>
                    <p className="text-sm text-gray-500">{mockRefund.venue.address}</p>
                    <p className="text-sm text-gray-500">{mockRefund.venue.city}, {mockRefund.venue.state} {mockRefund.venue.zipCode}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Event Details</h3>
                  <div className="mt-1">
                    <p className="font-medium text-gray-900">{mockRefund.booking.eventType}</p>
                    <p className="text-sm text-gray-500">{mockRefund.booking.date}</p>
                    <p className="text-sm text-gray-500">{mockRefund.booking.time}</p>
                    <p className="text-sm text-gray-500">{mockRefund.booking.guestCount} guests</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Timeline</h2>
              <div className="space-y-6">
                {mockRefund.timeline.map((event, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900">{event.description}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(event.time).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                    <span className="text-white font-medium">
                      {mockRefund.requestedBy.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{mockRefund.requestedBy.name}</p>
                    <p className="text-sm text-gray-500">{mockRefund.requestedBy.email}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="h-5 w-5 text-gray-400 mr-2" />
                    {mockRefund.requestedBy.phone}
                  </div>
                </div>
              </div>
            </div>

            {/* Message Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Send Message</h2>
              <form onSubmit={handleMessageSubmit}>
                <div className="mb-4">
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-[#2DD4BF] focus:border-[#2DD4BF] resize-none"
                    placeholder="Type your message..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2DD4BF] hover:bg-[#26b8a5]"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </button>
              </form>

              {/* Message History */}
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Message History</h3>
                <div className="space-y-4">
                  {mockRefund.messages.map((msg) => (
                    <div key={msg.id} className="flex items-start space-x-3">
                      <div className={`h-8 w-8 rounded-full ${
                        msg.sender === 'admin' ? 'bg-[#2DD4BF]' : 'bg-gray-100'
                      } flex items-center justify-center`}>
                        <span className={`${
                          msg.sender === 'admin' ? 'text-white' : 'text-gray-600'
                        } text-sm font-medium`}>
                          {msg.sender === 'admin' ? 'A' : 'G'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm text-gray-900">{msg.content}</p>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(msg.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              {showConfirmDialog === 'approve' ? 'Approve Refund' : 'Decline Refund'}
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              {showConfirmDialog === 'approve'
                ? 'Are you sure you want to approve this refund? This action cannot be undone.'
                : 'Are you sure you want to decline this refund? This action cannot be undone.'}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDialog(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(showConfirmDialog)}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md ${
                  showConfirmDialog === 'approve'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {showConfirmDialog === 'approve' ? 'Yes, approve' : 'Yes, decline'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRefundDetails;