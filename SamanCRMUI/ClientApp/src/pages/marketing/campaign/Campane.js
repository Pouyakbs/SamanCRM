import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import UsernameModal from "../../../components/Modals/CampaignUsernameModal/UsernameModal";
import MotherCampaneModal from "../../../components/Modals/CampaignMotherCampaneModal/MotherCampaignModal";
import { julianIntToDateTime } from "../../../utils/dateConvert";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CurrencyInput from "react-currency-input-field";
import "devextreme/dist/css/dx.light.css";

import { SelectBox } from "devextreme-react/select-box";
import { parsFloatFunction } from "../../../utils/parsFloatFunction";
import { history } from "../../../utils/history";
import {
  renderCalendarSwitch,
  renderCalendarLocaleSwitch,
} from "../../../utils/calenderLang";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DateObject from "react-date-object";
import { getLangDate } from "../../../utils/getLangDate";

const Factor = [];
export const Campane = () => {
  const { t, i18n } = useTranslation();
  const [alignment, setAlignment] = React.useState("");
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const appConfig = window.globalConfig;
  const [campaign, setCampaign] = useState([]);
  const [campaignDetail, setCampaignDetail] = useState([]);
  const [result, setResult] = useState();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [panel1, setPanel1] = React.useState(true);
  const handlePanel1 = () => (event, newExpanded) => {
    setPanel1(newExpanded);
  };
  const measurementUnits = [
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
  const currencyInput = ["Rial : ریال", "Dollar : $", "Euro : €"];
  const theme = useTheme();
  const [factor, setFactor] = React.useState(Factor);
  const dateRef1 = useRef();
  const dateRef2 = useRef();
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      campaignID: 0,
      campaignName: "",
      status: "",
      type: "",
      repetitionRate: "",
      originalCampaign: "",
      parentID: 0,
      moneyUnit: id != null ? "" : currencyInput[0],
      readEmails: "",
      budget: 0,
      realCost: 0,
      expectedIncome: 0,
      expectedCost: 0,
      expectedAnswer: "",
      target: "",
      desc: "",
      startDate: new DateObject(),
      endDate: new DateObject(),
    },
    validationSchema: Yup.object({
      campaignName: Yup.string()
        .max(15, "نام باید شامل 15 حرف یا کمتر باشد")
        .required("نام الزامیست"),
      status: Yup.string()
        .max(15, "وضعیت باید شامل 15 حرف یا کمتر باشد")
        .required("وضعیت الزامیست"),
      type: Yup.string()
        .max(15, "نوع باید شامل 15 حرف یا کمتر باشد")
        .required("نوع الزامیست"),
      startDate: Yup.string().required(" تاریخ شروع الزامیست"),
      endDate: Yup.string()
        .required(" تاریخ پایان الزامیست")
        .when("startDate", (startDate) => {
          if (
            Date.parse(formik.values.endDate) - Date.parse(startDate) <
            0
          ) {
            return Yup.date().min(
              startDate,
              "تاریخ پایان باید پیش از تاریخ شروع باشد"
            );
          }
        }),
    }),
    onSubmit: (values) => {
      console.log("values", values);
      axios
        .post(`${appConfig.BaseURL}/api/Campaign`, values)
        .then((res) => setResult(res.data.data));
      factorSub();
      callComponent();
    },
  });
  useEffect(() => {
    axios
      .get(`${appConfig.BaseURL}/api/Campaign`)
      .then((res) => setCampaign(res.data.data));
  }, []);
  const factorSub = () => {
    swal({
      title: t("کمپین با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };

  const condition = [t("برنامه ریزی شده"), t("برگزار نمی شود"), t("انجام شده")];
  const updateCampaign = (values) => {
    if (values != null) {
      let isSuccess = false;
      axios
        .put(`${appConfig.BaseURL}/api/Campaign/Update/${id}`, formik.values)
        .then((res) => {
          setResult(res.data);
          isSuccess = true;
        })
        .finally(() => {
          if ((isSuccess = true)) {
            history.navigate(`/marketing/Campaign/CampaignManagement`);
          }
        });
    }
  };
  useEffect(() => {
    if (id != null) {
      axios.get(`${appConfig.BaseURL}/api/Campaign/${id}`).then((res) => {
        setCampaignDetail(res.data.data);
        formik.setFieldValue("campaignID", res.data.data.campaignID);
        formik.setFieldValue("campaignName", res.data.data.campaignName);
        formik.setFieldValue("status", res.data.data.status);
        formik.setFieldValue("type", res.data.data.type);
        formik.setFieldValue("repetitionRate", res.data.data.repetitionRate);
        formik.setFieldValue("parentID", res.data.data.parentID);
        formik.setFieldValue("moneyUnit", res.data.data.moneyUnit);
        formik.setFieldValue("readEmails", res.data.data.readEmails);
        formik.setFieldValue("budget", res.data.data.budget);
        formik.setFieldValue("realCost", res.data.data.realCost);
        formik.setFieldValue("expectedIncome", res.data.data.expectedIncome);
        formik.setFieldValue("expectedCost", res.data.data.expectedCost);
        formik.setFieldValue("expectedAnswer", res.data.data.expectedAnswer);
        formik.setFieldValue("target", res.data.data.target);
        formik.setFieldValue("desc", res.data.data.desc);
        formik.setFieldValue("startDate", res.data.data.startDate);
        formik.setFieldValue("endDate", res.data.data.endDate);
      });
    }
  }, [id]);

  useEffect(() => {
    if (formik.isSubmitting) {
      let condition1 =
        !!(formik.touched.campaignName && formik.errors.campaignName) ||
        !!(formik.touched.status && formik.errors.status) ||
        !!(formik.touched.type && formik.errors.type) ||
        !!(formik.touched.startDate && formik.errors.startDate) ||
        !!(formik.touched.endDate && formik.errors.endDate);
      setPanel1(condition1 || panel1);
    }
  }, [formik.errors, formik.touched]);


  const callComponent = () => {
    history.navigate(`/marketing/Campaign/CampaignManagement`);
  };
  function HandleSalePriceChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("budget", parsFloatFunction(temp, 2));
  }
  function HandleSalePriceChange2(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("realCost", parsFloatFunction(temp, 2));
  }

  function HandleSalePriceChange3(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("expectedIncome", parsFloatFunction(temp, 2));
  }
  function HandleSalePriceChange4(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("expectedCost", parsFloatFunction(temp, 2));
  }

  return (
    <>
      <div id="form" style={{ display: "block", marginRight: "10px" }}>
        {/*<h1 className='main-title' >*/}
        {/*    {t("کمپین")}*/}
        {/*</h1>*/}
        {/*<br />*/}
        <form onSubmit={formik.handleSubmit}>
          <Accordion expanded={panel1} onChange={handlePanel1()}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{t("کمپین")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div className="form-design">
                  <div className="row ">
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>
                          {t("نام")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <input
                            className="form-input"
                            type="text"
                            id="campaignName"
                            name="campaignName"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.campaignName}
                          />
                          {formik.touched.campaignName && formik.errors.campaignName ? (
                            <div className="error-msg">
                              {t(formik.errors.campaignName)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
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
                          {(!id || (id != null && formik.values.status == "")) && (
                            <SelectBox
                              dataSource={condition}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
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
                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef1?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("نوع")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <input
                            className="form-input"
                            type="text"
                            id="type"
                            name="type"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.type}
                          />

                          {formik.touched.type && formik.errors.type ? (
                            <div className="error-msg">
                              {t(formik.errors.type)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef2?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("تاریخ شروع")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper date-picker position-relative">
                        <DatePicker
                          name={"startDate"}
                          id={"startDate"}
                          editable={false}
                          ref={dateRef1}
                          calendar={renderCalendarSwitch(i18n.language)}
                          locale={renderCalendarLocaleSwitch(i18n.language)}
                          onBlur={formik.handleBlur}
                          onChange={(val) => {
                            formik.setFieldValue(
                              "startDate",
                              julianIntToDateTime(val.toJulianDay())
                            );
                          }}
                          value={getLangDate(i18n.language , formik.values.startDate)}
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
                      {formik.touched.startDate && formik.errors.startDate ? (
                        <div className="error-msg">
                          {t(formik.errors.startDate)}
                        </div>
                      ) : null}
                    </div>
                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef1?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("تاریخ پایان")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper date-picker position-relative">
                        <DatePicker
                          name={"endDate"}
                          id={"endDate"}
                          editabke={false}
                          ref={dateRef2}
                          calendar={renderCalendarSwitch(i18n.language)}
                          locale={renderCalendarLocaleSwitch(i18n.language)}
                          disabled={!formik.values.startDate}
                          minDate={new Date(formik.values.startDate)}
                          onBlur={formik.handleBlur}
                          onChange={(val) => {
                            formik.setFieldValue(
                              "endDate",
                              julianIntToDateTime(val.toJulianDay())
                            );
                          }}
                          value={getLangDate(i18n.language , formik.values.endDate)}
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
                      {formik.touched.endDate &&
                      formik.errors.endDate ? (
                        <div className="error-msg">
                          {t(formik.errors.endDate)}
                        </div>
                      ) : null}
                    </div>

                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef2?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>{t("نرخ تکرار")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <input
                            className="form-input"
                            type="text"
                            id="repetitionRate"
                            name="repetitionRate"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.repetitionRate}
                          />
                          {formik.touched.name && formik.errors.repetitionRate ? (
                            <div className="error-msg">
                              {formik.errors.repetitionRate}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("کمپین مادر")}</span>
                      </div>
                      <div className="wrapper">
                        <div className="divModal">
                        {id != null && formik.values.parentID != "" && (
                          <SelectBox
                            dataSource={campaign}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue(
                                "parentID",
                                e.value
                              );
                            }}
                            defaultValue={formik.values.parentID}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            displayExpr="campaignName"
                            valueExpr={"campaignID"}
                            placeholder=""
                            name="parentID"
                            id="parentID"
                            searchEnabled
                            showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                          />
                        )}
                        {(!id || (id != null && formik.values.parentID == "")) && (
                          <SelectBox
                            dataSource={campaign}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue(
                                "parentID",
                                e.value.campaignID
                              );
                            }}
                            defaultValue={formik.values.parentID}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            displayExpr="campaignName"
                            placeholder=""
                            name="parentID"
                            id="parentID"
                            searchEnabled
                            showClearButton
                          />
                        )}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("واحد پول")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <SelectBox
                            dataSource={currencyInput}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) =>
                              formik.setFieldValue("currency", e.value)
                            }
                            className="selectBox"
                            noDataText={t("اطلاعات یافت نشد")}
                            itemRender={null}
                            placeholder=""
                            name="moneyUnit"
                            id="moneyUnit"
                            searchEnabled
                            defaultValue={currencyInput[0]}
                          />

                          {formik.touched.moneyUnit &&
                          formik.errors.moneyUnit &&
                          !formik.values.moneyUnit ? (
                            <div className="error-msg">
                              {formik.errors.moneyUnit}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("تعداد ایمیل های خوانده شده")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <input
                            placeholder="0"
                            className="form-input"
                            type="text"
                            id="readEmails"
                            name="readEmails"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.readEmails}
                          />
                          {formik.touched.readEmails &&
                          formik.errors.readEmails ? (
                            <div className="error-msg">
                              {formik.errors.readEmails}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("بودجه")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <CurrencyInput
                            className="form-input"
                            style={{ width: "100%" }}
                            id="budget"
                            name="budget"
                            decimalsLimit={2}
                            onBlur={formik.handleBlur}
                            value={formik.values.budget}
                            onChangeCapture={formik.handleChange}
                            onChange={(e) =>
                              HandleSalePriceChange(e.target.value)
                            }
                          />
                          {formik.touched.name && formik.errors.budget ? (
                            <div className="error-msg">
                              {formik.errors.budget}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("هزینه واقعی")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <CurrencyInput
                            className="form-input"
                            style={{ width: "100%" }}
                            id="realCost"
                            name="realCost"
                            decimalsLimit={2}
                            onBlur={formik.handleBlur}
                            value={formik.values.realCost}
                            onChangeCapture={formik.handleChange}
                            onChange={(e) =>
                              HandleSalePriceChange2(e.target.value)
                            }
                          />
                          {formik.touched.realCost && formik.errors.realCost ? (
                            <div className="error-msg">
                              {formik.errors.realCost}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("درآمد مورد انتظار")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <CurrencyInput
                            className="form-input"
                            style={{ width: "100%" }}
                            id="expectedIncome"
                            name="expectedIncome"
                            decimalsLimit={2}
                            onBlur={formik.handleBlur}
                            value={formik.values.expectedIncome}
                            onChangeCapture={formik.handleChange}
                            onChange={(e) =>
                              HandleSalePriceChange3(e.target.value)
                            }
                          />
                          {formik.touched.expectedIncome &&
                          formik.errors.expectedIncome ? (
                            <div className="error-msg">
                              {formik.errors.expectedIncome}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("هزینه مورد انتظار")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <CurrencyInput
                            className="form-input"
                            style={{ width: "100%" }}
                            id="expectedCost"
                            name="expectedCost"
                            decimalsLimit={2}
                            onBlur={formik.handleBlur}
                            value={formik.values.expectedCost}
                            onChangeCapture={formik.handleChange}
                            onChange={(e) =>
                              HandleSalePriceChange4(e.target.value)
                            }
                          />
                          {formik.touched.expectedCost && formik.errors.expectedCost ? (
                            <div className="error-msg">
                              {formik.errors.expectedCost}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("پاسخ مورد انتظار")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <SelectBox
                            dataSource={measurementUnits}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) =>
                              formik.setFieldValue("expectedAnswer", e.value)
                            }
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            itemRender={null}
                            placeholder=""
                            name="expectedAnswer"
                            id="expectedAnswer"
                            searchEnabled
                          />

                          {formik.touched.expectedAnswer &&
                          formik.errors.expectedAnswer &&
                          !formik.values.expectedAnswer ? (
                            <div className="error-msg">
                              {formik.errors.expectedAnswer}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("هدف")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <textarea
                            className="form-input"
                            type="text"
                            id="target"
                            name="target"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.target}
                          />
                          {formik.touched.target && formik.errors.target ? (
                            <div className="error-msg">
                              {formik.errors.target}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
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
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.desc}
                          />
                          {formik.touched.desc &&
                          formik.errors.desc ? (
                            <div className="error-msg">
                              {formik.errors.desc}
                            </div>
                          ) : null}
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
              onClick={id != null ? updateCampaign : formik.handleSubmit}
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

export default Campane;
