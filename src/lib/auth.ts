import api from './api';
import toast from 'react-hot-toast';

interface LoginCredentials {
  email: string;
  password: string;
}

const login = async ({ email, password }: LoginCredentials) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    
    if (!token || !user) {
      throw new Error('Invalid response from server');
    }
    
    localStorage.setItem('token', token);
    return response.data;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Login failed';
    toast.error(message);
    throw error;
  }
};