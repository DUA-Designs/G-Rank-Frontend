import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
import { useEffect, useState } from "react";
import { activeTasksAPI } from "../../redux/activeTasksSlice";
import axios from "axios";
import { accept_tasks, completed_tasks } from "../../media";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { tasksAPI } from "../../redux/tasks";
 
 


export function Todo( ){
    const activeTasks=useSelector(state=>state.activeTasks.value);
    const user=useSelector(state=>state.user.value);
    const Tasks=useSelector((state)=>state.tasks.value);
      const [completed, setCompleted] = useState([]);

     

    const dispatch=useDispatch();

    function getCompletedTasks(){


      let finished=Tasks.filter(item=>item.Progress==="Completed");
    



var filledObject=[];
if(finished.length>=1){

  finished.sort((a,b)=>new Date(b.endDate).getTime()-new Date(a.endDate).getTime());
  
  // for( let i=0;i<finished.length;i++){
  //   filledObject.push( )
  // }
}

         const completedData = {
        getProductsData() {
            return  filledObject;
        },

        getProductsMini() {
            return Promise.resolve(this.getProductsData().slice(0, 5));
        },

        getProductsSmall() {
            return Promise.resolve(this.getProductsData().slice(0, 10));
        },

        getTasks() {
            return Promise.resolve(this.getProductsData());
        },

        getProductsWithOrdersSmall() {
            return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
        },

        getProductsWithOrders() {
            return Promise.resolve(this.getProductsWithOrdersData());
        }

        
    };
      completedData.getTasks().then(data => setCompleted(data));



    }
  
    useEffect(()=>{
      dispatch(tasksAPI());
        dispatch(activeTasksAPI());

 

        
     
     getCompletedTasks()

    },[])

    async function handleActiveTaskDelete(ind){

      const date=new Date();
 const endDate=`${date.getFullYear()}-${date.getMonth()>9?date.getMonth()+1:"0"+(date.getMonth()+1)}-${date.getDate()}`;
            const  endTime = `${date.getHours()} : ${date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes() } : ${date.getSeconds()>9?date.getSeconds():"0"+date.getSeconds()}`;
        document.querySelector(".newTaskLoader").classList.add("active");
          const response =await axios.get(`https://g-rank-backend.onrender.com/deleteActiveTask?id=${activeTasks[ind].id}&EmployeeID=${user.EmployeeID}&Dev=${activeTasks[ind].Dev}&Notification=${user.Notification}&endDate=${endDate}&endTime=${endTime}`);
          console.log(response.data.text);


          dispatch( activeTasksAPI());

            await new Promise(resolve=>setTimeout(()=>{
                                  resolve("This is for loading time")
                              },500));
            document.querySelector(".newTaskLoader").classList.remove("active");
    }
  
 
    return (
        <div className="row ">
        <Navbar   />

        <div className="col-10 mx-auto  border sectionContainer" >
        < QuickAccess page={"To Do"}/>
          <div className="  ">
             <div className="p-2 backColor">
              <h3 className="text-center border rounded p-2 mb-2 ">Active Tasks <div className="newTaskLoader"></div></h3>  </div>
         <div className=" p-2 activeTaskTable   ">
            <div className="border rounded backColor">
                <table className="col-12 text-center deskTable "  >
                        <thead>
                                    
                                    <th>Task</th>    
                                       <th>Department</th>                                       
                         
                         <th>Priority</th>
                         <th>Description</th>
                      
                        <th>Deadline</th>
                            
                        <th>Tasks Checklist</th>
                      
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
