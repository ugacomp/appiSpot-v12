import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, Star, Building2, DollarSign, Calendar, Clock, Shield, Wifi, Car, Coffee, Music, Accessibility, File as Toilet, Send, CheckCircle, XCircle, AlertCircle, Pencil, Ban, Play } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import toast from 'react-hot-toast';

// Mock spot data
const mockSpot = {
  id: 'SP001',
  name: 'Downtown Event Space',
  description: 'A beautiful venue perfect for corporate events and celebrations',
  address: '123 Main St',
  city: 'New York',
  state: 'NY',
  zipCode: '10001',
  capacity: 200,
  pricePerHour: 150,
  squareFootage: 2000,
  type: 'venue',
  status: 'active',
  rating: 4.8,
  totalBookings: 156,
  revenue: 23400,
  host: {
    name: 'Sarah Wilson',
    email: 'sarah.w@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: '2024-01-15'
  },
  features: {
    parking: true,
    wifi: true,
    accessibility: true,
    kitchen: true,
    sound_system: true,
    restrooms: true
  },
  amenities: [
    'Projector',
    'Stage',
    'Dance Floor',
    'Bar Area'
  ],
  rules: 'No smoking. No outside catering without approval.',
  featuredImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200',
  galleryImages: [
    'https://images.unsplash.com/photo-1522158637959-30385a09e0da?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200'
  ],
  recentBookings: [
    {
      id: 'BK001',
      guest: 'John Smith',
      date: '2025-02-25',
      time: '14:00 - 18:00',
      amount: 600,
      status: 'confirmed'
    },
    {
      id: 'BK002',
      guest: 'Emma Wilson',
      date: '2025-02-26',
      time: '10:00 - 14:00',
      amount: 600,
      status: 'pending'
    },
    {
      id: 'BK003',
      guest: 'Michael Brown',
      date: '2025-02-27',
      time: '15:00 - 19:00',
      amount: 600,
      status: 'completed'
    }
  ],
  messages: [
    {
      id: 1,
      sender: 'host',
      content: 'I would like to update the venue capacity. Is this possible?',
      timestamp: '2025-02-19T10:30:00'
    },
    {
      id: 2,
      sender: 'admin',
      content: 'Yes, we can help you update the capacity. What would be the new capacity?',
      timestamp: '2025-02-19T10:45:00'
    }
  ]
};

const AdminSpotDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState<'delete' | 'approve' | 'pause' | null>(null);

  const handleAction = (action: 'delete' | 'approve' | 'pause') => {
    const messages = {
      delete: 'Spot deleted successfully',
      approve: 'Spot approved successfully',
      pause: 'Spot paused successfully'
    };
    toast.success(messages[action]);
    setShowConfirmDialog(null);
    if (action === 'delete') {
      navigate('/admin/spots');
    }
  };

  const handleEdit = () => {
    navigate(`/admin/spots/${id}/edit`);
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
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'paused':
        return 'bg-orange-100 text-orange-800';
      case 'inactive':
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin/spots')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Spots
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{mockSpot.name}</h1>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(mockSpot.status)}`}>
                  {mockSpot.status.charAt(0).toUpperCase() + mockSpot.status.slice(1)}
                </span>
                <div className="flex items-center">
                  {renderStars(mockSpot.rating)}
                </div>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Pencil className="h-5 w-5 mr-2" />
                Edit Spot
              </button>
              {mockSpot.status === 'active' ? (
                <button
                  onClick={() => setShowConfirmDialog('pause')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700"
                >
                  <Ban className="h-5 w-5 mr-2" />
                  Pause Spot
                </button>
              ) : mockSpot.status === 'paused' ? (
                <button
                  onClick={() => setShowConfirmDialog('approve')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Resume Spot
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmDialog('approve')}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Approve Spot
                </button>
              )}
              <button
                onClick={() => setShowConfirmDialog('delete')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <XCircle className="h-5 w-5 mr-2" />
                Delete Spot
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Spot Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Total Bookings</h4>
                  <p className="mt-1 text-xl font-semibold text-gray-900">{mockSpot.totalBookings}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Revenue</h4>
                  <p className="mt-1 text-xl font-semibold text-[#2DD4BF]">{formatCurrency(mockSpot.revenue)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Capacity</h4>
                  <p className="mt-1 text-xl font-semibold text-gray-900">{mockSpot.capacity} guests</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Price</h4>
                  <p className="mt-1 text-xl font-semibold text-gray-900">{formatCurrency(mockSpot.pricePerHour)}/hr</p>
                </div>
              </div>
            </div>

            {/* Spot Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Spot Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1 text-gray-900">{mockSpot.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <div className="mt-1">
                    <p className="text-gray-900">{mockSpot.address}</p>
                    <p className="text-gray-900">{mockSpot.city}, {mockSpot.state} {mockSpot.zipCode}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Features & Amenities</h3>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {Object.entries(mockSpot.features).map(([key, enabled]) => {
                      if (!enabled) return null;
                      const Icon = {
                        wifi: Wifi,
                        parking: Car,
                        kitchen: Coffee,
                        sound_system: Music,
                        accessibility: Accessibility,
                        restrooms: Toilet
                      }[key];
                      return (
                        <div key={key} className="flex items-center space-x-2">
                          {Icon && <Icon className="h-5 w-5 text-[#2DD4BF]" />}
                          <span className="text-gray-700 capitalize">{key.replace('_', ' ')}</span>
                        </div>
                      );
                    })}
                    {mockSpot.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-[#2DD4BF]" />
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Rules</h3>
                  <p className="mt-1 text-gray-900">{mockSpot.rules}</p>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
                <button
                  onClick={() => navigate('/admin/bookings')}
                  className="text-[#2DD4BF] hover:text-[#26b8a5] text-sm font-medium"
                >
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Guest</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {mockSpot.recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.guest}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(booking.amount)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Host Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Host Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                    <span className="text-white font-medium">
                      {mockSpot.host.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{mockSpot.host.name}</p>
                    <p className="text-sm text-gray-500">Host since {new Date(mockSpot.host.joinDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                    {mockSpot.host.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                    {mockSpot.host.phone}
                  </div>
                </div>
              </div>
            </div>

            {/* Message Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Send Message to Host</h2>
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
                  {mockSpot.messages.map((msg) => (
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
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              {showConfirmDialog === 'delete' ? 'Delete Spot' :
               showConfirmDialog === 'pause' ? 'Pause Spot' :
               'Approve Spot'}
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              {showConfirmDialog === 'delete'
                ? 'Are you sure you want to delete this spot? This action cannot be undone.'
                : showConfirmDialog === 'pause'
                ? 'Are you sure you want to pause this spot? It will be temporarily unavailable for bookings.'
                : 'Are you sure you want to approve this spot? It will be available for bookings.'}
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
                  showConfirmDialog === 'delete'
                    ? 'bg-red-600 hover:bg-red-700'
                    : showConfirmDialog === 'pause'
                    ? 'bg-orange-600 hover:bg-orange-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {showConfirmDialog === 'delete' ? 'Yes, delete' :
                 showConfirmDialog === 'pause' ? 'Yes, pause' :
                 'Yes, approve'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSpotDetails;