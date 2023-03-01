// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import React , { useState , useEffect } from "react";
import axios from "axios";
import MDBox from "../../../components/MDBox/index";
import MDTypography from "../../../components/MDTypography/index";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../../../style.css";
import faLocale from "@fullcalendar/core/locales/fa";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import { useTheme } from "@mui/material";
import timeGridPlugin from "@fullcalendar/timegrid";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

function CalendarInfoCard({ title, shadow }) {
  const appConfig = window.globalConfig;
  const theme = useTheme();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // if(!events.length){
    axios.get(`${appConfig.BaseURL}/api/Activities/Session`).then((res) => {
      let temp = res.data.data.map((item) => {
        let startDateSplit = item.time.split(":");
        let endDateSplit = item.duration.split(":");
        let startDateHour = new Date(item.date).setHours(
          parseInt(startDateSplit[0])
        );
        let endDateHour = new Date(item.date).setHours(
          parseInt(startDateSplit[0]) + parseInt(endDateSplit[0])
        );
        let startDateTime = new Date(startDateHour).setMinutes(
          parseInt(startDateSplit[1])
        );
        let endDateTime = new Date(endDateHour).setMinutes(
          parseInt(startDateSplit[1]) + parseInt(endDateSplit[1])
        );
        return {
          start: new Date(startDateTime),
          end: new Date(endDateTime),
          title: `جلسه درمورد ${item.subject} - ${item.meetinglocation}`,
          color: "rgb(81 88 221 / 74%)",
          id: item.detailID,
        };
      });
      setEvents((events) => [...events, ...temp]);
    });
    axios.get(`${appConfig.BaseURL}/api/Activities/Contact`).then((res) => {
      let temp = res.data.data.map((item) => {
        let startDateSplit = item.time.split(":");
        let endDateSplit = item.duration.split(":");
        let startDateHour = new Date(item.date).setHours(
          parseInt(startDateSplit[0])
        );
        let endDateHour = new Date(item.date).setHours(
          parseInt(startDateSplit[0]) + parseInt(endDateSplit[0])
        );
        let startDateTime = new Date(startDateHour).setMinutes(
          parseInt(startDateSplit[1])
        );
        let endDateTime = new Date(endDateHour).setMinutes(
          parseInt(startDateSplit[1]) + parseInt(endDateSplit[1])
        );
        return {
          start: new Date(startDateTime),
          end: new Date(endDateTime),
          title: `تماس درمورد ${item.subject}`,
          color: "rgb(255 80 80 / 74%)",
          id: item.detailID,
        };
      });
      setEvents((events) => [...events, ...temp]);
    });
    axios.get(`${appConfig.BaseURL}/api/Activities/Duty`).then((res) => {
      let temp = res.data.data.map((item) => {
        let startDateSplit = item.startTime.split(":");
        let endDateSplit = item.time.split(":");
        let startDateHour = new Date(item.date).setHours(
          parseInt(startDateSplit[0])
        );
        let endDateHour = new Date(item.date).setHours(
          parseInt(endDateSplit[0])
        );
        let startDateTime = new Date(startDateHour).setMinutes(
          parseInt(startDateSplit[1])
        );
        let endDateTime = new Date(endDateHour).setMinutes(
          parseInt(endDateSplit[1])
        );
        return {
          start: new Date(startDateTime),
          end: new Date(endDateTime),
          title: `وظیفه درمورد ${item.subject}`,
          color: "rgb(83 198 255/ 74%)",
          id: item.detailID,
        };
      });

      setEvents((events) => [...events, ...temp]);
    });
  }, []);

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none", width: "100%" }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        px={2}
      >
        <MDTypography
          className="profiletitle"
          variant="h5"
          fontWeight="medium"
          textTransform="capitalize"
        >
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>
          <div
            className="calendar"
            style={{
              backgroundColor: `${theme.palette.background.paper}`,
              padding: "20px",
            }}
          >
            <FullCalendar
              editable
              locales={[faLocale]}
              locale="fa"
              events={events}
              dayMaxEventRows={true}
              navLinks="true"
              selectMirror={true}
              weekends={true}
              eventColor={events.map((item) => item.color)}
              businessHours={[
                // specify an array instead
                {
                  daysOfWeek: [0, 1, 2, 3, 6, 7], // Monday, Tuesday, Wednesday
                  startTime: "08:00", // 8am
                  endTime: "17:00", // 5pm
                },
                {
                  daysOfWeek: [4], // Thursday
                  startTime: "08:00", // 8am
                  endTime: "15:00", // 3pm
                },
              ]}
              fixedWeekCount={true}
              showNonCurrentDates={true}
              dateAlignment="day"
              initialView="timeGridDay"
              headerToolbar={{
                start: "today prev",
                center: "title",
                end: "next",
              }}
              plugins={[
                daygridPlugin,
                interactionPlugin,
                bootstrap5Plugin,
                momentTimezonePlugin,
                timeGridPlugin,
              ]}
              themeSystem="bootstrap5"
              nowIndicator={true}
            />
          </div>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
CalendarInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
CalendarInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  shadow: PropTypes.bool,
};

export default CalendarInfoCard;
