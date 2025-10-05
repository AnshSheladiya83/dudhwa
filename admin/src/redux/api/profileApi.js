// profileApi.js
    import axiosInstance from "../../utils/axiosInstance";
    
    export const GetProfile = async (token) => {
      try {
        const response = await axiosInstance.get('/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response?.data?.data;
      } catch (error) {
        throw error;
      }
    };
    export const UpdateProfile = async (token, profileData) => {
      try {
        const response = await axiosInstance.put('/api/auth/profile', profileData, {
          headers: {
            Authorization:`Bearer ${token}`,
          },
        });
        return response?.data;
      } catch (error) {
        throw error;
      }
    };
    
    export const ChangePasswordAPI = async (token, passwordData) => {
      try {
        const response = await axiosInstance.post('/api/auth/change-password', passwordData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response?.data;
      } catch (error) {
        throw error;
      }
    };
    