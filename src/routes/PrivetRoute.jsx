import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("auth");
    const auth = JSON.parse(user);
    if (!auth) {
      // redirect to login page
      navigate("/");
    }
    if (user) {
      dispatch(userLogin(auth));
      setStatus("success");
    }
  }, [dispatch, navigate]);

  if (status == "loading") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;
