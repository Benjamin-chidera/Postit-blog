import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAPost, getAuthorsPost, getUser } from "../../data/axios";
import { MyStoriesLoader } from "../../components/Loader/MyStoriesLoader";
import { BounceLoader } from "react-spinners";

const UserStories = () => {
  const [status, setStatus] = useState();
  const queryClient = useQueryClient();


  // Getting an Authors Post
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog"],
    queryFn: getAuthorsPost,
  });

  console.log(data);

  // Deleting an Authors Post
  const { mutateAsync , isPending} = useMutation({
    mutationFn: deleteAPost,

    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blog"] }),
  });

  // this is for Editing an Authors Post

  const filter = data?.authorsPosts?.filter(
    (b) => b.blogStatus === status || status === undefined
  );


  const handleDelete = async (id) => {
    await mutateAsync(id);
  };

  return (
    <div className=" px-3 pt-10 flex flex-col gap-5 container mx-auto">
      {error && (
        <h1 className="text-grey-100 text-center font-bold">
          An error occurred while displaying Blog Posts
        </h1>
      )}
      <div className="flex justify-between gap-5">
        <h2 className="text-3xl font-heading font-bold">My Stories</h2>

        <Link
          to={"/createStories"}
          className=" text-xs flex justify-center items-center px-5 bg-black-500 text-white-100 rounded-lg"
        >
          Write Story
        </Link>
      </div>

      <div className="space-x-12">
        <button onClick={() => setStatus(undefined)} className="line">
          All
        </button>
        <button onClick={() => setStatus("draft")} className="line">
          Drafts
        </button>
        <button onClick={() => setStatus("published")} className="line">
          Published
        </button>
      </div>
      <hr />

      <div className="flex justify-between flex-col gap-7">
        {/* {filter.blogStatus < 1 && <p>regergerg</p>} */}
        {isLoading ? (
          <MyStoriesLoader num={5} />
        ) : (
          filter?.map((story) => {
            return (
              <section key={story._id} className="md:flex justify-between gap-10">
                <div>
                  <h2 className="text-sm max-w-[200px] leading-5 md:text-lg md:max-w-[400px]">
                    {story?.title}
                  </h2>
                  <p className="text-sm max-w-[400px] md:text-lg md:max-w-[600px] leading-5 mt-3">
                    {story?.description.substring(0, 150)}
                  </p>
                  <p className="text-xs italic text-grey-100 max-w-[200px] leading-5 capitalize">
                    {story?.blogStatus}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <Link
                    className="bg-blue-500 text-white-100 rounded-md py-0.5 px-4 text-center whitespace-nowrap font-semibold  text-xs w-fit"
                    to={`/editpost/${story._id}`}
                  >
                    Edit Post
                  </Link>
                  <button
                    className="border border-blue-500 text-blue-500 rounded-md py-0.5 px-4 font-semibold  text-xs w-fit"
                    onClick={() => handleDelete(story._id)}
                  >
                    {isPending ? (
                      <BounceLoader color="#36d7b7" size={12} />
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </section>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserStories;
