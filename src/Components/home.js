
 import { useEffect, useState } from "react";
import { air, cool, evening, morning, night, noon, pie, poi, review, taxable, track } from "../media";
import { Navbar } from "./navbar";
import { QuickAccess } from "./quickAccess";
 
import { useSelector,useDispatch } from "react-redux";
import   axios  from "axios";
import { userAPI } from "../redux/counterSlice";
 

 
 
 
 

const monthsInArray= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const greetingTimes=[{greet:"Good Morning",image:morning,rangeStart:6,rangeEnd:12},{greet:"Good Noon",image:noon,rangeStart:12,rangeEnd:16},{greet:"Good Evening",image:evening,rangeStart:16,rangeEnd:20},{greet:"Good Night",image:night,rangeStart:20,rangeEnd:24}];
 
export   function Home( {page}){ 
   const user=useSelector(state=>state.user.value);
   const dispatch=useDispatch();
  const [date,setDate]=useState(new Date());
  const [myQuote,setMyQuote]=useState("");
  const [author,setAuthor]=useState("");
  const [swipeIn,setSwipeIn]=useState("");
    const [swipeOut,setSwipeOut]=useState("");
    const [disableSignIn,setDisableSignIn]=useState(false);
  


        
  async function scatter(){
    let tabs= document.querySelectorAll(".tabs");
    let divs=document.getElementById("dayTime").childNodes;
    if(!divs[0].classList.contains("showMe")){
      for(let i=0;i<divs.length;i++){
    
        divs[i].classList.add("showMe");
    
      }
    }
    if(!tabs[0].classList.contains("scatter")){

     if( document.getElementById("dayTime")!==null){
     
     }
      for(let i=0;i<tabs.length;i++){
        await new Promise((resolve)=>setTimeout(()=>{resolve("This is for loading time")},200));
        tabs[i].classList.add("scatter");
      }
      
    }
   
    
      
  
  }   

      async  function getQuote(){
       
        const url = 'https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes?category=inspirational';
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '6fbfebbdc6msh5f6f5ee3beae5d2p1fc4d9jsn61a0a7629cf5',
            'X-RapidAPI-Host': 'quotes-by-api-ninjas.p.rapidapi.com'
          }}

        
        try {
          const response = await fetch(url ,options  );
          const result = await response.json();
      
        
            setAuthor(result[0].author);
            setMyQuote(result[0].quote);
         
       
        } catch (error) {
          console.error(error);
        }

        }

      useEffect(()=>{
        setInterval(()=>{
          setDate(new Date());
        },1000);

       
    
          
          scatter();
         
        
         getQuote();
          
          checkSignIn();   

       
        
      },[]);
      async function checkSignIn(){
            const swipedDate=`${date.getDate()}-${date.getMonth()>9?date.getMonth()+1:"0"+(date.getMonth()+1)}-${date.getFullYear()}`;
            
         
         let checkSwipeIn=user.Attendance?user.Attendance.filter(item=>item.swipedDate===swipedDate).length>=1?user.Attendance.filter(item=>item.swipedDate===swipedDate)[0].swipeIn:"":"";
                 setSwipeIn(  checkSwipeIn?checkSwipeIn:"");
         let checkSwipeOut=user.Attendance?user.Attendance.filter(item=>item.swipedDate===swipedDate).length>=1?user.Attendance.filter(item=>item.swipedDate===swipedDate)[0].swipeOut:"":"";
                setSwipeOut(  checkSwipeOut?checkSwipeOut:"");
                
                if(checkSwipeIn && checkSwipeOut){
                          setDisableSignIn(true);
                }
                   
           
      }

      async function handleAttendance(event){
 
       const swipedDate=`${date.getDate()}-${date.getMonth()>9?date.getMonth()+1:"0"+(date.getMonth()+1)}-${date.getFullYear()}`;
      
         const swipe=document.querySelector(".currentTime").innerHTML;
        
                       
                      
                           const response =await axios.get(`https://g-rank-backend.onrender.com/attendance?EmployeeID=${user.EmployeeID}&swipedDate=${swipedDate}&swipe=${swipe}`);
                          if(response.data.exec){
                            if(event==="Sign In"){
                              setSwipeIn( swipe)
                             
                            }
                            else{
                               setSwipeOut( swipe);
                                   setDisableSignIn(true);
                            }
                            console.log("Am I running?");
                           
                          }
                           
                 
                        
       
        
      //  dispatch(userAPI({employeeID:user.EmployeeID}));
      //      console.log(swipeIn,swipeOut);
      //   await checkSignIn();
      //   console.log(swipeIn,swipeOut);

      }

      function showSwipes(){

        document.querySelector(".swipeBox").classList.add("active");
      }
      function closeSwipeBox(){
         document.querySelector(".swipeBox").classList.remove("active");
      }
    
 
    return ( 
      <div className="row ">
      <Navbar  />
    <div className="     border  sectionContainer" id="empInfo">
   
      <QuickAccess page={page}/>
       <div className="container-fluid  ">
      
             <div className="  row   position-relative border py-2" id="dayTime"> 
             <img src={cool} alt="background" className="position-absolute backImg"></img>
              
              <div className="col-lg-10 col-md-10">
              
                <div className="headContainer p-2 rounded    border     d-flex align-items-center">
                         <h4 className="col-12 userGreetings" >{greetingTimes.filter(item=>date.getHours()>=item.rangeStart && date.getHours()<item.rangeEnd)[0].greet}</h4>
 
                </div>
              <div className="col-12" >
             
                 
            <div className="col-lg-7 col-md-7 mx-auto text-center quoteContainer  py-2   border   rounded   position-relative my-3"> 
            <i class="fa-solid fa-quote-left corner-left position-absolute top-0 start-0 m-2 "></i>
             <i class="fa-solid fa-quote-right corner-right position-absolute top-100 start-100  m-2 "></i> 
                           < p className="userQuote my-1  p-2">Quote Of The Day</p>
              <h6  className=" p-2  my-1 myQuote text-center"> {myQuote} </h6>
               <p className="text-end mt-3 userQuote px-4">{author?"- " +author:""}</p>
                
                
            </div>
              
               
            

              </div>
              </div>
              <div className="col-lg-2 col-md-2 col-sm-4 col-xs-6  "><img alt="dayImages" src={greetingTimes.filter(item=>date.getHours()>=item.rangeStart && date.getHours()<item.rangeEnd)[0].image} className="img-fluid"></img></div>
              
              </div> 
             
             
      
   
    <div className="col-lg-8 col-md-10 mx-auto ">
    <div className="  row    my-3 position-relative" id="homeElements">
    <div className="position-absolute swipeBox rounded shadow p-3"> 
                <div className="text-end closeSwipeBox"><span>Swipes</span><i class="fi fi-tr-circle-xmark" onClick={closeSwipeBox}></i></div>
    </div>

      <div className="col-lg-4 col-md-4  my-1  tabs">
        <div className="col-12   border rounded    p-2  " >
          <h6>Review</h6>
          <div className="col-3 mx-auto my-3"><img src={review} alt="reviewImage" className="img-fluid"></img></div>
          <p className="my-1 p-1 text-center">Hurrah! You've nothing to review.</p>
        </div>
      </div>
      <div className="col-lg-4 col-md-4  my-1 tabs">
        <div className="col-12   border rounded   p-2 " style={{background:"#edf3ff",fontSize:"0.7rem"}}>
         
          <div className="d-flex my-3">
            <div className="col-9 ">
              <p>{ date.getDate()+" "+monthsInArray[date.getMonth()] + " "+ date.getFullYear()}</p>
              <p>{dayNames[date.getDay()]} | 9:30 AM to 6:30 PM</p>
              <p className="currentTime">{date.getHours() + " : "} {date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes() } : {date.getSeconds()>9?date.getSeconds():"0"+date.getSeconds()}</p>


            </div>
          <div className="col-3 "><img src={air} alt="reviewImage" className="img-fluid"></img></div>
          </div>
            <div className="d-flex justify-content-around my-1 text-start"><div className="swipeIn">Swipe In - {swipeIn }</div><div className="swipeOut">Swipe Out - {swipeOut }</div></div>
          <div className="d-flex justify-content-between my-1">
            <span className="btn swipes" onClick={showSwipes}>View Swipes</span>{disableSignIn?<span className="btn signOut"> <i class="fi fi-rr-ban"></i></span>:<span className="btn signOut"   onClick={()=>handleAttendance(swipeIn?"Sign Out":"Sign In")}>{swipeIn?"Sign Out":"Sign In"}</span>}
          </div>
      
        </div>
      </div>
      <div className="col-lg-4 col-md-4  my-1 tabs">
        <div className="col-12   border rounded   p-2 ">
          <h6 className="mb-4">Quick Access</h6>
          
           
               <div className="d-flex" style={{fontSize:"0.7rem"}}>
                 <div className="col-7">
                  <p>Reimbursement Payslip</p> 
                 <p>IT Statement</p> 
                 <p>YTD Reports</p> 
                 <p>Loan Statement</p>
                 </div>
                 <div className="col-5 rounded p-3" style={{background:"#fff8f0"}}>Use quick access to view important salary details</div>
                </div>
           
        </div>
      </div>
      <div className="col-lg-4 col-md-4  my-1 tabs">
        <div className="col-12   border rounded  p-2 ">
          <div className="d-flex justify-content-between"><h6>Upcoming Holidays</h6><span><i class="fi fi-ts-arrow-up-right"></i></span></div>
          {/* <div className="col-3 mx-auto my-3"><img src={review} alt="reviewImage" className="img-fluid"></img></div> */}
          <div className="p-2" style={{fontSize:"0.8rem"}}>
            <div><b>09 April</b> <span>Tuesday</span></div>
            <div>Ugadi/Ramzan</div>
          </div>
          <div className="p-2" style={{fontSize:"0.8rem"}}>
            <div><b>09 April</b> <span>Tuesday</span></div>
            <div>Ugadi/Ramzan</div>
          </div>
          <div className="p-2" style={{fontSize:"0.8rem"}}>
            <div><b>09 April</b> <span>Tuesday</span></div>
            <div>Ugadi/Ramzan</div>
          </div>
          <div className="p-2" style={{fontSize:"0.8rem"}}>
            <div><b>09 April</b> <span>Tuesday</span></div>
            <div>Ugadi/Ramzan</div>
          </div>
           
        </div>
      </div>
      
      <div className="col-lg-4 col-md-4  my-1 tabs">
        <div className="col-12   border rounded   p-2 ">
        <div className="d-flex justify-content-between"><h6>Payslip</h6><span><i class="fi fi-ts-arrow-up-right"></i></span></div>
          
           
               <div className="my-3" style={{fontSize:"0.7rem"}}>
                 <div className="col-12">
                  <div className="d-flex my-3">
                    <div className="col-3"><img src={pie} className="img-fluid" alt="pieChart"></img></div>
                    <div className="col-9 text-end">
                      <p>{monthsInArray[date.getMonth()]} {date.getFullYear()}</p>
                      <p>2</p>
                      <p style={{opacity:"0.8"}}>Paid Days</p></div></div> 
                 <p className="d-flex align-items-center justify-content-between "><span><i className="fi fi-tr-tally-1 fs-3" style={{color:"black"}}></i> Gross Pay</span><span>&#8377; ****</span></p> 
                 <p className="d-flex align-items-center justify-content-between "><span><i className="fi fi-tr-tally-1 fs-3" style={{color:"wheat"}}></i> Deduction </span><span>&#8377; ****</span></p> 
                 <p className="d-flex align-items-center justify-content-between "><span><i className="fi fi-tr-tally-1 fs-3" style={{color:"#0174b1"}}></i> Net Pay</span><span>&#8377; ****</span></p>
                 </div>
                  <div className="d-flex justify-content-between"><a href="#links">Downloads</a><a href="#links">Show Salary</a></div>
                </div>
           
        </div>
      </div>
      <div className="col-lg-4 col-md-4  my-1 tabs">
        <div className="col-12   border rounded   p-2 ">
          <h6 className="mb-4">IT Declaration</h6>
          
           
               <div className="d-flex" style={{fontSize:"0.7rem"}}>
                 <div className="col-2">
                   <img alt="taxable" src={taxable} className="img-fluid"></img>
                 </div>
                 <div className="col-10 rounded p-3"  >Hold on! You can submit your Income Tax (IT) declaration once released.</div>
                </div>
           
        </div>
      </div>
      <div className="col-lg-4 col-md-4  my-1 tabs">
        <div className="col-12   border rounded   p-2 ">
          <h6 className="mb-4">POI</h6>
          
           
               <div className="d-flex" style={{fontSize:"0.7rem"}}>
                 <div className="col-2">
                   <img alt="taxable" src={poi} className="img-fluid"></img>
                 </div>
                 <div className="col-10 rounded p-3"  >Hold on! You can submit your Proof of Investments (POI) once released.</div>
                </div>
           
        </div>
      </div>
      <div className="col-lg-4 col-md-4  my-1  tabs">
        <div className="col-12   border rounded    p-2  " >
          <h6>Track</h6>
          <div className="col-3 mx-auto my-3"><img src={track} alt="reviewImage" className="img-fluid"></img></div>
          <p className="my-1 p-1 text-center">All good! You've nothing new to track.</p>
        </div>
      </div>
      

    </div>
    </div>
     
    </div>
  
  </div></div>)
}