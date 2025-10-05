// useLogout.js
    import { useState } from 'react';
    import { Navigate } from 'react-router-dom';
    
    const useLogout = () => {
      const [redirectTo, setRedirectTo] = useState(null);
    
      const handleLogout = () => {
        // Remove token and user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Redirect user to login page
        setRedirectTo('/login');
      };
    
      return { handleLogout, redirectTo };
    };
    
    export default useLogout;
    