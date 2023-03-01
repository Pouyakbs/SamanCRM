import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { SelectBox } from "devextreme-react";
import { FieldArray, FormikProvider, useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import swal from "sweetalert";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import UserModal from "../../../components/Modals/Ghafourian_UserModal/UserModal";
import CancelIcon from "@mui/icons-material/Cancel";
import CountryTreeView from "../../../components/CountryComponent/CountryTreeView";
import MyMap from "../../../components/map/";
import CircularProgress from "@mui/material/CircularProgress";
import DataSource from "devextreme/data/data_source";
import useCountryList from "../../../customHook/useCountryList";
import axios from "axios";
import { history } from "../../../utils/history";
import { useSearchParams } from "react-router-dom";

const Supplier = [];
export const CreateSupplier = () => {
  const { t, i18n } = useTranslation();
  const [alignment, setAlignment] = useState("");
  const theme = useTheme();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const [supplier, SetSupplier] = useState(Supplier);
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const [result, setResult] = useState();
  const countryList = useCountryList();
  const [datasource, setDatasource] = useState([]);
  const appConfig = window.globalConfig;
  const [supplierDetail, setSupplierDetail] = useState([]);
  const [panel1, setPanel1] = useState(true);
  const [panel3, setPanel3] = useState(true);
  const [panel4, setPanel4] = useState(true);
  const [panel5, setPanel5] = useState(true);
  const [products, setProducts] = React.useState([])

  const handlePanel1 = () => (event, newExpanded) => {
    setPanel1(newExpanded);
  };
  const handlePanel3 = () => (event, newExpanded) => {
    setPanel3(newExpanded);
  };

  const handlePanel5 = () => (event, newExpanded) => {
    setPanel5(newExpanded);
  };

  const [inputState, setInputState] = useState(1);

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
  const emptyEmailsField = { emailAddress: "" };
  const emptyEmailsFieldTouch = { emailAddress: false };
  const [emailsFieldTouch, setEmailsFieldTouch] = useState([
    emptyEmailsFieldTouch,
  ]);

  const phoneRegMatch = /^[0-9]{1,13}$/;
  const urlRegMatch =
    /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
  // const nationalNumRegMatch = /^[0-9]{10}$/
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

  const emptyProductFields = { productID: "" };
  const emptyProductFieldsTouch = {
    productID: false,
  };
  const [productFieldsTouch, setProductFieldsTouch] = useState([
    emptyProductFieldsTouch,
  ]);
  const callComponent = () => {
    history.navigate(`/inventory-management/suppliers/SupplierManagement`);
  };
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      type: { id: 1, value: t("حقوقی") },
      name: "",
      nickName: "",
      surname: "",
      contactFields: [{ ...emptyContactFields, mainPhone: true }],
      emails: [emptyEmailsField],
      website: "",
      attractiveness: "",
      status: "",
      supplierNum: "",
      desc: "",
      industry: "",
      subIndustry: "",
      ecoCode: "",
      nationalNum: "",
      subNum: "",
      billSendGeoLoc: "",
      prodSendGeoLoc: "",
      billCountry: "",
      prodCountry: "",
      billState: "",
      prodState: "",
      billCity: "",
      prodCity: "",
      billPostalCode: "",
      prodPostalCode: "",
      billAddress: "",
      prodAddress: "",
      billLong: "",
      billLat: "",
      prodLong: "",
      prodLat: "",
      linkedIn: "",
      instagram: "",
      blog: "",
      facebook: "",
      twitter: "",
      accountID: "",
      productFields: [{ ...emptyProductFields }],
    },
    validationSchema: Yup.object({
      accountID: Yup.string().required("نام حساب الزامی است"),
      contactFields: Yup.array(
        Yup.object({
          phoneNumber: Yup.string().matches(
            phoneRegMatch,
            "شماره تلفن صحیح نیست"
          ),
          internal: Yup.number().typeError("تنها عدد مجاز است"),
        })
      ),
      emails: Yup.array(
        Yup.object({
          emailAddress: Yup.string().email("ایمیل صحیح نیست"),
        })
      ),
      website: Yup.string().matches(urlRegMatch, "آدرس سایت صحیح نیست"),
      // nationalNum: Yup.string()
      //     .matches(nationalNumRegMatch, "کد ملی  باید ده رقم باشد")
      //     .test("is-valid", "کد ملی صحیح نیست", function () {
      //         if (!!formik.values.nationalNum) {
      //             return true
      //         }
      //         else {
      //             return checkMelliCode(formik.values.nationalNum)
      //         }
      //     }
      //     ),
      billPostalCode: Yup.string()
        .length(10, "کد پستی باید 10 رقم باشد")
        .matches(iranPostalCodeRegMatch, "کد پستی صحیح نیست"),
      prodPostalCode: Yup.string()
        .length(10, "کد پستی باید 10 رقم باشد")
        .matches(iranPostalCodeRegMatch, "کد پستی صحیح نیست"),
      linkedIn: Yup.string().matches(
        linkedInRegMatch,
        "آدرس لینکدین صحیح نیست"
      ),
      instagram: Yup.string().matches(
        instagramRegMatch,
        "آدرس اینستاگرام صحیح نیست"
      ),
      blog: Yup.string().matches(urlRegMatch, "آدرس بلاگ صحیح نیست"),
      facebook: Yup.string().matches(
        facebookRegMatch,
        "آدرس فیس‌بوک صحیح نیست"
      ),
      twitter: Yup.string().matches(twitterRegMatch, "آدرس توییتر صحیح نیست"),
    }),
    onSubmit: (values) => {
      var contectField = JSON.stringify(values.contactFields);
      var email = JSON.stringify(values.emails);
      var productFields = values.productFields.map((item) => JSON.stringify({
        ProductID: item.productID,
    }));
      values.contactFields = contectField;
      values.emails = email;
      values.productFields = productFields
      values.type = values.type.value;
      console.log("values" , values)
      axios
        .post(`${appConfig.BaseURL}/api/supplier`, values)
        .then((res) => setResult(res.data.data));
      supplierSub();
      callComponent();
    },
  });
  const updateSupplier = (values) => {
    if (values != null) {
      formik.values.contactFields = JSON.stringify(formik.values.contactFields);
      formik.values.emails = JSON.stringify(formik.values.emails);
      formik.values.productFields = formik.values.productFields.map((item) => JSON.stringify({
        ProductID: item.productID,
    }));
      let isSuccess = false;
      axios
        .put(`${appConfig.BaseURL}/api/supplier/Update/${id}`, formik.values)
        .then((res) => {
          setResult(res.data);
          isSuccess = true;
        })
        .finally(() => {
          if ((isSuccess = true)) {
            history.navigate(
              `/inventory-management/suppliers/SupplierManagement`
            );
          }
        });
    }
  };

  useEffect(() => {
    axios
      .get(`${appConfig.BaseURL}/api/Account`)
      .then((res) => setDatasource(res.data.data));
  }, []);
  // useEffect(() => {
  //     axios
  //         .get(`${appConfig.BaseURL}/api/supplier`)
  //         .then((res) => setSupplierData(res.data.data));
  // }, []);

  const supplierSub = () => {
    swal({
      title: t("تامین‌کننده با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };

  useEffect(() => {
    if (id != null) {
      axios.get(`${appConfig.BaseURL}/api/supplier/${id}`).then((res) => {
        setSupplierDetail(res.data.data);
        formik.setFieldValue("name", res.data.data.name);
        formik.setFieldValue("accountID", res.data.data.accountID);
        formik.setFieldValue("website", res.data.data.website);
        formik.setFieldValue("attractiveness", res.data.data.attractiveness);
        formik.setFieldValue("status", res.data.data.status);
        formik.setFieldValue("supplierNum", res.data.data.supplierNum);
        var productFields = res.data.data.productFields.map((item) => {
          let items = JSON.parse(item)
          return {
              productID: items.ProductID
          }
      })
        formik.setFieldValue("productFields", productFields);
        formik.setFieldValue("user", res.data.data.user);
        formik.setFieldValue("desc", res.data.data.desc);
        formik.setFieldValue("industry", res.data.data.industry);
        formik.setFieldValue("subIndustry", res.data.data.subIndustry);
        formik.setFieldValue("ecoCode", res.data.data.ecoCode);
        formik.setFieldValue("nationalNum", res.data.data.nationalNum);
        formik.setFieldValue("subNum", res.data.data.subNum);
        formik.setFieldValue("billSendGeoLoc", res.data.data.billSendGeoLoc);
        formik.setFieldValue("prodSendGeoLoc", res.data.data.prodSendGeoLoc);
        formik.setFieldValue("billCountry", res.data.data.billCountry);
        formik.setFieldValue("billCity", res.data.data.billCity);
        formik.setFieldValue("billState", res.data.data.billState);
        formik.setFieldValue("billLat", res.data.data.billLat);
        formik.setFieldValue("billLong", res.data.data.billLong);
        formik.setFieldValue("billAddress", res.data.data.billAddress);
        formik.setFieldValue("billPostalCode", res.data.data.billPostalCode);
        formik.setFieldValue("prodCountry", res.data.data.prodCountry);
        formik.setFieldValue("prodCity", res.data.data.prodCity);
        formik.setFieldValue("prodState", res.data.data.prodState);
        formik.setFieldValue("prodLat", res.data.data.prodLat);
        formik.setFieldValue("prodLong", res.data.data.prodLong);
        formik.setFieldValue("prodAddress", res.data.data.prodAddress);
        formik.setFieldValue("prodPostalCode", res.data.data.prodPostalCode);
        formik.setFieldValue("linkedIn", res.data.data.linkedIn);
        formik.setFieldValue("instagram", res.data.data.instagram);
        formik.setFieldValue("blog", res.data.data.blog);
        formik.setFieldValue("facebook", res.data.data.facebook);
        formik.setFieldValue("twitter", res.data.data.twitter);
      });
    }
    console.log("formik values" , formik.values)
  }, [id]);

  useEffect(() => {
    if (formik.isSubmitting) {
      let panel1Condition = !!(
        (formik.touched.type && formik.errors.type) ||
        (formik.touched.name && formik.errors.name) ||
        (formik.touched.surname && formik.errors.surname) ||
        (formik.touched.nickName && formik.errors.nickName) ||
        (formik.touched.contactFields && formik.errors.contactFields) ||
        (formik.touched.emails && formik.errors.emails) ||
        (formik.touched.website && formik.errors.website)
      );
      setPanel1(panel1Condition || panel1);

      let panel3Condition = !!(
        formik.touched.nationalNum && formik.errors.nationalNum
      );
      setPanel3(panel3Condition || panel3);

      let panel4Condition = !!(
        (formik.touched.billPostalCode && formik.errors.billPostalCode) ||
        (formik.touched.prodPostalCode && formik.errors.prodPostalCode)
      );
      setPanel4(panel4Condition || panel4);

      let panel5Condition = !!(
        (formik.touched.linkedIn && formik.errors.linkedIn) ||
        (formik.touched.instagram && formik.errors.instagram) ||
        (formik.touched.blog && formik.errors.blog) ||
        (formik.touched.facebook && formik.errors.facebook) ||
        (formik.touched.twitter && formik.errors.twitter)
      );
      setPanel5(panel5Condition || panel5);
    }
  }, [formik]);

  function getUserData(val) {
    formik.setFieldValue("user", val.Name);
    console.log(formik.values.user);
  }
  function clearUserField() {
    formik.setFieldValue("user", "");
  }
  function getBillAddress(val) {
    formik.setFieldValue("billCountry", val[0]);
    formik.setFieldValue("billState", val[1]);
    formik.setFieldValue("billCity", val[2]);
    formik.setFieldValue("billSendGeoLoc", `${val[0]}-${val[1]}-${val[2]}`);
  }
  function clearBillAddress() {
    formik.setFieldValue("billCountry", "");
    formik.setFieldValue("billState", "");
    formik.setFieldValue("billCity", "");
    formik.setFieldValue("billSendGeoLoc", "");
  }
  function getProdAddress(val) {
    formik.setFieldValue("prodCountry", val[0]);
    formik.setFieldValue("prodState", val[1]);
    formik.setFieldValue("prodCity", val[2]);
    formik.setFieldValue("prodSendGeoLoc", `${val[0]}-${val[1]}-${val[2]}`);
  }
  function clearProdAddress() {
    formik.setFieldValue("prodCountry", "");
    formik.setFieldValue("prodState", "");
    formik.setFieldValue("prodCity", "");
    formik.setFieldValue("prodSendGeoLoc", "");
  }
  const [billLocation, SetBillLocation] = useState({});
  const [billAddress, SetBillAddress] = useState();
  const [billAddressLoading, SetBillAddressLoading] = useState(false);
  function getBillMapData(address, location) {
    SetBillLocation(location);
    SetBillAddress(address);
  }

  useEffect(() => {
    if (Object.keys(billLocation).length) {
      formik.setFieldValue("billLat", `${billLocation?.lat}`);
      formik.setFieldValue("billLong", `${billLocation?.lng}`);
    }
  }, [billLocation]);

  useEffect(() => {
    billAddress && formik.setFieldValue("billAddress", billAddress);
  }, [billAddress]);

  const [prodLocation, SetProdLocation] = useState({});
  const [prodAddress, SetProdAddress] = useState();
  const [prodAddressLoading, SetProdAddressLoading] = useState(false);
  function getProdMapData(address, location) {
    SetProdLocation(location);
    SetProdAddress(address);
  }

    
  const getProducts = () => {
    axios
      .get(`${appConfig.BaseURL}/api/Products`)
      .then((res) => {
        setProducts(res.data.data)
      })
      .catch((error) => error);
  };
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    if (Object.keys(prodLocation).length) {
      formik.setFieldValue("prodLat", `${prodLocation?.lat}`);
      formik.setFieldValue("prodLong", `${prodLocation?.lng}`);
    }
  }, [prodLocation]);

  useEffect(() => {
    prodAddress && formik.setFieldValue("prodAddress", prodAddress);
  }, [prodAddress]);

  function CopyBillToProd() {
    formik.setFieldValue("prodSendGeoLoc", formik.values.billSendGeoLoc);
    formik.setFieldValue("prodCountry", formik.values.billCountry);
    formik.setFieldValue("prodState", formik.values.billState);
    formik.setFieldValue("prodCity", formik.values.billCity);
    formik.setFieldValue("prodPostalCode", formik.values.billPostalCode);
    formik.setFieldValue("prodAddress", formik.values.billAddress);
    formik.setFieldValue("prodLat", formik.values.billLat);
    formik.setFieldValue("prodLong", formik.values.billLong);
  }

  function renderSubIndustryArray() {
    switch (formik.values.industry) {
      case t("تولید فرایندی"):
        return subIndustryArray1;
        break;
      case t("تولید گسسته"):
        return subIndustryArray2;
        break;
      case t("خدمات عمومی"):
        return subIndustryArray3;
        break;
      case t("خدماتی"):
        return subIndustryArray4;
        break;
      case t("مصرفی"):
        return subIndustryArray5;
        break;
      default:
        return subIndustryArray;
        break;
    }
  }

  const types = [
    { id: 1, value: t("حقوقی") },
    { id: 2, value: t("حقیقی") },
  ];

  const typesDataSource = new DataSource({
    store: {
      type: "array",
      data: types,
      key: "id",
    },
  });
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
  const attractivenesses = [t("زیاد"), t("متوسط"), t("کم")];
  const statuses = [
    t("شناسایی شده"),
    t("ارزیابی شده"),
    t("در حال مذاکره"),
    t("توافق شده"),
    t("غیر فعال"),
  ];
  const prefixNamePhoneNumberArray = [
    t("دفتر"),
    t("همراه"),
    t("فکس"),
    t("کارخانه"),
    t("منزل"),
    t("واتس اپ"),
    t("سایر"),
  ];
  const industryArray = [
    t("تولید فرایندی"),
    t("تولید گسسته"),
    t("خدمات عمومی"),
    t("خدماتی"),
    t("مصرفی"),
  ];
  const subIndustryArray = [];
  const subIndustryArray1 = [
    t("بسته‌بندی"),
    t("چوب"),
    t("دارویی"),
    t("سیم و کابل"),
    t("شیمیایی و پتروشیمی"),
    t("فلزات اساسی"),
    t("کاغذ"),
    t("لاستیک و پلاستیک"),
    t("لوازم پزشکی و علمی"),
    t("مبلمان"),
    t("محصولات فلزی"),
    t("مصالح ساختمانی"),
    t("معدن‌کاوی"),
    t("نساجی"),
    t("نفت و گاز"),
  ];
  const subIndustryArray2 = [
    t("تجهیزات دفاعی و فضایی"),
    t("تکنولوژی‌های پیشرفته"),
    t("ماشین‌آلات و تجهیزات صنعتی"),
    t("مهندسی ساختمان عملیات عمرانی"),
    t("وسایل نقلیه و خدمات وابسته"),
  ];
  const subIndustryArray3 = [
    t("امنیت عمومی"),
    t("امنیتی و دفاعی"),
    t("پست"),
    t("تحقیقات و تحصیلات تکمیلی"),
    t("سلامت و بهداشت"),
  ];
  const subIndustryArray4 = [
    t("آژانس‌های خدمات مسافرتی"),
    t("انتشارات و رسانه‌ها"),
    t("بانک"),
    t("بیمه"),
    t("حمل و نقل و انبارداری"),
    t("خدمات حرفه‌ای و مشاوره"),
    t("خدمات شهری"),
    t("سرگرمی و تفریحات"),
    t("مخابرات"),
    t("هتل‌داری و رستوران"),
  ];
  const subIndustryArray5 = [
    t("خرده‌فروشی"),
    t("عمده‌فروشی و پخش"),
    t("کفش و محصولات چرمی"),
    t("لوازم خانگی"),
    t("محصولات آرایشی و بهداشتی"),
    t("مواد غذایی، آشامیدنی و دخانیات"),
  ];
  return (
    <>
      <div id="form" style={{ display: "block", marginRight: "10px" }}>
        {/*<h1 className='main-title'>*/}
        {/*    {t("ایجاد تامین‌کننده")}*/}
        {/*</h1>*/}
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Accordion expanded={panel1} onChange={handlePanel1()}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography style={{ color: `${theme.palette.text.primary}` }}>
                  {t("اطلاعات تامین‌کننده")}{" "}
                </Typography>
              </AccordionSummary>
              <div
                style={{ backgroundColor: `${theme.palette.background.paper}` }}
              >
                <div className="form-design">
                  <div className="row">
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>
                          {" "}
                          {t("نام حساب")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        {id != null && formik.values.accountID != 0 && (
                          <SelectBox
                            dataSource={datasource}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              console.log("------e111", e);
                              formik.setFieldValue(
                                "accountID",
                                e.value.accountID == null
                                  ? ""
                                  : e.value.accountID
                              );
                              formik.setFieldValue(
                                "name",
                                e.value.name == null ? "" : e.value.name
                              );
                            }}
                            displayExpr={"name"}
                            defaultValue={formik.values.accountID}
                            valueExpr={"accountID"}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="accountID"
                            id="accountID"
                            searchEnabled
                            showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                          />
                        )}
                        {(!id ||
                          (id != null && formik.values.accountID == 0)) && (
                          <SelectBox
                            dataSource={datasource}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              console.log("------eeeeeeeeeee", e);
                              formik.setFieldValue(
                                "accountID",
                                e.value.accountID
                              );
                              formik.setFieldValue("name", e.value.name);
                            }}
                            displayExpr={"name"}
                            defaultValue={formik.values.accountID}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="accountID"
                            id="accountID"
                            searchEnabled
                            showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                          />
                        )}
                        {formik.touched.accountID && formik.errors.accountID ? (
                          <div className="error-msg">
                            {t(formik.errors.accountID)}
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
                                      <span>{t("پیش‌شماره")}</span>
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
                    <div className="content col-lg-6 col-md-12 col-xs-12">
                      <FieldArray
                        name="emails"
                        render={({ push, remove }) => (
                          <React.Fragment>
                            <div className="row align-items-center mb-0">
                              <div className="content col-lg-6 col-md-12 col-xs-12">
                                <Button
                                  className="AddRow"
                                  //  onClick={() =>{ formik.values.emails.length < 5 &&
                                  //     push(emptyEmailsField)}}
                                  onClick={() => {
                                    formik.values.emails.length < 5 &&
                                      push(emptyEmailsField);

                                    setEmailsFieldTouch((oldArray) => [
                                      ...oldArray,
                                      emptyEmailsField,
                                    ]);
                                  }}
                                  disabled={formik.values.emails.length >= 5}
                                >
                                  {t("افزودن ایمیل")}
                                </Button>
                              </div>
                            </div>
                            {formik?.values?.emails?.map((emails, index) => (
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
                                        name={`emails[${index}].emailAddress`}
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
                                          formik.values.emails[index]
                                            .emailAddress
                                        }
                                      />
                                      {Array.isArray(formik.errors.emails) &&
                                      Array.isArray(emailsFieldTouch)
                                        ? formik.errors.emails[index]
                                            ?.emailAddress &&
                                          emailsFieldTouch[index]
                                            ?.emailAddress && (
                                            <div className="error-msg">
                                              {t(
                                                formik.errors.emails[index]
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
                                  {index !== 0 ? (
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
                    <div className="content col-lg-6 col-md-12 col-xs-12">
                      <FieldArray
                        name="productFields"
                        render={({ push, remove }) => (
                          <React.Fragment>
                            <div className="row align-items-center mb-0">
                              <div className="content col-lg-6 col-md-12 col-xs-12">
                                <Button
                                  className="AddRow"
                                  disabled={
                                    formik.values.productFields?.length >= 5
                                  }
                                  // onClick={() => formik.values.productFields.length < 5 && push(emptyProductFields)}
                                  onClick={() => {
                                    formik.values.productFields?.length < 5 &&
                                      push(emptyProductFields);
                                    setProductFieldsTouch((oldArray) => [
                                      ...oldArray,
                                      emptyProductFieldsTouch,
                                    ]);
                                  }}
                                >
                                  {t("افزودن محصول")}
                                </Button>
                              </div>
                            </div>
                            {formik?.values?.productFields?.map(
                              (productFields, index) => (
                                <div
                                  className="row mb-0"
                                  key={index}
                                  style={{ display: "flex" }}
                                >
                                  <div className="content col-lg-11 col-md-6 col-xs-12">
                                    <div className="title">
                                      <span>
                                        {t("نام محصول")}
                                        <span className="star">*</span>
                                      </span>
                                    </div>
                                    <div className="wrapper">
                                      <div className="divModal">
                                        {id != null && formik.values.productFields[index].productID != "" && (
                                          <SelectBox
                                            dataSource={products}
                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                            onBlur={() => {
                                              let temp = productFieldsTouch.map(
                                                (item, i) =>
                                                  i === index
                                                    ? {
                                                        ...item,
                                                        productID: true,
                                                      }
                                                    : item
                                              );
                                              setProductFieldsTouch(temp);
                                            }}
                                            onValueChanged={(e) => {
                                              formik.setFieldValue(
                                                `productFields[${index}].productID`,
                                                e.value
                                              );
                                            }}
                                            defaultValue={
                                                formik.values.productFields[index]
                                                  .productID}
                                            className="selectBox"
                                            noDataText="اطلاعات یافت نشد"
                                            placeholder=""
                                            displayExpr="productName"
                                            valueExpr={"productID"}
                                            id="productID"
                                            name={`productFields[${index}].productID`}
                                            searchEnabled
                                            showClearButton
                                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                                          />
                                        )}
                                    
                                        {(!id ||
                                          (id != null && formik.values.productFields[index].productID == "")) && (
                                          <SelectBox
                                            dataSource={products}
                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                            onValueChanged={(e) => {
                                              formik.setFieldValue(
                                                `productFields[${index}].productID`,
                                                e.value.productID
                                              );
                                            }}
                                            defaultValue={formik.values.productFields[index]
                                                .productID}
                                            className="selectBox"
                                            noDataText="اطلاعات یافت نشد"
                                            displayExpr="productName"
                                            placeholder=""
                                            id="productID"
                                            name={`productFields[${index}].productID`}
                                            searchEnabled
                                            showClearButton
                                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                                          />
                                        )}
                                        {Array.isArray(
                                          formik.errors.productFields
                                        ) && Array.isArray(productFieldsTouch)
                                          ? formik.errors.productFields[index]
                                              ?.productID &&
                                            productFieldsTouch[index]
                                              ?.productID && (
                                              <div className="error-msg">
                                                {t(
                                                  formik.errors.productFields[
                                                    index
                                                  ]?.productID
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
                          {formik.touched.website && formik.errors.website ? (
                            <div className="error-msg">
                              {t(formik.errors.website)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("میزان جذابیت")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {" "}
                          {id != null && formik.values.attractiveness != "" && (
                            <SelectBox
                              dataSource={attractivenesses}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("attractiveness", e.value);
                              }}
                              defaultValue={formik.values.attractiveness}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="attractiveness"
                              id="attractiveness"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.attractiveness == "")) && (
                            <SelectBox
                              dataSource={attractivenesses}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e555555555555", e);
                                formik.setFieldValue("attractiveness", e.value);
                              }}
                              defaultValue={formik.values.attractiveness}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="attractiveness"
                              id="attractiveness"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {formik.touched.attractiveness &&
                          formik.errors.attractiveness &&
                          !formik.values.attractiveness ? (
                            <div className="error-msg">
                              {t(formik.errors.attractiveness)}
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
                          {" "}
                          {id != null && formik.values.status != "" && (
                            <SelectBox
                              dataSource={statuses}
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
                              dataSource={statuses}
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
                        <span>{t("شماره تامین‌کننده")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <input
                            className="form-input"
                            type="text"
                            id="supplierNum"
                            name="supplierNum"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.supplierNum}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography style={{ color: `${theme.palette.text.primary}` }}>
                  {t("توضیحات")}{" "}
                </Typography>
              </AccordionSummary>
              <div
                style={{ backgroundColor: `${theme.palette.background.paper}` }}
              >
                <div className="form-design">
                  <div className="row">
                    <div className="content col-lg-6 col-md-12 col-xs-12">
                      <div className="title">
                        <span> {t("توضیحات")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <textarea
                            className="form-input"
                            id="desc"
                            name="desc"
                            style={{ width: "100%" }}
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
            </Accordion>
            <Accordion expanded={panel3} onChange={handlePanel3()}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel3-content"
                id="panel3-header"
              >
                <Typography style={{ color: `${theme.palette.text.primary}` }}>
                  {t("اطلاعات بیشتر")}{" "}
                </Typography>
              </AccordionSummary>
              <div
                style={{ backgroundColor: `${theme.palette.background.paper}` }}
              >
                <div className="form-design">
                  <div className="row">
                    <div className="content col-lg-3 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("صنعت")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {" "}
                          {id != null && formik.values.industry != "" && (
                            <SelectBox
                              dataSource={industryArray}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("industry", e.value);
                              }}
                              defaultValue={formik.values.industry}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="industry"
                              id="industry"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null && formik.values.industry == "")) && (
                            <SelectBox
                              dataSource={industryArray}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e555555555555", e);
                                formik.setFieldValue("industry", e.value);
                              }}
                              defaultValue={formik.values.industry}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="industry"
                              id="industry"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {formik.touched.industry &&
                          formik.errors.industry &&
                          !formik.values.industry ? (
                            <div className="error-msg">
                              {t(formik.errors.industry)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    {/* <div className='content col-lg-3 col-md-6 col-xs-12'>
                                            <div className='title'>
                                                <span>{t("صنعت")}</span>
                                            </div>
                                            <div className='wrapper'>
                                                <div>
                                                    <SelectBox
                                                        dataSource={industryArray}
                                                        rtlEnabled={i18n.dir() === "ltr" ? false : true}
                                                        onValueChanged={(e) => formik.setFieldValue('industry', e.value)}
                                                        className='selectBox'
                                                        noDataText={t("اطلاعات یافت نشد")}
                                                        itemRender={null}
                                                        placeholder=''
                                                        name='industry'
                                                        id='industry'
                                                        searchEnabled
                                                        showClearButton
                                                    />
                                                </div>
                                            </div>
                                        </div> */}
                    <div className="content col-lg-3 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("زیرصنعت")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {" "}
                          {id != null && formik.values.subIndustry != "" && (
                            <SelectBox
                              dataSource={renderSubIndustryArray}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("subIndustry", e.value);
                              }}
                              defaultValue={formik.values.subIndustry}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="subIndustry"
                              id="subIndustry"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.subIndustry == "")) && (
                            <SelectBox
                              dataSource={renderSubIndustryArray}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                console.log("------e555555555555", e);
                                formik.setFieldValue("subIndustry", e.value);
                              }}
                              defaultValue={formik.values.subIndustry}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="subIndustry"
                              id="subIndustry"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {formik.touched.subIndustry &&
                          formik.errors.subIndustry &&
                          !formik.values.subIndustry ? (
                            <div className="error-msg">
                              {t(formik.errors.subIndustry)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    {/* <div className='content col-lg-3 col-md-6 col-xs-12'>
                                            <div className='title'>
                                                <span>{t("زیرصنعت")}</span>
                                            </div>
                                            <div className='wrapper'>
                                                <div>
                                                    <SelectBox
                                                        dataSource={renderSubIndustryArray()}
                                                        rtlEnabled={i18n.dir() === "ltr" ? false : true}
                                                        onValueChanged={(e) => formik.setFieldValue('subIndustry', e.value)}
                                                        className='selectBox'
                                                        noDataText={t("اطلاعات یافت نشد")}
                                                        itemRender={null}
                                                        placeholder=''
                                                        name='subIndustry'
                                                        id='subIndustry'
                                                        searchEnabled
                                                        showClearButton
                                                    />
                                                </div>
                                            </div>
                                        </div> */}
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("کد اقتصادی")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <input
                            className="form-input"
                            type="text"
                            id="ecoCode"
                            name="ecoCode"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            value={formik.values.ecoCode}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("شناسه ملی")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <input
                            className="form-input"
                            type="text"
                            id="nationalNum"
                            name="nationalNum"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.nationalNum}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("شماره ثبت")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <input
                            className="form-input"
                            type="text"
                            id="subNum"
                            name="subNum"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            value={formik.values.subNum}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel4-content"
                id="panel4-header"
              >
                <Typography style={{ color: `${theme.palette.text.primary}` }}>
                  {t("آدرس")}{" "}
                </Typography>
              </AccordionSummary>
              <div
                style={{ backgroundColor: `${theme.palette.background.paper}` }}
              >
                <div className="form-design">
                  <div className="row">
                    <div className="col-md-6 col-12">
                      <div className="row">
                        <div className="content col-12">
                          <div className="title">
                            <span>
                              {" "}
                              {t("منطقه جغرافیایی ارسال صورت حساب")}{" "}
                            </span>
                          </div>
                          <div className="wrapper">
                            <div
                              className="d-flex"
                              style={{ position: "relative" }}
                            >
                              <input
                                className={`form-input modal-input ${
                                  i18n.dir() === "ltr" ? "ltr" : ""
                                }`}
                                type="text"
                                id="billSendGeoLoc"
                                name="billSendGeoLoc"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.billSendGeoLoc}
                                disabled
                              />
                              <div
                                className={`modal-action-button  ${
                                  i18n.dir() === "ltr" ? "action-ltr" : ""
                                }`}
                              >
                                <CountryTreeView
                                  className="modal"
                                  getAddress={getBillAddress}
                                />
                                <Button>
                                  <CancelIcon onClick={clearBillAddress} />
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
                            <div>
                              <input
                                className="form-input"
                                type="text"
                                id="billCountry"
                                name="billCountry"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.billCountry}
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
                            <div>
                              <input
                                className="form-input"
                                type="text"
                                id="billState"
                                name="billState"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.billState}
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
                            <div>
                              <input
                                className="form-input"
                                type="text"
                                id="billCity"
                                name="billCity"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.billCity}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className="content col-12">
                          <div className="title">
                            <span> {t("کد پستی")} </span>
                          </div>
                          <div className="wrapper">
                            <div>
                              <input
                                className="form-input"
                                type="text"
                                id="billPostalCode"
                                name="billPostalCode"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.billPostalCode}
                              />
                              {formik.touched.billPostalCode &&
                              formik.errors.billPostalCode ? (
                                <div className="error-msg">
                                  {t(formik.errors.billPostalCode)}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="content col-12">
                          <div className="title">
                            <span> {t("آدرس")} </span>
                          </div>
                          <div className="wrapper">
                            <div>
                              <textarea
                                className="form-input"
                                type="text"
                                id="billAddress"
                                name="billAddress"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.billAddress}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="content col-12 position-relative">
                          {billAddressLoading ? (
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
                                    id="billLong"
                                    name="billLong"
                                    style={{ width: "100%" }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.billLong}
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
                                    id="billLat"
                                    name="billLat"
                                    style={{ width: "100%" }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.billLat}
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
                                    defaultLoc={billLocation}
                                    setAddressLoading={SetBillAddressLoading}
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
                        <div className="content col-12">
                          <div className="title">
                            <span> {t("منطقه جغرافیایی ارسال محصول")} </span>
                          </div>
                          <div className="wrapper">
                            <div
                              className="d-flex"
                              style={{ position: "relative" }}
                            >
                              <input
                                className={`form-input modal-input ${
                                  i18n.dir() === "ltr" ? "ltr" : ""
                                }`}
                                type="text"
                                id="prodSendGeoLoc"
                                name="prodSendGeoLoc"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.prodSendGeoLoc}
                                disabled
                              />
                              <div
                                className={`modal-action-button  ${
                                  i18n.dir() === "ltr" ? "action-ltr" : ""
                                }`}
                              >
                                <CountryTreeView
                                  className="modal"
                                  getAddress={getProdAddress}
                                />
                                <Button>
                                  <CancelIcon onClick={clearProdAddress} />
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
                            <div>
                              <input
                                className="form-input"
                                type="text"
                                id="prodCountry"
                                name="prodCountry"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.prodCountry}
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
                            <div>
                              <input
                                className="form-input"
                                type="text"
                                id="prodState"
                                name="prodState"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.prodState}
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
                            <div>
                              <input
                                className="form-input"
                                type="text"
                                id="prodCity"
                                name="prodCity"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.prodCity}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className="content col-12">
                          <div className="title">
                            <span> {t("کد پستی")} </span>
                          </div>
                          <div className="wrapper">
                            <div>
                              <input
                                className="form-input"
                                type="text"
                                id="prodPostalCode"
                                name="prodPostalCode"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.prodPostalCode}
                              />
                              {formik.touched.prodPostalCode &&
                              formik.errors.prodPostalCode ? (
                                <div className="error-msg">
                                  {t(formik.errors.prodPostalCode)}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="content col-12">
                          <div className="title">
                            <span> {t("آدرس حمل")} </span>
                          </div>
                          <div className="wrapper">
                            <div>
                              <textarea
                                className="form-input"
                                type="text"
                                id="prodAddress"
                                name="prodAddress"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.prodAddress}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="content col-12 position-relative">
                          {prodAddressLoading ? (
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
                                    id="prodLong"
                                    name="prodLong"
                                    style={{ width: "100%" }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.prodLong}
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
                                    id="prodLat"
                                    name="prodLat"
                                    style={{ width: "100%" }}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.prodLat}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="content col-sm-2 col-xs-12 d-flex justify-content-end">
                              <span> ‌ </span>
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
                                    defaultLoc={prodLocation}
                                    setAddressLoading={SetProdAddressLoading}
                                    getMapData={getProdMapData}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="content col-lg-6 col-md-6 col-xs-12" />
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="wrapper">
                        <div>
                          <Button
                            variant="contained"
                            className="copy-btn"
                            onClick={CopyBillToProd}
                          >
                            {t("کپی از فیلد صورت‌حساب")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Accordion>
            <div>
              <Accordion expanded={panel5} onChange={handlePanel5()}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography
                    style={{ color: `${theme.palette.text.primary}` }}
                  >
                    {t("شبکه اجتماعی")}{" "}
                  </Typography>
                </AccordionSummary>
                <div
                  style={{
                    backgroundColor: `${theme.palette.background.paper}`,
                  }}
                >
                  <div className="form-design">
                    <div className="row">
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
                            {formik.touched.twitter && formik.errors.twitter ? (
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
              </Accordion>
              <div className="button-pos">
                <Button
                  variant="contained"
                  color="success"
                  type="button"
                  onClick={id != null ? updateSupplier : ()=>{
                    formik.handleSubmit()
                    let temp= productFieldsTouch.map(item=>({
                      productID: true,
                    }))
                    setProductFieldsTouch(temp)}}
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

export default CreateSupplier;
