 
import { useEffect, useRef } from "react"

 
import { useDispatch, useSelector } from "react-redux";
import { time } from "../media";
import {  userLogout } from "../redux/sessionHandler";

 
 

 

 

export function QuickAccess({page} ){
  const timeSound=useRef();


       const user=useSelector(state=>state.user.value);
 
       const dispatch=useDispatch();
 
 
  async function handleLogOut(){
    
    localStorage.removeItem("lastlogin");
//    let links=document.querySelectorAll(".myLinks span");
   
  dispatch(userLogout());
//   for(let i=0;i<links.length;i++){
//  if(links[i].innerHTML.indexOf("Home")>=0){
//    links[i].click();
//        console.log(links[i].innerHTML)
//        break;
//  }
       
   
//    }
  //  window.location.href="/G-Rank-Frontend";
//  await new Promise(resolve=>setTimeout(()=>{resolve("THis is for loading time")},2000));

//  localStorage.setItem("sessionTime","true");
 window.location.href="/G-Rank-Frontend";
   
 
  
   
    
 
 }
 
 
 async function handleSessionCloser(args){

 
  if(args==="add"){
    document.getElementById("sessionPopUp").classList.add("showMe");
 
if (timeSound.current !== null) {
  timeSound.current.play();
}
    let line=document.querySelector("#line");
 
     
      let x=100;
  
     
      
     
      while(2){
        --x;
        line.style.width=`${x}%`;
       
        await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},60));
        if(x===2){
          document.getElementById("sessionPopUp").classList.remove("showMe");
          // localStorage.setItem("sessionTime","false"); 
          break;
        }
     
      }
    
   
   
    
    
    
 
  }
  
  else{
  
  
    document.getElementById("sessionPopUp").classList.remove("showMe");
  }

 }
         
       

  

  useEffect(()=>{
   
    
    
      let sectionContainer=document.querySelector(".sectionContainer");
      sectionContainer.addEventListener("scroll",()=>{
  
      
        let quickAccess=document.querySelector("#quickAccess");
       
        if(sectionContainer.scrollTop>1){
          if(!quickAccess.classList.contains("dynamicAccess")){
            quickAccess.classList.add("dynamicAccess");
          }
        }
        else{
           
            quickAccess.classList.remove("dynamicAccess");
          
        }
      }) 

    document.getElementById("logOut").addEventListener("click",handleLogOut);
    if(localStorage.getItem("lastlogin")!==null ){
          
 
      let { loginTime,loginDate}=JSON.parse(localStorage.getItem("lastlogin"));
     
      let date=new Date();
          let tdMinutes=Number(loginTime.split(":")[1])-date.getMinutes();
          let tdSeconds=Number(loginTime.split(":")[2])-date.getSeconds();
          
          let tdHours=Math.abs(Number(loginTime.split(":")[0])-date.getHours());
        
          let td=tdHours*60*60+tdMinutes*60 +tdSeconds ;
           
         
       
                  
      if( Math.abs(td)>=72000  && `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`===loginDate){
          
           localStorage.removeItem("lastlogin");
         window.location.href="/G-Rank-Frontend";
          //  localStorage.removeItem("sessionTime");
        
      
      }
     
        
      if(Math.abs(td)===60000     && `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`===loginDate){
         
       if(!document.getElementById("sessionPopUp").classList.contains("showMe")){
            
         
        
          handleSessionCloser("add");
       

       
   
       }
      
      }
    
      
    }
 
  })
  
 
    return (
    
     

      <div  id="quickAccess" >
    
            <div className="d-flex align-items-center justify-content-between ">
              
              <div className="row  align-items-center  ">
              <div className="col-6" id="barDesign"><div ></div><div></div></div>
              
              <span className="col-lg-4 col-md-4   ">{page?page[0].toUpperCase()+page.split("").slice(1,).join(""):"Home"}</span>
              
              </div>
              <div className="d-flex  align-items-center  justify-content-between ">
              <span id="menu" className=" rounded p-2  text-center  " data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop"><i className="fi fi-ts-bars-sort"></i></span>
                
              <div class="dropdown  ">
                      <a className=" btn dropdown-toggle" href="#link" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Quick Links
                      </a>

                      <ul class="dropdown-menu">
                        <li><a className="dropdown-item" href="#link">Action</a></li>
                        <li><a className="dropdown-item" href="#link">Another action</a></li>
                        <li><a className="dropdown-item" href="#link">Something else here</a></li>
                      </ul>
                    </div> 
                     <span className="px-2 btn mx-lg-1  " id="notifications" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">{user.Notification?<i class="fi fi-tr-cowbell-circle-plus"></i>:<i className="fi fi-tr-cowbell"></i>}</span>
                    <span className="px-2 btn mx-lg-1 " id="logOut"><i className="fi fi-rs-log-out"></i></span>


              
              </div>
            



            </div>
          
      <div id="sessionPopUp" className="p-2  shadow rounded border  ">
      
        <div className="row">
        <span className="col-10  ">Your session time is ending soon...</span>
        <p className="text-end col-2 " id="sessionCloser" onClick={()=>handleSessionCloser("remove")}><i className="fi fi-ts-circle-xmark"></i></p>
        </div>
        
    <div id="line"></div>
          <audio   ref={timeSound} src={time} type='audio'>
     
    </audio>
      </div>
        
    
      </div>
  
    )
}