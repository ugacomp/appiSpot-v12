import React, { useState } from 'react';
import { Search, Filter, Calendar, Ban, DollarSign, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import { useNavigate } from 'react-router-dom';

// Mock cancellations data
const mockCancellations = [
  {
    id: 'CAN001',
    spot: {
      name: 'Beach House Venue',
      location: 'Miami Beach, FL',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200'
    },
    date: '2025-01-15',
    time: '15:00 - 19:00',
    amount: 600.00,
    refundAmount: 540.00,
    reason: 'Schedule conflict',
    status: 'refunded',
    refundDate: '2025-01-16'
  },
  {
    id: 'CAN002',
    spot: {
      name: 'Mountain View Studio',
      location: 'Denver, CO',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200'
    },
    date: '2025-01-20',
    time: '10:00 - 14:00',
    amount: 400.00,
    refundAmount: 360.00,
    reason: 'Weather conditions',
    status: 'refunded',
    refundDate: '2025-01-21'
  }
];

const GuestCancellations = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: '',
    status: ''
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cancellations</h1>
          <p className="mt-1 text-sm text-gray-500">
            View your cancelled bookings and refund status
          </p>
        </div>
        
        {/* Back to Profile Button */}
        <button
          onClick={() => navigate('/guest/profile')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Profile
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Cancellations</h3>
            <Ban className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">2</p>
          <p className="mt-2 text-sm text-gray-600">Last 6 months</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Refunded</h3>
            <DollarSign className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-[#2DD4BF]">{formatCurrency(900)}</p>
          <p className="mt-2 text-sm text-gray-600">90% refund rate</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Last Cancellation</h3>
            <Calendar className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">Jan 20</p>
          <p className="mt-2 text-sm text-gray-600">30 days ago</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <option value="last_month">Last Month</option>
                  <option value="last_3_months">Last 3 Months</option>
                  <option value="last_6_months">Last 6 Months</option>
                  <option value="last_year">Last Year</option>
                </select>
              </div>

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
                  <option value="refunded">Refunded</option>
                  <option value="processing">Processing</option>
                  <option value="pending">Pending</option>
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
                  src={cancellation.spot.image}
                  alt={cancellation.spot.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{cancellation.spot.name}</h3>
                    <p className="text-sm text-gray-500">{cancellation.spot.location}</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                      Refunded
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Cancelled Date</p>
                    <p className="mt-1 font-medium">{cancellation.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Original Amount</p>
                    <p className="mt-1 font-medium">{formatCurrency(cancellation.amount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Refund Amount</p>
                    <p className="mt-1 font-medium text-green-600">{formatCurrency(cancellation.refundAmount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Refund Date</p>
                    <p className="mt-1 font-medium">{cancellation.refundDate}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-500">Cancellation Reason</p>
                  <p className="mt-1 text-gray-900">{cancellation.reason}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestCancellations;