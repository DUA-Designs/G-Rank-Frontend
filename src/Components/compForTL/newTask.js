import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
import { useEffect, useRef, useState   } from "react";
import axios from "axios";
import tasks, { tasksAPI } from "../../redux/tasks";
import { userAPI } from "../../redux/counterSlice";
import { activeTasksAPI } from "../../redux/activeTasksSlice";
import { organizing_projects_re, task_re } from "../../media";
import CheckboxDemo from './multi-level-heirarchy-select';
import { PrimeReactProvider } from "primereact/api";
import { NodeService ,NodeService2} from "./multi-level-heirarchy-select";
import { TreeSelect } from "primereact/treeselect";
import { MultiSelect } from "primereact/multiselect";
import { Button } from "primereact/button";
import { TabPanel, TabView } from "primereact/tabview";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";
import { SplitButton } from "primereact/splitbutton";
import { OverlayPanel } from "primereact/overlaypanel";
import { ConfirmDialog } from "primereact/confirmdialog";
 
 
 
 

export function NewTask( ){
      const [nodes, setNodes] = useState(null);
    const [selectedNodeKeys, setSelectedNodeKeys] = useState([]);
        const [nodes2, setNodes2] = useState(null);
    const [selectedNodeKeys2, setSelectedNodeKeys2] = useState([]);
    const Tasks=useSelector((state)=>state.tasks.value);
    const activeTasks=useSelector(state=>state.activeTasks.value);
    const user=useSelector(state=>state.user.value);
    const [loader,setLoader]=useState([]);
    const [finished,setFinished]=useState([]);
    const fakeItems = [Array.from({ length: 11 }, (v, i) => i),Array.from({ length: 3 }, (v, i) => i)];
       const toast = useRef(null);
       const op = useRef(null);
        const [visible, setVisible] = useState(false);
 

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
    // const items = [
    //     {
    //         label: 'Update',
    //         icon: 'pi pi-refresh',
    //         command: () => {
    //             toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
    //         }
    //     },
    //     {
    //         label: 'Delete',
    //         icon: 'pi pi-times',
    //         command: () => {
    //             toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
    //         }
    //     },
    //     {
    //         label: 'React Website',
    //         icon: 'pi pi-external-link',
    //         command: () => {
    //             window.location.href = 'https://reactjs.org/';
    //         }
    //     },
    //     {
    //         label: 'Upload',
    //         icon: 'pi pi-upload',
    //         command: () => {
    //             //router.push('/fileupload');
    //         }
    //     }
    // ];

    // const save = () => {
    //     toast.current.show({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
    // };
    const dispatch=useDispatch();

    async function handleTaskMove(ind,type)
    {  
   
 
      let Task;
let Description;
let Priority;
let Department;
let Deadline;
let data;
let selectedDev;
let selectedTask;
let TaskId;
 
       if(type==="Desktop"){
          data=document.querySelectorAll(`.tableBody tr:nth-child(${ind+1}) td`);
          selectedDev=nodes2[Number(selectedNodeKeys2[ind])];
          selectedTask= selectedNodeKeys[ind]?Object.keys(selectedNodeKeys[ind]).filter(item=>selectedNodeKeys[ind][item].checked===true):[];


         
         if(!selectedDev   ){
           alert("Please assign a dev");
          return "";
         }
         
         if( selectedTask.length<1){
          alert("Please select the task");
          return ""};

         selectedTask=  selectedTask[0];

          // let nodeValueForTask;
          // if(selectedTask.length>1){

          // }
          // else{
          //   Object.keys
          // }
// console.log(selectedDev);

           
  // alert("Both are good to go");
          //  return "";
         let arr=loader;
    arr[ind]=true;
      setLoader([...arr]);
       
        
            
    
          Task=data[1].innerHTML;
          Department=data[2].innerHTML;
          Priority=data[3].innerHTML;
          Description=data[4].innerHTML;
           
          Deadline=data[5].innerHTML;
          TaskId=data[0].innerHTML;
       }
       else{
       data=Tasks[ind];


      //  div:nth-child(${ind+1})>div:nth-child(2) select
        selectedDev=document.querySelector(`.mobileTable>div:nth-child(${ind+1}) div:last-child select`).value;
      
           if(!selectedDev){
           alert("The Task has  been assigned already!");
          return "";
         }
         if(selectedDev==="default" || !selectedDev){
          alert("Please assign a dev");
          return ""};
           let arr=loader;
    arr[ind]=true;
      setLoader([...arr]);

               Task=data.Task;
          Description=data.Description;
          Department=data.Department;
          Deadline=data.Deadline;

 
       }
      


//  http://localhost:8000/addToActiveTasks
        const res=await axios.get(`https://g-rank-backend.onrender.com/addToActiveTasks?Task=${Task}&Department=${Department}&Priority=${Priority}&Description=${Description}&Deadline=${Deadline}&selectedTask=${selectedTask}&Dev=${selectedDev.label}&id=${TaskId}`);
       
            console.log(res.data);
             dispatch(userAPI({employeeID:user.EmployeeID}));
                let arr2=loader;
    arr2[ind]=false;

    await new Promise(resolve=>setTimeout(()=>{
        resolve("This is for loading time")
    },1000));
      setLoader([...arr2]);
               
   await  dispatch(activeTasksAPI());
   console.log(activeTasks);
    }

    
 
    // async function getTasks(){
    //    let response=await axios.get('https://docs.google.com/spreadsheets/d/e/2PACX-1vR4bqhRdZBrGt_fB8r0kRDdDXDuG4OHiFzL7vrlJow1NL30mKCkjwcLhQ7_MgL3_7FNQOc3uARJ8fS2/pub?output=csv');
    //    console.log(response.data);
   

    //      const rows = response.data.split(/\r?\n/); // Split CSV text into rows, handling '\r' characters
    // const headers = rows[0].split(','); // Extract headers (assumes the first row is the header row)
    // const data = []; // Initialize an array to store parsed data
    // for (let i = 1; i < rows.length; i++) {
    //     const rowData = rows[i].split(','); // Split the row, handling '\r' characters
    //     const rowObject = {};
    //     for (let j = 0; j < headers.length; j++) {
    //         rowObject[headers[j]] = rowData[j];
    //     }
    //     data.push(rowObject);
    //     console.log(data);
    // }
    //     setActiveTasks( data);
    // }

    function isolateDeveloper(e,ind){
      
       let arr=selectedNodeKeys2;
       arr[ind]=e.value;
       setSelectedNodeKeys2([...arr]);
    }
    function isolateTasks(e,ind){
  let arr=selectedNodeKeys;
       arr[ind]=e.value;
      setSelectedNodeKeys([...arr]);
      
    }

function selectedReAssign(index){
    setVisible(true);
    console.log(index,toast.current);

}


    async     function showCompleted(availTasks){

  const res = await axios.get(`https://g-rank-backend.onrender.com/getTasks`);
     
   ;
    

           
    


 const completedTasks=res.data.tasks.filter(item=> item.Progress==="Completed");
 

        let baseObject={
                        key: '0',
                        data: {
                                name: 'Applications',
                                size: '100kb',
                                type: 'Folder'
                            }
                };
                let filledObject= [];
                       
for ( let i=0;i<completedTasks.length;i++){

            filledObject.push({key:i,data:{name:completedTasks[i].Task,startedDate:completedTasks[i].startedDate,Progress:completedTasks[i].Progress,
            
            splitButton:
            // <i class="pi pi-ellipsis-v" id={`edit${completedTasks[i].id}`} onClick={() => setVisible(true)}></i>
          
        //   <div className=" ">
        //     <Button type="button" icon="pi pi-angle-down"   onClick={(e) => op.current.toggle(e)} />
        //     <OverlayPanel ref={op}>
        //         <img src={'https://primefaces.org/cdn/primereact/images/product/bamboo-watch.jpg'} alt="Bamboo Watch"></img>
        //         <TabView>
        //          <TabPanel header="Re-Assign">
                   
        //          </TabPanel>
        //         </TabView>
        //     </OverlayPanel>
        // </div>
                <Button label="Re-Assign" icon="pi pi-undo" onClick={( ) => selectedReAssign(i)}></Button>
            
            }})

}
 

    const completedData = {
      

        getTreeTableNodesData() {
            return  filledObject;
        },

        getTreeTableNodes() {
            return Promise.resolve(this.getTreeTableNodesData());
        },

         
    };
    completedData.getTreeTableNodes().then((data) => setFinished(data));



 
  }
    useEffect(()=>{
     dispatch(tasksAPI());
     dispatch(activeTasksAPI());
         
       let arr=[];
     for(let i=0;i<Tasks.length;i++){
  
                            arr.push(false);
        
     }
      setLoader([...arr]);
      
 
 showCompleted(Tasks);

        
    //    getTasks();
   NodeService.getTreeNodes().then((data) => {setNodes(data)
   let arr=[];
for(let i=0;i<data.length;i++){
  arr.push(null);
}
      setSelectedNodeKeys(arr);
      
      
   }); 
   
    
NodeService2.getTreeNodes().then((data) => {setNodes2(data)

let arr=[];
for(let i=0;i<data.length;i++){
  arr.push(null);
}
      setSelectedNodeKeys2(arr);
        
});
 

    },[])
   
    return (
        <div className="row position-relative">
        <Navbar   />

        <div className="col-10 mx-auto  border sectionContainer" >
         
        < QuickAccess page={"Create Task"}/>
        <div className="   "   >
             <div className="p-2  backColor "  >
              <h3 className="text-center border rounded p-2 mb-2 ">Task List</h3>
              
                 <div className="     ">
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
             
                 
            
        </div></div>
           
         <div className=" p-2 activeTaskTable   "  >
             <div className="card">
            <TabView>
                <TabPanel header="Active">
                      <div className="border rounded backColor"   >
           <table className="col-12 text-center   deskTable"  >
                        <thead>
                           <th>Id</th>  
                           <th>Task</th>    
                           <th>Department</th>                                       
                           <th>Priority</th>
                           <th>Description</th>
                           <th>Deadline</th>
                             <th>Start Date  </th>
                               <th>Start Time</th>
                           <th>Tasks List</th>
                        <th>Assign</th>
                         <th>Add</th>
                       
                        </thead>
                        <tbody className="tableBody">
                          {Tasks?Tasks.filter(item0=>!item0.endDate).map((item,index)=><tr className="my-2"  >{Object.keys(item).filter(it=>it!=="Progress" && it!=="Dev").map(key=><td className="  ">{item[key]}</td>)}<td className=" ">{activeTasks.filter(f2=>f2.id===item.id).length===1?"true":  <div className="card flex justify-content-center">
            <TreeSelect value={selectedNodeKeys[index]} filter onChange={(e) => isolateTasks(e ,index)} options={nodes}  showClear 
                metaKeySelection={false} className="md:w-20rem w-full" selectionMode="checkbox" display="chip" placeholder="Select Tasks"></TreeSelect>
        </div>    }</td><td>{activeTasks.filter(f2=>f2.id===item.id).length===1? "true": <div className="card flex justify-content-center">
           <TreeSelect value={selectedNodeKeys2[index]} filter onChange={(e) => isolateDeveloper(e,index)} options={nodes2}  showClear 
                metaKeySelection={false} className="md:w-20rem w-full"   display="chip" placeholder="Select Dev"></TreeSelect> 
        </div>  }</td><td   className="     position-relative " > <div className="loaderContainer  "> {loader[index]? <div className="loader"> </div> :<span className="addButton "  onClick={( )=>handleTaskMove(index,"Desktop")}><i class="fi fi-tr-square-plus"></i> </span> } </div>   </td> </tr>):
         <TreeTable value={fakeItems[0]} tableStyle={{ minWidth: '50rem' }}>
                                      
                                           <Column field="name" header="Id" expander></Column> 
   <Column field="name" header="Task" expander></Column> 
   <Column field="name" header="Department" expander></Column> 
   <Column field="name" header="Priority" expander></Column> 
   <Column field="name" header="Description" expander></Column> 
   <Column field="name" header="Deadline" expander></Column> 
   <Column field="name" header="Start Date" expander></Column> 
   <Column field="name" header="Start Time" expander></Column> 
   <Column field="name" header="Tasks List" expander></Column> 
   <Column field="name" header="Assign" expander></Column> 
   <Column field="name" header="Add" expander></Column> 
                        </TreeTable>}

                        </tbody>
                 
                </table> 
          
                <div className="mobileTable"> {Tasks?Tasks.map((item,index)=><div className="my-2 "  >{Object.keys(item).filter(it=>it!=="Progress").map(key=><div className=" d-flex  align-items-center justify-content-between    ps-2"> <span className=" " >{key}</span><span className="col-8">{item[key]}</span></div>)}<div className="d-flex align-items-center  justify-content-between  ps-2 ">{activeTasks.filter(f2=>f2.id===item.id).length===1?"true":<select ><option value={"default"}>Select</option><option value={"WebDev1"}>WebDev1</option><option value={"WebDev2"}>WebDev2</option><option value={"WebDev3"}>WebDev3</option><option value={"WebDev4"}>WebDev4</option> </select> } <div   className="col-8 d-flex align-items-center justify-content-center   position-relative " > <div className="loaderContainer  "> {loader[index]? <div className="loader"> </div> :<span className="addButton "  onClick={()=>handleTaskMove(index,"mobile")} ><i class="fi fi-tr-square-plus"></i></span> } </div></div>   </div> </div>):""}</div>
                 


                </div>
                </TabPanel>
                <TabPanel header="Completed">
                     {finished.length>=1?<TreeTable value={finished} tableStyle={{ minWidth: '50rem' }}>
                                        <Column field="name" header="Project" expander></Column>
                                        <Column field="startedDate" header="Date"></Column>
                                        <Column field="Progress" header="Status"></Column>
                                        <Column field="splitButton" header="Edit"  ></Column>
                        </TreeTable>:   <div className="card">
            <DataTable value={fakeItems[1]} className="p-datatable-striped">
                <Column field="code" header="Project" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="name" header="Date" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="category" header="Status" style={{ width: '25%' }} body={<Skeleton />}></Column>
                <Column field="quantity" header="Edit" style={{ width: '25%' }} body={<Skeleton />}></Column>
            </DataTable>
        </div>}  
                </TabPanel>
               
            </TabView>
        </div>
         
           
             
         </div>
         <div className="col-lg-2  tlSVg" >
          <img src={organizing_projects_re} alt="svg" className=" img-fluid"></img></div>
       
                
                 
        </div>
                 
        </div>
           
        </div>
    )
}