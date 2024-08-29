import axiosInstance from "@/configs/axios";
import { toast } from "react-toastify";


export const totalData = () => {
    return async (dispatch) => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        // Make an actual API request to your backend
        const response = await axiosInstance.get('/user/total',{
            headers: {
              Authorization: `Bearer ${token}`, // Add token to the headers
            },
          }
        );
    
        dispatch({
          type: 'TOTAL_COUNT',
          payload: response.data, // Assuming response contains the collection data
        });
  
        return true;
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        return false;
      }
    };
  };

  
  export const collectionCount = () => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
       const response = await axiosInstance.get(`/collected-data/get-count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        dispatch({
          type: 'COLLECTION_COUNT',
          payload: response.data, // Assuming response contains the collection data
        });
  
        return true;
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong123");
        return false;
      }
    };
  };

  export const customerVerifyCount = () => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
       const response = await axiosInstance.get(`/user/customer-verified-count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        dispatch({
          type: 'VERIFY_COUNT',
          payload: response.data, // Assuming response contains the collection data
        });
  
        return true;
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong123");
        return false;
      }
    };
  };