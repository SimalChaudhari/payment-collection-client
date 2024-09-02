import axiosInstance from "@/configs/axios";
import { toast } from "react-toastify";

export const notification = (id) => {
  return async (dispatch) => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem('token');
      // Make an actual API request to your backend
      const response = await axiosInstance.get(`/user/notification/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the headers
        },
      }
      );

      dispatch({
        type: 'NOTIFICATION',
        payload: response.data, // Assuming response contains the collection data
      });

      return true;
    } catch (error) {
      // toast.error(error.response?.data?.message || "Something went wrong");
      return false;
    }
  };
};


export const notificationUpdate = (id) => {
  return async (dispatch) => {
    try {
      // Retrieve token from local storage
      const token = localStorage.getItem('token');

      await axiosInstance.put(
        `/user/seen/${id}`,
        null, // No data in the body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the headers
          },
        }
      );

      return true;
    } catch (error) {
      // toast.error(error.response?.data?.message || "Something went wrong");
      return false;
    }
  };
};
