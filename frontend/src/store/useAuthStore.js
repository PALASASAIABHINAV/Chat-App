import axios from "axios";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isLoading: false,

  checkAuth: async () => {
    try {
      const response = await axios.get("http://localhost:4002/api/auth/check", {
        withCredentials: true,
      });
      set({ authUser: response.data });
    } catch (error) {
      console.log("Error in checking Auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async ({ email, password }) => {
    set({ isLoading: true, isLoggingIn: true });
    try {
      const response = await axios.post(
        "http://localhost:4002/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      set({ authUser: response.data });
      return { success: true };
    } catch (error) {
      set({ authUser: null });
      console.log("Error while Login:", error);
      return { success: false, error: error?.response?.data || "Login failed" };
    } finally {
      set({ isLoading: false, isLoggingIn: false });
    }
  },

  register: async ({ username, email, password }) => {
    set({ isLoading: true, isSigningUp: true });
    try {
      const response = await axios.post(
        "http://localhost:4002/api/auth/register",
        { username, email, password },
        { withCredentials: true }
      );
      set({ authUser: response.data });
      return { success: true };
    } catch (error) {
      set({ authUser: null });
      console.log("Error while Register:", error);
      return { success: false, error: error?.response?.data || "Register failed" };
    } finally {
      set({ isLoading: false, isSigningUp: false });
    }
  },

  updateprofile:async({profilePicture})=>{
    try {
        set({isLoading:true,isUpdatingProfile:true});
        const response=await axios.put(
            "http://localhost:4002/api/auth/update-profile",{
                profilePicture
            },{
                withCredentials:true
            }
        );
        set({authUser:response.data,isUpdatingProfile:false});
        return {success:true};
    } catch (error) {
        set({ authUser: null });
      console.log("Error while Updating Profile:", error);
      return { success: false, error: error?.response?.data || "Update profile failed" };
    }finally{
      set({isUpdatingProfile:false})
    }

  }

}));
