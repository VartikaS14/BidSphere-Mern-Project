import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/features/authSlice";

// Component to show children only if the user is logged in
export const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return <>{children}</>;
  }

  return null;
};

// Component to show children only if the user is logged out
export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return <>{children}</>;
  }

  return null;
};
