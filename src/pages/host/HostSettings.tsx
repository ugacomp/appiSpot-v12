import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Lock, CreditCard, Bell, Shield, AlertCircle, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

// Mock user data
const mockUser = {
  firstName: 'Sarah',
  lastName: 'Wilson',
  email: 'sarah.w@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  paymentMethods: [
    {
      id: 'pm_1',
      brand: 'visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2025,
      isDefault: true
    },
    {
      id: 'pm_2',
      brand: 'mastercard',
      last4: '5555',
      expMonth: 8,
      expYear: 2024,
      isDefault: false
    }
  ],
  notifications: {
    email: {
      bookings: true,
      messages: true,
      reminders: true,
      marketing: false
    },
    push: {
      bookings: true,
      messages: true,
      reminders: false,
      marketing: false
    }
  }
};

const HostSettings = () => {
  const [formData, setFormData] = useState({
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    email: mockUser.email,
    phone: mockUser.phone,
    location: mockUser.location,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState(mockUser.notifications);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showDeleteCard, setShowDeleteCard] = useState<string | null>(null);

  const [newCard, setNewCard] = useState({
    number: '',
    expMonth: '',
    expYear: '',
    cvc: '',
    name: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (channel: 'email' | 'push', type: string) => {
    setNotifications(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [type]: !prev[channel][type]
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings updated successfully');
  };

  const handleDeleteAccount = () => {
    toast.success('Account deleted successfully');
    // Redirect to login page
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Card added successfully');
    setShowAddCard(false);
    setNewCard({
      number: '',
      expMonth: '',
      expYear: '',
      cvc: '',
      name: ''
    });
  };

  const handleDeleteCard = (cardId: string) => {
    toast.success('Card removed successfully');
    setShowDeleteCard(null);
  };

  const handleSetDefaultCard = (cardId: string) => {
    toast.success('Default payment method updated');
  };

  const getCardIcon = (brand: string) => {
    return <CreditCard className="h-5 w-5 text-gray-400" />;
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#2DD4BF] text-white rounded-lg hover:bg-[#26b8a5] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Password Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Change Password</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-[#2DD4BF] text-white rounded-lg hover:bg-[#26b8a5] transition-colors"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
            <button
              onClick={() => setShowAddCard(true)}
              className="flex items-center text-[#2DD4BF] hover:text-[#26b8a5] text-sm font-medium"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add New Card
            </button>
          </div>
          
          <div className="space-y-4">
            {mockUser.paymentMethods.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  {getCardIcon(card.brand)}
                  <div>
                    <p className="font-medium text-gray-900">
                      {card.brand.charAt(0).toUpperCase() + card.brand.slice(1)} •••• {card.last4}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires {card.expMonth.toString().padStart(2, '0')}/{card.expYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {!card.isDefault && (
                    <button
                      onClick={() => handleSetDefaultCard(card.id)}
                      className="text-sm text-[#2DD4BF] hover:text-[#26b8a5]"
                    >
                      Set as default
                    </button>
                  )}
                  {card.isDefault && (
                    <span className="text-sm text-green-600 font-medium">
                      Default
                    </span>
                  )}
                  <button
                    onClick={() => setShowDeleteCard(card.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Email Notifications</h3>
              <div className="space-y-4">
                {Object.entries(notifications.email).map(([key, enabled]) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={() => handleNotificationChange('email', key)}
                      className="h-4 w-4 text-[#2DD4BF] focus:ring-[#2DD4BF] border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700 capitalize">
                      {key.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Push Notifications</h3>
              <div className="space-y-4">
                {Object.entries(notifications.push).map(([key, enabled]) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={enabled}
                      onChange={() => handleNotificationChange('push', key)}
                      className="h-4 w-4 text-[#2DD4BF] focus:ring-[#2DD4BF] border-gray-300 rounded"
                    />
                    <span className="ml-3 text-sm text-gray-700 capitalize">
                      {key.replace('_', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Danger Zone</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-red-800">Delete Account</h3>
                <p className="mt-1 text-sm text-red-600">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
              </div>
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add Payment Method</h3>
            <form onSubmit={handleAddCard} className="space-y-4">
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                  Name on Card
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="name"
                  value={newCard.name}
                  onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                  required
                />
              </div>

              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="number"
                  value={newCard.number}
                  onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                  required
                  maxLength={16}
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label htmlFor="expMonth" className="block text-sm font-medium text-gray-700">
                    Month
                  </label>
                  <select
                    id="expMonth"
                    name="expMonth"
                    value={newCard.expMonth}
                    onChange={(e) => setNewCard({ ...newCard, expMonth: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                    required
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                      <option key={month} value={month.toString().padStart(2, '0')}>
                        {month.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1">
                  <label htmlFor="expYear" className="block text-sm font-medium text-gray-700">
                    Year
                  </label>
                  <select
                    id="expYear"
                    name="expYear"
                    value={newCard.expYear}
                    onChange={(e) => setNewCard({ ...newCard, expYear: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                    required
                  >
                    <option value="">YY</option>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1">
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    name="cvc"
                    value={newCard.cvc}
                    onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#2DD4BF] focus:border-[#2DD4BF]"
                    required
                    maxLength={4}
                    placeholder="123"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddCard(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#2DD4BF] hover:bg-[#26b8a5] rounded-md"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Card Confirmation */}
      {showDeleteCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              Remove Payment Method
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to remove this payment method?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteCard(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteCard(showDeleteCard)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center mb-2">
              Delete Account
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
              >
                Yes, delete my account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostSettings;