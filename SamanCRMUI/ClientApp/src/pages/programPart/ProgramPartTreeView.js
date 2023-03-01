import React, { useEffect } from "react";
import { useState } from "react";
import "../../style.css";
import axios from "axios";

import { TreeView } from "devextreme-react";
import { history } from "../../utils/history";
import i18n from "../../components/i18n";
import { Paper, Button, Box, FormControlLabel, Modal, Tooltip } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import trashIcon3 from '../../components/RKGrid/trash-icon3.gif';
import swal from "sweetalert";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from "@emotion/react";
import Sortable from "devextreme-react/sortable";
import { SelectBox } from "devextreme-react";
import service from "./testData";

const ProgramPartTreeView = () => {
  ///////////////tree view/////////////////////////
  const { t, i18n } = useTranslation();
  const datasourceRef = React.useRef();
  const [datasource, setdatasource] = React.useState([]);
  const [openRemove,setOpenRemove]=useState(false)
  const [id, setID] = React.useState();
  const selectionModes = ["multiple", "single"];
  const [selectionMode, setSelectionMode] = React.useState(selectionModes[0]);
  const [selectedEmployees, setSelectedEmployees] = React.useState([]);
  const [reqResult , setReqResult] = useState([])
  const [selectNodesRecursive, setselectNodesRecursive] = React.useState(true);
  const [selectByClick, setselectByClick] = React.useState(false);
  const appConfig = window.globalConfig;
  const callComponent = () => {
    history.navigate("/CreateMenu");
  };
  const getData = () => {
    axios
      .get(`${appConfig.BaseURL}/api/ProgramPart`)
      .then((res) => {
        setdatasource(res.data.data)
      })
      .catch((error) => error);
  };
  useEffect(() => {
    getData();
  }, []);
  const EditClick = () => {
    if (id != null) {
      history.navigate(`/CreateMenu?id=${id}`);
    }
    else {
      swal({
        title: t("لطفا منوی مورد نظر را انتخاب کنید"),
        icon: "error",
        button: t("باشه"),
      });
    }
  }
  const DeleteClick = () => {
    if (id != null) {
      let isSuccess = false;
      axios
        .delete(`${appConfig.BaseURL}/api/ProgramPart/${id}`)
        .then((res) => {
          setReqResult(res.data);
          isSuccess = true;
        })
        .finally(() => {
          if (isSuccess) {
            getData();
          }
        });
    }
    else {
      swal({
        title: t("لطفا منوی مورد نظر را انتخاب کنید"),
        icon: "error",
        button: t("باشه"),
      });
    }
  }
  const theme = useTheme();

  const treeViewDataSource = () => {
    return datasourceRef.current.instance;
  };
  const treeViewSelectionChanged = (e) => {
    syncSelection(e.component);
  };

  function syncSelection(treeView) {
    setSelectedEmployees(
      treeView.getSelectedNodes().map((node) => node.itemData)
    );
  }
  const onItemClick = (e) => {
    console.log("Selected Item", e.itemData);
    setID(e.itemData.id)
  };
  const onDragChange = (e) => {
    if (e.fromComponent == e.toComponent) {
      const fromNode = findNode(getTreeView(e.fromData), e.fromIndex);
      const toNode = findNode(getTreeView(e.toData), calculateToIndex(e));
      if (toNode !== null && isChildNode(fromNode, toNode)) {
        e.cancel = true;
      }
    }
  };

  const onDragEnd = (e) => {
    if (e.fromComponent == e.toComponent && e.fromIndex == e.toIndex) {
      return;
    }

    const fromTreeView = getTreeView(e.fromData);
    const toTreeView = getTreeView(e.toData);

    const fromNode = findNode(fromTreeView, e.fromIndex);
    const toNode = findNode(toTreeView, calculateToIndex(e));

    if (e.dropInsideItem && toNode !== null) {
      return;
    }

    const fromTopVisibleNode = getTopVisibleNode(e.fromComponent);
    const toTopVisibleNode = getTopVisibleNode(e.toComponent);
    const fromItems =
      getStateFieldName(e.fromData) == "datasource" && datasource;
    const toItems = getStateFieldName(e.toData) == "datasource" && datasource;
    moveNode(fromNode, toNode, fromItems, toItems, e.dropInsideItem);
    getStateFieldName(e.fromData) == "datasource" &&
      setdatasource([...fromItems]);
    fromTreeView.scrollToItem(fromTopVisibleNode);
    toTreeView.scrollToItem(toTopVisibleNode);
  };

  const getStateFieldName = (driveName) => {
    return "datasource";
  };

  const getTreeView = (e) => {
    return treeViewDataSource(e);
  };

  const calculateToIndex = (e) => {
    if (e.fromComponent !== e.toComponent || e.dropInsideItem) {
      return e.toIndex;
    }

    return e.fromIndex >= e.toIndex ? e.toIndex : e.toIndex + 1;
  };

  const findNode = (treeView, index) => {
    const nodeElement = treeView
      .element()
      .querySelectorAll(".dx-treeview-node")[index];

    if (nodeElement) {
      return findNodeById(
        treeView.getNodes(),
        nodeElement.getAttribute("data-item-id")
      );
    }
    return null;
  };
  const findNodeById = (nodes, id) => {
    for (let i = 0; i < nodes.length; i += 1) {
      if (nodes[i].key == id) {
        return nodes[i];
      }
      if (nodes[i].children) {
        const node = findNodeById(nodes[i].children, id);
        if (node != null) {
          return node;
        }
      }
    }
    return null;
  };

  const moveNode = (fromNode, toNode, fromItems, toItems, isDropInsideItem) => {
    const fromIndex = fromItems.findIndex(
      (item) => item.id == fromNode.itemData.id
    );
    fromItems.splice(fromIndex, 1);

    const toIndex =
      toNode == null || isDropInsideItem
        ? toItems.length
        : toItems.findIndex((item) => item.id == toNode.itemData.id);
    toItems.splice(toIndex, 0, fromNode.itemData);

    moveChildren(fromNode, fromItems, toItems);
    if (!isDropInsideItem) {
      console.log("toNode.itemData.id", toNode.itemData.id);
      fromNode.itemData.parentID = toNode.itemData.id - 1;
    } else {
      fromNode.itemData.parentID =
        toNode != null ? toNode.itemData.parentID : undefined;
    }
  };

  const moveChildren = (node, fromDataSource, toDataSource) => {
    node.children.forEach((child) => {
      moveChildren(child, fromDataSource, toDataSource);

      const fromIndex = fromDataSource.findIndex(
        (item) => item.id == child.itemData.id
      );
      fromDataSource.splice(fromIndex, 1);
      toDataSource.splice(toDataSource.length, 0, child.itemData);
    });
  };

  const isChildNode = (parentNode, childNode) => {
    let { parent } = childNode;
    while (parent !== null) {
      if (parent.itemData.id == parentNode.itemData.id) {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  };

  const getTopVisibleNode = (component) => {
    const treeViewElement = component.element();
    const treeViewTopPosition = treeViewElement.getBoundingClientRect().top;
    const nodes = treeViewElement.querySelectorAll(".dx-treeview-node");
    for (let i = 0; i < nodes.length; i += 1) {
      const nodeTopPosition = nodes[i].getBoundingClientRect().top;
      if (nodeTopPosition >= treeViewTopPosition) {
        return nodes[i];
      }
    }

    return null;
  };
  const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 600,
      bgcolor: 'background.paper',
      border: '1px solid #eee',
      boxShadow: 24,
      p: 4,
      direction:i18n.dir()
  };
  /////////////////////////////////////////////////////
  return (
    <>
      {/*<div className='header'>*/}
      {/*    <span>{t("لیست منو ها")}</span>*/}
      {/*</div>*/}
      <div className="row justify-content-center">
        <div className="content col-lg-4 col-sm-6 col-12 t1">
          <Paper elevation={2} className="paper-pda">
            {datasource == null ? (
              <CircularProgress />
            ) : (
              <div className="form">
                <Sortable
                  filter=".dx-treeview-item"
                  group="shared"
                  data={datasource}
                  allowDropInsideItem={true}
                  allowReordering={true}
                  onDragChange={onDragChange}
                  onDragEnd={onDragEnd}
                >
                  <TreeView
                    id="id"
                    dataStructure="plain"
                    displayExpr="displayName"
                    parentIdExpr="parentID"
                    ref={datasourceRef}
                    items={datasource}
                    selectNodesRecursive={selectNodesRecursive}
                    selectByClick={selectByClick}
                    selectionMode={selectionMode}
                    onSelectionChanged={treeViewSelectionChanged}
                    onItemClick={onItemClick}
                    className={theme.palette.mode === "dark" && "dark-tree"}
                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                    width={500}
                  />
                </Sortable>
              </div>
            )}
            <td colSpan="1">
              <div className="d-flex justify-content-between">
                <IconButton
                  variant="contained"
                  color="primary"
                  className="kendo-action-btn"
                  onClick={callComponent}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
                <IconButton
                  variant="contained"
                  color="info"
                  className="kendo-action-btn"
                  onClick={EditClick}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  variant="contained"
                  color="error"
                  className="kendo-action-btn"
                  onClick={()=>setOpenRemove(true)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </td>
          <Modal
            open={openRemove}
            onClose={()=>setOpenRemove(false)}
          >
              <Box sx ={style} style={{textAlign:'center',width:'450px'}}>
                  <img src={trashIcon3} alt={'remove'} className='remove-icon'/>
                  <p>
                      {t('شما در حال حذف کردن یک آیتم هستید')}
                      <br/>
                      {t('آیا از این کار مطمئنید؟')}
                      <br/>
                  </p>

                  <div className='d-flex justify-content-center'>
                      <Button variant="contained" color={'success'} onClick={DeleteClick} startIcon={<DoneIcon style={i18n.dir()==='rtl'?{marginLeft:'5px'}:{marginRight:'5px'}}/>} style={{margin:'0 2px'}}>{t('بله مطمئنم')}</Button>
                      <Button
                        variant="contained"
                        color={'error'}
                        startIcon={<CloseIcon style={i18n.dir()==='rtl'?{marginLeft:'5px'}:{marginRight:'5px'}}/>}
                        style={i18n.dir()==='rtl'?{marginRight:'10px'}:{marginLeft:'10px'}}
                        onClick={()=>setOpenRemove(false)}
                      >{t('انصراف')}</Button>
                  </div>

              </Box>

          </Modal>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default ProgramPartTreeView;
