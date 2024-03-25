import React from "react";
import stories_img from "../../assets/stories_page.svg";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Welcomepage = () => {
  const navigate = useNavigate();

  const user = Cookies.get("user");

  let decode = null;

  if (user) {
    decode = jwtDecode(user);
  }

  return (
    <div className="container mx-auto">
      <div className="px-3 lg:flex">
        <div className="flex flex-col gap-6 mt-8">
          <h2 className="font-heading text-black-500 text-6xl md:text-8xl font-bold ">
            Welcome {decode?.name},
          </h2>
          <p className="md:text-2xl md:leading-9 text-sm leading-6 max-w-[300px] md:max-w-[500px]">
            Lorem ipsum dolor sit ameetur adipiscing elit. Coctetur egestas
            massa velit aliquam. Molestim bibendum hnt ipsum orci, platea
            aliquam id ut.
          </p>
          <div className="w-full flex gap-4">
            <button
              className="text-white-100 font-heading text-xl md:text-3xl font-bold bg-blue-500 w-[100px] h-[40px] md:w-[230px] md:h-[53px] rounded-lg"
              onClick={() => navigate("/mystories")}
              // to={`/mystories/${decode.userId}`}
            >
              My Stories
            </button>
            <button
              className="border-2 border-blue-500 text-blue-500 font-heading text-xl md:text-3xl font-bold w-[100px] h-[40px] md:w-[230px] md:h-[53px] rounded-lg"
              onClick={() => navigate("/stories")}
            >
              Go To Feed
            </button>
          </div>
        </div>

        <LazyLoadImage
          loading="lazy"
          effect="blur"
          src={stories_img}
          alt=""
          className="h-[200px] w-[500px] md:h-[300px] md:w-[700px] lg:h-[300px]"
        />
      </div>
    </div>
  );
};

export default Welcomepage;
