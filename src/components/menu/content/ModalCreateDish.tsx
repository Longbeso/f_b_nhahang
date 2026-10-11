import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import type { CategoryDTO } from "../dto/Category.dto";
import type { CreateDish } from "../../../services/dto/CreateDish.dto";
import type { CreateDishVariant } from "../../../services/dto/CreateDishVariant.dto";
import { CiCirclePlus } from "react-icons/ci";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useFieldArray, useForm } from "react-hook-form";

type DataSubmit = {
  dishData: CreateDish;
  listDishVariant: CreateDishVariant[];
};

type ChildProps = {
  handleClickCloseModal: () => void;
  handleClickShowModal: () => void;
  handleClickAddNewDish: (
    dishData: CreateDish,
    listDishVariant: CreateDishVariant[],
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
  // =========================
  // React Hook Form
  // =========================

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<DataSubmit>({
    defaultValues: {
      dishData: {
        name: "",
        description: "",
        categoryId: 0,
        image: "",
      },

      listDishVariant: [
        {
          name: "",
          price: "0",
          isDefault: false,
          dishId: 0,
        },
      ],
    },
  });

  // =========================
  // Quản lý danh sách variant
  // =========================

  const { fields, append, remove } = useFieldArray({
    control,
    name: "listDishVariant",
  });

  // =========================
  // State chỉ dùng cho UI
  // =========================

  // Preview ảnh
  const [imgPreview, setImgPreview] = useState<string>("");

  // Index của variant mặc định
  const [dishVariantIndexDefault, setDishVariantIndexDefault] =
    useState<number>(0);

  // =========================
  // Thêm variant
  // =========================

  const addNewDishVariant = () => {
    append({
      name: "",
      price: "0",
      isDefault: false,
      dishId: 0,
    });
  };

  // =========================
  // Xóa variant
  // =========================

  const deleteDishVariant = (index: number) => {
    if (fields.length === 1) {
      return;
    }

    remove(index);

    // Nếu xóa variant mặc định
    if (index === dishVariantIndexDefault) {
      setDishVariantIndexDefault(0);
    }

    // Nếu xóa variant đứng trước variant mặc định
    if (index < dishVariantIndexDefault) {
      setDishVariantIndexDefault((prev) => prev - 1);
    }
  };

  // =========================
  // Chọn variant mặc định
  // =========================

  const handleClickVariantDefault = (index: number) => {
    setDishVariantIndexDefault(index);
  };

  // =========================
  // Xử lý ảnh
  // =========================

  const handleAddNewDishImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Tạo URL để preview
    const imgUrl = URL.createObjectURL(file);

    setImgPreview(imgUrl);

    // Đưa file vào React Hook Form

    setValue("dishData.image", file as CreateDish["image"], {
      // "TypeScript, hãy coi file có kiểu giống với kiểu của thuộc tính image trong CreateDish."
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // =========================
  // Submit
  // =========================

  const onSubmit = async (data: DataSubmit) => {
    // Tạo lại list variant để xác định variant mặc định
    const listDishVariant = data.listDishVariant.map((variant, index) => ({
      ...variant,
      isDefault: index === dishVariantIndexDefault,
    }));

    try {
      await handleClickAddNewDish(data.dishData, listDishVariant);

      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi tạo món ăn");
    }
  };

  // =========================
  // Reset form
  // =========================

  const resetForm = () => {
    reset({
      dishData: {
        name: "",
        description: "",
        categoryId: 0,
        image: "",
      },

      listDishVariant: [
        {
          name: "",
          price: "0",
          isDefault: false,
          dishId: 0,
        },
      ],
    });

    setImgPreview("");
    setDishVariantIndexDefault(0);
  };

  // =========================
  // Đóng modal
  // =========================

  const handleCloseModal = () => {
    resetForm();
    handleClickCloseModal();
  };

  return (
    <>
      {/* Nút mở modal */}
      <Button variant="primary" onClick={handleClickShowModal}>
        Thêm món ăn
      </Button>

      <Modal show={isShowModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thêm món ăn</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form id="create-dish-form" onSubmit={handleSubmit(onSubmit)}>
            {/* ========================= */}
            {/* Tên món */}
            {/* ========================= */}

            <Form.Group className="mb-3" controlId="dishName">
              <Form.Label>Tên món ăn</Form.Label>

              <Form.Control
                type="text"
                placeholder="Nhập tên món"
                autoFocus
                {...register("dishData.name", {
                  required: "Tên món không được để trống",

                  // validate theo điều kiện ta tự định nghĩa
                  // value là giá trị người dùng nhập nó tự lấy cho mình
                  validate: (value) =>
                    value.trim() !== "" || "Tên món không được để trống",
                })}
              />

              {errors.dishData?.name && (
                <p className="text-danger">{errors.dishData.name.message}</p>
              )}
            </Form.Group>

            {/* ========================= */}
            {/* Mô tả */}
            {/* ========================= */}

            <Form.Group className="mb-3" controlId="dishDescription">
              <Form.Label>Mô tả món ăn</Form.Label>

              <Form.Control
                type="text"
                placeholder="Nhập mô tả món ăn"
                {...register("dishData.description", {
                  required: "Mô tả món không được để trống",

                  validate: (value) =>
                    value.trim() !== "" || "Mô tả món không được để trống",
                })}
              />

              {errors.dishData?.description && (
                <p className="text-danger">
                  {errors.dishData.description.message}
                </p>
              )}
            </Form.Group>

            {/* ========================= */}
            {/* Category */}
            {/* ========================= */}

            <Form.Group className="mb-3" controlId="dishCategory">
              <Form.Label>Loại món ăn</Form.Label>

              <Form.Select
                {...register("dishData.categoryId", {
                  valueAsNumber: true,

                  validate: (value) => value !== 0 || "Hãy chọn loại món ăn",
                })}
              >
                <option value={0}>Chọn loại món ăn</option>

                {categories.map((cate) => (
                  <option key={cate.id} value={cate.id}>
                    {cate.name}
                  </option>
                ))}
              </Form.Select>

              {errors.dishData?.categoryId && (
                <p className="text-danger">
                  {errors.dishData.categoryId.message}
                </p>
              )}
            </Form.Group>

            {/* ========================= */}
            {/* Dish Variant */}
            {/* ========================= */}

            <Form.Group className="mb-3" controlId="dishVariants">
              <div className="header-dish-variant">
                <Form.Label>Biến thể món ăn</Form.Label>

                <Button
                  type="button"
                  size="sm"
                  variant="primary"
                  onClick={addNewDishVariant}
                >
                  Thêm biến thể
                </Button>
              </div>

              <div className="list-dish-variant">
                {fields.map((field, index) => (
                  <div key={field.id} className="dish-variant-item">
                    {/* Form variant */}
                    <div className="dish-variant-form">
                      {/* Tên variant */}

                      <Form.Control
                        type="text"
                        placeholder="Nhập tên biến thể"
                        className="mb-1"
                        {...register(`listDishVariant.${index}.name`, {
                          required: "Tên biến thể không được để trống",

                          validate: (value) =>
                            value.trim() !== "" ||
                            "Tên biến thể không được để trống",
                        })}
                      />

                      {errors.listDishVariant?.[index]?.name && (
                        <p className="text-danger">
                          {errors.listDishVariant[index]?.name?.message}
                        </p>
                      )}

                      {/* Giá variant */}

                      <Form.Control
                        type="number"
                        min={0}
                        placeholder="Nhập giá tiền"
                        {...register(`listDishVariant.${index}.price`, {
                          required: "Giá món không được để trống",

                          validate: (value) => {
                            if (value.trim() === "") {
                              return "Giá món không được để trống";
                            }

                            if (Number.isNaN(Number(value))) {
                              return "Giá món phải là số";
                            }

                            if (Number(value) <= 0) {
                              return "Giá món phải lớn hơn 0";
                            }

                            return true;
                          },
                        })}
                      />

                      {errors.listDishVariant?.[index]?.price && (
                        <p className="text-danger">
                          {errors.listDishVariant[index]?.price?.message}
                        </p>
                      )}
                    </div>

                    {/* Variant mặc định */}

                    <label
                      htmlFor={`radio${index}`}
                      className="label-choose-dishDefault"
                    >
                      <input
                        id={`radio${index}`}
                        type="radio"
                        name="defaultVariant"
                        checked={dishVariantIndexDefault === index}
                        onChange={() => handleClickVariantDefault(index)}
                      />
                      món mặc định
                    </label>

                    {/* Xóa variant */}

                    <Button
                      type="button"
                      size="sm"
                      variant="danger"
                      className="delete-btn-dish-variant"
                      disabled={fields.length === 1}
                      onClick={() => deleteDishVariant(index)}
                    >
                      Xóa
                    </Button>
                  </div>
                ))}
              </div>
            </Form.Group>

            {/* ========================= */}
            {/* Image */}
            {/* ========================= */}

            <Form.Group>
              <label htmlFor="dish-image" className="dish-image">
                <CiCirclePlus /> add dish image
              </label>

              <input
                id="dish-image"
                type="file"
                hidden
                accept="image/*"
                onChange={handleAddNewDishImg}
              />

              <div className="wrapping-img-preview">
                {imgPreview === "" ? (
                  "Image Preview"
                ) : (
                  <img
                    src={imgPreview}
                    alt="Dish preview"
                    className="img-preview"
                  />
                )}
              </div>

              {errors.dishData?.image && (
                <p className="text-danger">{errors.dishData.image.message}</p>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>

        {/* ========================= */}
        {/* Footer */}
        {/* ========================= */}

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Hủy
          </Button>

          <Button type="submit" form="create-dish-form" variant="primary">
            Thêm món ăn
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default ModalCreateDish;
