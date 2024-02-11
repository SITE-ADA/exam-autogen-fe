import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import Admin from "./components/Admin/Admin";
import RequireAuth from "./components/PrivateRoute/RequireAuth";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import AdminGeneral from "./components/Admin-General/AdminGeneral";
import AdminSettings from "./components/Admin-Settings/AdminSettings";
import Sidebar from "./components/SideBar/SideBar";

function App() {

  const UserTypes = 
  {
    'ADMIN' : 1,
    'INSTITUTION_REPRESENTATIVE' : 2,
    'PARENT' : 3,
    'STUDENT' : 4,
    'INSTRUCTOR' : 5,
    'TEACHING_ASSISTANT' : 6,
    'TUTOR' : 7
  }

  return (
      <div className="App">
        <Routes>
          <Route path="/" index element={<LoginForm />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path="/Admin" element={<Admin/>}>
          {/*<Route element={<RequireAuth allowedRole={UserTypes.ADMIN} />}>
            <Route path="/Admin" element={<Admin />} />
  </Route> */}
            <Route path="" element={<AdminGeneral/>}/>
            <Route path="General" element={<AdminGeneral />}/>
            <Route path="Settings" element={<AdminSettings />} />
          </Route>
          <Route path="/InstitutionRepresentative" element={<div>Institution Representative Page</div>} />
        </Routes>
      </div>
  );
}

export default App;
