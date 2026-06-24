import React, { useEffect, useState } from "react";
import menuService from "../../services/MenuService";
import Card from "./content/Card";
import ModalCreateDish from "./content/ModalCreateDish";
import MenuService from "../../services/MenuService";
import type { CategoryDTO } from "./dto/Category.dto";
import type { dishDTO } from "./dto/Dish.dto";
import type { CreateDish } from "../../services/dto/CreateDish.dto";
import type { CreateDishVariat } from "../../services/dto/CreateDishVariant.dto";
import "./menu.css";

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [categories, setcategories] = useState<CategoryDTO[]>([]);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  // const [modal, setModal] = useState<boolean>(false);
  const fetchDish = async () => {
    const listDish = await menuService.getAllDish();
    setDishes(listDish.data);
  };

  const fetchDishByCategoryId = async (id: number) => {
    const listDish = await menuService.getDishByCategoryId(id);
    setDishes(listDish.data);
  };

  const fetchCategory = async () => {
    const categoryResult = await menuService.getAllCategory();
    setcategories(categoryResult.data);
  };

  useEffect(() => {
    fetchDish();
    fetchCategory();
  }, []);

  // useEffect(() => {
  //   console.log(categories);
  // }, [categories]);

  const handleClickCategory = (
    e: React.MouseEvent<HTMLButtonElement>,
    categoryId: number,
  ) => {
    const listBtn = document.querySelectorAll(".category-btn");
    listBtn.forEach((btn) => {
      if (btn.classList.contains("btn-primary")) {
        btn.classList.remove("btn-primary");
      }
    });
    e.currentTarget.classList.add("btn-primary");
    if (categoryId === 0) {
      fetchDish();
    } else {
      fetchDishByCategoryId(categoryId);
    }
  };

  const handleClickShowModal = () => {
    setIsShowModal(!isShowModal);
  };

  const handleClickCloseModal = () => {
    setIsShowModal(false);
  };

  const handleClickAddNewDish = async (
    dishData: CreateDish,
    listDishVariant: CreateDishVariat[],
  ) => {
    const dish = await MenuService.creatDish(dishData, listDishVariant);
    console.log("this is dish from menu.tsx", dish);
    setIsShowModal(false);
    fetchDish();
  };
  return (
    <div className="menu-container">
      <div className="menu-header container">
        <div className="category">
          <button
            className="btn category-btn btn-primary"
            onClick={(e) => {
              handleClickCategory(e, 0);
            }}
          >
            All
          </button>
          {categories.map((category: any) => {
            return (
              <button
                className="btn category-btn"
                onClick={(e) => {
                  handleClickCategory(e, category.id);
                }}
                key={category.id}
              >
                {category.name}
              </button>
            );
          })}
        </div>
        <div className="modal-create-dish">
          <ModalCreateDish
            isShowModal={isShowModal}
            handleClickShowModal={handleClickShowModal}
            handleClickCloseModal={handleClickCloseModal}
            handleClickAddNewDish={handleClickAddNewDish}
            categories={categories}
          />
        </div>
      </div>
      <div className="menu-main container">
        <div className="row">
          {dishes.map((dish: dishDTO) => {
            return (
              <div className="col col-lg-3 col-6" key={dish.id}>
                <Card dish={dish} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;
