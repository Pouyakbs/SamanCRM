import React, { useEffect, useRef, useState } from "react";
import { FieldArray, useFormik } from "formik";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import * as Yup from "yup";
import swal from "sweetalert";
import DatePicker from "react-multi-date-picker";
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
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import CategoryModal from "../../../components/Modals/CreateDuty_CategoryModal/CategoryModal";
import { julianIntToDate } from "../../../utils/dateConvert";
import { SelectBox } from "devextreme-react/select-box";
import {
  renderCalendarSwitch,
  renderCalendarLocaleSwitch,
} from "../../../utils/calenderLang";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DisableInputModal from "../../../components/Modals/SupportDisableInputModal/DisableInputModal";
import GuestsModal from "../../../components/Modals/Ghafourian_CategoryModal/CategoryModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSearchParams } from "react-router-dom";
import { history } from "../../../utils/history";
import axios from "axios";
import DateObject from "react-date-object";
import { getLangDate } from "../../../utils/getLangDate";

export const CreateDuty = () => {
  const [alignment, setAlignment] = React.useState("");
  const [personnelData, setPersonnelData] = useState([]);
  const appConfig = window.globalConfig;
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const [result, setResult] = useState();

  const [panel1, setPanel1] = React.useState(true);
  const handlePanel1 = () => (event, newExpanded) => {
    setPanel1(newExpanded);
  };
  const dateRef = useRef();

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
    history.navigate(`/Activities/Duty/DutyManagement`);
  };
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      id: Math.floor(Math.random() * 1000),
      entityType: "Duty",
      subject: "",
      relatedTo: "",
      relatedToInput: "",
      priority: "",
      status: "",
      duration: "",
      date: new DateObject(),
      startTime: "",
      deadline: new DateObject(),
      personnelID: "",
      time: "",
      userSMS: "",
      softwareReminder: "",
      groupAnnounce: "",
      desc: "",
    },
    validationSchema: Yup.object({
      relatedTo: Yup.string()
        .required("وارد کردن مرتبط با الزامیست")
        .nullable(true),
      status: Yup.string().required("وارد کردن وضعیت الزامیست").nullable(true),
      subject: Yup.string().required("وارد کردن موضوع الزامیست"),
      relatedToInput: Yup.string().required("وارد کردن این قسمت الزامیست"),
      date: Yup.string().required("وارد کردن تاریخ شروع الزامیست"),
      deadline: Yup.string()
        .required("وارد کردن مهلت انجام الزامیست")
        .when("date", (date) => {
          if (Date.parse(formik.values.deadline) - Date.parse(date) < 0) {
            return Yup.date().min(
              date,
              "تاریخ پایان باید پیش از تاریخ شروع باشد"
            );
          }
        }),

      startTime: Yup.string().required(() => {
        return "زمان شروع الزامیست";
      }),
      time: Yup.string().required(() => {
        return "زمان اتمام الزامیست";
      }),
      priority: Yup.string().required(() => {
        return "اولویت الزامیست";
      }),
    }),
    onSubmit: (values) => {
      axios
        .post(`${appConfig.BaseURL}/api/activities`, values)
        .then((res) => setResult(res.data.data));
      factorSub();
      callComponent();
    },
  });

  useEffect(() => {
    if (id != null) {
      axios.get(`${appConfig.BaseURL}/api/activities/get/${id}`).then((res) => {
        formik.setFieldValue("subject", res.data.data.subject);
        formik.setFieldValue("relatedTo", res.data.data.relatedTo);
        formik.setFieldValue("relatedToInput", res.data.data.relatedToInput);
        formik.setFieldValue("priority", res.data.data.priority);
        formik.setFieldValue("status", res.data.data.status);
        formik.setFieldValue("duration", res.data.data.duration);
        formik.setFieldValue("date", res.data.data.date);
        formik.setFieldValue("startTime", res.data.data.startTime);
        formik.setFieldValue("deadline", res.data.data.deadline);
        formik.setFieldValue("time", res.data.data.time);
        formik.setFieldValue("userSMS", res.data.data.userSMS);
        formik.setFieldValue(
          "softwareReminder",
          res.data.data.softwareReminder
        );
        formik.setFieldValue("groupAnnounce", res.data.data.groupAnnounce);
        formik.setFieldValue("desc", res.data.data.desc);
      });
    }
  }, [id]);
  const updateDuty = (values) => {
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
            history.navigate(`/Activities/Duty/DutyManagement`);
          }
        });
    }
  };

  const factorSub = () => {
    swal({
      title: t("وظیفه با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };

  const [startTime, setStartTime] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");

  function getParentData(val) {
    formik.setFieldValue("relatedToInput", val.machineWhereaboutsInput);
  }
  useEffect(() => {
    if (formik.isSubmitting) {
      let condition1 =
        !!(formik.touched.subject && formik.errors.subject) ||
        !!(formik.touched.relatedTo && formik.errors.relatedTo) ||
        !!(formik.touched.relatedToInput && formik.errors.relatedToInput) ||
        !!(formik.touched.status && formik.errors.status) ||
        !!(formik.touched.date && formik.errors.date) ||
        !!(formik.touched.startTime && formik.errors.startTime) ||
        !!(formik.touched.time && formik.errors.time) ||
        !!(formik.touched.priority && formik.errors.priority) ||
        !!(formik.touched.deadline && formik.errors.deadline);
      setPanel1(condition1 || panel1);
    }
  }, [formik.errors, formik.touched]);

  function clearFieldMortab() {
    formik.setFieldValue("relatedToInput", "");
  }

  useEffect(() => {
    if (startTime) {
      let t = new Date(startTime);
      formik.setFieldValue(
        "startTime",
        `${("0" + t.getHours()).slice(-2)}:${("0" + t.getMinutes()).slice(-2)}`
      );
    }
  }, [startTime]);
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

  const priority = [
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
  const smsReminderToTheUser = [
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
  const reminderInTheGroup = [
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
        {/*<h1 className='main-title' >*/}
        {/*    {t("")}*/}
        {/*</h1>*/}

        <form onSubmit={formik.handleSubmit}>
          {/*<h1 className="main-title">*/}
          {/*    {t("ایجاد وظیفه")}{" "}*/}
          {/*</h1>*/}

          <Accordion expanded={panel1} onChange={handlePanel1()}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{t("وظیفه")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                style={{
                  border: "0",
                }}
              >
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
                                rtlEnabled={i18n.dir() == "ltr" ? false : true}
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
                                rtlEnabled={i18n.dir() == "ltr" ? false : true}
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
                          {t("اولویت")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.priority != "" && (
                            <SelectBox
                              dataSource={priority}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("priority", e.value);
                              }}
                              defaultValue={formik.values.priority}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="priority"
                              id="priority"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null && formik.values.priority == "")) && (
                            <SelectBox
                              dataSource={priority}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e555555555555", e);
                                formik.setFieldValue("priority", e.value);
                              }}
                              defaultValue={formik.values.priority}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="priority"
                              id="priority"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {formik.touched.priority &&
                          formik.errors.priority &&
                          !formik.values.priority ? (
                            <div className="error-msg">
                              {t(formik.errors.priority)}
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
                    <div className="content col-lg-3 col-md-6 col-xs-12">
                      <div className="title">
                        <span>
                          {t("تاریخ شروع")}
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
                          value={getLangDate(i18n.language , formik.values.date)}
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
                          {t("زمان شروع")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          ampm={false}
                          className="time-picker"
                          views={["hours", "minutes"]}
                          inputFormat="HH:mm"
                          id="startTime"
                          name="startTime"
                          mask="__:__"
                          value={startTime}
                          onChange={(newValue) => {
                            setStartTime(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField {...params}></TextField>
                          )}
                        />
                        {formik.touched.startTime &&
                        formik.errors.startTime &&
                        !formik.values.startTime ? (
                          <div className="error-msg">
                            {t(formik.errors.startTime)}
                          </div>
                        ) : null}
                      </LocalizationProvider>
                    </div>

                    <div className="content col-lg-3 col-md-6 col-xs-12">
                      <div className="title">
                        <span>
                          {t("مهلت انجام")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper date-picker position-relative">
                        <DatePicker
                          name={"deadline"}
                          id={"deadline"}
                          ref={dateRef}
                          calendar={renderCalendarSwitch(i18n.language)}
                          locale={renderCalendarLocaleSwitch(i18n.language)}
                          onBlur={formik.handleBlur}
                          onChange={(val) => {
                            formik.setFieldValue(
                              "deadline",
                              julianIntToDate(val.toJulianDay())
                            );
                          }}
                          value={getLangDate(i18n.language , formik.values.deadline)}
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
                      {formik.touched.deadline &&
                      formik.errors.deadline &&
                      !formik.values.deadline ? (
                        <div className="error-msg">
                          {t(formik.errors.deadline)}
                        </div>
                      ) : null}
                    </div>

                    <div
                      className="content col-lg-3 col-md-6 col-xs-12"
                      onFocus={() => dateRef?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("زمان اتمام")}
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
                        <span>{t("یادآوری در نرم افزار")}</span>
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
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("اطلاع رسانی در گروه")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.groupAnnounce != "" && (
                            <SelectBox
                              dataSource={reminderInTheGroup}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("groupAnnounce", e.value);
                              }}
                              defaultValue={formik.values.groupAnnounce}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="groupAnnounce"
                              id="groupAnnounce"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.groupAnnounce == "")) && (
                            <SelectBox
                              dataSource={reminderInTheGroup}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e555555555555", e);
                                formik.setFieldValue("groupAnnounce", e.value);
                              }}
                              defaultValue={formik.values.groupAnnounce}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="groupAnnounce"
                              id="groupAnnounce"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {formik.touched.groupAnnounce &&
                          formik.errors.groupAnnounce &&
                          !formik.values.groupAnnounce ? (
                            <div className="error-msg">
                              {t(formik.errors.groupAnnounce)}
                            </div>
                          ) : null}
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
                          (id != null && formik.values.personnelID == "")) && (
                          <SelectBox
                            dataSource={personnelData}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("personnelID", e.value.personnelID);
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
              onClick={id != null ? updateDuty : formik.handleSubmit}
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
  );
};

export default CreateDuty;
