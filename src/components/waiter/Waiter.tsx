import "./waiter.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { RiArrowGoBackFill } from "react-icons/ri";

type Table = {
  id: number;
  seats: number;
  status: string;
};

const Waiter = () => {
  const [logoName, setLogoName] = useState<string>("");

  const handbleClickGoBack = () => {
    setLogoName("");
  };
  const tables: Table[] = [
    { id: 1, seats: 4, status: "Trống" },
    { id: 2, seats: 2, status: "Trống" },
    { id: 3, seats: 6, status: "Trống" },
    { id: 4, seats: 4, status: "Trống" },
    { id: 5, seats: 8, status: "Trống" },
    { id: 6, seats: 2, status: "Trống" },
    { id: 7, seats: 4, status: "Trống" },
    { id: 8, seats: 6, status: "Trống" },
    { id: 9, seats: 4, status: "Trống" },
    { id: 10, seats: 2, status: "Trống" },
    { id: 11, seats: 6, status: "Trống" },
    { id: 12, seats: 4, status: "Trống" },
    { id: 13, seats: 8, status: "Trống" },
    { id: 14, seats: 2, status: "Trống" },
    { id: 15, seats: 4, status: "Trống" },
    { id: 16, seats: 6, status: "Trống" },
  ];
  return (
    <>
      <div className="waiter_wrap">
        <div className="waiter_header">
          <Navbar className="bg-primary waiter-navbar ">
            <Container>
              {/* lấy dữ liệu bàn số bao nhiêu để add vào
               */}
              <Link
                to="/waiter"
                onClick={handbleClickGoBack}
                className="text-white me-2 fs-5"
              >
                {logoName != "" ? <RiArrowGoBackFill /> : ""}
              </Link>
              <Navbar.Brand className="text-white">
                {logoName || "Cơm tấm Leo"}
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="info"
                      id="dropdown-basic"
                      className="text-dark"
                    >
                      tên nhân viên
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Đăng xuất</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        Thông tin nhân viên
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
        <div className="waiter_container">
          <Outlet context={{ logoName, setLogoName, tables }} />
        </div>
      </div>
    </>
  );
};

export default Waiter;
