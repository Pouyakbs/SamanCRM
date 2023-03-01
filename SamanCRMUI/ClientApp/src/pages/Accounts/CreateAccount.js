import React, { useState, useEffect, useRef } from "react";
import { FieldArray, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CancelIcon from "@mui/icons-material/Cancel";
import CircularProgress from "@mui/material/CircularProgress";
import CountryTreeView from "../../components/CountryComponent/CountryTreeView";
import { history } from "../../utils/history";
import { geographicalList } from "../../components/CountryComponent/geographicalList";
import Map from "../../components/map";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { array, number, object, string } from "yup";
import DataSource from "devextreme/data/data_source";
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import UserModal from "../../components/Modals/Mahan_UserModal/UserModal";
import CampaignModal from "../../components/Modals/Mahan_CampaignModal/CampaignModal";
import MemberModal from "../../components/Modals/Mahan_MemberModal/MemberModal";
import { julianIntToDateTime } from "../../utils/dateConvert";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useSearchParams } from "react-router-dom"
import useCountryList from "../../customHook/useCountryList";
import { SelectBox } from "devextreme-react";
import { getLangDate } from "../../utils/getLangDate";
import {
  renderCalendarSwitch,
  renderCalendarLocaleSwitch,
} from "../../utils/calenderLang";
import DateObject from "react-date-object";

export const CreateAccount = () => {
  const [SearchParams] = useSearchParams()
  const id = SearchParams.get("id")
  const [fileList, setFileList] = useState([]);
  const [comPublicList, setComPublicList] = useState([]);
  const [result, setResult] = useState();
  const [accountDetail, setAccountDetail] = useState([]);
  console.log(accountDetail)
  const appConfig = window.globalConfig;
  const { t, i18n } = useTranslation();

  const [alignment, setAlignment] = React.useState("");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const theme = useTheme();
  const [inputState, setInputState] = useState(1);

  const countryList = useCountryList();

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

  ///////////////////////////////formik/////////////////////////////////
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

  const dateRef = useRef();

  const callComponent = () => {
    history.navigate(`/accounts/AccountManagement`);
  };
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      type: { id: 1, value: t("حقوقی") },
      nickName: "",
      personName: "",
      surname: "",
      name: "",
      website: "",
      accountType: "",
      accountID: 0,
      user: "",
      desc: "",
      attractiveness: "",
      anotherName: "",
      campaign: "",
      industry: "",
      subIndustry: "",
      ownership: "",
      member: "",
      ecoCode: "",
      subNumber: "",
      nationalNum: "",
      validityStatus: "",
      validityType: "",
      expireTime: new DateObject(),
      validitySource: "",
      validityLimit: "",
      validitySourceDesc: "",
      saleDiscount: 0,
      geographyCode: "",
      otherGeographicalArea: "",
      country: "",
      city: "",
      state: "",
      latitude: "",
      longitude: "",
      address: "",
      postalCode: "",
      otherCountry: "",
      othercity: "",
      otherstate: "",
      otherlatitude: "",
      otherlongitude: "",
      otheraddress: "",
      otherPostalCode: "",
      linkedIn: "",
      instagram: "",
      blog: "",
      facebook: "",
      twitter: "",
      contactFields: [{ ...emptyContact, mainPhone: true }],
      emails: [emptyEmailsField],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "نام باید شامل 20 حرف یا کمتر باشد")
        .when("type", (type) => {
          if (type.id == 1) return Yup.string().required("نام الزامیست");
        }),
      nickName: Yup.string()
        .when("type", (type) => {
          if (type.id == 2) return Yup.string().required("لقب الزامیست");
        }),
      name: Yup.string()
        .max(20, "نام باید شامل 20 حرف یا کمتر باشد")
        .when("type", (type) => {
          if (type.id == 2) return Yup.string().required("نام الزامیست");
        }),
      surname: Yup.string()
        .max(20, "نام خانوادگی باید شامل 20 حرف یا کمتر باشد")
        .when("type", (type) => {
          if (type.id == 2)
            return Yup.string().required("نام خانوادگی الزامیست");
        }),
      postalCode: Yup.string()
        .length(10, "کد پستی باید 10 رقم باشد")
        .matches(iranPostalCodeRegMatch, "کد پستی صحیح نمیباشد"),
      otherPostalCode: Yup.string()
        .length(10, "کد پستی باید 10 رقم باشد")
        .matches(iranPostalCodeRegMatch, "کد پستی صحیح نمیباشد"),
      anotherName: Yup.string().max(15, "نام باید شامل 15 حرف یا کمتر باشد"),
      contactFields: array(
        object({
          phoneNumber: string().matches(
            phoneRegMatch,
            "شماره تلفن صحیح نمیباشد"
          )
            .required(() => {
              return "شماره تلفن الزامیست";
            }),
          internal: number().typeError("تنها عدد مجاز است"),
        })
      ),
      expireTime: Yup.date().required(() => {
        return "تاریخ الزامیست";
      }),
      accountType: Yup.string().required(() => {
        return "نوح حساب الزامیست";
      }),
      industry: Yup.string().required(() => {
        return "صنعت الزامیست";
      }),
      subIndustry: Yup.string().required(() => {
        return "زیرصنعت الزامیست";
      }),
      geographyCode: Yup.string().required(() => {
        return "منطقه جغرافیایی ارسال صورت حساب الزامیست";
      }),

      subNumber: Yup.number().typeError("تنها عدد مجاز است"),

      saleDiscount: Yup.number()
        .typeError("تنها عدد مجاز است")
        .lessThan(101, "عدد مجاز بین 1 تا 100 است")
        .moreThan((-1), "عدد مجاز بین 1 تا 100 است"),

      accountID: Yup.number().typeError("تنها عدد مجاز است"),

      validityLimit: Yup.number().typeError("تنها عدد مجاز است"),

      emails: Yup.array(
        Yup.object({
          emailAddress: Yup.string().email("ایمیل صحیح نمیباشد"),
        })
      ),
      website: Yup.string().matches(urlRegMatch, "وب سایت صحیح نمیباشد"),
      post: Yup.string(),
      desc: Yup.string(),
      nationalNum: Yup.string().matches(
        nationalIdRegMatch,
        "کد ملی صحیح نمیباشد"
      ),
      ecoCode: Yup.number().typeError("تنها عدد مجاز است"),

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
      var email = JSON.stringify(values.emails);
      values.contactFields = contectField;
      values.emails = email;
      values.type = values.type.value
      axios
        .post(`${appConfig.BaseURL}/api/account`, values)
        .then((res) => setResult(res.data.data));
      factorSub();
      callComponent()
    },
  });
  useEffect(() => {
    if (id != null) {
      axios
        .get(`${appConfig.BaseURL}/api/account/${id}`)
        .then((res) => {
          setAccountDetail(res.data.data)
          formik.setFieldValue("nickname", res.data.data.nickname)
          formik.setFieldValue("personName", res.data.data.personName)
          formik.setFieldValue("surname", res.data.data.surname)
          formik.setFieldValue("name", res.data.data.name)
          formik.setFieldValue("website", res.data.data.website)
          formik.setFieldValue("accountType", res.data.data.accountType)
          formik.setFieldValue("accountID", res.data.data.accountID)
          formik.setFieldValue("user", res.data.data.user)
          formik.setFieldValue("desc", res.data.data.desc)
          formik.setFieldValue("attractiveness", res.data.data.attractiveness)
          formik.setFieldValue("anotherName", res.data.data.anotherName)
          formik.setFieldValue("campaign", res.data.data.campaign)
          formik.setFieldValue("industry", res.data.data.industry)
          formik.setFieldValue("subIndustry", res.data.data.subIndustry)
          formik.setFieldValue("ownership", res.data.data.ownership)
          formik.setFieldValue("member", res.data.data.member)
          formik.setFieldValue("ecoCode", res.data.data.ecoCode)
          formik.setFieldValue("subNumber", res.data.data.subNumber)
          formik.setFieldValue("nationalNum", res.data.data.nationalNum)
          formik.setFieldValue("validityStatus", res.data.data.validityStatus)
          formik.setFieldValue("validityType", res.data.data.validityType)
          formik.setFieldValue("expireTime", res.data.data.expireTime)
          formik.setFieldValue("validitySource", res.data.data.validitySource)
          formik.setFieldValue("validityLimit", res.data.data.validityLimit)
          formik.setFieldValue("validitySourceDesc", res.data.data.validitySourceDesc)
          formik.setFieldValue("saleDiscount", res.data.data.saleDiscount)
          formik.setFieldValue("geographyCode", res.data.data.geographyCode)
          formik.setFieldValue("otherGeographicalArea", res.data.data.otherGeographicalArea)
          formik.setFieldValue("country", res.data.data.country)
          formik.setFieldValue("city", res.data.data.city)
          formik.setFieldValue("state", res.data.data.state)
          formik.setFieldValue("latitude", res.data.data.latitude)
          formik.setFieldValue("longitude", res.data.data.longitude)
          formik.setFieldValue("address", res.data.data.address)
          formik.setFieldValue("postalCode", res.data.data.postalCode)
          formik.setFieldValue("otherCountry", res.data.data.otherCountry)
          formik.setFieldValue("othercity", res.data.data.othercity)
          formik.setFieldValue("otherstate", res.data.data.otherstate)
          formik.setFieldValue("otherlatitude", res.data.data.otherlatitude)
          formik.setFieldValue("otherlongitude", res.data.data.otherlongitude)
          formik.setFieldValue("otheraddress", res.data.data.otheraddress)
          formik.setFieldValue("otherPostalCode", res.data.data.otherPostalCode)
          formik.setFieldValue("linkedIn", res.data.data.linkedIn)
          formik.setFieldValue("instagram", res.data.data.instagram)
          formik.setFieldValue("blog", res.data.data.blog)
          formik.setFieldValue("facebook", res.data.data.facebook)
        })
    }
  }, [id]);
  function getUserData(val) {
    formik.setFieldValue("user", val.user);
    // console.log(formik.values.usernameCategory)
  }
  function clearUserField() {
    formik.setFieldValue("user", "");
  }

  function getCampaignData(val) {
    formik.setFieldValue("campaign", val.campaign);
    // console.log(formik.values.usernameCategory)
  }
  function clearCampaignField() {
    formik.setFieldValue("campaign", "");
  }

  function getMemberData(val) {
    formik.setFieldValue("member", val.member);
    // console.log(formik.values.usernameCategory)
  }
  function clearMemberField() {
    formik.setFieldValue("member", "");
  }

  ////////////////////////copy function////////////////////////////////////////
  const copy = () => {
    formik.setFieldValue(
      "otherGeographicalArea",
      formik.values.mainGeographicalArea
    );
    formik.setFieldValue("otherCountry", formik.values.country);
    formik.setFieldValue("otherstate", formik.values.state);
    formik.setFieldValue("othercity", formik.values.city);
    formik.setFieldValue("otherPostalCode", formik.values.postalCode);
    formik.setFieldValue("otheraddress", formik.values.address);
    formik.setFieldValue("otherlatitude", formik.values.latitude);
    formik.setFieldValue("otherlongitude", formik.values.longitude);
  };
  //////////////////////Address Funcs/////////////////////////////////////////
  const [location, setLocation] = useState({});
  const [address, setAddress] = useState();
  const [addressLoading, setAddressLoading] = useState(false);
  const [location1, setLocation1] = useState({});
  const [address1, setAddress1] = useState();
  const [addressLoading1, setAddressLoading1] = useState(false);

  function getInvoiceAddress(val) {
    formik.setFieldValue("country", val[0]);
    formik.setFieldValue("state", val[1]);
    formik.setFieldValue("city", val[2]);
    formik.setFieldValue(
      "geographyCode",
      `${val[0]}، ${val[1]}، ${val[2]}`
    );
  }
  function clearInvoiceAddress() {
    formik.setFieldValue("country", "");
    formik.setFieldValue("state", "");
    formik.setFieldValue("city", "");
    formik.setFieldValue("geographyCode", "");
  }
  function getAddresstwo(val) {
    formik.setFieldValue("otherCountry", val[0]);
    formik.setFieldValue("otherstate", val[1]);
    formik.setFieldValue("othercity", val[2]);
    formik.setFieldValue(
      "otherGeographicalArea",
      `${val[0]}، ${val[1]}، ${val[2]}`
    );
  }
  function clearAddresstwo() {
    formik.setFieldValue("otherCountry", "");
    formik.setFieldValue("otherstate", "");
    formik.setFieldValue("othercity", "");
    formik.setFieldValue("otherGeographicalArea", "");
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
      formik.setFieldValue("otherlatitude", `${location1?.lat}`);
      formik.setFieldValue("otherlongitude", `${location1?.lng}`);
    }
  }, [location1]);
  useEffect(() => {
    address && formik.setFieldValue("address", address);
  }, [address]);
  useEffect(() => {
    address1 && formik.setFieldValue("otheraddress", address1);
  }, [address1]);

  ////////////////////////////open & close pannel//////////////////////////////////
  const [panel1, setPanel1] = React.useState(true);
  const [panel2, setPanel2] = React.useState(true);
  const [panel3, setPanel3] = React.useState(true);
  const [panel4, setPanel4] = React.useState(true);
  const [panel5, setPanel5] = React.useState(true);
  const [panel6, setPanel6] = React.useState(true);
  const handlePanel1 = () => (event, newExpanded) => {
    setPanel1(newExpanded);
  };
  const handlePanel2 = () => (event, newExpanded) => {
    setPanel2(newExpanded);
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
        !!(formik.touched.name && formik.errors.name) ||
        !!(formik.touched.nickName && formik.errors.nickName) ||
        !!(formik.touched.accountType && formik.errors.accountType) ||
        !!(formik.touched.contactFields && formik.errors.contactFields) ||
        !!(formik.touched.emails && formik.errors.emails) ||
        !!(formik.touched.website && formik.errors.website) ||
        !!(formik.touched.accountID && formik.errors.accountID);
      let condition2 =
        !!(formik.touched.industry && formik.errors.industry) ||
        !!(formik.touched.subIndustry && formik.errors.subIndustry) ||
        !!(formik.touched.anotherName && formik.errors.anotherName) ||
        !!(formik.touched.ecoCode && formik.errors.ecoCode) ||
        !!(formik.touched.subNumber && formik.errors.subNumber) ||
        !!(formik.touched.nationalNum && formik.errors.nationalNum);
      let condition3 =
        !!(formik.touched.postalCode && formik.errors.postalCode) ||
        !!(formik.touched.geographyCode && formik.errors.geographyCode) ||
        !!(formik.touched.otherPostalCode && formik.errors.otherPostalCode);
      let condition4 =
        !!(formik.touched.expireTime && formik.errors.expireTime) ||
        !!(formik.touched.validityLimit && formik.errors.validityLimit) ||
        !!(formik.touched.saleDiscount && formik.errors.saleDiscount);
      let condition5 =
        !!(formik.touched.linkedIn && formik.errors.linkedIn) ||
        !!(formik.touched.instagram && formik.errors.instagram) ||
        !!(formik.touched.blog && formik.errors.blog) ||
        !!(formik.touched.facebook && formik.errors.facebook) ||
        !!(formik.touched.twitter && formik.errors.twitter);
      setPanel1(condition1 || panel1);
      setPanel2(condition2 || panel2);
      setPanel3(condition3 || panel3);
      setPanel4(condition4 || panel4);
      setPanel5(condition5 || panel5);
    }
  }, [formik]);
  useEffect(() => {    
    axios
    .get(`${appConfig.BaseURL}/api/ComPublic/GetByProgramPart/2`)
    .then((res) => setComPublicList(res.data.data))
    .catch((error) => error);
  }, []);

  useEffect(() => {
    if (Object.keys(location).length) {
      formik.setFieldValue("latitude", `${location?.lat}`);
      formik.setFieldValue("longitude", `${location?.lng}`);
    }
  }, [location]);
  
  useEffect(() => {
    if (Object.keys(location1).length) {
      formik.setFieldValue("latitude1", `${location1?.lat}`);
      formik.setFieldValue("longitude1", `${location1?.lng}`);
    }
  }, [location1]);

  useEffect(() => {
    address && formik.setFieldValue("address", address);
  }, [address]);

  useEffect(() => {
    address1 && formik.setFieldValue("address1", address1);
  }, [address1]);

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
  const accountType = [
    t("مشتری"),
    t("نماینده"),
    t("رقیب"),
    t("سرمایه گذار"),
    t("مطبوعات"),
    t("مشتری بالقوه"),
    t("نماینده ی فروش"),
    t("سایر"),
  ];
  const attractiveness = [t("زیاد"), t("متوسط"), t("کم")];
  const validityStatus = [
    t("اعتبار دارد"),
    t("اعتبار ندارد"),
    t("محاسبه نشده"),
  ];
  const validityType = [t("چک"), t("حساب باز")];
  const validitySource = [t("معرف"), t("ضمانتنامه"), t("سند")];
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

  function renderSubIndustryArray(params) {
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
  const updateAccount = (values) => {
    if (values != null) {
      formik.values.contactFields = JSON.stringify(formik.values.contactFields);
      formik.values.emails = JSON.stringify(formik.values.emails);
      console.log(values)
      let isSuccess = false
      axios
        .put(`${appConfig.BaseURL}/api/Account/Update/${id}`, formik.values)
        .then((res) => {
          setResult(res.data)
          isSuccess = true
        })
        .finally(() => {
          if (isSuccess = true) {
            history.navigate(`/accounts/AccountManagement`)
          }
        })
    }
  };
  const factorSub = () => {
    swal({
      title: t("اطلاعات حساب با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };

  console.log("dateRef:", dateRef);

  return (
    <>
      <div>
        {/*<h1 className='main-title' >*/}
        {/*    {t("ایجاد حساب")}*/}
        {/*</h1>*/}

        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Accordion expanded={panel1} onChange={handlePanel1()}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{t("اطلاعات حساب")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="form-design">
                  <div className="row ">
                    <div className="col-lg-12 col-12">
                      <div className="row">
                        <div className="content col-lg-6 col-md-6 col-xs-12">
                          <div className="title">
                            <span>
                              {t("نوع")}
                              <span className="star">*</span>
                            </span>
                          </div>
                          <div className="wrapper">
                            <div>
                              <SelectBox
                                dataSource={typesDataSource}
                                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                onValueChanged={(e) => {
                                  formik.setFieldValue("type", e.value);
                                  setInputState(e.value.id);
                                  formik.setFieldValue("personName", "");
                                  formik.setFieldValue("surname", "");
                                  formik.setFieldValue("nickName", "");
                                  formik.setFieldValue("name", "");
                                }}
                                className="selectBox"
                                noDataText={t("اطلاعات یافت نشد")}
                                itemRender={null}
                                placeholder=""
                                name="type"
                                id="type"
                                defaultValue={types[0]}
                                displayExpr="value"
                              />
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
                        {inputState === 2 && (
                          <>
                            <div className="content col-lg-2 col-md-6 col-xs-12">
                              <div className="title">
                                <span>{t("لقب")}<span className="star">*</span></span>
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
                            <div className="content col-lg-2 col-md-6 col-xs-12">
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
                                  {formik.touched.name &&
                                    formik.errors.name &&
                                    formik.values.type.id == 2 ? (
                                    <div className="error-msg">
                                      {t(formik.errors.name)}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <div className="content col-lg-2 col-md-6 col-xs-12">
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
                                    formik.errors.surname &&
                                    formik.values.type.id == 2 ? (
                                    <div className="error-msg">
                                      {t(formik.errors.surname)}
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </>
                        )}{" "}
                        {inputState === 1 && (
                          <div className="content col-lg-6 col-md-6 col-xs-12">
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
                                {formik.touched.name &&
                                  formik.errors.name &&
                                  formik.values.type.id == 1 ? (
                                  <div className="error-msg">
                                    {t(formik.errors.name)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        )}
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
                            name="emails"
                            render={({ push, remove }) => (
                              <React.Fragment>
                                <div className="row align-items-center mb-0">
                                  <div className="content col-lg-6 col-md-12 col-xs-12">
                                    <Button
                                      className="AddRow"
                                      onClick={() => {
                                        formik.values.emails.length < 5 &&
                                          push(emptyEmailsField);

                                        setEmailsFieldTouch((oldArray) => [
                                          ...oldArray,
                                          emptyEmailsField,
                                        ]);
                                      }}
                                      disabled={
                                        formik.values.emails.length >= 5
                                      }
                                    >
                                      {t("افزودن ایمیل")}
                                    </Button>
                                  </div>
                                </div>
                                {formik?.values?.emails?.map(
                                  (emails, index) => (
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
                                            {Array.isArray(
                                              formik.errors.emails
                                            ) && Array.isArray(emailsFieldTouch)
                                              ? formik.errors.emails[index]
                                                ?.emailAddress &&
                                              emailsFieldTouch[index]
                                                ?.emailAddress && (
                                                <div className="error-msg">
                                                  {t(
                                                    formik.errors.emails[
                                                      index
                                                    ]?.emailAddress
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
                                              let temp =
                                                emailsFieldTouch.filter(
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
                                  )
                                )}
                              </React.Fragment>
                            )}
                          ></FieldArray>
                        </div>
                        <div className="content col-lg-6 d-none d-lg-block"></div>
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
                            <span>{t("نوع حساب")}<span className="star">*</span></span>
                          </div>
                          <div className="wrapper">
                            <div>
                              <SelectBox
                                dataSource={comPublicList.filter((item) => item.comPublicTitleID == 2)}
                                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                onValueChanged={(e) =>
                                  formik.setFieldValue("accountType", e.value)
                                }
                                className="selectBox"
                                displayExpr="title"
                                noDataText={t("اطلاعات یافت نشد")}
                                itemRender={null}
                                placeholder=""
                                name="accountType"
                                id="accountType"
                                searchEnabled
                                showClearButton
                              //defaultValue={accountType[0]}       نشان دادن مقدار اولیه
                              />
                              {formik.touched.accountType &&
                                formik.errors.accountType &&
                                !formik.values.accountType ? (
                                <div className="error-msg">
                                  {t(formik.errors.accountType)}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="content col-lg-6 col-md-6 col-xs-12">
                          <div className="title">
                            <span>{t("شناسه حساب")}</span>
                          </div>
                          <div className="wrapper">
                            <div>
                              <input
                                className="form-input"
                                type="text"
                                id="accountID"
                                name="accountID"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.accountID}
                              />
                              {formik.touched.accountID &&
                                formik.errors.accountID ? (
                                <div className="error-msg">
                                  {t(formik.errors.accountID)}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="content col-lg-6 col-md-6 col-xs-12">
                          <div className="title">
                            <span>{t("کاربر")}</span>
                          </div>
                          <div className="wrapper">
                            <div className="divModal">
                              <input
                                className={`form-input modal-input ${i18n.dir() === "ltr" ? "ltr" : ""
                                  }`}
                                type="text"
                                id="user"
                                name="user"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.user}
                                disabled
                              />
                              <div
                                className={`modal-action-button  ${i18n.dir() == "ltr" ? "action-ltr" : ""
                                  }`}
                              >
                                <UserModal
                                  className="modal"
                                  getData={getUserData}
                                />
                                <Button>
                                  {" "}
                                  <CancelIcon onClick={clearUserField} />
                                </Button>
                              </div>

                              {formik.touched.user && formik.errors.user ? (
                                <div className="error-msg">
                                  {t(formik.errors.user)}
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
              <Accordion expanded={panel6} onChange={handlePanel6()}>
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
                                  type="text"
                                  id="desc"
                                  name="desc"
                                  style={{ width: "100%", height: "70px" }}
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
              <Accordion expanded={panel2} onChange={handlePanel2()}>
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
                              <span>{t("میزان جذابیت")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <SelectBox
                                  dataSource={comPublicList.filter((item) => item.comPublicTitleID == 3)}
                                  rtlEnabled={
                                    i18n.dir() == "ltr" ? false : true
                                  }
                                  onValueChanged={(e) =>
                                    formik.setFieldValue(
                                      "attractiveness",
                                      e.value
                                    )
                                  }
                                  className="selectBox"
                                  displayExpr="title"
                                  noDataText={t("اطلاعات یافت نشد")}
                                  itemRender={null}
                                  placeholder=""
                                  name="attractiveness"
                                  id="attractiveness"
                                  searchEnabled
                                  showClearButton
                                //defaultValue={attractiveness[0]}       نشان دادن مقدار اولیه
                                />
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
                            <div className="row">
                              <div className="content col-lg-6 col-md-6 col-xs-12">
                                <div className="title">
                                  <span>{t("صنعت")}<span className="star">*</span></span>
                                </div>
                                <div className="wrapper">
                                  <div>
                                    <SelectBox
                                      dataSource={industryArray}
                                      rtlEnabled={
                                        i18n.dir() == "ltr" ? false : true
                                      }
                                      onValueChanged={(e) =>
                                        formik.setFieldValue(
                                          "industry",
                                          e.value
                                        )
                                      }
                                      className="selectBox"
                                      noDataText={t("اطلاعات یافت نشد")}
                                      itemRender={null}
                                      placeholder=""
                                      name="industry"
                                      id="industry"
                                      searchEnabled
                                      showClearButton
                                    />
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
                              <div className="content col-lg-6 col-md-6 col-xs-12">
                                <div className="title">
                                  <span>{t("زیرصنعت")}<span className="star">*</span></span>
                                </div>
                                <div className="wrapper">
                                  <div>
                                    <SelectBox
                                      dataSource={renderSubIndustryArray(
                                        formik.values.industry
                                      )}
                                      rtlEnabled={
                                        i18n.dir() == "ltr" ? false : true
                                      }
                                      onValueChanged={(e) =>
                                        formik.setFieldValue(
                                          "subIndustry",
                                          e.value
                                        )
                                      }
                                      className="selectBox"
                                      noDataText={t("اطلاعات یافت نشد")}
                                      itemRender={null}
                                      placeholder=""
                                      name="subIndustry"
                                      id="subIndustry"
                                      searchEnabled
                                      showClearButton
                                    />
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
                            </div>
                          </div>

                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("نام دیگر")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="anotherName"
                                  name="anotherName"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.anotherName}
                                />
                                {formik.touched.anotherName &&
                                  formik.errors.anotherName ? (
                                  <div className="error-msg">
                                    {t(formik.errors.anotherName)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("کمپین")}</span>
                            </div>
                            <div className="wrapper">
                              <div className="divModal">
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
                              <span>{t("مالکیت")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="ownership"
                                  name="ownership"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.ownership}
                                />
                                {formik.touched.ownership &&
                                  formik.errors.ownership ? (
                                  <div className="error-msg">
                                    {t(formik.errors.ownership)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("عضو")}</span>
                            </div>
                            <div className="wrapper">
                              <div className="divModal">
                                <input
                                  className={`form-input modal-input ${i18n.dir() === "ltr" ? "ltr" : ""
                                    }`}
                                  type="text"
                                  id="member"
                                  name="member"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.member}
                                  disabled
                                />
                                <div
                                  className={`modal-action-button  ${i18n.dir() == "ltr" ? "action-ltr" : ""
                                    }`}
                                >
                                  <MemberModal
                                    className="modal"
                                    getData={getMemberData}
                                  />
                                  <Button>
                                    {" "}
                                    <CancelIcon onClick={clearMemberField} />
                                  </Button>
                                </div>

                                {formik.touched.member &&
                                  formik.errors.member ? (
                                  <div className="error-msg">
                                    {t(formik.errors.member)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("کد اقتصادی")}</span>
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
                                  onBlur={formik.handleBlur}
                                  value={formik.values.ecoCode}
                                />
                                {formik.touched.ecoCode &&
                                  formik.errors.ecoCode ? (
                                  <div className="error-msg">
                                    {t(formik.errors.ecoCode)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("شماره ثبت")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="subNumber"
                                  name="subNumber"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.subNumber}
                                />
                                {formik.touched.subNumber &&
                                  formik.errors.subNumber ? (
                                  <div className="error-msg">
                                    {t(formik.errors.subNumber)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("شماره ملی/شناسه ملی")}</span>
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
                                {formik.touched.nationalNum &&
                                  formik.errors.nationalNum ? (
                                  <div className="error-msg">
                                    {t(formik.errors.nationalNum)}
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
                  <Typography>{t("اطلاعات آدرس")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="form-design">
                    <div className="row">
                      <div className="col-md-6 col-12">
                        <div className="row">
                          <div className="content col-12">
                            <div className="title">
                              <span>
                                {" "}
                                {t("منطقه جغرافیایی ارسال صورت حساب")}{" "}
                                <span className="star">*</span>
                              </span>
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
                                  id="geographyCode"
                                  name="geographyCode"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.geographyCode}
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
                              {formik.touched.geographyCode &&
                                formik.errors.geographyCode &&
                                !formik.values.geographyCode ? (
                                <div className="error-msg">
                                  {t(formik.errors.geographyCode)}
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
                                  <span>{t("آدرس ارسال صورت حساب")}</span>
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
                              <span> {t("منطقه جغرافیایی ارسال کالا")} </span>
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
                                  id="otherGeographicalArea"
                                  name="otherGeographicalArea"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.otherGeographicalArea}
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
                                  id="otherstate"
                                  name="otherstate"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.otherstate}
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
                                  id="othercity"
                                  name="othercity"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.othercity}
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
                                  <span>{t("آدرس ارسال کالا")}</span>
                                </div>
                                <div className="wrapper">
                                  <div>
                                    <input
                                      className="form-input"
                                      type="text"
                                      id="otheraddress"
                                      name="otheraddress"
                                      style={{ width: "100%" }}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.otheraddress}
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
                                      id="otherlatitude"
                                      name="otherlatitude"
                                      style={{ width: "100%" }}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.otherlatitude}
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
                                      id="otherlongitude"
                                      name="otherlongitude"
                                      style={{ width: "100%" }}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.otherlongitude}
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

              <Accordion expanded={panel4} onChange={handlePanel4()}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1b-content"
                  id="panel1b-header"
                >
                  <Typography>{t("اطلاعات اعتبارسنجی")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="form-design">
                    <div className="row ">
                      <div className="col-lg-12 col-12">
                        <div className="row">
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("وضعیت اعتبار")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <SelectBox
                                  dataSource={validityStatus}
                                  rtlEnabled={
                                    i18n.dir() == "ltr" ? false : true
                                  }
                                  onValueChanged={(e) =>
                                    formik.setFieldValue(
                                      "validityStatus",
                                      e.value
                                    )
                                  }
                                  className="selectBox"
                                  noDataText={t("اطلاعات یافت نشد")}
                                  itemRender={null}
                                  placeholder=""
                                  name="validityStatus"
                                  id="validityStatus"
                                  searchEnabled
                                  showClearButton
                                //defaultValue={validityStatus[0]}       نشان دادن مقدار اولیه
                                />
                                {formik.touched.validityStatus &&
                                  formik.errors.validityStatus &&
                                  !formik.values.validityStatus ? (
                                  <div className="error-msg">
                                    {t(formik.errors.validityStatus)}
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
                              <span>{t("نوع اعتبار")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <SelectBox
                                  dataSource={validityType}
                                  rtlEnabled={
                                    i18n.dir() == "ltr" ? false : true
                                  }
                                  onValueChanged={(e) =>
                                    formik.setFieldValue(
                                      "validityType",
                                      e.value
                                    )
                                  }
                                  className="selectBox"
                                  noDataText={t("اطلاعات یافت نشد")}
                                  itemRender={null}
                                  placeholder=""
                                  name="validityType"
                                  id="validityType"
                                  searchEnabled
                                  showClearButton
                                //defaultValue={creditStatus[0]}       نشان دادن مقدار اولیه
                                />
                                {formik.touched.validityType &&
                                  formik.errors.validityType &&
                                  !formik.values.validityType ? (
                                  <div className="error-msg">
                                    {t(formik.errors.validityType)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>
                                {t("تاریخ انقضا")}
                                <span className="star">*</span>
                              </span>
                            </div>
                            <div className="wrapper date-picker position-relative">
                              <DatePicker
                                name={"expireTime"}
                                id={"expireTime"}
                                editable={false}
                                ref={dateRef}
                                calendar={renderCalendarSwitch(i18n.language)}
                                locale={renderCalendarLocaleSwitch(
                                  i18n.language
                                )}
                                onBlur={formik.handleBlur}
                                onChange={(val) => {
                                  formik.setFieldValue(
                                    "expireTime",
                                    julianIntToDateTime(val.toJulianDay())
                                  );
                                }}
                                value={getLangDate(i18n.language , formik.values.expireTime)}
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
                            {formik.touched.expireTime &&
                              formik.errors.expireTime &&
                              !formik.values.expireTime ? (
                              <div className="error-msg">
                                {t(formik.errors.expireTime)}
                              </div>
                            ) : null}
                          </div>

                          <div
                            className="content col-lg-6 col-md-6 col-xs-12"
                            onFocus={() => dateRef?.current?.closeCalendar()}
                          >
                            <div className="title">
                              <span>{t("منبع اعتبار")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <SelectBox
                                  dataSource={validitySource}
                                  rtlEnabled={
                                    i18n.dir() == "ltr" ? false : true
                                  }
                                  onValueChanged={(e) =>
                                    formik.setFieldValue(
                                      "validitySource",
                                      e.value
                                    )
                                  }
                                  className="selectBox"
                                  noDataText={t("اطلاعات یافت نشد")}
                                  itemRender={null}
                                  placeholder=""
                                  name="validitySource"
                                  id="validitySource"
                                  searchEnabled
                                  showClearButton
                                //defaultValue={creditStatus[0]}       نشان دادن مقدار اولیه
                                />
                                {formik.touched.validitySource &&
                                  formik.errors.validitySource &&
                                  !formik.values.validitySource ? (
                                  <div className="error-msg">
                                    {t(formik.errors.validitySource)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("سقف اعتبار")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="text"
                                  id="validityLimit"
                                  name="validityLimit"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.validityLimit}
                                />
                                {formik.touched.validityLimit &&
                                  formik.errors.validityLimit ? (
                                  <div className="error-msg">
                                    {t(formik.errors.validityLimit)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("تخفیف فروش (%)")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input"
                                  type="number"
                                  id="saleDiscount"
                                  name="saleDiscount"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.saleDiscount}
                                />
                                {formik.touched.saleDiscount &&
                                  formik.errors.saleDiscount ? (
                                  <div className="error-msg">
                                    {t(formik.errors.saleDiscount)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                              <span>{t("توضیحات منبع اعتبار")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <textarea
                                  className="form-input"
                                  type="text"
                                  id="validitySourceDesc"
                                  name="validitySourceDesc"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.validitySourceDesc}
                                />
                                {formik.touched.validitySourceDesc &&
                                  formik.errors.validitySourceDesc ? (
                                  <div className="error-msg">
                                    {t(formik.errors.validitySourceDesc)}
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
                  <Typography>{t("شبکه اجتماعی")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="form-design">
                    <div className="row ">
                      <div className="col-lg-12 col-12">
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
                  onClick={id != null ? updateAccount : () => {
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

export default CreateAccount;
