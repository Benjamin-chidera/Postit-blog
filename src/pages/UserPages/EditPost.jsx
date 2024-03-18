import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { editAPost, getAPost } from "../../data/axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CircleLoader } from "react-spinners";

export const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const { data } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => getAPost(id),
  });

  const { mutateAsync, isSuccess, isPending } = useMutation({
    mutationFn: (value) => editAPost(id, value),
  });

  const handleEdit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("tags", data.tags);
    formData.append("description", data.description);
    formData.append("name", data.name);

    // Only include the image if a new one is selected:
    if (!data.image[0]) {
      formData.append("image", data.image[0]);
    } else {
      // If no new image is provided, use the existing image URL from the data
      formData.append("image", data?.post?.image);
    }

    await mutateAsync(formData);
  };

  if (isSuccess) {
    navigate("/mystories");
  }

  return (
    <div className="px-3 container mx-auto">
      <form onSubmit={handleSubmit(handleEdit)}>
        <input
          type="text"
          placeholder="Author's name"
          className="w-full md:w-96 lg:w-11/12 h-12 px-4 my-4 border border-gray-500"
          {...register("name", { required: true })}
          defaultValue={data?.post?.name}
        />
        <input
          type="text"
          placeholder="Title"
          className="w-full md:w-96 lg:w-11/12 h-12 px-4 my-4 border border-gray-500"
          {...register("title", { required: true })}
          defaultValue={data?.post?.title}
        />

        <select
          defaultValue={data?.post?.tags}
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

        <div className="lg:flex items-center gap-3">
          {data?.post?.image && (
            <img src={data?.post?.image} className=" h-20 w-20 object-cover" />
          )}

          <input
            type="file"
            className="w-full md:w-96  lg:w-64  px-4 border py-2"
            {...register("image")}
          />
        </div>

        <textarea
          placeholder="Write your story..."
          className="w-full md:w-96  lg:w-11/12 h-72 px-4 py-2 my-4 border  border-gray-500 resize-none"
          {...register("description", { required: true })}
          defaultValue={data?.post?.description}
        />

        <div className="text-center text-white-100">
          <button className="w-[300px] max-w-xs lg:max-w-md h-12 bg-blue-500 text-white rounded-md mx-auto font-bold text-lg font-mono ">
            {isPending ? (
              <CircleLoader color="#36d7b7" size={40} />
            ) : (
              "Update Story"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
