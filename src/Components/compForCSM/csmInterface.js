import { Route, Routes } from "react-router-dom";
import { Home } from "../home";
import { Profile } from "../myProfile";
import { Settings } from "../settings";
import { RequestForm } from "./requestform";
import { Appraisals } from "./appraisals";
import {   CalendarComp } from "./calendar";
import { Attendance } from "./attendance";
import { Assessments } from "./assessments";
import { Tasks } from "./tasks";
 


export const CSMRoutes=()=>{
    return (<Routes>
         
        <Route path="/Tasks" element={ <Tasks  page={"dueTask"}/>}></Route>
 
        <Route path="/calendar" element={ <CalendarComp  page={"calendar"}/>}></Route>
   
        <Route path="/attendance" element={ < Attendance  page={"attendance"}/>}></Route>
        <Route path="/assessments" element={ < Assessments page={"assessments"}/>}></Route>
 
        <Route path="/appraisals" element={ < Appraisals  page={"appraisals"}/>}></Route>
         <Route path="/" element={ <Home   />} ></Route>
    <Route path="/myProfile" element={ <Profile  page={"info"}/>}></Route>
   
        <Route path="/settings" element={ <Settings  page={"settings"}/>}></Route>
          <Route path="/requestForm" element={ <RequestForm  />}></Route>
    </Routes>)
}