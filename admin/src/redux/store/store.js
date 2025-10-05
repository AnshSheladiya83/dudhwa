// store.js
    import { configureStore } from '@reduxjs/toolkit';
    import userProfileReducer from '../slices/profileSlice';
    import centralReducer from '../slices/centralSlice';
    
    export default configureStore({
      reducer: {
        profile: userProfileReducer,
        central: centralReducer,
      },
    });
    