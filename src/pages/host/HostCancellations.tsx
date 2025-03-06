import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Calendar, Ban, DollarSign, ChevronRight, Building2, Clock } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import toast from 'react-hot-toast';

// Mock cancellations data
const mockCancellations = [
  {
    id: 'CAN001',
    booking: {
      id: 'BK001',
      spot: {
        name: 'Downtown Event Space',
        location: 'New York, NY',
        image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200'
      },
      date: '2025-02-20',
      time: '15:00 - 19:00',
      guests: 50,
      amount: 450.00
    },
    guest: {
      name: 'Emma Wilson',
      email: 'emma.w@example.com'
    },
    reason: 'Guest requested cancellation',
    status: 'pending',
    requestedAt: '2025-02-19T10:30:00',
    refundAmount: 405.00
  },
  {
    id: 'CAN002',
    booking: {
      id: 'BK002',
      spot: {
        name: 'Creative Studio',
        location: 'Brooklyn, NY',
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200'
      },
      date: '2025-02-22',
      time: '13:00 - 17:00',
      guests: 20,
      amount: 320.00
    },
    guest: {
      name: 'David Lee',
      email: 'david.l@example.com'
    },
    reason: 'Host initiated cancellation',
    status: 'approved',
    requestedAt: '2025-02-18T15:45:00',
    refundAmount: 288.00
  },
  {
    id: 'CAN003',
    booking: {
      id: 'BK003',
      spot: {
        name: 'Rooftop Garden',
        location: 'Manhattan, NY',
        image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200'
      },
      date: '2025-02-24',
      time: '14:00 - 18:00',
      guests: 75,
      amount: 550.00
    },
    guest: {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com'
    },
    reason: 'Weather conditions',
    status: 'processing',
    requestedAt: '2025-02-19T09:15:00',
    refundAmount: 495.00
  }
];

const HostCancellations = () => {
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
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApprove = (cancellationId: string) => {
    toast.success('Cancellation approved successfully');
  };

  const handleReject = (cancellationId: string) => {
    toast.success('Cancellation rejected successfully');
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Cancellations</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage booking cancellations and refunds
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Cancellations</h3>
            <Ban className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="mt-2 text-sm text-gray-600">Last 30 days</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Pending Requests</h3>
            <Clock className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">3</p>
          <p className="mt-2 text-sm text-yellow-600">Needs attention</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Refunded</h3>
            <DollarSign className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-[#2DD4BF]">{formatCurrency(1188)}</p>
          <p className="mt-2 text-sm text-gray-600">90% refund rate</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Most Affected Spot</h3>
            <Building2 className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">Studio</p>
          <p className="mt-2 text-sm text-gray-600">4 cancellations</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search cancellations..."
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
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="processing">Processing</option>
                  <option value="rejected">Rejected</option>
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
                  <option value="last_month">Last Month</option>
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

      {/* Cancellations List */}
      <div className="space-y-6">
        {mockCancellations.map((cancellation) => (
          <div
            key={cancellation.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              <div className="sm:w-48 h-48 sm:h-auto">
                <img
                  src={cancellation.booking.spot.image}
                  alt={cancellation.booking.spot.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{cancellation.booking.spot.name}</h3>
                    <p className="text-sm text-gray-500">{cancellation.booking.spot.location}</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(cancellation.status)}`}>
                      {cancellation.status.charAt(0).toUpperCase() + cancellation.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Booking Date</p>
                    <p className="mt-1 font-medium">{cancellation.booking.date}</p>
                    <p className="text-sm text-gray-500">{cancellation.booking.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Original Amount</p>
                    <p className="mt-1 font-medium">{formatCurrency(cancellation.booking.amount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Refund Amount</p>
                    <p className="mt-1 font-medium text-green-600">{formatCurrency(cancellation.refundAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Requested</p>
                    <p className="mt-1 font-medium">{new Date(cancellation.requestedAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {cancellation.guest.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{cancellation.guest.name}</p>
                          <p className="text-sm text-gray-500">{cancellation.reason}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {cancellation.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(cancellation.id)}
                            className="px-3 py-1 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(cancellation.id)}
                            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => navigate(`/host/cancellations/${cancellation.id}`)}
                        className="text-[#2DD4BF] hover:text-[#26b8a5]"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostCancellations;