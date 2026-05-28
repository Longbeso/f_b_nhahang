import axios from "../../utils/axiosCustomize";

import type { CreateUser } from "./dto/CreateUser";

const createUser = async (userData: CreateUser) => {
  return await axios.post("user", userData);
};

const getAllUser = async () => {
  const users = await axios.get("user");
  return users;
};

export default { createUser, getAllUser };
