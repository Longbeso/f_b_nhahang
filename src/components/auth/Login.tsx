import { Form, Button, Card, Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/AuthService";
import "./login.css";
import { Bounce, toast, ToastContainer } from "react-toastify";
const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const result = await AuthService.login({ userName, passWord });
      localStorage.setItem("accessToken", result.data.accessToken);
      if (result.data.infor.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/waiter");
      }
    } catch (err) {
      toast.error("Mật khẩu hoặc tên đăng nhập sai !!!");
    }
  };

  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center vh-100 container_login"
      >
        <Card className="login-card shadow-lg p-4">
          <Card.Body>
            <h3 className="text-center mb-4">Đăng nhập</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Tên đăng nhập</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={passWord}
                  onChange={(e) => {
                    setPassWord(e.target.value);
                  }}
                />
              </Form.Group>
              <Button
                type="submit"
                variant="primary"
                className="w-100 margin_top"
                onClick={(e) => {
                  handleLogin(e);
                }}
              >
                Đăng nhập
              </Button>
              <div className="end-line">
                Đăng nhập để sử dụng tính năng của ứng dụng
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
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

export default Login;
