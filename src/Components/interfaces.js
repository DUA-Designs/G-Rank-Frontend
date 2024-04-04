import { Link } from "react-router-dom";
import { CSMRoutes } from "./compForCSM/csmInterface";
 
import { WDRoutes } from "./compForWD/WDInterface";
import { AdminRoutes } from "./compForAdmin/AdminInterface";
import { TLRoutes } from "./compForTL/tlInterface";



export const TeamLead =()=>{
    return (
        <ul className="nav-links">
          <li><Link className="myLinks" to={"/"}><span><i className="fi fi-tr-house-chimney"></i></span><span> Home</span></Link></li>
            <li><Link className="myLinks" to={"/newTask"}><span><i className="fi fi-ts-signal-stream"></i></span><span> newTask</span></Link></li>
            <li><Link className="myLinks" to={"/dueTask"}><span><i className="fi fi-ts-workflow-alt"></i></span><span>Due Task</span></Link></li>
            <li><Link className="myLinks" to={"/todo"}><span><i className="fi fi-tr-to-do"></i></span><span> To Do</span></Link></li>
            <li><Link className="myLinks" to={"/calendar"}><span><i className="fi fi-ts-wallet"></i></span><span> Calendar</span></Link></li>
            <li><Link className="myLinks" to={"/team"}><span><i className="fi fi-tr-calendar-day"></i></span><span> Team</span></Link></li>
            <li><Link className="myLinks" to={"/attendance"}><span><i className="fi fi-ts-calendar-check"></i></span><span> Attendance</span></Link></li>
            <li><Link className="myLinks" to={"/assessments"}><span><i className="fi fi-ts-poll-h"></i></span><span>Assessments</span></Link></li>
            <li><Link className="myLinks" to={"/reports"}><span><i className="fi fi-ts-people-arrows-left-right"></i></span><span> Reports</span></Link></li>
            <li><Link className="myLinks" to={"/appraisals"}><span><i className="fi fi-tr-seal-question"></i></span><span>Appraisals</span></Link></li>
        </ul>
    )
}
export const WebDev=()=>{
    return (<ul className="nav-links">
                             <li><Link className="myLinks" to={"/"}><span><i className="fi fi-tr-house-chimney"></i></span><span> Home</span></Link></li>
                              <li><Link className="myLinks" to={"/engage"}><span><i className="fi fi-ts-signal-stream"></i></span><span> Engage</span></Link></li>
                              <li><Link className="myLinks" to={"/todo"}><span><i className="fi fi-tr-to-do"></i></span><span> To Do</span></Link></li>
                              <li><Link className="myLinks" to={"/salary"}><span><i className="fi fi-ts-wallet"></i></span><span> Salary</span></Link></li>
                              <li><Link className="myLinks" to={"/leave"}><span><i className="fi fi-tr-calendar-day"></i></span><span> Leave</span></Link></li>
                              <li><Link className="myLinks" to={"/attendance"}><span><i className="fi fi-ts-calendar-check"></i></span><span> Attendance</span></Link></li>
                              <li><Link className="myLinks" to={"/documents"}><span><i className="fi fi-ts-poll-h"></i></span><span> Document Center</span></Link></li>
                              <li><Link className="myLinks" to={"/people"}><span><i className="fi fi-ts-people-arrows-left-right"></i></span><span> People</span></Link></li>
                              <li><Link className="myLinks" to={"/helpDesk"}><span><i className="fi fi-tr-seal-question"></i></span><span> Help Desk</span></Link></li>
                              <li><Link className="myLinks" to={"/workflow"}><span><i className="fi fi-ts-workflow-alt"></i></span><span> Workflow Delegates</span></Link></li>
    </ul>)
}

export const CSM=()=>{
    return (<ul className="nav-links">
                    

                            <li><Link className="myLinks" to={"/"}><span><i className="fi fi-tr-house-chimney"></i></span><span> Home</span></Link></li>
                              <li><Link className="myLinks" to={"/requestForm"}><span><i className="fi fi-ts-signal-stream"></i></span><span> Request Form</span></Link></li>
                              <li><Link className="myLinks" to={"/calendar"}><span><i className="fi fi-tr-to-do"></i></span><span> Calendar</span></Link></li>
                              <li><Link className="myLinks" to={"/dueTask"}><span><i className="fi fi-ts-wallet"></i></span><span> Due Task</span></Link></li>
                              <li><Link className="myLinks" to={"/attendance"}><span><i className="fi fi-tr-calendar-day"></i></span><span>Attendance</span></Link></li>
                              <li><Link className="myLinks" to={"/appraisals"}><span><i className="fi fi-ts-calendar-check"></i></span><span> Appraisals</span></Link></li>
                              <li><Link className="myLinks" to={"/assessments"}><span><i className="fi fi-ts-poll-h"></i></span><span> Assessments</span></Link></li>
    </ul>)


}

export const Admin=()=>{
    return (<ul className="nav-links">
                                <li><Link className="myLinks" to={"/"}><span><i className="fi fi-tr-house-chimney"></i></span><span> Home</span></Link></li>
                                 <li><Link className="myLinks" to={"/manage"}><span><i className="fi fi-tr-house-chimney"></i></span><span>Manage</span></Link></li>
                                 <li><Link className="myLinks" to={"/employees"}><span><i className="fi fi-tr-house-chimney"></i></span><span>Employees</span></Link></li>
            
                              <li><Link className="myLinks" to={"/calendar"}><span><i className="fi fi-tr-to-do"></i></span><span> Calendar</span></Link></li>
                              
                              <li><Link className="myLinks" to={"/attendance"}><span><i className="fi fi-tr-calendar-day"></i></span><span>Attendance</span></Link></li>
                              
                              
    </ul>)
}

export const userInterfaces={"Team Lead":<TeamLead/> ,"Web Developer Intern":<WebDev/>,"Web Developer":<WebDev/>,"CSM":<CSM/>,"Admin":<Admin/>};


export const userPages={"Team Lead":<TLRoutes/> ,"Web Developer Intern":<WDRoutes/>,"Web Developer":<WDRoutes/>,"CSM":<CSMRoutes/>,"Admin":<AdminRoutes/>}