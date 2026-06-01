import { Button, Modal } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

// type Profile = {
//   fullName: string;
//   phone: string;
//   address: string;
// };

// type UserCardProps = {
//   profile: Profile;
// };

const UserProfileCard = (prop: any) => {
  const { userProfile, modal, handleCloseProfile } = prop;
  return (
    <Modal show={modal.view} onHide={handleCloseProfile} centered>
      <Modal.Header closeButton>
        <Modal.Title>Thông tin người dùng</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3">
          <h4 className="fw-bold text-primary mb-1">{userProfile?.fullName}</h4>

          <span className="text-muted">Chi tiết thông tin cá nhân</span>
        </div>

        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Số điện thoại:</strong> {userProfile?.phone}
          </ListGroup.Item>

          <ListGroup.Item>
            <strong>Địa chỉ:</strong> {userProfile?.address}
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseProfile}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserProfileCard;
