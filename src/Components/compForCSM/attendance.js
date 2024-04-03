import { useSelector } from "react-redux";
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";


export function Attendance(){
  const user=useSelector(state=>state.user.value);
    return (
    <div className="row ">
      <Navbar  />

      <div className="col-10   border sectionContainer" >
          < QuickAccess page={"Attendance"}/>
            <div><h1>This is Attendance Page {user["Name"]}</h1></div>
      
      </div>
    </div>
    )
}