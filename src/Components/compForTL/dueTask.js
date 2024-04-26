import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
import { useEffect, useState   } from "react";
import axios from "axios";
import { tasksAPI } from "../../redux/dueTaskSlice";
import { userAPI } from "../../redux/counterSlice";
 

export function DueTask( ){
    const dueTasks=useSelector((state)=>state.tasks.value);
    const user=useSelector(state=>state.user.value);
    const [loader,setLoader]=useState([]);
   
    const dispatch=useDispatch();

    async function handleTaskMove(ind)
    {
        let data=document.querySelectorAll(`.tableBody tr:nth-child(${ind+1}) td`);
         let selectedDev=data[5].childNodes[0].value;
         
         if(selectedDev==="default"){
          alert("Please assign a dev");
          return ""};
            let arr=loader;
    arr[ind]=true;
      setLoader([...arr]);
        
       
        
            
    
        let Task=data[1].innerHTML;
        let Description=data[2].innerHTML;
        let Department=data[3].innerHTML;
        let Deadline=data[4].innerHTML;

 //http://localhost:8000/addToActiveTasks
        const res=await axios.get(`https://g-rank-backend.onrender.com/addToActiveTasks?Task=${Task}&Description=${Description}&Department=${Department}&Deadline=${Deadline}&Dev=${selectedDev}&id=${dueTasks[ind].id}`);
       
            console.log(res.data);
             dispatch(userAPI({employeeID:user.EmployeeID}));
                let arr2=loader;
    arr2[ind]=false;

    await new Promise(resolve=>setTimeout(()=>{
        resolve("This is for laoding time")
    },2000));
      setLoader([...arr2]);
               
    
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
       let arr=[];
     for(let i=0;i<dueTasks.lenght;i++){
  
                            arr.push(false);
        
     }
      setLoader([...arr]);

        
    //    getTasks();

    },[])
   
    return (
        <div className="row ">
        <Navbar   />

        <div className="col-10 mx-auto  border sectionContainer" >
        < QuickAccess page={"DueTask"}/>
        <div className="  ">
             <div className="p-2">
              <h3 className="text-center border rounded p-2 mb-2">Due Tasks</h3></div>
         <div className=" p-2 activeTaskTable  col-lg-10 col-md-11">
            <div className="border rounded">
                <table className="col-12 text-center  "  >
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
                          {dueTasks?dueTasks.map((item,index)=><tr className="my-2"  >{Object.keys(item).filter(it=>it!=="Progress").map(key=><td className=" ">{item[key]}</td>)}<td className=""><select ><option value={"default"}>Select</option><option value={"WebDev1"}>WebDev1</option><option value={"WebDev2"}>WebDev2</option><option value={"WebDev3"}>WebDev3</option><option value={"WebDev4"}>WebDev4</option> </select></td><td   className=" d-flex align-items-center justify-content-center   position-relative " > <div className="loaderContainer  "> {loader[index]? <div className="loader"> </div> :<span className="addButton "  onClick={( )=>handleTaskMove(index)}><i class="fi fi-tr-square-plus"></i></span> } </div>   </td> </tr>):""}

                        </tbody>
                 
                </table>
                </div>
             
         </div>
        
                
                 
        </div>
      
        </div>
        </div>
    )
}