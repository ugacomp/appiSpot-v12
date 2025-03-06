import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Star, Edit2, Camera, LogOut, MessageSquare, ChevronRight, Ban, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import MessageCenter from '../../components/MessageCenter';

// Mock user data
const mockUser = {
  id: 'G001',
  firstName: 'John',
  lastName: 'Smith',
  email: 'john.smith@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  joinDate: '2024-01-15',
  avatar: null,
  bookings: 12,
  averageRating: 4.8,
  totalSpent: 2500.00,
  verificationStatus: 'verified',
  preferences: {
    eventTypes: ['Corporate Events', 'Meetings', 'Workshops'],
    preferredLocations: ['Manhattan', 'Brooklyn'],
    averageBookingDuration: '4 hours',
    typicalGroupSize: '20-30 people'
  },
  recentBookings: [
    {
      id: 'BK001',
      spot: 'Downtown Event Space',
      date: '2025-02-15',
      time: '10:00 AM - 2:00 PM',
      amount: 450.00,
      status: 'upcoming'
    },
    {
      id: 'BK002',
      spot: 'Sunset Studio',
      date: '2025-02-10',
      time: '2:00 PM - 6:00 PM',
      amount: 320.00,
      status: 'completed'
    },
    {
      id: 'BK003',
      spot: 'Rooftop Garden',
      date: '2025-01-20',
      time: '3:00 PM - 7:00 PM',
      amount: 550.00,
      status: 'completed'
    }
  ],
  cancellations: [
    {
      id: 'CAN001',
      spot: 'Beach House Venue',
      date: '2025-01-15',
      amount: 600.00,
      reason: 'Schedule conflict'
    }
  ]
};

const GuestProfile = () => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showMessageCenter, setShowMessageCenter] = useState(false);

  const handleLogout = () => {
    // Implement logout logic
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
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

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? 'fill-[#FFD700] text-[#FFD700]'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div>
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {mockUser.avatar ? (
                <img
                  src={mockUser.avatar}
                  alt={`${mockUser.firstName} ${mockUser.lastName}`}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                  <span className="text-2xl font-semibold text-white">
                    {mockUser.firstName[0]}{mockUser.lastName[0]}
                  </span>
                </div>
              )}
              <button 
                className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50"
                onClick={() => toast.success('Upload photo feature coming soon!')}
              >
                <Camera className="h-4 w-4 text-gray-600" />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {mockUser.firstName} {mockUser.lastName}
              </h1>
              <p className="text-gray-500">Member since {new Date(mockUser.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowMessageCenter(true)}
              className="p-2 text-gray-600 hover:text-gray-900 relative"
            >
              <MessageSquare className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <button
              onClick={() => navigate('/guest/profile/edit')}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
            <Calendar className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{mockUser.bookings}</p>
          <p className="mt-2 text-sm text-green-600">↑ 8% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
            <Star className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <div className="mt-1">{renderStars(mockUser.averageRating)}</div>
          <p className="mt-2 text-sm text-green-600">↑ 0.2 from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
            <Clock className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-[#2DD4BF]">${mockUser.totalSpent.toFixed(2)}</p>
          <p className="mt-2 text-sm text-green-600">↑ 15% from last month</p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
          <Link
            to="/guest/bookings"
            className="text-[#2DD4BF] hover:text-[#26b8a5] text-sm font-medium flex items-center"
          >
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="space-y-4">
          {mockUser.recentBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => navigate(`/bookings/${booking.id}`)}
            >
              <div>
                <h3 className="font-medium text-gray-900">{booking.spot}</h3>
                <p className="text-sm text-gray-500">{booking.date} • {booking.time}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-[#2DD4BF]">${booking.amount.toFixed(2)}</p>
                <span className={`inline-flex text-xs font-medium rounded-full px-2 py-1 ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Cancellations */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Cancellations</h2>
          <Link
            to="/guest/cancellations"
            className="text-[#2DD4BF] hover:text-[#26b8a5] text-sm font-medium flex items-center"
          >
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="space-y-4">
          {mockUser.cancellations.map((cancellation) => (
            <div
              key={cancellation.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h3 className="font-medium text-gray-900">{cancellation.spot}</h3>
                <p className="text-sm text-gray-500">{cancellation.date}</p>
                <p className="text-sm text-gray-500">{cancellation.reason}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-red-600">${cancellation.amount.toFixed(2)}</p>
                <span className="text-xs text-gray-500">Refunded</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Center */}
      <MessageCenter
        isOpen={showMessageCenter}
        onClose={() => setShowMessageCenter(false)}
      />

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Logout</h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestProfile;