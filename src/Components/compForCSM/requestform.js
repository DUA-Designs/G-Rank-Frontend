import { useSelector } from "react-redux";
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
import './csm.css';
import axios from "axios";

export function RequestForm( ){
 
  
async function handleTaskSubmit(event){
   event.preventDefault();

            let Task=document.getElementById("task").value.trim();
         let Description=document.getElementById("Description").value.trim();
         let Department=document.getElementById("Department").value.trim();
         let Deadline=document.getElementById("Deadline").value.trim();
         let response=await axios.get(`https://g-rank-backend.onrender.com/addTask?Task=${Task}&Description=${Description}&Department=${Department}&Deadline=${Deadline}`);
         document.querySelector(".error").innerHTML=response.data.text;

              setTimeout(()=>{
                  document.querySelector(".error").innerHTML="";
              },1000);

              
}
    return (
    <div className="row ">
        <Navbar  />

      <div className="col-10 mx-auto   border sectionContainer" >
      < QuickAccess page={"RequestForm"}/>

         <div className="row  marginTop">
         
         <div className="col-12 p-4 ">
                 <form className="my-4"  onSubmit={(event)=>handleTaskSubmit(event)} >
                              <div className="row">
                              
                                 <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="Task" className="form-label">Task</label>
                                  <input type="text" className="form-control" id="task" aria-describedby=" " required/>
                                 
                                </div>
                                <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="Description" className="form-label">Description</label>
                                  <input type="text" className="form-control" id="Description" aria-describedby=" " required/>
                               
                                </div>
                                 <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="Department" className="form-label">Department</label>
                                  <input type="text" className="form-control" id="Department" aria-describedby=" " required/>
                               
                                </div>
                                   <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="Deadline" className="form-label">Deadline</label>
                                  <input type="date" className="form-control" id="Deadline" aria-describedby=" " required/>
                               
                                </div>

                                 
                                  <div className="col-lg-6 col-md-6 mb-3 d-flex align-items-end">
                                  <button type="submit" className="btn  btn-light" >Submit</button></div>
                                
                                 <div className="error text-center">
                                     
                                 </div>
                                </div>
                                 
                              
                              
                  </form>
          
         </div>
         </div>


         
       
      
      </div>
    </div>
    )
}