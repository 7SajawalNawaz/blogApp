import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stringifylogindata = window.localStorage.getItem("loginData");

    if (stringifylogindata) {
      const LoginData = JSON.parse(stringifylogindata);
      const user = LoginData.user;
      setAuth(user);
    } else {
      setAuth(null);
    }
  }, [navigate, location]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  return auth;
};
