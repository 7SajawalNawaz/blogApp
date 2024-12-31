import axios from "axios";

const baseURL = axios.create({ baseURL: "http://localhost:8000/api/v1" });

baseURL.interceptors.request.use((req) => {
  const stringifyBlogdata = window.localStorage.getItem("loginData");

  if (stringifyBlogdata) {
    const blogData = JSON.parse(stringifyBlogdata);
    const token = blogData.token;

    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default baseURL;
