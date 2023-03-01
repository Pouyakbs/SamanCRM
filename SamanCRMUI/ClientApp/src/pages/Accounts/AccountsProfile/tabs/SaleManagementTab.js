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
import CluesInfoCard from "../CluesInfoCard/index";
import ProjectInfoCard from "../ProjectInfoCard/index";
import OpportunitiesInfoCard from "../OpportunitiesInfoCard/index";
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

function SaleManagementTab() {
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const appConfig = window.globalConfig;
  const { t, i18n } = useTranslation();
  const [cluesData, setCluesData] = useState([]);
  const [opportunitiesData, setOpportunitiesData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const getData = () => {
    axios
      .get(`${appConfig.BaseURL}/api/Clues`)
      .then((res) => {
        setCluesData(
          res.data.data.map((item) => {
            return {
              id: item.clueID,
              firstName: item.firstName,
              lastName: item.lastName,
            };
          })
        )
      }
      )
      .catch((error) => error);
    axios
      .get(`${appConfig.BaseURL}/api/opportunities`)
      .then((res) =>{
        setOpportunitiesData(
          res.data.data.map((item) => {
            return {
              id: item.opportunityID,
              opportunityName: item.opportunityName,
            };
          })
        )
      }
      )
      .catch((error) => error);
    axios
      .get(`${appConfig.BaseURL}/api/project`)
      .then((res) => {
        setProjectData(
          res.data.data.map((item) => {
            return {
              id: item.projectID,
              opportunityName: item.name,
            };
          })
        )
      }
      )
      .catch((error) => error);
  }
  useEffect(() => {
    getData()
  }, []);
  return (
    <>
      <MDBox pt={2} px={2} lineHeight={1.25}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4}>
            <CluesInfoCard
              title="سرنخ"
              info={{
                موضوع: cluesData,
              }}
              getData={getData}
              shadow={false}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1, borderColor: "rgb(0 0 0 / 20%)" , marginLeft: "unset" , marginRight: "unset" }} />
            <OpportunitiesInfoCard
              title="فرصت"
              info={{
                موضوع: opportunitiesData,
              }}
              getData={getData}
              shadow={false}
            />
            <Divider orientation="vertical" sx={{ mx: 0, borderColor: "rgb(0 0 0 / 20%)" , marginLeft: "unset" , marginRight: "unset" }} />
          </Grid>
          <Grid item xs={12} xl={4}>
            <ProjectInfoCard
              title="پروژه"
              info={{
                موضوع: projectData,
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

export default SaleManagementTab;
