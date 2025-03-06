import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Calendar, Clock, MapPin, Users, DollarSign, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import toast from 'react-hot-toast';

// Mock bookings data
const mockBookings = [
  {
    id: 'BK001',
    spot: {
      name: 'Downtown Event Space',
      location: 'New York, NY'
    },
    guest: {
      name: 'John Smith',
      email: 'john.s@example.com'
    },
    date: '2025-02-25',
    time: '14:00 - 18:00',
    guests: 50,
    amount: 600.00,
    status: 'upcoming'
  },
  {
    id: 'BK002',
    spot: {
      name: 'Creative Studio',
      location: 'Brooklyn, NY'
    },
    guest: {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com'
    },
    date: '2025-02-26',
    time: '10:00 - 14:00',
    guests: 20,
    amount: 300.00,
    status: 'confirmed'
  },
  {
    id: 'BK003',
    spot: {
      name: 'Rooftop Garden',
      location: 'Manhattan, NY'
    },
    guest: {
      name: 'Michael Brown',
      email: 'michael.b@example.com'
    },
    date: '2025-02-24',
    time: '16:00 - 20:00',
    guests: 100,
    amount: 800.00,
    status: 'completed'
  }
];

const HostBookings = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    dateRange: '',
    spotId: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your venue bookings and reservations
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
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
                  <option value="upcoming">Upcoming</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
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
                  <option value="tomorrow">Tomorrow</option>
                  <option value="this_week">This Week</option>
                  <option value="next_week">Next Week</option>
                  <option value="this_month">This Month</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Spot
                </label>
                <select
                  value={filters.spotId}
                  onChange={(e) => setFilters(prev => ({ ...prev, spotId: e.target.value }))}
                  className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                >
                  <option value="">All Spots</option>
                  <option value="downtown">Downtown Event Space</option>
                  <option value="creative">Creative Studio</option>
                  <option value="rooftop">Rooftop Garden</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Today's Bookings</h3>
            <Calendar className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="mt-2 flex items-center text-sm text-green-600">
            <span>↑ 8% from yesterday</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Upcoming</h3>
            <Clock className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">45</p>
          <p className="mt-2 flex items-center text-sm text-green-600">
            <span>↑ 12% from last week</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Guests</h3>
            <Users className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">320</p>
          <p className="mt-2 flex items-center text-sm text-green-600">
            <span>↑ 15% from last month</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
            <DollarSign className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(15750)}</p>
          <p className="mt-2 flex items-center text-sm text-green-600">
            <span>↑ 10% from last month</span>
          </p>
        </div>
      </div>

      {/* Bookings Table */}
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
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockBookings.map((booking) => (
                <tr 
                  key={booking.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/host/bookings/${booking.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2DD4BF]">
                    {booking.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.spot.name}</div>
                      <div className="text-sm text-gray-500">{booking.spot.location}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {booking.guest.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{booking.guest.name}</div>
                        <div className="text-sm text-gray-500">{booking.guest.email}</div>
                      </div>
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
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/host/bookings/${booking.id}`);
                        }}
                        className="text-[#2DD4BF] hover:text-[#26b8a5] transition-colors"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HostBookings;