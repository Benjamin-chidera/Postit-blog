import { useState } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const GetStarted = () => {

  const {setUserEmail, setShowSignUp} = useGlobalContext()

  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    setUserEmail(email)
    setShowSignUp(true)
  }
  return (
    <div className="get_started_bg bg-center bg-cover bg-no-repeat grid place-items-center my-10 mx-auto h-64 lg:w-11/12" id="contact">
      <div className="flex flex-col text-center items-center gap-6">
        <h2 className=" font-bold">
          Try Post<span className=" text-blue-500">it</span>.
        </h2>
        <p>
          Do you want to write or discover stories from writers on any topic?
        </p>
        <form className="h-10 flex" onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className=" font-heading font-normal text-xl outline-none rounded-l-lg md:w-[496px] w-72 p-5" placeholder="Enter Email Address" />
          <button className=" bg-blue-500 text-white-100 h-full rounded-r-lg w-32 text-xl">
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetStarted;
