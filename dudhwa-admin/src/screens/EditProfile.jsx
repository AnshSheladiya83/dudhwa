import React, { useState, useEffect } from 'react';
   import { useDispatch, useSelector } from 'react-redux';
   import Breadcrumbs from '../components/Breadcrumbs';
   import FormField from '../components/molecules/FormField';
   import CustomButton from '../components/atoms/CustomButton';
   import { UpdateProfile, GetProfile } from '../redux/api/profileApi';
   import useToast from '../hooks/useToast';
   import useNavigation from '../hooks/useNavigation';
   import { setUserProfile } from '../redux/slices/profileSlice';
   
   const EditProfile = () => {
     const dispatch = useDispatch();
     const token = useSelector((state) => state.central.token);
     const { showToast } = useToast();
     const { goToPage } = useNavigation();
   
     const [formValues, setFormValues] = useState({
       fullName: '',
       email: '',
       phone: ''
     });
   
     // Fetch profile data when the component mounts
     useEffect(() => {
       const fetchProfileData = async () => {
         try {
           const profileData = await GetProfile(token);
           console.log("profileData---",profileData)
           setFormValues({
             fullName: profileData.fullName,
             email: profileData.email,
             phone: profileData.phone
           });
         } catch (error) {
           showToast('Failed to fetch profile data: ' + error.message, 'error');
         }
       };
   
       fetchProfileData();
     }, [token]);
   
     const handleInputChange = (field) => (value) => {
       setFormValues({ ...formValues, [field]: value });
     };
   
   
     const handleSubmit = async () => {
       try {
         const response = await UpdateProfile(token, formValues);
         if (response && response.statusCode === 200) {
           dispatch(setUserProfile(response.data));
           showToast('Profile updated successfully!', 'success');
           goToPage('/edit-profile');
         }
       } catch (error) {
         showToast('Failed to update profile: ' + error.message, 'error');
       }
     };
    
     return (
       <div className="flex flex-col min-h-screen bg-contentBg">
       <div className="flex md:flex-row flex-col mt-6 ml-6 md:gap-[22px] gap-[15px]">
         <span className="font-urbanist font-semibold text-black text-[28px] leading-[33.6px]">
         Edit Profile
         </span>
         <Breadcrumbs />
       </div>
       <div className=" mt-6 mx-6 md:gap-[22px] gap-[15px]  rounded-2xl mb-10 bg-white h-full">
       <div className="relative overflow-x-auto shadow-md sm:rounded-lg md:rounded-[22px] rounded-2xl min-h-full">
         <div className="flex flex-col p-3 bg-white">
           <div className="grid gap-4 m-3 lg:grid-cols-2 sm:grid-cols-1">
                 <FormField
                   title="Name"
                   type="text"
                   placeholder="Enter your name"
                   required
                   value={formValues.fullName}
                   onChange={handleInputChange('fullName')}
                 />
   
                 <FormField
                   title="Email"
                   type="text"
                   placeholder="Enter your email"
                   required
                   value={formValues.email}
                   onChange={handleInputChange('email')}
                   disableInput={true}
                 />
   
                 <FormField
                   title="Phone"
                   type="number"
                   placeholder="Enter your phone"
                   required
                   value={formValues.phone}
                   onChange={handleInputChange('phone')}
                 />
               </div>
               <div className="m-3">
                 <CustomButton
                   icon="https://cdn-icons-png.flaticon.com/128/3161/3161410.png"
                   title="Save"
                   onClick={handleSubmit}
                 />
               </div>
             </div>
           </div>
         </div>
       </div>
     );
   };
   
   export default EditProfile;
   