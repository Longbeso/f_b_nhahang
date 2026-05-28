import { useEffect, useState } from "react";
import TableUser from "./TableUser";
import ModalCreateUser from "./ModalCreateUser";
import UserService from "../../../services/UserService";
import "./manageUser.css";
import { CiSquarePlus } from "react-icons/ci";

const ManageUser = () => {
  const [modal, setModal] = useState({
    create: false,
    update: false,
    view: false,
    delete: false,
  });
  const [listUser, setListUser] = useState([]);
  const handClickAddNewUser = () => {
    setModal((prev) => {
      return { ...prev, create: !modal.create };
    });
  };

  const fetchUser = async () => {
    const res = await UserService.getAllUser();
    setListUser(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <div className="manage-user">
        <div className="manage-user-header">
          <div className="tittle">Manage User</div>
          <div className="user-content">
            <button className="btn btn-primary" onClick={handClickAddNewUser}>
              Add new User <CiSquarePlus />
            </button>
          </div>
        </div>
        <div className="table-user">
          <TableUser listUser={listUser} />
          <ModalCreateUser
            modal={modal}
            setModal={setModal}
            fetchUser={fetchUser}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
