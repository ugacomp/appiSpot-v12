import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showProfileMenu && !(event.target as Element).closest('.profile-menu')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-3xl font-bold">
                <span className="text-[#2DD4BF]">appi</span>
                <span className="text-black">Sp</span>
                <span className="text-[#2DD4BF]">ot</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/explore"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/explore') ? 'text-[#2DD4BF]' : 'text-gray-700 hover:text-[#2DD4BF]'
              }`}
            >
              Explore Spots
            </Link>

            <Link
              to="/list-spot"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/list-spot') ? 'text-[#2DD4BF]' : 'text-gray-700 hover:text-[#2DD4BF]'
              }`}
            >
              List Your Spot
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/about') ? 'text-[#2DD4BF]' : 'text-gray-700 hover:text-[#2DD4BF]'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/contact') ? 'text-[#2DD4BF]' : 'text-gray-700 hover:text-[#2DD4BF]'
              }`}
            >
              Contact
            </Link>

            {user ? (
              <div className="relative profile-menu">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#2DD4BF] hover:bg-gray-50"
                >
                  <div className="h-8 w-8 rounded-full bg-[#2DD4BF] flex items-center justify-center">
                    <span className="text-white font-medium">
                      {user.email.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/guest/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </Link>
                    <Link
                      to="/guest/profile/edit"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-[#2DD4BF] hover:bg-[#26b8a5]"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#2DD4BF] focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/explore"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/explore') ? 'text-[#2DD4BF] bg-gray-50' : 'text-gray-700 hover:text-[#2DD4BF] hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Explore Spots
            </Link>

            <Link
              to="/list-spot"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/list-spot') ? 'text-[#2DD4BF] bg-gray-50' : 'text-gray-700 hover:text-[#2DD4BF] hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              List Your Spot
            </Link>

            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/about') ? 'text-[#2DD4BF] bg-gray-50' : 'text-gray-700 hover:text-[#2DD4BF] hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>

            <Link
              to="/contact"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive('/contact') ? 'text-[#2DD4BF] bg-gray-50' : 'text-gray-700 hover:text-[#2DD4BF] hover:bg-gray-50'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            {user ? (
              <>
                <Link
                  to="/guest/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#2DD4BF] hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/guest/profile/edit"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#2DD4BF] hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#2DD4BF] hover:bg-[#26b8a5]"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;