import axios from "../../utils/axiosCustomize";
import type { IDishVariant } from "../components/menu/dto/DishVariant.dto";
import type { CreateDish } from "./dto/CreateDish.dto";
import type { CreateDishVariant } from "./dto/CreateDishVariant.dto";

// category
const getAllCategory = async () => {
  return await axios.get("category");
};

const createCategory = async (categoryName: string) => {
  return await axios.post("category", { name: categoryName });
};

// dish
const getAllDish = async () => {
  return await axios.get("dish");
};

// getMenu trade for getAllDish àn getCategory
const getMenu = async () => {
  const menu = await axios.get("menu");
  return menu.data;
};

const creatDish = async (
  dishData: CreateDish,
  listDishVariant: CreateDishVariant[],
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
  const dishId = dish.data.id;
  if (!dish) {
    return; // tạo không thành công
  }
  const dishVariants = await Promise.all(
    listDishVariant.map(async (dishVariant) => {
      return await createDishVariant({ ...dishVariant, dishId });
    }),
  );
  console.log(dishVariants);
  return "tạo mới món ăn thành công";
};

const createDishVariant = async (dishVariantData: CreateDishVariant) => {
  return await axios.post("dish-variant", dishVariantData);
};

const updateDishVariant = async (dishId: number, variants: IDishVariant[]) => {
  return await axios.patch(`dish-variant/${dishId}`, variants);
};

const getDishByCategoryId = async (id: number) => {
  return await axios.get(`dish/category/${id}`);
};

const softDeleteDish = async (dishId: number) => {
  try {
    const res = await axios.delete(`dish/${dishId}`);
    return res.data;
  } catch (error) {
    console.error("Delete failed:", error);
    throw error;
  }
};

export default {
  getAllDish,
  getAllCategory,
  getDishByCategoryId,
  creatDish,
  createDishVariant,
  getMenu,
  softDeleteDish,
  createCategory,
  updateDishVariant,
};
