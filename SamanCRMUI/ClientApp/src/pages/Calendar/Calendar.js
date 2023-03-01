import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from '@fullcalendar/interaction';
import '../../style.css'
import momentTimezonePlugin from '@fullcalendar/moment-timezone';
import {
  useTheme,
} from "@mui/material";
import timeGridPlugin from '@fullcalendar/timegrid';
import multiMonthPlugin from '@fullcalendar/multimonth'
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import allLocales from '@fullcalendar/core/locales-all';
import axios from "axios";
import { useState , useEffect } from "react";

const MyCalendar = () => {
  const appConfig = window.globalConfig;
  const [events, setEvents] = useState([]); 
  console.log("events" , events)
  const theme = useTheme();
  useEffect(() => {
    // if(!events.length){
      axios
      .get(`${appConfig.BaseURL}/api/Activities/Session`)
      .then((res) => {
        console.log('res.data.data1---------',res.data.data)
        if(res.data.data.length){
          let temp=res?.data?.data?.map((item) => {
            let startDateSplit = item?.time?.split(":")
            let endDateSplit = item?.duration?.split(":")
            let startDateHour =!!item?.date? new Date(item?.date).setHours(parseInt(startDateSplit[0])):''
            let endDateHour =!!item?.date? new Date(item?.date).setHours(parseInt(startDateSplit[0]) + parseInt(endDateSplit[0])):''
            let startDateTime =!!item?.date? new Date(startDateHour).setMinutes(parseInt(startDateSplit[1])):''
            let endDateTime =!!item?.date? new Date(endDateHour).setMinutes(parseInt(startDateSplit[1]) + parseInt(endDateSplit[1])):''
            return {
              start:!!startDateTime? new Date(startDateTime):'',
              end:!!endDateTime? new Date(endDateTime):'',
              title: `جلسه درمورد ${item?.subject} - ${item?.meetinglocation}`,
              color: "rgb(81 88 221 / 74%)",
              id: item?.detailID
            }
          }
          )
          setEvents(events=>[...events , ...temp])
        }
       
      
      });
      axios
      .get(`${appConfig.BaseURL}/api/Activities/Contact`)
      .then((res) => {
        console.log('res.data.data2---------',res.data.data)
        if(res.data.data.length){
        let temp=res.data?.data?.map((item) => {
          let startDateSplit = item?.time?.split(":")
          let endDateSplit = item?.duration?.split(":")
          let startDateHour =!!item?.date? new Date(item?.date).setHours(parseInt(startDateSplit[0])):''
          let endDateHour =!!item?.date? new Date(item?.date).setHours(parseInt(startDateSplit[0]) + parseInt(endDateSplit[0])):''
          let startDateTime =!!item?.date? new Date(startDateHour).setMinutes(parseInt(startDateSplit[1])):''
          let endDateTime =!!item?.date? new Date(endDateHour).setMinutes(parseInt(startDateSplit[1]) + parseInt(endDateSplit[1])):''
          return {
            start:!!startDateTime? new Date(startDateTime):'',
            end:!!endDateTime? new Date(endDateTime):'',
            title: `تماس درمورد ${item?.subject}`,
            color: "rgb(255 80 80 / 74%)",
            id: item?.detailID
          }
        })
        setEvents(events=>[...events , ...temp])
      }
      });
      axios
      .get(`${appConfig.BaseURL}/api/Activities/Duty`)
      .then((res) => {
        console.log('res.data.data3---------',res.data.data)
        if(res.data.data.length){
        let temp=res.data?.data?.map((item) => {
          let startDateSplit = item?.startTime?.split(":")
          let endDateSplit = item?.time?.split(":")
          let startDateHour =item?.date? new Date(item?.date).setHours(parseInt(startDateSplit[0])):''
          let endDateHour =item?.date? new Date(item.date).setHours(parseInt(endDateSplit[0])):''
          let startDateTime =item?.date? new Date(startDateHour).setMinutes(parseInt(startDateSplit[1])):''
          let endDateTime =item?.date? new Date(endDateHour).setMinutes(parseInt(endDateSplit[1])):''
          return {
            start:!!startDateTime? new Date(startDateTime):'',
            end:!!endDateTime? new Date(endDateTime):'',
            title: `وظیفه درمورد ${item?.subject}`,
            color: "rgb(83 198 255/ 74%)",
            id: item?.detailID
          }
        })
        setEvents(events=>[...events , ...temp])
      }
    });
    
  }, []);

  console.log('events',events)
  return (
    <div className='calendar'
    style={{
      backgroundColor: `${theme.palette.background.paper}`,
      padding: "20px",
    }}>
      <FullCalendar 
        editable
        locales={allLocales}
        timeZone='Asia/Tehran'
        locale='fa'
        events={events}
        dayMaxEventRows={true}
        navLinks = "true"
        selectMirror={true}
        weekends={true}
        eventColor= {events?.map((item) => item?.color)} 
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
        fixedWeekCount={false}
        showNonCurrentDates={true}
        dateAlignment="day"
        initialView='multiMonthYear'
        headerToolbar={{
          start: "today prev next",
          center: "title",
          end: "dayGridMonth timeGridWeek timeGridDay",
        }}
        plugins={[ daygridPlugin, interactionPlugin , bootstrap5Plugin , momentTimezonePlugin , timeGridPlugin, multiMonthPlugin ]}
        themeSystem= 'bootstrap5'
        views={["dayGridMonth", "timeGridWeek", "timeGridDay"]}
        nowIndicator={true}
      />
    </div>
  );
};


export default MyCalendar;