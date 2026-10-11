import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { GrEdit } from "react-icons/gr";
import type { IDishVariant } from "../dto/DishVariant.dto";
import { useForm, useFieldArray } from "react-hook-form";

type props = {
  dishId: number;
  dishVariantsBefore: IDishVariant[];
  handleUpdateVariant: (
    listDishVariant: IDishVariant[],
    dishId: number,
  ) => void;
};

type FormData = {
  dishVariants: IDishVariant[];
};
const ModalCreateUpdateVariant = ({
  dishVariantsBefore,
  handleUpdateVariant,
  dishId,
}: props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { dishVariants: dishVariantsBefore },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dishVariants",
  });

  const [dishVariantDefaultIndex, setDishVariantDefaultIndex] =
    useState<number>(0);

  const addNewDishVariant = (e: React.MouseEvent) => {
    e.preventDefault();
    append({ name: "", price: 0, isDefault: false, id: 0 });
  };

  const handleClickVariantDefault = (index: number) => {
    setDishVariantDefaultIndex(index);
  };

  const deleteDishVariant = (e: React.MouseEvent, index: number) => {
    e.preventDefault();

    if (fields.length === 1) return;

    remove(index);

    if (index < dishVariantDefaultIndex) {
      // nếu xóa trước thì trừ cái index default 1 đơn vị
      // ví dụ xóa cái index 1 mà cái index 3 là default thì default chuyển thành 2
      setDishVariantDefaultIndex((prev) => prev - 1);
    } else if (index === dishVariantDefaultIndex) {
      setDishVariantDefaultIndex(0);
    }
  };

  // React Hook Form sẽ thu thập giá trị của tất cả các input đã register()
  // sau đó truyền vào hàm onSubmit
  const onSubmit = (data: FormData) => {
    const updatedDishVariants = data.dishVariants.map((variant, index) => ({
      ...variant,
      isDefault: index === dishVariantDefaultIndex,
    }));

    handleUpdateVariant(updatedDishVariants, dishId);

    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} style={{ height: "100%" }}>
        <GrEdit />
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật biến thể món ăn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <div className="header-dish-variant">
                <Form.Label>Biến thể món ăn</Form.Label>
                <Button
                  type="button"
                  size="sm"
                  className="btn btn-primary"
                  onClick={addNewDishVariant}
                >
                  Thêm biến thể
                </Button>
              </div>
              <div className="list-dish-variant">
                {fields.map((field, index) => {
                  return (
                    <div key={field.id} className="dish-variant-item">
                      <div className="dish-variant-form">
                        <Form.Control
                          type="text"
                          placeholder="Nhập tên món"
                          autoFocus
                          // dishvariants.3.name và dishvariants[3].name là như nhau
                          {...register(`dishVariants.${index}.name`, {
                            required: "Tên biến thể không được để trống",

                            // validate theo điều kiện ta tự định nghĩa
                            // value là giá trị người dùng nhập nó tự lấy cho mình
                            validate: (value) =>
                              value.trim() !== "" ||
                              "Tên biến thể không được để trống",
                          })}
                          className="mb-1"
                        />
                        {errors.dishVariants?.[index]?.name && (
                          <span>
                            {errors.dishVariants[index]?.name.message}
                          </span>
                        )}
                        <Form.Control
                          type="number"
                          min={0}
                          {...register(`dishVariants.${index}.price`, {
                            valueAsNumber: true,
                            required: "Giá không được để trống",
                            min: {
                              value: 0,
                              message: "Giá không được nhỏ hơn 0",
                            },
                          })}
                        />
                        {errors.dishVariants?.[index]?.price && (
                          <span>
                            {errors.dishVariants[index]?.price.message}
                          </span>
                        )}
                      </div>
                      <label
                        htmlFor={`radio${index}`}
                        className="label-choose-dishDefault"
                      >
                        <input
                          id={`radio${index}`}
                          type="radio"
                          name="defaultVariant"
                          checked={index === dishVariantDefaultIndex}
                          onChange={() => {
                            handleClickVariantDefault(index);
                          }}
                        />
                        món mặc định
                      </label>
                      <Button
                        type="button"
                        size="sm"
                        className="delete-btn-dish-variant"
                        disabled={fields.length === 1 ? true : false}
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
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCreateUpdateVariant;
