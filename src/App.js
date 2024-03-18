import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import Admin from "./components/Admin/Admin";
import AdminGeneral from "./components/Admin-General/AdminGeneral";
import AdminSettings from "./components/Admin-Settings/AdminSettings";
import { ToastContainer, toast } from "react-toastify";
import RequireAuth from "./components/PrivateRoute/RequireAuth";
import InstitutionRepresentative from "./components/InstitutionRepresentative/InstitutionRepresentative";
import InstRepInstructor from "./components/InstRep-Instructors/InstRepInstructor";
import InstRepSubject from "./components/InstRep-Subjects/InstRepSubject";
import AdminInstitution from "./components/Admin-Institutions/AdminInstitution";
import NotAuthorized from "./components/NotAuthorized/NotAuthorized";
import Instructor from "./components/Instructor/Instructor";
import Subjects from "./components/Instructor/Subjects/Subjects";
import QuestionPools from "./components/Instructor/QuestionPools/QuestionPools";
import QuestionPool from './components/Instructor/QuestionPools/QuestionPool/QuestionPool';
import CreateEditQuestion from "./components/Instructor/QuestionPools/QuestionPool/CreateQuestion/CreateEditQuestion";
import RequestedPageNotFound from "./components/NotFound/RequestedPageNotFound";

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

          <Route element={<RequireAuth allowedRole={UserTypes.ADMIN}/>} >
          <Route path="/Admin" element={<Admin/>}> 
              <Route path="" element={<AdminGeneral/>}/>
              <Route path="General" element={<AdminGeneral />}/>
              <Route path="Settings" element={<AdminSettings />} />
              <Route path="Institutions" element={<AdminInstitution />} />
          </Route>
          </Route>

          <Route element={<RequireAuth allowedRole={UserTypes.INSTITUTION_REPRESENTATIVE}/>}>
              <Route path="/InstitutionRepresentative" element={<InstitutionRepresentative />} >
                  <Route path="" element={<InstRepInstructor/>}/>
                  <Route path="Instructors" element={<InstRepInstructor />}/>
                  <Route path="Subjects" element={<InstRepSubject />} />
              </Route>
          </Route>

          <Route element={<RequireAuth allowedRole={UserTypes.INSTRUCTOR} />}>
            <Route path="/Instructor" element={<Instructor />} >
                <Route path="" index element={<QuestionPools />} />
                <Route path="QuestionPools" element={<QuestionPools />} >
                  <Route path="" index element={<QuestionPools />} />
                </Route>
                {/*<Route path="QuestionPools/CreateQuestionPool/:poolId" element={<CreateEditPool />} />
                <Route path="QuestionPools/EditQuestionPool/:poolId" element={<CreateEditPool />} /> */}
                <Route path="QuestionPools/:id"  element={<QuestionPool />} />
                <Route path="QuestionPools/:id/CreateQuestion/0" element={<CreateEditQuestion />} />
                <Route path="QuestionPools/:id/EditQuestion/:id" element={<CreateEditQuestion />} />
                <Route path="Subjects" element={<Subjects />} />
            </Route>

          </Route>

          <Route path="/NotAuthorized" element={<NotAuthorized />} />
          <Route path="*" element={<RequestedPageNotFound/>} />
        </Routes>
        <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

        
      </div>
  );
}

export default App;
