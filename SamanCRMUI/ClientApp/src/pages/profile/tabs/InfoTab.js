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
import { Alert } from "@mui/material";
import { TabPanel } from "@mui/lab";

function InfoTab() {
  const appConfig = window.globalConfig;
  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const { t, i18n } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [datasource, setDataSource] = useState([]);
  const [personnelID, setPersonnelID] = useState();
  console.log("personnelID", personnelID);
  const [callsData, setCallsData] = useState([]);
  const [dutyData, setDutyData] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const getData = () => {
    axios.get(`${appConfig.BaseURL}/api/Personnel/${user.id}`).then((res) => {
      res.data.data.contactFields = JSON.parse(res.data.data.contactFields);
      res.data.data.phoneNumber = res.data.data.contactFields.map(
        (item) => item.phoneNumber
      );
      setDataSource(res.data.data);
    });
    setPersonnelID(datasource.personnelID);
    axios
      .get(
        `${appConfig.BaseURL}/api/authenticate/GetUserByUserName/${user.username}`
      )
      .then((res) => {
        setUserDetail(res.data);
      });
    axios
      .get(
        `${appConfig.BaseURL}/api/activities/getbypersonnel/Contact/${user.id}`
      )
      .then((res) => {
        let calls = res.data.data.filter((a) => a.status != "انجام شده");
        setCallsData(
          calls.map((item) => {
            return {
              id: item.activityID,
              subject: item.subject,
            };
          })
        );
      })
      .catch((error) => error);
    axios
      .get(`${appConfig.BaseURL}/api/activities/getbypersonnel/Duty/${user.id}`)
      .then((res) => {
        let dutys = res.data.data.filter((a) => a.status != "انجام شده");
        setDutyData(
          dutys.map((item) => {
            return {
              id: item.activityID,
              subject: item.subject,
            };
          })
        );
      })
      .catch((error) => error);
    axios
      .get(
        `${appConfig.BaseURL}/api/activities/getbypersonnel/Session/${user.id}`
      )
      .then((res) => {
        let sessions = res.data.data.filter((a) => a.status != "انجام شده");
        setSessionData(
          sessions.map((item) => {
            return {
              id: item.activityID,
              subject: item.subject,
            };
          })
        );
      })
      .catch((error) => error);
  };
  useEffect(() => {
    datasource.map((items) => {
      return {
        ...items,
        phoneNumber: datasource.contactFields.map((item) => item.phoneNumber),
      };
    });
    getData();
  }, []);
  return (
    <>
      <MDBox mt={5} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="اطلاعات خصوصی"
              info={{
                "نام و نام خانوادگی": user?.name + " " + user?.surname,
                "کد ملی": datasource.nationalCode,
                وضعیت: userDetail.lockoutEnabled == true ? "فعال" : "غیرفعال",
                "تاریخ تولد": getLangDate(
                  i18n.language,
                  new Date(datasource.birthDate)
                ),
                جنسیت: "مرد",
                زبان: "فارسی",
              }}
              action={{
                route: `/BaseInfo/Personnels/NewPersonnel?id=${datasource.personnelID}`,
                tooltip: "ویرایش",
              }}
              shadow={false}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <Divider
              orientation="vertical"
              sx={{
                ml: -2,
                mr: 1,
                borderColor: "rgb(0 0 0 / 20%)",
                marginLeft: "unset",
                marginRight: "unset",
              }}
            />
            <CommunicationInfoCard
              title="اطلاعات تماس"
              info={{
                کشور: datasource.country,
                استان: datasource.state,
                شهر: datasource.city,
                "کد پستی": datasource.postalCode,
                "آدرس کامل": datasource.address,
                "تلفن همراه": datasource.phoneNumber,
              }}
              shadow={false}
            />
            <Divider
              orientation="vertical"
              sx={{
                mx: 0,
                borderColor: "rgb(0 0 0 / 20%)",
                marginLeft: "unset",
                marginRight: "unset",
              }}
            />
          </Grid>
          <Grid item xs={12} xl={4}>
            <SocialMediaCard
              title="تماس های الکترونیکی"
              info={{
                "تلفن ضروری یکی از بستگان نزدیک": "",
                نسبت: "",
              }}
              social={[
                {
                  name: "ایمیل",
                  link: "https://www.gmail.com",
                  icon: <EmailIcon />,
                  color: "email",
                },
                {
                  name: "واتساپ",
                  link: "https://www.WhatsApp.com",
                  icon: <WhatsAppIcon />,
                  color: "whatsapp",
                },
                {
                  name: "تلگرام",
                  link: "https://www.Telegram.com",
                  icon: <TelegramIcon />,
                  color: "telegram",
                },
                {
                  name: "اینستاگرام",
                  link: "https://www.instagram.com",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
                {
                  name: "لینکدین",
                  link: "https://www.LinkedIn.com",
                  icon: <LinkedInIcon />,
                  color: "linkedin",
                },
                {
                  name: "اسکایپ",
                  link: "https://www.Skype.com",
                  icon: <IconBrandSkype />,
                  color: "skype",
                },
                {
                  name: "توییتر",
                  link: "https://twitter.com",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  name: "فیسبوک",
                  link: "https://www.facebook.com",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  name: "وبسایت",
                  link: "https://www.mydejban.com",
                  icon: <WebAssetIcon />,
                  color: "website",
                },
              ]}
              shadow={false}
            />
          </Grid>
        </Grid>
      </MDBox>
      <MDBox pt={2} px={2} lineHeight={1.25}>
        <MDTypography className="profiletitle" variant="h5" fontWeight="medium">
          فعالیت ها
        </MDTypography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4}>
            <CallsInfoCard
              title="تماس ها"
              info={{
                موضوع: callsData,
              }}
              action={{
                route: `/Activities/Contact/CreateContact`,
                tooltip: "افزودن",
              }}
              getData={getData}
              shadow={false}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <Divider
              orientation="vertical"
              sx={{
                ml: -2,
                mr: 1,
                borderColor: "rgb(0 0 0 / 20%)",
                marginLeft: "unset",
                marginRight: "unset",
              }}
            />
            <DutyInfoCard
              title="وظایف"
              info={{
                موضوع: dutyData,
              }}
              action={{
                route: `/Activities/Duty/CreateDuty`,
                tooltip: "افزودن",
              }}
              getData={getData}
              shadow={false}
            />
            <Divider
              orientation="vertical"
              sx={{
                mx: 0,
                borderColor: "rgb(0 0 0 / 20%)",
                marginLeft: "unset",
                marginRight: "unset",
              }}
            />
          </Grid>
          <Grid item xs={12} xl={4}>
            <SessionsInfoCard
              title="جلسات"
              info={{
                موضوع: sessionData,
              }}
              action={{
                route: `/Activities/Meeting/CreateMeeting`,
                tooltip: "افزودن",
              }}
              getData={getData}
              shadow={false}
            />
          </Grid>
        </Grid>
      </MDBox>
    </>
  );
}

export default InfoTab;
