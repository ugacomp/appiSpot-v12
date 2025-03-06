import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Users, Star, Building2, DollarSign, ChevronRight, Plus, TrendingUp, MoreVertical, Pencil, Trash2, EyeOff, FileEdit, AlertCircle, Archive } from 'lucide-react';
import { formatCurrency } from '../../utils/format';
import toast from 'react-hot-toast';

// Add draft status to mock spots
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
    status: 'draft',
    rating: 4.9,
    totalBookings: 0,
    revenue: 0,
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
    featuredImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200'
  }
];

const HostSpots = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);
  const [showUnpublishDialog, setShowUnpublishDialog] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
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
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'unpublished':
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

  const handleEdit = (spotId: string) => {
    navigate(`/host/spots/${spotId}/edit`);
  };

  const handleDelete = (spotId: string) => {
    toast.success('Spot deleted successfully');
    setShowDeleteDialog(null);
  };

  const handleUnpublish = (spotId: string) => {
    toast.success('Spot unpublished successfully');
    setShowUnpublishDialog(null);
  };

  const handlePublish = (spotId: string) => {
    toast.success('Spot published successfully');
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown && !(event.target as Element).closest('.actions-dropdown')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  return (
    <div className="p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Spots</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your venues and track their performance
          </p>
        </div>
        <button
          onClick={() => navigate('/list-spot')}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#2DD4BF] hover:bg-[#26b8a5]"
        >
          <Plus className="h-5 w-5 mr-2" />
          List New Spot
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Spots</h3>
            <Building2 className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">5</p>
          <p className="mt-2 flex items-center text-sm text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>2 new this month</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Active Spots</h3>
            <Building2 className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">4</p>
          <p className="mt-2 flex items-center text-sm text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>1 new this week</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Draft Spots</h3>
            <FileEdit className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">1</p>
          <p className="mt-2 flex items-center text-sm text-blue-600">
            <span>Ready to publish</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <DollarSign className="h-5 w-5 text-[#2DD4BF]" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(56875)}</p>
          <p className="mt-2 flex items-center text-sm text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span>12% from last month</span>
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search spots..."
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
                  <option value="draft">Draft</option>
                  <option value="unpublished">Unpublished</option>
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
      </div>

      {/* Spots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSpots.map((spot) => (
          <div
            key={spot.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src={spot.featuredImage}
                alt={spot.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(spot.status)}`}>
                  {spot.status.charAt(0).toUpperCase() + spot.status.slice(1)}
                </span>
                <div className="relative actions-dropdown">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === spot.id ? null : spot.id)}
                    className="p-1 bg-white rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                  </button>
                  
                  {activeDropdown === spot.id && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1">
                        <button
                          onClick={() => handleEdit(spot.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Pencil className="h-4 w-4 mr-3" />
                          Edit
                        </button>
                        {spot.status === 'active' && (
                          <button
                            onClick={() => setShowUnpublishDialog(spot.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <EyeOff className="h-4 w-4 mr-3" />
                            Unpublish
                          </button>
                        )}
                        {spot.status === 'draft' && (
                          <button
                            onClick={() => handlePublish(spot.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            <Archive className="h-4 w-4 mr-3" />
                            Publish
                          </button>
                        )}
                        <button
                          onClick={() => setShowDeleteDialog(spot.id)}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <Trash2 className="h-4 w-4 mr-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{spot.name}</h3>
                {spot.status !== 'draft' && renderStars(spot.rating)}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{spot.city}, {spot.state}</span>
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
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Bookings</p>
                    <p className="text-lg font-semibold text-gray-900">{spot.totalBookings}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Revenue</p>
                    <p className="text-lg font-semibold text-[#2DD4BF]">{formatCurrency(spot.revenue)}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate(`/spots/${spot.id}`)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  View Details
                  <ChevronRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              Delete Spot
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to delete this spot? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteDialog(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteDialog)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unpublish Confirmation Dialog */}
      {showUnpublishDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 mx-auto mb-4">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              Unpublish Spot
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to unpublish this spot? It will no longer be visible to guests.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowUnpublishDialog(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUnpublish(showUnpublishDialog)}
                className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 rounded-md"
              >
                Yes, unpublish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostSpots;