import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import FooterSome from "./FooterSome";
import { Box, Tooltip, useTheme , Button, Dialog, DialogContent } from "@mui/material";
import { getLangDate } from "../../utils/getLangDate";
import IndexCell from "./IndexCell";
import { ColumnMenu, DateMenu } from "./ColumnMenu";
import DateCell from "./DateCell";
import RKGrid from "./RKGrid";
import axios from "axios";
import PersonActionCell from "./PersonActionCell";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { history } from "../../utils/history";
import CloseIcon from "@mui/icons-material/Close";

const AccountProfileCell = (props) => {
  const [openPersons, setOpenPersons] = useState(false);
  const [reqResult, setReqResult] = useState([]);
  const userAccess = JSON.parse(localStorage.getItem("user"));
  console.log("User Access", userAccess.programParts);
  const appConfig = window.globalConfig;
  const { t, i18n } = useTranslation();
  const [rawData, setRawData] = useState([]);

  const theme = useTheme();

  const transferToForm = () => {
    history.navigate(`/accounts/AccountProfile?id=${props.dataItem.accountID}`);
  };

  return (
    <>
      <td colSpan="1">
        <div className="d-flex justify-content-center">
          <Tooltip title={t("مشاهده پروفایل")}>
            <IconButton
              variant="contained"
              color="primary"
              className="kendo-action-btn"
              onClick={() => {
                transferToForm()
              }}
            >
              <AccountBoxIcon />
            </IconButton>
          </Tooltip>
        </div>
      </td>
    </>
  );
};

export default AccountProfileCell;
