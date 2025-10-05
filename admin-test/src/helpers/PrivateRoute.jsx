import React, { useEffect, useState } from 'react';
    import { Navigate } from 'react-router-dom';
    import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch hooks
    import { checkTokenExpiration } from '../utils/checkTokenExpiration';
    import { setUserProfile } from '../redux/slices/profileSlice';
    import { setToken } from "../redux/slices/centralSlice";
    
    const PrivateRoute = ({ roles, children }) => {
      const [isLoading, setIsLoading] = useState(true); // State to track loading state
      const userRole = useSelector(state => state?.profile?.role);
    console.log("Im here")
      const dispatch = useDispatch(); 
      useEffect(() => {
        const fetchData = async () => {
          const token = await localStorage.getItem('token');
          dispatch(setToken(token));
          if (!token || (await checkTokenExpiration(token))) {
            setIsLoading(false);
          } else {
            setIsLoading(false); 
            if (!userRole) {
              const localStorageUser = JSON.parse(localStorage.getItem('user'));
              if (localStorageUser) {
                dispatch(setUserProfile(localStorageUser));
              }
            }
          }
        };
    
        fetchData();
      }, [dispatch, userRole]);
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (!userRole || !roles.includes(userRole)) {
        return <Navigate to="/login" replace />;
      }
    
      return <>{children}</>;
    };
    
    export default PrivateRoute;
    