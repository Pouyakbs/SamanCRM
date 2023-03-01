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
import { Alert, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Modal } from "@mui/material";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import trashIcon3 from "../../../components/RKGrid/trash-icon3.gif";
import DoneIcon from "@mui/icons-material/Done";
import MDBox from "../../../components/MDBox/index";
import { history } from "../../../utils/history";
import axios from "axios";
import {
    PhoneOutlined,
} from '@ant-design/icons';
import MDTypography from "../../../components/MDTypography/index";
import colors from "../../../assets/base/colors";
import typography from "../../../assets/base/typography";
import { IconSquarePlus } from "@tabler/icons";
import AnimateButton from "../../../components/@extended/AnimateButton";

function CallsInfoCard({ title, description, action, info, shadow, getData }) {
  const appConfig = window.globalConfig;
  const { t, i18n } = useTranslation();
  const [openRemove, setOpenRemove] = useState(false);
  const [reqResult, setReqResult] = useState([]);
  const [activityID, setActivityID] = useState();
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

  function removeCall(id) {
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
    history.navigate(`/Activities/Contact/CreateContact?id=${id}`);
  };
  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = values.map((items, key) => (
    items.map((calls, key) => (
    <MDBox key={key} display="flex" py={1} pr={2}>
      <Alert variant="filled" icon={<PhoneOutlined/>} severity="info" sx={{width: "100%" , backgroundColor: "rgb(255 80 80 / 74%)",display:'flex', alignItems: "center"}}>
        &nbsp;{calls.subject}
        <div>
        <Tooltip title={t("ویرایش")} placement="top">
            <IconButton
              variant="contained"
              color="info"
              className="kendo-action-btn"
              onClick={() => transferToForm(calls.id)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("حذف")} placement="top">
            <IconButton
              variant="contained"
              color="error"
              className="kendo-action-btn"
              onClick={() => {
                setOpenRemove(true)
                setActivityID(calls.id)
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Alert>
    </MDBox>
    ))
  ));

  return (
    <>
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
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
        <MDTypography
          component={Link}
          to={action.route}
          variant="body2"
          color="secondary"
        >
          <AnimateButton type="scale">
            <Tooltip title={action.tooltip} placement="top">
              <IconButton
                color="inherit"
                size="small"
                aria-haspopup="true"
                disableRipple
              >
                <IconSquarePlus />
              </IconButton>
            </Tooltip>
          </AnimateButton>
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
            {t("شما در حال حذف کردن یک آیتم هستید")}
            <br />
            {t("آیا از این کار مطمئنید؟")}
            <br />
          </p>

          <div className="d-flex justify-content-center">
            <Button
              variant="contained"
              color={"success"}
              onClick={() => removeCall(activityID)}
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
              {t("بله مطمئنم")}
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
              {t("انصراف")}
            </Button>
          </div>
        </Box>
      </Modal>
      </>
  );
}

// Setting default props for the ProfileInfoCard
CallsInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
CallsInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  shadow: PropTypes.bool,
};

export default CallsInfoCard;
