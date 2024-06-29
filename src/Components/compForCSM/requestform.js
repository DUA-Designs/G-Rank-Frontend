import { useSelector } from "react-redux";
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
import './csm.css';
import axios from "axios";
import { add_tasks_re } from "../../media";

export function RequestForm( ){
 
  
async function handleTaskSubmit(event){
   event.preventDefault();

            let Task=document.getElementById("task").value.trim();
         let Description=document.getElementById("Description").value.trim();
         let Department=document.getElementById("Department").value.trim();
         let Deadline=document.getElementById("Deadline").value.trim();
          let Priority=document.getElementById("Priority").value.trim();
            let taskid=document.getElementById("taskid").value.trim();

            // http://localhost:8000/addTask
            //https://g-rank-backend.onrender.com
            const date=new Date();
            const startedDate=`${date.getFullYear()}-${date.getMonth()>9?date.getMonth()+1:"0"+(date.getMonth()+1)}-${date.getDate()}`;
            const  startedTime = `${date.getHours()} : ${date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes() } : ${date.getSeconds()>9?date.getSeconds():"0"+date.getSeconds()}`;
         
          
         let response=await axios.get(`http://localhost:8000/addTask?Task=${Task}&Description=${Description}&Department=${Department}&Deadline=${Deadline}&id=${taskid}&Priority=${Priority}&startedDate=${startedDate}&startedTime=${startedTime}`);
         document.querySelector(".error").innerHTML=response.data.text;

              setTimeout(()=>{
                  document.querySelector(".error").innerHTML="";
              },2000);

              
}
    return (
    <div className="row ">
        <Navbar  />

      <div className="col-10 mx-auto   border sectionContainer" >
      < QuickAccess page={"RequestForm"}/>

         <div className="row  marginTop" style={{overflow:"hidden"}}>
         
         <div className="col-12 p-4 backColor">
                 <form className="my-4"  onSubmit={(event)=>handleTaskSubmit(event)} >
                              <div className="row">
                                <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="taskid" className="form-label">Id</label>
                                  <input type="text" className="form-control" id="taskid" aria-describedby=" " required/>
                                 
                                </div>
                                 <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="Task" className="form-label">  Project</label>
                                  <input type="text" className="form-control" id="task" aria-describedby=" " required/>
                                 
                                </div>
                                  
                                
                                 <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="Department" className="form-label">Department</label>
                                  <select class="form-select" aria-label="Default select example"  id="Department" required>
                                    <option selected value="" disabled>Open this select menu</option>
                                    <option value="Development">Development</option>
                                    <option value="Creative">Creative</option>
                                    <option value="Accounts">Accounts</option>
                              
                                  </select>
                               
                               
                                </div>
                                   <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="Priority" className="form-label">Priority</label>
                                  <select class="form-select" aria-label="Default select example"  id="Priority" required>
                                    <option selected value="" disabled>Open this select menu</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                  </select>
                               
                               
                                </div>

                                 <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="Deadline" className="form-label">Deadline</label>
                                  <input type="date" className="form-control" id="Deadline" aria-describedby=" " required/>
                               
                                </div>
                                  
                                 <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="Description" className="form-label">Description</label>
                                   <textarea id="Description" required rows={4} className="form-control"></textarea>
                               
                                </div>

                                 
                                  <div className="col-lg-6 col-md-6 mb-3 d-flex align-items-end">
                                  <button type="submit" className="btn  btn-secondary" >Submit</button></div>
                                
                                 <div className=" col-lg-6 col-md-6 error text-center">
                                     
                                 </div>
                                </div>
                                 
                              
                              
                  </form>
          
         </div>
             <div className="col-lg-2  tlSVg" >
          <img src={add_tasks_re} alt="svg" className=" img-fluid"></img></div>
         </div>


         
       
      
      </div>
    </div>
    )
}