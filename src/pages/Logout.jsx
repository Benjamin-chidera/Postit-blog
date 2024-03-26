import React from "react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";

export const Logout = () => {
  const user = Cookies.get("user");
  const navigate = useNavigate()

  let decode = null;

  if (user) {
    decode = jwtDecode(user);
  }

  const handleLogout = () => {
    Cookies.remove("user");
    // localStorage.removeItem("userInfo");

    window.location.reload();

    navigate("/");
  };

  return (
    <Menu>
      <MenuHandler>
        <Button className=" bg-transparent shadow-none  p-2 rounded-full">
          <img
            src={decode?.image}
            alt=""
            className=" w-12 rounded-full h-12 object-cover cursor-pointer"
          />
        </Button>
      </MenuHandler>
      <MenuList className=" min-w-[110px]">
        <Button
          className="text-white  font-bold"
          size="sm"
          onClick={handleLogout}
        >
          LogOut
        </Button>

        <li className=" lg:hidden text-black">
          <Link to="/welcome">Stories</Link>
        </li>

        {/* <li className=" lg:hidden text-black">
          <Scroll to="contact" className="cursor-pointer">
            Contact
          </Scroll>
        </li> */}
      </MenuList>
      {/* <MenuList className=" min-w-[110px]"></MenuList> */}
      {/* <MenuList className=" min-w-[110px]">
      
      </MenuList> */}
    </Menu>
  );
};
