import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, DollarSign, Calendar, Star, TrendingUp, Users, Clock, Plus, ChevronRight, MapPin, Search, Filter, Ban, RefreshCcw } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import toast from 'react-hot-toast';

// Mock data
const mockStats = {
  totalSpots: 5,
  activeSpots: 4,
  totalBookings: 127,
  totalRevenue: 15750.00,
  averageRating: 4.8,
  revenueGrowth: 12.5,
  bookingGrowth: 8.2,
  spotGrowth: 25,
  ratingGrowth: 0.2
};

const mockSpots = [
  {
    id: 'SP001',
    name: 'Downtown Event Space',
    type: 'venue',
    status: 'active',
    location: 'New York, NY',
    capacity: 200,
    pricePerHour: 150,
    totalBookings: 45,
    revenue: 6750.00,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'SP002',
    name: 'Creative Studio',
    type: 'studio',
    status: 'active',
    location: 'Brooklyn, NY',
    capacity: 50,
    pricePerHour: 75,
    totalBookings: 32,
    revenue: 2400.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'SP003',
    name: 'Rooftop Garden',
    type: 'outdoor',
    status: 'active',
    location: 'Manhattan, NY',
    capacity: 150,
    pricePerHour: 200,
    totalBookings: 28,
    revenue: 5600.00,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200'
  }
];

const mockBookings = [
  {
    id: 'BK001',
    spot: 'Downtown Event Space',
    guest: 'John Smith',
    date: '2025-02-25',
    time: '14:00 - 18:00',
    guests: 50,
    amount: 600.00,
    status: 'upcoming'
  },
  {
    id: 'BK002',
    spot: 'Creative Studio',
    guest: 'Sarah Johnson',
    date: '2025-02-26',
    time: '10:00 - 14:00',
    guests: 20,
    amount: 300.00,
    status: 'confirmed'
  },
  {
    id: 'BK003',
    spot: 'Rooftop Garden',
    guest: 'Michael Brown',
    date: '2025-02-24',
    time: '16:00 - 20:00',
    guests: 100,
    amount: 800.00,
    status: 'completed'
  }
];

const mockCancellations = [
  {
    id: 'CN001',
    spot: 'Downtown Event Space',
    guest: 'Emma Wilson',
    date: '2025-02-20',
    time: '15:00 - 19:00',
    reason: 'Guest requested cancellation',
    amount: 450.00,
    status: 'pending'
  },
  {
    id: 'CN002',
    spot: 'Creative Studio',
    guest: 'David Lee',
    date: '2025-02-22',
    time: '13:00 - 17:00',
    reason: 'Host initiated cancellation',
    amount: 320.00,
    status: 'approved'
  }
];

const mockRefunds = [
  {
    id: 'RF001',
    booking: 'BK004',
    guest: 'Emma Wilson',
    date: '2025-02-20',
    amount: 450.00,
    refundAmount: 405.00,
    reason: 'Cancellation within policy',
    status: 'pending'
  },
  {
    id: 'RF002',
    booking: 'BK005',
    guest: 'David Lee',
    date: '2025-02-22',
    amount: 320.00,
    refundAmount: 288.00,
    reason: 'Host cancellation',
    status: 'processing'
  }
];

const HostDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'spots' | 'bookings' | 'cancellations' | 'refunds'>('spots');
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    dateRange: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
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

  const handleCancellation = (id: string) => {
    toast.success('Cancellation processed successfully');
  };

  const handleRefund = (id: string) => {
    toast.success('Refund processed successfully');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome Back, Host
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Here's what's happening with your spots today.
              </p>
            </div>
            <button
              onClick={() => navigate('/list-spot')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2DD4BF] hover:bg-[#26b8a5]"
            >
              <Plus className="h-5 w-5 mr-2" />
              List New Spot
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
              <DollarSign className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockStats.totalRevenue)}</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>{mockStats.revenueGrowth}% from last month</span>
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
              <Calendar className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockStats.totalBookings}</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>{mockStats.bookingGrowth}% from last month</span>
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Active Spots</h3>
              <Building2 className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockStats.activeSpots}</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>{mockStats.spotGrowth}% from last month</span>
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Average Rating</h3>
              <Star className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockStats.averageRating}</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+{mockStats.ratingGrowth} from last month</span>
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('spots')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'spots'
                    ? 'border-[#2DD4BF] text-[#2DD4BF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Building2 className="h-5 w-5 mr-2" />
                My Spots
              </button>

              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-[#2DD4BF] text-[#2DD4BF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Bookings
              </button>

              <button
                onClick={() => setActiveTab('cancellations')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'cancellations'
                    ? 'border-[#2DD4BF] text-[#2DD4BF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Ban className="h-5 w-5 mr-2" />
                Cancellations
              </button>

              <button
                onClick={() => setActiveTab('refunds')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'refunds'
                    ? 'border-[#2DD4BF] text-[#2DD4BF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <RefreshCcw className="h-5 w-5 mr-2" />
                Refunds
              </button>
            </nav>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                  >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                  >
                    <option value="">All Types</option>
                    <option value="venue">Venue</option>
                    <option value="studio">Studio</option>
                    <option value="outdoor">Outdoor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Range
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                    className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                  >
                    <option value="">All Time</option>
                    <option value="today">Today</option>
                    <option value="this_week">This Week</option>
                    <option value="this_month">This Month</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'spots' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSpots.map((spot) => (
              <div
                key={spot.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(spot.status)}`}>
                      {spot.status.charAt(0).toUpperCase() + spot.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{spot.name}</h3>
                    {renderStars(spot.rating)}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{spot.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">Capacity: {spot.capacity}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span className="text-sm">{formatCurrency(spot.pricePerHour)}/hour</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Total Bookings</p>
                        <p className="text-lg font-semibold text-gray-900">{spot.totalBookings}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Revenue</p>
                        <p className="text-lg font-semibold text-[#2DD4BF]">{formatCurrency(spot.revenue)}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => navigate(`/spots/${spot.id}`)}
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Spot
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guests
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockBookings.map((booking) => (
                    <tr 
                      key={booking.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/bookings/${booking.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2DD4BF]">
                        {booking.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.spot}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {booking.guest.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="ml-3 text-sm text-gray-900">{booking.guest}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.date}</div>
                        <div className="text-sm text-gray-500">{booking.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.guests}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(booking.amount)}
                      </td>
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
        )}

        {activeTab === 'cancellations' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cancellation ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Spot
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockCancellations.map((cancellation) => (
                    <tr key={cancellation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2DD4BF]">
                        {cancellation.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {cancellation.spot}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {cancellation.guest.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="ml-3 text-sm text-gray-900">{cancellation.guest}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{cancellation.date}</div>
                        <div className="text-sm text-gray-500">{cancellation.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cancellation.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(cancellation.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(cancellation.status)}`}>
                          {cancellation.status.charAt(0).toUpperCase() + cancellation.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleCancellation(cancellation.id)}
                          className="text-[#2DD4BF] hover:text-[#26b8a5]"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'refunds' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Refund ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking
                    </th>
                 Continuing the table headers in the refunds section:

                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Original Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Refund Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockRefunds.map((refund) => (
                    <tr key={refund.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2DD4BF]">
                        {refund.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {refund.booking}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {refund.guest.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="ml-3 text-sm text-gray-900">{refund.guest}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {refund.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(refund.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2DD4BF]">
                        {formatCurrency(refund.refundAmount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(refund.status)}`}>
                          {refund.status.charAt(0).toUpperCase() + refund.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <button
                          onClick={() => handleRefund(refund.id)}
                          className="text-[#2DD4BF] hover:text-[#26b8a5]"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostDashboard;