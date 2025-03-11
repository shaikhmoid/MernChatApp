import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://backend-8vfl6pkw8-moids-projects-41781b68.vercel.app/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
