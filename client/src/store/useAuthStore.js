import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASEURL =
  import.meta.env.MODE === 'development' ? 'http://localhost:8080' : '/';

export const useAuthStore = create((set, get) => ({
  isLoading: false,
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data.user });
      get().connectSocket();
      return res.data;
    } catch (error) {
      console.error('Error checking auth:', error);
      toast.error(error.response?.data.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      set({ authUser: res.data });
      get().connectSocket();
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error('Error signing up:', error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', data);
      set({ authUser: res.data });
      console.log(res.data.user);
      get().connectSocket();
      return res.data;
    } catch (error) {
      console.error('Error logging in:', error.response?.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      get().disconnectSocket();
      toast.success('Logout successful!');
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  },

  forgotPassword: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post('/auth/forgot-password', data);
      toast.success(res.data.message);
    } catch (error) {
      console.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.patch(
        `/auth/reset-password/${token}`,
        password
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.error(error.response?.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put('/auth/update-profile', data);
      set({ authUser: res.data.user });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: async () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(BASEURL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket });
    socket.on('getOnlineUsers', (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: async () => {
    const { socket } = get();
    if (!socket?.connected) return;
    socket.disconnect();
  },
}));
