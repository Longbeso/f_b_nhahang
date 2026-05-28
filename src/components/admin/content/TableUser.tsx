import Table from "react-bootstrap/Table";
import type { User } from "../../../types/user.type";
const TableUser = (prov: any) => {
  const { listUser } = prov;
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
        {listUser.map((user: User) => {
          return (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.role}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableUser;
