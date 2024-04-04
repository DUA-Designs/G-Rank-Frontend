import {  createRef, useEffect, useState} from "react";
import { dots, failure, grank, loadingCircle, partner, success } from "./media";
 
import { Player, Controls } from '@lottiefiles/react-lottie-player';

import {  useDispatch, useSelector   } from "react-redux";
 import { userAPI } from "./redux/counterSlice";
 
import {BrowserRouter} from 'react-router-dom';
 
 import { currentUser } from "./redux/counterSlice";
import { userPages } from "./Components/interfaces";
import { WDRoutes } from "./Components/compForWD/WDInterface";
import axios from "axios";
 
 
 
 
 
 
 
 
 

// const employees=[{id:"9299",password:"webdev"},{id:"9293",password:"webdev1"},{id:"9301",password:"webdev2"},{id:"9300",password:"webdev3"},{id:"9302",password:"teamlead01"},{id:"9303",password:"csm01"},{id:"9304",password:"admin"}];

// export const employeeDet=[
// {"EmployeeID":"9299","Location":"Hyderabad","Name":"Dasari Uday Aravind","Contact":"9390939771","CompanyEmail":"udayaravind@grank.co.in","Designation":"Web Developer Intern"},
// {"EmployeeID":"9293","Location":"Hyderabad","Name":"Sai Sreeja","Contact":"1234567890","CompanyEmail":"saisreeja@grank.co.in","Designation":"Web Developer"},
// {"EmployeeID":"9301","Location":"Hyderabad","Name":"Jaswanth","Contact":"8688086646","CompanyEmail":"jaswanth@grank.co.in","Designation":"Web Developer Intern"},
// {"EmployeeID":"9300","Location":"Hyderabad","Name":"Prashanth","Contact":"6304380695","CompanyEmail":"prashanth@grank.co.in","Designation":"Web Developer Intern"},
// {"EmployeeID":"9302","Location":"Hyderabad","Name":"Divya","Contact":"1234567890","CompanyEmail":"divya@grank.co.in","Designation":"Team Lead"},
// {"EmployeeID":"9303","Location":"Hyderabad","Name":"Nikita","Contact":"1234567890","CompanyEmail":"nikita@grank.co.in","Designation":"CSM"},
// {"EmployeeID":"9304","Location":"Hyderabad","Name":"Admin","Contact":"1234567890","CompanyEmail":"admin@grank.co.in","Designation":"Admin"}
// ];


export function App() {

  const [login,setLogin]=useState(true);
  const user=useSelector(state=>state.user.value);
  const successPlayer=createRef();
  const failurePlayer=createRef();
 
 
 
 
  const [checkSession,setCheckSession]=useState(true);
  const dispatch=useDispatch();
 
 
 

 async function checkLogin(e){

        e.preventDefault();
        let login=document.getElementById("login");
        let loadingCircle=document.querySelector(".loadingCircle");
         let successLottie=document.querySelector(".Success");
         let failure=document.querySelector(".failure");
        login.classList.add("hideMe");
               await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},500));
        loadingCircle.classList.add("showMe");
       
         

       
        let employeeID=document.getElementById("employeeID").value.trim();
        let password=document.getElementById("password").value.trim().toLowerCase();
        if(employeeID && password){

              let response=await axios.get(`https://g-rank-backend.onrender.com/login?EmployeeID=${employeeID}&password=${password}`);
         
                 if( response.data.EmployeeID){
                  if(response.data.EmployeeID  && response.data.password ){
                    document.getElementById("error").innerHTML="Login Successful";
                    dispatch(currentUser(response.data.user));
                    
                    setTimeout(()=>{
                      document.getElementById("error").innerHTML="";


                    },1000);
                    let date=new Date();
                    let data={employeeID,loginTime:`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,loginDate:`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`};
                    localStorage.setItem("lastlogin",JSON.stringify(data));
                  
                               
                   
                 
                     
                         loadingCircle.classList.remove("showMe");
                          await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},100));
                                 successLottie.classList.add("showMe");
                                   await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},100));
                         
                       
                 
                                 
                           await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},1100));
                           successLottie.classList.remove("showMe");
                        
                         
                               await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},100));
                            
                          
                      setLogin(false);
                      
                  
                    return "";
                  }
                  document.getElementById("error").innerHTML="Password seems to be wrong";
                    setTimeout(()=>{
                      document.getElementById("error").innerHTML="";


                    },1500);
                     loadingCircle.classList.remove("showMe");
                          await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},300));
                            failure.classList.add("showMe");
                            failurePlayer.current.play();
                                 
                           await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},2000));
                           failure.classList.remove("showMe");
                          login.classList.remove("hideMe");

                  return "";
                 }
                
                 document.getElementById("error").innerHTML="Unable to find details for the id. Are you sure you have signed up?";
                  loadingCircle.classList.remove("showMe");
                          await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},300));
                     await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},100));
                 login.classList.remove("hideMe");
         
        }
        else{
          document.getElementById("error").innerHTML="Please enter valid credentials";
                 loadingCircle.classList.remove("showMe");
                          await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},300));
                     await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},100));
                 login.classList.remove("hideMe");
           
        }
        
             setTimeout(()=>{
                      document.getElementById("error").innerHTML="";


                    },1500);
  }

  async function checkLastLogin(){


    if(localStorage.getItem("lastlogin")!==null ){
   
          
 
      let { loginTime,loginDate,employeeID}=JSON.parse(localStorage.getItem("lastlogin"));
 
      let date=new Date();
    
 
      if(Math.abs(Number(loginTime.split(":")[0])-date.getHours())<3 && `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`===loginDate){

     
   
      // employeeDet.filter(item=>item["EmployeeID"]===id)[0]
      //      let response=await axios.get(`https://g-rank-backend.onrender.com/active?EmployeeID=${employeeID}`);
             
      // if(response.data.status==="OK"){
      //   dispatch(currentUser(response.data.user));
            
      //              await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},1500));
         
      //        setLogin(false);
      // }
      // else{
      //      setCheckSession(false);
      //     await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},500));
      //   setLogin(true);
      // }
         
      
      
         
   
               dispatch(userAPI({employeeID}));
              await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},2000));
        setLogin(false);
            
        
            

      
      }
      else{
        localStorage.removeItem("lastlogin");

           setCheckSession(false);
              await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},1000));
              
      setLogin(true);
       
      }
    }
    else{
      await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},1000));
          setCheckSession(false);
          setLogin(true);
     
    }

    
  }
 

  useEffect(   ()=>{
 checkLastLogin();
 



  },[]);
 

 
 




  return (
    <div className="App   ">
      {login?<div style={{height:"100%",display:"grid"}}  >
        {checkSession?<div className="d-grid align-items-center" >
           <Player loop autoplay style={{width:`${window.innerWidth/2}px`,height:`${window.innerHeight/2}px`}} src={dots}
	    />  </div>:<div className="row   shadow rounded   py-4"  >
            <div  className="col-12  my-1 ">
              <img src={grank} alt="G-rank Digital Services Private Limited" className="img-fluid"  style={{width:"150px"}}></img><img src={partner} alt="google_partner"></img>
            </div>
            <div className="col-lg-5 col-md-8 bg-light rounded shadow mx-auto p-3  d-grid align-items-center">
            
           
              <h3 className="col-12  mb-4" ><span style={{color:"#0174b1",fontWeight:"800" }}>Employee Login</span >  </h3>
            <form onSubmit={(event)=>checkLogin(event)} className=" my-3" id="loginForm">
                        <div className="  mx-auto d-flex flex-wrap align-items-center ">
                        <input type="text" id="employeeID"   className=" my-3 p-2 col-12 mx-auto"  required placeholder="EmployeeID(ex. 1000)" pattern="^[0-9]+$"></input>
                        <input type="password" id="password"  className=" my-3 p-2 col-12 mx-auto" required placeholder="password"></input>
                        <label className="col-12 text-end my-2"><a href="#forgot" className="text-decoration-none">Forgot Password?</a></label>
                        
                        <div className="col-12 loginContainer   ">
                        <button type="submit" className="btn   my-2 col-4 mx-auto d-block" id="login">login</button> 
                           <Player loop autoplay    ref={successPlayer}    style={{width:"120px" ,height:"120px" }} src={success}
	    className=" mx-auto Success start-50  translate-middle" /> 
                        <Player loop autoplay style={{width:"120px" ,height:"120px" }} src={loadingCircle}
	    className=" mx-auto loadingCircle start-50  translate-middle" />
       
      <Player  loop={false} autoplay={false} ref={failurePlayer}    style={{width:"120px" ,height:"120px" }} src={failure}
	    className=" mx-auto failure start-50  translate-middle" />

      
      </div>
                        </div>
            </form>
            <div id="error" className=" "></div>
           
            </div>
            
            
         </div>}
        
        </div>
      : 
      
       
       <BrowserRouter basename="G-Rank-Frontend">
              {userPages[user["Designation"]]?userPages[user["Designation"]]:<WDRoutes/>}
 
   
      </BrowserRouter>
         
  
     
   
  }
    </div>
  );
}

export default App;
