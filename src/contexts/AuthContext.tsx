import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../lib/database.types';

interface AuthContextType {
  user: User | null;
  profile: any;
  loading: boolean;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: false,
  login: async () => {},
  logout: () => {},
});

// Mock user data
const mockUsers = {
  host: {
    id: 'host-123',
    email: 'host@example.com',
    fullName: 'Demo Host',
    role: 'host',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  guest: {
    id: 'guest-123',
    email: 'guest@example.com',
    fullName: 'Demo Guest',
    role: 'guest',
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const { user, profile } = JSON.parse(storedAuth);
      setUser(user);
      setProfile(profile);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string) => {
    // Mock login logic
    const mockUser = role === 'host' ? mockUsers.host : mockUsers.guest;
    
    // Store auth data
    const authData = {
      user: mockUser,
      profile: mockUser
    };
    localStorage.setItem('auth', JSON.stringify(authData));
    
    setUser(mockUser);
    setProfile(mockUser);
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};