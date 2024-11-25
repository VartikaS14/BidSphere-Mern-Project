import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../redux/services/authFeatures";

export const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn;
    const redirectLoggedOutUser = async () => {
      try {
        isLoggedIn = await authService.getLogInStatus(); // replace this with actual logic to check login status
        // Example: isLoggedIn = checkUserLoginStatus();

        if (!isLoggedIn) {
          navigate(path);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    redirectLoggedOutUser();
  }, [path, navigate]);
};
