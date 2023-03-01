import React, { useState, useEffect, useRef } from "react";
import { FieldArray, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Checkbox from "@mui/material/Checkbox";
import CancelIcon from "@mui/icons-material/Cancel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { array, number, object, string } from "yup";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserModal from "../../../components/Modals/Invoice_UserModal/UserModal";
import GuestsModal from "../../../components/Modals/Ghafourian_CategoryModal/CategoryModal";
import { julianIntToDate } from "../../../utils/dateConvert";
import { SelectBox } from "devextreme-react";
import DisableInputModal from "../../../components/Modals/SupportDisableInputModal/DisableInputModal";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  renderCalendarSwitch,
  renderCalendarLocaleSwitch,
} from "../../../utils/calenderLang";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { history } from "../../../utils/history";
import DateObject from "react-date-object";
import { getLangDate } from "../../../utils/getLangDate";

const Factor = [];
let idList=[1,21,13,26,19,23,34,11,5,32,12,25,30,15,28,2,3,4]
export const CreateContact = () => {
  const { t, i18n } = useTranslation();
  const [comPublicList, setComPublicList] = useState([]);
  const [relatedToRes, setRelatedToRes] = useState([]);
  const appConfig = window.globalConfig;
  const [alignment, setAlignment] = React.useState("");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const [result, setResult] = useState();
  const [selectedRelatedTo, setSelectedRelatedTo] = useState();
  const [contactDetail, setContactDetail] = useState([]);
  const [personnelData, setPersonnelData] = useState([]);
  const [relatedToData, setRelatedToData] = useState([]);
  const emptyGuest = { guests: "" };
  const emptyGuestTouch = { guests: false };
  const [guestTouch, setguestTouch] = useState([emptyGuestTouch]);

  useEffect(() => {
    axios
      .get(`${appConfig.BaseURL}/api/ComPublic/GetByProgramPart/6`)
      .then((res) => setComPublicList(res.data.data))
      .catch((error) => error);
  }, []);

  useEffect(() => {
    axios
      .get(`https://localhost:44329/api/Entities`)
      .then((res) => setRelatedToData(res.data.data))
      .catch((error) => error);
  }, []);

  const theme = useTheme();
  const [factor, setFactor] = React.useState(Factor);
  const dateRef = useRef();

  // const phoneRegMatch = /^011(999|998|997|996|995|994|993|992|991|
  //                        990|979|978|977|976|975|974|973|972|971|970|
  //                        969|968|967|966|965|964|963|962|961|960|899|
  //                        898|897|896|895|894|893|892|891|890|889|888|
  //                        887|886|885|884|883|882|881|880|879|878|877|
  //                        876|875|874|873|872|871|870|859|858|857|856|
  //                        855|854|853|852|851|850|839|838|837|836|835|
  //                        834|833|832|831|830|809|808|807|806|805|804|
  //                        803|802|801|800|699|698|697|696|695|694|693|
  //                        692|691|690|689|688|687|686|685|684|683|682|
  //                        681|680|679|678|677|676|675|674|673|672|671|
  //                        670|599|598|597|596|595|594|593|592|591|590|
  //                        509|508|507|506|505|504|503|502|501|500|429|
  //                        428|427|426|425|424|423|422|421|420|389|388|
  //                        387|386|385|384|383|382|381|380|379|378|377|
  //                        376|375|374|373|372|371|370|359|358|357|356|
  //                        355|354|353|352|351|350|299|298|297|296|295|
  //                        294|293|292|291|290|289|288|287|286|285|284|
  //                        283|282|281|280|269|268|267|266|265|264|263|
  //                        262|261|260|259|258|257|256|255|254|253|252|
  //                        251|250|249|248|247|246|245|244|243|242|241|
  //                        240|239|238|237|236|235|234|233|232|231|230|
  //                        229|228|227|226|225|224|223|222|221|220|219|
  //                        218|217|216|215|214|213|212|211|210|98|95|94|
  //                        93|92|91|90|86|84|82|81|66|65|64|63|62|61|60|
  //                        58|57|56|55|54|53|52|51|49|48|47|46|45|44|43|
  //                        41|40|39|36|34|33|32|31|30|27|20|7|1)[0-9]{1, 13}$/
  const phoneRegMatch = /^[0-9]{1,13}$/;

  const callComponent = () => {
    history.navigate(`/Activities/Contact/ContactManagement`);
  };
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      entityType: "Contact",
      subject: "",
      relatedTo: "",
      relatedToInput: "",
      phoneNumber: "",
      internalNum: "",
      status: "",
      date: new DateObject(),
      time: "",
      type: "",
      duration: "",
      userSMS: "",
      guestsSMS: "",
      personnelID: "",
      softwareReminder: "",
      desc: "",
      sendInvitation: false,
      guestFullName: [emptyGuest],
    },
    validationSchema: Yup.object({
      subject: Yup.string().required(() => {
        return "موضوع الزامیست";
      }),
      relatedToInput: Yup.string().required(() => {
        return "مرتبط با الزامیست";
      }),
      internalNum: Yup.number().typeError("تنها عدد مجاز است"),

      status: Yup.string().required(() => {
        return "وضعیت الزامیست";
      }),
      date: Yup.date().required(() => {
        return "تاریخ الزامیست";
      }),
      time: Yup.string().required(() => {
        return "زمان الزامیست";
      }),

      phoneNumber: Yup.string().matches(phoneRegMatch, "شماره تلفن صحیح نیست"),
    }),

    onSubmit: (values) => {
      var guestFullName = JSON.stringify(values.guestFullName);
      values.guestFullName = guestFullName;
      axios
        .post(`${appConfig.BaseURL}/api/activities`, values)
        .then((res) => setResult(res.data.data));
      factorSub();
      callComponent();
    },
  });

  function renderRelatedToArray(params) {
    switch (selectedRelatedTo) {
      case t("طرف حساب ها"):
        axios
          .get(`${appConfig.BaseURL}/api/Account`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.name + " " + item?.surname,
                id: item?.accountID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("فرصت"):
        axios
          .get(`${appConfig.BaseURL}/api/Opportunities`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.opportunityName,
                id: item?.opportunityID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("سرنخ ها"):
        axios
          .get(`${appConfig.BaseURL}/api/Clues`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.firstName + " " + item?.lastName,
                id: item?.clueID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("سرویس"):
        return setRelatedToRes([]);
        break;
      case t("پیش فاکتور"):
        axios
          .get(`${appConfig.BaseURL}/api/PreInvoice`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.title,
                id: item?.preInvoiceID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("فاکتور"):
        axios
          .get(`${appConfig.BaseURL}/api/Invoice`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.title,
                id: item?.invoiceID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("پرداخت"):
        axios
          .get(`${appConfig.BaseURL}/api/Payment`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.name,
                id: item?.paymentID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("تامین کنندگان"):
        axios
          .get(`${appConfig.BaseURL}/api/Supplier`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.name + " " + item?.surname,
                id: item?.supplierID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("سفارش خرید"):
        axios
          .get(`${appConfig.BaseURL}/api/Supplier`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.name,
                id: item?.orderID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("وظایف"):
        axios
          .get(`${appConfig.BaseURL}/api/activities/Duty`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.subject,
                id: item?.detailID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("قرارداد فروش"):
        axios
          .get(`${appConfig.BaseURL}/api/SaleContract`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.contractTitle,
                id: item?.contractID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("کمپین"):
        axios
          .get(`${appConfig.BaseURL}/api/campaign`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.campaignName,
                id: item?.campaignID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("افراد"):
        axios
          .get(`${appConfig.BaseURL}/api/Persons`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.personName + " " + item?.surname,
                id: item?.personID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("پروژه"):
        axios
          .get(`${appConfig.BaseURL}/api/Project`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.name,
                id: item?.projectID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("وظیفه پروژه"):
        return setRelatedToRes([]);
        break;
      case t("رقبا"):
        axios
          .get(`${appConfig.BaseURL}/api/Competitor`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.name,
                id: item?.competitorID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("محصول"):
        axios
          .get(`${appConfig.BaseURL}/api/products`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.productName,
                id: item?.productID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
        case t("تماس ها"):
          axios
        .get(`${appConfig.BaseURL}/api/activities/Contact`)
        .then((res) => {
          setRelatedToRes(
            res.data.data.map((item) => ({
              title: item?.subject,
              id: item?.detailID,
            }))
          );
        })
        .catch((error) => error);
      return null;
      case t("جلسه"):
        axios
          .get(`${appConfig.BaseURL}/api/activities/Session`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.subject,
                id: item?.detailID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("بازدید"):
        return setRelatedToRes([]);
        break;
      case t("یادداشت ها"):
        axios
          .get(`${appConfig.BaseURL}/api/activities/Note`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.subject,
                id: item?.detailID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      default:
        return null;
        break;
    }
  }
  useEffect(() => {
    if (id != null) {
      axios.get(`${appConfig.BaseURL}/api/activities/get/${id}`).then((res) => {
        setContactDetail(res.data.data);
        formik.setFieldValue("subject", res.data.data.subject);
        formik.setFieldValue("relatedTo", res.data.data.relatedTo);
        formik.setFieldValue("relatedToInput", res.data.data.relatedToInput);
        formik.setFieldValue("phoneNumber", res.data.data.phoneNumber);
        formik.setFieldValue("internalNum", res.data.data.internalNum);
        formik.setFieldValue("status", res.data.data.status);
        formik.setFieldValue("date", res.data.data.date);
        formik.setFieldValue("time", res.data.data.time);
        formik.setFieldValue("type", res.data.data.type);
        formik.setFieldValue("duration", res.data.data.duration);
        formik.setFieldValue("userSMS", res.data.data.userSMS);
        formik.setFieldValue("guestsSMS", res.data.data.guestsSMS);
        formik.setFieldValue(
          "softwareReminder",
          res.data.data.softwareReminder
        );
        formik.setFieldValue("desc", res.data.data.desc);
        formik.setFieldValue("sendInvitation", res.data.data.sendInvitation);
        formik.setFieldValue(
          "guestFullName",
          JSON.parse(res.data.data.guestFullName)
        );
      });
    }
  }, [id]);

  useEffect(() => {
    renderRelatedToArray(selectedRelatedTo);
  }, [selectedRelatedTo]);

  const updateContact = (values) => {
    if (values != null) {
      formik.values.guestFullName = JSON.stringify(formik.values.guestFullName);
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
            history.navigate(`/Activities/Contact/ContactManagement`);
          }
        });
    }
  };

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
  const factorSub = () => {
    swal({
      title: t("اطلاعات تماس با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };

  function getParentData(val) {
    formik.setFieldValue("relatedToInput", val.machineWhereaboutsInput);
  }

  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");

  const [panel1, setPanel1] = React.useState(true);
  const handlePanel1 = () => (event, newExpanded) => {
    setPanel1(newExpanded);
  };

  useEffect(() => {
    if (formik.isSubmitting) {
      let condition1 =
        !!(formik.touched.subject && formik.errors.subject) ||
        !!(formik.touched.relatedToInput && formik.errors.relatedToInput) ||
        !!(formik.touched.status && formik.errors.status) ||
        !!(formik.touched.date && formik.errors.date) ||
        !!(formik.touched.time && formik.errors.time);
      setPanel1(condition1 || panel1);
    }
  }, [formik.errors, formik.touched]);

  useEffect(() => {
    if (time) {
      let t = new Date(time);
      formik.setFieldValue(
        "time",
        `${("0" + t.getHours()).slice(-2)}:${("0" + t.getMinutes()).slice(-2)}`
      );
    }
  }, [time]);

  useEffect(() => {
    if (duration) {
      let t = new Date(duration);
      formik.setFieldValue(
        "duration",
        `${("0" + t.getHours()).slice(-2)}:${("0" + t.getMinutes()).slice(-2)}`
      );
    }
  }, [duration]);

  const condition = [t("برنامه ریزی شده"), t("برگزار نمی شود"), t("انجام شده")];
  const type = [t("خروجی"), t("ورودی")];
  const smsReminderToTheUser = [
    t("یک دقیقه قبل از شروع"),
    t("پانزده دقیقه قبل از شروع"),
    t("یک ساعت قبل از شروع"),
    t("چهار ساعت قبل از شروع"),
    t("یک روز قبل از شروع"),
    t("دو روز قبل از شروع"),
  ];
  const smsReminderToInvitees = [
    t("یک دقیقه قبل از شروع"),
    t("پانزده دقیقه قبل از شروع"),
    t("یک ساعت قبل از شروع"),
    t("چهار ساعت قبل از شروع"),
    t("یک روز قبل از شروع"),
    t("دو روز قبل از شروع"),
  ];
  const reminderInTheApp = [
    t("یک دقیقه قبل از شروع"),
    t("پانزده دقیقه قبل از شروع"),
    t("یک ساعت قبل از شروع"),
    t("چهار ساعت قبل از شروع"),
    t("یک روز قبل از شروع"),
    t("دو روز قبل از شروع"),
  ];
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
  console.log("look here-------", formik.values.duration);
  return (
    <>
      <div>
        <div>
          {/*<h1*/}
          {/*  className='main-title'>*/}
          {/*    {t("تماس")}*/}
          {/*</h1>*/}
        </div>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Accordion expanded={panel1} onChange={handlePanel1()}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{t("اطلاعات تماس")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="form-design">
                  <div className="row">
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>
                          {t("موضوع")} <span className="star">*</span>
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
                                dataSource={relatedToData.filter((item) => idList.includes(item.entitiesID))}
                                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                onValueChanged={(e) => {
                                  setSelectedRelatedTo(e.value.displayName)
                                  formik.setFieldValue("relatedTo", e.value.entitiesID);
                                }}
                                defaultValue={formik.values.relatedTo}
                                displayExpr="displayName"
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
                                dataSource={relatedToData.filter((item) => idList.includes(item.entitiesID))}
                                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                onValueChanged={(e) => {
                                  setSelectedRelatedTo(e.value.displayName)
                                  formik.setFieldValue("relatedTo", e.value.entitiesID);
                                }}
                                defaultValue={formik.values.relatedTo}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                displayExpr="displayName"
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
                            <SelectBox
                              dataSource={relatedToRes}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                formik.setFieldValue("relatedToInput", e.value);
                              }}
                              defaultValue={formik.values.relatedToInput}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              displayExpr="title"
                              valueExpr="title"
                              key="id"
                              placeholder=""
                              name="relatedToInput"
                              id="relatedToInput"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                            {formik.touched.relatedToInput &&
                            formik.errors.relatedToInput ? (
                              <div className="error-msg">
                                {t(formik.errors.relatedToInput)}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="content col-lg-4 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("تلفن تماس")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <input
                            className="form-input"
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneNumber}
                          />
                          {formik.touched.phoneNumber &&
                          formik.errors.phoneNumber ? (
                            <div className="error-msg">
                              {t(formik.errors.phoneNumber)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-2 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("داخلی")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <input
                            className="form-input"
                            type="text"
                            id="internalNum"
                            name="internalNum"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.internalNum}
                          />
                          {formik.touched.internalNum &&
                          formik.errors.internalNum ? (
                            <div className="error-msg">
                              {t(formik.errors.internalNum)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("وضعیت")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.status != "" && (
                            <SelectBox
                              dataSource={condition}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("status", e.value);
                              }}
                              defaultValue={formik.values.status}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="status"
                              id="status"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null && formik.values.status == "")) && (
                            <SelectBox
                              dataSource={condition}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e555555555555", e);
                                formik.setFieldValue("status", e.value);
                              }}
                              defaultValue={formik.values.status}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="status"
                              id="status"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {formik.touched.status &&
                          formik.errors.status &&
                          !formik.values.status ? (
                            <div className="error-msg">
                              {t(formik.errors.status)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="content col-lg-3 col-md-6 col-xs-12">
                      <div className="title">
                        <span>
                          {t("تاریخ")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper date-picker position-relative">
                        <DatePicker
                          name={"date"}
                          id={"date"}
                          ref={dateRef}
                          calendar={renderCalendarSwitch(i18n.language)}
                          locale={renderCalendarLocaleSwitch(i18n.language)}
                          onBlur={formik.handleBlur}
                          onChange={(val) => {
                            formik.setFieldValue(
                              "date",
                              julianIntToDate(val.toJulianDay())
                            );
                          }}
                          value={getLangDate(i18n.language, formik.values.date)}
                          editable={false}
                        />
                        <div
                          className={`modal-action-button  ${
                            i18n.dir() === "ltr" ? "action-ltr" : ""
                          }`}
                        >
                          <div className="d-flex align-items-center justify-content-center">
                            <CalendarMonthIcon className="calanderButton modal" />
                          </div>
                        </div>
                      </div>
                      {formik.touched.date &&
                      formik.errors.date &&
                      !formik.values.date ? (
                        <div className="error-msg">{t(formik.errors.date)}</div>
                      ) : null}
                    </div>

                    <div
                      className="content col-lg-3 col-md-6 col-xs-12"
                      onFocus={() => dateRef?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("زمان")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          ampm={false}
                          className="time-picker"
                          views={["hours", "minutes"]}
                          inputFormat="HH:mm"
                          id="time"
                          name="time"
                          mask="__:__"
                          value={time}
                          onChange={(newValue) => {
                            setTime(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params}></TextField>
                          )}
                        />
                        {formik.touched.time &&
                        formik.errors.time &&
                        !formik.values.time ? (
                          <div className="error-msg">
                            {t(formik.errors.time)}
                          </div>
                        ) : null}
                      </LocalizationProvider>
                    </div>

                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("نوع")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.type != "" && (
                            <SelectBox
                              dataSource={type}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("type", e.value);
                              }}
                              defaultValue={formik.values.type}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="type"
                              id="type"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null && formik.values.type == "")) && (
                            <SelectBox
                              dataSource={type}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e555555555555", e);
                                formik.setFieldValue("type", e.value);
                              }}
                              defaultValue={formik.values.type}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="type"
                              id="type"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {formik.touched.type &&
                          formik.errors.type &&
                          !formik.values.type ? (
                            <div className="error-msg">
                              {t(formik.errors.type)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("مدت تماس")}</span>
                      </div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          ampm={false}
                          className="time-picker"
                          views={["hours", "minutes"]}
                          inputFormat="HH:mm"
                          mask="__:__"
                          value={duration}
                          onChange={(newValue) => {
                            setDuration(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>

                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("پیامک یادآوری به کاربر")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.userSMS != "" && (
                            <SelectBox
                              dataSource={smsReminderToTheUser}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("userSMS", e.value);
                              }}
                              defaultValue={formik.values.userSMS}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="userSMS"
                              id="userSMS"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null && formik.values.userSMS == "")) && (
                            <SelectBox
                              dataSource={smsReminderToTheUser}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e555555555555", e);
                                formik.setFieldValue("userSMS", e.value);
                              }}
                              defaultValue={formik.values.userSMS}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="userSMS"
                              id="userSMS"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {formik.touched.userSMS &&
                          formik.errors.userSMS &&
                          !formik.values.userSMS ? (
                            <div className="error-msg">
                              {t(formik.errors.userSMS)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("پیامک یادآوری به مدعوین")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.guestsSMS != "" && (
                            <SelectBox
                              dataSource={smsReminderToInvitees}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("guestsSMS", e.value);
                              }}
                              defaultValue={formik.values.guestsSMS}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="guestsSMS"
                              id="guestsSMS"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null && formik.values.guestsSMS == "")) && (
                            <SelectBox
                              dataSource={smsReminderToInvitees}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e555555555555", e);
                                formik.setFieldValue("guestsSMS", e.value);
                              }}
                              defaultValue={formik.values.guestsSMS}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="guestsSMS"
                              id="guestsSMS"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {formik.touched.guestsSMS &&
                          formik.errors.guestsSMS &&
                          !formik.values.guestsSMS ? (
                            <div className="error-msg">
                              {t(formik.errors.guestsSMS)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("یادآوری در برنامه")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.softwareReminder != "" && (
                            <SelectBox
                              dataSource={reminderInTheApp}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue(
                                  "softwareReminder",
                                  e.value
                                );
                              }}
                              defaultValue={formik.values.softwareReminder}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="softwareReminder"
                              id="softwareReminder"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.softwareReminder == "")) && (
                            <SelectBox
                              dataSource={reminderInTheApp}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e555555555555", e);
                                formik.setFieldValue(
                                  "softwareReminder",
                                  e.value
                                );
                              }}
                              defaultValue={formik.values.softwareReminder}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="softwareReminder"
                              id="softwareReminder"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {formik.touched.softwareReminder &&
                          formik.errors.softwareReminder &&
                          !formik.values.softwareReminder ? (
                            <div className="error-msg">
                              {t(formik.errors.softwareReminder)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-12 col-xs-12">
                      <div className="title">
                        <span>{t("توضیحات")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <textarea
                            className="form-input"
                            type="text"
                            id="desc"
                            name="desc"
                            style={{ width: "100%", height: "108px" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.desc}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <FieldArray
                        name="guestFullName"
                        render={({ push, remove }) => (
                          <React.Fragment>
                            <div className="row">
                              <div className="content col-lg-12 col-md-12 col-xs-12">
                                <Button
                                  className="AddRow"
                                  onClick={() => push(emptyGuest)}
                                >
                                  {t("افزودن")}
                                </Button>
                              </div>
                              {formik?.values?.guestFullName?.map(
                                (guestFullName, index) => (
                                  <div
                                    className="content col-lg-12 col-md-12 col-xs-12"
                                    key={index}
                                  >
                                    <div className="row align-items-center">
                                      <div className="content col-lg-11 col-md-11 col-11">
                                        <div className="title">
                                          <span>{t("مدعوین")}</span>
                                        </div>
                                        <div className="wrapper">
                                          <div className="divModal">
                                            <input
                                              className={`form-input modal-input ${
                                                i18n.dir() === "ltr"
                                                  ? "ltr"
                                                  : ""
                                              }`}
                                              type="text"
                                              id="guests"
                                              name={`guestFullName[${index}].guests`}
                                              style={{ width: "100%" }}
                                              onChange={formik.handleChange}
                                              onBlur={() => {
                                                let temp = guestTouch.map(
                                                  (item, i) =>
                                                    i === index
                                                      ? {
                                                          ...item,
                                                          guests: true,
                                                        }
                                                      : item
                                                );
                                                setguestTouch(temp);
                                              }}
                                              value={
                                                formik.values.guestFullName[
                                                  index
                                                ].guests
                                              }
                                              disabled
                                            />
                                            <div
                                              className={`modal-action-button  ${
                                                i18n.dir() == "ltr"
                                                  ? "action-ltr"
                                                  : ""
                                              }`}
                                            >
                                              <GuestsModal
                                                className="Modal"
                                                getData={(val) =>
                                                  formik.setFieldValue(
                                                    `guestFullName[${index}].guests`,
                                                    val.CategoryName
                                                  )
                                                }
                                              />
                                              <Button className="cancelButton">
                                                {" "}
                                                <CancelIcon
                                                  onClick={() =>
                                                    formik.setFieldValue(
                                                      `guestFullName[${index}].guests`,
                                                      ""
                                                    )
                                                  }
                                                />
                                              </Button>
                                            </div>

                                            {Array.isArray(
                                              formik.errors.guestFullName
                                            ) && Array.isArray(guestTouch)
                                              ? formik.errors.guestFullName[
                                                  index
                                                ]?.guests &&
                                                guestTouch[index]?.guests && (
                                                  <div className="error-msg">
                                                    {t(
                                                      formik.errors
                                                        .guestFullName[index]
                                                        ?.guests
                                                    )}
                                                  </div>
                                                )
                                              : ""}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="content col-lg-1 col-md-1 col-1">
                                        <div className="title">
                                          <span>‌‌</span>
                                        </div>
                                        {index != 0 ? (
                                          <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="remove-btn"
                                            style={{
                                              background: "transparent",
                                              border: "none",
                                              marginTop: "20px",
                                            }}
                                          >
                                            <DeleteIcon fontSize="medium" />
                                          </button>
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </React.Fragment>
                        )}
                      ></FieldArray>
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
                          (id != null && formik.values.personnelID == "")) && (
                          <SelectBox
                            dataSource={personnelData}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue(
                                "personnelID",
                                e.value.personnelID
                              );
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
                    <div className="content col-lg-4 col-md-6 col-xs-12">
                      <div className="wrapper">
                        <FormControlLabel
                          value="end"
                          control={
                            <Checkbox
                              checked={formik.values.sendInvitation}
                              id="sendInvitation"
                              onBlur={formik.handleBlur}
                              onChange={formik.handleChange}
                              name="sendInvitation"
                            />
                          }
                          label="ارسال دعوت نامه (پیامک)"
                          labelPlacement="end"
                        />
                        {formik.touched.sendInvitation &&
                        formik.errors.sendInvitation ? (
                          <div className="error-msg">
                            {t(formik.errors.sendInvitation)}
                          </div>
                        ) : null}
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
                onClick={id != null ? updateContact : formik.handleSubmit}
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
        </FormikProvider>
      </div>
    </>
  );
};

export default CreateContact;
