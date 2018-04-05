import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import '/home/matt/Documents/coursesource/node_modules/react-big-calendar/lib/css/react-big-calendar.css';
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

const Calendar = () => (
  <div>
    <BigCalendar
      events={events}
      views={[
        'month',
        'week',
        'day',
        'agenda',
      ]}
      step={60}
      defaultDate={new Date(2015, 3, 1)}
    />
  </div>
);

export default Calendar;
