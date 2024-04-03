import { useSelector } from "react-redux"
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
 
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
 // if using DnD
const localizer = momentLocalizer(moment);

export function CalendarComp( ){
  const user=useSelector(state=>state.user.value);
    return (
    <div className="row ">
        <Navbar  />

      <div className="col-10 mx-auto   border sectionContainer" >
      < QuickAccess page={"Calendar"}/>
             <div className=" marginTop">
                <Calendar
      localizer={localizer}
    
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
             </div>
      
      </div>
    </div>
    )
}