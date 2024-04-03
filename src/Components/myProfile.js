import { useSelector } from "react-redux";
import { Navbar } from "./navbar";
import { QuickAccess } from "./quickAccess";

export function Profile(  ){
  const user=useSelector(state=>state.user.value);
    return (
    <div className="row ">
        <Navbar    />

      <div className="col-10 mx-auto    border sectionContainer" >
      < QuickAccess page={"My Profile"}/>
    <div className="container-fluid marginTop">
    <div className="border rounded mt-5  infoHeader p-2"  >
    <h2 className="p-2 mb-3" >Employee Information</h2>
    <ul  className="row  ">
       {Object.keys(user).map((item,index)=>item!=="Notification"?<li key={index}  className="col-lg-3 col-md-4  my-1"><div className="p-1"><span className="lightText">{item}</span><p>{user[item] }</p></div></li>:"")} 

 
    </ul>
        
    </div>
    </div>
      
      </div>
    </div>
    )
}