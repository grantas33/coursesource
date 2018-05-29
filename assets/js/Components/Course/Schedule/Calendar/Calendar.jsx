import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
moment.locale('ko', {
  week: {
    dow: 1,
    doy: 1,
  },
})
BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

const Calendar = props => (
  <div>
    <BigCalendar 
      events={props.events} 
      views={props.views} 
      step={60} 
      defaultDate={new Date()}
      eventPropGetter={(props.eventStyleGetter)}
      defaultView={props.view}
      toolbar={props.toolbar}
    />
      
  </div>
)

export default Calendar
