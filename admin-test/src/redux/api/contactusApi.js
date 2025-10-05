import axiosInstance from "../../utils/axiosInstance";

// ✅ Create Contact Message (Public, no token required)
export const CreateContactMessage = async (contactData) => {
  try {
    const response = await axiosInstance.post(`/api/contactus`, contactData);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};


// ✅ Get All Contact Messages (Admin)
export const GetAllContacts = async (
  token,
  searchQuery = "",
  pageSize = 10,
  currentPage = 1,
  currentFilters = {},
  isSelectionList = false
) => {
  try {
    if (isSelectionList) pageSize = 1000;

    let url = `/api/contactus?pageSize=${pageSize}&pageNumber=${currentPage}`;

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

// ✅ Get Contact Message by ID (Admin)
export const GetContactById = async (token, contactId) => {
  try {
    const response = await axiosInstance.get(`/api/contactus/${contactId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};
