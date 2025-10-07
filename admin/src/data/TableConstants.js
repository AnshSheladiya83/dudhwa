

export const bookingTableHeadCols = [
  "safari_zone",
  "safari_date",
  "time_slot",
  "adults",
  "children",
  "totalPayable",
  "payment_status",
  "Action"
];

// Mapping for display titles
export const bookingDataTitles = {
  safari_zone: "Safari Zone",
  safari_date: "Safari Date",
  time_slot: "Time Slot",
  adults: "Adults",
  children: "Children",
  totalPayable: "Total Payable (INR)",
  payment_status: "Payment Status",
  Action: "Action"
};

export const contactTableHeadCols = [
  "firstName",
  "lastName",
  "email",
  "contactNo",       // backend field instead of "phone"
  "country",
  "dateOfArrival",
  "numberOfPersons", // backend field instead of "noOfPersons"
  "Action"
];

// Mapping for display titles
export const contactDataTitles = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  contactNo: "Phone",         // display as Phone
  country: "Country",
  dateOfArrival: "Date of Arrival",
  numberOfPersons: "No of Persons", // display as No of Persons
  Action: "Action"
};

export const userTableHeadCols = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "user_type",
];

// Mapping for display titles
export const userDataTitles = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  phone: "Phone Number",
  user_type: "User Type",
};
export const offDatesTableHeadCols = [
  "index",
  "date",
];

export const offDatesDataTitles = {
  index: "#",
  date: "Off-Date",
};