import { useEffect, useState } from "react";
import menuService from "../../services/MenuService";
import type { dishDTO } from "./dto/Dish.dto";
import Card from "./Card";
import "./menu.css";
const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [categorys, setCategorys] = useState([]);

  const fetchDish = async () => {
    const listDish = await menuService.getAllDish();
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
  }, [dishes]);

  useEffect(() => {
    console.log(categorys);
  }, [categorys]);

  return (
    <div className="menu-container">
      <div className="category">
        <button className="btn btn-primary">All</button>
        {categorys.map((category: any) => {
          return (
            <div key={category.id}>
              <button className="btn">{category.name}</button>
            </div>
          );
        })}
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
