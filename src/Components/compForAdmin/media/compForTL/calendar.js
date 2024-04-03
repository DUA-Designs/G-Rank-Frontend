import { useSelector } from "react-redux";
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";


export function Calendar( ){
  const user=useSelector(state=>state.user.value);
    return (
        <div className="row ">
        <Navbar   />

      <div className="col-10 mx-auto   border sectionContainer" >
      < QuickAccess page={"Calendar"}/>
            <div><h1>This is Calendar Page {user["Name"]}</h1></div>
      
      </div>
    </div>
    )
}