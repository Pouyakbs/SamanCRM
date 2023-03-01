import React, { useEffect, useRef, useState } from "react";

import { FieldArray, Formik, FormikProvider, useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CancelIcon from '@mui/icons-material/Cancel';
import DataGrid, {
    Column,
    FilterRow,
    HeaderFilter,
    SearchPanel,
} from "devextreme-react/data-grid";
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography, useTheme } from "@mui/material";

import { useTranslation } from "react-i18next";
import { findRenderedComponentWithType } from "react-dom/test-utils";
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Map from '../../../components/map'
import CircularProgress from '@mui/material/CircularProgress';
import { SelectBox } from "devextreme-react";
import UserModal from "../../../components/Modals/CluesModals/UserModal"
import CampaignModal from "../../../components/Modals/CluesModals/CampaignModal"
import { julianIntToDate, julianIntToDateTime } from "../../../utils/dateConvert";
import CountryTreeView from "../../../components/CountryComponent/CountryTreeView";
import { renderCalendarSwitch, renderCalendarLocaleSwitch } from '../../../utils/calenderLang'
import DataSource from 'devextreme/data/data_source';
import useCountryList from '../../../customHook/useCountryList'
import axios from "axios";
import { history } from "../../../utils/history";
import { useSearchParams } from "react-router-dom"
import DateObject from "react-date-object";
import { getLangDate } from "../../../utils/getLangDate";


const Factor = [];


export const NewClue = () => {
    ////////////////////////////////states/////////////////////////////////

    const { t, i18n } = useTranslation();
    const [SearchParams] = useSearchParams()
    const id = SearchParams.get("id")
    const countryList = useCountryList()
    const appConfig = window.globalConfig;
    // const [alignment, setAlignment] = React.useState("");
    const theme = useTheme();
    const [factor, setFactor] = React.useState(Factor);
    const [clueDetail, setClueDetail] = useState([]);
    const [result, setResult] = useState();
    const [inputState, setInputState] = useState(1)
    /////////////////////////////////dinamic add//////////////////////////
    const emptyContact = { prefixNamePhoneNumber: '', phoneNumber: "", prefixNumberPhoneNumber: "", internal: '', mainPhone: false, fax: false, mobile: false };
    const emptyContactFieldsTouch = { prefixNamePhoneNumber: false, phoneNumber: false, prefixNumberPhoneNumber: false, internal: false, mainPhone: false, fax: false, mobile: false };
    const [contactFieldsTouch, setContactFieldsTouch] = useState([emptyContactFieldsTouch])
    const emptyEmailsField = { emailAddress: '' };
    const emptyEmailsFieldTouch = { emailAddress: false };
    const [emailsFieldTouch, setEmailsFieldTouch] = useState([emptyEmailsFieldTouch])
    ///////////////////////////////formik/////////////////////////////////
    const phoneRegMatch = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
    const urlRegMatch = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
    const nationalIdRegMatch = /^[0-9]{10}$/
    const linkedInRegMatch = /(ftp|http|https):\/\/?((www|\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    const instagramRegMatch = /^(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am|instagr.com)\/(\w+)/
    const facebookRegMatch = /^(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/
    const twitterRegMatch = /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/
    const iranPostalCodeRegMatch = /^\b(?!(\d)\1{ Yup.string().3})[13-9]{4}[1346-9][013-9]{5}\b/
    const dateRef = useRef()
    const callComponent = () => {
        history.navigate(`/sale/Clues/ClueManagement`);
    };
    const formik = useFormik({
        validateOnChange: false,
        initialValues: {
            id: Math.floor(Math.random() * 1000),
            type: { id: 1, value: t("حقوقی") },
            nickName: "",
            firstName: "",
            lastName: "",
            accountName: "",
            clueSource: "",
            website: "",
            segment: "",
            status: "",
            desc: "",
            attractiveness: "",
            clueCampaign: "",
            industry: "",
            subIndustry: "",
            refferedBy: "",
            birthDate: new DateObject(),
            nationalCode: "",
            ecoCode: "",
            subNumber: "",
            geographyCode: "",
            otherGeographyCode: "",
            country: "",
            city: "",
            state: "",
            lat: '',
            long: '',
            address: '',
            postalCode: "",
            otherCountry: "",
            otherCity: "",
            otherState: "",
            otherLat: '',
            otherLong: '',
            otherAddress: '',
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
            firstName: Yup.string()
                .max(30, "نام باید شامل 30 حرف یا کمتر باشد")
                .when("type", (type) => {
                    if (type.id == 1)
                        return Yup.string().required("نام سرنخ الزامی است")
                }),
            firstName: Yup.string()
                .max(20, "نام باید شامل 20 حرف یا کمتر باشد")
                .when("type", (type) => {
                    if (type.id == 2)
                        return Yup.string().required("نام الزامیست")
                }),
            lastName: Yup.string()
                .max(20, "نام خانوادگی باید شامل 20 حرف یا کمتر باشد")
                .when("type", (type) => {
                    if (type.id == 2)
                        return Yup.string().required("نام خانوادگی الزامیست")
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
                    phoneNumber: Yup.string()
                        .matches(phoneRegMatch, "شماره تلفن صحیح نمیباشد"),
                    internal: Yup.number().typeError("تنها عدد مجاز است")
                })

            ),
            emails: Yup.array(
                Yup.object({
                    emailAddress: Yup.string().email("ایمیل صحیح نمیباشد"),
                })
            ),
            website: Yup.string()
                .matches(urlRegMatch, "وب سایت صحیح نمیباشد"),
            segment: Yup.string(),
            desc: Yup.string(),
            birthDate: Yup.date()
                .required("انتخاب تاریخ الزامی است"),
            nationalCode: Yup.string()
                .matches(nationalIdRegMatch, "کد ملی صحیح نمیباشد"),
            ecoCode: Yup.number().typeError("تنها عدد مجاز است"),

            linkedIn: Yup.string()
                .matches(linkedInRegMatch, "آدرس لینکدین صحیح نمیباشد"),
            instagram: Yup.string()
                .matches(instagramRegMatch, "آدرس اینستاگرام صحیح نمیباشد"),
            blog: Yup.string()
                .matches(urlRegMatch, "آدرس بلاگ صحیح نمیباشد"),
            facebook: Yup.string()
                .matches(facebookRegMatch, "آدرس فیسبوک صحیح نمیباشد"),
            twitter: Yup.string()
                .matches(twitterRegMatch, "آدرس توییتر صحیح نمیباشد"),
        }),
        onSubmit: (values) => {
            var contectField = JSON.stringify(values.contactFields);
            var email = JSON.stringify(values.emails);
            values.contactFields = contectField;
            values.emails = email;
            values.type = values.type.value
            axios
                .post(`${appConfig.BaseURL}/api/clues`, values)
                .then((res) => setResult(res.data.data));
            factorSub();
            callComponent()
        },
    });

    useEffect(() => {
        if (id != null) {
            axios
                .get(`${appConfig.BaseURL}/api/clues/${id}`)
                .then((res) => {
                    setClueDetail(res.data.data)
                    formik.setFieldValue("nickname", res.data.data.nickname)
                    formik.setFieldValue("firstName", res.data.data.firstName)
                    formik.setFieldValue("lastName", res.data.data.lastName)
                    formik.setFieldValue("accountName", res.data.data.accountName)
                    formik.setFieldValue("clueSource", res.data.data.clueSource)
                    formik.setFieldValue("website", res.data.data.website)
                    formik.setFieldValue("segment", res.data.data.segment)
                    formik.setFieldValue("status", res.data.data.status)
                    formik.setFieldValue("desc", res.data.data.desc)
                    formik.setFieldValue("attractiveness", res.data.data.attractiveness)
                    formik.setFieldValue("clueCampaign", res.data.data.clueCampaign)
                    formik.setFieldValue("industry", res.data.data.industry)
                    formik.setFieldValue("subIndustry", res.data.data.subIndustry)
                    formik.setFieldValue("refferedBy", res.data.data.refferedBy)
                    formik.setFieldValue("birthDate", res.data.data.birthDate)
                    formik.setFieldValue("nationalCode", res.data.data.nationalCode)
                    formik.setFieldValue("ecoCode", res.data.data.ecoCode)
                    formik.setFieldValue("subNumber", res.data.data.subNumber)
                    formik.setFieldValue("geographyCode", res.data.data.geographyCode)
                    formik.setFieldValue("otherGeographyCode", res.data.data.otherGeographyCode)
                    formik.setFieldValue("country", res.data.data.country)
                    formik.setFieldValue("city", res.data.data.city)
                    formik.setFieldValue("state", res.data.data.state)
                    formik.setFieldValue("lat", res.data.data.lat)
                    formik.setFieldValue("long", res.data.data.long)
                    formik.setFieldValue("address", res.data.data.address)
                    formik.setFieldValue("postalCode", res.data.data.postalCode)
                    formik.setFieldValue("otherCountry", res.data.data.otherCountry)
                    formik.setFieldValue("othercity", res.data.data.othercity)
                    formik.setFieldValue("otherstate", res.data.data.otherstate)
                    formik.setFieldValue("otherLat", res.data.data.otherLat)
                    formik.setFieldValue("otherLong", res.data.data.otherLong)
                    formik.setFieldValue("otherAddress", res.data.data.otherAddress)
                    formik.setFieldValue("otherPostalCode", res.data.data.otherPostalCode)
                    formik.setFieldValue("linkedIn", res.data.data.linkedIn)
                    formik.setFieldValue("instagram", res.data.data.instagram)
                    formik.setFieldValue("blog", res.data.data.blog)
                    formik.setFieldValue("facebook", res.data.data.facebook)
                    formik.setFieldValue("twitter", res.data.data.twitter)
                })
        }
    }, [id]);

    const updateClue = (values) => {
        if (values != null) {
            formik.values.contactFields = JSON.stringify(formik.values.contactFields);
            formik.values.emails = JSON.stringify(formik.values.emails);
            formik.values.type = formik.values.type.value
            console.log("formik.values", formik.values)
            let isSuccess = false
            axios
                .put(`${appConfig.BaseURL}/api/Clues/Update/${id}`, formik.values)
                .then((res) => {
                    setResult(res.data)
                    isSuccess = true
                })
                .finally(() => {
                    if (isSuccess = true) {
                        history.navigate(`/sale/Clues/ClueManagement`)
                    }
                })
        }
    };
    ////////////////////////////select box array/////////////////////////////////////
    const types = [
        { id: 1, value: t("حقوقی") },
        { id: 2, value: t("حقیقی") }
    ];
    const typesDataSource = new DataSource({
        store: {
            type: 'array',
            data: types,
            key: 'id',
        },
    });
    const prefixNameArayy = [t("آقای"), t("خانم"), t("مهندس"), t("دکتر"), t("استاد"), t("آقای دکتر"), t("خانم دکتر"), t("آقای مهندس"), t("خانم مهندس")]
    const leadSourceArray = [t("کنفرانس"), t("نمایشگاه"), t("معرفی پرسنل"), t("معرفی مشتریان"), t("معرفی دیگران"), t("وب"), t("بازاریابی حضوری"), t("بازاریابی ایمیلی")
        , t("بازاریابی تلفنی"), t("معرفی شرکای تجاری"), t("سایر")]
    const prefixNamePhoneNumberArray = [t("دفتر"), t("همراه"), t("فکس"), t("کارخانه"), t("منزل"), t("واتس اپ"), t("سایر")]
    const conditionArray = [t("جدید"), t("اختصاص یافته"), t("درجریان"), t("تبدیل شده"), t("مجدد فعال شده"), t("از دست رفته")]
    const levelOfAttractivenessArray = [t("زیاد"), t("متوسط"), t("کم")]
    const industryArray = [t("تولید فرایندی"), t("تولید گسسته"), t("خدمات عمومی"), t("خدماتی"), t("مصرفی")]
    const subIndustryArray = []
    const subIndustryArray1 = [t("بسته‌بندی"), t("چوب"), t("دارویی"), t("سیم و کابل"), t("شیمیایی و پتروشیمی"),
    t("فلزات اساسی"), t("کاغذ"), t("لاستیک و پلاستیک"), t("لوازم پزشکی و علمی"), t("مبلمان"), t("محصولات فلزی"), t("مصالح ساختمانی"),
    t("معدن‌کاوی"), t("نساجی"), t("نفت و گاز")]
    const subIndustryArray2 = [t("تجهیزات دفاعی و فضایی"), t("تکنولوژی‌های پیشرفته"), t("ماشین‌آلات و تجهیزات صنعتی"),
    t("مهندسی ساختمان عملیات عمرانی"), t("وسایل نقلیه و خدمات وابسته")]
    const subIndustryArray3 = [t("امنیت عمومی"), t("امنیتی و دفاعی"), t("پست"), t("تحقیقات و تحصیلات تکمیلی"), t("سلامت و بهداشت")]
    const subIndustryArray4 = [t("آژانس‌های خدمات مسافرتی"), t("انتشارات و رسانه‌ها"), t("بانک"), t("بیمه"), t("حمل و نقل و انبارداری"),
    t("خدمات حرفه‌ای و مشاوره"), t("خدمات شهری"), t("سرگرمی و تفریحات"), t("مخابرات"), t("هتل‌داری و رستوران")]
    const subIndustryArray5 = [t("خرده‌فروشی"), t("عمده‌فروشی و پخش"), t("کفش و محصولات چرمی"), t("لوازم خانگی"), t("محصولات آرایشی و بهداشتی"),
    t("مواد غذایی، آشامیدنی و دخانیات")]
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
    ////////////////////////////open & close pannel//////////////////////////////////
    const [panel1, setPanel1] = React.useState(true);
    const [panel3, setPanel3] = React.useState(true);
    const [panel4, setPanel4] = React.useState(true);
    const [panel5, setPanel5] = React.useState(true);

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
    }
    useEffect(() => {

        if (formik.isSubmitting) {
            let condition1 = !!((formik.touched.firstName && formik.errors.firstName) ||
                (formik.touched.lastName && formik.errors.lastName) ||
                (formik.touched.nickName && formik.errors.nickName) ||
                (formik.touched.accountName && formik.errors.accountName) ||
                (formik.touched.contactFields && formik.errors.contactFields) ||
                (formik.touched.emails && formik.errors.emails) ||
                (formik.touched.website && formik.errors.website))
            setPanel1(condition1 || panel1)

            let condition3 = !!((formik.touched.birthDate && formik.errors.birthDate) ||
                (formik.touched.nationalCode && formik.errors.nationalCode) ||
                (formik.touched.ecoCode && formik.errors.ecoCode))
            setPanel3(condition3 || panel3)

            let condition4 = !!((formik.touched.postalCode && formik.errors.postalCode) ||
                (formik.touched.otherPostalCode && formik.errors.otherPostalCode))
            setPanel4(condition4 || panel4)

            let condition5 = !!((formik.touched.linkedIn && formik.errors.linkedIn) ||
                (formik.touched.instagram && formik.errors.instagram) ||
                (formik.touched.blog) && (formik.errors.blog) ||
                (formik.touched.facebook && formik.errors.facebook) ||
                (formik.touched.twitter && formik.errors.twitter))
            setPanel5(condition5 || panel5)
        }
    }, [formik.touched, formik.errors])
    //////////////////////////////////modals//////////////////////////////////////////

    function getClueCampaignData(val) {
        formik.setFieldValue('clueCampaign', val.clueCampaign)
    }
    function clearClueCampaignField() {
        formik.setFieldValue('clueCampaign', "")
    }
    ////////////////////////copy function////////////////////////////////////////
    const copy = () => {
        formik.setFieldValue('otherGeographyCode', formik.values.geographyCode)
        formik.setFieldValue('otherCountry', formik.values.country)
        formik.setFieldValue('otherState', formik.values.state)
        formik.setFieldValue('otherCity', formik.values.city)
        formik.setFieldValue('otherPostalCode', formik.values.postalCode)
        formik.setFieldValue('otherAddress', formik.values.address)
        formik.setFieldValue('otherLat', formik.values.lat)
        formik.setFieldValue('otherLong', formik.values.long)
    }
    //////////////////////Address Funcs/////////////////////////////////////////
    const [location, setLocation] = useState({})
    const [address, setAddress] = useState()
    const [addressLoading, setAddressLoading] = useState(false)
    const [location1, setLocation1] = useState({})
    const [address1, setAddress1] = useState()
    const [addressLoading1, setAddressLoading1] = useState(false)
    function getInvoiceAddress(val) {
        formik.setFieldValue('country', val[0])
        formik.setFieldValue('state', val[1])
        formik.setFieldValue('city', val[2])
        formik.setFieldValue('geographyCode', `${val[0]}، ${val[1]}، ${val[2]}`)
    }
    function clearInvoiceAddress() {
        formik.setFieldValue('country', "")
        formik.setFieldValue('state', "")
        formik.setFieldValue('city', "")
        formik.setFieldValue('geographyCode', "")
    }
    function getAddresstwo(val) {
        formik.setFieldValue('otherCountry', val[0])
        formik.setFieldValue('otherState', val[1])
        formik.setFieldValue('otherCity', val[2])
        formik.setFieldValue('otherGeographyCode', `${val[0]}، ${val[1]}، ${val[2]}`)

    }
    function clearAddresstwo() {
        formik.setFieldValue('otherCountry', "")
        formik.setFieldValue('otherState', "")
        formik.setFieldValue('otherCity', "")
        formik.setFieldValue('otherGeographyCode', "")
    }
    function getMapData(address, location) {
        setLocation(location)
        setAddress(address)
    }
    function getMapData1(address, location) {
        setLocation1(location)
        setAddress1(address)
    }
    useEffect(() => {

        if (Object.keys(location).length) {
            formik.setFieldValue('lat', `${location?.lat}`)
            formik.setFieldValue('long', `${location?.lng}`)
        }
    }, [location])
    useEffect(() => {
        if (Object.keys(location1).length) {
            formik.setFieldValue('otherLat', `${location1?.lat}`)
            formik.setFieldValue('otherLong', `${location1?.lng}`)
        }
    }, [location1])
    useEffect(() => {
        address && formik.setFieldValue('address', address)
    }, [address])
    useEffect(() => {
        address1 && formik.setFieldValue('otherAddress', address1)
    }, [address1])

    /////////////////////////////////submit//////////////////////////////////////////
    const factorSub = () => {
        swal({
            title: t("اطلاعات سرنخ با موفقیت ثبت شد"),
            icon: "success",
            button: t("باشه"),
        });
    };


    ///////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <div id="form" style={{ display: "block", marginRight: "10px" }}>
                {/*<h1 className='main-title'>*/}
                {/*    {t("ایجاد سرنخ")}*/}
                {/*</h1>*/}
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <div
                            className="form-template"
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
                                    <Typography>{t("اطلاعات سرنخ")}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="form-design">
                                        <div className="row">
                                            <div className="content col-lg-6 col-md-12 col-xs-12">
                                                <div className="title">
                                                    <div >
                                                        <span>{t("نوع")}</span>
                                                    </div>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={typesDataSource}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            onValueChanged={(e) => {
                                                                formik.setFieldValue('type', e.value)
                                                                setInputState(e.value.id)
                                                                formik.setFieldValue('firstName', '')
                                                                formik.setFieldValue('lastName', '')
                                                                formik.setFieldValue('nickName', '')
                                                            }}
                                                            className='selectBox'
                                                            noDataText={t("اطلاعات یافت نشد")}
                                                            itemRender={null}
                                                            placeholder=''
                                                            name='type'
                                                            id='type'
                                                            defaultValue={types[0]}
                                                            displayExpr="value"
                                                        />
                                                        {formik.touched.type && formik.errors.type && !formik.values.type ?
                                                            (<div className='error-msg'>
                                                                {t(formik.errors.type)}
                                                            </div>) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            {inputState === 2 && (

                                                <>
                                                    <div className="content col-lg-2 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("لقب")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div>
                                                                <SelectBox
                                                                    dataSource={prefixNameArayy}
                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                    onValueChanged={(e) => formik.setFieldValue('nickName', e.value)}
                                                                    className='selectBox'
                                                                    noDataText='اطلاعات یافت نشد'
                                                                    itemRender={null}
                                                                    placeholder=''
                                                                    name='nickName'
                                                                    id='nickName'
                                                                    searchEnabled
                                                                //showClearButton           امکان پاک کردن فیلد
                                                                //defaultValue={measurementUnits[0]}       نشان دادن مقدار اولیه 
                                                                />
                                                                {formik.touched.nickName && formik.errors.nickName &&
                                                                    !formik.values.nickName ? (
                                                                    <div className='error-msg'>
                                                                        {t(formik.errors.nickName)}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-2 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("نام")}<span className="star">*</span></span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <input
                                                                className="form-input"
                                                                type="text"
                                                                id="firstName"
                                                                name="firstName"
                                                                style={{ width: "100%" }}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.firstName}
                                                            />
                                                            {formik.touched.firstName && formik.errors.firstName && formik.values.type.id == 2 ? (
                                                                <div className='error-msg'>
                                                                    {t(formik.errors.firstName)}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-2 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("نام خانوادگی")}<span className="star">*</span></span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <input
                                                                className="form-input"
                                                                type="text"
                                                                id="lastName"
                                                                name="lastName"
                                                                style={{ width: "100%" }}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.lastName}
                                                            />
                                                            {formik.touched.lastName && formik.errors.lastName && formik.values.type.id == 2 ? (
                                                                <div className='error-msg'>
                                                                    {t(formik.errors.lastName)}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div></>
                                            )}
                                            {inputState === 1 && (

                                                <div className="content col-lg-6 col-md-6 col-xs-12">
                                                    <div className="title">
                                                        <span>{t("نام")}<span className="star">*</span></span>
                                                    </div>
                                                    <div className="wrapper">
                                                        <div>
                                                            <input
                                                                className="form-input"
                                                                type="text"
                                                                id="firstName"
                                                                name="firstName"
                                                                style={{ width: "100%" }}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.firstName}
                                                            />
                                                            {formik.touched.firstName && formik.errors.firstName && formik.values.type.id == 1 ? (
                                                                <div className='error-msg'>
                                                                    {t(formik.errors.firstName)}
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                    </div>

                                                </div>
                                            )}
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <div className="accountName">
                                                        <span>{t("نام حساب")}</span>
                                                    </div>
                                                </div>
                                                <div className="wrapper">
                                                    <div className="divModal">
                                                        <input
                                                            className="form-input"
                                                            type="text"
                                                            id="accountName"
                                                            name="accountName"
                                                            style={{ width: "100%" }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.accountName}
                                                        />
                                                        {formik.touched.accountName && formik.errors.accountName ? (
                                                            <div className='error-msg'>
                                                                {t(formik.errors.accountName)}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">

                                                    <span>{t("منبع سرنخ")}</span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={leadSourceArray}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            onValueChanged={(e) => formik.setFieldValue('clueSource', e.value)}
                                                            className='selectBox'
                                                            noDataText={t("اطلاعات یافت نشد")}
                                                            itemRender={null}
                                                            placeholder=''
                                                            name='clueSource'
                                                            id='clueSource'
                                                            searchEnabled
                                                            showClearButton
                                                        />
                                                        {formik.touched.clueSource && formik.errors.clueSource && !formik.values.clueSource ?
                                                            (<div className='error-msg'>
                                                                {t(formik.errors.clueSource)}
                                                            </div>) : null}
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


                                                                    <Button className="AddRow"
                                                                        disabled={formik.values.contactFields.length >= 5}
                                                                        onClick={() => {
                                                                            formik.values.contactFields.length < 5 && push(emptyContact)

                                                                            setContactFieldsTouch(oldArray => [...oldArray, emptyContactFieldsTouch])

                                                                        }}>
                                                                        {t("افزودن شماره تماس")}</Button>

                                                                </div>
                                                            </div>
                                                            {formik?.values?.contactFields?.map((contactFields, index) => (
                                                                <div className='row  mb-0' key={index}>
                                                                    <div className="content col-lg-2 col-md-6 col-xs-12">
                                                                        <div className="title">
                                                                            <span>{t('تلفن')}</span>
                                                                        </div>
                                                                        <div className="wrapper">
                                                                            <div>
                                                                                <SelectBox
                                                                                    dataSource={prefixNamePhoneNumberArray}
                                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                                    onValueChanged={(e) => {
                                                                                        formik.setFieldValue(`contactFields[${index}].prefixNamePhoneNumber`, e.value)
                                                                                        switch (e.value) {
                                                                                            case t("فکس"):
                                                                                                formik.setFieldValue(`contactFields[${index}].fax`, true)
                                                                                                formik.setFieldValue(`contactFields[${index}].mobile`, false)
                                                                                                break;
                                                                                            case t("همراه"):
                                                                                                formik.setFieldValue(`contactFields[${index}].mobile`, true)
                                                                                                formik.setFieldValue(`contactFields[${index}].fax`, false)
                                                                                                break;
                                                                                        }
                                                                                    }}
                                                                                    className='selectBox'
                                                                                    placeholder=''
                                                                                    noDataText={t("اطلاعات یافت نشد")}
                                                                                    onBlur={() => {
                                                                                        let temp = contactFieldsTouch.map((item, i) => (
                                                                                            i === index ? { ...item, prefixNamePhoneNumber: true } : item
                                                                                        ))
                                                                                        setContactFieldsTouch(temp)
                                                                                    }}
                                                                                    itemRender={null}
                                                                                    name={`contactFields.${index}.prefixNamePhoneNumber`}
                                                                                    id='prefixNamePhoneNumber'
                                                                                    value={formik.values.contactFields[index].prefixNamePhoneNumber}
                                                                                    searchEnabled
                                                                                    showClearButton
                                                                                />
                                                                                {Array.isArray(formik.errors.contactFields) && Array.isArray(contactFieldsTouch) ?
                                                                                    formik.errors.contactFields[index]?.prefixNamePhoneNumber && contactFieldsTouch[index]?.prefixNamePhoneNumber &&
                                                                                    <div className='error-msg'>
                                                                                        {t(formik.errors.contactFields[index]?.prefixNamePhoneNumber)}
                                                                                    </div> : ''}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="content col-lg-3 col-md-6 col-xs-12">
                                                                        <div className="title">
                                                                            <span>{t('شماره تلفن')}</span>
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
                                                                                        let temp = contactFieldsTouch.map((item, i) => (
                                                                                            i === index ? { ...item, phoneNumber: true } : item
                                                                                        ))
                                                                                        setContactFieldsTouch(temp)
                                                                                    }}
                                                                                    value={formik.values.contactFields[index].phoneNumber}
                                                                                />
                                                                                {Array.isArray(formik.errors.contactFields) && Array.isArray(contactFieldsTouch) ?
                                                                                    formik.errors.contactFields[index]?.phoneNumber && contactFieldsTouch[index]?.phoneNumber &&
                                                                                    <div className='error-msg'>
                                                                                        {t(formik.errors.contactFields[index]?.phoneNumber)}
                                                                                    </div> : ''}
                                                                            </div>
                                                                        </div>


                                                                    </div>
                                                                    <div className="content col-lg-2 col-md-6 col-xs-12">
                                                                        <div className="title">

                                                                            <span>{t('پیش شماره')}</span>
                                                                        </div>
                                                                        <div className="wrapper">
                                                                            <div>
                                                                                <SelectBox
                                                                                    dataSource={countryList}
                                                                                    displayExpr="Name"
                                                                                    valueExpr="value"
                                                                                    onValueChanged={(e) =>
                                                                                        e?.value && formik.setFieldValue(`contactFields.[${index}].prefixNumberPhoneNumber`, e?.value)}


                                                                                    className='selectBox'
                                                                                    noDataText='اطلاعات یافت نشد'
                                                                                    onBlur={() => {

                                                                                        let temp = contactFieldsTouch.map((item, i) => (
                                                                                            i === index ? { ...item, prefixNumberPhoneNumber: true } : item
                                                                                        ))
                                                                                        setContactFieldsTouch(temp)
                                                                                    }}
                                                                                    placeholder=''
                                                                                    name={`contactFields.${index}.prefixNumberPhoneNumber`}
                                                                                    id={`contactFields.${index}.prefixNumberPhoneNumber`}
                                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                                    searchEnabled
                                                                                />
                                                                                {Array.isArray(formik.errors.contactFields) && Array.isArray(contactFieldsTouch) ?
                                                                                    formik.errors.contactFields[index]?.prefixNumberPhoneNumber && contactFieldsTouch[index]?.prefixNumberPhoneNumber &&
                                                                                    <div className='error-msg'>
                                                                                        {t(formik.errors.contactFields[index]?.prefixNumberPhoneNumber)}
                                                                                    </div> : ''}

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
                                                                                        let temp = contactFieldsTouch.map((item, i) => (
                                                                                            i === index ? { ...item, internal: true } : item
                                                                                        ))
                                                                                        setContactFieldsTouch(temp)
                                                                                    }}
                                                                                    value={formik.values.contactFields[index].internal}
                                                                                />
                                                                                {Array.isArray(formik.errors.contactFields) && Array.isArray(contactFieldsTouch) ?
                                                                                    formik.errors.contactFields[index]?.internal && contactFieldsTouch[index]?.internal &&
                                                                                    <div className='error-msg'>
                                                                                        {t(formik.errors.contactFields[index]?.internal)}
                                                                                    </div> : ''}
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
                                                                                    checked={formik.values.contactFields[index].mainPhone}

                                                                                    onChange={(e) => {
                                                                                        if (e.target.checked) {
                                                                                            for (let i = 0; i < formik.values.contactFields.length; i++) {
                                                                                                formik.setFieldValue(`contactFields[${i}].mainPhone`, false)
                                                                                            }
                                                                                            formik.setFieldValue(`contactFields[${index}].mainPhone`, true)
                                                                                        } else {
                                                                                            formik.setFieldValue(`contactFields[${index}].mainPhone`, false)
                                                                                        }
                                                                                    }}
                                                                                    onBlur={() => {
                                                                                        let temp = contactFieldsTouch.map((item, i) => (
                                                                                            i === index ? { ...item, mainPhone: true } : item
                                                                                        ))
                                                                                        setContactFieldsTouch(temp)
                                                                                    }}
                                                                                    value={formik.values.contactFields[index].mainPhone}
                                                                                />
                                                                                {Array.isArray(formik.errors.contactFields) && Array.isArray(contactFieldsTouch) ?
                                                                                    formik.errors.contactFields[index]?.mainPhone && contactFieldsTouch[index]?.mainPhone &&
                                                                                    <div className='error-msg'>
                                                                                        {t(formik.errors.contactFields[index]?.mainPhone)}
                                                                                    </div> : ''}
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
                                                                                    checked={formik.values.contactFields[index].fax}
                                                                                    onChange={formik.handleChange}
                                                                                    onBlur={() => {
                                                                                        let temp = contactFieldsTouch.map((item, i) => (
                                                                                            i === index ? { ...item, fax: true } : item
                                                                                        ))
                                                                                        setContactFieldsTouch(temp)
                                                                                    }}
                                                                                    value={formik.values.contactFields[index].fax}
                                                                                />
                                                                                {Array.isArray(formik.errors.contactFields) && Array.isArray(contactFieldsTouch) ?
                                                                                    formik.errors.contactFields[index]?.fax && contactFieldsTouch[index]?.fax &&
                                                                                    <div className='error-msg'>
                                                                                        {t(formik.errors.contactFields[index]?.fax)}
                                                                                    </div> : ''}
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
                                                                                    checked={formik.values.contactFields[index].mobile}
                                                                                    onChange={formik.handleChange}
                                                                                    onBlur={() => {
                                                                                        let temp = contactFieldsTouch.map((item, i) => (
                                                                                            i === index ? { ...item, internal: true } : item
                                                                                        ))
                                                                                        setContactFieldsTouch(temp)
                                                                                    }}
                                                                                    value={formik.values.contactFields[index].mobile}
                                                                                />
                                                                                {Array.isArray(formik.errors.contactFields) && Array.isArray(contactFieldsTouch) ?
                                                                                    formik.errors.contactFields[index]?.mobile && contactFieldsTouch[index]?.mobile &&
                                                                                    <div className='error-msg'>
                                                                                        {t(formik.errors.contactFields[index]?.mobile)}
                                                                                    </div> : ''}
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
                                                                                    remove(index)
                                                                                    let temp = contactFieldsTouch.filter((_, i) => i !== index)
                                                                                    setContactFieldsTouch(temp)
                                                                                }}
                                                                                className="remove-btn"
                                                                            >
                                                                                <DeleteIcon fontSize="medium" />
                                                                            </button>
                                                                        ) : null
                                                                        }
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </React.Fragment>
                                                    )}>
                                                </FieldArray>
                                            </div>
                                            <div className="content col-lg-6 col-md-12 col-xs-12">
                                                <FieldArray
                                                    name="emails"
                                                    render={({ push, remove }) => (
                                                        <React.Fragment>
                                                            <div className="row align-items-center mb-0">
                                                                <div className="content col-lg-6 col-md-12 col-xs-12">
                                                                    <Button className="AddRow"
                                                                        onClick={() => {
                                                                            formik.values.emails.length < 5 &&
                                                                                push(emptyEmailsField)

                                                                            setEmailsFieldTouch(oldArray => [...oldArray, emptyEmailsField])

                                                                        }



                                                                        }
                                                                        disabled={formik.values.emails.length >= 5}>
                                                                        {t("افزودن ایمیل")}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            {formik?.values?.emails?.map((emails, index) => (
                                                                <div className="row mb-0" key={index} style={{ display: 'flex' }}>
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
                                                                                        let temp = emailsFieldTouch.map((item, i) => (
                                                                                            i === index ? { ...item, emailAddress: true } : item
                                                                                        ))
                                                                                        setEmailsFieldTouch(temp)
                                                                                    }}
                                                                                    value={formik.values.emails[index].emailAddress}
                                                                                />
                                                                                {Array.isArray(formik.errors.emails) && Array.isArray(emailsFieldTouch) ?
                                                                                    formik.errors.emails[index]?.emailAddress && emailsFieldTouch[index]?.emailAddress &&
                                                                                    <div className='error-msg'>{t(formik.errors.emails[index]?.emailAddress)}</div> : ''}
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
                                                                                    remove(index)
                                                                                    let temp = emailsFieldTouch.filter((_, i) => i !== index)
                                                                                    setEmailsFieldTouch(temp)
                                                                                }}

                                                                                className="remove-btn"
                                                                            >
                                                                                <DeleteIcon fontSize="medium" />
                                                                            </button>
                                                                        ) : null
                                                                        }
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </React.Fragment>
                                                    )}>
                                                </FieldArray>
                                            </div>
                                            <div className="content col-lg-6 d-none d-lg-block"></div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <span>{t("وبسایت")}</span>
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
                                                            <div className='error-msg'>
                                                                {t(formik.errors.website)}
                                                            </div>
                                                        ) : null}
                                                    </div>


                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
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
                                                        {formik.touched.segment && formik.errors.segment ? (
                                                            <div className='error-msg'>
                                                                {t(formik.errors.segment)}
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
                                                            dataSource={conditionArray}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            onValueChanged={(e) => formik.setFieldValue('status', e.value)}
                                                            className='selectBox'
                                                            noDataText={t("اطلاعات یافت نشد")}
                                                            itemRender={null}
                                                            placeholder=''
                                                            name='status'
                                                            id='status'
                                                            searchEnabled
                                                            showClearButton
                                                        />

                                                        {formik.touched.status && formik.errors.status && !formik.values.status ?
                                                            (<div className='error-msg'>
                                                                {t(formik.errors.status)}
                                                            </div>) : null}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion >
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
                                                            style={{ width: "100%", height: '70px' }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.desc}
                                                        />
                                                        {formik.touched.desc && formik.errors.desc ? (
                                                            <div className='error-msg'>
                                                                {t(formik.errors.desc)}
                                                            </div>
                                                        ) : null}
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
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <span>{t("میزان جذابیت")}</span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={levelOfAttractivenessArray}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            onValueChanged={(e) => formik.setFieldValue('attractiveness', e.value)}
                                                            className='selectBox'
                                                            noDataText={t("اطلاعات یافت نشد")}
                                                            itemRender={null}
                                                            placeholder=''
                                                            name='attractiveness'
                                                            id='attractiveness'
                                                            searchEnabled
                                                            showClearButton
                                                        />
                                                        {formik.touched.attractiveness && formik.errors.attractiveness && !formik.values.attractiveness ?
                                                            (<div className='error-msg'>
                                                                {t(formik.errors.attractiveness)}
                                                            </div>) : null}
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
                                                            className="form-input"
                                                            type="text"
                                                            id="clueCampaign"
                                                            name="clueCampaign"
                                                            style={{ width: "100%" }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.clueCampaign}
                                                        />
                                                        {formik.touched.clueCampaign && formik.errors.clueCampaign ? (
                                                            <div className='error-msg'>
                                                                {t(formik.errors.clueCampaign)}
                                                            </div>
                                                        ) : null}
                                                        <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >
                                                            <CampaignModal className="iconModal" getData={getClueCampaignData} />
                                                            <Button className="cancelButton"> <CancelIcon onClick={clearClueCampaignField} /></Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="row">
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("صنعت")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div>
                                                                <SelectBox
                                                                    dataSource={industryArray}
                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
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
                                                                {formik.touched.industry && formik.errors.industry && !formik.values.industry ?
                                                                    (<div className='error-msg'>
                                                                        {t(formik.errors.industry)}
                                                                    </div>) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("زیرصنعت")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div>
                                                                <SelectBox
                                                                    dataSource={renderSubIndustryArray(formik.values.industry)}
                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
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
                                                                {formik.touched.subIndustry && formik.errors.subIndustry && !formik.values.subIndustry ?
                                                                    (<div className='error-msg'>
                                                                        {t(formik.errors.subIndustry)}
                                                                    </div>) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12" onFocus={() => dateRef?.current?.closeCalendar()}>
                                                <div className="title">
                                                    <span>{t("ارجاع شده توسط")}</span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <input
                                                            className="form-input"
                                                            type="text"
                                                            id="refferedBy"
                                                            name="refferedBy"
                                                            style={{ width: "100%" }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.refferedBy}
                                                        />
                                                        {formik.touched.refferedBy && formik.errors.refferedBy ? (
                                                            <div className='error-msg'>
                                                                {t(formik.errors.refferedBy)}
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
                                                <div className="wrapper date-picker position-relative"  >
                                                    <DatePicker
                                                        name="birthDate"
                                                        id="birthDate"
                                                        ref={dateRef}
                                                        editable={false}
                                                        maxDate={new Date()}
                                                        calendar={renderCalendarSwitch(i18n.language)}
                                                        locale={renderCalendarLocaleSwitch(i18n.language)}
                                                        calendarPosition="bottom-right"
                                                        onBlur={formik.handleBlur}
                                                        onChange={val => {
                                                            formik.setFieldValue('birthDate', julianIntToDateTime(val.toJulianDay()));
                                                        }}
                                                        value={getLangDate(i18n.language, formik.values.birthDate)}
                                                    />
                                                    <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                                                        <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal' /></div>
                                                    </div>
                                                    {formik.touched.birthDate && formik.errors.birthDate && !formik.values.birthDate ? (<div className='error-msg'>{t(formik.errors.birthDate)}</div>) : null}
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12" onFocus={() => dateRef?.current?.closeCalendar()}>
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
                                                        {formik.touched.nationalCode && formik.errors.nationalCode ? (
                                                            <div className='error-msg'>
                                                                {t(formik.errors.nationalCode)}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <span>{t("کداقتصادی")}</span>
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
                                                        {formik.touched.ecoCode && formik.errors.ecoCode ? (
                                                            <div className='error-msg'>
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
                                                        {formik.touched.subNumber && formik.errors.subNumber ? (
                                                            <div className='error-msg'>
                                                                {t(formik.errors.subNumber)}
                                                            </div>
                                                        ) : null}
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
                                    <Typography>{t("آدرس")}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="form-design">
                                        <div className="row">
                                            <div className='col-md-6 col-12'>
                                                <div className='row'>
                                                    <div className="content col-12">
                                                        <div className='title'>
                                                            <span> {t("منطقه جغرافيایی اصلی")} </span>
                                                        </div>
                                                        <div className='wrapper'>
                                                            <div className='d-flex' style={{ position: "relative" }}>
                                                                <input
                                                                    className='form-input'
                                                                    type="text"
                                                                    id="geographyCode"
                                                                    name="geographyCode"
                                                                    style={{ width: "100%" }}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.geographyCode}
                                                                    disabled
                                                                />
                                                                <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >
                                                                    <CountryTreeView className='modal' getAddress={getInvoiceAddress} />
                                                                    <Button><CancelIcon onClick={clearInvoiceAddress} /></Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-12">
                                                        <div className='title'>
                                                            <span> {t("کشور")} </span>
                                                        </div>
                                                        <div className='wrapper'>
                                                            <div className='d-flex' style={{ position: "relative" }}>
                                                                <input
                                                                    className='form-input'
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
                                                        <div className='title'>
                                                            <span> {t("استان")} </span>
                                                        </div>
                                                        <div className='wrapper'>
                                                            <div className='d-flex' style={{ position: "relative" }}>
                                                                <input
                                                                    className='form-input'
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
                                                        <div className='title'>
                                                            <span> {t("شهر")} </span>
                                                        </div>
                                                        <div className='wrapper'>
                                                            <div className='d-flex' style={{ position: "relative" }}>
                                                                <input
                                                                    className='form-input'
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
                                                                {formik.touched.postalCode && formik.errors.postalCode ? (
                                                                    <div className='error-msg'>
                                                                        {t(formik.errors.postalCode)}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-12' style={{ position: 'relative' }}>
                                                        {addressLoading ? <div className='loading-sec'><CircularProgress /></div> : ''}
                                                        <div className='row align-items-center'>
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
                                                                            id="lat"
                                                                            name="lat"
                                                                            style={{ width: "100%" }}
                                                                            onChange={formik.handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                            value={formik.values.lat}
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
                                                                            id="long"
                                                                            name="long"
                                                                            style={{ width: "100%" }}
                                                                            onChange={formik.handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                            value={formik.values.long}
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
                                            <div className='col-md-6 col-12'>
                                                <div className='row'>
                                                    <div className="content col-12">
                                                        <div className='title'>
                                                            <span> {t("منطقه جغرافيایی دیگر")} </span>
                                                        </div>
                                                        <div className='wrapper'>
                                                            <div className='d-flex' style={{ position: "relative" }}>
                                                                <input
                                                                    className='form-input'
                                                                    type="text"
                                                                    id="otherGeographyCode"
                                                                    name="otherGeographyCode"
                                                                    style={{ width: "100%" }}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.otherGeographyCode}
                                                                    disabled
                                                                />
                                                                <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >
                                                                    <CountryTreeView className='modal' getAddress={getAddresstwo} />
                                                                    <Button><CancelIcon onClick={clearAddresstwo} /></Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-12">
                                                        <div className='title'>
                                                            <span> {t("کشور")} </span>
                                                        </div>
                                                        <div className='wrapper'>
                                                            <div className='d-flex' style={{ position: "relative" }}>
                                                                <input
                                                                    className='form-input'
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
                                                        <div className='title'>
                                                            <span> {t("استان")} </span>
                                                        </div>
                                                        <div className='wrapper'>
                                                            <div className='d-flex' style={{ position: "relative" }}>
                                                                <input
                                                                    className='form-input'
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
                                                        <div className='title'>
                                                            <span> {t("شهر")} </span>
                                                        </div>
                                                        <div className='wrapper'>
                                                            <div className='d-flex' style={{ position: "relative" }}>
                                                                <input
                                                                    className='form-input'
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
                                                                {formik.touched.otherPostalCode && formik.errors.otherPostalCode ? (
                                                                    <div className='error-msg'>
                                                                        {t(formik.errors.otherPostalCode)}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-12' style={{ position: 'relative' }}>
                                                        {addressLoading1 ? <div className='loading-sec'><CircularProgress /></div> : ''}
                                                        <div className='row align-items-center'>
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
                                                                            id="otherLat"
                                                                            name="otherLat"
                                                                            style={{ width: "100%" }}
                                                                            onChange={formik.handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                            value={formik.values.otherLat}
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
                                                                            id="otherLong"
                                                                            name="otherLong"
                                                                            style={{ width: "100%" }}
                                                                            onChange={formik.handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                            value={formik.values.otherLong}
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
                                                                <Button variant="contained" className='copy-btn'
                                                                    onClick={copy}>{t("کپی کردن از بخش اول")}</Button>
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
                                                                {formik.touched.linkedIn && formik.errors.linkedIn ? (
                                                                    <div className='error-msg'>
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
                                                                {formik.touched.instagram && formik.errors.instagram ? (
                                                                    <div className='error-msg'>
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
                                                                    <div className='error-msg'>
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
                                                                {formik.touched.facebook && formik.errors.facebook ? (
                                                                    <div className='error-msg'>
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
                                                                    <div className='error-msg'>
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
                                    onClick={id != null ? updateClue : () => {
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
                </FormikProvider >
            </div >
        </>
    );
};

export default NewClue;
