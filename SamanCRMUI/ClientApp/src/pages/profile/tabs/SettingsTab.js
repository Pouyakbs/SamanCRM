import React, { useState, useEffect } from "react"; // @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IconBrandSkype } from "@tabler/icons";

// Material Dashboard 2 React components
import MDBox from "../../../components/MDBox/index";
import MDTypography from "../../../components/MDTypography/index";

// Material Dashboard 2 React example components
import ProfileInfoCard from "../ProfileInfoCard/index";
import CommunicationInfoCard from "../CommunicationInfoCard/index";
import SocialMediaCard from "../SocialMediaCard/index";
import CallsInfoCard from "../CallsInfoCard/index";
import DutyInfoCard from "../DutyInfoCard/index";
import SessionsInfoCard from "../SessionsInfoCard/index";
import ProfilesList from "../ProfilesList/index";

// Overview page components
import Header from "../components/Header/index";
import PlatformSettings from "../components/PlatformSettings/index";

// Data
import profilesListData from "../data/profilesListData";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { getLangDate } from "../../../utils/getLangDate";
import { Alert, Button } from "@mui/material";
import { TabPanel } from "@mui/lab";
import { useFormik } from "formik";

function SettingsTab() {
  const appConfig = window.globalConfig;
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const { t, i18n } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [datasource, setDataSource] = useState([]);
  const [personnelID, setPersonnelID] = useState();
  const [callsData, setCallsData] = useState([]);
  const [dutyData, setDutyData] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [result, setResult] = useState();
  const formik = useFormik({
    initialValues: [],
    onSubmit: (values) => {
      axios
        .post(`${appConfig.BaseURL}/api/ApplicationSettings`, values)
        .then((res) => setResult(res.data.data));
    }
  });
  return (
    <>
      <MDBox mt={5} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4}>
            <PlatformSettings getData={formik}/>
          </Grid>
          <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1, borderColor: "rgb(0 0 0 / 20%)" , marginLeft: "unset" , marginRight: "unset" }} />
            <Divider orientation="vertical" sx={{ mx: 0, borderColor: "rgb(0 0 0 / 20%)" , marginLeft: "unset" , marginRight: "unset" }} />
          </Grid>
          <Grid item xs={12} xl={4}>
          </Grid>
        </Grid>
              <div className="button-pos">
                <Button
                  variant="contained"
                  color="success"
                  type="button"
                  onClick={formik.handleSubmit}
                >
                  {t("ثبت")}
                </Button>
              </div>
      </MDBox>
    </>
  );
}

export default SettingsTab;
