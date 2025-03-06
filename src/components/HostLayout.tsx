import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Home, Calendar, Building2, DollarSign, Ban, MessageSquare, Settings, Menu, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface HostLayoutProps {
  children: React.ReactNode;
}

// Mock messages data
const messages = [
  {
    id: 1,
    sender: 'John Smith',
    role: 'guest',
    content: 'Question about my booking #BK001',
    time: '5 min ago',
    unread: true
  },
  {
    id: 2,
    sender: 'Sarah Johnson',
    role: 'host',
    content: 'Need help with refund request',
    time: '1 hour ago',
    unread: true
  },
  {
    id: 3,
    sender: 'Michael Brown',
    role: 'guest',
    content: 'Thanks for the quick response!',
    time: '2 hours ago',
    unread: false
  }
];

const menuItems = [
  { 
    title: 'Overview', 
    icon: Home, 
    path: '/host',
    description: 'Dashboard overview'
  },
  { 
    title: 'Bookings', 
    icon: Calendar, 
    path: '/host/bookings',
    description: 'Manage bookings'
  },
  { 
    title: 'Spots', 
    icon: Building2, 
    path: '/host/spots',
    description: 'Manage spots'
  },
  { 
    title: 'Revenue', 
    icon: DollarSign, 
    path: '/host/revenue',
    description: 'Track earnings'
  },
  { 
    title: 'Cancellations', 
    icon: Ban, 
    path: '/host/cancellations',
    description: 'Manage cancellations'
  },
  { 
    title: 'Message Center', 
    icon: MessageSquare, 
    path: '/host/messages',
    description: 'Manage communications'
  },
  { 
    title: 'Settings', 
    icon: Settings, 
    path: '/host/settings',
    description: 'Account settings'
  }
];

const HostLayout: React.FC<HostLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMessageCenter, setShowMessageCenter] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const unreadCount = messages.filter(msg => msg.unread).length;

  const getRoleBadgeColor = (role: string) => {
    return role === 'host' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-xl font-semibold text-gray-900">Host Dashboard</span>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowMessageCenter(!showMessageCenter)}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <MessageSquare className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-[57px] left-0 w-64 h-[calc(100vh-57px)] bg-white transform transition-transform duration-300 ease-in-out z-50 lg:hidden overflow-y-auto ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <nav className="flex-1 px-4 py-4">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-[#2DD4BF] text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <div className="flex-1 text-left">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs opacity-80">{item.description}</div>
                </div>
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-screen overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-gray-900">Host</span>
            <button
              onClick={() => setShowMessageCenter(!showMessageCenter)}
              className="relative p-2 text-gray-600 hover:text-gray-900"
            >
              <MessageSquare className="h-6 w-6" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6">
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center space-x-3 px-4 py-3 mb-2 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-[#2DD4BF] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <div className="flex-1 text-left">
                <div className="font-medium">{item.title}</div>
                <div className="text-xs opacity-80">{item.description}</div>
              </div>
            </button>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Message Center */}
      {showMessageCenter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setShowMessageCenter(false);
                    navigate('/host/messages');
                  }}
                  className="text-sm text-[#2DD4BF] hover:text-[#26b8a5]"
                >
                  View All
                </button>
                <button
                  onClick={() => setShowMessageCenter(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg ${
                    message.unread ? 'bg-[#2DD4BF]/5' : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                        <span className="text-white font-medium">
                          {message.sender.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-gray-900">{message.sender}</h3>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getRoleBadgeColor(message.role)}`}>
                            {message.role.charAt(0).toUpperCase() + message.role.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{message.time}</p>
                      </div>
                    </div>
                    {message.unread && (
                      <span className="h-2 w-2 bg-[#2DD4BF] rounded-full"></span>
                    )}
                  </div>
                  <p className="mt-2 text-gray-600">{message.content}</p>
                  <div className="mt-3 flex justify-end space-x-2">
                    <button className="px-3 py-1 text-sm text-[#2DD4BF] hover:bg-[#2DD4BF]/10 rounded">
                      Reply
                    </button>
                    <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                      Mark as Read
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        <div className="min-h-screen pt-[57px] lg:pt-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HostLayout;