import { useSelector } from "react-redux"
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";

export function NewTask(  ){
 const user=useSelector(state=>state.user.value);
    return (
        <div className="row ">
          <Navbar  />

        <div className="col-10 mx-auto   border sectionContainer" >
          <QuickAccess page={"NewTask"}/>
              <div className=" p-5"><h1>This is NewTask Page {user["Name"]} </h1></div>
        
        </div>
      </div>

    )
}