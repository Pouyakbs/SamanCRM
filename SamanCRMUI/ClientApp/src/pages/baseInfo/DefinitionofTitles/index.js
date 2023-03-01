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
import ComPublicModal from "../../../components/Modals/ComPublicModal/index"
import Sortable from "devextreme-react/sortable";

const DefinitionofTitles = () => {
  ///////////////tree view/////////////////////////
  const { t, i18n } = useTranslation();
  const [id, setID] = React.useState();
  const [hasItem , setHasItem] = React.useState();
  const [parentID , setParentID] = React.useState();
  const [programPartID , setProgramPartID] = React.useState();
  const [datasource, setdatasource] = React.useState([]);
  const [comPublicTitlesData, setComPublicTitlesData] = React.useState([]);
  console.log("comPublicTitlesData" , comPublicTitlesData)
  const [comPublicData, setComPublicData] = React.useState([]);
  const [expandedNode, setExpandedNode] = React.useState([]);
  const [expandedNodeStatus, setExpandedNodeStatus] = React.useState([]);

console.log(datasource)

useEffect(()=>{
  let expTemp=datasource.map((item)=>({
    titleID:item.titleID,
    expanded:item?.expanded||false
  })) 
  setExpandedNodeStatus(expTemp)
  
},[expandedNode])
  const appConfig = window.globalConfig;
  const selectedItem = (e) => {
    if(e.itemData.entityType == "ComPublicTitles") {
      setID(parseInt(e.itemData.id.split("-")[1]))
      setParentID(e.itemData.parentID)
      setHasItem(e.node.items.length)
    }
    else if(e.itemData.entityType == "ComPublic") {
      setID(parseInt(e.itemData.id.split("-")[2]))
      setParentID(parseInt(e.itemData.parentID.split("-")[1]))
      setHasItem(e.node.items.length)
      setProgramPartID(e.itemData.programPartID)
    }
    else {
      setID(e.itemData.id)
      setParentID(e.itemData.parentID)
      setHasItem(e.node.items.length)
    }
  }
  const getComPublicData = () => {
    axios
    .get(`${appConfig.BaseURL}/api/ComPublicTitles`)
    .then((res) => {
      let temp = res.data.data.map((items) => {
        return {
          id: `${items.programPartID}-${items.titleID}`,
          parentID: items.programPartID,
          displayName: items.title,
          entityType: "ComPublicTitles"
        }
      })
        setComPublicTitlesData([...temp])
    })
    .catch((error) => error);
    axios
    .get(`${appConfig.BaseURL}/api/ComPublic`)
    .then((res) => {
      let temp = res.data.data.map((items) => {
      return {
        id: `${items.programPartID}-${items.comPublicTitleID}-${items.comPublicID}`,
        parentID: `${items.programPartID}-${items.comPublicTitleID}`,
        displayName: items.title,
        entityType: "ComPublic",
        programPartID: items.programPartID
      }
    })
      setComPublicData(temp)
    })
    .catch((error) => error);

  }
  useEffect(() => {
    getComPublicData()
  }, []);
  const getData = () => {
    axios
    .get(`${appConfig.BaseURL}/api/ProgramPart`)
    .then((res) => {
        let temp=res.data.data.map((item)=>{
          let t=expandedNodeStatus.filter(f=>f.roleID===item.roleID)[0]
          if(item.parentID == 0) {
            return {
              id: item.id,
              parentID: item.parentID,
              displayName: item.displayName,
              expanded: true
            }
          }
          else {
            return {
              id: item.id,
              parentID: item.parentID,
              roleID: item.roleID,
              displayName: item.displayName,
              expanded: t?.expanded||false
            }
          }
        })
        setdatasource([...temp , ...comPublicTitlesData , ...comPublicData])
    })
    .catch((error) => error);
  }
  useEffect(() => {
    getData()
  }, [comPublicTitlesData , comPublicData]);
  useEffect(() => {
  }, [datasource]);
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
                displayExpr="displayName"
                parentIdExpr="parentID"
                items={datasource}
                onItemExpanded={(e) => setExpandedNode(e.node)}
                className={theme.palette.mode === "dark" && "dark-tree"}
                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                width={500}
                onItemClick={selectedItem}
              />
          </div>
           )}
           <ComPublicModal id={id} hasItem={hasItem} programPartID={programPartID} parentID={parentID} getData={getComPublicData}/>
           </Paper>
      </div>
    </div>
    <div>
    </div>
    </>
  );
};

export default DefinitionofTitles;
