import { Navigate, Outlet } from "react-router-dom";
import PublicNavbar from "../PublicNavbar";
import { useAuth } from "../Context/AuthContext";

const Public = () => {
  const auth = useAuth();

  if (auth) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  );
};

export default Public;
