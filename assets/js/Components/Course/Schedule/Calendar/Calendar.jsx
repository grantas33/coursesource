import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.css';
import events from './events';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
moment.locale('ko', {
  week: {
    dow: 1,
    doy: 1,
  },
});
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const Calendar = (props) => (
  <div>
    <BigCalendar
      events={props.events}
      views={[
        'month',
        'week',
        'day',
        'agenda',
      ]}
      step={60}
      defaultDate={new Date()}
    />
  </div>
);

export default Calendar;
