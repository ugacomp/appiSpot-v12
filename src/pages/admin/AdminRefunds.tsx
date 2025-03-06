import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, DollarSign, Calendar, ChevronRight, CheckCircle, XCircle, AlertCircle, Clock } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import toast from 'react-hot-toast';

// Mock data for refunds
const mockRefunds = [
  {
    id: 'REF001',
    bookingId: 'BK001',
    amount: 450.00,
    reason: 'Event cancelled due to emergency',
    requestedBy: 'John Smith',
    requestDate: '2025-02-19T10:30:00',
    status: 'pending',
    venue: 'Downtown Event Space',
    paymentMethod: 'Credit Card (**** 1234)',
    originalBookingDate: '2025-02-25'
  },
  {
    id: 'REF002',
    bookingId: 'BK002',
    amount: 320.00,
    reason: 'Double booking error',
    requestedBy: 'Sarah Johnson',
    requestDate: '2025-02-19T09:15:00',
    status: 'approved',
    venue: 'Sunset Studio',
    paymentMethod: 'PayPal (sarah.j@example.com)',
    originalBookingDate: '2025-02-22'
  },
  {
    id: 'REF003',
    bookingId: 'BK003',
    amount: 550.00,
    reason: 'Venue maintenance issue',
    requestedBy: 'Michael Brown',
    requestDate: '2025-02-18T16:45:00',
    status: 'processing',
    venue: 'Central Park View',
    paymentMethod: 'Credit Card (**** 5678)',
    originalBookingDate: '2025-02-24'
  },
  {
    id: 'REF004',
    bookingId: 'BK004',
    amount: 275.00,
    reason: 'Customer dissatisfaction',
    requestedBy: 'Emma Wilson',
    requestDate: '2025-02-18T14:20:00',
    status: 'declined',
    venue: 'Rooftop Garden',
    paymentMethod: 'Credit Card (**** 9012)',
    originalBookingDate: '2025-02-20'
  }
];

const AdminRefunds = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    dateRange: '',
    paymentMethod: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'declined':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleAction = (refundId: string, action: 'approve' | 'decline' | 'process') => {
    toast.success(`Refund ${action}d successfully`);
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
          <h1 className="text-2xl font-bold text-gray-900">Refund Management</h1>
          
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search refunds..."
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
            <h3 className="text-sm font-medium text-gray-500">Total Refunds</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(15750)}</p>
            <p className="mt-1 text-sm text-green-600">↑ 12% from last month</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Pending Refunds</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(4890)}</p>
            <p className="mt-1 text-sm text-yellow-600">23 requests pending</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Processing</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(2450)}</p>
            <p className="mt-1 text-sm text-blue-600">12 refunds processing</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Declined Refunds</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(1200)}</p>
            <p className="mt-1 text-sm text-red-600">3 refunds declined</p>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
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
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="declined">Declined</option>
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
                  <option value="thisMonth">This Month</option>
                  <option value="lastMonth">Last Month</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  value={filters.paymentMethod}
                  onChange={(e) => setFilters(prev => ({ ...prev, paymentMethod: e.target.value }))}
                  className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                >
                  <option value="">All Methods</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Refunds Table */}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requested By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockRefunds.map((refund) => (
                  <tr 
                    key={refund.id} 
                    onClick={() => navigate(`/admin/refunds/${refund.id}`)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2DD4BF]">
                      {refund.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{refund.bookingId}</div>
                        <div className="text-sm text-gray-500">{refund.venue}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(refund.amount)}</div>
                      <div className="text-xs text-gray-500">
                        Original booking: {new Date(refund.originalBookingDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(refund.status)}
                        <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(refund.status)}`}>
                          {refund.status.charAt(0).toUpperCase() + refund.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                          <span className="text-white font-medium">
                            {refund.requestedBy.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{refund.requestedBy}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(refund.requestDate).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {refund.paymentMethod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-center space-x-2">
                        {refund.status === 'pending' && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAction(refund.id, 'approve');
                              }}
                              className="text-green-600 hover:text-green-900"
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAction(refund.id, 'decline');
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </>
                        )}
                        {refund.status === 'approved' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction(refund.id, 'process');
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <DollarSign className="h-5 w-5" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/refunds/${refund.id}`);
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
    </div>
  );
};

export default AdminRefunds;