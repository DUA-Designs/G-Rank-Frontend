import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
import { useEffect, useRef, useState } from "react";
import { activeTasksAPI } from "../../redux/activeTasksSlice";
import axios from "axios";
import { accept_tasks, completed_tasks } from "../../media";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { tasksAPI } from "../../redux/tasks";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { Skeleton } from "primereact/skeleton";
 
 


export function Todo( ){
    const activeTasks=useSelector(state=>state.activeTasks.value);
    const user=useSelector(state=>state.user.value);
    const Tasks=useSelector((state)=>state.tasks.value);
      const [completed, setCompleted] = useState([]);

          const toast = useRef(null);
   const [loader,setLoader]=useState(false);
        const [visible, setVisible] = useState(false);
        const [visible2,setVisible2]=useState(false);
        const [toggleId,setToggleId]=useState(null);

        const [remove,setRemove]=useState(null);

     

    const dispatch=useDispatch();

     function ActiveTasksUI2(){


 
    let filledObject=[];

for ( let i=0;i<activeTasks.length;i++){
  
 
 
            filledObject.push(  {Id:activeTasks[i].id,Task:activeTasks[i].Task,Department:activeTasks[i].Department,Priority:activeTasks[i].Priority,Description:activeTasks[i].Description,Deadline:activeTasks[i].Deadline, Status:activeTasks[i].Progress,
            
            Checklist:<Button icon="pi pi-ellipsis-h" onClick={()=>toggleOverview(activeTasks[i].id)}/>,Dev:activeTasks[i].Dev 
            ,Action:<Button icon="pi pi-minus" onClick={()=>setRemoveState(activeTasks[i].id)}/>})
           

            

}
 

    const completedData = {
      

        getTreeTableNodesData() {
            return  filledObject;
        },

        getTreeTableNodes() {
            return Promise.resolve(this.getTreeTableNodesData());
        },

         
    };
    completedData.getTreeTableNodes().then((data) => setCompleted(data));



    }
        const accept = async () => {
     
        if(remove){



           toast.current.show({ severity: 'info', summary: 'Confirmed',   life: 3000,   content: (props) => (
        <div className="flex flex-column align-items-left" style={{ flex: '1' }}>
            <div className="d-flex align-items-center gap-2">
                <i className="pi pi-check"></i>
                 <div className="font-medium text-lg   text-900">{props.message.summary}</div>
            </div>
            
            {/* <Button className="p-button-sm flex" label="Reply" severity="success" onClick={clear}></Button> */}
        </div>
    ) });


   handleActiveTaskDelete( )
   dispatch(activeTasksAPI());
 
        }
        else{


           
           toast.current.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000,   content: (props) => (
        <div className="flex flex-column align-items-left" style={{ flex: '1' }}>
            <div className="d-flex align-items-center gap-2">
                <i className="pi pi-times"></i>
                 <div className="font-medium text-lg   text-900">{props.message.summary}</div>
            </div>
            
            {/* <Button className="p-button-sm flex" label="Reply" severity="success" onClick={clear}></Button> */}
        </div>
    ) });

    
        }

    //      let loadingInitializer=[];
    // for(let l=0;l<loading.length;l++){
    //   loadingInitializer.push(false);
    // }
    // setLoading([...loadingInitializer]);
    //   console.log(loading);
        
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected',    life: 3000 , content: (props) => (
        <div className="flex flex-column align-items-left" style={{ flex: '1' }}>
            <div className="d-flex align-items-center gap-2">
                <i className="pi pi-exclamation-triangle"></i>
                 <div className="font-medium text-lg   text-900">{props.message.summary}</div>
            </div>
            
            {/* <Button className="p-button-sm flex" label="Reply" severity="success" onClick={clear}></Button> */}
        </div>
    )});

    //  let loadingInitializer=[];
    // for(let l=0;l<loading.length;l++){
    //   loadingInitializer.push(false);
    // }
    
    // setLoading([...loadingInitializer]);
    }

    function setRemoveState(ind){
        setRemove(ind);
        setVisible(true);
       


    }

    function toggleOverview(taskId){
        setToggleId(taskId)
        setVisible2(true);
  
        
    }
  
    useEffect(()=>{
      dispatch(tasksAPI());
        dispatch(activeTasksAPI());

 

        
     
     ActiveTasksUI2()

    },[])

    async function handleActiveTaskDelete( ){
setLoader(true)
       
    

      const date=new Date();
 const endDate=`${date.getFullYear()}-${date.getMonth()>9?date.getMonth()+1:"0"+(date.getMonth()+1)}-${date.getDate()}`;
            const  endTime = `${date.getHours()} : ${date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes() } : ${date.getSeconds()>9?date.getSeconds():"0"+date.getSeconds()}`;
        document.querySelector(".newTaskLoader").classList.add("active");
          const response =await axios.get(`https://g-rank-backend.onrender.com/deleteActiveTask?id=${remove}&EmployeeID=${user.EmployeeID}&Dev=${activeTasks.filter((item)=>Number(item.id)===Number(remove))[0].Dev}&Notification=${user.Notification}&endDate=${endDate}&endTime=${endTime}`);
          console.log(response.data.text);


          dispatch( activeTasksAPI());

           setLoader(false)
    }
  
 
    return (
        <div className="row ">
        <Navbar   />

        <div className="col-10 mx-auto  border sectionContainer" >

        <Dialog header="Task Overview" visible={visible2} style={{ width: '50vw' }} onHide={() => {
            setToggleId(null);
            if (!visible2) return; setVisible2(false); }}>

        {toggleId?<ul>
        { activeTasks.filter(i1=>Number(i1.id)===toggleId)[0]}
        </ul>:  
                            
                            <div style={{ flex: '1' }}>
                                <Skeleton width="100%" className="mb-2"></Skeleton>
                                <Skeleton width="75%"></Skeleton>
                            </div>
                         }
     
</Dialog>
         <Toast ref={toast}></Toast>
            <ConfirmDialog
                group="declarative"
                visible={visible}
                onHide={() => setVisible(false)}
                message="Are you sure you want to proceed?"
                header="Confirmation"
                icon="pi pi-exclamation-triangle"
                accept={accept}
                reject={reject}
                style={{ width: '50vw' }}
                breakpoints={{ '1100px': '75vw', '960px': '100vw' }}
            />
        < QuickAccess page={"To Do"}/>
          <div className="  ">
             <div className="p-2 backColor">
              <h3 className="text-center border rounded p-2 mb-2 ">Active Tasks  
              {/* <div className="newTaskLoader"></div> */}
                {loader? <ProgressSpinner style={{width: '20px', height: '20px'}} strokeWidth="5" fill="var(--surface-ground)" animationDuration=".5s" />:""} </h3>  </div>
         <div className=" p-2     ">
            <div className="border rounded backColor">
                {/* <table className="col-12 text-center deskTable "  >
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
                
                </table> */}
                   <div className="card">
                  <DataTable value={completed} tableStyle={{ minWidth: '50rem' }}>

                                    
                    <Column field="Task" header="Task"></Column>
                    <Column field="Department" header="Department"></Column>
                    <Column field="Priority" header="Priority"></Column>
                    <Column field="Description" header="Description"></Column>
                    <Column field="Deadline" header="Deadline"></Column>
 
                    <Column field="Checklist" header="Checklist"></Column>
                    <Column field="Dev" header="Dev"></Column>
                    <Column field="Status" header="Status"></Column>
                    <Column field="Action" header="Action"></Column>
                  </DataTable>
                </div>
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
