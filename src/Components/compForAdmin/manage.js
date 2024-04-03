 
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
import {choose, forms }from './media';
import {   useDispatch, useSelector } from "react-redux";
import { change } from "../../redux/formSlice";



export function Manage( ){
 const dispatch=useDispatch();
 const formActiveSlice=useSelector((state)=>state.formActive.value);
  
function handleForm(args){
dispatch(change(args));
}
 
 
    return (
    <div className="row ">
        <Navbar  />

      <div className="  mx-auto   border sectionContainer"  id="manage">
      < QuickAccess page={"Manage"}/>
           <div className="container-fluid marginTop manage  " >
           
            <div className="  row  " >
                 <div className="d-flex flex-wrap">
                  <div className="p-2 col-lg-4 col-md-4"><button className="btn  btn-info " onClick={()=>handleForm("add")}>Add Employee</button></div>
                   <div className="p-2 col-lg-4 col-md-4"><button className="btn  btn-info " onClick={()=>handleForm("delete")}>Delete Employee</button></div>
                    <div className="p-2 col-lg-4 col-md-4"><button className="btn  btn-info" onClick={()=>handleForm("manage")}>Manage Employee</button></div>
                 </div>

                 <div className=" formContainer  mt-5 rounded   ">
                 <div className="blur"></div>
                 {formActiveSlice!=="none"?<div className="col-12 z-2">
                             {forms[formActiveSlice]}
                 </div>:<div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 mx-auto my-4 z-2"><img alt="choose" src={choose } className="img-fluid "></img></div>}
                 </div>
            </div>

            </div>
      
      </div>
    </div>
    )
}