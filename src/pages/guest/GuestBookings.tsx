import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Calendar, Clock, MapPin, Users, DollarSign, ChevronRight, Building2, Ban, ArrowLeft } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import toast from 'react-hot-toast';
import CancelBookingDialog from '../../components/CancelBookingDialog';

// Mock bookings data
const mockBookings = [
  {
    id: 'BK001',
    spot: {
      name: 'Downtown Event Space',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200'
    },
    date: '2025-02-25',
    time: '14:00 - 18:00',
    guests: 50,
    amount: 600.00,
    status: 'upcoming',
    host: {
      name: 'Sarah Wilson',
      email: 'sarah.w@example.com'
    }
  },
  {
    id: 'BK002',
    spot: {
      name: 'Creative Studio',
      location: 'Brooklyn, NY',
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200'
    },
    date: '2025-02-26',
    time: '10:00 - 14:00',
    guests: 20,
    amount: 300.00,
    status: 'confirmed',
    host: {
      name: 'Michael Chen',
      email: 'michael.c@example.com'
    }
  },
  {
    id: 'BK003',
    spot: {
      name: 'Rooftop Garden',
      location: 'Manhattan, NY',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200'
    },
    date: '2025-02-24',
    time: '16:00 - 20:00',
    guests: 100,
    amount: 800.00,
    status: 'completed',
    host: {
      name: 'Emily Brown',
      email: 'emily.b@example.com'
    }
  },
  {
    id: 'BK004',
    spot: {
      name: 'Historic Ballroom',
      location: 'Boston, MA',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200'
    },
    date: '2025-02-23',
    time: '18:00 - 22:00',
    guests: 150,
    amount: 1200.00,
    status: 'cancelled',
    host: {
      name: 'David Wilson',
      email: 'david.w@example.com'
    }
  }
];

const GuestBookings = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    dateRange: '',
    priceRange: ''
  });
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

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

  const handleCancelBooking = () => {
    // Update the booking status in your state/database
    toast.success('Booking cancelled successfully');
    setSelectedBooking(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage all your venue bookings
            </p>
          </div>
          
          <button
            onClick={() => navigate('/guest/profile')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Profile
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Total Bookings</h3>
              <Calendar className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <span>↑ 8% from last month</span>
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Upcoming</h3>
              <Clock className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <span>Next booking in 2 days</span>
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Total Spent</h3>
              <DollarSign className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(2900)}</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <span>↑ 15% from last month</span>
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Favorite Venues</h3>
              <Building2 className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">5</p>
            <p className="mt-2 flex items-center text-sm text-blue-600">
              <span>Most booked: Downtown Space</span>
            </p>
          </div>
        </div>

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
                    <option value="upcoming">Upcoming</option>
                    <option value="past_month">Past Month</option>
                    <option value="past_3_months">Past 3 Months</option>
                    <option value="past_6_months">Past 6 Months</option>
                    <option value="past_year">Past Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price Range
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                    className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                  >
                    <option value="">All Prices</option>
                    <option value="under_100">Under $100</option>
                    <option value="100_500">$100 - $500</option>
                    <option value="500_1000">$500 - $1000</option>
                    <option value="over_1000">Over $1000</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {mockBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 h-48 sm:h-auto">
                  <img
                    src={booking.spot.image}
                    alt={booking.spot.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{booking.spot.name}</h3>
                      <div className="flex items-center text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{booking.spot.location}</span>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                        <p className="text-sm font-medium">{booking.date}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        <p className="text-sm font-medium">{booking.time}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Guests</p>
                      <div className="flex items-center mt-1">
                        <Users className="h-4 w-4 text-gray-400 mr-1" />
                        <p className="text-sm font-medium">{booking.guests} people</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <div className="flex items-center mt-1">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                        <p className="text-sm font-medium">{formatCurrency(booking.amount)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {booking.host.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{booking.host.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {(booking.status === 'upcoming' || booking.status === 'confirmed') && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedBooking(booking.id);
                          }}
                          className="flex items-center px-3 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/bookings/${booking.id}`)}
                        className="text-[#2DD4BF] hover:text-[#26b8a5]"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedBooking && (
        <CancelBookingDialog
          isOpen={true}
          onClose={() => setSelectedBooking(null)}
          bookingId={selectedBooking}
          amount={mockBookings.find(b => b.id === selectedBooking)?.amount || 0}
          onCancel={handleCancelBooking}
        />
      )}
    </div>
  );
};

export default GuestBookings;