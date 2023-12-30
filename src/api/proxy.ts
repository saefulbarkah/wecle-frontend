import axios from "axios";

export const proxy = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
  withCredentials: true,
  headers: {
    "Content-Type": "Application/json",
  },
});
