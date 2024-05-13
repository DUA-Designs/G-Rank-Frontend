import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
import { useEffect, useState } from "react";
import { activeTasksAPI } from "../../redux/activeTasksSlice";
import axios from "axios";
import { accept_tasks, completed_tasks } from "../../media";
 
 


export function NewTask( ){
    const activeTasks=useSelector(state=>state.activeTasks.value);
    const user=useSelector(state=>state.user.value);
    const dispatch=useDispatch();
  
    useEffect(()=>{
        dispatch(activeTasksAPI());
    

    },[])

    async function handleActiveTaskDelete(ind){

        document.querySelector(".newTaskLoader").classList.add("active");
          const response =await axios.get(`https://g-rank-backend.onrender.com/deleteActiveTask?id=${activeTasks[ind].id}&EmployeeID=${user.EmployeeID}&Dev=${activeTasks[ind].Dev}&Notification=${user.Notification}`);
          console.log(response.data.text);


          dispatch( activeTasksAPI());

            await new Promise(resolve=>setTimeout(()=>{
        resolve("This is for laoding time")
    },500));
            document.querySelector(".newTaskLoader").classList.remove("active");
    }
  
 
    return (
        <div className="row ">
        <Navbar   />

        <div className="col-10 mx-auto  border sectionContainer" >
        < QuickAccess page={"New Task"}/>
          <div className=" row">
             <div className="p-2 backColor">
              <h3 className="text-center border rounded p-2 mb-2 ">Active Tasks <div className="newTaskLoader"></div></h3>  </div>
         <div className=" p-2 activeTaskTable col-lg-10 col-md-11  ">
            <div className="border rounded backColor">
                <table className="col-12 text-center deskTable "  >
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
                <div className="mobileTable"> {activeTasks?activeTasks.map((item,index)=><div className="my-2 "  >{Object.keys(item).filter(it=>it!=="id").map(key=><div className=" d-flex  align-items-center justify-content-between    ps-2"> <span className=" " >{key}</span><span className="col-8">{item[key]}</span></div>)} <div   className="p-2 addButton rounded  "  onClick={()=>handleActiveTaskDelete(index)} ><i class="fi fi-tr-square-minus"></i></div>  </div>):""}</div>
                </div>
             
         </div>
           <div className="col-lg-2  tlSVg" >
          <img src={completed_tasks} alt="svg" className=" img-fluid"></img></div>
        
                
                 
        </div>
      
        </div>
        </div>
    )
}