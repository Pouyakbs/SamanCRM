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
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useSearchParams } from "react-router-dom"
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserNameModal from "../../../components/Modals/Mahan_UserNameModal/UserNameModal";
import ManagerNameModal from "../../../components/Modals/Mahan_ManagerNameModal/ManagerNameModal";
import {
  julianIntToDate,
  julianIntToDateTime,
} from "../../../utils/dateConvert";
import { SelectBox } from "devextreme-react";
import DeleteIcon from "@mui/icons-material/Delete";
import { history } from "../../../utils/history";
import useCountryList from "../../../customHook/useCountryList";
import {
  renderCalendarSwitch,
  renderCalendarLocaleSwitch,
} from "../../../utils/calenderLang";
import axios from "axios";
import DateObject from "react-date-object";
import { getLangDate } from "../../../utils/getLangDate";

export const CreatePersonnel = () => {
  const [SearchParams] = useSearchParams()
  const id = SearchParams.get("id")
  const [result, setResult] = useState();
  const [personnelDetail, setPersonnelDetail] = useState([]);
  const { t, i18n } = useTranslation();
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

  const appConfig = window.globalConfig;
  const theme = useTheme();

  const phoneRegMatch = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
  const nationalIdRegMatch = /^[0-9]{10}$/;
  const iranPostalCodeRegMatch =
    /^\b(?!(\d)\1{ Yup.string().3})[13-9]{4}[1346-9][013-9]{5}\b/;

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      nickName: "",
      name: "",
      surname: "",
      orgPost: 0,
      workingSection: "",
      username: "",
      managerName: "",
      birthDate: new DateObject(),
      nationalCode: "",
      workingUnit: "",
      nameOfUser: "",
      status: "",
      GeographyLoc: "",
      country: "",
      city: "",
      state: "",
      latitude: "",
      longitude: "",
      address: "",
      postalCode: "",
      contactFields: [{ ...emptyContact, mainPhone: true }],
      email: [emptyEmailsField],
    },
    validationSchema: Yup.object({
      name: Yup.string()
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
      contactFields: Yup.array(
        Yup.object({
          phoneNumber: Yup.string().matches(
            phoneRegMatch,
            "شماره تلفن صحیح نمیباشد"
          ),
          internal: Yup.number().typeError("تنها عدد مجاز است"),
        })
      ),
      birthDate: Yup.date().required(() => {
        return "تاریخ الزامیست";
      }),
      email: Yup.array(
        Yup.object({
          emailAddress: Yup.string().email("ایمیل صحیح نمیباشد"),
        })
      ),
      orgPost: Yup.string(),
      nationalCode: Yup.string().matches(
        nationalIdRegMatch,
        "کد ملی صحیح نمیباشد"
      ),
    }),

    onSubmit: (values) => {
      var contectField = JSON.stringify(values.contactFields);
      var emails = JSON.stringify(values.email);
      values.contactFields = contectField;
      values.email = emails;
      console.log("here", values);
      axios
        .post(`${appConfig.BaseURL}/api/personnel`, values)
        .then((res) => setResult(res.data.data));
      factorSub();
      history.navigate("/BaseInfo/Personnels/PersonnelManagement");
    },
  });
  const factorSub = () => {
    swal({
      title: t("پرسنل با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };
  function getUserData(val) {
    console.log(val);
    formik.setFieldValue("username", val.username);
  }
  function clearUserNameField() {
    formik.setFieldValue("username", "");
  }

  function getManagerNameData(val) {
    formik.setFieldValue("managerName", val.managerName);
  }
  function clearManagerNameField() {
    formik.setFieldValue("managerName", "");
  }
  //////////////////////Address Funcs/////////////////////////////////////////
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState();
  const [addressLoading, setAddressLoading] = useState(false);
  const [datasource, setDataSource] = useState([]);
  console.log(datasource);

  const dateRef = useRef();

  function getInvoiceAddress(val) {
    formik.setFieldValue("country", val[0]);
    formik.setFieldValue("state", val[1]);
    formik.setFieldValue("city", val[2]);
    formik.setFieldValue("GeographyLoc", `${val[0]}، ${val[1]}، ${val[2]}`);
  }
  function clearInvoiceAddress() {
    formik.setFieldValue("country", "");
    formik.setFieldValue("state", "");
    formik.setFieldValue("city", "");
    formik.setFieldValue("GeographyLoc", "");
  }
  function getMapData(address, location) {
    setLocation(location);
    setAddress(address);
  }
  useEffect(() => {
    if (Object.keys(location).length) {
      formik.setFieldValue("latitude", `${location?.lat}`);
      formik.setFieldValue("longitude", `${location?.lng}`);
    }
  }, [location]);
  useEffect(() => {
    address && formik.setFieldValue("address", address);
  }, [address]);

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

  useEffect(() => {
    if (formik.isSubmitting) {
      let condition1 =
        !!(formik.touched.name && formik.errors.name) ||
        !!(formik.touched.surname && formik.errors.surname) ||
        !!(formik.touched.accountName && formik.errors.accountName) ||
        !!(formik.touched.contactFields && formik.errors.contactFields) ||
        !!(formik.touched.email && formik.errors.email);
      let condition3 = !!(
        (formik.touched.birthDate && formik.errors.birthDate) ||
        (formik.touched.nationalCode && formik.errors.nationalCode)
      );
      let condition4 = !!(formik.touched.userEmail && formik.errors.userEmail);
      let condition5 = !!(
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
    axios
      .get(`${appConfig.BaseURL}/api/ApplicationRole`)
      .then((res) => setDataSource(res.data.data));
  }, []);
  useEffect(() => {
    if(id != null) {
      axios
        .get(`${appConfig.BaseURL}/api/personnel/${id}`)
        .then((res) => {
          setPersonnelDetail(res.data.data)
          formik.setFieldValue("nickName", res.data.data.nickName)
          formik.setFieldValue("name", res.data.data.name)
          formik.setFieldValue("surname", res.data.data.surname)
          formik.setFieldValue("orgPost", res.data.data.orgPost)
          formik.setFieldValue("workingSection", res.data.data.workingSection)
          formik.setFieldValue("username", res.data.data.username)
          formik.setFieldValue("managerName", res.data.data.managerName)
          formik.setFieldValue("birthDate", res.data.data.birthDate)
          formik.setFieldValue("nationalCode", res.data.data.nationalCode)
          formik.setFieldValue("workingUnit", res.data.data.workingUnit)
          formik.setFieldValue("status", res.data.data.status)
          formik.setFieldValue("GeographyLoc", res.data.data.GeographyLoc)
          formik.setFieldValue("country", res.data.data.country)
          formik.setFieldValue("city", res.data.data.city)
          formik.setFieldValue("state", res.data.data.state)
          formik.setFieldValue("latitude", res.data.data.latitude)
          formik.setFieldValue("longitude", res.data.data.longitude)
          formik.setFieldValue("address", res.data.data.address)
          formik.setFieldValue("postalCode", res.data.data.postalCode)
        })
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
  const GroupingOne = [t("Category 1"), t("Category 2"), t("Category 3")];
  const condition = [t("فعال"), t("غیرفعال")];
  const prefixNamePhoneNumberArray = [
    t("دفتر"),
    t("همراه"),
    t("فکس"),
    t("کارخانه"),
    t("منزل"),
    t("واتس اپ"),
    t("سایر"),
  ];
  const callComponent = () => {
    history.navigate(
      `/BaseInfo/Personnels/PersonnelManagement`
    );
  };
  const updatePersonnel = (values) => {
    if (id != null && values != null) {
      formik.values.contactFields = JSON.stringify(formik.values.contactFields);
      formik.values.email = JSON.stringify(formik.values.email);
      console.log(values)
      let isSuccess = false
      axios
      .put(`${appConfig.BaseURL}/api/Personnel/Update/${id}` , formik.values)
      .then((res) => {
          setResult(res.data)
           isSuccess = true
          })
          .finally(() => {
            if(isSuccess = true) {
              history.navigate(`/BaseInfo/Personnels/PersonnelManagement`)
            }
          })
    }
  };

console.log('formik.values',formik.values)

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
                <Typography>{t("اطلاعات پرسنل")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="form-design">
                  <div className="row ">
                    <div className="col-lg-12 col-12">
                      <div className="row">
                        <div className="content col-lg-3 col-md-6 col-xs-12">
                          <div className="title">
                            <span>{t("لقب")}</span>
                          </div>
                          <div className="wrapper">
                            <div>
                              
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

                        <div className="content col-lg-3 col-md-6 col-xs-12">
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

                        <div className="content col-lg-3 col-md-6 col-xs-12">
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

                        <div className="content col-lg-3 col-md-6 col-xs-12">
                          <div className="title">
                            <span>{t("پست سازمانی")}</span>
                          </div>
                          <div className="wrapper">
                            <div>
                              {id != null && formik.values.orgPost!=0 &&<SelectBox
                                dataSource={datasource}
                                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                onValueChanged={(e) =>{
                                  console.log('------e111',e)
                                  formik.setFieldValue(
                                    "orgPost",
                                    e.value
                                  )}
                                }
                                displayExpr={"roleName"}
                                valueExpr={"roleID"}
                                defaultValue={formik.values.orgPost}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="orgPost"
                                id="orgPost"
                                searchEnabled
                                showClearButton
                                //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />}
                              {(!id || (id != null && formik.values.orgPost==0) )&& <SelectBox
                                dataSource={datasource}
                                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                onValueChanged={(e) =>{
                                  console.log('------e555555555555',e)
                                  formik.setFieldValue(
                                    "orgPost",
                                    e.value
                                  )}
                                }
                                displayExpr={"roleName"}
                                valueExpr={"roleID"}
                                defaultValue={formik.values.orgPost}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="orgPost"
                                id="orgPost"
                                searchEnabled
                                showClearButton
                                //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />}
                              {formik.touched.orgPost &&
                              formik.errors.orgPost &&
                              !formik.values.orgPost ? (
                                <div className="error-msg">
                                  {t(formik.errors.orgPost)}
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
                                            <span>{t("شماره تلفن")}</span>
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
                                                      <div className="error-msg">
                                                        {t(
                                                          formik.errors
                                                            .contactFields[
                                                            index
                                                          ]?.phoneNumber
                                                        )}
                                                      </div>
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
                                id="workingSection"
                                name="workingSection"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.workingSection}
                              />
                              {formik.touched.workingSection &&
                              formik.errors.workingSection ? (
                                <div sclassName="error-msg">
                                  {t(formik.errors.workingSection)}
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
                                className={`form-input modal-input ${
                                  i18n.dir() === "ltr" ? "ltr" : ""
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
                                className={`modal-action-button  ${
                                  i18n.dir() == "ltr" ? "action-ltr" : ""
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
                              <span>{t("نام مدیر")}</span>
                            </div>
                            <div className="wrapper">
                              <div className="divModal position-relative">
                                <input
                                  className={`form-input modal-input ${
                                    i18n.dir() === "ltr" ? "ltr" : ""
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
                                  className={`modal-action-button  ${
                                    i18n.dir() == "ltr" ? "action-ltr" : ""
                                  }`}
                                >
                                  <ManagerNameModal
                                    className="modal"
                                    getData={getManagerNameData}
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
                                    julianIntToDateTime(val.toJulianDay())
                                  );
                                }}
                                value={getLangDate(i18n.language , formik.values.birthDate)}
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
                              <span>{t("عضو واحد")}</span>
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
                              <span>{t("وضعیت")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <SelectBox
                                  dataSource={condition}
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
                                  //defaultValue={condition[0]}       نشان دادن مقدار اولیه
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
                              <span> {t("منطقه جغرافيایی اصلی")} </span>
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
                                  className={`form-input modal-input ${
                                    i18n.dir() === "ltr" ? "ltr" : ""
                                  }`}
                                  type="text"
                                  id="GeographyLoc"
                                  name="GeographyLoc"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.GeographyLoc}
                                  disabled
                                />
                                <div
                                  className={`modal-action-button ${
                                    i18n.dir() == "ltr" ? "action-ltr" : ""
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
                        </div>
                      </div>
                      <div className="col-md-6 col-12">
                        <div className="row">
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
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <div className="button-pos">
                <Button
                  variant="contained"
                  color="success"
                  type="button"
                  onClick={ id != null ? updatePersonnel : formik.handleSubmit}
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

export default CreatePersonnel;
