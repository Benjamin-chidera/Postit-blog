import { useQuery } from "@tanstack/react-query";
import { getLatestData } from "../../data/axios";
import { Loader1 } from "../Loader/Loader1";

const RecentStories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog"],
    queryFn: getLatestData,
  });

  return (
    <div className="my-10">
      <div className=" w-11/12 mx-auto border-2 md:flex  gap-2 justify-center items-center border-grey-100 rounded-sm p-5 ">
        {error && (
          <p className=" text-black">There was an error fetch data 😭😢🥲</p>
        )}

        {isLoading ? (
          <Loader1 num={3} />
        ) : (
          data?.recent?.map((r) => {
            return (
              <div
                className="flex md:flex-col lg:flex-row items-center lg:justify-center gap-3 max-w-full w-96"
                key={r._id}
              >
                <img
                  src={r.image}
                  alt=""
                  className=" w-28 md:w-40 h-32 object-cover rounded-md mt-3 md:mt-0"
                />
                <div>
                  <span className="px-2 h-5 text-sm rounded-md text-start text-white-100 bg-blue-500">
                    {r.tags}
                  </span>
                  <p className=" text-xs md:text-[14px] max-w-[140px] lg:leading-5">
                    {r.title}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentStories;
