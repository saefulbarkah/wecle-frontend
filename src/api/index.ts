import { api as axios } from "./axios";
import Imgbb from "./imgbb";
import { proxy } from "./proxy";

const API = {
  proxy: proxy,
  axios: axios,
  imgbb: Imgbb,
};

export default API;
