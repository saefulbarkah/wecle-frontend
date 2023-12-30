"use client";

import { useQuery } from "@tanstack/react-query";
import { SessionType } from "../type";
import API from "@/api";

const getUser = async (): Promise<SessionType> => {
  const response = await API.axios.get("/auth/me");
  return response.data.data;
};

export const useSession = () => {
  return useQuery({
    queryKey: ["session"],
    queryFn: getUser,
  });
};
