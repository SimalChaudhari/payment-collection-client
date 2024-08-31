import axiosInstance from "@/configs/axios";
import { toast } from "react-toastify";

export const collection = () => {
    return async (dispatch) => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        // Make an actual API request to your backend
        const response = await axiosInstance.get('/collected-data/get-data',{
            headers: {
              Authorization: `Bearer ${token}`, // Add token to the headers
            },
          }
        );
     
        dispatch({
          type: 'COLLECTION_LIST',
          payload: response.data, // Assuming response contains the collection data
        });
  
        return true;
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
        return false;
      }
    };
  };

export const addCollection = (newCollection) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
         await axiosInstance.post('/collected-data/data', newCollection, {
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

  export const editCollection = (userId,newCollection) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
         await axiosInstance.put(`/collected-data/update/${userId}`, newCollection, {
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
  

  export const collectionDelete = (userId) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
        await axiosInstance.delete(`/collected-data/delete/${userId}`, {
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


  
  