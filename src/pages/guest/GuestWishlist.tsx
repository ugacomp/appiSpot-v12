import React, { useState } from 'react';
import { Search, Filter, MapPin, Users, Star, Building2, DollarSign, Trash2, Heart, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/format';
import toast from 'react-hot-toast';

// Mock wishlist data
const mockWishlist = [
  {
    id: 'SP001',
    name: 'Downtown Event Space',
    description: 'A beautiful venue perfect for corporate events and celebrations',
    location: 'New York, NY',
    capacity: 200,
    pricePerHour: 150,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200',
    addedDate: '2025-01-15'
  },
  {
    id: 'SP002',
    name: 'Creative Studio Space',
    description: 'Modern studio perfect for photoshoots and small events',
    location: 'Los Angeles, CA',
    capacity: 50,
    pricePerHour: 75,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200',
    addedDate: '2025-01-20'
  },
  {
    id: 'SP003',
    name: 'Rooftop Garden Venue',
    description: 'Stunning rooftop space with panoramic city views',
    location: 'Chicago, IL',
    capacity: 150,
    pricePerHour: 200,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200',
    addedDate: '2025-01-25'
  }
];

const GuestWishlist = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: '',
    capacity: '',
    location: ''
  });

  const handleRemoveFromWishlist = (spotId: string) => {
    toast.success('Removed from wishlist');
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
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <p className="mt-1 text-sm text-gray-500">
            Keep track of your favorite spots
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
            <h3 className="text-sm font-medium text-gray-500">Saved Spots</h3>
            <Heart className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="mt-2 text-sm text-green-600">↑ 3 new this month</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Average Price</h3>
            <DollarSign className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(175)}/hr</p>
          <p className="mt-2 text-sm text-gray-600">Across all saved spots</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Most Common Type</h3>
            <Building2 className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">Venues</p>
          <p className="mt-2 text-sm text-gray-600">5 venues saved</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search saved spots..."
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
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                  className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                >
                  <option value="">All Prices</option>
                  <option value="under_100">Under $100/hr</option>
                  <option value="100_200">$100 - $200/hr</option>
                  <option value="over_200">Over $200/hr</option>
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
                  <option value="">Any Size</option>
                  <option value="small">Small (≤ 50)</option>
                  <option value="medium">Medium (51-150)</option>
                  <option value="large">Large (150+)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                >
                  <option value="">All Locations</option>
                  <option value="new_york">New York</option>
                  <option value="los_angeles">Los Angeles</option>
                  <option value="chicago">Chicago</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockWishlist.map((spot) => (
          <div
            key={spot.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <Link to={`/spots/${spot.id}`} className="block relative">
              <img
                src={spot.image}
                alt={spot.name}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveFromWishlist(spot.id);
                }}
                className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </Link>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{spot.name}</h3>
                {renderStars(spot.rating)}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{spot.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">Capacity: {spot.capacity}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span className="text-sm">{formatCurrency(spot.pricePerHour)}/hour</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-500">Added on {new Date(spot.addedDate).toLocaleDateString()}</p>
                <Link
                  to={`/spots/${spot.id}`}
                  className="mt-4 block w-full text-center px-4 py-2 border border-[#2DD4BF] rounded-md text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-white transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestWishlist;