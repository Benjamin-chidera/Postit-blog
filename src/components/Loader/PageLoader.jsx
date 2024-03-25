import React from "react";
import logo from "../../assets/images/logo.png";
import { BounceLoader } from "react-spinners";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";

export const PageLoader = () => {
  return (
    <motion.main
      className=" flex justify-center items-center h-screen mx-5"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
    >
      <div className="flex item gap-5">
        {/* <img src={logo} alt="" className="w-[270px]"/> */}
        <LazyLoadImage src={logo} className="w-[270px]" />
        <BounceLoader color="#36d7b7" />
      </div>
    </motion.main>
  );
};
