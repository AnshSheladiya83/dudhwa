import axiosInstance from "../../utils/axiosInstance";

// ✅ Get All Users
export const GetAllUsers = async (
  token,
  searchQuery = "",
  pageSize = 10,
  currentPage = 1,
  currentFilters = {},
  isSelectionList
) => {
  try {
    if (isSelectionList) {
      pageSize = 1000;
    }

    let url = `/api/users?pageSize=${pageSize}&pageNumber=${currentPage}`;

    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }

    Object.keys(currentFilters).forEach((key) => {
      if (currentFilters[key]) {
        url += `&${key}=${encodeURIComponent(currentFilters[key])}`;
      }
    });

    const response = await axiosInstance.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Get User by ID
export const GetUserById = async (token, userId) => {
  try {
    const response = await axiosInstance.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Create User
export const CreateUser = async (token, userData) => {
  try {
    const response = await axiosInstance.post(`/api/users`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Update User
export const UpdateUser = async (token, userId, updateData) => {
  try {
    const response = await axiosInstance.put(`/api/users/${userId}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Delete User
export const DeleteUser = async (token, userId) => {
  try {
    const response = await axiosInstance.delete(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    throw error;
  }
};
