// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../menu.css";
import type { IDish } from "../dto/Dish.dto";
import type { IDishVariant } from "../dto/DishVariant.dto";
import { useState } from "react";
import ModalCreateUpdateVariant from "./ModalCreateUpdateVariant";
type Props = {
  dish: IDish;
  handleClickDeleteDish: (dishId: number) => void;
  handleUpdateVariant: (
    listDishVariant: IDishVariant[],
    dishId: number,
  ) => void;
};

const CardFood = ({
  dish,
  handleClickDeleteDish,
  handleUpdateVariant,
}: Props) => {
  const [variantIdPrice, setVariantIdPrice] = useState<number>(
    dish.dishVariants.find((variant) => variant.isDefault === true)?.id ?? 0,
  );

  const handleClickDishVariant = (dishId: number) => {
    setVariantIdPrice(dishId);
  };

  return (
    <Card className="card-food">
      <Card.Img
        variant="top"
        src={dish.imageUrl}
        style={{
          height: "250px",
          objectFit: "cover",
        }}
      />
      <Card.Body className="dish_card_body">
        <Card.Title>{dish.name}</Card.Title>
        {/* <Card.Text> */}
        <div className="dish-variant-edit-box">
          <div>
            {dish.dishVariants?.length !== 0
              ? dish.dishVariants?.map((variant: IDishVariant) => {
                  return (
                    <button
                      key={variant.id}
                      // className="btn btn-info me-1"
                      className={
                        variant.id === variantIdPrice
                          ? "btn btn-primary me-1 mb-1"
                          : "btn btn-info me-1 mb-1"
                      }
                      onClick={() => handleClickDishVariant(variant.id)}
                    >
                      {variant.name}
                    </button>
                  );
                })
              : ""}
          </div>
          <ModalCreateUpdateVariant
            dishVariantsBefore={dish.dishVariants.map(
              (variant: IDishVariant) => {
                return {
                  name: variant.name,
                  isDefault: variant.isDefault,
                  price: variant.price,
                  id: variant.id,
                };
              },
            )}
            dishId={dish.id}
            handleUpdateVariant={handleUpdateVariant}
          />
        </div>
        {/* </Card.Text> */}

        <Card.Text>
          Giá:{" "}
          {
            dish.dishVariants.find((variant) => {
              return variant.id === variantIdPrice;
            })?.price
          }
        </Card.Text>
        <Card.Text>
          <button
            className="btn btn-danger me-1"
            onClick={() => {
              const result = confirm("Bạn có chắc chắc muốn xóa món ăn không");
              if (result) {
                handleClickDeleteDish(dish.id);
              }
            }}
          >
            xóa
          </button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardFood;
