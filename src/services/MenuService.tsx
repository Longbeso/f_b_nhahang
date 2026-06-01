import axios from "../../utils/axiosCustomize";

// category
const getAllCategory = async () => {
  return await axios.get("category");
};

// dish
const getAllDish = async () => {
  return await axios.get("dish");
};

const getDishByCategoryId = async (id: number) => {
  return await axios.get(`dish/category/${id}`);
};

export default {
  getAllDish,
  getAllCategory,
  getDishByCategoryId,
};
