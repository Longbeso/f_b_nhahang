import Table from "react-bootstrap/Table";
import type { User } from "../../../types/user.type";
import "./manageUser.css";
const TableUser = (prov: any) => {
  const {
    listUser,
    handleClickDeleteUser,
    listUserDeleted,
    modal,
    handleClickRestoreUser,
    handleClickUserDetail,
  } = prov;

  const showListUser = (user: User) => {
    return (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.userName}</td>
        <td>{user.role}</td>
        <td>
          {modal.delete === false ? (
            <>
              <button
                className="btn btn-danger"
                onClick={() => {
                  const result = confirm(
                    "Bạn có chắc muốn xóa người dùng này không",
                  );
                  if (result) {
                    handleClickDeleteUser(user.id);
                  }
                }}
              >
                Delete
              </button>
              <button
                className="btn btn-info margin-button"
                onClick={() => {
                  handleClickUserDetail(user.id);
                }}
              >
                Thông tin chi tiết
              </button>
            </>
          ) : (
            <button
              className="btn btn-success"
              onClick={() => {
                handleClickRestoreUser(user.id);
              }}
            >
              Restore
            </button>
          )}
        </td>
      </tr>
    );
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          <th>userName</th>
          <th>role</th>
        </tr>
      </thead>
      <tbody>
        {modal.delete === false
          ? listUser.map((user: User) => {
              return showListUser(user);
            })
          : listUserDeleted.map((user: User) => {
              return showListUser(user);
            })}
      </tbody>
    </Table>
  );
};

export default TableUser;
