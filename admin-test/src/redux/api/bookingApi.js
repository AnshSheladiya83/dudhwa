import axiosInstance from "../../utils/axiosInstance";

// ✅ Get All Bookings
export const GetAllBookings = async (
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

    let url = `/api/bookings?pageSize=${pageSize}&pageNumber=${currentPage}`;

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

// ✅ Get Booking by ID
export const GetBookingById = async (token, bookingId) => {
  try {
    const response = await axiosInstance.get(`/api/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Create Booking
export const CreateBooking = async (token, bookingData) => {
  try {
    const response = await axiosInstance.post(`/api/bookings`, bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};
