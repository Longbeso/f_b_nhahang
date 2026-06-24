import axios from "../../utils/axiosCustomize";
import type { CreateDish } from "./dto/CreateDish.dto";
import type { CreateDishVariat } from "./dto/CreateDishVariant.dto";

// category
const getAllCategory = async () => {
  return await axios.get("category");
};

// dish
const getAllDish = async () => {
  return await axios.get("dish");
};

const creatDish = async (
  dishData: CreateDish,
  listDishVariant: CreateDishVariat[],
) => {
  console.log("check dishData from menuService: ", dishData);
  console.log("check dishData from listDishVariant: ", listDishVariant);

  const formData = new FormData();
  formData.append("image", dishData.image); // PHẢI khớp tên "image" với FileInterceptor('image') ở backend
  formData.append("name", dishData.name);
  formData.append("description", dishData.description);
  formData.append("categoryId", String(dishData.categoryId));
  // append thêm các field khác của dishData (trừ field image đã append riêng)

  const dish = await axios.post("dish", formData);

  if (!dish) {
    return; // tạo không thành công
  }
  await Promise.all(
    listDishVariant.map(async (dishVariant) => {
      return await createDishVariant(dishVariant);
    }),
  );

  return "tạo mới món ăn thành công";
};

const createDishVariant = async (dishVariantData: CreateDishVariat) => {
  return await axios.post("dish-variant", dishVariantData);
};

const getDishByCategoryId = async (id: number) => {
  return await axios.get(`dish/category/${id}`);
};

export default {
  getAllDish,
  getAllCategory,
  getDishByCategoryId,
  creatDish,
  createDishVariant,
};
