import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
import { useEffect } from "react";
import { activeTasksAPI } from "../../redux/activeTasksSlice";
import axios from "axios";
 
 


export function NewTask( ){
    const activeTasks=useSelector(state=>state.activeTasks.value);
    const user=useSelector(state=>state.user.value);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(activeTasksAPI());

    },[])

    async function handleActiveTaskDelete(ind){
          const response =await axios.get(`https://g-rank-backend.onrender.com/deleteActiveTask?id=${activeTasks[ind].id}&EmployeeID=${user.EmployeeID}&Dev=${activeTasks[ind].Dev}&Notification=${user.Notification}`);
          console.log(response.data.text);


          dispatch( activeTasksAPI());

    }
  
 
    return (
        <div className="row ">
        <Navbar   />

        <div className="col-10 mx-auto  border sectionContainer" >
        < QuickAccess page={"New Task"}/>
          <div className="marginTop">
             <div className="p-2">
              <h3 className="text-center border rounded p-2 mb-2">Active Tasks</h3></div>
         <div className=" p-2 activeTaskTable col-10">
            <div className="border rounded">
                <table className="col-12 text-center  "  >
                        <thead>
                                    <th>Task</th>                                           
                        <th>Description</th>
                        <th>Department</th>
                        <th>Deadline</th>
                         <th>Dev</th>
                         <th>Status</th>
                         <th>Action</th>
                        
                        </thead>
                        <tbody>
                          {activeTasks?activeTasks.map((item,index)=><tr className="my-2"  >{Object.keys(item).filter(it=>it!=="id").map(key=> <td>{item[key]}</td> )}<td   className="p-2 addButton rounded  "  onClick={()=>handleActiveTaskDelete(index)} ><i class="fi fi-tr-square-minus"></i></td></tr>):""}

                        </tbody>
                
                </table>
                </div>
             
         </div>
        
                
                 
        </div>
      
        </div>
        </div>
    )
}