import axiosInstance from "@/configs/axios";
import { toast } from "react-toastify";

export const salesman = () => {
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
          type: 'SALESMAN_LIST',
          payload: response.data.salesman, // Assuming response contains the collection data
        });
  
        return true;
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        return false;
      }
    };
  };

export const addSalesman = (newSalesman) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
         await axiosInstance.post('/user/create', newSalesman, {
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

  export const editSalesman = (userId,newSalesman) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
         await axiosInstance.put(`/user/update/${userId}`, newSalesman, {
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
  

  export const salesmanDelete = (userId) => {
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
  
  