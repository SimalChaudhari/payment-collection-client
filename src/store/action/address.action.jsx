import axiosInstance from "@/configs/axios";
import { toast } from "react-toastify";

export const fetchAddress = () => {
    return async (dispatch) => {
        try {
            // Retrieve token from local storage
            const token = localStorage.getItem('token');
            // Make an actual API request to your backend
            const response = await axiosInstance.get('/user/get-address', {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token to the headers
                },
            }
            );

            dispatch({
                type: 'ADDRESS_LIST',
                payload: response.data, // Assuming response contains the address data
            });

            return true;
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            return false;
        }
    };
};

export const addAddress = (newAddress) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            await axiosInstance.post('/user/create-address', newAddress, {
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

export const updateAddress = (id, newAddress) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            await axiosInstance.put(`/user/update-address/${id}`, newAddress, {
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


export const addressDelete = (id) => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            await axiosInstance.delete(`/user/delete-address/${id}`, {
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



