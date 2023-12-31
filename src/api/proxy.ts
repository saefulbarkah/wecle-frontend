import axios from "axios";

export const proxy = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PROXY_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "Application/json",
  },
});
