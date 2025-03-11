import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://mern-chat-app-kappa-lilac.vercel.app/api/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
