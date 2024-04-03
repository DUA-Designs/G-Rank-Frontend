import { useSelector } from "react-redux"
import { Navbar } from "../navbar";
import { QuickAccess } from "../quickAccess";
 import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export function CalendarComp( ){
  const user=useSelector(state=>state.user.value);
    return (
    <div className="row ">
        <Navbar  />

      <div className="col-10 mx-auto   border sectionContainer" >
      < QuickAccess page={"Calendar"}/>
           <div className="marginTop">
                <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
    />
             </div>
      
      </div>
    </div>
    )
}