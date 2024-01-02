import axios from "axios";

export const IMG_BB = process.env.NEXT_PUBLIC_KEY_IMBB;
const Imgbb = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_IMBB,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default Imgbb;
