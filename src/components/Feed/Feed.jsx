import arrow from "../../assets/blue_arrow.svg";
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "../Loader/Loader2";
import ReactPaginate from "react-paginate";
import { getData } from "../../data/axios";
import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Feed = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getData,
  });

  //Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const postPerPage = 6;

  const pageVisited = pageNumber * postPerPage;

  const displayBlog = data?.blog?.slice(pageVisited, pageVisited + postPerPage);

  const pageCount = Math.ceil(data?.blog?.length / postPerPage);

  const ChangePage = ({ selected }) => {
    setPageNumber(selected);
  };

  console.log(data);

  return (
    <div>
      <div className=" mx-auto  mb-28">
        {error && (
          <h1 className=" text-center font-bold">
            There was an error getting Blogs Posts
          </h1>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 items-center gap-10">
          {isLoading ? (
            <Loader2 num={4} />
          ) : (
            displayBlog.map((feed) => {
              const {
                _id,
                title,
                image,
                createdAt,
                tags,
                description,
                author,
              } = feed;
              return (
                <div
                  key={_id}
                  className=" flex flex-col gap-4 justify-center w-[250px] lg:w-[300px] xl:w-[350px] mx-auto"
                >
                  <div className="relative">
                    <span className="px-4 h-7 rounded-md  text-white-100 bg-blue-500 absolute start-4 bottom-4">
                      {tags}
                    </span>
                    <LazyLoadImage
                      loading="lazy"
                      effect="blur"
                      src={image}
                      alt=""
                      className="w-[250px] h-[200px] md:w-[350px] md:h-[300px] lg:w-[450px] object-cover rounded-lg"
                    />
                  </div>

                  <h2 className=" text-[18px] font-semibold max-w-[250px]">
                    {title.substring(0, 20)}...
                  </h2>

                  <div className="flex items-center gap-3">
                    <LazyLoadImage
                      loading="lazy"
                      effect="blur"
                      src={author?.image}
                      alt=""
                      className=" w-6 h-6 object-cover"
                    />

                    <p className=" text-grey-100 text-xs">
                      By{" "}
                      <span className="text-black-500 capitalize">
                        {author?.name}
                      </span>{" "}
                      - {new Date(createdAt).toDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-grey-100 leading-8">
                      {description.substring(0, 30)}...
                    </p>
                    <p className="text-blue-500 flex gap-2 items-center">
                      <img src={arrow} alt="" className="w-[10px]" />
                      <Link to={`/stories/${_id}`} className="text-sm">
                        Read More...
                      </Link>
                    </p>{" "}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* pagination */}
        <div className="mt-12 flex gap-8 justify-center">
          <ReactPaginate
            breakLabel="..."
            previousLabel={<IoIosArrowBack size={20} />}
            nextLabel={<IoIosArrowForward size={20} />}
            pageCount={pageCount}
            onPageChange={ChangePage}
            containerClassName="flex justify-center gap-7 w-[80%] mx-auto mt-7"
            previousClassName="bg-gray-200 text-black-100 py-1"
            nextClassName="bg-gray-200 text-black-100 py-1"
            disabledClassName=""
            activeClassName="bg-blue-300 text-white-100 px-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Feed;
