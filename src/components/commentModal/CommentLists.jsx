import { Button } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import { FaTrashRestoreAlt } from "react-icons/fa";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteComment, getCommentsPost } from "../../data/axios";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { BounceLoader } from "react-spinners";
import { jwtDecode } from "jwt-decode";



export const CommentLists = () => {
  const queryClient = useQueryClient();
  const { storyId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const user = Cookies.get("user");

  let decode = null;

  if (user) {
    decode = jwtDecode(user);
  }

  console.log(decode, storyId);
  // get all comments
  const { data, isLoading } = useQuery({
    queryKey: ["comment", storyId],
    queryFn: () => getCommentsPost(storyId),
    enabled: isOpen, // Only fetch data when modal is open
    refetchOnWindowFocus: true,
  });

  // delete comments
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comment"] }),
  });

  const handleDeleteComment = async (id) => {
    await mutateAsync(id);
  };

  useEffect(() => {
    setIsOpen(true); // Open the modal and trigger data fetch
  }, []);

  return (
    <main className=" space-y-5">
      {data?.blog?.length < 1 && <p>No Comment Posted Yet</p>}

      {isLoading && <p>LOADING...</p>}

      {data?.blog?.map((comments) => {
        return (
          <section className="flex  mx-2 flex-col gap-1" key={comments._id}>
            <div className="flex gap-2">
              <img
                src={comments?.author?.image}
                alt=""
                className="w-[30px] h-[30px] rounded-full border-2 border-red-500"
              />
              <div>
                <div className="flex gap-1 items-center">
                  <h1 className="text-[13px]">{comments?.author?.name}</h1>
                  <p className="text-[10px] text-gray-500">
                    {new Date(comments.createdAt).getHours() + " hours ago"}
                  </p>
                </div>
                <p className=" max-w-lg text-sm">{comments.comments}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => handleDeleteComment(comments._id)}
              >
                {isPending ? (
                  <BounceLoader color="#36d7b7" size={12} />
                ) : (
                  <FaTrashRestoreAlt />
                )}
              </Button>
            </div>
          </section>
        );
      })}
    </main>
  );
};
