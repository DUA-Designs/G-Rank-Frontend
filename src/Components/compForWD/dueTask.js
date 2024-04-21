 
 
import { useEffect } from "react";
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
import { useSelector ,useDispatch} from "react-redux";
import { userAPI } from "../../redux/counterSlice";
import axios from 'axios';
 

export function Engage( ){
  const user=useSelector(state=>state.user.value);
 

 
async function handleUpdate(ind)
    {
        let data=document.querySelectorAll(`.tableBody tr:nth-child(${ind+1}) td`);
         let selectedStat=data[5].childNodes[0].value;
         
         if(selectedStat==="default"){
              selectedStat="Assigned";
           };
  
    
       


        const res=await axios.get(`https://g-rank-backend.onrender.com/updateStatus?Progress=${selectedStat}&id=${user.ActiveTasks[ind].id}&EmployeeID=${user.EmployeeID}`);
       
            console.log(res.data);
             dispatch(userAPI({employeeID:user.EmployeeID}));
        
        

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
           <div className="marginTop">
             <div className="p-2">
              <h3 className="text-center border rounded p-2 mb-2">Task List</h3></div>
         <div className=" p-2 activeTaskTable ">
            <div className="border rounded">
                <table className="col-12 text-center  "  >
                        <thead>
                                    <th>Task</th>                                           
                        <th>Description</th>
                        <th>Department</th>
                        <th>Deadline</th>
                        
                        
                           
                           <th>Status</th>
                           <th>Update</th>
                        </thead>
                        <tbody className="tableBody">
                          {user["ActiveTasks"]?user["ActiveTasks"].map((item,index)=><tr className="my-2"  >{Object.keys(item).filter(it=>  it!=="id" ).map(key=><td>{item[key]}</td>)}<td><select onChange={()=>handleUpdate(index)}><option value={"default"}>Select</option><option value={"toDo"}>To Do</option><option value={"WIP"}>Work In progress</option><option value={"PA"}>Pending Approval</option><option value={"Done"}>Completed</option> </select></td>   </tr>):""}

                        </tbody>
                 
                </table>
                </div>
             
         </div>
        
                
                 
        </div>
      
      </div>
    </div>
    )
}