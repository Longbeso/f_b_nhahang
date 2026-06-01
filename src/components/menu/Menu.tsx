import React, { useEffect, useState } from "react";
import menuService from "../../services/MenuService";
import type { dishDTO } from "./dto/Dish.dto";
import Card from "./Card";
import "./menu.css";
const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [categorys, setCategorys] = useState([]);
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
    setCategorys(categoryResult.data);
  };

  useEffect(() => {
    fetchDish();
    fetchCategory();
  }, []);

  useEffect(() => {
    console.log(dishes);
  });

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

  return (
    <div className="menu-container">
      <div className="category">
        <button
          className="btn category-btn btn-primary"
          onClick={(e) => {
            handleClickCategory(e, 0);
          }}
        >
          All
        </button>
        {categorys.map((category: any) => {
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
      <div className="modal-create-dish">{/* làm modal thêm món */}</div>
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
