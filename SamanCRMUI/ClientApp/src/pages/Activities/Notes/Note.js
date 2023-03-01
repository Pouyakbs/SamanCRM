import React, { useState, useEffect } from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import CategoryModal from '../../../components/Modals/CategoryModal/CategoryModal';
import CancelIcon from '@mui/icons-material/Cancel';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Accordion, AccordionDetails, AccordionSummary, Typography, useTheme } from "@mui/material";
import SelectBox from 'devextreme-react/select-box';
import swal from 'sweetalert';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SessionModalCon from "../../../components/Modals/CreateSession_SessionModal/SessionModalCon";
import DatePicker from "react-multi-date-picker";
import { renderCalendarLocaleSwitch, renderCalendarSwitch } from "../../../utils/calenderLang";
import { julianIntToDate } from "../../../utils/dateConvert";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";
import { useSearchParams } from "react-router-dom";
import { history } from "../../../utils/history";
import DisableInputModal from "../../../components/Modals/SupportDisableInputModal/DisableInputModal";
import axios from "axios";
import UploadFile from "../../../components/UploadComponent/UploadFile";

const Note = () => {
  const { t, i18n } = useTranslation();
  const appConfig = window.globalConfig;
  const [alignment, setAlignment] = React.useState("");
  const [uploadError, setUploadError] = useState(false);
  const [noteFileList, setNoteFileList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const [result, setResult] = useState();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [open, setOpen] = React.useState(false)
  const [error, setError] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme()

  const [panel1, setPanel1] = React.useState(true);
  const handlePanel1 = () => (event, newExpanded) => {
    setPanel1(newExpanded);
  };
  const [personnelData, setPersonnelData] = useState([]);

  const callComponent = () => {
    history.navigate(`/Activities/note/NoteManagement`);
  };
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      entityType: "Note",
      subject: "",
      relatedTo: "",
      relatedToInput: "",
      customer: "",
      note: "",
      noteFile: "",
    },
    validationSchema: Yup.object({
      subject: Yup.string()
        .max(15, t("نام باید شامل 15 حرف یا کمتر باشد"))
        .required(t("موضوع الزامیست")),
      relatedToInput: Yup.string().required(() => {
        return "مرتبط با الزامیست";
      }),



    }),
    validateOnChange: false,
    onSubmit: (values) => {
      axios
        .post(`${appConfig.BaseURL}/api/activities`, values)
        .then((res) => setResult(res.data.data));
      factorSub()
      callComponent();
    },
  });

  function updateFileList(list) {
    console.log("Files", list);
    var typeArr = [];
    list.forEach((element) => {
      let sp = element.file.split(";");
      let type = sp[0].split(":");
      typeArr.push(
        JSON.stringify({
          FileName: element.fileName,
          FileFormat: type[1],
          File: element.file.replace(/^data:application\/(vnd.openxmlformats-officedocument.spreadsheetml.sheet|jpeg|jpg);base64,/, ""),
        })
      );
    });
    formik.setFieldValue("noteFile", typeArr);
  }
  const getData = () => {
    axios.get(`${appConfig.BaseURL}/api/personnel`).then((res) => {
      setPersonnelData(
        res.data.data.map((item) => {
          return {
            personnelID: item.personnelID,
            fullName: `${item.name} ${item.surname}`,
          };
        })
      );
    });
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (id != null) {
      axios.get(`${appConfig.BaseURL}/api/activities/get/${id}`).then((res) => {
        setNoteFileList(
          res.data.data.noteFile.map((item) => {
            let image = item.split(",");
            let imageName = image[0].split(":");
            return {
              fileName: imageName[1],
              file: `${image[1]},${image[2]}`,
            };
          })
        );
        formik.setFieldValue("subject", res.data.data.subject);
        formik.setFieldValue("relatedTo", res.data.data.relatedTo);
        formik.setFieldValue("relatedToInput", res.data.data.relatedToInput);
        formik.setFieldValue("customer", res.data.data.customer);
        formik.setFieldValue("note", res.data.data.note);
      });
    }
  }, [id]);
  const updateNote = (values) => {
    if (values != null) {
      console.log(values);
      let isSuccess = false;
      axios
        .put(`${appConfig.BaseURL}/api/activities/Update/${id}`, formik.values)
        .then((res) => {
          setResult(res.data);
          isSuccess = true;
        })
        .finally(() => {
          if ((isSuccess = true)) {
            history.navigate(`/Activities/note/NoteManagement`);
          }
        });
    }
  };
  useEffect(() => {
    if (id != null) {
      axios
        .get(`${appConfig.BaseURL}/api/activities/get/${id}`)
        .then((res) => {
          formik.setFieldValue("subject", res.data.data.subject);
          formik.setFieldValue("relatedTo", res.data.data.relatedTo);
          formik.setFieldValue("relatedToInput", res.data.data.relatedToInput);
          formik.setFieldValue("customer", res.data.data.customer);
          formik.setFieldValue("note", res.data.data.note);
        })
    }
  }, [id]);
  const factorSub = () => {
    swal({
      title: t("یادداشت با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };
  const [expanded, setExpanded] = React.useState('panel1');

  useEffect(() => {
    if (formik.isSubmitting) {
      let condition1 = !!(formik.touched.subject && formik.errors.subject) ||
        !!(formik.touched.relatedToInput && formik.errors.relatedToInput)
      setPanel1(condition1 || panel1)


    }
  }, [formik.errors, formik.touched])

  const handleChange2 = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [dropdown, setDropdown] = React.useState()

  function getCustomer(val) {

    formik.setFieldValue('customer', val.CategoryName)

  }

  function getParentData(val) {
    formik.setFieldValue("relatedToInput", val.machineWhereaboutsInput);
  }

  function clearFieldCustomer() {
    formik.setFieldValue('customer', "")
  }


  const relatedToInput = [
    t("حساب"),
    t("فرصت"),
    t("سرنخ"),
    t("سرویس"),
    t("پیش فاکتور"),
    t("فاکتور"),
    t("پرداخت"),
    t("تامین کننده"),
    t("سفارش خرید"),
    t("وظیفه"),
    t("قرارداد فروش"),
    t("کمپین"),
    t("فرد"),
    t("ودیعه"),
    t("پروژه"),
    t("وظیفه پروژه"),
    t("قرارداد پشتیبانی"),
    t("ایراد"),
    t("رقیب"),
    t("محصول"),
    t("نمونه محصولات"),
    t("حواله فروش"),
  ];


  return (
    <>
      <div id='noteform'>
        <form onSubmit={formik.handleSubmit}>

          {/*<h1*/}
          {/*  className={"main-title"}*/}
          {/*>*/}
          {/*  {t("ایجاد یادداشت")}*/}
          {/*</h1>*/}
          <Accordion expanded={panel1} onChange={handlePanel1()}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{t("ایجاد یادداشت")}</Typography>
            </AccordionSummary>
            <AccordionDetails>

              <div  >
                <div className="form-design">
                  <div className="row">
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>
                          {t("موضوع یادداشت")} <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <input
                            className="form-input"
                            type="text"
                            id="subject"
                            name="subject"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.subject}
                          />
                          {formik.touched.subject && formik.errors.subject ? (
                            <div className="error-msg">
                              {t(formik.errors.subject)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="row">
                        <div className="content col-lg-6 col-md-6 col-xs-12">
                          <div className="title">
                            <span className="spanDisableInput">
                              {t("مرتبط با")}
                              <span className="star">*</span>
                            </span>
                          </div>
                          <div className="wrapper">
                            {id != null && formik.values.relatedTo != "" && (
                              <SelectBox
                                dataSource={relatedToInput}
                                rtlEnabled={
                                  i18n.dir() == "ltr" ? false : true
                                }
                                onValueChanged={(e) => {
                                  console.log("------e111", e);
                                  formik.setFieldValue("relatedTo", e.value);
                                }}
                                defaultValue={formik.values.relatedTo}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="relatedTo"
                                id="relatedTo"
                                searchEnabled
                                showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />
                            )}
                            {(!id ||
                              (id != null &&
                                formik.values.relatedTo == "")) && (
                                <SelectBox
                                  dataSource={relatedToInput}
                                  rtlEnabled={
                                    i18n.dir() == "ltr" ? false : true
                                  }
                                  onValueChanged={(e) => {
                                    console.log("------e555555555555", e);
                                    formik.setFieldValue("relatedTo", e.value);
                                  }}
                                  defaultValue={formik.values.relatedTo}
                                  className="selectBox"
                                  noDataText="اطلاعات یافت نشد"
                                  placeholder=""
                                  name="relatedTo"
                                  id="relatedTo"
                                  searchEnabled
                                  showClearButton
                                //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                                />
                              )}
                            {formik.touched.relatedTo &&
                              formik.errors.relatedTo &&
                              !formik.values.relatedTo ? (
                              <div className="error-msg">
                                {t(formik.errors.relatedTo)}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="content col-lg-6 col-md-6 col-xs-12">
                          <div className="title">
                            <span className="spanDisableInput">‌</span>
                          </div>
                          <div
                            className="wrapper"
                            style={{ position: "relative" }}
                          >
                            <input
                              className={`form-input modal-input ${i18n.dir() === "ltr" ? "ltr" : ""
                                }`}
                              type="text"
                              id="relatedToInput"
                              name="relatedToInput"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.relatedToInput}
                              disabled
                            />
                            {formik.touched.relatedToInput &&
                              formik.errors.relatedToInput ? (
                              <div className="error-msg">
                                {t(formik.errors.relatedToInput)}
                              </div>
                            ) : null}
                            <div
                              className={`modal-action-button  ${i18n.dir() == "ltr" ? "action-ltr" : ""
                                }`}
                            >
                              <DisableInputModal
                                disabled={!formik.values.relatedTo}
                                className="modal"
                                getData={getParentData}
                              />
                              <Button>
                                {" "}
                                <CancelIcon
                                  onClick={() =>
                                    formik.setFieldValue("relatedToInput", "")
                                  }
                                />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12" >
                      <div className="title">
                        <span>{t("فرد")}</span>
                      </div>
                      <div className="wrapper">
                        <div style={{ position: 'relative' }}>
                          <input
                            className="form-input"
                            type="text"
                            name="customer"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.customer}
                            disabled

                          />
                          <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`}>
                            <CategoryModal className='modal2' getData={getCustomer} />
                            <Button className='modal' > <CancelIcon onClick={clearFieldCustomer} /></Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("ضمیمه کردن")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <UploadFile
                            title={t("بارگذاری فایل")}
                            multiple={true}
                            uploadError={uploadError}
                            updateFileList={updateFileList}
                            defaultFiles={
                              noteFileList != []
                                ? noteFileList
                                : null
                            }
                          />
                        </div>
                      </div>
                    </div>
                      <div className="content col-lg-6 col-md-12 col-xs-12">
                        <div className="title">
                          <span>{t("نام پرسنل")}</span>
                        </div>
                        <div className="wrapper">
                          {id != null && formik.values.personnelID != "" && (
                            <SelectBox
                              dataSource={personnelData}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                formik.setFieldValue("personnelID", e.value);
                              }}
                              defaultValue={formik.values.personnelID}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              displayExpr={"fullName"}
                              valueExpr={"personnelID"}
                              placeholder=""
                              name="personnelID"
                              id="personnelID"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.personnelID == "")) && (
                            <SelectBox
                              dataSource={personnelData}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                formik.setFieldValue("personnelID", e.value);
                              }}
                              defaultValue={formik.values.personnelID}
                              className="selectBox"
                              displayExpr={"fullName"}
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="personnelID"
                              id="personnelID"
                              searchEnabled
                              showClearButton
                            />
                          )}
                          {formik.touched.personnelID &&
                          formik.errors.personnelID ? (
                            <div className="error-msg">
                              {t(formik.errors.personnelID)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    <div className="content col-lg-6 col-md-12 col-xs-12">
                      <div className="title">
                        <span>{t("یادداشت")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <textarea
                            className="form-input"
                            type="text"
                            id="note"
                            name="note"
                            style={{ width: "100%", height: "108px" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.note}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </AccordionDetails>
          </Accordion>

          <div className="button-pos">
            <Button
              variant="contained"
              color="success"
              type="button"
              onClick={id != null ? updateNote : formik.handleSubmit}
            >
              {t("ثبت")}
            </Button>
            <Button
              variant="contained"
              style={{ marginRight: "5px" }}
              color="error"
              onClick={callComponent}
            >
              {t("انصراف")}
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
export default Note