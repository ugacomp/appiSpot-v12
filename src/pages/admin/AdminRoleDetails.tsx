import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCog, Users, Shield, Pencil, XCircle, AlertCircle, Plus, Trash2, Save } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock role data
const mockRole = {
  id: 'ROLE003',
  name: 'Support',
  description: 'Customer support and issue resolution',
  users: [
    {
      id: 'USER001',
      name: 'John Smith',
      email: 'john.s@example.com',
      status: 'active',
      lastLogin: '2025-02-19T10:30:00'
    },
    {
      id: 'USER002',
      name: 'Sarah Wilson',
      email: 'sarah.w@example.com',
      status: 'active',
      lastLogin: '2025-02-18T15:45:00'
    }
  ],
  permissions: {
    users: {
      title: 'User Management',
      permissions: [
        { id: 'view_users', name: 'View Users', enabled: true },
        { id: 'create_users', name: 'Create Users', enabled: false },
        { id: 'edit_users', name: 'Edit Users', enabled: false },
        { id: 'delete_users', name: 'Delete Users', enabled: false }
      ]
    },
    roles: {
      title: 'Role Management',
      permissions: [
        { id: 'view_roles', name: 'View Roles', enabled: false },
        { id: 'create_roles', name: 'Create Roles', enabled: false },
        { id: 'edit_roles', name: 'Edit Roles', enabled: false },
        { id: 'delete_roles', name: 'Delete Roles', enabled: false }
      ]
    },
    spots: {
      title: 'Spot Management',
      permissions: [
        { id: 'view_spots', name: 'View Spots', enabled: true },
        { id: 'create_spots', name: 'Create Spots', enabled: false },
        { id: 'edit_spots', name: 'Edit Spots', enabled: false },
        { id: 'delete_spots', name: 'Delete Spots', enabled: false }
      ]
    },
    bookings: {
      title: 'Booking Management',
      permissions: [
        { id: 'view_bookings', name: 'View Bookings', enabled: true },
        { id: 'manage_bookings', name: 'Manage Bookings', enabled: true },
        { id: 'resolve_booking_issues', name: 'Resolve Booking Issues', enabled: true },
        { id: 'cancel_bookings', name: 'Cancel Bookings', enabled: true }
      ]
    },
    support: {
      title: 'Support Management',
      permissions: [
        { id: 'manage_tickets', name: 'Manage Support Tickets', enabled: true },
        { id: 'resolve_disputes', name: 'Resolve Disputes', enabled: true },
        { id: 'send_notifications', name: 'Send Notifications', enabled: true },
        { id: 'manage_refunds', name: 'Process Refunds', enabled: true }
      ]
    },
    payments: {
      title: 'Payment Management',
      permissions: [
        { id: 'view_payments', name: 'View Payments', enabled: true },
        { id: 'process_refunds', name: 'Process Refunds', enabled: true },
        { id: 'handle_disputes', name: 'Handle Payment Disputes', enabled: true }
      ]
    },
    settings: {
      title: 'System Settings',
      permissions: [
        { id: 'view_settings', name: 'View Settings', enabled: false },
        { id: 'edit_settings', name: 'Edit Settings', enabled: false }
      ]
    }
  },
  createdAt: '2024-01-15',
  lastUpdated: '2025-02-19'
};

const AdminRoleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRemoveUserDialog, setShowRemoveUserDialog] = useState<string | null>(null);
  const [roleData, setRoleData] = useState(mockRole);

  const handleSave = () => {
    toast.success('Role updated successfully');
    setIsEditing(false);
  };

  const handleDelete = () => {
    toast.success('Role deleted successfully');
    setShowDeleteDialog(false);
    navigate('/admin/roles');
  };

  const handleRemoveUser = (userId: string) => {
    toast.success('User removed from role');
    setShowRemoveUserDialog(null);
  };

  const handlePermissionToggle = (category: string, permissionId: string) => {
    if (!isEditing) return;

    setRoleData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [category]: {
          ...prev.permissions[category],
          permissions: prev.permissions[category].permissions.map(p =>
            p.id === permissionId ? { ...p, enabled: !p.enabled } : p
          )
        }
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/admin/roles')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Roles
        </button>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-lg bg-[#2DD4BF]/10 flex items-center justify-center">
                <UserCog className="h-6 w-6 text-[#2DD4BF]" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">{roleData.name}</h1>
                <p className="text-gray-500">Last updated {new Date(roleData.lastUpdated).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="mt-4 lg:mt-0 flex flex-wrap gap-3">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Pencil className="h-5 w-5 mr-2" />
                  Edit Role
                </button>
              )}
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <XCircle className="h-5 w-5 mr-2" />
                Delete Role
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Role Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Role Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role Name</label>
                  <input
                    type="text"
                    value={roleData.name}
                    onChange={(e) => isEditing && setRoleData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!isEditing}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2DD4BF] focus:ring-[#2DD4BF] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={roleData.description}
                    onChange={(e) => isEditing && setRoleData(prev => ({ ...prev, description: e.target.value }))}
                    disabled={!isEditing}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#2DD4BF] focus:ring-[#2DD4BF] disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h2>
              <div className="space-y-6">
                {Object.entries(roleData.permissions).map(([category, { title, permissions }]) => (
                  <div key={category} className="border-t border-gray-200 pt-4 first:border-0 first:pt-0">
                    <h3 className="text-base font-medium text-gray-900 mb-3">{title}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className={`flex items-center space-x-3 p-3 rounded-lg border ${
                            isEditing ? 'cursor-pointer hover:bg-gray-50' : ''
                          } ${
                            permission.enabled 
                              ? 'border-[#2DD4BF]/50 bg-[#2DD4BF]/5' 
                              : 'border-gray-200 bg-gray-50 opacity-50'
                          }`}
                          onClick={() => handlePermissionToggle(category, permission.id)}
                        >
                          <input
                            type="checkbox"
                            checked={permission.enabled}
                            onChange={() => {}}
                            disabled={!isEditing}
                            className={`h-4 w-4 rounded focus:ring-[#2DD4BF] ${
                              permission.enabled
                                ? 'text-[#2DD4BF] border-[#2DD4BF]'
                                : 'text-gray-300 border-gray-300'
                            }`}
                          />
                          <span className={`text-sm font-medium ${
                            permission.enabled ? 'text-gray-900' : 'text-gray-400'
                          }`}>
                            {permission.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Role Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Role Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <Users className="h-5 w-5 text-[#2DD4BF]" />
                    <span className="text-sm text-gray-500">Users</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-gray-900">{roleData.users.length}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <Shield className="h-5 w-5 text-[#2DD4BF]" />
                    <span className="text-sm text-gray-500">Permissions</span>
                  </div>
                  <p className="mt-2 text-2xl font-bold text-gray-900">
                    {Object.values(roleData.permissions).reduce((acc, curr) => acc + curr.permissions.filter(p => p.enabled).length, 0)}
                  </p>
                </div>
              </div>
            </div>

            {/* Users with Role */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Users with Role</h2>
                <button
                  onClick={() => navigate('/admin/users')}
                  className="text-[#2DD4BF] hover:text-[#26b8a5] text-sm font-medium"
                >
                  Add User
                </button>
              </div>
              <div className="space-y-4">
                {roleData.users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                        <span className="text-white font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => setShowRemoveUserDialog(user.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Role Dialog */}
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
              Are you sure you want to delete this role? This action cannot be undone and will affect {roleData.users.length} users.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove User Dialog */}
      {showRemoveUserDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              Remove User from Role
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to remove this user from the {roleData.name} role?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowRemoveUserDialog(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRemoveUser(showRemoveUserDialog)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Yes, remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRoleDetails;