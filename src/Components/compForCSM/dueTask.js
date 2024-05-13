import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
import { useEffect  } from "react";
 
import { tasksAPI } from "../../redux/dueTaskSlice";
import { accept_tasks, task_re } from "../../media";
 

export function DueTask( ){
    const dueTasks=useSelector((state)=>state.tasks.value);
   
    const dispatch=useDispatch();

    

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
        <div className="marginTop ">
             <div className="p-2 backColor">
              <h3 className="text-center border rounded p-2 mb-2">Due Tasks</h3></div>
         <div className=" p-2 activeTaskTable ">
            <div className="border rounded backColor">
                <table className="col-12 text-center  "  >
                        <thead>
                        <th>Id</th>
                                    <th>Task</th>                                           
                        <th>Description</th>
                        <th>Department</th>
                        <th>Deadline</th>
                      
                         <th>Status</th>
                        </thead>
                        <tbody className="tableBody">
                          {dueTasks?dueTasks.map((item,index)=><tr className="my-2"  >{Object.keys(item).map(key=><td className="col-2">{item[key]}</td>)}</tr> ):""}

                        </tbody>
                 
                </table>
                </div>
             
         </div>
         <div className="col-lg-2  tlSVg" >
          <img src={task_re} alt="svg" className=" img-fluid"></img></div>
        
                
                 
        </div>
      
        </div>
        </div>
    )
}