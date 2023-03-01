import React , { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import { Avatar, Box, Dialog, DialogContent } from "@mui/material";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { IconButton } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import MDBox from "../../../../components/MDBox";
import Tooltip from "@mui/material/Tooltip";
import MDTypography from "../../../../../components/MDTypography";
import { useTranslation } from "react-i18next";
import MDAvatar from "../../../../components/MDAvatar";
import CloseIcon from "@mui/icons-material/Close";
import breakpoints from "../../../../../assets/base/breakpoints";
import AnimateButton from "../../../../../components/@extended/AnimateButton";
import { IconSettings, IconMail, IconHome2, IconCash } from "@tabler/icons";
import UploadFile from "../../../../../components/UploadComponent/UploadFile";

// Images
import backgroundImage from "../../../../assets/images/ProfilePics/bg-profile.jpeg";
import { TabContext, TabPanel } from "@mui/lab";

function Header({ children }) {
  console.log("children" , children)
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  console.log("tabValue" , tabValue)
  const { t, i18n } = useTranslation();
  const [backgroundImageList, setBackgroundImageList] = useState([]);
  const [uploadError, setUploadError] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleClickOpen = () => {
    setOpen2(true);
  };
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [user] = useState(JSON.parse(localStorage.getItem("user")));

  function updateBackGroundImage(list) {
    var typeArr = []
    list.forEach(element => {
      let sp=element.file.split(';')
      let type=sp[0].split(':')
      typeArr.push(JSON.stringify({
        FileName: element.fileName,
        FileFormat: type[1],
        File: element.file.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''),
      }))
    });
  }
  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const style = {
    top: "50%",
    left: "50%",
    bgcolor: "background.paper",
  };
  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <>
    <MDBox position="relative" mb={5}>
    <TabContext value={tabValue}>
      <MDBox
        display="flex"
        alignItems= "flex-start"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        flexDirection= "column"
        sx={{
          backgroundImage: ({
            functions: { rgba, linearGradient },
            palette: { gradients },
          }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      >
        
        <AnimateButton type="scale">
                <Tooltip title={t("تغییر عکس پس زمینه")} placement="bottom">
                  <IconButton
                    color="inherit"
                    size="large"
                    aria-haspopup="true"
                    style={{ width: "30px", height: "30px" , border: "solid 1px #ffffffc7" , backgroundColor: "#ffffffc7" }}
                    disableRipple
                    onClick={handleClickOpen}
                  >
                    <CameraAltIcon sx={{color: "cornflowerblue"}} />
                  </IconButton>
                </Tooltip>
              </AnimateButton>
      </MDBox>
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              alt="profile user"
              className="avatar-profile"
              sx={{ width: 40, height: 40 }}
            >
              <AnimateButton type="scale">
                <Tooltip title={t("افزودن عکس پروفایل")} placement="bottom">
                  <IconButton
                    color="inherit"
                    size="large"
                    aria-haspopup="true"
                    style={{ width: "50px", height: "60px" }}
                    disableRipple
                  >
                    <CameraAltIcon />
                  </IconButton>
                </Tooltip>
              </AnimateButton>
            </Avatar>
            {/* <MDAvatar
              src={burceMars}
              alt="profile-image"
              size="xl"
              shadow="sm"
            /> */}
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {user?.name} {user?.surname}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {user?.role}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            sx={{
              ml: "auto",
              maxWidth: "unset!important",
              flexGrow: "1!important",
            }}
          >
            <AppBar
              position="static"
              sx={{
                backgroundColor: "unset",
                boxShadow: "unset",
                flexDirection: "unset",
                WebkitFlexDirection: "unset",
                justifyContent: "flex-end",
                flexGrow: 1,
              }}
            >
              <Tabs
                orientation={tabsOrientation}
                value={tabValue}
                onChange={handleSetTabValue}
                sx={{
                  overflow: "hidden",
                  display: "flex",
                  position: "relative",
                  justifyContent: "flex-end",
                  backgroundColor: "rgb(248, 249, 250)",
                  borderRadius: "0.75rem!important",
                  minHeight: "unset",
                  padding: "0.25rem",
                  height: "45px",
                }}
              >
                <Tab
                  label="اطلاعات فردی"
                  className="profiletab"
                  sx={{
                    height: "45px",
                  }}
                  icon={
                    <AnimateButton type="scale">
                      <IconButton
                        color="inherit"
                        size="large"
                        aria-haspopup="true"
                        style={{ width: "50px", height: "60px" }}
                        disableRipple
                      >
                        <AccountBoxIcon />
                      </IconButton>
                    </AnimateButton>
                  }
                  iconPosition="end"
                />
                <Tab
                  label="ارتباطات"
                  className="profiletab"
                  sx={{
                    height: "45px",
                  }}
                  icon={
                    <AnimateButton type="scale">
                      <IconButton
                        color="inherit"
                        size="large"
                        aria-haspopup="true"
                        style={{ width: "50px", height: "60px" }}
                        disableRipple
                      >
                        <IconMail />
                      </IconButton>
                    </AnimateButton>
                  }
                  iconPosition="end"
                />
                <Tab
                  label="تنظیمات"
                  className="profiletab"
                  sx={{
                    height: "45px",
                  }}
                  icon={
                    <AnimateButton type="rotate">
                      <IconButton
                        color="inherit"
                        size="large"
                        aria-haspopup="true"
                        style={{ width: "50px", height: "60px" }}
                        disableRipple
                      >
                        <IconSettings />
                      </IconButton>
                    </AnimateButton>
                  }
                  iconPosition="end"
                />
                <Tab
                  label="حقوق و دستمزد"
                  className="profiletab"
                  sx={{
                    height: "45px",
                  }}
                  icon={
                    <AnimateButton type="scale">
                      <IconButton
                        color="inherit"
                        size="large"
                        aria-haspopup="true"
                        style={{ width: "50px", height: "60px" }}
                        disableRipple
                      >
                        <IconCash />
                      </IconButton>
                    </AnimateButton>
                  }
                  iconPosition="end"
                />
              </Tabs>
            </AppBar>
          </Grid>
        </Grid>
        <TabPanel value={0}>
        {children}
        </TabPanel>
        <TabPanel value={1}>
        ممد نبودی ببینی
        </TabPanel>
      </Card>
      </TabContext>
    </MDBox>
    <Dialog
        open={open2}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        dir={i18n.dir()}
      >
        <div
          className={`modal-header ${i18n.dir() === "ltr" ? "header-ltr" : ""}`}
        >
          <h2>{t("انتخاب تصویر پس زمینه")}</h2>
          <button
            type="button"
            className="close-btn"
            onClick={() => setOpen2(false)}
          >
            <CloseIcon />
          </button>
        </div>
        <DialogContent>
          <Box sx={style}>
            <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("عکس پس زمینه")} </span>
                    </div>
                    <div className="wrapper">
                      <div className="bgImage">
                        <UploadFile
                          title={t("بارگذاری عکس")}
                          multiple={false}
                          uploadError={uploadError}
                          updateFileList={updateBackGroundImage}
                          accept={".png , .jpeg, .gif, .jpg, .bmp"}
                          defaultFiles={backgroundImageList != [] ? backgroundImageList : null}
                          style={{}}
                        />
                      </div>
                    </div>
                  </div>
          </Box>
        </DialogContent>
      </Dialog>
      </>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
