import { api as axios } from "./axios";
import { proxy } from "./proxy";

const API = {
  proxy: proxy,
  axios: axios,
};

export default API;
