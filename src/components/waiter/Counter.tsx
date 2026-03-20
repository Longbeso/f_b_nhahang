import { Button } from "react-bootstrap";

interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  status: boolean;
}

interface CounterProps {
  item: MenuItem;
  quantity: number;
  handleClickAdd: (id: number) => void; // khai báo kiểu dữ liệu cho handleClickAdd là một hàm
  handleClickSub: (id: number) => void;
}
const Counter = (prop: CounterProps) => {
  const { item, quantity, handleClickAdd, handleClickSub } = prop;
  return (
    <div className="wrap-couter">
      <Button
        onClick={() => {
          handleClickSub(item.id);
        }}
        className="px-3"
        disabled={quantity <= 0}
      >
        -
      </Button>

      <span className="mx-3">{quantity}</span>

      <Button
        onClick={() => {
          handleClickAdd(item.id);
        }}
        className="px-3"
      >
        +
      </Button>
    </div>
  );
};

export default Counter;
