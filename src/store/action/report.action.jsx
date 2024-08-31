import axiosInstance from "@/configs/axios";
import { toast } from "react-toastify";

export const reportSummary= () => {
    return async (dispatch) => {
      try {
        // Retrieve token from local storage
        const token = localStorage.getItem('token');
        // Make an actual API request to your backend
        const response = await axiosInstance.get('/report/get-reports',{
            headers: {
              Authorization: `Bearer ${token}`, // Add token to the headers
            },
          }
        );
     
        dispatch({
          type: 'REPORT_SUMMARY',
          payload: response.data, // Assuming response contains the collection data
        });
  
        return true;
      } catch (error) {
        // toast.error(error.response?.data?.message || "Something went wrong");
        return false;
      }
    };
  };