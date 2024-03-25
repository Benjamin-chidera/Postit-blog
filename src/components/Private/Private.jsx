import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Private = () => {
  const user = Cookies.get("user");

  return <div>{user ? <Outlet /> : <Navigate to={"/"} />}</div>;
};
