import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Building2, User, Calendar, Clock, Shield, DollarSign, MessageSquare, Send } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import toast from 'react-hot-toast';

// Mock data for approval details
const mockApprovalDetails = {
  spot: {
    id: 'SP005',
    name: 'Luxury Penthouse Suite',
    description: 'A stunning penthouse with panoramic city views, perfect for corporate events and upscale gatherings.',
    type: 'venue',
    host: {
      id: 'HOST003',
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      phone: '+1 (555) 345-6789',
      joinDate: '2024-01-25'
    },
    address: '789 Skyline Ave',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    capacity: 50,
    pricePerHour: 350,
    squareFootage: 3000,
    features: {
      parking: true,
      wifi: true,
      accessibility: true,
      kitchen: true,
      sound_system: true,
      restrooms: true
    },
    amenities: [
      'Rooftop Access',
      'Full Bar',
      'Catering Kitchen',
      'Panoramic Views',
      'Luxury Furnishings'
    ],
    rules: 'No smoking. No outside catering without prior approval. Quiet hours after 10 PM.',
    status: 'pending',
    submittedAt: '2025-02-18T14:30:00',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200'
    ],
    messages: [
      {
        id: 1,
        sender: 'host',
        content: 'I\'ve submitted my new venue for approval. Please let me know if you need any additional information.',
        timestamp: '2025-02-18T14:35:00'
      },
      {
        id: 2,
        sender: 'admin',
        content: 'Thanks for your submission. We\'re reviewing your venue and will get back to you shortly.',
        timestamp: '2025-02-18T15:00:00'
      }
    ]
  },
  host: {
    id: 'HOST006',
    name: 'Jennifer Williams',
    email: 'jennifer.w@example.com',
    phone: '+1 (555) 987-6543',
    location: 'Austin, TX',
    bio: 'Event planner with 10+ years of experience. I own several unique venues perfect for special occasions.',
    submittedAt: '2025-02-19T11:20:00',
    status: 'pending',
    verificationDocuments: [
      { name: 'ID Verification', file: 'id_verification.pdf', uploaded: '2025-02-19T11:15:00' },
      { name: 'Proof of Address', file: 'proof_of_address.pdf', uploaded: '2025-02-19T11:18:00' }
    ],
    messages: [
      {
        id: 1,
        sender: 'host',
        content: 'I\'ve submitted my verification documents. Looking forward to listing my venues on the platform!',
        timestamp: '2025-02-19T11:25:00'
      }
    ]
  },
  payout: {
    id: 'PO005',
    hostId: 'HOST001',
    hostName: 'John Smith',
    amount: 1875.00,
    bookings: [
      { id: 'BK010', date: '2025-02-01', amount: 450.00, venue: 'Downtown Event Space' },
      { id: 'BK011', date: '2025-02-05', amount: 600.00, venue: 'Downtown Event Space' },
      { id: 'BK012', date: '2025-02-10', amount: 825.00, venue: 'Downtown Event Space' }
    ],
    period: 'Feb 1-15, 2025',
    submittedAt: '2025-02-16T10:00:00',
    status: 'pending',
    method: 'Bank Transfer',
    accountInfo: '**** 1234',
    messages: [
      {
        id: 1,
        sender: 'system',
        content: 'Payout request automatically generated for period Feb 1-15, 2025',
        timestamp: '2025-02-16T10:00:00'
      }
    ]
  },
  refund: {
    id: 'REF005',
    bookingId: 'BK005',
    guestName: 'Emma Wilson',
    guestEmail: 'emma.w@example.com',
    amount: 320.00,
    originalAmount: 320.00,
    reason: 'Host cancelled booking',
    venue: {
      name: 'Sunset Studio',
      address: '456 Art Ave, Los Angeles, CA 90012'
    },
    booking: {
      date: '2025-02-25',
      time: '14:00 - 18:00',
      status: 'cancelled'
    },
    submittedAt: '2025-02-19T08:45:00',
    status: 'pending',
    messages: [
      {
        id: 1,
        sender: 'guest',
        content: 'The host cancelled my booking at the last minute. I would like a full refund please.',
        timestamp: '2025-02-19T08:45:00'
      },
      {
        id: 2,
        sender: 'host',
        content: 'I apologize for the cancellation. I had an emergency and couldn\'t host the event. I approve the full refund.',
        timestamp: '2025-02-19T09:15:00'
      }
    ]
  }
};

const AdminApprovalDetails = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState<'approve' | 'reject' | null>(null);

  // Get the appropriate data based on the type
  const getApprovalData = () => {
    switch (type) {
      case 'spot':
        return mockApprovalDetails.spot;
      case 'host':
        return mockApprovalDetails.host;
      case 'payout':
        return mockApprovalDetails.payout;
      case 'refund':
        return mockApprovalDetails.refund;
      default:
        return null;
    }
  };

  const approvalData = getApprovalData();

  if (!approvalData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/admin/approvals')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Approvals
          </button>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900">Approval not found</h2>
            <p className="mt-2 text-gray-600">The approval you're looking for doesn't exist or has been processed.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleAction = (action: 'approve' | 'reject') => {
    const typeLabel = type === 'spot' ? 'Spot' : 
                      type === 'host' ? 'Host' : 
                      type === 'payout' ? 'Payout' : 'Refund';
    
    toast.success(`${typeLabel} ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
    setShowConfirmDialog(null);
    navigate('/admin/approvals');
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    toast.success('Message sent successfully');
    setMessage('');
  };

  const renderSpotDetails = () => {
    const spot = approvalData as typeof mockApprovalDetails.spot;
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Spot Images */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2">
              {spot.images.map((image, index) => (
                <div key={index} className={`${index === 0 ? 'sm:col-span-3' : 'sm:col-span-1'} h-48 sm:h-64 overflow-hidden rounded-lg`}>
                  <img
                    src={image}
                    alt={`Spot image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Spot Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Spot Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1 text-gray-900">{spot.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-gray-900">{spot.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="mt-1 text-gray-900">{spot.address}</p>
                <p className="text-gray-900">{spot.city}, {spot.state} {spot.zipCode}</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Type</h3>
                  <p className="mt-1 text-gray-900 capitalize">{spot.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Capacity</h3>
                  <p className="mt-1 text-gray-900">{spot.capacity} guests</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Price</h3>
                  <p className="mt-1 text-gray-900">{formatCurrency(spot.pricePerHour)}/hr</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Size</h3>
                  <p className="mt-1 text-gray-900">{spot.squareFootage} sq ft</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features & Amenities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Features & Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4">
              {Object.entries(spot.features).map(([key, enabled]) => {
                if (!enabled) return null;
                return (
                  <div key={key} className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-[#2DD4BF]" />
                    <span className="text-gray-600 capitalize">{key.replace('_', ' ')}</span>
                  </div>
                );
              })}
              {spot.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-[#2DD4BF]" />
                  <span className="text-gray-600">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">House Rules</h2>
            <p className="text-gray-600">{spot.rules}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Host Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Host Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                  <span className="text-white font-medium">
                    {spot.host.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{spot.host.name}</p>
                  <p className="text-sm text-gray-500">Host since {new Date(spot.host.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">{spot.host.email}</div>
                <div className="text-sm text-gray-500">{spot.host.phone}</div>
              </div>
            </div>
          </div>

          {/* Message Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Send Message</h2>
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
                {spot.messages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-3">
                    <div className={`h-8 w-8 rounded-full ${
                      msg.sender === 'admin' ? 'bg-[#2DD4BF]' : 'bg-gray-100'
                    } flex items-center justify-center`}>
                      <span className={`${
                        msg.sender === 'admin' ? 'text-white' : 'text-gray-600'
                      } text-sm font-medium`}>
                        {msg.sender === 'admin' ? 'A' : 'H'}
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
    );
  };

  const renderHostDetails = () => {
    const host = approvalData as typeof mockApprovalDetails.host;
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Host Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Host Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1 text-gray-900">{host.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                <p className="mt-1 text-gray-900">{host.email}</p>
                <p className="text-gray-900">{host.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="mt-1 text-gray-900">{host.location}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                <p className="mt-1 text-gray-900">{host.bio}</p>
              </div>
            </div>
          </div>

          {/* Verification Documents */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Verification Documents</h2>
            <div className="space-y-4">
              {host.verificationDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-[#2DD4BF] mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-500">
                        Uploaded {new Date(doc.uploaded).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button className="text-[#2DD4BF] hover:text-[#26b8a5]">
                    View Document
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Verification Status</h2>
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="h-5 w-5 text-yellow-500" />
              <span className="text-yellow-800 bg-yellow-100 px-2 py-1 rounded-full text-sm font-medium">
                Pending Verification
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Submitted on {new Date(host.submittedAt).toLocaleString()}
            </p>
          </div>

          {/* Message Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Send Message</h2>
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
                {host.messages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-3">
                    <div className={`h-8 w-8 rounded-full ${
                      msg.sender === 'admin' ? 'bg-[#2DD4BF]' : 'bg-gray-100'
                    } flex items-center justify-center`}>
                      <span className={`${
                        msg.sender === 'admin' ? 'text-white' : 'text-gray-600'
                      } text-sm font-medium`}>
                        {msg.sender === 'admin' ? 'A' : 'H'}
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
    );
  };

  const renderPayoutDetails = () => {
    const payout = approvalData as typeof mockApprovalDetails.payout;
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Payout Overview */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Payout Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                <p className="mt-1 text-2xl font-bold text-[#2DD4BF]">{formatCurrency(payout.amount)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Period</h3>
                <p className="mt-1 text-gray-900">{payout.period}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                <p className="mt-1 text-gray-900">{payout.method}</p>
                <p className="text-sm text-gray-500">{payout.accountInfo}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
                <p className="mt-1 text-gray-900">{payout.bookings.length} bookings</p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
            <div className="space-y-4">
              {payout.bookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{booking.venue}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-medium text-[#2DD4BF]">{formatCurrency(booking.amount)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Host Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Host Information</h2>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                <span className="text-white font-medium">
                  {payout.hostName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{payout.hostName}</p>
                <p className="text-sm text-gray-500">ID: {payout.hostId}</p>
              </div>
            </div>
          </div>

          {/* Message Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Send Message</h2>
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
                {payout.messages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-3">
                    <div className={`h-8 w-8 rounded-full ${
                      msg.sender === 'admin' ? 'bg-[#2DD4BF]' : 'bg-gray-100'
                    } flex items-center justify-center`}>
                      <span className={`${
                        msg.sender === 'admin' ? 'text-white' : 'text-gray-600'
                      } text-sm font-medium`}>
                        {msg.sender === 'admin' ? 'A' : 'S'}
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
    );
  };

  const renderRefundDetails = () => {
    const refund = approvalData as typeof mockApprovalDetails.refund;
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Refund Overview */}
          <div className="bg-white rounded- div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Refund Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Refund Amount</h3>
                <p className="mt-1 text-2xl font-bold text-[#2DD4BF]">{formatCurrency(refund.amount)}</p>
                <p className="text-sm text-gray-500">Original amount: {formatCurrency(refund.originalAmount)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1">
                  <span className="px-2 py-1 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    Pending
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Venue</h3>
                <p className="mt-1 text-gray-900">{refund.venue.name}</p>
                <p className="text-gray-600">{refund.venue.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Booking Time</h3>
                <p className="mt-1 text-gray-900">{refund.booking.date}</p>
                <p className="text-gray-600">{refund.booking.time}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Reason for Refund</h3>
                <p className="mt-1 text-gray-900">{refund.reason}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Guest Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Guest Information</h2>
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                <span className="text-white font-medium">
                  {refund.guestName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{refund.guestName}</p>
                <p className="text-sm text-gray-500">{refund.guestEmail}</p>
              </div>
            </div>
          </div>

          {/* Message Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Send Message</h2>
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
                {refund.messages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-3">
                    <div className={`h-8 w-8 rounded-full ${
                      msg.sender === 'admin' ? 'bg-[#2DD4BF]' :
                      msg.sender === 'host' ? 'bg-purple-500' :
                      'bg-gray-100'
                    } flex items-center justify-center`}>
                      <span className={`${
                        msg.sender === 'admin' ? 'text-white' :
                        msg.sender === 'host' ? 'text-white' :
                        'text-gray-600'
                      } text-sm font-medium`}>
                        {msg.sender === 'admin' ? 'A' :
                         msg.sender === 'host' ? 'H' : 'G'}
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
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin/approvals')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Approvals
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {type?.charAt(0).toUpperCase() + type?.slice(1)} Approval Request
              </h1>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  Pending Approval
                </span>
                <span className="text-gray-500">
                  Submitted on {new Date(approvalData.submittedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
              <button
                onClick={() => setShowConfirmDialog('approve')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Approve
              </button>
              <button
                onClick={() => setShowConfirmDialog('reject')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <XCircle className="h-5 w-5 mr-2" />
                Reject
              </button>
            </div>
          </div>
        </div>

        {/* Content based on type */}
        {type === 'spot' && renderSpotDetails()}
        {type === 'host' && renderHostDetails()}
        {type === 'payout' && renderPayoutDetails()}
        {type === 'refund' && renderRefundDetails()}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              {showConfirmDialog === 'approve' ? 'Approve Request' : 'Reject Request'}
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              {showConfirmDialog === 'approve'
                ? 'Are you sure you want to approve this request? This action cannot be undone.'
                : 'Are you sure you want to reject this request? This action cannot be undone.'}
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
                {showConfirmDialog === 'approve' ? 'Yes, approve' : 'Yes, reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApprovalDetails;