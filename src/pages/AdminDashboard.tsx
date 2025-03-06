import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Calendar, DollarSign, TrendingUp, ChevronDown, Clock, Building2, CreditCard, MapPin, User, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/format';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState('February');
  const [selectedYear, setSelectedYear] = useState('2025');

  // Mock data for revenue chart
  const revenueData = [
    { day: 1, amount: 12000 },
    { day: 2, amount: 8000 },
    { day: 3, amount: 15000 },
    { day: 4, amount: 10000 },
    { day: 5, amount: 9000 },
    { day: 6, amount: 11000 },
    { day: 7, amount: 13000 },
    { day: 8, amount: 7000 },
    { day: 9, amount: 9500 },
    { day: 10, amount: 8500 },
    { day: 11, amount: 12500 },
    { day: 12, amount: 11500 },
    { day: 13, amount: 9000 },
    { day: 14, amount: 13500 },
    { day: 15, amount: 14500 },
    { day: 16, amount: 15500 },
    { day: 17, amount: 12500 },
    { day: 18, amount: 11000 },
    { day: 19, amount: 13000 },
    { day: 20, amount: 14000 },
    { day: 21, amount: 15000 },
    { day: 22, amount: 13500 },
    { day: 23, amount: 12000 },
    { day: 24, amount: 14500 },
    { day: 25, amount: 13000 },
    { day: 26, amount: 12500 },
    { day: 27, amount: 14000 },
    { day: 28, amount: 13500 }
  ];

  // Mock data for booking distribution
  const bookingDistribution = [
    { status: 'Completed', percentage: 32, color: '#2DD4BF' },
    { status: 'Upcoming', percentage: 41, color: '#A78BFA' },
    { status: 'Cancelled', percentage: 27, color: '#9CA3AF' }
  ];

  // Calculate total revenue
  const totalRevenue = revenueData.reduce((sum, day) => sum + day.amount, 0);

  // Find max revenue for scaling
  const maxRevenue = Math.max(...revenueData.map(day => day.amount));

  // Mock data for today's bookings
  const todaysBookings = [
    {
      id: 'BK001',
      venue: 'Downtown Event Space',
      guest: 'John Smith',
      time: '10:00 AM - 2:00 PM',
      amount: 450.00,
      status: 'confirmed',
      location: 'New York, NY'
    },
    {
      id: 'BK002',
      venue: 'Sunset Studio',
      guest: 'Sarah Johnson',
      time: '3:00 PM - 7:00 PM',
      amount: 320.00,
      status: 'pending',
      location: 'Los Angeles, CA'
    },
    {
      id: 'BK003',
      venue: 'Central Park View',
      guest: 'Michael Brown',
      time: '6:00 PM - 10:00 PM',
      amount: 550.00,
      status: 'confirmed',
      location: 'New York, NY'
    },
    {
      id: 'BK004',
      venue: 'Rooftop Garden',
      guest: 'Emma Wilson',
      time: '11:00 AM - 3:00 PM',
      amount: 480.00,
      status: 'pending',
      location: 'Chicago, IL'
    },
    {
      id: 'BK005',
      venue: 'Historic Ballroom',
      guest: 'David Lee',
      time: '4:00 PM - 8:00 PM',
      amount: 620.00,
      status: 'confirmed',
      location: 'Boston, MA'
    }
  ];

  // Revenue and performance stats
  const venueStats = [
    {
      title: 'Venues Booked Today',
      value: '156',
      icon: Building2,
      change: 12.5,
      changeText: 'Up from yesterday',
      color: 'bg-purple-500',
      gradient: 'from-purple-500/10 to-purple-500/5',
      onClick: () => navigate('/admin/bookings')
    },
    {
      title: 'Revenue Last Month',
      value: formatCurrency(125750),
      icon: DollarSign,
      change: 8.2,
      changeText: 'vs previous month',
      color: 'bg-blue-500',
      gradient: 'from-blue-500/10 to-blue-500/5',
      onClick: () => navigate('/admin/revenue')
    },
    {
      title: 'Revenue This Month',
      value: formatCurrency(98450),
      icon: DollarSign,
      change: 15.3,
      changeText: 'Projected increase',
      color: 'bg-green-500',
      gradient: 'from-green-500/10 to-green-500/5',
      onClick: () => navigate('/admin/revenue')
    },
    {
      title: 'Host Payouts Last Month',
      value: formatCurrency(100600),
      icon: CreditCard,
      change: 7.8,
      changeText: 'vs previous month',
      color: 'bg-orange-500',
      gradient: 'from-orange-500/10 to-orange-500/5',
      onClick: () => navigate('/admin/revenue')
    },
    {
      title: 'Host Payouts This Month',
      value: formatCurrency(78760),
      icon: CreditCard,
      change: 14.2,
      changeText: 'Projected increase',
      color: 'bg-pink-500',
      gradient: 'from-pink-500/10 to-pink-500/5',
      onClick: () => navigate('/admin/revenue')
    }
  ];

  // Management overview stats
  const managementStats = [
    {
      title: 'Total Bookings',
      value: '40,689',
      icon: Calendar,
      change: 8.5,
      changeText: 'Up from yesterday',
      color: 'bg-cyan-500',
      gradient: 'from-cyan-500/10 to-cyan-500/5',
      onClick: () => navigate('/admin/bookings')
    },
    {
      title: 'Total Hosts',
      value: '10,293',
      icon: Users,
      change: 1.3,
      changeText: 'Up from past week',
      color: 'bg-indigo-500',
      gradient: 'from-indigo-500/10 to-indigo-500/5',
      onClick: () => navigate('/admin/hosts')
    },
    {
      title: 'Total Guests',
      value: '10,293',
      icon: Users,
      change: 1.3,
      changeText: 'Up from past week',
      color: 'bg-violet-500',
      gradient: 'from-violet-500/10 to-violet-500/5',
      onClick: () => navigate('/admin/guests')
    },
    {
      title: 'Upcoming Bookings',
      value: '10,293',
      icon: Clock,
      change: 1.3,
      changeText: 'Up from past week',
      color: 'bg-amber-500',
      gradient: 'from-amber-500/10 to-amber-500/5',
      onClick: () => navigate('/admin/bookings/upcoming')
    },
    {
      title: 'Past Bookings',
      value: '10,293',
      icon: Clock,
      change: 1.3,
      changeText: 'Up from past week',
      color: 'bg-rose-500',
      gradient: 'from-rose-500/10 to-rose-500/5',
      onClick: () => navigate('/admin/bookings/past')
    }
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome Back, Admin
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Here's what's happening with your venues today.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {formatDate(new Date())}
              </span>
              <button 
                onClick={() => navigate('/admin/settings')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Revenue Stats */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue & Performance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {venueStats.map((stat, index) => (
              <div
                key={index}
                onClick={stat.onClick}
                className={`relative overflow-hidden bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ${stat.onClick ? 'cursor-pointer' : ''}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-40 pointer-events-none`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">{stat.title}</span>
                    <div className={`w-10 h-10 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center ${stat.onClick ? 'group-hover:scale-110 transition-transform duration-300' : ''}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color.replace('bg-', 'text-')}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">{stat.value}</div>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">{stat.change}%</span>
                    <span className="text-gray-500 ml-1">{stat.changeText}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Overview Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
                <p className="text-2xl font-bold text-[#2DD4BF] mt-1">${(totalRevenue / 1000).toFixed(3)}<span className="text-sm font-normal text-gray-500 ml-1">USD</span></p>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF] text-sm"
                >
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF] text-sm"
                >
                  <option>2025</option>
                  <option>2024</option>
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
                  d={`M ${revenueData.map((d, i) => 
                    `${(i * (800 / 27))},${300 - (d.amount / maxRevenue * 300)}`
                  ).join(' L ')}`}
                  fill="none"
                  stroke="#2DD4BF"
                  strokeWidth="2"
                />

                {/* Revenue area */}
                <path
                  d={`M 0,300 ${revenueData.map((d, i) => 
                    `${(i * (800 / 27))},${300 - (d.amount / maxRevenue * 300)}`
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
                {revenueData.map((d) => (
                  <span key={d.day}>{d.day}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Distribution Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Booking Distribution</h2>
            <div className="relative">
              <svg className="w-full" viewBox="0 0 200 200">
                {/* Calculate and draw pie chart segments */}
                {(() => {
                  let currentAngle = 0;
                  return bookingDistribution.map((segment, index) => {
                    const angle = (segment.percentage / 100) * 360;
                    const x1 = Math.cos((currentAngle - 90) * Math.PI / 180) * 80 + 100;
                    const y1 = Math.sin((currentAngle - 90) * Math.PI / 180) * 80 + 100;
                    const x2 = Math.cos((currentAngle + angle - 90) * Math.PI / 180) * 80 + 100;
                    const y2 = Math.sin((currentAngle + angle - 90) * Math.PI / 180) * 80 + 100;
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    
                    const d = [
                      `M 100 100`,
                      `L ${x1} ${y1}`,
                      `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      'Z'
                    ].join(' ');
                    
                    const element = (
                      <path
                        key={index}
                        d={d}
                        fill={segment.color}
                      />
                    );
                    
                    currentAngle += angle;
                    return element;
                  });
                })()}
                {/* Inner circle for donut effect */}
                <circle cx="100" cy="100" r="60" fill="white" />
              </svg>
            </div>

            {/* Legend */}
            <div className="mt-6 space-y-2">
              {bookingDistribution.map((segment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="text-sm text-gray-600">{segment.status}</span>
                  </div>
                  <span className="text-sm font-medium">{segment.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Management Overview */}
        <div className="mb-12"> {/* Changed from mb-8 to mb-12 for more spacing */}
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Management Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {managementStats.map((stat, index) => (
              <div
                key={index}
                onClick={stat.onClick}
                className={`relative overflow-hidden bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ${stat.onClick ? 'cursor-pointer' : ''}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-40 pointer-events-none`} />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">{stat.title}</span>
                    <div className={`w-10 h-10 rounded-lg ${stat.color} bg-opacity-10 flex items-center justify-center ${stat.onClick ? 'group-hover:scale-110 transition-transform duration-300' : ''}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color.replace('bg-', 'text-')}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">{stat.value}</div>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500 font-medium">{stat.change}%</span>
                    <span className="text-gray-500 ml-1">{stat.changeText}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Venue Bookings */}
        <div className="pt-4"> {/* Added pt-4 for additional top padding */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Today's Venue Bookings</h2>
            <button
              onClick={() => navigate('/admin/bookings')}
              className="flex items-center text-[#2DD4BF] hover:text-[#26b8a5] transition-colors"
            >
              <span className="mr-1">View All</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Venue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
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
                  {todaysBookings.map((booking) => (
                    <tr 
                      key={booking.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/admin/bookings/${booking.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2DD4BF]">
                        {booking.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.venue}
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
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          {booking.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.time}
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;