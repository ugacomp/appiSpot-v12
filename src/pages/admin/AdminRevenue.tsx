import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign, TrendingUp, Filter, Download, Calendar, Clock } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const AdminRevenue = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedTimeframe, setSelectedTimeframe] = useState('yearly');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Generate historical data
  const generateHistoricalData = () => {
    const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
    const months = Array.from({ length: 12 }, (_, i) => i);
    
    return years.map(year => {
      const monthlyData = months.map(month => {
        const bookingAmount = Math.random() * 100000 + 50000;
        const guestCommission = bookingAmount * 0.10; // 10% from guests
        const hostCommission = bookingAmount * 0.10; // 10% from hosts
        const totalCommission = guestCommission + hostCommission;

        return {
          month,
          revenue: bookingAmount,
          bookings: Math.floor(Math.random() * 200 + 100),
          averageBookingValue: Math.random() * 500 + 200,
          categories: {
            venues: Math.random() * 40000 + 20000,
            studios: Math.random() * 30000 + 15000,
            outdoor: Math.random() * 20000 + 10000,
            offices: Math.random() * 15000 + 7500,
            others: Math.random() * 10000 + 5000
          },
          commissions: {
            guest: guestCommission,
            host: hostCommission,
            total: totalCommission
          }
        };
      });

      const totalBookingAmount = monthlyData.reduce((sum, month) => sum + month.revenue, 0);
      const totalGuestCommission = totalBookingAmount * 0.10;
      const totalHostCommission = totalBookingAmount * 0.10;

      return {
        year,
        totalRevenue: totalBookingAmount,
        totalCommissions: {
          guest: totalGuestCommission,
          host: totalHostCommission,
          total: totalGuestCommission + totalHostCommission
        },
        monthlyData
      };
    });
  };

  const [historicalData] = useState(generateHistoricalData());
  const currentYearData = historicalData.find(data => data.year === selectedYear);
  const currentItems = currentYearData?.monthlyData || [];

  // Calculate today's revenue
  const getTodayRevenue = () => {
    return Math.random() * 10000 + 5000; // Random value for demo
  };

  // Calculate this week's revenue
  const getThisWeekRevenue = () => {
    return Math.random() * 50000 + 25000; // Random value for demo
  };

  // Calculate this month's revenue
  const getThisMonthRevenue = () => {
    return currentItems[new Date().getMonth()]?.revenue || 0;
  };

  // Calculate last month's revenue
  const getLastMonthRevenue = () => {
    const lastMonth = new Date().getMonth() - 1;
    return lastMonth >= 0 ? currentItems[lastMonth]?.revenue || 0 : 0;
  };

  // Calculate yearly total revenue
  const getYearlyTotalRevenue = () => {
    return currentYearData?.totalRevenue || 0;
  };

  const handleExport = () => {
    // In a real application, this would generate and download a report
    console.log('Exporting data...');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Revenue Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Comprehensive overview of your platform's financial performance
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
            >
              <option value="yearly">Yearly</option>
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>

            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 bg-[#2DD4BF] text-white rounded-lg hover:bg-[#26b8a5]"
            >
              <Download className="h-5 w-5 mr-2" />
              Export
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                >
                  {historicalData.map(data => (
                    <option key={data.year} value={data.year}>{data.year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Revenue Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {/* Today's Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Today's Revenue</h3>
              <Clock className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(getTodayRevenue())}
            </p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>8% from yesterday</span>
            </p>
          </div>

          {/* This Week's Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">This Week's Revenue</h3>
              <Calendar className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(getThisWeekRevenue())}
            </p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>12% from last week</span>
            </p>
          </div>

          {/* This Month's Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">This Month's Revenue</h3>
              <DollarSign className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(getThisMonthRevenue())}
            </p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>15% from last month</span>
            </p>
          </div>

          {/* Last Month's Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Last Month's Revenue</h3>
              <DollarSign className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(getLastMonthRevenue())}
            </p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>10% from previous month</span>
            </p>
          </div>

          {/* Yearly Total Revenue */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Yearly Total Revenue</h3>
              <DollarSign className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(getYearlyTotalRevenue())}
            </p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>20% from last year</span>
            </p>
          </div>
        </div>

        {/* Commission Overview */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Commission Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {/* Today's Commission */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm font-medium text-gray-500">Today's Commission</h3>
                <DollarSign className="h-5 w-5 text-purple-500" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {formatCurrency(getTodayRevenue() * 0.2)}
              </p>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-purple-500 font-medium">20%</span>
                <span className="text-gray-500 ml-1">of today's revenue</span>
              </div>
            </div>

            {/* This Week's Commission */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm font-medium text-gray-500">This Week's Commission</h3>
                <DollarSign className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {formatCurrency(getThisWeekRevenue() * 0.2)}
              </p>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-blue-500 font-medium">20%</span>
                <span className="text-gray-500 ml-1">of this week's revenue</span>
              </div>
            </div>

            {/* This Month's Commission */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm font-medium text-gray-500">This Month's Commission</h3>
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {formatCurrency(getThisMonthRevenue() * 0.2)}
              </p>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-green-500 font-medium">20%</span>
                <span className="text-gray-500 ml-1">of this month's revenue</span>
              </div>
            </div>

            {/* Last Month's Commission */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm font-medium text-gray-500">Last Month's Commission</h3>
                <DollarSign className="h-5 w-5 text-orange-500" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {formatCurrency(getLastMonthRevenue() * 0.2)}
              </p>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-orange-500 font-medium">20%</span>
                <span className="text-gray-500 ml-1">of last month's revenue</span>
              </div>
            </div>

            {/* Yearly Total Commission */}
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h3 className="text-sm font-medium text-gray-500">Yearly Total Commission</h3>
                <DollarSign className="h-5 w-5 text-pink-500" />
              </div>
              <p className="text-lg sm:text-2xl font-bold text-gray-900">
                {formatCurrency(getYearlyTotalRevenue() * 0.2)}
              </p>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-pink-500 font-medium">20%</span>
                <span className="text-gray-500 ml-1">of yearly revenue</span>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Revenue Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Booking Revenue
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guest Commission
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Host Commission
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Commission
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((monthData, index) => {
                  const netRevenue = monthData.revenue + monthData.commissions.total;
                  return (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {monthNames[monthData.month]}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(monthData.revenue)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        {formatCurrency(monthData.commissions.guest)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        {formatCurrency(monthData.commissions.host)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                        {formatCurrency(monthData.commissions.total)}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {formatCurrency(netRevenue)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRevenue;