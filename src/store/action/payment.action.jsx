import axiosInstance from "@/configs/axios";
import { toast } from "react-toastify";

export const paymentHistory = () => {
    return async (dispatch) => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        // Make an actual API request to your backend
        const response = await axiosInstance.get('/user/payment-history',{
            headers: {
              Authorization: `Bearer ${token}`, // Add token to the headers
            },
          }
        );
     
        dispatch({
          type: 'PAYMENT_HISTORY',
          payload: response.data, // Assuming response contains the collection data
        });
  
        return true;
      } catch (error) {
        // toast.error(error.response?.data?.message || "Something went wrong");
        return false;
      }
    };
  };


  export const paymentVerified = () => {
    return async (dispatch) => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        // Make an actual API request to your backend
        const response = await axiosInstance.get('/user/payment-verified',{
            headers: {
              Authorization: `Bearer ${token}`, // Add token to the headers
            },
          }
        );
     
        dispatch({
          type: 'PAYMENT_VERIFIED',
          payload: response.data, // Assuming response contains the collection data
        });
  
        return true;
      } catch (error) {
        // toast.error(error.response?.data?.message || "Something went wrong");
        return false;
      }
    };
  };

  export const paymentVerification = (id,status) => {
    return async (dispatch) => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        // Make an actual API request to your backend
        await axiosInstance.put(`/user/verify/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the headers
        }    });

  
        return true;
      } catch (error) {
        // toast.error(error.response?.data?.message || "Something went wrong");
        return false;
      }
    };
  };