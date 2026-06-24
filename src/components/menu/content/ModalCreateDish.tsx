import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import type { CategoryDTO } from "../dto/Category.dto";
import type { CreateDish } from "../../../services/dto/CreateDish.dto";
import type { dishVariantDTO } from "../dto/DishVariant.dto";
import type { CreateDishVariat } from "../../../services/dto/CreateDishVariant.dto";

// type NewDish = {
//   name: string;
//   description: string;
//   categoryId: number;
// };

type ChildProps = {
  handleClickCloseModal: () => void;
  handleClickShowModal: () => void;
  handleClickAddNewDish: (
    dishData: CreateDish,
    listDishVariant: CreateDishVariat[],
  ) => Promise<void>;
  isShowModal: boolean;
  categories: CategoryDTO[];
};

const ModalCreateDish = ({
  handleClickCloseModal,
  handleClickShowModal,
  handleClickAddNewDish,
  categories,
  isShowModal,
}: ChildProps) => {
  const [dishVariants, setDishVariants] = useState<dishVariantDTO[]>([
    {
      name: "",
      price: 0,
      isDefault: false,
      dishId: 0,
    },
  ]);

  const [newDish, setNewDish] = useState<CreateDish>({
    name: "",
    description: "",
    categoryId: 0,
    image: "",
  });

  // review img admin add to create dish
  const [imgPreview, setImgPreview] = useState<string>("");
  const addNewDishVariant = (e: React.MouseEvent) => {
    e.preventDefault();
    setDishVariants([
      ...dishVariants,
      { name: "", price: 0, isDefault: false, dishId: 0 },
    ]);
  };

  const deleteDishVariant = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    setDishVariants((prev) => {
      return prev.filter((_, i) => {
        return i !== index;
      });
    });
  };

  const handleChangeVariant = (
    index: number,
    field: keyof dishVariantDTO,
    value: string | number,
  ) => {
    const newDishVariants = [...dishVariants];

    newDishVariants[index] = {
      ...newDishVariants[index],
      [field]: value,
    };

    setDishVariants(newDishVariants);
  };

  const handleChangeDish = (
    field: keyof CreateDish,
    value: string | number | File,
  ) => {
    setNewDish((prev) => {
      return { ...prev, [field]: value };
    });
  };

  // handle when admin select new img
  const handleAddNewDishImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const imgUrl = URL.createObjectURL(file);
    setImgPreview(imgUrl);
  };

  const resetForm = () => {
    setDishVariants([
      {
        name: "",
        price: 0,
        isDefault: false,
        dishId: 0,
      },
    ]);

    setNewDish({
      name: "",
      description: "",
      categoryId: 0,
      image: "",
    });

    setImgPreview("");
  };

  return (
    <>
      <Button variant="primary" onClick={handleClickShowModal}>
        Thêm món ăn
      </Button>

      <Modal show={isShowModal} onHide={handleClickShowModal} size="lg">
        <Modal.Header closeButton onClick={resetForm}>
          <Modal.Title>Thêm món ăn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên món ăn</Form.Label>
              <Form.Control
                type="text"
                name="dishName"
                placeholder="Nhập tên món"
                autoFocus
                value={newDish.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeDish("name", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Mô tả món ăn</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Nhập mô tả món ăn"
                autoFocus
                value={newDish.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChangeDish("description", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Select
                aria-label="Default select example"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleChangeDish("categoryId", Number(e.target.value));
                }}
              >
                <option>Chọn loại món ăn</option>
                {categories.map((cate) => {
                  return (
                    <option key={cate.id} value={cate.id}>
                      {cate.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <div className="header-dish-variant">
                <Form.Label>Biến thể món ăn</Form.Label>
                <Button
                  size="sm"
                  className="btn btn-primary"
                  onClick={addNewDishVariant}
                >
                  Thêm biến thể
                </Button>
              </div>
              <div className="list-dish-variant">
                {dishVariants?.map((variant, index) => {
                  return (
                    <div key={index} className="dish-variant-item">
                      <div className="dish-variant-form">
                        <Form.Control
                          type="text"
                          name="variantName"
                          value={variant.name}
                          placeholder="Nhập tên biến thể"
                          onChange={(e) => {
                            handleChangeVariant(index, "name", e.target.value);
                          }}
                          className="mb-1"
                        />
                        <Form.Control
                          type="number"
                          name="price"
                          min={0}
                          value={variant.price}
                          placeholder="Nhập giá tiền"
                          onChange={(e) => {
                            handleChangeVariant(
                              index,
                              "price",
                              Number(e.target.value),
                            );
                          }}
                        />
                      </div>
                      <Button
                        size="sm"
                        className="delete-btn-dish-variant"
                        disabled={dishVariants.length === 1 ? true : false}
                        onClick={(e: React.MouseEvent) => {
                          deleteDishVariant(e, index);
                        }}
                      >
                        Xóa
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Form.Group>
            <Form.Group>
              <label htmlFor="dish-image">add dish image</label>
              <input
                id="dish-image"
                type="file"
                hidden
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleAddNewDishImg(e);
                  const file = e.target?.files?.[0];
                  if (file) {
                    handleChangeDish("image", file);
                  }
                }}
              />

              <div className="wrapping-img-preview">
                {imgPreview === "" ? (
                  "Image Preview"
                ) : (
                  <img src={imgPreview} alt="" className="img-preview" />
                )}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              resetForm();
              handleClickCloseModal();
            }}
          >
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleClickAddNewDish(newDish, dishVariants);
              resetForm();
            }}
          >
            Thêm món ăn
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateDish;
