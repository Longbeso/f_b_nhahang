import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import "./CRUDUser.css";
import UserService from "../../../services/UserService";
const ModalCreateUser = (prov: any) => {
  const { modal, setModal, fetchUser } = prov;
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [role, setRole] = useState("");

  // sửa lại chỗ đặt hàm handle ==> đưa qua component cha
  // đưa các hàm xử lý qua component cha

  const handleClose = () => {
    setModal((prev: any) => ({
      ...prev,
      create: false,
    }));
    setUserName("");
    setPassWord("");
  };

  const handleAddUser = async () => {
    await UserService.createUser({
      userName: userName,
      passWord: passWord,
      role: role,
    });
    handleClose();
    fetchUser();
  };

  const handleSelectRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pSelectRoleWarning = document.querySelector(".warning-select-role");
    if (e.target.value === "select role for user") {
      if (
        pSelectRoleWarning &&
        pSelectRoleWarning instanceof HTMLParagraphElement
      ) {
        pSelectRoleWarning.style.display = "block";
      }
    } else {
      if (
        pSelectRoleWarning &&
        pSelectRoleWarning instanceof HTMLParagraphElement
      ) {
        pSelectRoleWarning.style.display = "none";
      }
      setRole(e.target.value);
    }
  };

  const handleBlurPassword = () => {
    const pPassWordWarning = document.querySelector(".warning-enter-password");
    if (passWord.length < 8) {
      if (
        pPassWordWarning &&
        pPassWordWarning instanceof HTMLParagraphElement
      ) {
        pPassWordWarning.style.display = "block";
      }
      // thêm cái toast để thông báo nếu cái trên lỗi
    } else {
      if (
        pPassWordWarning &&
        pPassWordWarning instanceof HTMLParagraphElement
      ) {
        pPassWordWarning.style.display = "none";
      }
    }
  };

  return (
    <>
      <Modal show={modal.create} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                placeholder="Enter UserName"
                name="userName"
                value={userName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUserName(e.target.value);
                }}
              />
              <p className="warning-enter-username"></p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={passWord}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassWord(e.target.value);
                }}
                onBlur={() => {
                  handleBlurPassword();
                }}
              />
              <p className="warning-enter-password">
                passWord must be have more 8 character
              </p>
            </Form.Group>
            <Form.Select aria-label="select role" onBlur={handleSelectRole}>
              <option>select role for user</option>
              <option value="WAITER">Waiter</option>
              <option value="CHEF">Chef</option>
              <option value="ADMIN">ADMIN</option>
            </Form.Select>
            <p className="warning-select-role">select role please</p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
