// import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import type { dishDTO } from "../dto/Dish.dto";
import type { dishVariantDTO } from "../dto/DishVariant.dto";
import "../menu.css";
type Props = {
  dish: dishDTO;
};

const CardFood = ({ dish }: Props) => {
  return (
    <Card style={{ width: "18rem" }} className="card-food">
      <Card.Img
        variant="top"
        src={dish.imageUrl}
        style={{
          height: "200px",
          objectFit: "cover",
        }}
      />
      <Card.Body>
        <Card.Title>{dish.name}</Card.Title>
        <Card.Text>
          {dish.dishVariants?.length !== 0
            ? dish.dishVariants?.map((variant: dishVariantDTO) => {
                return <button className="btn btn-info">{variant.name}</button>;
              })
            : "is default"}
        </Card.Text>
        <Card.Text>
          Giá: {dish?.dishVariants?.map((variant) => variant.price)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardFood;
