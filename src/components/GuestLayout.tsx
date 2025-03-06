import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface GuestLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    title: 'Profile Overview',
    path: '/guest/profile'
  },
  {
    title: 'My Bookings',
    path: '/guest/bookings'
  },
  {
    title: 'Cancellations',
    path: '/guest/cancellations'
  },
  {
    title: 'My Wishlist',
    path: '/guest/wishlist'
  }
];

const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Vertical Menu */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      location.pathname === item.path
                        ? 'bg-[#2DD4BF] text-white'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestLayout;