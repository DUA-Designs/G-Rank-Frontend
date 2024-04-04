import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
import { useEffect   } from "react";
import axios from "axios";
import { tasksAPI } from "../../redux/dueTaskSlice";
 

export function DueTask( ){
    const dueTasks=useSelector((state)=>state.tasks.value);
   
    const dispatch=useDispatch();

    async function handleTaskMove(ind)
    {
        let data=document.querySelectorAll(`.tableBody tr:nth-child(${ind+1}) td`);
         let selectedDev=data[4].childNodes[0].value;
         if(selectedDev==="default"){
          alert("Please assign a dev");
          return ""};
  
        let Task=data[0].innerHTML;
        let Description=data[1].innerHTML;
        let Department=data[2].innerHTML;
        let Deadline=data[3].innerHTML;


        const res=await axios.get(`https://g-rank-backend.onrender.com/addToActiveTasks?Task=${Task}&Description=${Description}&Department=${Department}&Deadline=${Deadline}&Dev=${selectedDev}`);
        if(res.data.exec){
            console.log("added to new task");
        }
        

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
        
    //    getTasks();

    },[])
   
    return (
        <div className="row ">
        <Navbar   />

        <div className="col-10 mx-auto  border sectionContainer" >
        < QuickAccess page={"DueTask"}/>
        <div className="marginTop">
             <div className="p-2">
              <h3 className="text-center border rounded p-2 mb-2">Due Tasks</h3></div>
         <div className=" p-2 activeTaskTable ">
            <div className="border rounded">
                <table className="col-12 text-center  "  >
                        <thead>
                                    <th>Task</th>                                           
                        <th>Description</th>
                        <th>Department</th>
                        <th>Deadline</th>
                        <th>Assign</th>
                         <th>Add</th>
                        </thead>
                        <tbody className="tableBody">
                          {dueTasks.map((item,index)=><tr className="my-2"  >{Object.keys(item).map(key=><td>{item[key]}</td>)}<td><select ><option value={"default"}>Select</option><option value={"WebDev1"}>WebDev1</option><option value={"WebDev2"}>WebDev2</option><option value={"WebDev3"}>WebDev3</option><option value={"WebDev4"}>WebDev4</option> </select></td><td   className="p-2 addButton    " onClick={( )=>handleTaskMove(index)}><i class="fi fi-tr-square-plus"></i></td></tr>)}

                        </tbody>
                 
                </table>
                </div>
             
         </div>
        
                
                 
        </div>
      
        </div>
        </div>
    )
}