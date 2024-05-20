import { useDispatch } from 'react-redux';
import choose from './media/undraw_data_input_fxv2.svg';
import axios from 'axios';
import { change } from '../../redux/formSlice';
 

export {choose};





        
        
 
const ADD=()=>{
    const dispatch=useDispatch();

    async function handleSubmit(event ){
 
    event.preventDefault();

   
                          let addName=document.getElementById("addName").value.trim();
                  let addId=document.getElementById("addId").value.trim();
                  let addContact=document.getElementById("addContact").value.trim();
                  let addDesignation=document.getElementById("addDesignation").value.trim();
                  let addLocation=document.getElementById("addLocation").value.trim();
                  let addCompanyEmail=document.getElementById("addCompanyEmail").value.trim();
                  let addPassword=document.getElementById("addPassword").value.trim();

         
              let response=await axios.get(`https://g-rank-backend.onrender.com/addEmployee?EmployeeID=${addId}&password=${addPassword}&Location=${addLocation}&Name=${addName}&Contact=${addContact}&CompanyEmail=${addCompanyEmail}&Designation=${addDesignation}`);

           if(response.status===200){
            console.log(response.data.text);
           }
           else{
                  console.log(response.statusText);
           }
        
              dispatch(change("none"));
                 

  
    }
    return ( <form className="my-4" method='post'    onSubmit={(event)=>handleSubmit(event )} >
                              <div className="row">
                               <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="addName" className="form-label">Name</label>
                                  <input type="text" className="form-control" id="addName" aria-describedby=" " required />
                               
                                </div>
                                 <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="addId" className="form-label">Employee Id</label>
                                  <input type="text" className="form-control" id="addId" aria-describedby=" " required />
                               
                                </div>
                                <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="addContact" className="form-label">Contact</label>
                                  <input type="text" className="form-control" id="addContact" aria-describedby=" " required />
                               
                                </div>
                                 <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="addDesignation" className="form-label">Designation</label>
                                  <input type="text" className="form-control" id="addDesignation" aria-describedby=" " required/>
                               
                                </div>
                                   <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="addLocation" className="form-label">Location</label>
                                  <input type="text" className="form-control" id="addLocation" aria-describedby=" " required/>
                               
                                </div>
                                <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="addCompanyEmail" className="form-label"> Company Email</label>
                                  <input type="email" className="form-control" id="addCompanyEmail" aria-describedby="emailHelp" required/>
                                   
                                </div>
                                <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="addPassword" className="form-label">Password</label>
                                  <input type="password" className="form-control" id="addPassword" required/>
                                </div>
                                <div className="col-lg-6 col-md-6 mb-3 d-flex align-items-end">
                                  <button type="submit" className="btn  btn-light">Add Employee</button></div>
                                </div>
                                 
                              
                              
                              </form>)
}
const DEL=()=>{

const dispatch=useDispatch();

        async function handleSubmit(event ){
 
    event.preventDefault();

    
 
        let deleteId=document.getElementById('deleteId').value.trim();
        const response=await axios.get(`https://g-rank-backend.onrender.com/deleteEmployee?EmployeeID=${deleteId}`);
        if(response.status===200){
            console.log(response.data.text);
        }
        else{
            console.log(response.statusText);
        }
      dispatch(change("none"));
        }
    return ( 
        <form className="my-4"   onSubmit={(event)=>handleSubmit(event,"delete")}>
                              <div className="row">
                                <div id="passwordHelpBlock" class="form-text my-4">
                                 Warning: The details of the employee will be permanently deleted.
                                </div>
                                 <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="deleteId" className="form-label">Employee Id</label>
                                  <input type="text" className="form-control" id="deleteId" aria-describedby=" " required/>
                               
                                </div>
                                
                                <div className="col-lg-6 col-md-6 mb-3 d-flex align-items-end">
                                  <button type="submit" className="btn btn-light">Delete</button>
                                  </div>
                                </div>
                                 
                              
                              
                              </form>
    )
}
const Manage=()=>{
  const dispatch=useDispatch();

        async function handleSubmit(event ){
 
    event.preventDefault();

                        let updateId=document.getElementById("updateId").value.trim();
              let updateContact=document.getElementById("updateContact").value.trim();
              let updateDesignation=document.getElementById("updateDesignation").value.trim();
              let updateLocation=document.getElementById("updateLocation").value.trim();
              let updatePassword=document.getElementById("updatePassword").value.trim();
                  
                  const response=await axios.get(`https://g-rank-backend.onrender.com/updateEmployee?EmployeeID=${updateId}&Contact=${updateContact}&Location=${updateLocation}&Designation=${updateDesignation}&password=${updatePassword}`);
                   if(response.status===200){
                          console.log("Status is OK");
                   }
                   else{
                         console.log("Failed");
                   }
                  dispatch(change("none"));
        
        }
    return ( 

        <form className="my-4"  onSubmit={(event)=>handleSubmit(event )}>
                              <div className="row">
                              
                                 <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="updateId" className="form-label">Employee Id</label>
                                  <input type="text" className="form-control" id="updateId" aria-describedby=" " required/>
                               
                                </div>
                                <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="updateContact" className="form-label">Contact</label>
                                  <input type="text" className="form-control" id="updateContact" aria-describedby=" " required/>
                               
                                </div>
                                 <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="updateDesignation" className="form-label">Designation</label>
                                  <input type="text" className="form-control" id="updateDesignation" aria-describedby=" " required/>
                               
                                </div>
                                   <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="updateLocation" className="form-label">Location</label>
                                  <input type="text" className="form-control" id="updateLocation" aria-describedby=" " required/>
                               
                                </div>
                                
                                <div className="mb-3 col-lg-6 col-md-6">
                                  <label for="updatePassword" className="form-label">Password</label>
                                  <input type="password" className="form-control" id="updatePassword" required/>
                                </div>
                                <div className="col-lg-6 col-md-6 mb-3 d-flex align-items-end">
                                  <button type="submit" className="btn  btn-light">Update</button></div>
                                </div>
                                 
                              
                              
                              </form>
    )
}
export const forms={ "add":<ADD/> ,"delete":<DEL/>,"manage":<Manage/>       };