import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, UserCog, TrendingUp, Shield, Users, ChevronRight, Plus, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock data for roles
const mockRoles = [
  {
    id: 'ROLE001',
    name: 'Super Admin',
    description: 'Full system access with all permissions',
    users: 3,
    permissions: [
      'manage_users',
      'manage_roles',
      'manage_spots',
      'manage_bookings',
      'manage_payments',
      'manage_settings'
    ],
    createdAt: '2024-01-15',
    lastUpdated: '2025-02-19'
  },
  {
    id: 'ROLE002',
    name: 'Admin',
    description: 'System administration with limited permissions',
    users: 5,
    permissions: [
      'manage_spots',
      'manage_bookings',
      'manage_payments'
    ],
    createdAt: '2024-01-15',
    lastUpdated: '2025-02-18'
  },
  {
    id: 'ROLE003',
    name: 'Support',
    description: 'Customer support and issue resolution',
    users: 12,
    permissions: [
      'view_users',
      'view_spots',
      'view_bookings',
      'manage_support_tickets',
      'manage_disputes',
      'view_payments'
    ],
    createdAt: '2024-01-15',
    lastUpdated: '2025-02-17'
  },
  {
    id: 'ROLE004',
    name: 'Host',
    description: 'Spot management and booking handling',
    users: 156,
    permissions: [
      'manage_own_spots',
      'manage_own_bookings',
      'view_own_payments'
    ],
    createdAt: '2024-01-15',
    lastUpdated: '2025-02-17'
  },
  {
    id: 'ROLE005',
    name: 'Guest',
    description: 'Basic user role for booking spots',
    users: 1234,
    permissions: [
      'book_spots',
      'view_own_bookings',
      'manage_own_profile'
    ],
    createdAt: '2024-01-15',
    lastUpdated: '2025-02-16'
  }
];

const AdminRoles = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    type: '',
    status: ''
  });

  const handleDelete = (roleId: string) => {
    toast.success('Role deleted successfully');
    setShowDeleteDialog(null);
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
          <h1 className="text-2xl font-bold text-gray-900">User Roles</h1>
          
          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search roles..."
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
              onClick={() => navigate('/admin/roles/new')}
              className="flex items-center px-4 py-2 bg-[#2DD4BF] text-white rounded-lg hover:bg-[#26b8a5]"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Role
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Total Roles</h3>
              <UserCog className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>2 new this month</span>
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Admin Users</h3>
              <Shield className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">8</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>1 new this month</span>
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Support Users</h3>
              <Users className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>2 new this month</span>
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-500">Host Users</h3>
              <Users className="h-5 w-5 text-[#2DD4BF]" />
            </div>
            <p className="text-2xl font-bold text-gray-900">156</p>
            <p className="mt-2 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>12 new this month</span>
            </p>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                >
                  <option value="">All Types</option>
                  <option value="admin">Admin</option>
                  <option value="support">Support</option>
                  <option value="host">Host</option>
                  <option value="guest">Guest</option>
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Roles Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockRoles.map((role) => (
                  <tr 
                    key={role.id}
                    onClick={() => navigate(`/admin/roles/${role.id}`)}
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center">
                          <UserCog className="h-5 w-5 text-[#2DD4BF]" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{role.name}</div>
                          <div className="text-sm text-gray-500">ID: {role.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{role.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {role.users} users
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.slice(0, 2).map((permission, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs font-medium bg-[#2DD4BF]/10 text-[#2DD4BF] rounded-full"
                          >
                            {permission.split('_').join(' ')}
                          </span>
                        ))}
                        {role.permissions.length > 2 && (
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                            +{role.permissions.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(role.lastUpdated).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/roles/${role.id}`);
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

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              Delete Role
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to delete this role? This action cannot be undone.
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
    </div>
  );
};

export default AdminRoles;