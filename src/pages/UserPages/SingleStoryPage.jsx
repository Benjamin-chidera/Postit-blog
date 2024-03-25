import { useParams } from "react-router-dom";
import facebook from "../../assets/share_fb.svg";
import twitter from "../../assets/share_twitter.svg";
import whatsapp from "../../assets/share_whatsapp.svg";
import { useQuery } from "@tanstack/react-query";
import { getAPost } from "../../data/axios";
import { SingleStoriesLoader } from "../../components/Loader/SigleStoriesLoader";
import { Comment } from "../../components/commentModal/Comment";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const SingleStoryPage = () => {
  const { storyId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["blog", storyId],
    queryFn: () => getAPost(storyId),
  });
  const para = data?.post?.description.split("\n");

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <SingleStoriesLoader num={1} />
      ) : (
        <div className="px-6 pt-12 pb-5 flex flex-col gap-5">
          <span className="px-4 h-7 rounded-md  text-white-100 self-start bg-blue-500">
            {data?.post?.tags}
          </span>
          <h2 className="font-heading font-bold text-6xl max-w-[956px]"></h2>
          <div className="flex items-center gap-3">
            <LazyLoadImage
              loading="lazy"
              effect="blur"
              src={data?.post?.author?.image}
              alt=""
              className=" w-8 rounded-full h-8 object-cover"
            />
            <p className=" text-grey-100 text-xs">
              By <span className="text-black-500"> </span> -{" "}
              {data?.post?.author?.name}
            </p>
          </div>
          <hr className="bg-grey-100" />
          <div className="w-full">
            <LazyLoadImage
              loading="lazy"
              effect="blur"
              src={data?.post?.image}
              alt=""
              className="w-screen h-[300px] object-cover cur"
            />
          </div>

          <div>
            {para?.map((p, i) => {
              return (
                <p
                  key={i}
                  className="text-grey-100 text-xl leading-8 text-justify"
                >
                  {p}
                </p>
              );
            })}
          </div>

          <div className="flex gap-3 items-center">
            <p className="text-sm md:text-xl">Share post:</p>

            <div className="flex gap-4 items-center">
              <span>
                <img src={twitter} alt="" className="w-[20px]" />
              </span>
              <span>
                <img src={facebook} alt="" className="w-[20px]" />
              </span>
              <span>
                <img src={whatsapp} alt="" className="w-[20px]" />
              </span>
              <span>
                <Comment id={storyId} />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleStoryPage;
