import axios from "../../utils/axiosCustomize";

import type { CreateUser } from "./dto/CreateUser";

const createUser = async (userData: CreateUser) => {
  return await axios.post("user", userData);
};

const getAllUser = async () => {
  const users = await axios.get("user");
  return users;
};

const softDeleteUser = (id: number) => {
  return axios.delete(`user/${id}`);
};

const getUserDeleted = () => {
  return axios.get("user/deleted");
};

const restoreUser = (id: number) => {
  return axios.post(`user/${id}/restore`);
};

// profile

const getUserProfile = (userId: number) => {
  return axios.get(`user/${userId}/staffProfile`);
};

export default {
  createUser,
  getAllUser,
  softDeleteUser,
  getUserDeleted,
  restoreUser,
  getUserProfile,
};
