import { useEffect, useState } from "react";
import TableUser from "./TableUser";
import ModalCreateUser from "./ModalCreateUser";
import UserService from "../../../services/UserService";
import "./manageUser.css";
import { CiSquarePlus } from "react-icons/ci";
import { Bounce, toast, ToastContainer } from "react-toastify";
import UserProfileCard from "./UserProfile";

type Profile = {
  fullName: string;
  phone: string;
  address: string;
};

const ManageUser = () => {
  const [modal, setModal] = useState({
    create: false,
    update: false,
    view: false,
    delete: false,
  });
  const [listUser, setListUser] = useState([]);
  const [listUserDeleted, setListUserDeleted] = useState([]);
  const [userProfile, setUserProfile] = useState<Profile>();
  // fetch
  const fetchUser = async () => {
    const users = await UserService.getAllUser();
    setListUser(users.data);
  };

  const fetchUserDeleted = async () => {
    const users = await UserService.getUserDeleted();
    setListUserDeleted(users.data);
  };

  useEffect(() => {
    fetchUser();
    fetchUserDeleted();
  }, []);

  // handle business
  const handClickAddNewUser = () => {
    setModal((prev) => {
      return { ...prev, create: !modal.create };
    });
  };

  const handleClickDeleteUser = async (id: number) => {
    try {
      const deleteResult = await UserService.softDeleteUser(id);
      if (deleteResult.data?.affected >= 1) {
        toast.info("Xóa user thành công");
      }
    } catch (err) {
      toast.warning("Không thể xóa user này");
    }
    fetchUser();
    fetchUserDeleted();
  };

  const handleClickRestoreUser = async (id: number) => {
    const restoreResult = await UserService.restoreUser(id);
    if (restoreResult.data?.Result >= 1) {
      toast.info("Khôi phục user thành công");
    }
    fetchUser();
    fetchUserDeleted();
  };

  const handleCloseProfile = () => {
    setModal((prev) => ({
      ...prev,
      view: false,
    }));
  };

  const handleClickUserDetail = async (userId: number) => {
    const profile = await UserService.getUserProfile(userId);
    setUserProfile(profile.data);
    setModal((prev) => ({
      ...prev,
      view: true,
    }));
  };

  return (
    <div>
      <div className="manage-user">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="manage-user-header">
                <div className="tittle">Manage User</div>
                <div className="user-content p-1">
                  <button
                    className="btn btn-primary margin-button"
                    onClick={handClickAddNewUser}
                  >
                    Add new User <CiSquarePlus />
                  </button>
                  <button
                    className="btn btn-primary margin-button"
                    onClick={() => {
                      setModal((prev) => ({
                        ...prev,
                        delete: !prev.delete,
                      }));
                    }}
                  >
                    {modal.delete === true
                      ? "Người dùng đang hoạt động"
                      : "Người dùng đã bị xóa"}{" "}
                  </button>
                </div>
              </div>
              <div className="table-user">
                <TableUser
                  listUser={listUser}
                  listUserDeleted={listUserDeleted}
                  handleClickDeleteUser={handleClickDeleteUser}
                  modal={modal}
                  handleClickRestoreUser={handleClickRestoreUser}
                  handleClickUserDetail={handleClickUserDetail}
                />

                <ModalCreateUser
                  modal={modal}
                  setModal={setModal}
                  fetchUser={fetchUser}
                />
                <UserProfileCard
                  handleCloseProfile={handleCloseProfile}
                  userProfile={userProfile}
                  modal={modal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default ManageUser;
