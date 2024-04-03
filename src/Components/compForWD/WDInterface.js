 import { Route, Routes } from "react-router-dom";
import { Profile } from "../myProfile";
import { Home } from "../home";
 
import { Settings } from "../settings";
import { Engage } from "./engage";
import { HelpDesk } from "./helpdesk";
 
import { Todo } from "../todo";
import { People } from "./people";
import { Documents } from "./documents";
import { Attendance } from "../compForCSM/attendance";
import { Workflow } from "./workflow";
import { Salary } from "./salary";
import { Leave } from "./leave";
 

export const WDRoutes=()=>{
    return (<Routes>
         
        <Route path="/engage" element={ <Engage  />}></Route>
    
 
 
 
        <Route path="/helpdesk" element={ <HelpDesk   />}></Route>
                <Route path="/salary" element={ <Salary   />}></Route>
   
        <Route path="/attendance" element={ < Attendance  />}></Route>
        <Route path="/todo" element={ <Todo   />}></Route>
   <Route path="/documents" element={ <Documents   />}></Route>
        <Route path="/people" element={ < People   />}></Route>
               <Route path="/leave" element={ < Leave   />}></Route>
         <Route path="/" element={ <Home   />} ></Route>
    <Route path="/myProfile" element={ <Profile   />}></Route>
   
        <Route path="/settings" element={ <Settings   />}></Route>
          <Route path="/workflow" element={ <Workflow  />}></Route>
    </Routes>)
}