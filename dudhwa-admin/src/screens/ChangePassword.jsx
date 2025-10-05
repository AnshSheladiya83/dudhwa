import React, { useState } from 'react';
    import Breadcrumbs from '../components/Breadcrumbs';
    import FormField from '../components/molecules/FormField';
    import CustomButton from '../components/atoms/CustomButton';
    import { ChangePasswordAPI } from '../redux/api/profileApi'; 
    import useToast from '../hooks/useToast';
    import useNavigation from '../hooks/useNavigation';
    import { useSelector } from 'react-redux';

    const ChangePassword = () => {
      const token = useSelector((state) => state.central.token);
      const { showToast } = useToast();
      const { goToPage } = useNavigation(); 

      const [formValues, setFormValues] = useState({
        oldPassword: '',
    newPassword: '',
    confirmPassword: ''
      });

      const handleInputChange = (field) => (value) => {
        setFormValues({ ...formValues, [field]: value });
      };

      const handleSubmit = async () => {
        try {
          const formData = { ...formValues };
          const response = await ChangePasswordAPI(token, formData);
          showToast('ChangePassword created successfully!', 'success');
          response && response.statusCode===200 && goToPage('/change-password');
        } catch (error) {
          showToast('Failed to create ChangePassword: ' + error.message, 'error');
        }
      };

      return (
        <div className="flex flex-col min-h-screen bg-contentBg">
        <div className="flex md:flex-row flex-col mt-6 ml-6 md:gap-[22px] gap-[15px]">
          <span className="font-urbanist font-semibold text-black text-[28px] leading-[33.6px]">
          Change Password
          </span>
          <Breadcrumbs />
        </div>
        <div className=" mt-6 mx-6 md:gap-[22px] gap-[15px]  rounded-2xl mb-10 bg-white h-full">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:rounded-[22px] rounded-2xl min-h-full">
          <div className="flex flex-col p-3 bg-white">
            <div className="grid gap-4 m-3 lg:grid-cols-2 sm:grid-cols-1">
              <FormField
                title="Old Password"
                type="text"
                placeholder="Enter your oldpassword"
                required
                value={formValues.oldPassword}
                onChange={handleInputChange('oldPassword')}
              />

              <FormField
                title="New Password"
                type="text"
                placeholder="Enter your newpassword"
                required
                value={formValues.newPassword}
                onChange={handleInputChange('newPassword')}
              />

              <FormField
                title="Confirm Password"
                type="text"
                placeholder="Enter your confirmpassword"
                required
                value={formValues.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
              />
                </div>
                <div className="m-3">
                  <CustomButton icon="https://cdn-icons-png.flaticon.com/128/3161/3161410.png" title="Save" onClick={handleSubmit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    export default ChangePassword;
    