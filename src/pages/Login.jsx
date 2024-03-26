import close from "../assets/close.svg";
import { userLogin } from "../data/axios";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { useEffect } from "react";

const Login = () => {
  const { setShowLogin, setShowSignUp } = useGlobalContext();
  const navigate = useNavigate();

  const { mutateAsync, isSuccess, data, isPending } = useMutation({
    mutationFn: (value) => userLogin(value),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    await mutateAsync(data);
  };

  useEffect(() => {
    if (isSuccess && data?.user?.token) {
      Cookies.set("user", data?.user?.token);
      const userInfo = data?.user?.userId;
      Cookies.set("userInfo", userInfo);

      navigate("/welcome");
      setShowLogin(false);
      setShowSignUp(false);
    }
  }, [isSuccess, data, navigate, setShowLogin, setShowSignUp]);

  const handleSwitch = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  return (
    <div className=" h-screen bg-white-200 bg-opacity-80 fixed top-0 right-0 w-full z-50 overflow-y-scroll lg:overflow-y-hidden">
      <div className="h-full flex flex-col bg-white-100 shadow-lg w-[653px] p-5 mx-auto max-w-full">
        <span
          className=" self-end me-5 cursor-pointer"
          onClick={() => setShowLogin(false)}
        >
          <img src={close} alt="" />
        </span>

        <form
          className="flex flex-col self-center mt-32 gap-6  w-[415px] max-w-full"
          onSubmit={handleSubmit(handleLogin)}
        >
          <h2 className=" text-black-500 text-4xl text-center mb-4 font-heading font-bold">
            Welcome Back
          </h2>

          <label className="self-center font-heading text-lg">
            Your Email Address
          </label>
          <input
            type="email"
            className=" border-x-0 border-t-0 border-b-2 w-100 border-b-black-300 outline-none text-center"
            {...register("email", { required: true })}
          />
          {errors.email && <p>Please fill all fields</p>}
          <label className="self-center font-heading text-lg">Password</label>
          <input
            type="password"
            className=" border-x-0 border-t-0 border-b-2 w-100 border-b-black-300 outline-none text-center"
            {...register("password", { required: true })}
          />
          {errors.password && <p>Please fill all fields</p>}

          <button
            type="submit"
            className="text-white-100 w-full bg-blue-500 font-heading h-12 text-2xl rounded-lg font-bold flex justify-center items-center"
          >
            {isPending ? <CircleLoader color="#36d7b7" size={40} /> : "Submit"}
          </button>
          <p className="font-bold text-center">
            No account?{" "}
            <span
              className="text-blue-500 font-heading text-xl cursor-pointer"
              onClick={handleSwitch}
            >
              {" "}
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
