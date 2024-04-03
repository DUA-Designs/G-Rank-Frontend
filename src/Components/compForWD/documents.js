import { useSelector } from "react-redux";
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";

export function Documents( ){
  const user=useSelector(state=>state.user.value);
    return (
    <div className="row ">
        <Navbar  />

      <div className="  mx-auto   border sectionContainer" >
      < QuickAccess page={"Documents Center"}/>
            <div><h1>This is Documents Center Page {user["Name"]}</h1></div>
      
      </div>
    </div>
    )
}