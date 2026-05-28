import axios from "../../utils/axiosCustomize";

const login = async (dataLogin: any) => {
  return await axios.post("auth/login", { ...dataLogin });
};

export default { login };
