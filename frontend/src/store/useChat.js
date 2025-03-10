import { create } from "zustand";
import { Axios } from "../axios/Axios";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";

export const usechat = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getAllUser: async () => {
    set({ isuserLoading: true });
    try {
      const res = await Axios.get("messages/users");
      set({ users: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isuserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await Axios.get("messages/" + userId);
      set({ messages: res.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (data) => {
    const { selectedUser, messages } = get();
    try {
      const res = await Axios.post("messages/send/" + selectedUser._id, data);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log(error);
    }
  },

  getSocketMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuth.getState().socket;
    console.log(selectedUser);

    socket.on("newMessage", (newMessage) => {
      console.log(selectedUser, newMessage.senderId);

      if (newMessage.senderId !== selectedUser._id) return;
      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  disconnectSocketMessage: () => {
    const socket = useAuth.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: async (selectedUser) => {
    set({ selectedUser });
  },
}));
