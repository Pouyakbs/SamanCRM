import React, { useEffect } from "react";
import { useState } from "react";
import "../../../style.css";
import axios from "axios";

import { TreeView } from "devextreme-react";
import { history } from "../../../utils/history";
import i18n from "../../../components/i18n";
import { Paper , Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";

const PersonnelTreeView = () => {
  ///////////////tree view/////////////////////////
  const { t, i18n } = useTranslation();
  const [datasource, setdatasource] = React.useState();
  console.log(datasource)
//   const appConfig = window.globalConfig;
  const callComponent = () => {
    history.navigate("/accounts/personnels/NewPersonnel");
  };
  useEffect(() => {
    axios
      .get(`${appConfig.BaseURL}/api/Personnel`)
      .then((res) => setdatasource(res.data.data));
  }, []);
  const theme = useTheme();
  /////////////////////////////////////////////////////
  return (
    <>
      {/*<div className='header'>*/}
      {/*    <span>{t("چارت سازمانی")}</span>*/}
      {/*</div>*/}
      <div className="row justify-content-center">
        <div className="content col-lg-4 col-sm-6 col-12 t1">
          <Paper elevation={2} className="paper-pda">
            <div className="form">
                <TreeView
                  id="personnelID"
                  dataStructure="plain"
                  expandNodesRecursive={false}
                  displayExpr="fullName"
                  keyExpr="personnelID"
                  parentIdExpr="parentID"
                  items={datasource}
                  className={theme.palette.mode === "dark" && "dark-tree"}
                  rtlEnabled={i18n.dir() == "ltr" ? false : true}
                  width={300}
                />
            </div>
          </Paper>
        </div>
      </div>
      <div>
        <Button
          variant={"contained"}
          onClick={callComponent}
          className="export mt-3"
        >
          {t("افزودن پرسنل جدید")}
        </Button>
      </div>
    </>
  );
};

export default PersonnelTreeView;
