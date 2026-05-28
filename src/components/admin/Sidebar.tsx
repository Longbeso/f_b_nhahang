import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
// SubMenu
import "./Sidebar.css";
import { Link } from "react-router-dom";
const SideBar = (prop: any) => {
  const { collapsed } = prop;
  return (
    <div className="side-bar">
      <Sidebar collapsed={collapsed}>
        <Menu>
          {/* <SubMenu label="USER">
            <MenuItem> Pie charts </MenuItem>
            <MenuItem> Line charts </MenuItem>
          </SubMenu> */}
          <MenuItem component={<Link to="user" />}> USER </MenuItem>
          <MenuItem component={<Link to="menu" />}> MENU </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
