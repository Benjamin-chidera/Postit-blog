import Button from "../components/button/Button";
import RecentStories from "../components/recentstories/RecentStories";
import Login from "./Login";
import SignUp from "./SignUp";
import { useGlobalContext } from "../hooks/useGlobalContext";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Homepage = () => {
  const { showLogin, showSignUp } = useGlobalContext();

  const user = Cookies.get("user");


  let decode = null;

  if (user) {
    decode = jwtDecode(user);
  }

  return (
    <div style={{ maxWidth: "1600px", margin: "auto" }}>
      <div className="home_bg text-black lg:p-24 p-12 relative  h-[616px] bg-cover bg-no-repeat bg-center">
        <div className="flex flex-col justify-center gap-6 h-full">
          <h2 className="font-heading font-bold text-7xl md:text-8xl max-w-[300px] lg:max-w-[500px] md:text-left ">
            Stay Curious.
          </h2>
          <p className=" md:text-2xl leading-9 md:text-left md:max-w-[500px]">
            Lorem ipsum dolor sit ameetur adipiscing elit. Coctetur egestas
            massa velit aliquam. Molestim bibendum hnt ipsum orci, platea
            aliquam id ut.
          </p>
          <div className="md:self-start">
            {!user ? (
              <Button />
            ) : (
              <p className=" bg-blue-500 text-white-100 text h-8 rounded-lg w-full px-4 font-bold text-xl">
                Welcome {decode.name}
              </p>
            )}
          </div>
        </div>
      </div>
      <RecentStories />
      {/* <GetStarted /> */}
      {showSignUp && <SignUp />}
      {showLogin && <Login />}
    </div>
  );
};

export default Homepage;
