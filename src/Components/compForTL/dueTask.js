import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
import { useEffect, useState   } from "react";
import axios from "axios";
import { tasksAPI } from "../../redux/dueTaskSlice";
import { userAPI } from "../../redux/counterSlice";
import { activeTasksAPI } from "../../redux/activeTasksSlice";
import { task_re } from "../../media";
 

export function DueTask( ){
    const dueTasks=useSelector((state)=>state.tasks.value);
    const activeTasks=useSelector(state=>state.activeTasks.value);
    const user=useSelector(state=>state.user.value);
    const [loader,setLoader]=useState([]);
    const [size,setSize]=useState(0);
   
    const dispatch=useDispatch();

    async function handleTaskMove(ind,type)
    {  
      let Task;
let Description;
let Department;
let Deadline;
let data;
let selectedDev;
       if(type==="Desktop"){
          data=document.querySelectorAll(`.tableBody tr:nth-child(${ind+1}) td`);
          selectedDev=data[5].childNodes[0].value;
         if(!selectedDev){
           alert("The Task has  been assigned already!");
          return "";
         }
         if(selectedDev==="default"){
          alert("Please assign a dev");
          return ""};
           
         let arr=loader;
    arr[ind]=true;
      setLoader([...arr]);
       
        
            
    
          Task=data[1].innerHTML;
          Description=data[2].innerHTML;
          Department=data[3].innerHTML;
          Deadline=data[4].innerHTML;
       }
       else{
       data=dueTasks[ind];
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
        const res=await axios.get(`https://g-rank-backend.onrender.com/addToActiveTasks?Task=${Task}&Description=${Description}&Department=${Department}&Deadline=${Deadline}&Dev=${selectedDev}&id=${dueTasks[ind].id}`);
       
            console.log(res.data);
             dispatch(userAPI({employeeID:user.EmployeeID}));
                let arr2=loader;
    arr2[ind]=false;

    await new Promise(resolve=>setTimeout(()=>{
        resolve("This is for laoding time")
    },1000));
      setLoader([...arr2]);
               
    dispatch(activeTasksAPI());
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
    useEffect(()=>{
     dispatch(tasksAPI());
     dispatch(activeTasksAPI());
       let arr=[];
     for(let i=0;i<dueTasks.length;i++){
  
                            arr.push(false);
        
     }
      setLoader([...arr]);

        
    //    getTasks();

    },[])
   
    return (
        <div className="row position-relative">
        <Navbar   />

        <div className="col-10 mx-auto  border sectionContainer" >
         
        < QuickAccess page={"DueTask"}/>
        <div className="   "   >
             <div className="p-2  backColor "  >
              <h3 className="text-center border rounded p-2 mb-2 ">Due Tasks</h3></div>
         <div className=" p-2 activeTaskTable  col-lg-10 col-md-11"  >
         
            <div className="border rounded backColor"   >
           <table className="col-12 text-center   deskTable"  >
                        <thead>
                           <th>Id</th>  
                                    <th>Task</th>                                           
                        <th>Description</th>
                        <th>Department</th>
                        <th>Deadline</th>
                            
                        <th>Assign</th>
                         <th>Add</th>
                        </thead>
                        <tbody className="tableBody">
                          {dueTasks?dueTasks.map((item,index)=><tr className="my-2"  >{Object.keys(item).filter(it=>it!=="Progress").map(key=><td className="  ">{item[key]}</td>)}<td className=" ">{activeTasks.filter(f2=>f2.id===item.id).length===1?"true":<select ><option value={"default"}>Select</option><option value={"WebDev1"}>WebDev1</option><option value={"WebDev2"}>WebDev2</option><option value={"WebDev3"}>WebDev3</option><option value={"WebDev4"}>WebDev4</option> </select>}</td><td   className=" d-flex align-items-center justify-content-center   position-relative " > <div className="loaderContainer  "> {loader[index]? <div className="loader"> </div> :<span className="addButton "  onClick={( )=>handleTaskMove(index,"Desktop")}><i class="fi fi-tr-square-plus"></i></span> } </div>   </td> </tr>):""}

                        </tbody>
                 
                </table> 
                <div className="mobileTable"> {dueTasks?dueTasks.map((item,index)=><div className="my-2 "  >{Object.keys(item).filter(it=>it!=="Progress").map(key=><div className=" d-flex  align-items-center justify-content-between    ps-2"> <span className=" " >{key}</span><span className="col-8">{item[key]}</span></div>)}<div className="d-flex align-items-center  justify-content-between  ps-2 ">{activeTasks.filter(f2=>f2.id===item.id).length===1?"true":<select ><option value={"default"}>Select</option><option value={"WebDev1"}>WebDev1</option><option value={"WebDev2"}>WebDev2</option><option value={"WebDev3"}>WebDev3</option><option value={"WebDev4"}>WebDev4</option> </select> } <div   className="col-8 d-flex align-items-center justify-content-center   position-relative " > <div className="loaderContainer  "> {loader[index]? <div className="loader"> </div> :<span className="addButton "  onClick={()=>handleTaskMove(index,"mobile")} ><i class="fi fi-tr-square-plus"></i></span> } </div></div>   </div> </div>):""}</div>
                 


                </div>
             
         </div>
         <div className="col-lg-2  tlSVg" >
          <img src={task_re} alt="svg" className=" img-fluid"></img></div>
       
                
                 
        </div>
                 
        </div>
           
        </div>
    )
}