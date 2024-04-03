import { Route, Routes } from "react-router-dom"
import {   CalendarComp } from "../compForTL/calendar"
import { Home } from "../home"
import { Profile } from "../myProfile"
import { Settings } from "../settings"
import { Manage } from "./manage"
import { Employees } from "./employees"
import { Attendance } from "../compForCSM/attendance"

export const AdminRoutes=()=>{
    return (<Routes>
               
         
     
        <Route path="/calendar" element={ <CalendarComp  page={"calendar"}/>}></Route>
          <Route path="/manage" element={ <Manage  page={"manage"}/>}></Route>
           <Route path="/employees" element={ <Employees  page={"Employees"}/>}></Route>
            <Route path="/attendance" element={ <Attendance  page={"Attendance"}/>}></Route>
        
        
         <Route path="/" element={ <Home   />} ></Route>
    <Route path="/myProfile" element={ <Profile page={"info"}/>}></Route>
   
        <Route path="/settings" element={ <Settings  page={"settings"}/>}></Route>
         
    </Routes>)
}