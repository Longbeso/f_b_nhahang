import { useState } from "react";
import "./dashboard.css";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { MdOutlineChairAlt } from "react-icons/md";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
<MdOutlineChairAlt />;

const data = [
  {
    day: "T2",
    revenue: 2500000,
  },
  {
    day: "T3",
    revenue: 3200000,
  },
  {
    day: "T4",
    revenue: 2800000,
  },
  {
    day: "T5",
    revenue: 4100000,
  },
  {
    day: "T6",
    revenue: 3800000,
  },
  {
    day: "T7",
    revenue: 5200000,
  },
  {
    day: "CN",
    revenue: 6100000,
  },
];

const Dashboard = () => {
  const [type, setType] = useState<string>("day");
  return (
    <div className="dashboard-container m-3">
      <div className="revenue-container p-3">
        <div className="revenue">
          <p className="fs-5">Doanh thu hôm nay</p>
          <h1 className="revenue fw-bold">83.405.000</h1>
          <p className="revenue-growth">tăng 20% so với hôm qua</p>
        </div>
        <div className="target-container me-2">
          <div className="target rounded-4 overflow-hidden me-2 d-flex justify-content-center">
            <div className="card target-card ">
              <div className="card-body text-bg-success">
                <h5 className="card-title">mục tiêu</h5>
                <p className="card-text">100.000.000</p>
              </div>
            </div>
          </div>
          <div className="target-progress rounded-4 overflow-hidden d-flex justify-content-center">
            <div className="card target-card">
              <div className="card-body text-bg-success">
                <h5 className="card-title">tiến độ</h5>
                <p className="card-text">83%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* các báo cáo về đơn hàng này kia kia nọ */}
      <div className="dashboard-stats mt-2 row g-2">
        <div className="col-12 col-md-4 col-lg">
          <div
            className="card card-body dashboard-stat-item p-3 d-flex flex-column justify-content-center"
            style={{ width: "100%", minHeight: "9rem" }}
          >
            <h5 className="card-icon">
              <HiOutlineClipboardDocumentList />
            </h5>
            <h4 className="card-text text-danger fw-bold">147</h4>
            <p className="card-text">số đơn hàng</p>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg">
          <div
            className="card card-body dashboard-stat-item p-3 d-flex flex-column justify-content-center"
            style={{ width: "100%", minHeight: "9rem" }}
          >
            <h5 className="card-icon">
              <HiOutlineClipboardDocumentList />
            </h5>
            <h4 className="card-text text-danger fw-bold">147</h4>
            <p className="card-text">số đơn hàng</p>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg">
          <div
            className="card card-body dashboard-stat-item p-3 d-flex flex-column justify-content-center"
            style={{ width: "100%", minHeight: "9rem" }}
          >
            <h5 className="card-icon">
              <HiOutlineClipboardDocumentList />
            </h5>
            <h4 className="card-text text-danger fw-bold">147</h4>
            <p className="card-text">số đơn hàng</p>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg">
          <div
            className="card card-body dashboard-stat-item p-3 d-flex flex-column justify-content-center"
            style={{ width: "100%", minHeight: "9rem" }}
          >
            <h5 className="card-icon">
              <HiOutlineClipboardDocumentList />
            </h5>
            <h4 className="card-text text-danger fw-bold">147</h4>
            <p className="card-text">số đơn hàng</p>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg">
          <div
            className="card card-body dashboard-stat-item p-3 d-flex flex-column justify-content-center"
            style={{ width: "100%", minHeight: "9rem" }}
          >
            <h5 className="card-icon">
              <HiOutlineClipboardDocumentList />
            </h5>
            <h4 className="card-text text-danger fw-bold">147</h4>
            <p className="card-text">số đơn hàng</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mt-2">
          <div className="col-6 p-1">
            <div className="charts1 ">
              <div className="chart-header d-flex justify-content-between mt-2 mx-2">
                <h3 className="text-white fw-bold">Doanh thu</h3>
                <div className="btn-group">
                  <button
                    type="button"
                    className={`btn ${
                      type === "day" ? "btn-primary" : "btn-outline-secondary"
                    }`}
                    onClick={() => setType("day")}
                  >
                    Ngày
                  </button>

                  <button
                    type="button"
                    className={`btn ${
                      type === "month" ? "btn-primary" : "btn-outline-secondary"
                    }`}
                    onClick={() => setType("month")}
                  >
                    Tháng
                  </button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={data}
                  margin={{
                    left: 30,
                    right: 20,
                    top: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="#ffffff"
                    strokeOpacity={0.1}
                  />
                  {/* <CartesianGrid stroke="#f5f5f5" /> */}

                  <XAxis dataKey="day" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="revenue" fill="#de8038" barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
