import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Counter from "./Counter";
import { RiDeleteBin5Line } from "react-icons/ri";
interface Category {
  id: number;
  name: string;
  description?: string;
}

interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  image_url?: string;
  status: boolean;
}

// interface Order {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
// }

// Record<KeyType, ValueType>
// Một object có key là KeyType và value là ValueType
const ViewOrder = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<Record<number, number>>({}); // menu_item_id -> quantity

  const handleClickCategory = (id: number) => {
    setSelectedCategory(id);
  };
  const handleClickCategoryAll = () => {
    setSelectedCategory(null);
  };

  const handleClickAdd = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // [id] khi chuyển qua js thì id vẫn là number
  // nếu id đã có nó ghi đè vào giá trị cũ, vì ...prev đã tách ra từng phần tử
  // nên nếu có id cũ trùng thì nó chèn lên

  const handleClickSub = (id: number) => {
    setQuantities((prev) => {
      const newQty = (prev[id] || 0) - 1;

      if (newQty <= 0) {
        // loại bỏ khỏi giỏ hàng tạm
        const { [id]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [id]: newQty };
    });
  };

  const categories: Category[] = [
    {
      id: 1,
      name: "Món nước",
      description: "Các món có nước dùng như phở, bún",
    },
    {
      id: 2,
      name: "Món khô",
      description: "Các món không có nước",
    },
    {
      id: 3,
      name: "Nước uống",
      description: "Các loại nước giải khát",
    },
    {
      id: 4,
      name: "Tráng miệng",
      description: "Các món ăn sau bữa chính",
    },
    {
      id: 5,
      name: "Khai vị",
      description: "Món ăn nhẹ trước bữa chính",
    },
    {
      id: 6,
      name: "Món chính",
      description: "Món chính trong bữa ăn",
    },
  ];
  const menu: MenuItem[] = [
    {
      id: 1,
      name: "Phở bò",
      description: "Phở bò truyền thống",
      price: 45000,
      category_id: 1,
      image_url: "../../assets/background_login.avif",
      status: true,
    },
    {
      id: 2,
      name: "Bún bò Huế",
      description: "Bún bò Huế cay nhẹ",
      price: 50000,
      category_id: 1,
      image_url: "bun_bo_hue.jpg",
      status: true,
    },
    {
      id: 3,
      name: "Cơm tấm sườn",
      description: "Cơm tấm sườn nướng",
      price: 55000,
      category_id: 2,
      image_url: "com_tam.jpg",
      status: true,
    },
    {
      id: 4,
      name: "Trà đào",
      price: 25000,
      category_id: 3,
      image_url: "tra_dao.jpg",
      status: true,
    },
    {
      id: 5,
      name: "Cơm tấm sườn bì",
      description: "Cơm tấm với sườn nướng và bì",
      price: 52000,
      category_id: 2,
      image_url: "com_tam_suon.jpg",
      status: true,
    },
    {
      id: 6,
      name: "Mì xào bò",
      description: "Mì xào với thịt bò và rau cải",
      price: 50000,
      category_id: 2,
      image_url: "mi_xao_bo.jpg",
      status: true,
    },
    {
      id: 7,
      name: "Bò lúc lắc",
      description: "Bò lúc lắc ăn kèm khoai tây chiên",
      price: 75000,
      category_id: 6,
      image_url: "bo_luc_lac.jpg",
      status: true,
    },
    {
      id: 8,
      name: "Gỏi cuốn tôm thịt",
      description: "Gỏi cuốn với tôm, thịt và rau sống",
      price: 30000,
      category_id: 5,
      image_url: "goi_cuon.jpg",
      status: true,
    },
    {
      id: 9,
      name: "Chả giò",
      description: "Chả giò chiên giòn ăn kèm rau",
      price: 35000,
      category_id: 5,
      image_url: "cha_gio.jpg",
      status: true,
    },
    {
      id: 10,
      name: "Trà đào cam sả",
      description: "Trà đào với cam và sả thơm",
      price: 28000,
      category_id: 3,
      image_url: "tra_dao_cam_sa.jpg",
      status: true,
    },
    {
      id: 11,
      name: "Cà phê sữa đá",
      description: "Cà phê phin với sữa đặc",
      price: 22000,
      category_id: 3,
      image_url: "ca_phe_sua.jpg",
      status: true,
    },
    {
      id: 12,
      name: "Bánh flan",
      description: "Bánh flan caramel mềm mịn",
      price: 20000,
      category_id: 4,
      image_url: "banh_flan.jpg",
      status: true,
    },
    {
      id: 13,
      name: "Bún riêu cua",
      description: "Bún riêu cua với cà chua và đậu hũ",
      price: 48000,
      category_id: 1,
      image_url: "bun_rieu.jpg",
      status: true,
    },
    {
      id: 14,
      name: "Bún chả Hà Nội",
      description: "Bún chả với thịt nướng và nước mắm chua ngọt",
      price: 55000,
      category_id: 1,
      image_url: "bun_cha.jpg",
      status: true,
    },
    {
      id: 15,
      name: "Cơm chiên hải sản",
      description: "Cơm chiên với tôm, mực và rau củ",
      price: 60000,
      category_id: 2,
      image_url: "com_chien_hai_san.jpg",
      status: true,
    },
    {
      id: 16,
      name: "Cơm gà xối mỡ",
      description: "Cơm gà chiên giòn ăn kèm dưa chua",
      price: 58000,
      category_id: 2,
      image_url: "com_ga_xoi_mo.jpg",
      status: true,
    },
    {
      id: 17,
      name: "Sinh tố bơ",
      description: "Sinh tố bơ sữa béo mịn",
      price: 35000,
      category_id: 3,
      image_url: "sinh_to_bo.jpg",
      status: true,
    },
    {
      id: 18,
      name: "Trà tắc",
      description: "Trà tắc mát lạnh",
      price: 20000,
      category_id: 3,
      image_url: "tra_tac.jpg",
      status: true,
    },
    {
      id: 19,
      name: "Rau câu dừa",
      description: "Rau câu dừa mát lạnh",
      price: 18000,
      category_id: 4,
      image_url: "rau_cau_dua.jpg",
      status: true,
    },
    {
      id: 20,
      name: "Súp cua",
      description: "Súp cua trứng cút và thịt cua",
      price: 30000,
      category_id: 5,
      image_url: "sup_cua.jpg",
      status: true,
    },
  ];

  const cartOrder = menu
    .filter((item) => quantities[item.id] > 0)
    .map((item2) => {
      return {
        ...item2,
        quantity: quantities[item2.id],
      };
    });

  return (
    <>
      <div className="wrap-view-order">
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={12}>
              <div className="category">
                <Row className="justify-content-start mb-3 g-1">
                  <Col xs="auto">
                    <Button
                      size="sm"
                      onClick={handleClickCategoryAll}
                      variant="secondary"
                    >
                      ALL
                    </Button>
                  </Col>

                  {categories.map((category) => (
                    <Col xs="auto" key={category.id}>
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => handleClickCategory(category.id)}
                      >
                        {category.name}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>

            <Col xs={12}>
              <Row className="justify-content-center">
                {menu.map((item) => {
                  if (
                    item.category_id === selectedCategory ||
                    selectedCategory === null
                  ) {
                    return (
                      <Col xs="auto" key={item.id} className="mb-3">
                        <Card style={{ width: "18rem" }}>
                          <Card.Img
                            variant="top"
                            src="https://fohlafood.vn/cdn/shop/articles/bi-quyet-nau-phi-bo-ngon-tuyet-dinh.jpg?v=1712213789"
                          />
                          <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>{item.description}</Card.Text>
                            <div className="order-button-wrap">
                              <Button
                                variant="primary"
                                onClick={() => {
                                  console.log(quantities);
                                }}
                              >
                                Thêm món
                              </Button>
                              <Counter
                                item={item}
                                quantity={quantities[item.id] || 0}
                                handleClickAdd={handleClickAdd}
                                handleClickSub={handleClickSub}
                              />
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  }
                })}
              </Row>
            </Col>
            <Col xs={12}>
              <div className="divider-horizontal"></div>
              <div className="order-cart">
                <p className="cart-tittle">Đơn đặt món hiện tại</p>
                <div className="cart-container">
                  {cartOrder.map((dish) => {
                    return (
                      <Col xs="auto" key={dish.id} className="mb-3">
                        <Card className="cart-card">
                          <Card.Body>
                            <div className="cart-card-container">
                              <div className="card-container">
                                <Card.Title>{dish.name}</Card.Title>
                                <Card.Subtitle className=" text-muted mt-2 mb-2">
                                  {dish.price}
                                </Card.Subtitle>
                                <Counter
                                  item={dish}
                                  quantity={quantities[dish.id] || 0}
                                  handleClickAdd={handleClickAdd}
                                  handleClickSub={handleClickSub}
                                />
                              </div>
                              <div className="delete-icon">
                                <RiDeleteBin5Line />
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ViewOrder;
