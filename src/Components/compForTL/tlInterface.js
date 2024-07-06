import { Route, Routes } from "react-router-dom"
 
import  { CalendarComp } from "./calendar"
import { Attendance } from "./attendance"
import { Assessments } from "./assessments"
import { Appraisals } from "./appraisals"
import { Home } from "../home"
import { Profile } from "../myProfile"
import { Settings } from "../settings"
import {Team} from './team';

 import {NewTask }from './newTask.js';
 
import { Reports } from "./reports.js"
import { DueTask } from "./dueTask.js"
import { Todo } from "./todo.js"
import { RequestForm } from "../compForCSM/requestform.js"

 
 

export const TLRoutes=()=>{
    return (<Routes>
         
        <Route path="/dueTask" element={ <DueTask  page={"dueTask"}/>}></Route>
 
        <Route path="/calendar" element={ <CalendarComp  page={"calendar"}/>}></Route>
        <Route path="/reports" element={ <Reports  page={"reports"}/>}></Route>
        <Route path="/attendance" element={ < Attendance  page={"attendance"}/>}></Route>
        <Route path="/assessments" element={ < Assessments page={"assessments"}/>}></Route>
         <Route path="/todo" element={ < Todo page={"ToDo"}/>}></Route>
 
        <Route path="/appraisals" element={ < Appraisals  page={"appraisals"}/>}></Route>
         <Route path="/" element={ <Home   />} ></Route>
        <Route path="/myProfile" element={ <Profile  page={"info"}/>}></Route>
         <Route path="/team" element={ <Team  page={"team"}/>}></Route>
          <Route path="/requestForm" element={ <RequestForm  page={"form"}/>}></Route>
        
   
        <Route path="/settings" element={ <Settings  page={"settings"}/>}></Route>
        <Route path="/newTask" element={ <NewTask  />}></Route>
    </Routes>)
}