import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FaCommentDots } from "react-icons/fa6";
import { CommentLists } from "./CommentLists";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createCommentsPost,
  // editCommentsPost,
  getAComment,
} from "../../data/axios";
import { useForm } from "react-hook-form";

export const Comment = () => {
  // const userInfo = Cookies.get("userInfo");
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const queryClient = useQueryClient();
  const { storyId } = useParams();

  const { data } = useQuery({
    queryKey: ["comment", storyId],
    queryFn: () => getAComment(storyId),
    
  });

  const { mutateAsync } = useMutation({
    mutationFn: (value) => createCommentsPost(storyId, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
      reset();
      
      setOpen(false);
    },
  });

  const handleSubmitComments = async (formData) => {
    await mutateAsync(formData);
  };

  const handleOpen = () => setOpen(!open);

  console.log(data);

  return (
    <main>
      <Button onClick={handleOpen} variant="gradient" color="white">
        <FaCommentDots />
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        style={{ backgroundColor: "rgba(0, 0, 0, 0.593)", color: "whitesmoke" }}
      >
        <DialogHeader className="text-white">Comments</DialogHeader>
        <DialogBody className="">
          <section className="overflow-y-scroll h-[100px] md:h-[170px] scrollable-div text-gray-400">
            {/* comment body */}
            <CommentLists />
          </section>
        </DialogBody>
        <DialogFooter>
          <section className="w-full">
            {/* comment form */}
            {errors.comments && <p>Post a Comment</p>}
            <form action="" onSubmit={handleSubmit(handleSubmitComments)}>
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                className=" w-full resize-none p-3 bg-transparent border outline-none text-gray-300"
                defaultValue={data?.blog?.comments || ""}
                {...register("comments", { required: true })}
              />

              <Button size="sm" type="submit">
                Save Comment
              </Button>
            </form>

            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Close</span>
            </Button>
          </section>
        </DialogFooter>
      </Dialog>
    </main>
  );
};
