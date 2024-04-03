import { useDispatch, useSelector } from "react-redux"
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
import { useEffect } from "react";
import { allEmps } from "../../redux/employeeSlice";


import axios from "axios";
 

export function Employees( ){
  const employees=useSelector(state=>state.employees.value);
const dispatch=useDispatch();
async function getEmployees(){
 
  let response=await axios.get("https://g-rank-backend.onrender.com/employees");
        
  dispatch(allEmps(response.data));
}

  useEffect(()=>{
        if(employees.length===0){
          getEmployees();
        }
  },[])
    return (
    <div className="row ">
        <Navbar  />

      <div className="   mx-auto   border sectionContainer   " >
      < QuickAccess page={"Employees"}/>
         <div className="container-fluid marginTop">
            <div className="row     " >
                   {employees.map((item,index)=><div className="col-lg-6 col-md-6 p-2" key={index}> <div className="border rounded infoHeader">
                   
                   <h4 className="p-2 mb-3" > {item.Name}</h4>
    <ul  className="row  employees">
       {Object.keys(item).map((item2,index2)=>item2!=="Name" && item2!=="Notification" ?<li key={index2}  className="col-lg-6 col-md-6  my-1"><div className="p-1"><span className="lightText">{item2}</span><p>{item[item2] }</p></div></li>:"")} 

 
    </ul>
                   </div></div>)}
             </div>
         </div>
            
      
      </div>
    </div>
    )
}