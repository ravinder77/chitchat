import toast from 'react-hot-toast';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { useAuthStore } from './useAuthStore.js';

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isTyping: false,
  isUsersLoading: false,
  isMessagesLoading: true,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get('/messages/users');
      set({ users: res.data });
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
      console.log(res.data);
    } catch (error) {
      toast.error(error.response?.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    try {
      const res = await axiosInstance.post(
        `/messages/send-message/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data.message);
    }
  },

  subscribeToMessages: async () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on('newMessage', (newMessage) => {
      const messageFromSelectedUser = newMessage.senderId === selectedUser._id;
      if(!messageFromSelectedUser) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: async () => {
    const socket = useAuthStore.getState().socket;
    socket.off('newMessage');
  },

  setSelectedUser: async (selectedUser) => {
    set({ selectedUser });
    console.log(selectedUser);
  },
}));
