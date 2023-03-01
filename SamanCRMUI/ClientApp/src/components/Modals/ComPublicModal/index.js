import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  Box,
  Grid,
  Modal,
  Stack,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import AnimateButton from "../../@extended/AnimateButton";
import swal from "sweetalert";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import trashIcon3 from "../../RKGrid/trash-icon3.gif";
import { SelectBox } from "devextreme-react";

const ComPublicModal = (props) => {
  const [currentDate, setCurrentDate] = useState();
  const [all, setAll] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { t, i18n } = useTranslation();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "1px solid #eee",
    boxShadow: 24,
    p: 2,
    direction: i18n.dir(),
  };
  const [reqResult, setReqResult] = React.useState({});
  const [datasource, setDataSource] = React.useState([]);
  const [menuData, setMenuData] = React.useState([]);
  const [roleData, setRoleData] = React.useState([]);
  const [roleExist, setRoleExist] = React.useState(false);
  console.log("menuData" , menuData)
  const appConfig = window.globalConfig;
  const removeRole = () => {
    if(props.hasItem > 0 && true) {
      swal({
        title: t("امکان حذف سرپرست وجود ندارد"),
        icon: "error",
        button: t("باشه"),
      });
    }
    else {
    let isSuccess = false;
    axios
      .delete(`${appConfig.BaseURL}/api/ComPublic/${props.id}`)
      .then((res) => {
        setReqResult(res.data);
        isSuccess = true;
      })
      .finally(() => {
        if (isSuccess) {
          props.getData();
        }
      });
    }
  };
  const updateRole = (values) => {
    console.log(values)
    if (values.title != "") {
      let isSuccess = false
      axios
      .put(`${appConfig.BaseURL}/api/ComPublic/Update/${props.id}` , values)
      .then((res) => {
          setReqResult(res.data)
           isSuccess = true
          }
      )
      .finally(()=>{
          if(isSuccess){
              props.getData()
              setOpenEdit(false);
              formik.setFieldValue('title','')
              formik.setFieldValue('comPublicTitleID',0)
              formik.setFieldValue('branchID',0)
          }
        });
    }
  };
  const getData = () => {
    axios
      .get(`${appConfig.BaseURL}/api/ComPublicTitles`)
      .then((res) => setDataSource(res.data.data))
      .catch((error) => error);
  };
  const getMenuData = () => {
    axios
      .get(`${appConfig.BaseURL}/api/programPart`)
      .then((res) => setMenuData(res.data.data))
      .catch((error) => error);
  };
  
  const formik = useFormik({
    initialValues: {
      title: "",
      programPartID: props.programPartID,
      comPublicTitleID: 0,
    },
    validationSchema: Yup.object({
        title: Yup.string().required("مقدار فیلد الزامیست"),
    }),
    onSubmit: (values) => {
      let isSuccess = false;
      axios
        .post(`${appConfig.BaseURL}/api/ComPublic/`, values)
        .then((res) => {
          setReqResult(res.data);
          isSuccess = true;
        })
        .finally(() => {
          if (isSuccess) {
            props.getData();
            setOpenSetting(false);
            formik.setFieldValue('title','')
            formik.setFieldValue('comPublicTitleID',0)
            formik.setFieldValue('branchID',0)
          }
        });
    },
  });
  useEffect(() => {
    reqResult?.status === "Success" && setOpenSetting(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reqResult]);
  useEffect(() => {
    getData();
    getMenuData();
  }, []);
  useEffect(() => {
    formik.setFieldValue('comPublicTitleID',props?.id)
  }, [props]);

  const getDataByID = () => {
    axios
      .get(`${appConfig.BaseURL}/api/ComPublic/${props.id}`)
      .then((res) => {
        
        setRoleData(res.data.data)
        formik.setFieldValue("title", res.data.data.title)
        formik.setFieldValue("comPublicTitleID", res.data.data.comPublicTitleID)
      })
      .catch((error) => error);
  };
console.log('props.programPartID',props.programPartID)
console.log('datasource',datasource)

  return (
    <>
      <td colSpan="1">
        <div className="d-flex justify-content-between">
          <IconButton
            variant="contained"
            color="primary"
            className="kendo-action-btn"
            onClick={() => {
              setOpenSetting(true);
              getData();
            }}
          >
            <PersonAddAlt1Icon />
          </IconButton>
          <IconButton
            variant="contained"
            color="info"
            className="kendo-action-btn"
            onClick={() => {
              setOpenEdit(true);
              getDataByID();
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            variant="contained"
            color="error"
            disabled={props.id == null}
            className="kendo-action-btn"
            onClick={() => setOpenRemove(true)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </td>

      <Modal open={openSetting} onClose={() => setOpenSetting(false)}>
        <Box sx={style}>
      <IconButton aria-label="delete" color="error" onClick={() => setOpenSetting(false)}>
            <CloseIcon />
          </IconButton>
          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <Stack spacing={1}>
              <div className="title">
                <span>{t("انتخاب فرم")}</span>
              </div>
              
              <div className="wrapper">
                <div>
                  <SelectBox
                    dataSource={menuData}
                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                    onValueChanged={(e) => {
                        console.log("programPartID" , e)
                        formik.setFieldValue("programPartID", e.value)
                    }}
                    valueExpr={"id"}
                    displayExpr={"displayName"}
                    defaultValue={props.programPartID}
                    className="selectBox"
                    noDataText="اطلاعات یافت نشد"
                    placeholder=""
                    name="programPartID"
                    id="programPartID"
                    searchEnabled
                    showClearButton
                    //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                  />
                </div>
              </div>
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <Stack spacing={1}>
              <div className="title">
                <span>{t("انتخاب فیلد")}</span>
              </div>
              
              <div className="wrapper">
                <div>
                  <SelectBox
                    dataSource={datasource}
                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                    onValueChanged={(e) =>
                     {formik.setFieldValue("comPublicTitleID", e.value)
                    } 
                    }
                    valueExpr={"titleID"}
                    displayExpr={"title"}
                    defaultValue={props.parentID}
                    className="selectBox"
                    noDataText="اطلاعات یافت نشد"
                    placeholder=""
                    name="comPublicTitleID"
                    id="comPublicTitleID"
                    searchEnabled
                    showClearButton
                    //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                  />
                </div>
              </div>
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <Stack spacing={1}>
              <InputLabel htmlFor="title">{t("مقدار فیلد")}</InputLabel>
              <OutlinedInput
                fullWidth
                id="title"
                value={formik.values.title}
                type="text"
                name="title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.title &&
              formik.errors.title &&
              !formik.values.title ? (
                <div className="error-msg">
                  {t(formik.errors.title)}
                </div>
              ) : null}
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <AnimateButton>
              <Button
                disableElevation
                fullWidth
                size="large"
                type="button"
                onClick={() => {
                  formik.handleSubmit();
                }}
                variant="contained"
                color="primary"
              >
                {t("ثبت")}
              </Button>
              {reqResult.status == "Error" && (
                <div style={{ color: "red", textAlign: "center" }}>
                  {t(reqResult.message)}
                </div>
              )}
            </AnimateButton>
          </Grid>
        </Box>
      </Modal>
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <Box sx={style}>
        <IconButton aria-label="delete" color="error" onClick={() => setOpenEdit(false)}>
            <CloseIcon />
          </IconButton>
          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <Stack spacing={1}>
              <div className="title">
                <span>{t("انتخاب فرم")}</span>
              </div>
              
              <div className="wrapper">
                <div>
                  <SelectBox
                    dataSource={menuData}
                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                    onValueChanged={(e) => {
                        console.log("programPartID" , e)
                        formik.setFieldValue("programPartID", e.value)
                    }}
                    valueExpr={"id"}
                    displayExpr={"displayName"}
                    defaultValue={props.programPartID}
                    className="selectBox"
                    noDataText="اطلاعات یافت نشد"
                    placeholder=""
                    name="programPartID"
                    id="programPartID"
                    searchEnabled
                    showClearButton
                    //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                  />
                </div>
              </div>
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <Stack spacing={1}>
              <div className="title">
                <span>{t("انتخاب فیلد")}</span>
              </div>
              <div className="wrapper">
                <div>
                  <SelectBox
                    dataSource={datasource}
                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                    onValueChanged={(e) => {
                      formik.setFieldValue("comPublicTitleID", e.value)
                    }
                    }
                    valueExpr={"titleID"}
                    displayExpr={"title"}
                    defaultValue={props.parentID}
                    className="selectBox"
                    noDataText="اطلاعات یافت نشد"
                    placeholder=""
                    name="comPublicTitleID"
                    id="comPublicTitleID"
                    searchEnabled
                    showClearButton
                    //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                  />
                </div>
              </div>
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <Stack spacing={1}>
              <InputLabel htmlFor="title">{t("مقدار فیلد")}</InputLabel>
              <OutlinedInput
                fullWidth
                id="title"
                type="text"
                value={formik.values.title}
                name="title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.title &&
              formik.errors.title &&
              !formik.values.title ? (
                <div className="error-msg">
                  {t(formik.errors.title)}
                </div>
              ) : null}
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "10px" }}>
            <AnimateButton>
              <Button
                disableElevation
                fullWidth
                size="large"
                type="button"
                onClick={() => {
                  updateRole(formik.values);
                }}
                variant="contained"
                color="primary"
              >
                {t("ثبت")}
              </Button>
              {reqResult.status == "Error" && (
                <div style={{ color: "red", textAlign: "center" }}>
                  {t(reqResult.message)}
                </div>
              )}
            </AnimateButton>
          </Grid>
        </Box>
      </Modal>
      <Modal open={openRemove} onClose={() => setOpenRemove(false)}>
        <Box sx={style} style={{ textAlign: "center", width: "450px" }}>
          <img src={trashIcon3} alt={"remove"} className="remove-icon" />
          <p>
            شما در حال حذف کردن یک نقش هستید
            <br />
            آیا از این کار مطمئنید؟
            <br />
          </p>

          <div className="d-flex justify-content-center">
            <Button
              variant="contained"
              color={"success"}
              onClick={() => {
                removeRole();
                setOpenRemove(false);
              }}
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
              بله مطمئنم
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
              انصراف
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ComPublicModal;
