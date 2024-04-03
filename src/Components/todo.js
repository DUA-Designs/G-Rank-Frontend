import { Navbar } from "./navbar";
import { useState,useEffect} from "react"
import { QuickAccess } from "./quickAccess";
// import { useSelector } from "react-redux";

const taskDet={Start:"",End:"",TimeTaken:"",Date:"", Task:"",Priority:"",Status:"" };

export function Todo( ){
  // const user=useSelector(state=>state.user.value);
    const [handleError,SetHandleError]=useState("");
    const [running,setRunning]=useState([]);
    const [ended,setEnded]=useState([]);
    const [current,setCurrent]=useState(0);
  
    const [status,setStatus]=useState(false);
    async function handleTimer(event){
        let task=document.getElementById("task").value;
      
        if(event==="start"){
         if(task!=="none" ){
          if(running.filter(item=>item.task===task).length>0){
            SetHandleError(`${task} is already active`);
            setTimeout(()=>{SetHandleError("");},3000);
            return "";
          }
          
            let data=[];
            let date=new Date();
            
              let arr=Object.keys(taskDet);
              
            
              for(let i in arr){
               
    
                if(arr[i]==="Start"){
              
                  data.push(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
               
                  
                }
                if(arr[i]==="End"){
                  data.push("null");
             
    
                }
                if(arr[i]==="TimeTaken"){
                  data.push("null");
                
    
                }
                if(arr[i]==="Date"){
                      
                   
                     data.push(`${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`);
                 
                   
    
                }
                if(arr[i]==="Task"){
                  data.push(task);
            
                
               
    
                 }
                  if(arr[i]==="Priority"){
                    data.push("Medium");
                  }
                 if(arr[i]==="Status"){
                
               
                  data.push("Running");
               
               
        
                }
               
              }
              
           let currentRunning=[...running];
                 currentRunning.push({id:currentRunning.length,data,task});
                 setRunning(currentRunning);
                 await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},500));
               
    
              
              
           
         }
         else{
          SetHandleError("Select a Task");
         }
          
            
                        
                          
          
            
       
           
            
        }
          
       
       
         
     
     
        
       console.log(running);setTimeout(()=>{SetHandleError("");},3000);
    }
    async function handleStatus(args){
      if(running.length===0){
        SetHandleError("No task is running currently");
        setTimeout(()=>{SetHandleError("");},3000);
        return "";
      }          
     
               setStatus(true);
               setCurrent(args);
               console.log(args);
               console.log(running);
              
               
              
     
    
    }
    
     async function handleStop(){
      let taskStatus=document.getElementById("taskStatus").value;
      if(document.getElementById("taskStatus").value==="none"){
        SetHandleError("Please select priority");
        setTimeout(()=>{SetHandleError("");},3000);
        return "";
      }
      if(running.length===0){
        SetHandleError("No task is running currently");
      }
      else{
        
      
             
        let arr=[...running];
        let date=new Date();
         let hours=date.getHours();
         let minutes=date.getMinutes();
         let seconds=date.getSeconds();
        
         let previousTime=arr[current].data[0].split(":");
         let hourDifference=hours-Number(previousTime[0]);
         let minuteDifference=minutes-Number(previousTime[1]);
         let secondsDifference=seconds-Number(previousTime[2]);
         if(minuteDifference<0){
          minuteDifference+=60;
          hourDifference-=1;
         }
         if(secondsDifference<0){
          secondsDifference+=60;
          minuteDifference-=1;
         }
         arr[current].data[1]=`${hours}:${minutes}:${seconds}`;
         arr[current].data[2]=`${hourDifference}:${minuteDifference}:${secondsDifference}`;
    
        
         arr[current].data[6]=taskStatus;
        setEnded([...ended, arr[current].data]);
        
        setRunning(arr.filter(item=>item.id!==current));
      }            
     
            
                 document.getElementById("taskStatus").value="none";
                 document.getElementById("taskStatus").classList.remove("showMe");
                 document.getElementById("handleStop").classList.remove("showMe");
             
                 await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},1000));
              
                 document.getElementById("endTask").classList.remove("expandMe");
                 new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},600));
                 setStatus(false);
     
    
    }
    useEffect(()=>{
           async  function animations(){
              await new Promise((resolve)=>setTimeout(()=>resolve("This is for loading time"),500));
              
              document.getElementById("endTask").classList.add("expandMe");
             await  new Promise((resolve)=>setTimeout(()=>resolve("This is for loading time"),500));
              document.getElementById("taskStatus").classList.add("showMe");
              document.getElementById("handleStop").classList.add("showMe");
             }
      if(status){
        animations();
      }
    
    },[status]);

    return (
        <div className="row ">
         <Navbar   />

         <div className="col-10 mx-auto  border sectionContainer" >
         < QuickAccess page={"To Do"}/>
        <div className="container-fluid   " style={{ marginTop:"5rem"}}>
              <div className="row  bg-light rounded  m-lg-1 m-md-1 p-2"   id="taskContainer">
                <div className="col"><select className="my-2" id="task" ><option disabled value={"none"}>Select Task</option><option value={"Task1"}>Task 1</option><option value={"Task2"}>Task 2</option><option value={"Task3"}>Task 3</option></select> </div>
                <div className="row my-2 justify-content-between"><div className="col-xs-12 col-lg-4 col-md-4 col-sm-12   my-1  p-3"><button className="btn  " onClick={()=>handleTimer("start")} id="start">Start</button></div><span className="col-xs-12 col-lg-4 col-md-4 col-sm-12   text-center p-1  ">{handleError}</span><div  className="  col-xs-12 col-lg-4 col-md-4 col-sm-12   my-1 rounded   p-3 "  id="endTask"  >{status?<span className="d-flex justify-content-between overflow-hidden"><select id="taskStatus"><option value={"none"}>Select Status</option><option value={"Work In Progress"}>Work In Progress</option><option value={"Approval Pending"}>Approval Pending</option><option value={"Completed"}>Completed</option></select><button className="btn btn-dark mx-2" id="handleStop" onClick={handleStop}>End</button></span>:""}</div></div>
                <div id="taskTable" className=" "  >
                  {window.innerWidth<=768?"":<table   className="col-12 rounded text-center  " >
                    <thead>{Object.keys(taskDet).map((item,index)=><th key={index}>{item}</th>)}</thead>
                    <tbody id="tableBody"> 
                      {ended.map((end,index)=><tr>{end.map((item,ind)=><td key={ind}>{item}</td>)}</tr>)}
                      {running.map((item,index)=><tr >{item.data.map((i,ind)=>{
                        if(ind===item.data.length-1){
                          return <td className="d-flex justify-content-between align-items-center" >{i!=="null"?i:""} <span className="  " onClick={()=>handleStatus(index)}  id="closeTask"><i className="fi fi-tr-circle-xmark"></i></span></td>
                        }
                        else{
                          return <td >{i!=="null"?i:""}</td>
                        }
                      })}</tr>)}
                    </tbody>
                    
                  </table>}
                </div>
                <h4 className="my-5">Different Layout</h4>
                {ended.map((end,index)=>
                <div className="col-lg-4 col-md-4 p-1 my-2">
                   <div className="col-12 shadow rounded p-2" >
                   {end.map((item,ind)=>{
                     if(ind===item.length-1){
                      return <div className="d-flex justify-content-between align-items-center my-1 border-bottom" ><b>{Object.keys(taskDet)[ind]}</b><span> - {item!=="null"?item:""}</span>  </div>
                    }
                    else{
                      return <div className="d-flex justify-content-between my-1 border-bottom"><span><b>{Object.keys(taskDet)[ind]}</b></span><span>{item!=="null"?item:""}</span></div>
                    }
                   })}
                   </div>
                </div>  )}
                {running.map((item,index)=><div className="col-lg-4 col-md-4 p-1 my-2"> <div className="col-12 shadow rounded p-2" >{item.data.map((i,ind)=>{
                        if(ind===item.data.length-1){
                          return <div className="d-flex justify-content-between align-items-center border-bottom my-1" ><span><b>Status</b> - {i!=="null"?i:""}</span> <span className="  " onClick={()=>handleStatus(index)}  id="closeTask"><i className="fi fi-tr-circle-xmark"></i></span></div>
                        }
                        else{
                          return <div className="d-flex justify-content-between border-bottom my-1"><span><b>{Object.keys(taskDet)[ind]}</b></span><span>{i!=="null"?i:""}</span></div>
                        }
                      })}</div></div>)}
              </div>
                   
        </div>
      
         </div>
        </div>
    )
}