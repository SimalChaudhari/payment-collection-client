import axiosInstance from "@/configs/axios";
import { toast } from "react-toastify";

export const customer = () => {
    return async (dispatch) => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        // Make an actual API request to your backend
        const response = await axiosInstance.get('/user/get-user',{
            headers: {
              Authorization: `Bearer ${token}`, // Add token to the headers
            },
          }
        );
  
     
        dispatch({
          type: 'CUSTOMER_LIST',
          payload: response.data.customers, // Assuming response contains the collection data
        });
  
        return true;
      } catch (error) {
        // toast.error(error.response?.data?.message || "Something went wrong");
        return false;
      }
    };
  };

export const addCustomer = (newCustomer) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
         await axiosInstance.post('/user/create', newCustomer, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        return true;
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        return false;
      }
    };
  };

  export const editCustomer = (userId,newCustomer) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
         await axiosInstance.put(`/user/update/${userId}`, newCustomer, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        return true;
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        return false;
      }
    };
  };
  

  export const customerDelete = (userId) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
       await axiosInstance.delete(`/user/delete/${userId}`, {
          headers: {
         
            Authorization: `Bearer ${token}`,
          },
        })
      
        return true;
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        return false;
      }
    };
  };
  
  