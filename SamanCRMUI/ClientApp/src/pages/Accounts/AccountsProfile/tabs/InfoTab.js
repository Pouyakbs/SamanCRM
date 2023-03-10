import React, { useState, useEffect } from "react"; // @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useSearchParams } from "react-router-dom";
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
import MDBox from "../../../../components/MDBox/index";
import MDTypography from "../../../../components/MDTypography/index";

// Material Dashboard 2 React example components
import ProfileInfoCard from "../ProfileInfoCard/index";
import CommunicationInfoCard from "../CommunicationInfoCard/index";
import SocialMediaCard from "../SocialMediaCard/index";
import CallsInfoCard from "../CallsInfoCard/index";
import DutyInfoCard from "../DutyInfoCard/index";
import SessionsInfoCard from "../SessionsInfoCard/index";
import NotesInfoCard from "../NotesInfoCard/index";
import PersonInfoCard from "../PersonInfoCard/index";
import ProfilesList from "../ProfilesList/index";


// Data
import axios from "axios";
import { useTranslation } from "react-i18next";
import { getLangDate } from "../../../../utils/getLangDate";
import { Alert } from "@mui/material";
import { TabPanel } from "@mui/lab";

function InfoTab() {
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const appConfig = window.globalConfig;
  const { t, i18n } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const [datasource, setDataSource] = useState([]);
  const [personnelID, setPersonnelID] = useState();
  const [callsData, setCallsData] = useState([]);
  const [notesData, setNotesData] = useState([]);
  const [dutyData, setDutyData] = useState([]);
  const [sessionData, setSessionData] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const getData = () => {
    axios.get(`${appConfig.BaseURL}/api/Account/${id}`).then((res) => {
      res.data.data.contactFields = JSON.parse(res.data.data.contactFields);
      res.data.data.phoneNumber = res.data.data.contactFields.map(
        (item) => item.phoneNumber
      );
      setDataSource(res.data.data);
    });
    axios
      .get(`${appConfig.BaseURL}/api/activities/Contact`)
      .then((res) => {
        let calls = res.data.data.filter(a=>a.status != "?????????? ??????")
        setCallsData(
          calls.map((item) => {
            return {
              id: item.activityID,
              subject: item.subject,
            };
          })
        )
      }
      )
      .catch((error) => error);
    axios
      .get(`${appConfig.BaseURL}/api/activities/Duty`)
      .then((res) =>{
        let dutys = res.data.data.filter(a=>a.status != "?????????? ??????")
        setDutyData(
          dutys.map((item) => {
            return {
              id: item.activityID,
              subject: item.subject,
            };
          })
        )
      }
      )
      .catch((error) => error);
    axios
      .get(`${appConfig.BaseURL}/api/activities/Session`)
      .then((res) => {
        let sessions = res.data.data.filter(a=>a.status != "?????????? ??????")
        setSessionData(
          sessions.map((item) => {
            return {
              id: item.activityID,
              subject: item.subject,
            };
          })
        )
      }
      )
      .catch((error) => error);
      axios
        .get(`${appConfig.BaseURL}/api/activities/Note`)
        .then((res) => {
          let sessions = res.data.data.filter(a=>a.status != "?????????? ??????")
          setNotesData(
            sessions.map((item) => {
              return {
                id: item.activityID,
                subject: item.subject,
              };
            })
          )
        }
        )
        .catch((error) => error);
  }
  useEffect(() => {
    datasource.map((items) => {
      return {
        ...items,
        phoneNumber: datasource.contactFields.map((item) => item.phoneNumber),
      };
    });
    getData()
  }, []);
  return (
    <>
      <MDBox mt={5} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="?????????????? ????????"
              info={{
                "??????": datasource?.name + " " + datasource?.surname,
                "?????? ????????": datasource.accountType,
                "?????????? ????????????": datasource.attractiveness,
                "???? ??????": datasource.nationalNum,
                "?????????? ??????????": datasource.saleDiscount + "%",
                "?????? ????????????": datasource.validityType,
                "?????????? ????????????": datasource.validityStatus,
                "????????": datasource.industry,
                "??????????????": datasource.subIndustry,
                "?????????? ??????????": getLangDate(
                  i18n.language,
                  new Date(datasource.expireTime)
                ),
                "?????????? ??????": datasource.subNumber,
                "???? ??????????????": datasource.ecoCode,
              }}
              action={{
                route: `/accounts/NewAccount?id=${datasource.accountID}`,
                tooltip: "????????????",
              }}
              shadow={false}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1, borderColor: "rgb(0 0 0 / 20%)" , marginLeft: "unset" , marginRight: "unset" }} />
            <CommunicationInfoCard
              title="????????"
              info={{
                ????????: datasource.country,
                ??????????: datasource.state,
                ??????: datasource.city,
                "???? ????????": datasource.postalCode,
                "???????? ????????": datasource.address,
                "???????? ??????????": datasource.phoneNumber,
              }}
              shadow={false}
            />
            <Divider orientation="vertical" sx={{ mx: 0, borderColor: "rgb(0 0 0 / 20%)" , marginLeft: "unset" , marginRight: "unset" }} />
          </Grid>
          <Grid item xs={12} xl={4}>
            <SocialMediaCard
              title="???????? ?????? ????????????????????"
              info={{
                "???????? ?????????? ?????? ???? ???????????? ??????????": "",
                ????????: "",
              }}
              social={[
                {
                  name: "????????????????????",
                  link: datasource.instagram,
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
                {
                  name: "??????????????",
                  link: datasource.linkedIn,
                  icon: <LinkedInIcon />,
                  color: "linkedin",
                },
                {
                  name: "????????????",
                  link: datasource.twitter,
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  name: "????????????",
                  link: datasource.facebook,
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  name: "????????????",
                  link: datasource.blog,
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
          ???????????? ????
        </MDTypography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4}>
            <CallsInfoCard
              title="???????? ????"
              info={{
                ??????????: callsData,
              }}
              getData={getData}
              shadow={false}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1, borderColor: "rgb(0 0 0 / 20%)" , marginLeft: "unset" , marginRight: "unset" }} />
            <DutyInfoCard
              title="??????????"
              info={{
                ??????????: dutyData,
              }}
              getData={getData}
              shadow={false}
            />
            <Divider orientation="vertical" sx={{ mx: 0, borderColor: "rgb(0 0 0 / 20%)" , marginLeft: "unset" , marginRight: "unset" }} />
          </Grid>
          <Grid item xs={12} xl={4}>
            <SessionsInfoCard
              title="??????????"
              info={{
                ??????????: sessionData,
              }}
              getData={getData}
              shadow={false}
            />
          </Grid>
        </Grid>
      
        
        <Grid container spacing={1}>
        <Grid item xs={12} md={6} xl={4}>
            <NotesInfoCard
              title="?????????????? ????"
              info={{
                ??????????: notesData,
              }}
              getData={getData}
              shadow={false}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={8} sx={{ display: "flex" }}>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1, borderColor: "rgb(0 0 0 / 20%)" , marginLeft: "unset" , marginRight: "unset" }} />
            <PersonInfoCard
              title="??????????"
            accountID={datasource.accountID}
            shadow={false}
            />
          </Grid>
          </Grid>
      </MDBox>
    </>
  );
}

export default InfoTab;
