import axios from "axios";
import Cookies from "js-cookie";

const user = Cookies.get("user");


export const getData = async () => {
  const res = await axios.get(
    "https://postit-server.onrender.com/api/v1/posts"
  );
  return res.data;
};

export const getLatestData = async () => {
  const res = await axios.get(
    "https://postit-server.onrender.com/api/v1/posts/latest"
  );
  return res.data;
};

export const getAPost = async (id) => {
  const res = await axios.get(
    `https://postit-server.onrender.com/api/v1/posts/${id}`
  );
  return res.data;
};

export const getAuthorsPost = async () => {

  try {
    const res = await axios.get(
      `https://postit-server.onrender.com/api/v1/posts/author`,
      {
        headers: {Authorization: `Bearer ${user}`}
      }
    );
    return res.data;
  } catch (error) {
    console.log("error fetching post", error);
  }
};

export const createPost = async (value) => {
  const { data } = await axios.post(
    "https://postit-server.onrender.com/api/v1/posts",
    value,
    {
      headers: { Authorization: `Bearer ${user}` },
    }
  );

  return data;
};

export const userSignUp = async (value) => {
  const { data } = await axios.post(
    "https://postit-server.onrender.com/api/v1/user/register",
    value
  );

  return data;
};

export const userLogin = async (value) => {
  const { data } = await axios.post(
    "https://postit-server.onrender.com/api/v1/user/login",
    value
  );

  return data;
};

export const deleteAPost = async (id) => {
  const res = await axios.delete(
    `https://postit-server.onrender.com/api/v1/posts/${id}`
  );
  return res.data;
};

export const editAPost = async (id, value) => {
  const res = await axios.patch(
    `https://postit-server.onrender.com/api/v1/posts/${id}`,
    value
  );
  return res.data;
};

//this is for comments
export const getCommentsPost = async (id) => {
  const res = await axios.get(
    `https://postit-server.onrender.com/api/v1/posts/${id}/comments`,
    {
      headers: { Authorization: `Bearer ${user}` },
    }
  );
  return res.data;
};

export const deleteComment = async (id) => {
  const res = await axios.delete(
    `https://postit-server.onrender.com/api/v1/posts/comments/${id}`
  );
  return res.data;
};

export const getAComment = async (id) => {
  const res = await axios.get(
    `https://postit-server.onrender.com/api/v1/posts/comments/${id}`
  );
  return res.data;
};

export const createCommentsPost = async (id, value) => {
  const res = await axios.post(
    `https://postit-server.onrender.com/api/v1/posts/${id}/comments`,
    value,
    {
      headers: { Authorization: `Bearer ${user}` },
    }
  );
  return res.data;
};

export const editCommentsPost = async (id, value) => {
  const res = await axios.patch(
    `https://postit-server.onrender.com/api/v1/posts/${id}/comments`,
    value
  );
  return res.data;
};

//get logged in user
export const getAUser = async (id) => {
  const { data } = await axios(
    `https://postit-server.onrender.com/api/v1/user/user/${id}`
  );

  return data;
};

export const getUser = async () => {
  const { data } = await axios(
    `https://postit-server.onrender.com/api/v1/user/user`
  );

  return data;
};

export const getAuthorName = async () => {
  const { data } = await axios("http:localhost:3000/api/v1/posts/author");

  return data;
};
