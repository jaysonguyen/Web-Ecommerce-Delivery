import "./App.css";
import "./assets/css/plugin.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js";
import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";

import { StaffScreen } from "./pages/admin/staff/StaffScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<StaffScreen />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
