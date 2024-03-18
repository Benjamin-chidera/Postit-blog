/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { createPost } from "../../data/axios";
import { CircleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

export const CreateStories = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isSuccess, isPending } = useMutation({
    mutationFn: (value) => createPost(value),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["blog"] }),
  });

  const handlePost = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("title", data.title);
    formData.append("tags", data.tags);
    formData.append("image", data.image[0]);
    formData.append("description", data.description);

    await mutateAsync(formData);
  };

  if (isSuccess) {
    navigate("/mystories");
  }

  return (
    <div className="px-3 container mx-auto">
      <form onSubmit={handleSubmit(handlePost)}>
        <input
          type="text"
          placeholder="Author's name"
          className="w-full md:w-96 lg:w-11/12 h-12 px-4 my-4 border border-gray-500"
          {...register("name", { required: true })}
        />
        {errors.name && <p>Author' s name is Required</p>}
        <input
          type="text"
          placeholder="Title"
          className="w-full md:w-96 lg:w-11/12 h-12 px-4 my-4 border border-gray-500"
          {...register("title", { required: true })}
        />
        {errors.title && <p>Title is Required</p>}

        <select
          name=""
          id=""
          className="w-full md:w-96  lg:w-11/12 h-12 px-4 my-4 border border-gray-500"
          {...register("tags", { required: true })}
        >
          <option value="" disabled>
            Select Tags
          </option>
          <option value="sports">Sports</option>
          <option value="politics">Politics</option>
          <option value="education">Education</option>
          <option value="lifestyle">LifeStyle</option>
          <option value="nature">Nature</option>
          <option value="technology">Technology</option>
        </select>
        {errors.tags && <p>Select a Tag for your post</p>}
        <input
          type="file"
          className="w-full md:w-96  lg:w-64  px-4 border py-2"
          {...register("image", { required: true })}
        />
        {errors.image && <p>Image is Required</p>}

        <textarea
          placeholder="Write your story..."
          className="w-full md:w-96  lg:w-11/12 h-72 px-4 py-2 my-4 border  border-gray-500 resize-none"
          {...register("description", { required: true })}
        />
        {errors.description && <p>Description is Required</p>}
        <div className="text-center text-white-100">
          <button className="w-[300px] max-w-xs lg:max-w-md h-12 bg-blue-500 text-white rounded-md mx-auto font-bold text-lg font-mono ">
            {isPending ? (
              <CircleLoader color="#36d7b7" size={40} />
            ) : (
              " Publish Story"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
