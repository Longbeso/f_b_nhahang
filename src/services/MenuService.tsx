import axios from "../../utils/axiosCustomize";

// category
const getAllCategory = async () => {
  return await axios.get("category");
};

// dish
const getAllDish = async () => {
  return await axios.get("dish");
};

export default { getAllDish, getAllCategory };
