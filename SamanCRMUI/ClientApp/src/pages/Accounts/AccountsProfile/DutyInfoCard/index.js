// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import { Box, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import trashIcon3 from "../../../../components/RKGrid/trash-icon3.gif";
import DoneIcon from "@mui/icons-material/Done";
import { Alert, IconButton } from "@mui/material";
import MDBox from "../../../../components/MDBox/index";
import { history } from "../../../../utils/history";
import {
    OrderedListOutlined,
} from '@ant-design/icons';
import MDTypography from "../../../../components/MDTypography/index";
import axios from "axios";
import colors from "../../../../assets/base/colors";
import typography from "../../../../assets/base/typography";
import { IconPencil } from "@tabler/icons";
import AnimateButton from "../../../../components/@extended/AnimateButton";

function DutyInfoCard({ title, description, info, shadow, getData }) {
  const appConfig = window.globalConfig;
  const { t, i18n } = useTranslation();
  const [openRemove, setOpenRemove] = useState(false);
  const [reqResult, setReqResult] = useState([]);
  const [activityID, setActivityID] = useState();
  console.log("activityID" , activityID)
  const labels = [];
  const values = [];
  console.log("info Data------------", info);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "1px solid #eee",
    boxShadow: 24,
    p: 4,
    direction: i18n.dir(),
  };
  function removeDuty(id) {
    if(id) {
      let isSuccess = false;
      axios
        .delete(`${appConfig.BaseURL}/api/activities/${id}`)
        .then((res) => {
          setReqResult(res.data);
          isSuccess = true;
        })
        .finally(() => {
          if (isSuccess) {
            getData();
            setOpenRemove(false)
          }
        });
    }
  };
  const transferToForm = (id) => {
    history.navigate(`/Activities/Duty/CreateDuty?id=${id}`);
  };
  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    // if (el.match(/[A-Z\s]+/)) {
    //   const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
    //   const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

    //   labels.push(newElement);
    // } else {
    labels.push(el);
    // }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));


  // Render the card info items
  const renderItems = values.map((items, key) => (
    items.map((dutys, key) => (
      <>
    <MDBox key={key} display="flex" py={1} pr={2}>
      <Alert variant="filled" icon={<OrderedListOutlined/>} severity="info" sx={{width: "100%" , backgroundColor: "rgb(83 198 255/ 74%)", display:'flex', alignItems: "center"}}>
        &nbsp;{dutys.subject}
        <div>
        <Tooltip title={t("????????????")} placement="top">
            <IconButton
              variant="contained"
              color="info"
              className="kendo-action-btn"
              onClick={() => transferToForm(dutys.id)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("??????")} placement="top">
            <IconButton
              variant="contained"
              color="error"
              className="kendo-action-btn"
              onClick={() => {
                setOpenRemove(true)
                setActivityID(dutys.id)
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Alert>
    </MDBox>
      </>
    ))
  ));

  return (
  <>
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" , display: "block" , width: "100%" }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        px={2}
      >
        <MDTypography
          variant="caption"
          fontWeight="bold"
          color="text"
          textTransform="uppercase"
        >
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        {/* <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox> */}
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>{renderItems}</MDBox>
      </MDBox>
    </Card>
    <Modal open={openRemove} onClose={() => setOpenRemove(false)}>
        <Box sx={style} style={{ textAlign: "center", width: "450px" }}>
          <img src={trashIcon3} alt={"remove"} className="remove-icon" />
          <p>
            {t("?????? ???? ?????? ?????? ???????? ???? ???????? ??????????")}
            <br />
            {t("?????? ???? ?????? ?????? ????????????????")}
            <br />
          </p>

          <div className="d-flex justify-content-center">
            <Button
              variant="contained"
              color={"success"}
              onClick={() => removeDuty(activityID)}
              startIcon={
                <DoneIcon
                  style={
                    i18n.dir() === "rtl"
                      ? { marginLeft: "5px" }
                      : { marginRight: "5px" }
                  }
                />
              }
              style={{ margin: "0 2px" }}
            >
              {t("?????? ????????????")}
            </Button>
            <Button
              variant="contained"
              color={"error"}
              startIcon={
                <CloseIcon
                  style={
                    i18n.dir() === "rtl"
                      ? { marginLeft: "5px" }
                      : { marginRight: "5px" }
                  }
                />
              }
              style={
                i18n.dir() === "rtl"
                  ? { marginRight: "10px" }
                  : { marginLeft: "10px" }
              }
              onClick={() => setOpenRemove(false)}
            >
              {t("????????????")}
            </Button>
          </div>
        </Box>
      </Modal>
      </>
  );
}

// Setting default props for the ProfileInfoCard
DutyInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
DutyInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  shadow: PropTypes.bool,
};

export default DutyInfoCard;
