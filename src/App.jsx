import "./App.css";
import "./assets/css/plugin.css";
import { Outlet } from "react-router-dom";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";
import { Table } from "phosphor-react";
import { ICON_SIZE_BIG } from "./utils/constraint";
import { StaffScreen } from "./pages/admin/staff/StaffScreen";
import { Sidebar, AdminHeader } from "./components/index";
import { displaySelector } from "./selectors/displaySelector";
import { useSelector } from "react-redux";

function App() {
  const sidebarContent = [
    {
      icon: <Table size={ICON_SIZE_BIG} weight="fill" />,
      label: "Quản lý khách hàng",
      link: "/quanlykhachang",
    },
    {
      icon: <Table size={ICON_SIZE_BIG} weight="fill" />,
      label: "Quản lý đơn hàng",
      link: "/quanlydonhang",
    },
  ];
  const display = useSelector(displaySelector);
  return (
    <div className="app_container">
      {display.isShowSidebar && (
        <Sidebar
          show={true}
          heading="GiaoHangNhanh"
          isShowUser={true}
          tab={sidebarContent}
        />
      )}
      <div className="content_container">
        {display.isShowHeader && (
          <div>
            <AdminHeader />
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
}

export default App;
