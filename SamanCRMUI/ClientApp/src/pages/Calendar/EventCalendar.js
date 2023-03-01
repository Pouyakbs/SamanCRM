import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import '../../style.css'
import faLocale from '@fullcalendar/core/locales/fa';
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import iCalendarPlugin from '@fullcalendar/icalendar'
import {
  useTheme,
} from "@mui/material";
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import axios from "axios";
import { useState , useEffect } from "react";

const EventCalendar = () => {
  const appConfig = window.globalConfig;
  const [events, setEvents] = useState([]); 
  console.log("events" , events)
  const theme = useTheme();
  const handleSelect = (info) => {
    console.log("info" , info)
    const { start, end } = info;
    const eventNamePrompt = prompt("Enter, event name");
    if (eventNamePrompt) {
      setEvents([
        ...events,
        {
          start,
          end,
          title: eventNamePrompt,
          color: "#378006",
          id: Math.random(),
        },
      ]);
    }
  };
  return (
    <div className='calendar' 
    style={{
      backgroundColor: `${theme.palette.background.paper}`,
      padding: "20px",
    }}>
      <FullCalendar 
        editable
        plugins={[ daygridPlugin, interactionPlugin , bootstrap5Plugin , momentTimezonePlugin , timeGridPlugin, googleCalendarPlugin, iCalendarPlugin ]}
        locales={[ faLocale ]}
        locale= 'fa'
        dayMaxEventRows={true}
        navLinks = "true"
        selectMirror={true}
        select={handleSelect}
        weekends={true}
        businessHours ={[ // specify an array instead
          {
            daysOfWeek: [ 0 , 1, 2, 3 , 6 , 7 ], // Monday, Tuesday, Wednesday
            startTime: '08:00', // 8am
            endTime: '17:00', // 5pm
          },
          {
            daysOfWeek: [ 4 ], // Thursday
            startTime: '08:00', // 8am
            endTime: '15:00' // 3pm
          }
        ]}
        events= {{
            url: 'https://calendar.google.com/calendar/ical/en.ir%23holiday%40group.v.calendar.google.com/public/basic.ics',
            format: 'ics'
          }}
        fixedWeekCount={true}
        showNonCurrentDates={true}
        dateAlignment="day"
        headerToolbar={{
          start: "today prev next",
          center: "title",
          end: "dayGridMonth timeGridWeek timeGridDay",
        }}
        themeSystem= 'bootstrap5'
        views={["dayGridMonth", "timeGridWeek", "timeGridDay"]}
        nowIndicator={true}
      />
    </div>
  );
};


export default EventCalendar;