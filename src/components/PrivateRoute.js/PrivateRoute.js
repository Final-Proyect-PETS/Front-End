import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const tokenn = localStorage.getItem("token");

  let auth = { token: tokenn ? true : false };
  
  const pattern = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/gi.test(tokenn)

  console.log(pattern)

  return auth.token && pattern ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
