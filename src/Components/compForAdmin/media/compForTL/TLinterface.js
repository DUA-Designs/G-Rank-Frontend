import { Route, Routes } from "react-router-dom";
import { NewTask } from "./newTask";
import { DueTask } from "./dueTask";
import { Todo } from "../todo";
import { Calendar } from "./calendar";
import { Team } from "./team";
import { Attendance } from "./attendance";
import { Assessments } from "./assessments";
import { Reports } from "./reports";
import { Appraisals } from "./appraisals";
import { Home } from "../home";
import { Profile } from "../myProfile";
import { Settings } from "../settings";
import { RequestForm } from "../compForCSM/requestform";


export const TLRoutes=()=>{
    return (<Routes>
               <Route path="/newTask" element={  <NewTask    page={"newTask"}/>}></Route>
        <Route path="/dueTask" element={ <DueTask  page={"dueTask"}/>}></Route>
        <Route path="/todo" element={ <Todo  page={"todo"}/>}></Route>
        <Route path="/calendar" element={ <Calendar  page={"calendar"}/>}></Route>
        <Route path="/team" element={ <Team  page={"team"}/>}></Route>
        <Route path="/attendance" element={ < Attendance  page={"attendance"}/>}></Route>
        <Route path="/assessments" element={ < Assessments page={"assessments"}/>}></Route>
        <Route path="/reports" element={ < Reports  page={"reports"}/>}></Route>
        <Route path="/appraisals" element={ < Appraisals  page={"appraisals"}/>}></Route>
         <Route path="/" element={ <Home   />} ></Route>
    <Route path="/myProfile" element={ <Profile page={"info"}/>}></Route>
   
        <Route path="/settings" element={ <Settings  page={"settings"}/>}></Route>
          <Route path="/requestForm" element={ <RequestForm  />}></Route>
    </Routes>)
}