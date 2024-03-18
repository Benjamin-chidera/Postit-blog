import arrow_right from "../../assets/arrow_right.svg"
const Footer = () => {
  return (
    <div className="bg-black-300 text-white-100 mt-7">
      <div className="p-6" style={{ maxWidth: "1440px", margin: "auto" }}>
        <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-24 gap-9 py-5">
          <div className=" lg:w-[300px] xl:w-[427px] w-full">
            <h2 className=" text-white-100 text-2xl font-heading font-bold">
              About Post<span className=" text-blue-500">it</span>.
            </h2>

            <p className=" leading-7 mt-4 text-center md:text-left text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt
              id sem vel quis in turpis sit eget pellentesque. Nunc etiicies in
              rhoncus, rhoncus in arcu. Tincidunt neque fusce vitaenisi aliquet.
              que maeae tortoere necsem commodo ac.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl">Quick Menu</h2>

            <ul className="grid grid-cols-2 gap-3 ms-4 mt-4 text-sm">
              <li>Home</li>
              <li>Sign Up</li>
              <li>Stories</li>
              <li>Login</li>
              <li>Trending Stories</li>
              <li>Contact Us</li>
              <li>Popular Stories</li>
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-xl">
              Subscribe to our newsletter
            </h2>
            <form className="max-w-[337px] h-[39px] flex relative mt-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full h-full rounded-sm p-2 outline-none text-black-500"
              />
              <button className="flex absolute gap-1 w-[103px] h-[27px] items-center justify-center bg-blue-500 text-white-100 end-3 top-1.5">
                Subscribe <img src={arrow_right} alt="" />
              </button>
            </form>
          </div>
        </div>
        <hr />
        <div className="flex items-end w-full text-sm">
          <div>
            <p>Terms and Policy</p>
            <span>
              <img src="" alt="" />
            </span>
            <span>
              <img src="" alt="" />
            </span>
            <span>
              <img src="" alt="" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
