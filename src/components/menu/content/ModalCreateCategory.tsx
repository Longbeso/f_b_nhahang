import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

type props = {
  handleAddNewCategory: (name: string) => void;
};

const ModalCreateCategory = ({ handleAddNewCategory }: props) => {
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const handleClose = () => {
    setShow(false);
    setCategoryName("");
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        thêm loại món ăn
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm loại món ăn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Loại món ăn</Form.Label>
              <Form.Control
                type="text"
                placeholder="loại món ví dụ: món chính, món tráng miệng"
                autoFocus
                value={categoryName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setCategoryName(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleAddNewCategory(categoryName);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateCategory;
