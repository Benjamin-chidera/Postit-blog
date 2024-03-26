import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";
import Button from "../button/Button";
import logo from "../../assets/Postit_logo.svg";
import users from "../../assets/user.svg";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Logout } from "../../pages/Logout";

const Navbar = () => {
  const { setShowLogin } = useGlobalContext();
  const { pathname } = useLocation();

  const user = Cookies.get("user");

  let decode = null;

  if (user) {
    decode = jwtDecode(user);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className=" shadow-xl">
      <header className="flex px-5 h-16 items-center font-heading text-2xl justify-between container mx-auto">
        <div>
          <Link>
            <img src={logo} alt="" />
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <nav className="lg:block hidden">
            <ul className="flex gap-5">
              <li>
                <Link to="/welcome">Stories</Link>
              </li>
              {/* <li>
                <Scroll to="contact" className="cursor-pointer">
                  Contact
                </Scroll>
              </li> */}
              {!user && (
                <li>
                  <Link onClick={() => setShowLogin(true)}>Sign In</Link>
                </li>
              )}
            </ul>
          </nav>
          {!user ? (
            <Button />
          ) : (
            <div>
              <Logout />
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
