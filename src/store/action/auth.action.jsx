import axiosInstance from "@/configs/axios";
import { toast } from "react-toastify";


export const register = (userData) => {
  return async (dispatch) => {
    try {
      // Make an actual API request to your backend
      await axiosInstance.post('/auth/register', userData);
      toast.success('Registration successful Please Login Here!');
      return true;
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong")
      return false;
    }
  };
};


export const login = (email, password) => {
  return async (dispatch) => {
    try {
      // Make an actual API request to your backend
      const response = await axiosInstance.post('/auth/login', { email, password });
      const { user, token } = response.data;
      localStorage.setItem('userData', JSON.stringify({user:user}));
      localStorage.setItem('token', token);
      dispatch({
        type: 'LOGIN',
        payload: { user, token },
      });
      return { success: true, user }; // Return user data including role
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong")
      return false;
    }
  };
};


  
export const logout = () => {
  return async (dispatch) => {
    try {
      // Clear local storage
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      dispatch({ type: "LOGOUT" });

      toast.success("Logged out successfully!");
      return true;
    } catch (error) {
      console.error("Error logging out:", error);
      return false;
    }
  };
};

export const resetPassword = (data) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
        await axiosInstance.post(`/auth/reset-password`,data,{
           headers: {
             Authorization: `Bearer ${token}`,
           },
         })
         return true
      } catch (error) {
        toast.error(error.response.data.message || "Something went wrong")
        return false;
      }
    };
  };


  export const forgotPasswordAPI = (data) => {

    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
        await axiosInstance.post(`/auth/forget-password`,data,{
           headers: {
             Authorization: `Bearer ${token}`,
           },
         })
         return true
      } catch (error) {
        console.log("🚀 ~ return ~ error:", error.response)
        toast.error(error.response.data.message)
        return false;
      }
    };
  };

  export const changePasswordAPI = (data) => {

    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
        await axiosInstance.post(`/auth/new-password`,data,{
           headers: {
             Authorization: `Bearer ${token}`,
           },
         })
         return true
      } catch (error) {
        toast.error(error.response.data.message)
        return false;
      }
    };
  };

