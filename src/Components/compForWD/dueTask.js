 
 
import { useEffect } from "react";
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
import { useSelector ,useDispatch} from "react-redux";
import { userAPI } from "../../redux/counterSlice";
import axios from 'axios';
import { accept_tasks } from "../../media";
 

export function Engage( ){
  const user=useSelector(state=>state.user.value);
 

 
async function handleUpdate(ind,type)
    { document.querySelector(".newTaskLoader").classList.add("active");
      let data;
let selectedStat;

    if(type==="desktop"){
          data=document.querySelectorAll(`.tableBody tr:nth-child(${ind+1}) td`);
           selectedStat=data[5].childNodes[0].value;
            
         
  
    }
    else{
          selectedStat=document.querySelector(`.mobileTable>div:nth-child(${ind+1})>div:last-child select`).value;
          
    }
     if(selectedStat==="default"){
              selectedStat="Assigned";
           };


       


        const res=await axios.get(`https://g-rank-backend.onrender.com/updateStatus?Progress=${selectedStat}&id=${user.ActiveTasks[ind].id}&EmployeeID=${user.EmployeeID}`);
       
            console.log(res.data);
             dispatch(userAPI({employeeID:user.EmployeeID}));
        
        
  await new Promise(resolve=>setTimeout(()=>{
        resolve("This is for laoding time")
    },500));
            document.querySelector(".newTaskLoader").classList.remove("active");
    }

  const dispatch=useDispatch();
 useEffect(()=>{
  dispatch(userAPI({employeeID:user.EmployeeID}));
     
          


   },[])
  
 
    return (
    <div className="row ">
        <Navbar  />

      <div className="col-10 mx-auto   border sectionContainer" >
      < QuickAccess page={"Engage"}/>
           <div className="   marginSides" >
             <div className="p-2 backColor">
              <h3 className="text-center border rounded p-2 mb-2">Task List <div className="newTaskLoader"></div></h3></div>
         <div className=" p-2 activeTaskTable  col-lg-10 col-md-11">
            <div className="border rounded backColor">
                <table className="col-12 text-center  deskTable"  >
                        <thead>
                                    <th>Task</th>                                           
                        <th>Description</th>
                        <th>Department</th>
                        <th>Deadline</th>
                        
                        
                           
                           <th>Status</th>
                           <th>Update</th>
                        </thead>
                        <tbody className="tableBody  ">
                          {user["ActiveTasks"]?user["ActiveTasks"].map((item,index)=><tr className="my-2"  >{Object.keys(item).filter(it=>  it!=="id" ).map(key=><td className="col-2">{item[key]}</td>)}<td className="col-2"><select onChange={()=>handleUpdate(index,"desktop")}><option value={"default"}>Select</option><option value={"toDo"}>To Do</option><option value={"WIP"}>Work In progress</option><option value={"PA"}>Pending Approval</option><option value={"Done"}>Completed</option> </select></td>   </tr>):""}

                        </tbody>
                 
                </table>
                <div className="mobileTable"> {user["ActiveTasks"]?user["ActiveTasks"].map((item,index)=><div className="my-2 "  >{Object.keys(item).filter(it=>it!=="id").map(key=><div className=" d-flex  align-items-center justify-content-between    ps-2"> <span className=" " >{key}</span><span className="col-8">{item[key]}</span></div>)}<div className=" p-2"><select onChange={()=>handleUpdate(index,"mobile")}><option value={"default"}>Select</option><option value={"toDo"}>To Do</option><option value={"WIP"}>Work In progress</option><option value={"PA"}>Pending Approval</option><option value={"Done"}>Completed</option> </select></div>   </div>):""}</div>
                </div>
             
         </div>
        
                   <div className="col-lg-2  tlSVg" >
          <img src={accept_tasks} alt="svg" className=" img-fluid"></img></div>
                 
        </div>
      
      </div>
    </div>
    )
}