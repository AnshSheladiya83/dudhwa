import axiosInstance from "../../utils/axiosInstance";

// ✅ Add new off dates
export const AddOffDates = async (token, offDates) => {
  try {
    const response = await axiosInstance.post(
      `/api/config/off-dates`,
      { dates: offDates },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Get all configs
export const GetAllConfigs = async (token) => {
  try {
    const response = await axiosInstance.get(`/api/config`, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    });
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Get all off dates
export const GetAllOffDates = async () => {
  try {
    const response = await axiosInstance.get(`/api/config/off-dates`);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};
