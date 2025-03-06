import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Building2, MapPin, Users, Star, DollarSign, ChevronRight, Plus, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import toast from 'react-hot-toast';

// Mock data for spots
const mockSpots = [
  {
    id: 'SP001',
    name: 'Downtown Event Space',
    description: 'A beautiful venue perfect for corporate events and celebrations',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    capacity: 200,
    pricePerHour: 150,
    squareFootage: 2000,
    type: 'venue',
    status: 'active',
    rating: 4.8,
    totalBookings: 156,
    revenue: 23400,
    host: {
      name: 'Sarah Wilson',
      email: 'sarah.w@example.com'
    },
    featuredImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'SP002',
    name: 'Creative Studio Space',
    description: 'Modern studio perfect for photoshoots and small events',
    address: '456 Art Ave',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90012',
    capacity: 50,
    pricePerHour: 75,
    squareFootage: 1000,
    type: 'studio',
    status: 'pending',
    rating: 4.9,
    totalBookings: 89,
    revenue: 6675,
    host: {
      name: 'Michael Chen',
      email: 'michael.c@example.com'
    },
    featuredImage: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'SP003',
    name: 'Rooftop Garden Venue',
    description: 'Stunning rooftop space with panoramic city views',
    address: '789 Sky Lane',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    capacity: 150,
    pricePerHour: 200,
    squareFootage: 3000,
    type: 'outdoor',
    status: 'active',
    rating: 4.7,
    totalBookings: 134,
    revenue: 26800,
    host: {
      name: 'Emily Brown',
      email: 'emily.b@example.com'
    },
    featuredImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'SP004',
    name: 'Historic Ballroom',
    description: 'Elegant ballroom in a restored historic building',
    address: '321 Heritage Rd',
    city: 'Boston',
    state: 'MA',
    zipCode: '02108',
    capacity: 300,
    pricePerHour: 250,
    squareFootage: 5000,
    type: 'venue',
    status: 'inactive',
    rating: 4.9,
    totalBookings: 78,
    revenue: 19500,
    host: {
      name: 'David Wilson',
      email: 'david.w@example.com'
    },
    featuredImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200'
  }
];

const AdminSpots = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    priceRange: '',
    capacity: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? 'fill-[#FFD700] text-[#FFD700]'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
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
          <h1 className="text-2xl font-bold text-gray-900">Spots Management</h1>
          
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search spots..."
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

            <button
              onClick={() => navigate('/admin/spots/new')}
              className="flex items-center px-4 py-2 bg-[#2DD4BF] text-white rounded-lg hover:bg-[#26b8a5]"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Spot
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Spots</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">1,234</p>
            <p className="mt-1 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 inline mr-1" />
              12% from last month
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Active Spots</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">987</p>
            <p className="mt-1 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 inline mr-1" />
              8% from last month
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">{formatCurrency(76375)}</p>
            <p className="mt-1 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 inline mr-1" />
              15% from last month
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Avg. Rating</h3>
            <p className="mt-2 text-3xl font-bold text-gray-900">4.8</p>
            <p className="mt-1 text-sm text-green-600">
              <TrendingUp className="h-4 w-4 inline mr-1" />
              0.2 from last month
            </p>
          </div>
        </div>

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
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
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
                  <option value="venue">Venue</option>
                  <option value="studio">Studio</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="office">Office</option>
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
                  <option value="budget">Budget (≤ $50/hr)</option>
                  <option value="mid">Mid-Range ($51-150/hr)</option>
                  <option value="premium">Premium ($150+/hr)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <select
                  value={filters.capacity}
                  onChange={(e) => setFilters(prev => ({ ...prev, capacity: e.target.value }))}
                  className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                >
                  <option value="">All Sizes</option>
                  <option value="small">Small (≤ 50)</option>
                  <option value="medium">Medium (51-150)</option>
                  <option value="large">Large (150+)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Spots Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spot
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Host
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bookings
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockSpots.map((spot) => (
                  <tr 
                    key={spot.id}
                    onClick={() => navigate(`/admin/spots/${spot.id}`)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            src={spot.featuredImage}
                            alt={spot.name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{spot.name}</div>
                          <div className="text-sm text-gray-500">{spot.type}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        {spot.city}, {spot.state}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{spot.host.name}</div>
                      <div className="text-sm text-gray-500">{spot.host.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(spot.status)}`}>
                        {spot.status.charAt(0).toUpperCase() + spot.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStars(spot.rating)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {spot.totalBookings} bookings
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(spot.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/spots/${spot.id}`);
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

export default AdminSpots;