import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, TrendingUp, Filter, Download, Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const HostRevenue = () => {
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
        const commission = bookingAmount * 0.20; // 20% platform fee
        const netRevenue = bookingAmount - commission;

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
          commission,
          netRevenue
        };
      });

      const totalBookingAmount = monthlyData.reduce((sum, month) => sum + month.revenue, 0);
      const totalCommission = totalBookingAmount * 0.20;
      const totalNetRevenue = totalBookingAmount - totalCommission;

      return {
        year,
        totalRevenue: totalBookingAmount,
        totalCommission,
        totalNetRevenue,
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
    toast.success('Exporting revenue report...');
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Revenue Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track your earnings and financial performance
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div className="flex items-center space-x-4">
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
        </div>

        <button
          onClick={handleExport}
          className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-[#2DD4BF] text-white rounded-lg hover:bg-[#26b8a5]"
        >
          <Download className="h-5 w-5 mr-2" />
          Export Report
        </button>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Overview Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
              <p className="text-2xl font-bold text-[#2DD4BF] mt-1">${(getYearlyTotalRevenue() / 1000).toFixed(3)}<span className="text-sm font-normal text-gray-500 ml-1">USD</span></p>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF] text-sm"
              >
                {historicalData.map(data => (
                  <option key={data.year} value={data.year}>{data.year}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="h-[300px] relative">
            <svg className="w-full h-full" viewBox="0 0 800 300">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 75}
                  x2="800"
                  y2={i * 75}
                  stroke="#E5E7EB"
                  strokeDasharray="4 4"
                />
              ))}

              {/* Revenue line */}
              <path
                d={`M ${currentItems.map((d, i) => 
                  `${(i * (800 / 11))},${300 - (d.revenue / currentYearData!.totalRevenue * 300)}`
                ).join(' L ')}`}
                fill="none"
                stroke="#2DD4BF"
                strokeWidth="2"
              />

              {/* Revenue area */}
              <path
                d={`M 0,300 ${currentItems.map((d, i) => 
                  `${(i * (800 / 11))},${300 - (d.revenue / currentYearData!.totalRevenue * 300)}`
                ).join(' L ')} L 800,300 Z`}
                fill="url(#gradient)"
                opacity="0.1"
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2DD4BF" />
                  <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
              {monthNames.map((month) => (
                <span key={month}>{month.substring(0, 3)}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Revenue Distribution</h2>
          <div className="space-y-4">
            {Object.entries(currentItems[new Date().getMonth()]?.categories || {}).map(([category, amount]) => (
              <div key={category} className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium capitalize">{category}</span>
                  <span className="text-sm font-medium">{formatCurrency(amount)}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2DD4BF] rounded-full"
                    style={{
                      width: `${(amount / currentItems[new Date().getMonth()]?.revenue) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Revenue Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gross Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform Fee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Booking Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((monthData, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {monthNames[monthData.month]}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(monthData.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                    -{formatCurrency(monthData.commission)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    {formatCurrency(monthData.netRevenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {monthData.bookings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(monthData.averageBookingValue)}
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

export default HostRevenue;