import { useDispatch, useSelector } from "react-redux"
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
 
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { TreeSelect } from "primereact/treeselect";
import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { TabPanel, TabView } from "primereact/tabview";
import { Chart } from "primereact/chart";
import axios from "axios";
import tasks, { tasksAPI } from "../../redux/tasks";
import { Column } from "primereact/column";
import { TreeTable } from "primereact/treetable";
import { func } from "prop-types";
import { selectOption } from "../../media";
 
 
 // if using DnD
const localizer = momentLocalizer(moment);


 

export function CalendarComp( ){
     const [selectedMonth, setSelectedMonth] = useState(null);
     const [selectedMonthForEmployee, setSelectedMonthForEmployee] = useState(null);
     const [selectedMonthForSelf,setSelectedMonthForSelf]=useState(null);
     const [months,setMonths]=useState([]);
      
     const [employees,setEmployees]=useState([]);
     const dispatch=useDispatch();
  
     const [selfNodes, setSelfNodes] = useState([]);
          const [employeeNodes, setEmployeeNodes] = useState([]);
 
    const monthsData = [
        { name: 'Jan', code: '1' },
        { name: 'Feb', code: '2' },
        { name: 'Mar', code: '3' },
        { name: 'Apr', code: '4' },
        { name: 'May', code: '5' },
          { name: 'Jun', code: '6' }, { name: 'Jul', code: '7' }, { name: 'Aug', code: '8' }, { name: 'Sep', code: '9' }, { name: 'Oct', code: '10' }, { name: 'Nov', code: '11' }, { name: 'Dec', code: '12' }
    ];
     const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
     const [selectedEmployee, setSelectedEmployee] = useState(null);
      const Tasks=useSelector(state=>state.tasks.value);
    // const Employees = [
    //     { name: 'Dasari Uday Aravind', code: '9299' },
    //     { name: 'Punna Prashanth', code: '9300' },
    //     { name: 'Sai Sreeja', code: 'LDN' },
    //     { name: 'Shreya', code: 'IST' },
    //     { name: 'Tejaswini', code: 'PRS' },
    //     //   { name: 'June', code: 'PRS' }
    // ];
 
  const user=useSelector(state=>state.user.value);
  async function getEmployees(){
        let response=await axios.get("https://g-rank-backend.onrender.com/employees"); 
        setEmployees(response.data);
       
  }

    async function handleEmployeeAnalysis(e,from){
        if(from==="fromEmp"){

            setSelectedEmployee(e.value);
             

            if(!selectedMonthForEmployee){
                return "";
            }
           
        }
        else{ setSelectedMonthForEmployee(e.value);
         if(!selectedEmployee){
            return ""
         }
        }
        
 

           
   const tasksInMonth=Tasks.filter(item=>Number(item["startedDate"].split("-")[1])===Number(from==="fromEmp"?selectedMonthForEmployee.code:e.value.code) && item.Dev===(from==="fromEmp"?e.value.Name:selectedEmployee.Name));
    

        // let baseObject={
        //                 key: '0',
        //                 data: {
        //                         name: 'Applications',
        //                         size: '100kb',
        //                         type: 'Folder'
        //                     }
        //         };
                let filledObject= [];
                       
if(tasksInMonth.length>=1){
    for ( let i=0;i<tasksInMonth.length;i++){

            filledObject.push({key:i,data:{name:tasksInMonth[i].Task,startedDate:tasksInMonth[i].startedDate,Progress:tasksInMonth[i].Progress}})

}
}

 const employeeData = {
     

        getTreeTableNodesData() {
            return filledObject;
        },

        getTreeTableNodes() {
            return Promise.resolve(this.getTreeTableNodesData());
        },

        
 }
      
     employeeData.getTreeTableNodes().then((data) => setEmployeeNodes(data));
 
     
 
        
  
       
 
        


    }

  async function handleSelfAnalysis(e){
    setSelectedMonthForSelf(e.value);


 const tasksInMonth=Tasks.filter(item=>Number(item["startedDate"].split("-")[1])===Number(e.value.code));
 

        let baseObject={
                        key: '0',
                        data: {
                                name: 'Applications',
                                size: '100kb',
                                type: 'Folder'
                            }
                };
                let filledObject= [];
                       
for ( let i=0;i<tasksInMonth.length;i++){

            filledObject.push({key:i,data:{name:tasksInMonth[i].Task,startedDate:tasksInMonth[i].startedDate,Progress:tasksInMonth[i].Progress}})

}

    const selfData = {
      

        getTreeTableNodesData() {
            return  filledObject;
        },

        getTreeTableNodes() {
            return Promise.resolve(this.getTreeTableNodesData());
        },

         
    };
    selfData.getTreeTableNodes().then((data) => setSelfNodes(data));


  }

 async function handleAnalysis (e){
     
 
     
            setSelectedMonth(e.value);
          
             
             
               const tasksInMonth=Tasks.filter(item=>Number(item["startedDate"].split("-")[1])===Number(e.value.code));
            //    console.log(e.value.code,tasksInMonth);
               const total=tasksInMonth ;
               const wip=tasksInMonth.filter(item=>  item.Progress!=="Completed" && new Date().getTime()<= new Date(item.Deadline).getTime()) 
               const done=tasksInMonth.filter(item=> item.Progress==="Completed") 
               const pending =tasksInMonth.filter(item=>   item.Progress!=="Completed"  && new Date().getTime()> new Date(item.Deadline).getTime()) 
    
             
            //   console.log(total,wip,done,pending);
 




 const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: [  'WIP', `Due `,'Finished'],
            datasets: [
                {
                    data: [ wip.length,pending.length,done.length],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--green-500'),
                         
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400'),
                           
                    ]
                     
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }

                }
            }
            
        };

        setChartData(data);
        setChartOptions(options);

  }

useEffect(  ()=>{
      dispatch(tasksAPI());
   getEmployees();
   const date=new Date();
   let currentMonth=monthsData.filter(item=>Number(item.code)===(date.getMonth()+1))[0];
 

       handleAnalysis({value:  currentMonth});

 

     handleSelfAnalysis({value: currentMonth})
     handleEmployeeAnalysis({value: currentMonth},"fromMonth");

     setMonths(monthsData.filter(item=>Number(item.code)<=(date.getMonth()+1)));
 
},[ ]);

    return (
    <div className="row ">
        <Navbar  />

      <div className="col-10 mx-auto   border sectionContainer" >
      < QuickAccess page={"Calendar"}/>
             <div className=" marginTop">
                {/* <Calendar
      localizer={localizer}
    
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    /> */}

              <div className="card">
            <TabView>
                <TabPanel header="Self">
                      <div> <Dropdown value={selectedMonthForSelf } defaultChecked onChange={(e) => handleSelfAnalysis(e)} options={months} optionLabel="name" filter  placeholder="Select a month" className="w-full md:w-14rem mb-3" /></div>
                     <div className="card flex justify-content-center  ">
                     
                          <TreeTable value={selfNodes} tableStyle={{ minWidth: '50rem' }}>
                                        <Column field="name" header="Project" expander></Column>
                                        <Column field="startedDate" header="Date"></Column>
                                        <Column field="Progress" header="Status"></Column>
                        </TreeTable>

                    </div>
                </TabPanel>
                <TabPanel header="Employees">Date
                      <div className="d-flex flex-wrap  mb-3">
                             <div className="  ">
                                    <Dropdown value={selectedEmployee} onChange={(e) => handleEmployeeAnalysis(e,"fromEmp")} options={employees} optionLabel="Name" placeholder="Select an employee" className="w-full md:w-14rem" />
                             </div>
                             <div className=" ps-3">
                             <Dropdown value={selectedMonthForEmployee} defaultChecked onChange={(e) => handleEmployeeAnalysis(e,"fromMonth")} options={months} optionLabel="name" filter  placeholder="Select a month" className="w-full md:w-14rem" />
                                  
                                      
                            </div>
                      </div>
                        <div className="card flex justify-content-center  "> 
                              {selectedEmployee?<TreeTable value={employeeNodes} tableStyle={{ minWidth: '50rem' }}>
                                <Column field="name" header="Project" expander></Column>
                                <Column field="startedDate" header="Date"></Column>
                                <Column field="Progress" header="Status"></Column>
                            </TreeTable>  :<div className="p-2">
                            <img src={selectOption} alt="select Employee" className="img-fluid col-lg-4 col-md-5 d-block mx-auto"></img>
                                <p className="text-center  ">Please select an Employee</p>
                            </div>} 
                        </div>
                </TabPanel>
                <TabPanel header="Analysis">
                      <Dropdown value={selectedMonth} defaultChecked onChange={(e) => handleAnalysis(e)} options={months} optionLabel="name" filter  placeholder="Select a month" className="w-full md:w-14rem" />

                       <div className="card flex justify-content-center py-2 col-lg-6 col-md-7 mx-auto"><Chart type="pie"  data={chartData} options={chartOptions} className="w-full md:w-30rem" /></div>
                </TabPanel>
            </TabView>
        </div>
 
                       
             </div>
      
      </div>
    </div>
    )
}