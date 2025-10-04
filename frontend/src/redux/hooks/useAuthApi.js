import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  authLogin,
  authRegister,
  authChangePassword,
  authGetProfile,
  authUpdateProfile
} from "../services/auth/authServices";

export const useAuthApi = (token) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const handleauthLogin = (args) => dispatch(authLogin(args));
  const handleauthRegister = (args) => dispatch(authRegister(args));
  const handleauthChangePassword = (args) => dispatch(authChangePassword(args));
  const handleauthGetProfile = (args) => dispatch(authGetProfile(args));
  const handleauthUpdateProfile = (args) => dispatch(authUpdateProfile(args));

  return {
    ...authState,
    handleauthLogin,
    handleauthRegister,
    handleauthChangePassword,
    handleauthGetProfile,
    handleauthUpdateProfile,
  };
};
