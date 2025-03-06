import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, CheckCircle, XCircle, AlertCircle, Clock, Building2, User, Calendar, ChevronRight, Shield } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import toast from 'react-hot-toast';

// Mock data for approvals
const mockApprovals = {
  spots: [
    {
      id: 'SP005',
      name: 'Luxury Penthouse Suite',
      type: 'venue',
      host: {
        name: 'Michael Chen',
        email: 'michael.c@example.com'
      },
      location: 'San Francisco, CA',
      capacity: 50,
      pricePerHour: 350,
      submittedAt: '2025-02-18T14:30:00'
    },
    {
      id: 'SP006',
      name: 'Urban Art Gallery',
      type: 'venue',
      host: {
        name: 'Sarah Wilson',
        email: 'sarah.w@example.com'
      },
      location: 'New York, NY',
      capacity: 100,
      pricePerHour: 250,
      submittedAt: '2025-02-18T15:45:00'
    }
  ],
  hosts: [
    {
      id: 'HOST006',
      name: 'Jennifer Williams',
      email: 'jennifer.w@example.com',
      location: 'Austin, TX',
      spots: 3,
      submittedAt: '2025-02-19T11:20:00'
    },
    {
      id: 'HOST007',
      name: 'David Lee',
      email: 'david.l@example.com',
      location: 'Chicago, IL',
      spots: 2,
      submittedAt: '2025-02-19T10:15:00'
    }
  ],
  payouts: [
    {
      id: 'PO005',
      hostName: 'John Smith',
      amount: 1875.00,
      period: 'Feb 1-15, 2025',
      bookings: 12,
      submittedAt: '2025-02-16T10:00:00'
    },
    {
      id: 'PO006',
      hostName: 'Emma Davis',
      amount: 2340.00,
      period: 'Feb 1-15, 2025',
      bookings: 15,
      submittedAt: '2025-02-16T11:30:00'
    }
  ],
  refunds: [
    {
      id: 'REF005',
      bookingId: 'BK005',
      guestName: 'Emma Wilson',
      amount: 320.00,
      reason: 'Host cancelled booking',
      submittedAt: '2025-02-19T08:45:00'
    },
    {
      id: 'REF006',
      bookingId: 'BK006',
      guestName: 'Michael Brown',
      amount: 450.00,
      reason: 'Unable to attend due to emergency',
      submittedAt: '2025-02-19T09:30:00'
    }
  ]
};

const AdminApprovals = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'spots' | 'hosts' | 'payouts' | 'refunds'>('spots');
  const [filters, setFilters] = useState({
    type: '',
    dateRange: '',
    status: ''
  });

  const handleApprove = (type: string, id: string) => {
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(0, -1)} approved successfully`);
  };

  const handleReject = (type: string, id: string) => {
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(0, -1)} rejected successfully`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="sm:flex sm:items-center sm:justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Pending Approvals</h1>
          
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search approvals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
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
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Pending Spots</h3>
              <Building2 className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockApprovals.spots.length}</p>
            <p className="mt-2 text-sm text-gray-600">Awaiting review</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Pending Hosts</h3>
              <User className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockApprovals.hosts.length}</p>
            <p className="mt-2 text-sm text-gray-600">Awaiting verification</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Pending Payouts</h3>
              <Calendar className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockApprovals.payouts.length}</p>
            <p className="mt-2 text-sm text-gray-600">Ready for processing</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Pending Refunds</h3>
              <Shield className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{mockApprovals.refunds.length}</p>
            <p className="mt-2 text-sm text-gray-600">Awaiting review</p>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  <option value="spots">Spots</option>
                  <option value="hosts">Hosts</option>
                  <option value="payouts">Payouts</option>
                  <option value="refunds">Refunds</option>
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
                  <option value="yesterday">Yesterday</option>
                  <option value="last7days">Last 7 Days</option>
                  <option value="last30days">Last 30 Days</option>
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
                  <option value="pending">Pending</option>
                  <option value="in_review">In Review</option>
                  <option value="needs_info">Needs Information</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-t-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('spots')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'spots'
                    ? 'border-[#2DD4BF] text-[#2DD4BF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Building2 className="h-5 w-5 mr-2" />
                Spots ({mockApprovals.spots.length})
              </button>

              <button
                onClick={() => setActiveTab('hosts')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'hosts'
                    ? 'border-[#2DD4BF] text-[#2DD4BF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="h-5 w-5 mr-2" />
                Hosts ({mockApprovals.hosts.length})
              </button>

              <button
                onClick={() => setActiveTab('payouts')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'payouts'
                    ? 'border-[#2DD4BF] text-[#2DD4BF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="h-5 w-5 mr-2" />
                Payouts ({mockApprovals.payouts.length})
              </button>

              <button
                onClick={() => setActiveTab('refunds')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'refunds'
                    ? 'border-[#2DD4BF] text-[#2DD4BF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Shield className="h-5 w-5 mr-2" />
                Refunds ({mockApprovals.refunds.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        <div className="bg-white rounded-b-lg shadow-sm">
          {activeTab === 'spots' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Spot
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Host
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capacity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockApprovals.spots.map((spot) => (
                    <tr key={spot.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-[#2DD4BF]" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{spot.name}</div>
                            <div className="text-sm text-gray-500 capitalize">{spot.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{spot.host.name}</div>
                        <div className="text-sm text-gray-500">{spot.host.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {spot.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {spot.capacity} guests
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(spot.pricePerHour)}/hr
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(spot.submittedAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleApprove('spots', spot.id)}
                            className="p-1 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                            title="Approve"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleReject('spots', spot.id)}
                            className="p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                            title="Reject"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/approvals/spot/${spot.id}`)}
                            className="p-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                            title="View Details"
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
          )}

          {activeTab === 'hosts' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Host
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Spots
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockApprovals.hosts.map((host) => (
                    <tr key={host.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                            <span className="text-white font-medium">
                              {host.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{host.name}</div>
                            <div className="text-sm text-gray-500">{host.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {host.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {host.spots} spots
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(host.submittedAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleApprove('hosts', host.id)}
                            className="p-1 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                            title="Approve"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleReject('hosts', host.id)}
                            className="p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                            title="Reject"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/approvals/host/${host.id}`)}
                            className="p-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                            title="View Details"
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
          )}

          {activeTab === 'payouts' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Host
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bookings
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockApprovals.payouts.map((payout) => (
                    <tr key={payout.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                            <span className="text-white font-medium">
                              {payout.hostName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{payout.hostName}</div>
                            <div className="text-sm text-gray-500">ID: {payout.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(payout.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payout.period}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payout.bookings} bookings
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(payout.submittedAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleApprove('payouts', payout.id)}
                            className="p-1 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                            title="Approve"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleReject('payouts', payout.id)}
                            className="p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                            title="Reject"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/approvals/payout/${payout.id}`)}
                            className="p-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                            title="View Details"
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
          )}

          {activeTab === 'refunds' && (
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockApprovals.refunds.map((refund) => (
                    <tr key={refund.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2DD4BF]">
                        {refund.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {refund.bookingId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {refund.guestName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(refund.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {refund.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(refund.submittedAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleApprove('refunds', refund.id)}
                            className="p-1 bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                            title="Approve"
                          >
                            <CheckCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleReject('refunds', refund.id)}
                            className="p-1 bg-red-100 text-re d-600 rounded-full hover:bg-red-200"
                            title="Reject"
                          >
                            <XCircle className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => navigate(`/admin/approvals/refund/${refund.id}`)}
                            className="p-1 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                            title="View Details"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminApprovals;