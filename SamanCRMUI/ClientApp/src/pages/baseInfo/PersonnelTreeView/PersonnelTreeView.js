import React, { useEffect } from "react";
import { useState } from "react";
import "../../../style.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import { TreeView } from "devextreme-react";
import { history } from "../../../utils/history";
import i18n from "../../../components/i18n";
import { Paper, Button, Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import CreateRoleModal from "../../../components/Modals/RoleModal/CreateRoleModal"
import Sortable from "devextreme-react/sortable";

const ProgramPartTreeView = () => {
  ///////////////tree view/////////////////////////
  const { t, i18n } = useTranslation();
  const [id, setID] = React.useState();
  const [hasItem , setHasItem] = React.useState();
  const [roleName , setRoleName] = React.useState();
  const [parentID , setParentID] = React.useState();
  const [datasource, setdatasource] = React.useState([]);
  const [expandedNode, setExpandedNode] = React.useState([]);
  const [expandedNodeStatus, setExpandedNodeStatus] = React.useState([]);

console.log(datasource)

useEffect(()=>{
  let expTemp=datasource.map((item)=>({
    roleID:item.roleID,
    expanded:item?.expanded||false
  })) 
  setExpandedNodeStatus(expTemp)
  
},[expandedNode])
  const appConfig = window.globalConfig;
  const selectedItem = (e) => {
    setRoleName(e.itemData.roleName)
    setParentID(e.itemData.parentID)
    setHasItem(e.node.items.length)
    setID(e.itemData.roleID)
  }
  const getData = () => {
    axios
    .get(`${appConfig.BaseURL}/api/ApplicationRole`)
    .then((res) => {
        let temp=res.data.data.map((item)=>{
          let t=expandedNodeStatus.filter(f=>f.roleID===item.roleID)[0]
          if(item.parentID == 0) {
            return {
              ...item,
              expanded: true
            }
          }
          else if(item.roleID == id) {
            return {
              ...item,
              expanded: true
            }
          }
          else {
            return {
              ...item,
              expanded: t?.expanded||false
            }
          }
          
        })
        setdatasource(temp)
    })
    .catch((error) => error);
  }
  useEffect(() => {
    getData()
  }, []);
  const theme = useTheme();
  /////////////////////////////////////////////////////
  return (
    <>
      {/*<div className='header'>*/}
      {/*    <span>{t("لیست منو ها")}</span>*/}
      {/*</div>*/}
      <div className="row justify-content-center">
        <div className="content col-lg-4 col-sm-6 col-12 t1">
          <Paper elevation={2} className="paper-pda">
           {datasource.length == 0 ? ( 
            <Box sx={{ display: 'flex' , justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
           ):( 
            <div className="form">
              <TreeView
                dataStructure="plain"
                displayExpr="roleName"
                keyExpr="roleID"
                parentIdExpr="parentID"
                items={datasource}
                onItemExpanded={(e) => setExpandedNode(e.node)}
                className={theme.palette.mode === "dark" && "dark-tree"}
                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                width={300}
                onItemClick={selectedItem}
              />
          </div>
           )}
           <CreateRoleModal id={id} hasItem={hasItem} roleName={roleName} parentID={parentID} getData={getData}/>
           </Paper>
      </div>
    </div>
    <div>
    </div>
    </>
  );
};

export default ProgramPartTreeView;
