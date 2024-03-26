import close from "../assets/close.svg";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { userSignUp } from "../data/axios";
import { CircleLoader } from "react-spinners";

const SignUp = () => {
  const { setShowSignUp, setShowLogin } = useGlobalContext();

  const { mutateAsync, isSuccess, isPending } = useMutation({
    mutationFn: (value) => userSignUp(value),
  });

  if (isSuccess) {
    setShowLogin(true);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSwitch = () => {
    setShowSignUp(false);
    setShowLogin(true);
  };

  const handleCreatePost = async (data) => {
    const formData = new FormData();

    console.log(data);

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("image", data.image[0]);

    await mutateAsync(formData);
  };

  return (
    <div className=" h-screen bg-white-200 bg-opacity-80 fixed top-0 right-0 w-full z-50 overflow-y-scroll lg:overflow-y-hidden">
      <div className="h-full flex flex-col bg-white-100 shadow-lg w-[653px] max-w-full p-5 mx-auto">
        <span
          className=" self-end me-5 cursor-pointer"
          onClick={() => setShowSignUp(false)}
        >
          <img src={close} alt="" />
        </span>

        <form
          className="flex flex-col self-center gap-4 max-w-full"
          onSubmit={handleSubmit(handleCreatePost)}
          encType="multipart/form-data"
        >
          <h2 className=" text-black-500 text-2xl text-center font-heading font-bold">
            Join Post<span className=" text-blue-500">it</span>.
          </h2>

          <p>
            Enter your email address to create an account on Post
            <span className=" text-blue-500">it</span>.
          </p>

          <label className="self-center font-heading text-lg">Username</label>
          <input
            type="text"
            className=" border-x-0 border-t-0 border-b-2 w-100 border-b-black-300 outline-none text-center"
            {...register("name", { required: true })}
          />

          <label className="self-center font-heading text-lg">
            Your Email Address
          </label>
          <input
            type="email"
            className=" border-x-0 border-t-0 border-b-2 w-100 border-b-black-300 outline-none text-center text-black-300"
            {...register("email", { required: true })}
          />
          <label className="self-center font-heading text-lg">Password</label>
          <input
            type="password"
            className=" border-x-0 border-t-0 border-b-2 w-100 border-b-black-300 outline-none text-center"
            {...register("password", { required: true })}
          />
          <input
            type="file"
            name=""
            id=""
            {...register("image", { required: true })}
          />

          {errors && <p>Please fill all fields</p>}

          <button
            type="submit"
            className="text-white-100 w-full bg-blue-500 font-heading h-12 text-2xl rounded-lg font-bold flex justify-center items-center"
          >
            {isPending ? <CircleLoader color="#36d7b7" size={40} /> : "Submit"}
          </button>

          <p className="font-bold text-center">
            Already have an account?{" "}
            <span
              className="text-blue-500 font-heading text-xl cursor-pointer"
              onClick={handleSwitch}
            >
              {" "}
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
