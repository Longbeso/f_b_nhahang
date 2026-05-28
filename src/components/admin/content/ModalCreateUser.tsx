import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import UserService from "../../../services/UserService";
const ModalCreateUser = (prov: any) => {
  const { modal, setModal, fetchUser } = prov;
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [role, setRole] = useState("");
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
    setRole(e.target.value);
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
              <Form.Label>Email address</Form.Label>
              <Form.Control
                placeholder="Enter UserName"
                name="userName"
                value={userName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUserName(e.target.value);
                }}
              />
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
              />
            </Form.Group>
            <Form.Select aria-label="select role" onChange={handleSelectRole}>
              <option>select role for user</option>
              <option value="WAITER">Waiter</option>
              <option value="CHEF">Chef</option>
            </Form.Select>
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
