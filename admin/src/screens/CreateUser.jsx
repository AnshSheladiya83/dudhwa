import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from '../components/Breadcrumbs';
import FormField from '../components/molecules/FormField';
import CustomButton from '../components/atoms/CustomButton';
import useToast from '../hooks/useToast';
import useNavigation from '../hooks/useNavigation';
import { CreateUser } from '../redux/api/usersApi';

const CreateUserScreen = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.central.token);
  const { showToast } = useToast();
  const { goToPage } = useNavigation();

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    isAdmin: false,
    isHotel: false,
    isActive: true,
  });

  const handleInputChange = (field) => (value) => {
    setFormValues({ ...formValues, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await CreateUser(token, formValues);
      if (response) {
        showToast('User created successfully!', 'success');
        goToPage('/users'); // redirect to users list
      }
    } catch (error) {
      showToast('Failed to create user: ' + error.message, 'error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-contentBg">
      {/* Header */}
      <div className="flex md:flex-row flex-col mt-6 ml-6 md:gap-[22px] gap-[15px]">
        <span className="font-urbanist font-semibold text-black text-[28px] leading-[33.6px]">
          Create User
        </span>
        <Breadcrumbs />
      </div>

      {/* Form Card */}
      <div className="mt-6 mx-6 rounded-2xl mb-10 bg-white h-full shadow-md p-6">
        <div className="grid gap-4 lg:grid-cols-2 sm:grid-cols-1">
          <FormField
            title="First Name"
            type="text"
            placeholder="Enter first name"
            required
            value={formValues.firstName}
            onChange={handleInputChange('firstName')}
          />
          <FormField
            title="Last Name"
            type="text"
            placeholder="Enter last name"
            required
            value={formValues.lastName}
            onChange={handleInputChange('lastName')}
          />
          <FormField
            title="Email"
            type="text"
            placeholder="Enter email"
            required
            value={formValues.email}
            onChange={handleInputChange('email')}
          />
          <FormField
            title="Phone"
            type="text"
            placeholder="Enter phone"
            required
            value={formValues.phone}
            onChange={handleInputChange('phone')}
          />
          <FormField
            title="Password"
            type="password"
            placeholder="Enter password"
            required
            value={formValues.password}
            onChange={handleInputChange('password')}
          />
          <FormField
            title="Role"
            type="text"
            placeholder="Enter role"
            required
            value={formValues.role}
            onChange={handleInputChange('role')}
          />
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formValues.isAdmin}
                onChange={(e) => handleInputChange('isAdmin')(e.target.checked)}
              />
              Is Admin
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formValues.isHotel}
                onChange={(e) => handleInputChange('isHotel')(e.target.checked)}
              />
              Is Hotel User
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formValues.isActive}
                onChange={(e) => handleInputChange('isActive')(e.target.checked)}
              />
              Active
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <CustomButton
            icon="https://cdn-icons-png.flaticon.com/128/3161/3161410.png"
            title="Create User"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateUserScreen;
