import axiosInstance from "@/configs/axios";
import { toast } from "react-toastify";

export const whatsappData = () => {
    return async (dispatch) => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        // Make an actual API request to your backend
        const response = await axiosInstance.get('/whatsapp/get-data',{
            headers: {
              Authorization: `Bearer ${token}`, // Add token to the headers
            },
          }
        );
     
        dispatch({
          type: 'WHATSAPP',
          payload: response.data, // Assuming response contains the collection data
        });
  
        return true;
      } catch (error) {
        // toast.error(error.response?.data?.message || "Something went wrong");
        return false;
      }
    };
  };


export const updateWhatsAppSettings = (value) => {
    return async (dispatch) => {
      try {
        const token = localStorage.getItem('token');
         await axiosInstance.put('/whatsapp/update', value, {
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