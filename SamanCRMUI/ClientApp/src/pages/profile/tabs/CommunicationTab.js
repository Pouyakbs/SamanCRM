import React, { useState, useEffect } from "react"; // @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
// @mui icons
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import DeleteIcon from '@mui/icons-material/Delete';
import MarkEmailReadRoundedIcon from '@mui/icons-material/MarkEmailReadRounded';

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox/index";

// Material Dashboard 2 React example components
import EmailsInfoCard from "../EmailsInfoCard/index";
import CalendarInfoCard from "../CalendarInfoCard/index";
import ProfilesList from "../ProfilesList/index";


// Overview page components
import Header from "../components/Header/index";
import PlatformSettings from "../components/PlatformSettings/index";

// Data
import profilesListData from "../data/profilesListData";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { getLangDate } from "../../../utils/getLangDate";
import { Alert } from "@mui/material";
import { TabPanel } from "@mui/lab";

function CommunicationTab() {
  const appConfig = window.globalConfig;
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const { t, i18n } = useTranslation();
  const getData = () => {
  }
  useEffect(() => {
    getData()
  }, []);
  return (
    <>
      <MDBox mt={5} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4}>
            <EmailsInfoCard
              title="ایمیل"
              info={{
                "صندوق دریافت": "صندوق دریافت (0)",
                "حذف شده": "حذف شده (0)",
                "ارسال شده": "ارسال شده (0)",
                "پیش نویس ها": "پیش نویس ها (0)",
              }}
              icons={[
                {
                  info: "صندوق دریافت (0)",
                  icon: <InboxIcon />,
                },
                {
                  info: "حذف شده (0)",
                  icon: <DeleteIcon />,
                },
                {
                  info: "ارسال شده (0)",
                  icon: <MarkEmailReadRoundedIcon />,
                },
                {
                  info: "پیش نویس ها (0)",
                  icon: <DraftsIcon />,
                },
              ]}
              shadow={false}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1, borderColor: "rgb(0 0 0 / 20%)" , marginLeft: "unset" , marginRight: "unset" }} />
            <CalendarInfoCard
            title="تقویم برنامه ریزی"
            shadow={false}
            />
            <Divider orientation="vertical" sx={{ mx: 0, borderColor: "rgb(0 0 0 / 20%)" , marginLeft: "unset" , marginRight: "unset" }} />
          </Grid>
          <Grid item xs={12} xl={4}>
            <ProfilesList title="چت" profiles={profilesListData} shadow={false} />
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
}

export default CommunicationTab;
