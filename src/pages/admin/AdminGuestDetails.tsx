import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, DollarSign, User, Building2, Clock, Send, Ban, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import toast from 'react-hot-toast';

// Mock guest data
const mockGuest = {
  id: 'G001',
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  joinDate: '2024-01-15',
  status: 'active',
  totalBookings: 12,
  totalSpent: 2500.00,
  lastBooking: '2025-02-15',
  verificationStatus: 'verified',
  recentActivity: [
    {
      type: 'booking_created',
      description: 'Booked "Downtown Event Space"',
      timestamp: '2025-02-15T10:30:00',
      amount: 450.00
    },
    {
      type: 'booking_completed',
      description: 'Completed stay at "Sunset Studio"',
      timestamp: '2025-02-10T14:00:00',
      amount: 320.00
    },
    {
      type: 'verification',
      description: 'Email verification completed',
      timestamp: '2024-01-15T09:15:00'
    }
  ],
  bookings: [
    {
      id: 'BK001',
      venue: 'Downtown Event Space',
      date: '2025-02-15',
      time: '10:00 AM - 2:00 PM',
      amount: 450.00,
      status: 'upcoming'
    },
    {
      id: 'BK002',
      venue: 'Sunset Studio',
      date: '2025-02-10',
      time: '2:00 PM - 6:00 PM',
      amount: 320.00,
      status: 'completed'
    },
    {
      id: 'BK003',
      venue: 'Rooftop Garden',
      date: '2025-01-20',
      time: '3:00 PM - 7:00 PM',
      amount: 550.00,
      status: 'completed'
    }
  ],
  messages: [
    {
      id: 1,
      sender: 'admin',
      content: 'Welcome to appiSpot! Let us know if you need any assistance.',
      timestamp: '2024-01-15T09:30:00'
    },
    {
      id: 2,
      sender: 'guest',
      content: 'Thanks! I have a question about my upcoming booking.',
      timestamp: '2024-01-15T10:00:00'
    },
    {
      id: 3,
      sender: 'admin',
      content: 'Of course! How can we help you with your booking?',
      timestamp: '2024-01-15T10:15:00'
    }
  ],
  preferences: {
    eventTypes: ['Corporate Events', 'Meetings', 'Workshops'],
    preferredLocations: ['Manhattan', 'Brooklyn'],
    averageBookingDuration: '4 hours',
    typicalGroupSize: '20-30 people'
  }
};

const AdminGuestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState<'suspend' | 'activate' | null>(null);

  const handleAction = (action: 'suspend' | 'activate') => {
    toast.success(`Guest ${action}d successfully`);
    setShowConfirmDialog(null);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    toast.success('Message sent successfully');
    setMessage('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin/guests')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Guests
        </button>

        {/* Guest Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                <span className="text-white text-xl font-medium">
                  {mockGuest.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">{mockGuest.name}</h1>
                <div className="flex items-center space-x-4 mt-1">
                  <span className={`px-2 py-1 text-sm font-semibold rounded-full ${getStatusColor(mockGuest.status)}`}>
                    {mockGuest.status.charAt(0).toUpperCase() + mockGuest.status.slice(1)}
                  </span>
                  <span className="text-gray-500">
                    Member since {new Date(mockGuest.joinDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
              {mockGuest.status === 'active' ? (
                <button
                  onClick={() => setShowConfirmDialog('suspend')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <Ban className="h-5 w-5 mr-2" />
                  Suspend Guest
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmDialog('activate')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Activate Guest
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{mockGuest.totalBookings}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
                  <p className="mt-1 text-2xl font-bold text-[#2DD4BF]">
                    {formatCurrency(mockGuest.totalSpent)}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Booking</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {new Date(mockGuest.lastBooking).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Avg. Booking Value</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {formatCurrency(mockGuest.totalSpent / mockGuest.totalBookings)}
                  </p>
                </div>
              </div>
            </div>

            {/* Booking History */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking History</h2>
              <div className="space-y-4">
                {mockGuest.bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-[#2DD4BF]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{booking.venue}</h3>
                        <p className="text-sm text-gray-500">{booking.date} • {booking.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-medium text-gray-900">
                        {formatCurrency(booking.amount)}
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-6">
                {mockGuest.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                        <Clock className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <span>{new Date(activity.timestamp).toLocaleString()}</span>
                        {activity.amount && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="text-[#2DD4BF] font-medium">
                              {formatCurrency(activity.amount)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guest Preferences */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Guest Preferences</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Preferred Event Types</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {mockGuest.preferences.eventTypes.map((type, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#2DD4BF]/10 text-[#2DD4BF] rounded-full text-sm font-medium"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Preferred Locations</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {mockGuest.preferences.preferredLocations.map((location, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#2DD4BF]/10 text-[#2DD4BF] rounded-full text-sm font-medium"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Average Booking Duration</h3>
                  <p className="mt-1 text-base text-gray-900">{mockGuest.preferences.averageBookingDuration}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Typical Group Size</h3>
                  <p className="mt-1 text-base text-gray-900">{mockGuest.preferences.typicalGroupSize}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">{mockGuest.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900">{mockGuest.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900">{mockGuest.location}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Join Date</p>
                    <p className="text-gray-900">{new Date(mockGuest.joinDate).toLocaleDateString()}</p>
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
                  {mockGuest.messages.map((msg) => (
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
              {showConfirmDialog === 'suspend' ? 'Suspend Guest' : 'Activate Guest'}
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              {showConfirmDialog === 'suspend'
                ? 'Are you sure you want to suspend this guest? They will not be able to make new bookings.'
                : 'Are you sure you want to activate this guest? They will be able to make bookings again.'}
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
                  showConfirmDialog === 'suspend'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {showConfirmDialog === 'suspend' ? 'Yes, suspend' : 'Yes, activate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGuestDetails;