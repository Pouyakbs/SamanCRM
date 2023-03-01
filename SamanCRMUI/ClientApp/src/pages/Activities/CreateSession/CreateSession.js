import React, { useState, useEffect, useRef } from "react";

import { FieldArray, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Grid, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import SessionModalCon from "../../../components/Modals/CreateSession_SessionModal/SessionModalCon";
import NewUserModal from "../../../components/Modals/CreateSession_NewUserModal/NewUserModal";
import { julianIntToDate } from "../../../utils/dateConvert";
import { SelectBox } from "devextreme-react/select-box";
import {
  renderCalendarSwitch,
  renderCalendarLocaleSwitch,
} from "../../../utils/calenderLang";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CategoryModal from "../../../components/Modals/CreateDuty_CategoryModal/CategoryModal";
import UserModal from "../../../components/Modals/CreateDuty_UserModal/UserModal";
import { useSearchParams } from "react-router-dom";
import { history } from "../../../utils/history";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import GuestsModal from "../../../components/Modals/Ghafourian_CategoryModal/CategoryModal";
import DisableInputModal from "../../../components/Modals/SupportDisableInputModal/DisableInputModal";
import DateObject from "react-date-object";
import { getLangDate } from "../../../utils/getLangDate";

export const CreateSession = () => {
  const { t, i18n } = useTranslation();
  const [meetingPlaces, setMeetingPlaces] = useState([]);
  const appConfig = window.globalConfig;
  const [alignment, setAlignment] = React.useState("");
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const [result, setResult] = useState();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [muitime, setmuitime] = React.useState("");
  function handleChangetimepicker(time) {
    setmuitime(time);
  }
  const emptyGuest = { guests: "" };
  const emptyGuestTouch = { guests: false };
  const [guestTouch, setguestTouch] = useState([emptyGuestTouch]);

  const [panel1, setPanel1] = React.useState(true);
  const [personnelData, setPersonnelData] = useState([]);
  const handlePanel1 = () => (event, newExpanded) => {
    setPanel1(newExpanded);
  };
  const dateRef = useRef();
  const theme = useTheme();
  useEffect(() => {
    axios
      .get(`${appConfig.BaseURL}/api/meetingPlaces`)
      .then((res) => setMeetingPlaces(res.data.data));
  }, []);
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
  const callComponent = () => {
    history.navigate(`/Activities/Meeting/SessionManagement`);
  };
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      entityType: "Session",
      subject: "",
      relatedTo: "",
      relatedToInput: "",
      status: "",
      date: new DateObject(),
      time: "",
      meetinglocation: "",
      duration: "",
      guestsSMS: "",
      softwareReminder: "",
      desc: "",
      guestFullName: [emptyGuest],
      sendInvitation: false,
    },
    validationSchema: Yup.object({
      relatedTo: Yup.string()
        .required("وارد کردن مرتبط با الزامیست")
        .nullable(true),
      subject: Yup.string().required("وارد کردن موضوع الزامیست"),
      status: Yup.string().required("وارد کردن وضعیت الزامیست").nullable(true),
      relatedToInput: Yup.string().required("وارد کردن این قسمت الزامیست"),
      date: Yup.string().required("وارد کردن تاریخ الزامی است"),
      time: Yup.string().required(() => {
        return "زمان الزامیست";
      }),
    }),

    onSubmit: (values) => {
      var guestFullName = JSON.stringify(values.guestFullName);
      values.guestFullName = guestFullName;
      if (parseInt(values.time) < 8 || parseInt(values.time) > 17) {
        swal({
          title: "امکان ثبت جلسه در خارج ساعات کاری وجود ندارد",
          icon: "error",
          button: t("باشه"),
        });
      } else if (values.date < Date.now) {
        swal({
          title: "آیا از ثبت جلسه اطمینان دارید؟",
          text: "!تاریخ تعیین شده برای جلسه مربوط به گذشته است",
          icon: "warning",
          buttons: ["انصراف", "بله"],
        }).then((willDelete) => {
          if (willDelete) {
            axios
              .post(`${appConfig.BaseURL}/api/activities`, values)
              .then((res) => setResult(res.data.data));
            factorSub();
            callComponent();
          } else {
            swal({
              title: "!ثبت جلسه با موفقیت لغو شد",
              icon: "success",
              button: t("باشه"),
            });
          }
        });
      } else {
        axios
          .post(`${appConfig.BaseURL}/api/activities`, values)
          .then((res) => setResult(res.data.data));
        factorSub();
        callComponent();
      }
    },
  });

  useEffect(() => {
    if (id != null) {
      axios.get(`${appConfig.BaseURL}/api/activities/get/${id}`).then((res) => {
        formik.setFieldValue("subject", res.data.data.subject);
        formik.setFieldValue("relatedTo", res.data.data.relatedTo);
        formik.setFieldValue("relatedToInput", res.data.data.relatedToInput);
        formik.setFieldValue("status", res.data.data.status);
        formik.setFieldValue("date", res.data.data.date);
        formik.setFieldValue("time", res.data.data.time);
        formik.setFieldValue("meetinglocation", res.data.data.meetinglocation);
        formik.setFieldValue("duration", res.data.data.duration);
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
  const updateSession = (values) => {
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
            history.navigate(`/Activities/Meeting/SessionManagement`);
          }
        });
    }
  };

  const factorSub = () => {
    swal({
      title: t("جلسه با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };

  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");

  function getParentData(val) {
    formik.setFieldValue("relatedToInput", val.machineWhereaboutsInput);
  }

  useEffect(() => {
    if (formik.isSubmitting) {
      let condition1 =
        !!(formik.touched.relatedTo && formik.errors.relatedTo) ||
        !!(formik.touched.subject && formik.errors.subject) ||
        !!(formik.touched.status && formik.errors.status) ||
        !!(formik.touched.relatedToInput && formik.errors.relatedToInput) ||
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

  function clearFieldMortab() {
    formik.setFieldValue("relatedToInput", "");
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
  const condition = [t("برنامه ریزی شده"), t("برگزار نمی شود"), t("انجام شده")];
  const meetinglocation = [
    t("جعبه"),
    t("دستگاه"),
    t("ساعت"),
    t("شاخه"),
    t("عدد"),
    t("کارتن"),
    t("کیلوگرم"),
    t("لیتر"),
    t("متر"),
    t("متر مربع"),
    t("ورقه"),
    t("ماه"),
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
  return (
    <>
      <div id="form" style={{ display: "block", marginRight: "10px" }}>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            {/*<h1 className="main-title">*/}
            {/*    {t("ایجاد جلسه")}{" "}*/}
            {/*</h1>*/}

            <Accordion expanded={panel1} onChange={handlePanel1()}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{t("جلسه")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
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
                                className={`form-input modal-input ${
                                  i18n.dir() === "ltr" ? "ltr" : ""
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
                                className={`modal-action-button  ${
                                  i18n.dir() == "ltr" ? "action-ltr" : ""
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
                            value={getLangDate(
                              i18n.language,
                              formik.values.date
                            )}
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
                          <div className="error-msg">
                            {t(formik.errors.date)}
                          </div>
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
                          <span> {t("مکان جلسه")} </span>
                        </div>
                        <div className="wrapper">
                          {id != null && formik.values.meetinglocation != "" && (
                            <SelectBox
                              dataSource={meetingPlaces}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                formik.setFieldValue(
                                  "meetinglocation",
                                  e.value
                                );
                              }}
                              defaultValue={formik.values.meetinglocation}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              displayExpr="placeName"
                              valueExpr={"placeName"}
                              name="meetinglocation"
                              id="meetinglocation"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.meetinglocation == "")) && (
                            <SelectBox
                              dataSource={meetingPlaces}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                formik.setFieldValue(
                                  "meetinglocation",
                                  e.value.placeName
                                );
                              }}
                              defaultValue={formik.values.meetinglocation}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              displayExpr="placeName"
                              placeholder=""
                              name="meetinglocation"
                              id="meetinglocation"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {formik.touched.meetinglocation &&
                          formik.errors.meetinglocation &&
                          !formik.values.meetinglocation ? (
                            <div className="error-msg">
                              {t(formik.errors.meetinglocation)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="content col-lg-6 col-md-6 col-xs-12">
                        <div className="title">
                          <span>{t("تعداد ساعت")}</span>
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
                              (id != null &&
                                formik.values.guestsSMS == "")) && (
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
                            {id != null &&
                              formik.values.softwareReminder != "" && (
                                <SelectBox
                                  dataSource={reminderInTheApp}
                                  rtlEnabled={
                                    i18n.dir() == "ltr" ? false : true
                                  }
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
                      <div className="content col-lg-6 col-md-6 col-xs-12">
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
                </div>
              </AccordionDetails>
            </Accordion>

            <div className="button-pos">
              <Button
                variant="contained"
                color="success"
                type="button"
                onClick={id != null ? updateSession : formik.handleSubmit}
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

export default CreateSession;
