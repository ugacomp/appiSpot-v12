import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Mail, Phone, Calendar, MapPin, User, TrendingUp, UserPlus, ChevronRight, Shield, Clock, Star } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock data for guests
const mockGuests = [
  {
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
    verificationStatus: 'verified'
  },
  {
    id: 'G002',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 234-5678',
    location: 'Los Angeles, CA',
    joinDate: '2024-01-20',
    status: 'active',
    totalBookings: 8,
    totalSpent: 1800.00,
    lastBooking: '2025-02-10',
    verificationStatus: 'pending'
  },
  {
    id: 'G003',
    name: 'Michael Brown',
    email: 'michael.b@example.com',
    phone: '+1 (555) 345-6789',
    location: 'Chicago, IL',
    joinDate: '2024-01-25',
    status: 'inactive',
    totalBookings: 3,
    totalSpent: 750.00,
    lastBooking: '2025-01-20',
    verificationStatus: 'verified'
  },
  {
    id: 'G004',
    name: 'Emily Wilson',
    email: 'emily.w@example.com',
    phone: '+1 (555) 456-7890',
    location: 'Miami, FL',
    joinDate: '2024-02-01',
    status: 'active',
    totalBookings: 5,
    totalSpent: 1200.00,
    lastBooking: '2025-02-12',
    verificationStatus: 'verified'
  }
];

const AdminGuests = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    verificationStatus: '',
    dateRange: '',
    spendingRange: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 sm:mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Guest Management</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search guests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-auto pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Total Guests</h3>
              <User className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">1,234</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>12% from last month</span>
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Active Guests</h3>
              <UserPlus className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">987</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>8% from last month</span>
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Average Bookings</h3>
              <Calendar className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">7.5</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>5% from last month</span>
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Avg. Spending</h3>
              <Star className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">$450</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>15% from last month</span>
            </p>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Verification
                </label>
                <select
                  value={filters.verificationStatus}
                  onChange={(e) => setFilters(prev => ({ ...prev, verificationStatus: e.target.value }))}
                  className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                >
                  <option value="">All</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Join Date
                </label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value }))}
                  className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                >
                  <option value="">All Time</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
                  <option value="last90days">Last 90 Days</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Spending
                </label>
                <select
                  value={filters.spendingRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, spendingRange: e.target.value }))}
                  className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                >
                  <option value="">All</option>
                  <option value="under500">Under $500</option>
                  <option value="500to2000">$500 - $2000</option>
                  <option value="over2000">Over $2000</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Guest Cards */}
        <div className="block sm:hidden space-y-4">
          {mockGuests.map((guest) => (
            <div
              key={guest.id}
              onClick={() => navigate(`/admin/guests/${guest.id}`)}
              className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                  <span className="text-white font-medium">
                    {guest.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="ml-3 flex-1">
                  <div className="text-base font-medium text-gray-900">{guest.name}</div>
                  <div className="text-sm text-gray-500">
                    Member since {new Date(guest.joinDate).toLocaleDateString()}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{guest.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{guest.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{guest.location}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(guest.status)}`}>
                  {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getVerificationColor(guest.verificationStatus)}`}>
                  {guest.verificationStatus.charAt(0).toUpperCase() + guest.verificationStatus.slice(1)}
                </span>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-50 p-2 rounded">
                  <div className="text-gray-500">Bookings</div>
                  <div className="font-medium">{guest.totalBookings}</div>
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  <div className="text-gray-500">Total Spent</div>
                  <div className="font-medium">${guest.totalSpent.toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Guest Table */}
        <div className="hidden sm:block bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guest
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verification
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bookings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Spent
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockGuests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                          <span className="text-white font-medium">
                            {guest.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{guest.name}</div>
                          <div className="text-sm text-gray-500">Member since {new Date(guest.joinDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="flex items-center text-gray-900">
                          <Mail className="h-4 w-4 text-gray-400 mr-1" />
                          {guest.email}
                        </div>
                        <div className="flex items-center text-gray-500 mt-1">
                          <Phone className="h-4 w-4 text-gray-400 mr-1" />
                          {guest.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        {guest.location}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(guest.status)}`}>
                        {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getVerificationColor(guest.verificationStatus)}`}>
                        {guest.verificationStatus.charAt(0).toUpperCase() + guest.verificationStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{guest.totalBookings} bookings</div>
                      <div className="text-sm text-gray-500">Last: {new Date(guest.lastBooking).toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${guest.totalSpent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => navigate(`/admin/guests/${guest.id}`)}
                        className="text-[#2DD4BF] hover:text-[#26b8a5] transition-colors"
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
      </div>
    </div>
  );
};

export default AdminGuests;