import React, { useState, useEffect, useRef } from "react";
import { FieldArray, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import DatePicker from "react-multi-date-picker";
import CancelIcon from "@mui/icons-material/Cancel";
import CircularProgress from "@mui/material/CircularProgress";
import CountryTreeView from "../../../components/CountryComponent/CountryTreeView";
import Map from "../../../components/map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountNameModal from "../../../components/Modals/Mahan_AccountNameModal/AccountNameModal";
import UserNameModal from "../../../components/Modals/Mahan_UserNameModal/UserNameModal";
import CampaignModal from "../../../components/Modals/Mahan_CampaignModal/CampaignModal";
import ManagerNameModal from "../../../components/Modals/Mahan_ManagerNameModal/ManagerNameModal";
import { julianIntToDate } from "../../../utils/dateConvert";
import { SelectBox } from "devextreme-react";
import { useSearchParams } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import useCountryList from "../../../customHook/useCountryList";
import {
  renderCalendarSwitch,
  renderCalendarLocaleSwitch,
} from "../../../utils/calenderLang";
import { history } from "../../../utils/history";
import axios from "axios";
import DateObject from "react-date-object";
import { getLangDate } from "../../../utils/getLangDate";

const Factor = [];

export const CreatePersons = () => {
  const appConfig = window.globalConfig;
  const { t, i18n } = useTranslation();
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const [result, setResult] = useState();
  const [personDetail, setPersonDetail] = useState([]);
  console.log("personDetail", personDetail);
  const [accountData, setAccountsData] = useState([]);
  const emptyContact = {
    prefixNamePhoneNumber: "",
    phoneNumber: "",
    prefixNumberPhoneNumber: "",
    internal: "",
    mainPhone: false,
    fax: false,
    mobile: false,
  };
  const emptyContactFieldsTouch = {
    prefixNamePhoneNumber: false,
    phoneNumber: false,
    prefixNumberPhoneNumber: false,
    internal: false,
    mainPhone: false,
    fax: false,
    mobile: false,
  };
  const [contactFieldsTouch, setContactFieldsTouch] = useState([
    emptyContactFieldsTouch,
  ]);
  const emptyEmailsField = { emailAddress: "" };
  const emptyEmailsFieldTouch = { emailAddress: false };
  const [emailsFieldTouch, setEmailsFieldTouch] = useState([
    emptyEmailsFieldTouch,
  ]);

  const countryList = useCountryList();

  const theme = useTheme();
  const [factor, setFactor] = React.useState(Factor);

  const phoneRegMatch = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  const urlRegMatch =
    /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
  const nationalIdRegMatch = /^[0-9]{10}$/;
  const linkedInRegMatch =
    /(ftp|http|https):\/\/?((www|\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  const instagramRegMatch =
    /^(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/;
  const facebookRegMatch =
    /^(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/;
  const twitterRegMatch =
    /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
  const iranPostalCodeRegMatch =
    /^\b(?!(\d)\1{ Yup.string().3})[13-9]{4}[1346-9][013-9]{5}\b/;

  const callComponent = () => {
    history.navigate(`/accounts/people/PersonManagement`);
  };
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      accountID: 0,
      nickName: "",
      personName: "",
      surname: "",
      segment: "",
      accountName: "",
      clueSource: "",
      section: "",
      username: "",
      desc: "",
      campaign: "",
      managerName: "",
      secretaryName: "",
      birthDate: new DateObject(),
      nationalCode: "",
      GroupingOne: "",
      GroupingTwo: "",
      name: "",
      nameOfUser: "",
      portalUser: "",
      userEmail: "",
      status: "",
      geographyLoc: "",
      otherGeographyLoc: "",
      country: "",
      city: "",
      state: "",
      latitude: "",
      longitude: "",
      address: "",
      postalCode: "",
      otherCountry: "",
      otherCity: "",
      otherState: "",
      otherLatitude: "",
      otherLongitude: "",
      otherAddress: "",
      otherPostalCode: "",
      linkedIn: "",
      instagram: "",
      blog: "",
      facebook: "",
      twitter: "",
      website: "",
      contactFields: [{ ...emptyContact, mainPhone: true }],
      email: [emptyEmailsField],
    },
    validationSchema: Yup.object({
      nickName: Yup.string()
        .when("type", (type) => {
          return Yup.string().required("لقب الزامیست");
        }),
      personName: Yup.string()
        .max(20, "نام باید شامل 20 حرف یا کمتر باشد")
        .when("type", (type) => {
          return Yup.string().required("نام الزامیست");
        }),
      surname: Yup.string()
        .max(20, "نام خانوادگی باید شامل 20 حرف یا کمتر باشد")
        .when("type", (type) => {
          return Yup.string().required("نام خانوادگی الزامیست");
        }),
      postalCode: Yup.string()
        .length(10, "کد پستی باید 10 رقم باشد")
        .matches(iranPostalCodeRegMatch, "کد پستی صحیح نمیباشد"),
      otherPostalCode: Yup.string()
        .length(10, "کد پستی باید 10 رقم باشد")
        .matches(iranPostalCodeRegMatch, "کد پستی صحیح نمیباشد"),
      accountName: Yup.string().max(15, "نام باید شامل 15 حرف یا کمتر باشد"),
      contactFields: Yup.array(
        Yup.object({
          phoneNumber: Yup.string().matches(
            phoneRegMatch,
            "شماره تلفن صحیح نمیباشد"
          )
            .required("شماره تلفن الزامیست"),
          internal: Yup.number().typeError("تنها عدد مجاز است"),
        })
      ),
      birthDate: Yup.date().required(() => {
        return "تاریخ الزامیست";
      }),
      geographyLoc: Yup.string().required(() => {
        return "منطقه جغرافيایی اصلی الزامیست";
      }),
      clueSource: Yup.string().required(() => {
        return "منبع سرنخ الزامیست";
      }),
      email: Yup.array(
        Yup.object({
          emailAddress: Yup.string().email("ایمیل صحیح نمیباشد"),
        })
      ),
      userEmail: Yup.string().email("ایمیل صحیح نمیباشد"),

      segment: Yup.string(),
      desc: Yup.string(),
      nationalCode: Yup.string().matches(
        nationalIdRegMatch,
        "کد ملی صحیح نمیباشد"
      ),
      website: Yup.string().matches(urlRegMatch, "وب سایت صحیح نمیباشد"),
      linkedIn: Yup.string().matches(
        linkedInRegMatch,
        "آدرس لینکدین صحیح نمیباشد"
      ),
      instagram: Yup.string().matches(
        instagramRegMatch,
        "آدرس اینستاگرام صحیح نمیباشد"
      ),
      blog: Yup.string().matches(urlRegMatch, "آدرس بلاگ صحیح نمیباشد"),
      facebook: Yup.string().matches(
        facebookRegMatch,
        "آدرس فیسبوک صحیح نمیباشد"
      ),
      twitter: Yup.string().matches(
        twitterRegMatch,
        "آدرس توییتر صحیح نمیباشد"
      ),
    }),

    onSubmit: (values) => {
      var contectField = JSON.stringify(values.contactFields);
      var email = JSON.stringify(values.email);
      values.contactFields = contectField;
      values.email = email;
      axios
        .post(`${appConfig.BaseURL}/api/persons`, values)
        .then((res) => setResult(res.data.data));
      factorSub();
      callComponent();
    },
  });
  console.log('contactFieldsTouch', contactFieldsTouch)
  const updatePerson = (values) => {
    if (values != null) {
      formik.values.contactFields = JSON.stringify(formik.values.contactFields);
      formik.values.email = JSON.stringify(formik.values.email);
      console.log(values);
      let isSuccess = false;
      axios
        .put(`${appConfig.BaseURL}/api/Persons/Update/${id}`, formik.values)
        .then((res) => {
          setResult(res.data);
          isSuccess = true;
        })
        .finally(() => {
          if ((isSuccess = true)) {
            history.navigate(`/accounts/people/PersonManagement`);
          }
        });
    }
  };

  useEffect(() => {
    axios
      .get(`${appConfig.BaseURL}/api/account`)
      .then((res) => setAccountsData(res.data.data));
  }, []);

  const factorSub = () => {
    swal({
      title: t("فاکتور با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };

  const getData = (val) => {
    formik.setFieldValue("accountID", val);
  };
  function clearAccountNameField() {
    formik.setFieldValue("accountID", "");
  }

  function getUserData(val) {
    console.log(val);
    formik.setFieldValue("username", val.username);
  }
  function clearUserNameField() {
    formik.setFieldValue("username", "");
  }

  function getCampaignData(val) {
    formik.setFieldValue("campaign", val.campaign);
  }
  function clearCampaignField() {
    formik.setFieldValue("campaign", "");
  }

  function getManagerNameData(val) {
    formik.setFieldValue("managerName", val.managerName);
  }
  function clearManagerNameField() {
    formik.setFieldValue("managerName", "");
  }

  const copy = () => {
    formik.setFieldValue("otherGeographyLoc", formik.values.geographyLoc);
    formik.setFieldValue("otherCountry", formik.values.country);
    formik.setFieldValue("otherState", formik.values.state);
    formik.setFieldValue("otherCity", formik.values.city);
    formik.setFieldValue("otherPostalCode", formik.values.postalCode);
    formik.setFieldValue("otherAddress", formik.values.address);
    formik.setFieldValue("otherLatitude", formik.values.latitude);
    formik.setFieldValue("otherLongitude", formik.values.longitude);
  };
  //////////////////////Address Funcs/////////////////////////////////////////
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState();
  const [addressLoading, setAddressLoading] = useState(false);
  const [location1, setLocation1] = useState({});
  const [address1, setAddress1] = useState();
  const [addressLoading1, setAddressLoading1] = useState(false);

  const dateRef = useRef();

  function getInvoiceAddress(val) {
    formik.setFieldValue("country", val[0]);
    formik.setFieldValue("state", val[1]);
    formik.setFieldValue("city", val[2]);
    formik.setFieldValue("geographyLoc", `${val[0]}، ${val[1]}، ${val[2]}`);
  }
  function clearInvoiceAddress() {
    formik.setFieldValue("country", "");
    formik.setFieldValue("state", "");
    formik.setFieldValue("city", "");
    formik.setFieldValue("geographyLoc", "");
  }
  function getAddresstwo(val) {
    formik.setFieldValue("otherCountry", val[0]);
    formik.setFieldValue("otherState", val[1]);
    formik.setFieldValue("otherCity", val[2]);
    formik.setFieldValue(
      "otherGeographyLoc",
      `${val[0]}، ${val[1]}، ${val[2]}`
    );
  }
  function clearAddresstwo() {
    formik.setFieldValue("otherCountry", "");
    formik.setFieldValue("otherState", "");
    formik.setFieldValue("otherCity", "");
    formik.setFieldValue("otherGeographyLoc", "");
  }
  function getMapData(address, location) {
    setLocation(location);
    setAddress(address);
  }
  function getMapData1(address, location) {
    setLocation1(location);
    setAddress1(address);
  }
  useEffect(() => {
    if (Object.keys(location).length) {
      formik.setFieldValue("latitude", `${location?.lat}`);
      formik.setFieldValue("longitude", `${location?.lng}`);
    }
  }, [location]);
  useEffect(() => {
    if (Object.keys(location1).length) {
      formik.setFieldValue("otherLatitude", `${location1?.lat}`);
      formik.setFieldValue("otherLongitude", `${location1?.lng}`);
    }
  }, [location1]);
  useEffect(() => {
    address && formik.setFieldValue("address", address);
  }, [address]);
  useEffect(() => {
    address1 && formik.setFieldValue("otherAddress", address1);
  }, [address1]);

  const [panel1, setPanel1] = React.useState(true);
  const [panel3, setPanel3] = React.useState(true);
  const [panel4, setPanel4] = React.useState(true);
  const [panel5, setPanel5] = React.useState(true);
  const [panel6, setPanel6] = React.useState(true);
  const handlePanel1 = () => (event, newExpanded) => {
    setPanel1(newExpanded);
  };
  const handlePanel3 = () => (event, newExpanded) => {
    setPanel3(newExpanded);
  };
  const handlePanel4 = () => (event, newExpanded) => {
    setPanel4(newExpanded);
  };
  const handlePanel5 = () => (event, newExpanded) => {
    setPanel5(newExpanded);
  };
  const handlePanel6 = () => (event, newExpanded) => {
    setPanel6(newExpanded);
  };

  useEffect(() => {
    if (formik.isSubmitting) {
      let condition1 =
        !!(formik.touched.personName && formik.errors.personName) ||
        !!(formik.touched.surname && formik.errors.surname) ||
        !!(formik.touched.nickName && formik.errors.nickName) ||
        !!(formik.touched.clueSource && formik.errors.clueSource) ||
        !!(formik.touched.phoneNumber && formik.errors.phoneNumber) ||
        !!(formik.touched.accountName && formik.errors.accountName) ||
        !!(formik.touched.contactFields && formik.errors.contactFields) ||
        !!(formik.touched.email && formik.errors.email);
      let condition3 = !!(
        (formik.touched.birthDate && formik.errors.birthDate) ||
        (formik.touched.nationalCode && formik.errors.nationalCode)
      );
      let condition4 = !!(formik.touched.userEmail && formik.errors.userEmail);
      let condition5 = !!(
        (formik.touched.geographyLoc && formik.errors.geographyLoc) ||
        (formik.touched.postalCode && formik.errors.postalCode) ||
        (formik.touched.otherPostalCode && formik.errors.otherPostalCode)
      );
      let condition6 = !!(
        (formik.touched.website && formik.errors.website) ||
        (formik.touched.linkedIn && formik.errors.linkedIn) ||
        (formik.touched.instagram && formik.errors.instagram) ||
        (formik.touched.blog && formik.errors.blog) ||
        (formik.touched.facebook && formik.errors.facebook) ||
        (formik.touched.twitter && formik.errors.twitter)
      );
      setPanel1(condition1 || panel1);
      setPanel3(condition3 || panel3);
      setPanel4(condition4 || panel4);
      setPanel5(condition5 || panel5);
      setPanel6(condition6 || panel6);
    }
  }, [formik]);

  useEffect(() => {
    if (id != null) {
      axios.get(`${appConfig.BaseURL}/api/persons/${id}`).then((res) => {
        setPersonDetail(res.data.data);
        formik.setFieldValue("nickName", res.data.data.nickName);
        formik.setFieldValue("personName", res.data.data.personName);
        formik.setFieldValue("surname", res.data.data.surname);
        formik.setFieldValue("segment", res.data.data.segment);
        formik.setFieldValue("website", res.data.data.website);
        formik.setFieldValue("accountName", res.data.data.accountName);
        formik.setFieldValue("accountID", res.data.data.accountID);
        formik.setFieldValue("clueSource", res.data.data.clueSource);
        formik.setFieldValue("section", res.data.data.section);
        formik.setFieldValue("username", res.data.data.username);
        formik.setFieldValue("desc", res.data.data.desc);
        formik.setFieldValue("campaign", res.data.data.campaign);
        formik.setFieldValue("managerName", res.data.data.managerName);
        formik.setFieldValue("secretaryName", res.data.data.secretaryName);
        formik.setFieldValue("birthDate", res.data.data.birthDate);
        formik.setFieldValue("nationalCode", res.data.data.nationalCode);
        formik.setFieldValue("GroupingOne", res.data.data.GroupingOne);
        formik.setFieldValue("GroupingTwo", res.data.data.GroupingTwo);
        formik.setFieldValue("geographyLoc", res.data.data.geographyLoc);
        formik.setFieldValue(
          "otherGeographyLoc",
          res.data.data.otherGeographyLoc
        );
        formik.setFieldValue("country", res.data.data.country);
        formik.setFieldValue("city", res.data.data.city);
        formik.setFieldValue("state", res.data.data.state);
        formik.setFieldValue("latitude", res.data.data.latitude);
        formik.setFieldValue("longitude", res.data.data.longitude);
        formik.setFieldValue("address", res.data.data.address);
        formik.setFieldValue("postalCode", res.data.data.postalCode);
        formik.setFieldValue("otherCountry", res.data.data.otherCountry);
        formik.setFieldValue("otherCity", res.data.data.otherCity);
        formik.setFieldValue("otherState", res.data.data.otherState);
        formik.setFieldValue("otherLatitude", res.data.data.otherLatitude);
        formik.setFieldValue("otherLongitude", res.data.data.otherLongitude);
        formik.setFieldValue("otherAddress", res.data.data.otherAddress);
        formik.setFieldValue("otherPostalCode", res.data.data.otherPostalCode);
        formik.setFieldValue("linkedIn", res.data.data.linkedIn);
        formik.setFieldValue("instagram", res.data.data.instagram);
        formik.setFieldValue("othercity", res.data.data.othercity);
        formik.setFieldValue("otherstate", res.data.data.otherstate);
        formik.setFieldValue("otherlatitude", res.data.data.otherlatitude);
        formik.setFieldValue("otherlongitude", res.data.data.otherlongitude);
        formik.setFieldValue("otheraddress", res.data.data.otheraddress);
        formik.setFieldValue("otherPostalCode", res.data.data.otherPostalCode);
        formik.setFieldValue("linkedIn", res.data.data.linkedIn);
        formik.setFieldValue("instagram", res.data.data.instagram);
        formik.setFieldValue("blog", res.data.data.blog);
        formik.setFieldValue("facebook", res.data.data.facebook);
      });
    }
  }, [id]);
  const nickName = [
    t("آقای"),
    t("خانم"),
    t("مهندس"),
    t("دکتر"),
    t("استاد"),
    t("آقای مهندس"),
    t("خانم مهندس"),
    t("آقای دکتر"),
    t("خانم دکتر"),
  ];
  const clueSource = [
    t("کنفرانس"),
    t("نمایشگاه"),
    t("معرفی پرسنل"),
    t("معرفی مشتریان"),
    t("معرفی دیگران"),
    t("وب"),
    t("بازاریابی حضوری"),
    t("بازاریابی ایمیلی"),
    t("بازاریابی تلفنی"),
    t("معرفی شرکای تجاری"),
    t("سایر"),
  ];
  const GroupingOne = [t("Category 1"), t("Category 2"), t("Category 3")];
  const GroupingTwo = [t("Category 1"), t("Category 2"), t("Category 3")];
  const portalUser = [t("کاربر پورتال")];
  const status = [t("فعال"), t("غیرفعال")];
  const prefixNamePhoneNumberArray = [
    t("دفتر"),
    t("همراه"),
    t("فکس"),
    t("کارخانه"),
    t("منزل"),
    t("واتس اپ"),
    t("سایر"),
  ];

  return (
    <>
      <div>
        {/*<h1 className='main-title' >*/}
        {/*    {t("ایجاد فرد")}*/}
        {/*</h1>*/}

        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Accordion expanded={panel1} onChange={handlePanel1()}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{t("اطلاعات فرد")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="form-design">
                  <div className="row ">
                    <div className="col-lg-12 col-12">
                      <div className="row">
                        <div className="content col-lg-4 col-md-6 col-xs-12">
                          <div className="title">
                            <span>{t("لقب")}<span className="star">*</span></span>
                          </div>
                          <div className="wrapper">
                            <div>
                              {" "}
                              {id != null && formik.values.nickName != "" && (
                                <SelectBox
                                  dataSource={nickName}
                                  rtlEnabled={
                                    i18n.dir() == "ltr" ? false : true
                                  }
                                  onValueChanged={(e) => {
                                    console.log("------e111", e);
                                    formik.setFieldValue("nickName", e.value);
                                  }}
                                  defaultValue={formik.values.nickName}
                                  className="selectBox"
                                  noDataText="اطلاعات یافت نشد"
                                  placeholder=""
                                  name="nickName"
                                  id="nickName"
                                  searchEnabled
                                  showClearButton
                                //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                                />
                              )}
                              {(!id ||
                                (id != null &&
                                  formik.values.nickName == "")) && (
                                  <SelectBox
                                    dataSource={nickName}
                                    rtlEnabled={
                                      i18n.dir() == "ltr" ? false : true
                                    }
                                    onValueChanged={(e) => {
                                      console.log("------e555555555555", e);
                                      formik.setFieldValue("nickName", e.value);
                                    }}
                                    defaultValue={formik.values.nickName}
                                    className="selectBox"
                                    noDataText="اطلاعات یافت نشد"
                                    placeholder=""
                                    name="nickName"
                                    id="nickName"
                                    searchEnabled
                                    showClearButton
                                  //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                                  />
                                )}
                              {formik.touched.nickName &&
                                formik.errors.nickName &&
                                !formik.values.nickName ? (
                                <div className="error-msg">
                                  {t(formik.errors.nickName)}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="content col-lg-4 col-md-6 col-xs-12">
                          <div className="title">
                            <span>
                              {t("نام")} <span className="star">*</span>
                            </span>
                          </div>
                          <div className="wrapper">
                            <div>
                              <input
                                className="form-input"
                                type="text"
                                id="personName"
                                name="personName"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.personName}
                              />
                              {formik.touched.personName &&
                                formik.errors.personName ? (
                                <div className="error-msg">
                                  {t(formik.errors.personName)}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="content col-lg-4 col-md-6 col-xs-12">
                          <div className="title">
                            <span>
                              {t("نام خانوادگی")}{" "}
                              <span className="star">*</span>
                            </span>
                          </div>
                          <div className="wrapper">
                            <div>
                              <input
                                className="form-input"
                                type="text"
                                id="surname"
                                name="surname"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.surname}
                              />
                              {formik.touched.surname &&
                                formik.errors.surname ? (
                                <div className="error-msg">
                                  {t(formik.errors.surname)}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="content col-lg-4 col-md-6 col-xs-12">
                          <div className="title">
                            <span>{t("سمت")}</span>
                          </div>
                          <div className="wrapper">
                            <div>
                              <input
                                className="form-input"
                                type="text"
                                id="segment"
                                name="segment"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.segment}
                              />
                              {formik.touched.segment &&
                                formik.errors.segment ? (
                                <div className="error-msg">
                                  {t(formik.errors.segment)}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="content col-lg-4 col-md-6 col-xs-12">
                          <div className="title">
                            <span>{t("نام حساب (اصلی)")}</span>
                          </div>
                          <div className="wrapper">
                              {id != null && formik.values.accountID != "" && (
                          <SelectBox
                            dataSource={accountData}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("accountID", e.value);
                            }}
                            defaultValue={formik.values.accountID}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            displayExpr={"name"}
                            valueExpr={"accountID"}
                            placeholder=""
                            name="accountID"
                            id="accountID"
                            searchEnabled
                            showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                          />
                        )}
                        {(!id || (id != null && formik.values.accountID == "")) && (
                          <SelectBox
                            dataSource={accountData}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("accountID", e.value.accountID);
                            }}
                            defaultValue={formik.values.accountID}
                            className="selectBox"
                            displayExpr={"name"}
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="accountID"
                            id="accountID"
                            searchEnabled
                            showClearButton
                          />
                        )}
                              {formik.touched.accountName &&
                                formik.errors.accountName ? (
                                <div className="error-msg">
                                  {t(formik.errors.accountName)}
                                </div>
                              ) : null}
                            </div>
                        </div>
                        <div className="content col-lg-4 col-md-6 col-xs-12">
                          <div className="title">
                            <span>{t("منبع سرنخ")}<span className="star">*</span></span>
                          </div>
                          <div className="wrapper">
                            <div>
                              <SelectBox
                                dataSource={clueSource}
                                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                onValueChanged={(e) =>
                                  formik.setFieldValue("clueSource", e.value)
                                }
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                itemRender={null}
                                placeholder=""
                                name="clueSource"
                                id="clueSource"
                                searchEnabled
                                showClearButton
                              //defaultValue={clueSource[0]}       نشان دادن مقدار اولیه
                              />
                              {formik.touched.clueSource &&
                                formik.errors.clueSource &&
                                !formik.values.clueSource ? (
                                <div className="error-msg">
                                  {t(formik.errors.clueSource)}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="content col-lg-12 col-md-12 col-xs-12">
                          <FieldArray
                            name="contactFields"
                            render={({ push, remove }) => (
                              <React.Fragment>
                                <div className="row">
                                  <div className="content col-lg-12 col-md-12 col-xs-12">
                                    <Button
                                      className="AddRow"
                                      disabled={
                                        formik.values.contactFields.length >= 5
                                      }
                                      onClick={() => {
                                        formik.values.contactFields.length <
                                          5 && push(emptyContact);

                                        setContactFieldsTouch((oldArray) => [
                                          ...oldArray,
                                          emptyContactFieldsTouch,
                                        ]);
                                      }}
                                    >
                                      {t("افزودن شماره تماس")}
                                    </Button>
                                  </div>
                                  {formik?.values?.contactFields?.map(
                                    (contactFields, index) => (
                                      <div className="row mb-0" key={index}>
                                        <div className="content col-lg-2 col-md-6 col-xs-12">
                                          <div className="title">
                                            <span>{t("تلفن")}</span>
                                          </div>
                                          <div className="wrapper">
                                            <div>
                                              <SelectBox
                                                dataSource={
                                                  prefixNamePhoneNumberArray
                                                }
                                                rtlEnabled={
                                                  i18n.dir() == "ltr"
                                                    ? false
                                                    : true
                                                }
                                                onValueChanged={(e) => {
                                                  formik.setFieldValue(
                                                    `contactFields[${index}].prefixNamePhoneNumber`,
                                                    e.value
                                                  );
                                                  switch (e.value) {
                                                    case t("فکس"):
                                                      formik.setFieldValue(
                                                        `contactFields[${index}].fax`,
                                                        true
                                                      );
                                                      formik.setFieldValue(
                                                        `contactFields[${index}].mobile`,
                                                        false
                                                      );
                                                      break;
                                                    case t("همراه"):
                                                      formik.setFieldValue(
                                                        `contactFields[${index}].mobile`,
                                                        true
                                                      );
                                                      formik.setFieldValue(
                                                        `contactFields[${index}].fax`,
                                                        false
                                                      );
                                                      break;
                                                  }
                                                }}
                                                className="selectBox"
                                                placeholder=""
                                                noDataText={t(
                                                  "اطلاعات یافت نشد"
                                                )}
                                                onBlur={() => {
                                                  let temp =
                                                    contactFieldsTouch.map(
                                                      (item, i) =>
                                                        i === index
                                                          ? {
                                                            ...item,
                                                            prefixNamePhoneNumber: true,
                                                          }
                                                          : item
                                                    );
                                                  setContactFieldsTouch(temp);
                                                }}
                                                itemRender={null}
                                                name={`contactFields.${index}.prefixNamePhoneNumber`}
                                                id="prefixNamePhoneNumber"
                                                value={
                                                  formik.values.contactFields[
                                                    index
                                                  ].prefixNamePhoneNumber
                                                }
                                                searchEnabled
                                                showClearButton
                                              />
                                              {Array.isArray(
                                                formik.errors.contactFields
                                              ) &&
                                                Array.isArray(contactFieldsTouch)
                                                ? formik.errors.contactFields[
                                                  index
                                                ]?.prefixNamePhoneNumber &&
                                                contactFieldsTouch[index]
                                                  ?.prefixNamePhoneNumber && (
                                                  <div className="error-msg">
                                                    {t(
                                                      formik.errors
                                                        .contactFields[index]
                                                        ?.prefixNamePhoneNumber
                                                    )}
                                                  </div>
                                                )
                                                : ""}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="content col-lg-3 col-md-6 col-xs-12">
                                          <div className="title">
                                            <span>{t("شماره تلفن")}<span className="star">*</span></span>
                                          </div>
                                          <div className="wrapper">
                                            <div className="divModal">
                                              <input
                                                className="form-input"
                                                type="text"
                                                id="phoneNumber"
                                                name={`contactFields[${index}].phoneNumber`}
                                                style={{ width: "100%" }}
                                                onChange={formik.handleChange}
                                                onBlur={() => {
                                                  let temp =
                                                    contactFieldsTouch.map(
                                                      (item, i) =>
                                                        i === index
                                                          ? {
                                                            ...item,
                                                            phoneNumber: true,
                                                          }
                                                          : item
                                                    );
                                                  setContactFieldsTouch(temp);
                                                }}
                                                value={
                                                  formik.values.contactFields[
                                                    index
                                                  ].phoneNumber
                                                }
                                              />
                                              {Array.isArray(
                                                formik.errors.contactFields
                                              ) &&
                                                Array.isArray(contactFieldsTouch)
                                                ? formik.errors.contactFields[
                                                  index
                                                ]?.phoneNumber &&
                                                contactFieldsTouch[index]
                                                  ?.phoneNumber && (
                                                  <div className="error-msg">
                                                    {t(
                                                      formik.errors
                                                        .contactFields[
                                                        index
                                                      ]?.phoneNumber
                                                    )}
                                                  </div>
                                                )
                                                : ""}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="content col-lg-2 col-md-6 col-xs-12">
                                          <div className="title">
                                            <span>{t("پیش شماره")}</span>
                                          </div>
                                          <div className="wrapper">
                                            <div>
                                              <SelectBox
                                                dataSource={countryList}
                                                displayExpr="Name"
                                                valueExpr="value"
                                                onValueChanged={(e) =>
                                                  e?.value &&
                                                  formik.setFieldValue(
                                                    `contactFields.[${index}].prefixNumberPhoneNumber`,
                                                    e?.value
                                                  )
                                                }
                                                className="selectBox"
                                                noDataText="اطلاعات یافت نشد"
                                                onBlur={() => {
                                                  let temp =
                                                    contactFieldsTouch.map(
                                                      (item, i) =>
                                                        i === index
                                                          ? {
                                                            ...item,
                                                            prefixNumberPhoneNumber: true,
                                                          }
                                                          : item
                                                    );
                                                  setContactFieldsTouch(temp);
                                                }}
                                                placeholder=""
                                                name={`contactFields.${index}.prefixNumberPhoneNumber`}
                                                id={`contactFields.${index}.prefixNumberPhoneNumber`}
                                                rtlEnabled={
                                                  i18n.dir() == "ltr"
                                                    ? false
                                                    : true
                                                }
                                                searchEnabled
                                              />
                                              {Array.isArray(
                                                formik.errors.contactFields
                                              ) &&
                                                Array.isArray(contactFieldsTouch)
                                                ? formik.errors.contactFields[
                                                  index
                                                ]?.prefixNumberPhoneNumber &&
                                                contactFieldsTouch[index]
                                                  ?.prefixNumberPhoneNumber && (
                                                  <div className="error-msg">
                                                    {t(
                                                      formik.errors
                                                        .contactFields[index]
                                                        ?.prefixNumberPhoneNumber
                                                    )}
                                                  </div>
                                                )
                                                : ""}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="content col-lg-1 col-md-6 col-xs-12">
                                          <div className="title">
                                            <span>{t("داخلی")}</span>
                                          </div>
                                          <div className="wrapper">
                                            <div className="divModal">
                                              <input
                                                className="form-input"
                                                type="text"
                                                id="internal"
                                                name={`contactFields[${index}].internal`}
                                                style={{ width: "100%" }}
                                                onChange={formik.handleChange}
                                                onBlur={() => {
                                                  let temp =
                                                    contactFieldsTouch.map(
                                                      (item, i) =>
                                                        i === index
                                                          ? {
                                                            ...item,
                                                            internal: true,
                                                          }
                                                          : item
                                                    );
                                                  setContactFieldsTouch(temp);
                                                }}
                                                value={
                                                  formik.values.contactFields[
                                                    index
                                                  ].internal
                                                }
                                              />
                                              {Array.isArray(
                                                formik.errors.contactFields
                                              ) &&
                                                Array.isArray(contactFieldsTouch)
                                                ? formik.errors.contactFields[
                                                  index
                                                ]?.internal &&
                                                contactFieldsTouch[index]
                                                  ?.internal && (
                                                  <div className="error-msg">
                                                    <div className="error-msg">
                                                      {t(
                                                        formik.errors
                                                          .contactFields[
                                                          index
                                                        ]?.internal
                                                      )}
                                                    </div>
                                                  </div>
                                                )
                                                : ""}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="content col-lg-1 col-md-2 col-3 text-center">
                                          <div className="title">
                                            <span>{t("اصلی")}</span>
                                          </div>
                                          <div className="wrapper">
                                            <div className="checkbox-label justify-content-center">
                                              <input
                                                className="form-input"
                                                type="CheckBox"
                                                id="mainPhone"
                                                name={`contactFields[${index}].mainPhone`}
                                                checked={
                                                  formik.values.contactFields[
                                                    index
                                                  ].mainPhone
                                                }
                                                onChange={(e) => {
                                                  if (e.target.checked) {
                                                    for (
                                                      let i = 0;
                                                      i <
                                                      formik.values
                                                        .contactFields.length;
                                                      i++
                                                    ) {
                                                      formik.setFieldValue(
                                                        `contactFields[${i}].mainPhone`,
                                                        false
                                                      );
                                                    }
                                                    formik.setFieldValue(
                                                      `contactFields[${index}].mainPhone`,
                                                      true
                                                    );
                                                  } else {
                                                    formik.setFieldValue(
                                                      `contactFields[${index}].mainPhone`,
                                                      false
                                                    );
                                                  }
                                                }}
                                                onBlur={() => {
                                                  let temp =
                                                    contactFieldsTouch.map(
                                                      (item, i) =>
                                                        i === index
                                                          ? {
                                                            ...item,
                                                            mainPhone: true,
                                                          }
                                                          : item
                                                    );
                                                  setContactFieldsTouch(temp);
                                                }}
                                                value={
                                                  formik.values.contactFields[
                                                    index
                                                  ].mainPhone
                                                }
                                              />
                                              {Array.isArray(
                                                formik.errors.contactFields
                                              ) &&
                                                Array.isArray(contactFieldsTouch)
                                                ? formik.errors.contactFields[
                                                  index
                                                ]?.mainPhone &&
                                                contactFieldsTouch[index]
                                                  ?.mainPhone && (
                                                  <div className="error-msg">
                                                    {t(
                                                      formik.errors
                                                        .contactFields[index]
                                                        ?.mainPhone
                                                    )}
                                                  </div>
                                                )
                                                : ""}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="content col-lg-1 col-md-2 col-3 text-center">
                                          <div className="title">
                                            <span>{t("فکس")}</span>
                                          </div>
                                          <div className="wrapper">
                                            <div className="checkbox-label justify-content-center">
                                              <input
                                                className="form-input"
                                                type="CheckBox"
                                                id="fax"
                                                name={`contactFields[${index}].fax`}
                                                checked={
                                                  formik.values.contactFields[
                                                    index
                                                  ].fax
                                                }
                                                onChange={formik.handleChange}
                                                onBlur={() => {
                                                  let temp =
                                                    contactFieldsTouch.map(
                                                      (item, i) =>
                                                        i === index
                                                          ? {
                                                            ...item,
                                                            fax: true,
                                                          }
                                                          : item
                                                    );
                                                  setContactFieldsTouch(temp);
                                                }}
                                                value={
                                                  formik.values.contactFields[
                                                    index
                                                  ].fax
                                                }
                                              />
                                              {Array.isArray(
                                                formik.errors.contactFields
                                              ) &&
                                                Array.isArray(contactFieldsTouch)
                                                ? formik.errors.contactFields[
                                                  index
                                                ]?.fax &&
                                                contactFieldsTouch[index]
                                                  ?.fax && (
                                                  <div className="error-msg">
                                                    {t(
                                                      formik.errors
                                                        .contactFields[index]
                                                        ?.fax
                                                    )}
                                                  </div>
                                                )
                                                : ""}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="content col-lg-1 col-md-2 col-3 text-center">
                                          <div className="title">
                                            <span>{t("همراه")}</span>
                                          </div>
                                          <div className="wrapper">
                                            <div className="checkbox-label justify-content-center">
                                              <input
                                                className="form-input"
                                                type="CheckBox"
                                                id="mobile"
                                                name={`contactFields[${index}].mobile`}
                                                checked={
                                                  formik.values.contactFields[
                                                    index
                                                  ].mobile
                                                }
                                                onChange={formik.handleChange}
                                                onBlur={() => {
                                                  let temp =
                                                    contactFieldsTouch.map(
                                                      (item, i) =>
                                                        i === index
                                                          ? {
                                                            ...item,
                                                            internal: true,
                                                          }
                                                          : item
                                                    );
                                                  setContactFieldsTouch(temp);
                                                }}
                                                value={
                                                  formik.values.contactFields[
                                                    index
                                                  ].mobile
                                                }
                                              />
                                              {Array.isArray(
                                                formik.errors.contactFields
                                              ) &&
                                                Array.isArray(contactFieldsTouch)
                                                ? formik.errors.contactFields[
                                                  index
                                                ]?.mobile &&
                                                contactFieldsTouch[index]
                                                  ?.mobile && (
                                                  <div className="error-msg">
                                                    {t(
                                                      formik.errors
                                                        .contactFields[index]
                                                        ?.mobile
                                                    )}
                                                  </div>
                                                )
                                                : ""}
                                            </div>
                                          </div>
                                        </div>
                                        <div className="content col-lg-1 col-md-3 col-3 ">
                                          <div className="title">
                                            <span>‌‌</span>
                                          </div>
                                          {index != 0 ? (
                                            <button
                                              type="button"
                                              onClick={() => {
                                                remove(index);
                                                let temp =
                                                  contactFieldsTouch.filter(
                                                    (_, i) => i !== index
                                                  );
                                                setContactFieldsTouch(temp);
                                              }}
                                              className="remove-btn"
                                            >
                                              <DeleteIcon fontSize="medium" />
                                            </button>
                                          ) : null}
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
                          <FieldArray
                            name="email"
                            render={({ push, remove }) => (
                              <React.Fragment>
                                <div className="row align-items-center mb-0">
                                  <div className="content col-lg-6 col-md-12 col-xs-12">
                                    <Button
                                      className="AddRow"
                                      onClick={() => {
                                        formik.values.email.length < 5 &&
                                          push(emptyEmailsField);

                                        setEmailsFieldTouch((oldArray) => [
                                          ...oldArray,
                                          emptyEmailsField,
                                        ]);
                                      }}
                                      disabled={formik.values.email.length >= 5}
                                    >
                                      {t("افزودن ایمیل")}
                                    </Button>
                                  </div>
                                </div>
                                {formik?.values?.email?.map((email, index) => (
                                  <div
                                    className="row mb-0"
                                    key={index}
                                    style={{ display: "flex" }}
                                  >
                                    <div className="content col-lg-11 col-md-6 col-11">
                                      <div className="title">
                                        <span>{t("آدرس ایمیل")}</span>
                                      </div>
                                      <div className="wrapper">
                                        <div className="divModal">
                                          <input
                                            className="form-input"
                                            type="email"
                                            id="emailAddress"
                                            name={`email[${index}].emailAddress`}
                                            style={{ width: "100%" }}
                                            onChange={formik.handleChange}
                                            onBlur={() => {
                                              let temp = emailsFieldTouch.map(
                                                (item, i) =>
                                                  i === index
                                                    ? {
                                                      ...item,
                                                      emailAddress: true,
                                                    }
                                                    : item
                                              );
                                              setEmailsFieldTouch(temp);
                                            }}
                                            value={
                                              formik.values.email[index]
                                                .emailAddress
                                            }
                                          />
                                          {Array.isArray(formik.errors.email) &&
                                            Array.isArray(emailsFieldTouch)
                                            ? formik.errors.email[index]
                                              ?.emailAddress &&
                                            emailsFieldTouch[index]
                                              ?.emailAddress && (
                                              <div className="error-msg">
                                                {t(
                                                  formik.errors.email[index]
                                                    ?.emailAddress
                                                )}
                                              </div>
                                            )
                                            : ""}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="content col-lg-1 col-md-3 col-1">
                                      <div className="title">
                                        <span>‌‌</span>
                                      </div>
                                      {index != 0 ? (
                                        <button
                                          type="button"
                                          // onClick={() => remove(index)}

                                          onClick={() => {
                                            remove(index);
                                            let temp = emailsFieldTouch.filter(
                                              (_, i) => i !== index
                                            );
                                            setEmailsFieldTouch(temp);
                                          }}
                                          className="remove-btn"
                                        >
                                          <DeleteIcon fontSize="medium" />
                                        </button>
                                      ) : null}
                                    </div>
                                  </div>
                                ))}
                              </React.Fragment>
                            )}
                          ></FieldArray>
                        </div>
                        <div className="content col-lg-6 d-none d-lg-block"></div>

                        <div className="content col-lg-6 col-md-6 col-xs-12">
                          <div className="title">
                            <span>{t("بخش")}</span>
                          </div>
                          <div className="wrapper">
                            <div>
                              <input
                                className="form-input"
                                type="text"
                                id="section"
                                name="section"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.section}
                              />
                              {formik.touched.section &&
                                formik.errors.section ? (
                                <div sclassName="error-msg">
                                  {t(formik.errors.section)}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="content col-lg-6 col-md-6 col-xs-12">
                          <div className="title">
                            <span>{t("نام کاربر")}</span>
                          </div>
                          <div className="wrapper">
                            <div className="divModal position-relative">
                              <input
                                className={`form-input modal-input ${i18n.dir() === "ltr" ? "ltr" : ""
                                  }`}
                                type="text"
                                id="username"
                                name="username"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.username}
                                disabled
                              />
                              <div
                                className={`modal-action-button  ${i18n.dir() == "ltr" ? "action-ltr" : ""
                                  }`}
                              >
                                <UserNameModal
                                  className="modal"
                                  getData={getUserData}
                                />
                                <Button>
                                  {" "}
                                  <CancelIcon onClick={clearUserNameField} />
                                </Button>
                              </div>

                              {formik.touched.username &&
                                formik.errors.username ? (
                                <div className="error-msg">
                                  {t(formik.errors.username)}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>

            <div>
              <Accordion defaultExpanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1b-content"
                  id="panel1b-header"
                >
                  <Typography>{t("توضیحات")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="form-design">
                    <div className="row ">
                      <div className="col-lg-12 col-12">
                        <div className="row">
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("توضیحات")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <textarea
                                  rows="8"
                                  className="form-input"
                                  id="desc"
                                  name="desc"
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.desc}
                                />
                                {formik.touched.desc && formik.errors.desc ? (
                                  <div className="error-msg">
                                    {t(formik.errors.desc)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={panel3} onChange={handlePanel3()}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1b-content"
                  id="panel1b-header"
                >
                  <Typography>{t("اطلاعات بیشتر")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="form-design">
                    <div className="row ">
                      <div className="col-lg-12 col-12">
                        <div className="row">
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("کمپین")}</span>
                            </div>
                            <div className="wrapper">
                              <div className="divModal position-relative">
                                <input
                                  className={`form-input modal-input ${i18n.dir() === "ltr" ? "ltr" : ""
                                    }`}
                                  type="text"
                                  id="campaign"
                                  name="campaign"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.campaign}
                                  disabled
                                />
                                <div
                                  className={`modal-action-button  ${i18n.dir() == "ltr" ? "action-ltr" : ""
                                    }`}
                                >
                                  <CampaignModal
                                    className="modal"
                                    getData={getCampaignData}
                                  />
                                  <Button>
                                    {" "}
                                    <CancelIcon onClick={clearCampaignField} />
                                  </Button>
                                </div>

                                {formik.touched.campaign &&
                                  formik.errors.campaign ? (
                                  <div className="error-msg">
                                    {t(formik.errors.campaign)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("نام مدیر")}</span>
                            </div>
                            <div className="wrapper">
                              <div className="divModal position-relative">
                                <input
                                  className={`form-input modal-input ${i18n.dir() === "ltr" ? "ltr" : ""
                                    }`}
                                  type="text"
                                  id="managerName"
                                  name="managerName"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.managerName}
                                  disabled
                                />
                                <div
                                  className={`modal-action-button  ${i18n.dir() == "ltr" ? "action-ltr" : ""
                                    }`}
                                >
                                  <ManagerNameModal
                                    className="modal"
                                    getData={accountData}
                                  />
                                  <Button>
                                    {" "}
                                    <CancelIcon
                                      onClick={clearManagerNameField}
                                    />
                                  </Button>
                                </div>

                                {formik.touched.managerName &&
                                  formik.errors.managerName ? (
                                  <div className="error-msg">
                                    {t(formik.errors.managerName)}
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
                              <span>{t("نام منشی")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="secretaryName"
                                  name="secretaryName"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.secretaryName}
                                />
                                {formik.touched.secretaryName &&
                                  formik.errors.secretaryName ? (
                                  <div className="error-msg">
                                    {t(formik.errors.secretaryName)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>
                                {t("تاریخ تولد")}
                                <span className="star">*</span>
                              </span>
                            </div>
                            <div className="wrapper date-picker position-relative">
                              <DatePicker
                                name={"birthDate"}
                                id={"birthDate"}
                                ref={dateRef}
                                calendar={renderCalendarSwitch(i18n.language)}
                                locale={renderCalendarLocaleSwitch(
                                  i18n.language
                                )}
                                editable={false}
                                maxDate={new Date()}
                                onBlur={formik.handleBlur}
                                onChange={(val) => {
                                  formik.setFieldValue(
                                    "birthDate",
                                    julianIntToDate(val.toJulianDay())
                                  );
                                }}
                                value={getLangDate(i18n.language , formik.values.birthDate)}
                              />
                              <div
                                className={`modal-action-button  ${i18n.dir() === "ltr" ? "action-ltr" : ""
                                  }`}
                              >
                                <div className="d-flex align-items-center justify-content-center">
                                  <CalendarMonthIcon className="calanderButton modal" />
                                </div>
                              </div>
                            </div>
                            {formik.touched.birthDate &&
                              formik.errors.birthDate &&
                              !formik.values.birthDate ? (
                              <div className="error-msg">
                                {t(formik.errors.birthDate)}
                              </div>
                            ) : null}
                          </div>

                          <div
                            className="content col-lg-6 col-md-6 col-xs-12"
                            onFocus={() => dateRef?.current?.closeCalendar()}
                          >
                            <div className="title">
                              <span>{t("کد ملی")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="nationalCode"
                                  name="nationalCode"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.nationalCode}
                                />
                                {formik.touched.nationalCode &&
                                  formik.errors.nationalCode ? (
                                  <div className="error-msg">
                                    {t(formik.errors.nationalCode)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("گروه بندی 1")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <SelectBox
                                  dataSource={GroupingOne}
                                  rtlEnabled={
                                    i18n.dir() == "ltr" ? false : true
                                  }
                                  onValueChanged={(e) =>
                                    formik.setFieldValue("GroupingOne", e.value)
                                  }
                                  className="selectBox"
                                  noDataText="اطلاعات یافت نشد"
                                  itemRender={null}
                                  placeholder=""
                                  name="GroupingOne"
                                  id="GroupingOne"
                                  searchEnabled
                                  showClearButton
                                //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                                />
                                {formik.touched.GroupingOne &&
                                  formik.errors.GroupingOne &&
                                  !formik.values.GroupingOne ? (
                                  <div className="error-msg">
                                    {t(formik.errors.GroupingOne)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("گروه بندی 2")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <SelectBox
                                  dataSource={GroupingTwo}
                                  rtlEnabled={
                                    i18n.dir() == "ltr" ? false : true
                                  }
                                  onValueChanged={(e) =>
                                    formik.setFieldValue("GroupingTwo", e.value)
                                  }
                                  className="selectBox"
                                  noDataText="اطلاعات یافت نشد"
                                  itemRender={null}
                                  placeholder=""
                                  name="GroupingTwo"
                                  id="GroupingTwo"
                                  searchEnabled
                                  showClearButton
                                //defaultValue={GroupingTwo[0]}       نشان دادن مقدار اولیه
                                />
                                {formik.touched.GroupingTwo &&
                                  formik.errors.GroupingTwo &&
                                  !formik.values.GroupingTwo ? (
                                  <div className="error-msg">
                                    {t(formik.errors.GroupingTwo)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={panel4} onChange={handlePanel4()}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1b-content"
                  id="panel1b-header"
                >
                  <Typography>{t("ایجاد کاربر")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="form-design">
                    <div className="row ">
                      <div className="col-lg-12 col-12">
                        <div className="row">
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("نام")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="name"
                                  name="name"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.name}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                  <div className="error-msg">
                                    {t(formik.errors.name)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("نام کاربری")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="nameOfUser"
                                  name="nameOfUser"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.nameOfUser}
                                />
                                {formik.touched.nameOfUser &&
                                  formik.errors.nameOfUser ? (
                                  <div className="error-msg">
                                    {t(formik.errors.nameOfUser)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("کاربر پورتال")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <SelectBox
                                  dataSource={portalUser}
                                  rtlEnabled={
                                    i18n.dir() == "ltr" ? false : true
                                  }
                                  onValueChanged={(e) =>
                                    formik.setFieldValue("portalUser", e.value)
                                  }
                                  className="selectBox"
                                  noDataText="اطلاعات یافت نشد"
                                  itemRender={null}
                                  placeholder=""
                                  name="portalUser"
                                  id="portalUser"
                                  searchEnabled
                                  showClearButton
                                //defaultValue={portalUser[0]}       نشان دادن مقدار اولیه
                                />
                                {formik.touched.portalUser &&
                                  formik.errors.portalUser &&
                                  !formik.values.portalUser ? (
                                  <div className="error-msg">
                                    {t(formik.errors.portalUser)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("ایمیل")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="userEmail"
                                  name="userEmail"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.userEmail}
                                />
                                {formik.touched.userEmail &&
                                  formik.errors.userEmail ? (
                                  <div className="error-msg">
                                    {t(formik.errors.userEmail)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("وضعیت")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <SelectBox
                                  dataSource={status}
                                  rtlEnabled={
                                    i18n.dir() == "ltr" ? false : true
                                  }
                                  onValueChanged={(e) =>
                                    formik.setFieldValue("status", e.value)
                                  }
                                  className="selectBox"
                                  noDataText="اطلاعات یافت نشد"
                                  itemRender={null}
                                  placeholder=""
                                  name="status"
                                  id="status"
                                  searchEnabled
                                  showClearButton
                                //defaultValue={status[0]}       نشان دادن مقدار اولیه
                                />
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
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={panel5} onChange={handlePanel5()}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1b-content"
                  id="panel1b-header"
                >
                  <Typography>{t("آدرس")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="form-design">
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="row">
                          <div className="content col-12">
                            <div className="title">
                              <span> {t("منطقه جغرافيایی اصلی")}<span className="star">*</span></span>
                            </div>
                            <div className="wrapper">
                              <div
                                className="d-flex"
                                style={{ position: "relative" }}
                              >
                                <input
                                  rtlEnabled={
                                    i18n.dir() == "ltr" ? false : true
                                  }
                                  className={`form-input modal-input ${i18n.dir() === "ltr" ? "ltr" : ""
                                    }`}
                                  type="text"
                                  id="geographyLoc"
                                  name="geographyLoc"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.geographyLoc}
                                  disabled
                                />
                                <div
                                  className={`modal-action-button ${i18n.dir() == "ltr" ? "action-ltr" : ""
                                    }`}
                                >
                                  <CountryTreeView
                                    className="modal"
                                    getAddress={getInvoiceAddress}
                                  />
                                  <Button>
                                    <CancelIcon onClick={clearInvoiceAddress} />
                                  </Button>
                                </div>
                              </div>
                              {formik.touched.geographyLoc &&
                                  formik.errors.geographyLoc &&
                                  !formik.values.geographyLoc ? (
                                  <div className="error-msg">
                                    {t(formik.errors.geographyLoc)}
                                  </div>
                                ) : null}
                            </div>
                          </div>
                          <div className="content col-12">
                            <div className="title">
                              <span> {t("کشور")} </span>
                            </div>
                            <div className="wrapper">
                              <div
                                className="d-flex"
                                style={{ position: "relative" }}
                              >
                                <input
                                  className="form-input"
                                  type="text"
                                  id="country"
                                  name="country"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.country}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          <div className="content col-12">
                            <div className="title">
                              <span> {t("استان")} </span>
                            </div>
                            <div className="wrapper">
                              <div
                                className="d-flex"
                                style={{ position: "relative" }}
                              >
                                <input
                                  className="form-input"
                                  type="text"
                                  id="state"
                                  name="state"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.state}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          <div className="content col-12">
                            <div className="title">
                              <span> {t("شهر")} </span>
                            </div>
                            <div className="wrapper">
                              <div
                                className="d-flex"
                                style={{ position: "relative" }}
                              >
                                <input
                                  className="form-input"
                                  type="text"
                                  id="city"
                                  name="city"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.city}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          <div className="content col-12">
                            <div className="title">
                              <span>{t("کد پستی")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="postalCode"
                                  name="postalCode"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.postalCode}
                                />
                                {formik.touched.postalCode &&
                                  formik.errors.postalCode ? (
                                  <div className="error-msg">
                                    <div className="error-msg">
                                      {t(formik.errors.postalCode)}
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div
                            className="col-12"
                            style={{ position: "relative" }}
                          >
                            {addressLoading ? (
                              <div className="loading-sec">
                                <CircularProgress />
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="row align-items-center">
                              <div className="content col-12">
                                <div className="title">
                                  <span>{t("آدرس اصلی")}</span>
                                </div>
                                <div className="wrapper">
                                  <div>
                                    <input
                                      className="form-input"
                                      type="text"
                                      id="address"
                                      name="address"
                                      style={{ width: "100%" }}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.address}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="content col-sm-5 col-xs-12">
                                <div className="title">
                                  <span>{t("عرض جغرافیایی")}</span>
                                </div>
                                <div className="wrapper">
                                  <div>
                                    <input
                                      className="form-input"
                                      type="text"
                                      id="latitude"
                                      name="latitude"
                                      style={{ width: "100%" }}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.latitude}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="content col-sm-5 col-xs-12">
                                <div className="title">
                                  <span>{t("طول جغرافیایی")}</span>
                                </div>
                                <div className="wrapper">
                                  <div>
                                    <input
                                      className="form-input"
                                      type="text"
                                      id="longitude"
                                      name="longitude"
                                      style={{ width: "100%" }}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.longitude}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="content col-sm-2 col-xs-12 d-flex justify-content-end">
                                <div className="title">
                                  <span>‌</span>
                                </div>
                                <div className="wrapper">
                                  <Map
                                    defaultLoc={location}
                                    setAddressLoading={setAddressLoading}
                                    getMapData={getMapData}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row">
                          <div className="content col-12">
                            <div className="title">
                              <span> {t("منطقه جغرافيایی دیگر")} </span>
                            </div>
                            <div className="wrapper">
                              <div
                                className="d-flex"
                                style={{ position: "relative" }}
                              >
                                <input
                                  className={`form-input modal-input ${i18n.dir() === "ltr" ? "ltr" : ""
                                    }`}
                                  type="text"
                                  id="otherGeographyLoc"
                                  name="otherGeographyLoc"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.otherGeographyLoc}
                                  disabled
                                />
                                <div
                                  className={`modal-action-button ${i18n.dir() == "ltr" ? "action-ltr" : ""
                                    }`}
                                >
                                  <CountryTreeView
                                    className="modal"
                                    getAddress={getAddresstwo}
                                  />
                                  <Button>
                                    <CancelIcon onClick={clearAddresstwo} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="content col-12">
                            <div className="title">
                              <span> {t("کشور")} </span>
                            </div>
                            <div className="wrapper">
                              <div
                                className="d-flex"
                                style={{ position: "relative" }}
                              >
                                <input
                                  className="form-input"
                                  type="text"
                                  id="otherCountry"
                                  name="otherCountry"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.otherCountry}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          <div className="content col-12">
                            <div className="title">
                              <span> {t("استان")} </span>
                            </div>
                            <div className="wrapper">
                              <div
                                className="d-flex"
                                style={{ position: "relative" }}
                              >
                                <input
                                  className="form-input"
                                  type="text"
                                  id="otherState"
                                  name="otherState"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.otherState}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          <div className="content col-12">
                            <div className="title">
                              <span> {t("شهر")} </span>
                            </div>
                            <div className="wrapper">
                              <div
                                className="d-flex"
                                style={{ position: "relative" }}
                              >
                                <input
                                  className="form-input"
                                  type="text"
                                  id="otherCity"
                                  name="otherCity"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.otherCity}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                          <div className="content col-12">
                            <div className="title">
                              <span>{t("کد پستی")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="otherPostalCode"
                                  name="otherPostalCode"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.otherPostalCode}
                                />
                                {formik.touched.otherPostalCode &&
                                  formik.errors.otherPostalCode ? (
                                  <div className="error-msg">
                                    <div className="error-msg">
                                      {t(formik.errors.otherPostalCode)}
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div
                            className="col-12"
                            style={{ position: "relative" }}
                          >
                            {addressLoading1 ? (
                              <div className="loading-sec">
                                <CircularProgress />
                              </div>
                            ) : (
                              ""
                            )}
                            <div className="row align-items-center">
                              <div className="content col-12">
                                <div className="title">
                                  <span>{t("آدرس دیگر")}</span>
                                </div>
                                <div className="wrapper">
                                  <div>
                                    <input
                                      className="form-input"
                                      type="text"
                                      id="otherAddress"
                                      name="otherAddress"
                                      style={{ width: "100%" }}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.otherAddress}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="content col-sm-5 col-xs-12">
                                <div className="title">
                                  <span>{t("عرض جغرافیایی")}</span>
                                </div>
                                <div className="wrapper">
                                  <div>
                                    <input
                                      className="form-input"
                                      type="text"
                                      id="otherLatitude"
                                      name="otherLatitude"
                                      style={{ width: "100%" }}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.otherLatitude}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="content col-sm-5 col-xs-12">
                                <div className="title">
                                  <span>{t("طول جغرافیایی")}</span>
                                </div>
                                <div className="wrapper">
                                  <div>
                                    <input
                                      className="form-input"
                                      type="text"
                                      id="otherLongitude"
                                      name="otherLongitude"
                                      style={{ width: "100%" }}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.otherLongitude}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="content col-sm-2 col-xs-12 d-flex justify-content-end">
                                <div className="title">
                                  <span>‌</span>
                                </div>
                                <div className="wrapper">
                                  <Map
                                    defaultLoc={location1}
                                    setAddressLoading={setAddressLoading1}
                                    getMapData={getMapData1}
                                  />
                                </div>
                              </div>
                              <div className="col-12">
                                <Button
                                  variant="contained"
                                  className="copy-btn"
                                  onClick={copy}
                                >
                                  {t("کپی کردن از بخش اول")}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={panel6} onChange={handlePanel6()}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1b-content"
                  id="panel1b-header"
                >
                  <Typography>{t("شبکه اجتماعی")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="form-design">
                    <div className="row ">
                      <div className="col-lg-12 col-12">
                        <div className="row">
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("وب سایت")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="website"
                                  name="website"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.website}
                                />
                                {formik.touched.website &&
                                  formik.errors.website ? (
                                  <div className="error-msg">
                                    {t(formik.errors.website)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("لینکدین")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="linkedIn"
                                  name="linkedIn"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.linkedIn}
                                />
                                {formik.touched.linkedIn &&
                                  formik.errors.linkedIn ? (
                                  <div className="error-msg">
                                    {t(formik.errors.linkedIn)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("اینستاگرام")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="instagram"
                                  name="instagram"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.instagram}
                                />
                                {formik.touched.instagram &&
                                  formik.errors.instagram ? (
                                  <div className="error-msg">
                                    {t(formik.errors.instagram)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("بلاگ")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="blog"
                                  name="blog"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.blog}
                                />
                                {formik.touched.blog && formik.errors.blog ? (
                                  <div className="error-msg">
                                    {t(formik.errors.blog)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("فیسبوک")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="facebook"
                                  name="facebook"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.facebook}
                                />
                                {formik.touched.facebook &&
                                  formik.errors.facebook ? (
                                  <div className="error-msg">
                                    {t(formik.errors.facebook)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("توییتر")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="twitter"
                                  name="twitter"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.twitter}
                                />
                                {formik.touched.twitter &&
                                  formik.errors.twitter ? (
                                  <div className="error-msg">
                                    {t(formik.errors.twitter)}
                                  </div>
                                ) : null}
                              </div>
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
                  onClick={id != null ? updatePerson : () => {
                    formik.handleSubmit()
                    let temp = contactFieldsTouch.map(item => ({
                      prefixNamePhoneNumber: true,
                      phoneNumber: true,
                      prefixNumberPhoneNumber: true,
                      internal: true,
                      mainPhone: true,
                      fax: true,
                      mobile: true,
                    }))
                    setContactFieldsTouch(temp)

                  }}
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
            </div>
          </form>
        </FormikProvider>
      </div>
    </>
  );
};

export default CreatePersons;
