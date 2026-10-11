import { useEffect, useState } from "react";
import menuService from "../../services/MenuService";
import Card from "./content/Card";
import ModalCreateDish from "./content/ModalCreateDish";
import type { CategoryDTO } from "./dto/Category.dto";
import type { CreateDish } from "../../services/dto/CreateDish.dto";
import type { CreateDishVariant } from "../../services/dto/CreateDishVariant.dto";
import "./menu.css";
import type { IMenuCategory } from "./dto/Menu.dto";
import ModalCreateCategory from "./content/ModalCreateCategory";
import type { IDishVariant } from "./dto/DishVariant.dto";

const Menu = () => {
  const [categories, setcategories] = useState<CategoryDTO[]>([]);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  // modifier
  const [menu, setMenu] = useState<IMenuCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const fetchMenu = async () => {
    const newMenu: IMenuCategory[] = await menuService.getMenu();
    setMenu(newMenu);
  };

  const displayDish = () => {
    return selectedCategory === null
      ? menu.flatMap((cate) => cate.dishes)
      : (menu.find((cate) => cate.id === selectedCategory)?.dishes ?? []);
  };

  const handleClickCategory = (cateId: number | null) => {
    setSelectedCategory(cateId);
  };

  const fetchCategory = async () => {
    const categoryResult = await menuService.getAllCategory();
    setcategories(categoryResult.data);
  };

  useEffect(() => {
    // fetchDish();
    fetchCategory();
    fetchMenu();
  }, []);

  const handleClickShowModal = () => {
    setIsShowModal(!isShowModal);
  };

  const handleClickCloseModal = () => {
    setIsShowModal(false);
  };

  const handleClickAddNewDish = async (
    dishData: CreateDish,
    listDishVariant: CreateDishVariant[],
  ) => {
    const dish = await menuService.creatDish(dishData, listDishVariant);
    console.log("this is dish from menu.tsx", dish);
    setIsShowModal(false);
    fetchMenu();
  };

  const handleClickDeleteDish = async (dishId: number) => {
    const dishDeleted = await menuService.softDeleteDish(dishId);
    console.log(dishDeleted);
    fetchMenu();
  };

  const handleAddNewCategory = async (categoryName: string) => {
    const newCate = await menuService.createCategory(categoryName);
    console.log(newCate);
    fetchMenu();
  };

  // ==> không chỉ đơn giản là tạo mà là có thể tạo hoặc chỉ update hoặc cả 2 ???
  const handleUpdateVariant = async (
    listDishVariant: IDishVariant[],
    dishId: number,
  ) => {
    await menuService.updateDishVariant(dishId, listDishVariant);
    fetchMenu();
  };

  return (
    <>
      <div className="menu-container">
        <div className="menu-header container">
          <div className="category">
            <button
              className={` btn category-btn ${selectedCategory === null ? "btn-primary" : ""} `}
              onClick={() => {
                handleClickCategory(null);
              }}
            >
              All
            </button>
            {menu.map((category: any) => {
              return (
                <button
                  key={category.id}
                  className={`btn category-btn ${selectedCategory === category.id ? "btn-primary" : ""} `}
                  onClick={() => {
                    handleClickCategory(category.id);
                  }}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
          <div className="modals">
            <div className="modal-create-dish me-2">
              <ModalCreateDish
                isShowModal={isShowModal}
                handleClickShowModal={handleClickShowModal}
                handleClickCloseModal={handleClickCloseModal}
                handleClickAddNewDish={handleClickAddNewDish}
                categories={categories}
              />
            </div>
            <div className="create-category">
              <ModalCreateCategory
                handleAddNewCategory={handleAddNewCategory}
              />
            </div>
          </div>
        </div>
        <div className="menu-main container">
          <div className="card-wrapper g-3">
            {displayDish().map((dish) => {
              return (
                <div className="mb-2 dish_col" key={dish.id}>
                  <Card
                    dish={dish}
                    handleClickDeleteDish={handleClickDeleteDish}
                    handleUpdateVariant={handleUpdateVariant}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
