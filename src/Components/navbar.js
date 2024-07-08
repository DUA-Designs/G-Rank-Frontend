 
import { useDispatch, useSelector } from 'react-redux';
import {authentication, grank, profilePic} from '../media';
import {Link} from 'react-router-dom';
import { WebDev, userInterfaces } from './interfaces';
 import { newTask, nullNotifications   } from "../media";
import { useEffect, useState } from 'react';
import { signInChecker } from '../redux/signInSlice';


                          
 import 'primeicons/primeicons.css';


export function Navbar(){
  const user=useSelector(state=>state.user.value);
  const dispatch =useDispatch();
  const signIn=useSelector(state=>state.signIn.value);
 
  


  useEffect(  ()=>{
   
 var date=new Date();
 
 
    

      //  const response =await axios.get(`https://g-rank-backend.onrender.com/attendance?EmployeeID=${user.EmployeeID}&swipedDate=${swipedDate}&swipe=${swipe}`);
  // console.log(user["Attendance"][0].swipedDate );

     let dateExist=user["Attendance"].filter(item=>item.swipedDate===`${date.getDate()}-${date.getMonth()>9?date.getMonth()+1:"0"+(date.getMonth()+1)}-${date.getFullYear()}`);
 
   
 
      if(  dateExist.length>=1   ){
   
        
                  dispatch(signInChecker(true));
              
      }
      else {

      }
      
      


  } ,[ ]);

 
 
 
 
 
 

    return (
        <div className="     p-2" id="nav-bar">
        
          <div  className="col-12   mb-3 p-2 d-flex align-items-center justify-content-between"> <img src={grank} alt="G-rank Digital Services Private Limited" className="img-fluid"  style={{width:"150px"}}></img>  </div>
          <div className='d-flex flex-wrap my-1 text-nowrap align-items-center justify-content-between  '>
            <div className='col-4 mx-auto'><img className="img-fluid" src={profilePic} alt='profilePicture'></img></div>
            <div className='col-8 mx-auto p-2'><b>   {user.hasOwnProperty("Name")?user["Name"].split(" ")[0]:""}</b></div>
        
            </div>
          <div  id='profile' className='mb-4'>
          
         <Link className='myLinks' to={"/myProfile"}>View My Info</Link> 
          <Link to={"/settings"} className='myLinks'><i className="fi fi-tr-process"></i></Link> 
          </div>
          {/* userInterfaces[user["Designation"]]?userInterfaces[user["Designation"]]:<WebDev/> */}
          { signIn?userInterfaces[user["Designation"]]?userInterfaces[user["Designation"]]:<WebDev/>:
          
          <div>
              <ul className="nav-links">

                    <li><Link className="myLinks" to={"/"}><span><i className="fi fi-tr-house-chimney"></i></span><span> Home</span></Link></li>
                    <li><Link className="myLinks" to={"/attendance"}><span><i className="fi fi-ts-calendar-check"></i></span><span> Attendance</span></Link></li>
                    <li><Link className="myLinks" to={"/assessments"}><span><i className="fi fi-ts-poll-h"></i></span><span>Assessments</span></Link></li>
                    <li><Link className="myLinks" to={"/reports"}><span><i class="fi fi-ts-newspaper"></i></span><span> Reports</span></Link></li>
                    <li><Link className="myLinks" to={"/appraisals"}><span> <i class="fi fi-ts-chart-user"></i></span><span>Appraisals</span></Link></li>
                </ul>
              <img src={authentication} alt='authentication' className='img-fluid mt-5 d-block mx-auto'></img>
                <p className='py-4 text-center'>Please sign in to access tasks</p>
          
              
          </div>
          }
 

         <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasRightLabel">Notifications</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body   ">
                    {user.Notification?<Link className="taskNotification" to={"/dueTask"}><div className="p-3 text-center d-flex align-items-center justify-content-around "><h5>You have got new  Task </h5><img alt="task" src={newTask} className="col-2"></img></div></Link>:<div><h5 className="text-center p-3">Nothing new here</h5><img src={nullNotifications} alt="Nothing new here" className="img-fluid col-lg-10 col-md-10 d-block mx-auto"></img></div>}
            </div>
          </div>
 

                  <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header">
                    
                      <h5 className="offcanvas-title" id="staticBackdropLabel">  <div  className="col-12  mt-1 mb-3 p-2 d-flex align-items-center justify-content-between"> <img src={grank} alt="G-rank Digital Services Private Limited" className="img-fluid  "  style={{width:"150px"}}></img> <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> </div>
                            <ul   >
                              <li className='row'><div className='col-4'><img className="img-fluid" src={profilePic} alt='profilePicture'></img></div><span className='col-6'><b>Hi   {user["Name"]}</b></span> <span className='col-2 gear'  ><Link to={"/settings"} className='myLinks'><i className="fi fi-tr-process"></i></Link></span></li>

                              <li><Link className='myLinks' to={"/myProfile"}>View My Info</Link></li>
                            </ul>
                      </h5>
                               
                     
                    </div>
                    <div className="offcanvas-body">
                      <div>
                           {userInterfaces[user["Designation"]]?userInterfaces[user["Designation"]]:<WebDev/>}
                    
                           
                      </div>
                    </div>
                  </div>
          


          
          
          </div> 
    )
}