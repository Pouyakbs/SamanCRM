import { FieldArray, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  Button,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import swal from "sweetalert";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { SelectBox } from "devextreme-react";
import { useState } from "react";
import useCountryList from "../../../customHook/useCountryList";
import MyMap from "../../../components/map/";
import CircularProgress from "@mui/material/CircularProgress";
import { history } from "../../../utils/history";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import UploadFile from "../../../components/UploadComponent/UploadFile";

const Factor = [];

const NewCompetitor = () => {
  const { t, i18n } = useTranslation();
  const [alignment, setAlignment] = React.useState("");
  const theme = useTheme();
  const [uploadError, setUploadError] = useState(false);
  const countryList = useCountryList();
  const [factor, setFactor] = React.useState(Factor);
  const emptyContactFields = {
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
  const [result, setResult] = useState();
  const [competitorFileList, setCompetitorFileList] = useState([]);
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const [competitorDetail, setCompetitorDetail] = useState([]);
  const appConfig = window.globalConfig;
  const emptyProductFields = { productName: "", minPrice: "", maxPrice: "" };
  const emptyProductFieldsTouch = {
    productName: false,
    minPrice: false,
    maxPrice: false,
  };
  const [productFieldsTouch, setProductFieldsTouch] = useState([
    emptyProductFieldsTouch,
  ]);

  const phoneRegMatch = /^[0-9]{1,13}$/;
  const urlRegMatch =
    /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;

  const callComponent = () => {
    history.navigate(`/accounts/Competitor/CompetitorManagement`);
  };
  
  /////////////////////////////////formik/////////////////////////////////////
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: "",
      ceoName: "",
      contactFields: [{ ...emptyContactFields, mainPhone: true }],
      compAddress: "",
      compLong: "",
      compLat: "",
      website: "",
      activityField: "",
      activityExp: "",
      productFields: [{ ...emptyProductFields }],
      competitorFile: "",
      strengths: "",
      weakPoints: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "نام باید شامل 15 حرف یا کمتر باشد")
        .required("نام الزامیست"),
      contactFields: Yup.array(
        Yup.object({
          phoneNumber: Yup.string().matches(
            phoneRegMatch,
            "شماره تلفن صحیح نیست"
          ),
          internal: Yup.number().typeError("تنها عدد مجاز است"),
        })
      ),
      productFields: Yup.array(
        Yup.object({
          productName: Yup.string().required("نام محصول الزامیست"),
          minPrice: Yup.string().required("این فیلد الزامیست"),
          maxPrice: Yup.string().required("این فیلد الزامیست"),
        })
      ),
      activityField: Yup.string().required(() => {
        return "زمینه فعالیت الزامیست";
      }),
      website: Yup.string()
      .matches(urlRegMatch, "آدرس سایت صحیح نیست")
      .required(() => {
        return "آدرس سایت الزامیست";
      }),
      strengths: Yup.string(),
      weakPoints: Yup.string(),
    }),
    onSubmit: (values) => {
      var contectField = JSON.stringify(values.contactFields);
      var productField = JSON.stringify(values.productFields);
      values.contactFields = contectField;
      values.productFields = productField;
      console.log(values);
      axios
        .post(`${appConfig.BaseURL}/api/Competitor`, values)
        .then((res) => setResult(res.data.data));
      factorSub();
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
    formik.setFieldValue("competitorFile", typeArr);
  }
  const updateCompetitor = (values) => {
    if (values != null) {
      formik.values.contactFields = JSON.stringify(formik.values.contactFields);
      formik.values.productFields = JSON.stringify(formik.values.productFields);
      console.log(values);
      let isSuccess = false;
      axios
        .put(`${appConfig.BaseURL}/api/Competitor/Update/${id}`, formik.values)
        .then((res) => {
          setResult(res.data);
          isSuccess = true;
        })
        .finally(() => {
          if ((isSuccess = true)) {
            history.navigate(`/accounts/Competitor/CompetitorManagement`);
          }
        });
    }
  };

  const factorSub = () => {
    swal({
      title: t("اطلاعات رقیب با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };

  useEffect(() => {
    if (id != null) {
      axios.get(`${appConfig.BaseURL}/api/competitor/${id}`).then((res) => {
        setCompetitorDetail(res.data.data);
        setCompetitorFileList(
          res.data.data.competitorFile.map((item) => {
            let image = item.split(",");
            let imageName = image[0].split(":");
            return {
              fileName: imageName[1],
              file: `${image[1]},${image[2]}`,
            };
          })
        );
        console.log("res.data.data.productField", JSON.parse(res.data.data.productFields))
           formik.setFieldValue("productFields", JSON.parse(res.data.data.productFields))
        formik.setFieldValue("name", res.data.data.name);
        formik.setFieldValue("ceoName", res.data.data.ceoName);
        formik.setFieldValue("compAddress", res.data.data.compAddress);
        formik.setFieldValue("compLong", res.data.data.compLong);
        formik.setFieldValue("compLat", res.data.data.compLat);
        formik.setFieldValue("website", res.data.data.website);
        formik.setFieldValue("activityField", res.data.data.activityField);
        formik.setFieldValue("activityExp", res.data.data.activityExp);
        formik.setFieldValue("strengths", res.data.data.strengths);
        formik.setFieldValue("weakPoints", res.data.data.weakPoints);
      });
    }
  }, [id]);
  ////////////////////////////open & close pannel/////////////////////////////
  const [competitorAddressLoading, SetCompetitorAddressLoading] =
    useState(false);
  const [competitorLocation, SetCompetitorLocation] = useState({});
  const [compAddress, SetCompetitorAddress] = useState();
  function getBillMapData(address, location) {
    SetCompetitorLocation(location);
    SetCompetitorAddress(address);
  }
    useEffect(() => {
        if (id != null) {
            axios
                .get(`${appConfig.BaseURL}/api/competitor/${id}`)
                .then((res) => {
                    setCompetitorDetail(res.data.data)
                    formik.setFieldValue("name", res.data.data.name)
                    formik.setFieldValue("ceoName", res.data.data.ceoName)
                    formik.setFieldValue("compAddress", res.data.data.compAddress)
                    formik.setFieldValue("compLong", res.data.data.compLong)
                    formik.setFieldValue("compLat", res.data.data.compLat)
                    formik.setFieldValue("website", res.data.data.website)
                    formik.setFieldValue("activityField", res.data.data.activityField)
                    formik.setFieldValue("activityExp", res.data.data.activityExp)
                    formik.setFieldValue("strengths", res.data.data.strengths)
                    formik.setFieldValue("weakPoints", res.data.data.weakPoints)
                })
        }
    }, [id]);

  useEffect(() => {
    if (Object.keys(competitorLocation).length) {
      formik.setFieldValue("compLat", `${competitorLocation?.lat}`);
      formik.setFieldValue("compLong", `${competitorLocation?.lng}`);
    }
  }, [competitorLocation]);

  useEffect(() => {
    compAddress && formik.setFieldValue("compAddress", compAddress);
  }, [compAddress]);

  const [panel1, setPanel1] = React.useState(true);
  const handlePanel1 = () => (event, newExpanded) => {
    setPanel1(newExpanded);
  };
  useEffect(() => {
    if (formik.isSubmitting) {
      let condition = !!(
        (formik.touched.name && formik.errors.name) ||
        (formik.touched.activityField && formik.errors.activityField) ||
        (formik.touched.productFields && formik.errors.productFields) ||
        (formik.touched.contactFields && formik.errors.contactFields) ||
        (formik.touched.website && formik.errors.website)
      );
      setPanel1(condition || panel1);
    }
  }, [formik]);

  const prefixNamePhoneNumberArray = [
    t("دفتر"),
    t("همراه"),
    t("فکس"),
    t("کارخانه"),
    t("منزل"),
    t("واتس اپ"),
    t("سایر"),
  ];

  /////////////////////////////////////////////////////////////////////////////////

  return (
    <div id="form" style={{ display: "block", marginRight: "10px" }}>
      {/*<h1 className='main-title'>*/}
      {/*    {t("ایجاد رقیب")}*/}
      {/*</h1>*/}
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div
            style={{
              borderWidth: "0",
            }}
          >
            <Accordion expanded={panel1} onChange={handlePanel1()}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1b-content"
                id="panel1b-header"
              >
                <Typography>{t("اطلاعات رقیب")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="form-design">
                  <div className="row">
                    <div className="content col-lg-6 col-md-12 col-xs-12">
                      <div className="title">
                        <span>
                          {t("نام")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
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
                    <div className="content col-lg-6 col-md-12 col-xs-12">
                      <div className="title">
                        <span>{t("نام مدیرعامل")}</span>
                      </div>
                      <div className="wrapper">
                        <input
                          className="form-input"
                          type="text"
                          id="ceoName"
                          name="ceoName"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.ceoName}
                        />
                        {formik.touched.ceoName && formik.errors.ceoName ? (
                          <div className="error-msg">
                            {t(formik.errors.ceoName)}
                          </div>
                        ) : null}
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
                                  // onClick={() => formik.values.contactFields.length < 5 && push(emptyContactFields)}
                                  onClick={() => {
                                    formik.values.contactFields.length < 5 &&
                                      push(emptyContactFields);
                                    setContactFieldsTouch((oldArray) => [
                                      ...oldArray,
                                      contactFieldsTouch,
                                    ]);
                                  }}
                                >
                                  {t("افزودن شماره تماس")}
                                </Button>
                              </div>
                            </div>
                            {formik?.values?.contactFields?.map(
                              (contactFields, index) => (
                                <div className="row  mb-0" key={index}>
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
                                            i18n.dir() === "ltr" ? false : true
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
                                          noDataText={t("اطلاعات یافت نشد")}
                                          onBlur={() => {
                                            let temp = contactFieldsTouch.map(
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
                                            formik.values.contactFields[index]
                                              .prefixNamePhoneNumber
                                          }
                                          searchEnabled
                                          defaultValue={
                                            prefixNamePhoneNumberArray[0]
                                          }
                                        />
                                        {Array.isArray(
                                          formik.errors.contactFields
                                        ) && Array.isArray(contactFieldsTouch)
                                          ? formik.errors.contactFields[index]
                                              ?.prefixNamePhoneNumber &&
                                            contactFieldsTouch[index]
                                              ?.prefixNamePhoneNumber && (
                                              <div className="error-msg">
                                                {t(
                                                  formik.errors.contactFields[
                                                    index
                                                  ]?.prefixNamePhoneNumber
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
                                            let temp = contactFieldsTouch.map(
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
                                            formik.values.contactFields[index]
                                              .phoneNumber
                                          }
                                        />
                                        {Array.isArray(
                                          formik.errors.contactFields
                                        ) && Array.isArray(contactFieldsTouch)
                                          ? formik.errors.contactFields[index]
                                              ?.phoneNumber &&
                                            contactFieldsTouch[index]
                                              ?.phoneNumber && (
                                              <div className="error-msg">
                                                {t(
                                                  formik.errors.contactFields[
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
                                      <span>{t("پیش‌ شماره")}</span>
                                    </div>
                                    <div className="wrapper">
                                      <div>
                                        <SelectBox
                                          dataSource={countryList}
                                          rtlEnabled={
                                            i18n.dir() === "ltr" ? false : true
                                          }
                                          displayExpr="Name"
                                          valueExpr="value"
                                          onValueChanged={(e) =>
                                            e?.value &&
                                            formik.setFieldValue(
                                              `contactFields[${index}].prefixNumberPhoneNumber`,
                                              e?.value
                                            )
                                          }
                                          className="selectBox"
                                          noDataText="اطلاعات یافت نشد"
                                          onBlur={() => {
                                            let temp = contactFieldsTouch.map(
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
                                          searchEnabled
                                        />
                                        {Array.isArray(
                                          formik.errors.contactFields
                                        ) && Array.isArray(contactFieldsTouch)
                                          ? formik.errors.contactFields[index]
                                              ?.prefixNumberPhoneNumber &&
                                            contactFieldsTouch[index]
                                              ?.prefixNumberPhoneNumber && (
                                              <div className="error-msg">
                                                {t(
                                                  formik.errors.contactFields[
                                                    index
                                                  ]?.prefixNumberPhoneNumber
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
                                            let temp = contactFieldsTouch.map(
                                              (item, i) =>
                                                i === index
                                                  ? { ...item, internal: true }
                                                  : item
                                            );
                                            setContactFieldsTouch(temp);
                                          }}
                                          value={
                                            formik.values.contactFields[index]
                                              .internal
                                          }
                                        />
                                        {Array.isArray(
                                          formik.errors.contactFields
                                        ) && Array.isArray(contactFieldsTouch)
                                          ? formik.errors.contactFields[index]
                                              ?.internal &&
                                            contactFieldsTouch[index]
                                              ?.internal && (
                                              <div className="error-msg">
                                                {t(
                                                  formik.errors.contactFields[
                                                    index
                                                  ]?.internal
                                                )}
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
                                            formik.values.contactFields[index]
                                              .mainPhone
                                          }
                                          onChange={(e) => {
                                            console.log(e.target.checked);
                                            if (e.target.checked) {
                                              for (
                                                let i = 0;
                                                i <
                                                formik.values.contactFields
                                                  .length;
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
                                            let temp = contactFieldsTouch.map(
                                              (item, i) =>
                                                i === index
                                                  ? { ...item, mainPhone: true }
                                                  : item
                                            );
                                            setContactFieldsTouch(temp);
                                          }}
                                          value={
                                            formik.values.contactFields[index]
                                              .mainPhone
                                          }
                                        />
                                        {Array.isArray(
                                          formik.errors.contactFields
                                        ) && Array.isArray(contactFieldsTouch)
                                          ? formik.errors.contactFields[index]
                                              ?.mainPhone &&
                                            contactFieldsTouch[index]
                                              ?.mainPhone && (
                                              <div className="error-msg">
                                                {t(
                                                  formik.errors.contactFields[
                                                    index
                                                  ]?.mainPhone
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
                                            formik.values.contactFields[index]
                                              .fax
                                          }
                                          onChange={formik.handleChange}
                                          onBlur={() => {
                                            let temp = contactFieldsTouch.map(
                                              (item, i) =>
                                                i === index
                                                  ? { ...item, fax: true }
                                                  : item
                                            );
                                            setContactFieldsTouch(temp);
                                          }}
                                          value={
                                            formik.values.contactFields[index]
                                              .fax
                                          }
                                        />
                                        {Array.isArray(
                                          formik.errors.contactFields
                                        ) && Array.isArray(contactFieldsTouch)
                                          ? formik.errors.contactFields[index]
                                              ?.fax &&
                                            contactFieldsTouch[index]?.fax && (
                                              <div className="error-msg">
                                                {t(
                                                  formik.errors.contactFields[
                                                    index
                                                  ]?.fax
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
                                            formik.values.contactFields[index]
                                              .mobile
                                          }
                                          onChange={formik.handleChange}
                                          onBlur={() => {
                                            let temp = contactFields.map(
                                              (item, i) =>
                                                i === index
                                                  ? { ...item, mobile: true }
                                                  : item
                                            );
                                            setContactFieldsTouch(temp);
                                          }}
                                          value={
                                            formik.values.contactFields[index]
                                              .mobile
                                          }
                                        />
                                        {Array.isArray(
                                          formik.errors.contactFields
                                        ) && Array.isArray(contactFieldsTouch)
                                          ? formik.errors.contactFields[index]
                                              ?.mobile &&
                                            contactFieldsTouch[index]
                                              ?.mobile && (
                                              <div className="error-msg">
                                                {t(
                                                  formik.errors.contactFields[
                                                    index
                                                  ]?.mobile
                                                )}
                                              </div>
                                            )
                                          : ""}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="content col-lg-1 col-md-3 col-3">
                                    <div className="title">
                                      <span>‌‌</span>
                                    </div>
                                    {index !== 0 ? (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          remove(index);
                                          let temp = contactFieldsTouch.filter(
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
                          </React.Fragment>
                        )}
                      ></FieldArray>
                    </div>

                    <div className="col-md-6 col-12">
                      <div className="row">
                        <div className="content col-12">
                          <div className="title">
                            <span> {t("آدرس رقیب")} </span>
                          </div>
                          <div className="wrapper">
                            <div>
                              <textarea
                                className="form-input"
                                type="text"
                                id="compAddress"
                                name="compAddress"
                                style={{ width: "100%", height: "104px" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.compAddress}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="content col-12 position-relative">
                          {competitorAddressLoading ? (
                            <div className="loading-sec">
                              <CircularProgress />
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="row align-items-center">
                            <div className="content col-sm-5 col-xs-12">
                              <div className="title">
                                <span> {t("عرض جغرافیایی")} </span>
                              </div>
                              <div className="wrapper">
                                <div
                                  className="d-flex"
                                  style={{ position: "relative" }}
                                >
                                  <input
                                    className="form-input"
                                    type="text"
                                    id="compLong"
                                    name="compLong"
                                    style={{ width: "100%" }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.compLong}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="content col-sm-5 col-xs-12">
                              <div className="title">
                                <span> {t("طول جغرافیایی")} </span>
                              </div>
                              <div className="wrapper">
                                <div
                                  className="d-flex"
                                  style={{ position: "relative" }}
                                >
                                  <input
                                    className="form-input"
                                    type="text"
                                    id="compLat"
                                    name="compLat"
                                    style={{ width: "100%" }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.compLat}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="content col-sm-2 col-xs-12 d-flex justify-content-end">
                              <div className="title">
                                <span> ‌ </span>
                              </div>
                              <div
                                className="wrapper"
                                style={{ position: "relative" }}
                              >
                                <div
                                  className={`modal-action-button  ${
                                    i18n.dir() === "ltr" ? "action-ltr" : ""
                                  }`}
                                >
                                  <MyMap
                                    defaultLoc={competitorLocation}
                                    setAddressLoading={
                                      SetCompetitorAddressLoading
                                    }
                                    getMapData={getBillMapData}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 col-12">
                      <div className="row">
                        <div className="content col-lg-12 col-md-12 col-xs-12">
                          <div className="title">
                            <span>{t("آدرس سایت")}<span className="star">*</span></span>
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
                        <div className="content col-lg-12 col-md-12 col-xs-12">
                          <div className="title">
                            <span>{t("زمینه فعالیت")}<span className="star">*</span></span>
                          </div>
                          <div className="wrapper">
                            <input
                              className="form-input"
                              type="text"
                              id="activityField"
                              name="activityField"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.activityField}
                            />
                            {formik.touched.activityField &&
                            formik.errors.activityField ? (
                              <div className="error-msg">
                                {t(formik.errors.activityField)}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="content col-lg-12 col-md-12 col-xs-12">
                          <div className="title">
                            <span>{t("سابقه فعالیت")}</span>
                          </div>
                          <div className="wrapper">
                            <input
                              className="form-input"
                              type="text"
                              id="activityExp"
                              name="activityExp"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.activityExp}
                            />
                            {formik.touched.activityExp &&
                            formik.errors.activityExp ? (
                              <div className="error-msg">
                                {t(formik.errors.activityExp)}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="content col-lg-12 col-md-12 col-xs-12">
                      <FieldArray
                        name="productFields"
                        render={({ push, remove }) => (
                          <React.Fragment>
                            <div className="row">
                              <div className="content col-lg-12 col-md-12 col-xs-12">
                                <Button
                                  className="AddRow"
                                  disabled={
                                    formik.values.productFields.length >= 5
                                  }
                                  // onClick={() => formik.values.productFields.length < 5 && push(emptyProductFields)}
                                  onClick={() => {
                                    formik.values.productFields.length < 5 &&
                                      push(emptyProductFields);
                                    setProductFieldsTouch((oldArray) => [
                                      ...oldArray,
                                      emptyProductFieldsTouch,
                                    ]);
                                  }}
                                >
                                  {t("افزودن محصول و رنج قیمت")}
                                </Button>
                              </div>
                            </div>
                            {formik?.values?.productFields?.map(
                              (productFields, index) => (
                                <div className="row  mb-0" key={index}>
                                  <div className="content col-lg-4 col-md-6 col-xs-12">
                                    <div className="title">
                                      <span>{t("نام محصول")}<span className="star">*</span></span>
                                    </div>
                                    <div className="wrapper">
                                      <div className="divModal">
                                        <input
                                          className="form-input"
                                          type="text"
                                          id="productName"
                                          name={`productFields[${index}].productName`}
                                          style={{ width: "100%" }}
                                          onChange={formik.handleChange}
                                          onBlur={() => {
                                            let temp = productFieldsTouch.map(
                                              (item, i) =>
                                                i === index
                                                  ? {
                                                      ...item,
                                                      productName: true,
                                                    }
                                                  : item
                                            );
                                            setProductFieldsTouch(temp);
                                          }}
                                          value={
                                            formik.values.productFields[index]
                                              .productName
                                          }
                                        />
                                        {Array.isArray(
                                          formik.errors.productFields
                                        ) && Array.isArray(productFieldsTouch)
                                          ? formik.errors.productFields[index]
                                              ?.productName &&
                                            productFieldsTouch[index]
                                              ?.productName && (
                                              <div className="error-msg">
                                                {t(
                                                  formik.errors.productFields[
                                                    index
                                                  ]?.productName
                                                )}
                                              </div>
                                            )
                                          : ""}
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="content col-lg-1 col-md-6 col-xs-12 bg-danger">
                                                                    <div style={{ margin: "3% 5% 0 0 " }}>
                                                                        <span style={{ position: "absolute" }}>
                                                                            {t("از")}
                                                                        </span>
                                                                    </div>
                                                                </div> */}
                                  <div className="content col-lg-3 col-md-6 col-xs-12">
                                    <div className="title">
                                      <span>{t("رنج قیمت")}<span className="star">*</span></span>
                                    </div>
                                    <div className="wrapper">
                                      <div className="divModal">
                                        <label className="input-label">
                                          <div style={{ margin: "0 0 0 2% " }}>
                                            <span style={{ position: "right" }}>
                                              {t("از")}
                                            </span>
                                          </div>
                                          <input
                                            className="form-input"
                                            type="text"
                                            id="minPrice"
                                            name={`productFields[${index}].minPrice`}
                                            style={{ width: "100%" }}
                                            onChange={formik.handleChange}
                                            onBlur={() => {
                                              let temp = productFieldsTouch.map(
                                                (item, i) =>
                                                  i === index
                                                    ? {
                                                        ...item,
                                                        minPrice: true,
                                                      }
                                                    : item
                                              );
                                              setProductFieldsTouch(temp);
                                            }}
                                            value={
                                              formik.values.productFields[index]
                                                .minPrice
                                            }
                                          />
                                        </label>
                                        {Array.isArray(
                                          formik.errors.productFields
                                        ) && Array.isArray(productFieldsTouch)
                                          ? formik.errors.productFields[index]
                                              ?.minPrice &&
                                            productFieldsTouch[index]
                                              ?.minPrice && (
                                              <div className="error-msg">
                                                {t(
                                                  formik.errors.productFields[
                                                    index
                                                  ]?.minPrice
                                                )}
                                              </div>
                                            )
                                          : ""}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="content col-lg-3 col-md-6 col-xs-12">
                                    <div className="title">
                                      <span className="spanDisableInput">
                                        ‌
                                      </span>
                                    </div>
                                    <div className="wrapper">
                                      <div className="divModal">
                                        <label className="input-label">
                                          <div style={{ margin: "0 0 0 2% " }}>
                                            <span style={{ position: "right" }}>
                                              {t("تا")}
                                            </span>
                                          </div>
                                          <input
                                            className="form-input"
                                            type="text"
                                            id="maxPrice"
                                            name={`productFields[${index}].maxPrice`}
                                            style={{ width: "100%" }}
                                            onChange={formik.handleChange}
                                            onBlur={() => {
                                              let temp = productFieldsTouch.map(
                                                (item, i) =>
                                                  i === index
                                                    ? {
                                                        ...item,
                                                        maxPrice: true,
                                                      }
                                                    : item
                                              );
                                              setProductFieldsTouch(temp);
                                            }}
                                            value={
                                              formik.values.productFields[index]
                                                .maxPrice
                                            }
                                          />
                                        </label>
                                        {Array.isArray(
                                          formik.errors.productFields
                                        ) && Array.isArray(productFieldsTouch)
                                          ? formik.errors.productFields[index]
                                              ?.maxPrice &&
                                            productFieldsTouch[index]
                                              ?.maxPrice && (
                                              <div className="error-msg">
                                                {t(
                                                  formik.errors.productFields[
                                                    index
                                                  ]?.maxPrice
                                                )}
                                              </div>
                                            )
                                          : ""}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="content col-lg-1 col-md-3 col-3">
                                    <div className="title">
                                      <span>‌‌</span>
                                    </div>
                                    {index !== 0 ? (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          remove(index);
                                          let temp = productFieldsTouch.filter(
                                            (_, i) => i !== index
                                          );
                                          setProductFieldsTouch(temp);
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
                          </React.Fragment>
                        )}
                      ></FieldArray>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("نقاط قوت")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <textarea
                            className="form-input"
                            id="strengths"
                            name="strengths"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.strengths}
                          />
                          {formik.touched.strengths &&
                          formik.errors.strengths ? (
                            <div className="error-msg">
                              {t(formik.errors.strengths)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("نقاط ضعف")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <textarea
                            className="form-input"
                            id="weakPoints"
                            name="weakPoints"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.weakPoints}
                          />
                          {formik.touched.weakPoints &&
                          formik.errors.weakPoints ? (
                            <div className="error-msg">
                              {t(formik.errors.weakPoints)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("افزودن فایل")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <UploadFile
                            title={t("بارگذاری فایل")}
                            multiple={true}
                            uploadError={uploadError}
                            updateFileList={updateFileList}
                            accept={".png , .jpeg, .gif, .jpg, .bmp"}
                            defaultFiles={
                              competitorFileList != []
                                ? competitorFileList
                                : null
                            }
                          />
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
                onClick={id != null ? updateCompetitor :()=>{
                  formik.handleSubmit()
                  let temp=productFieldsTouch.map(item=>({
                    productName: true,
                    minPrice: true,
                    maxPrice: true,
                  }))
                  setProductFieldsTouch(temp)
                
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
  );
};

export default NewCompetitor;
