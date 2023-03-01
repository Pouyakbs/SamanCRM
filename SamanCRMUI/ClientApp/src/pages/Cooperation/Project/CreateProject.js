import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
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
import MainAccountModal from "../../../components/Modals/MainAccountModal/MainAccountModal";
import UserModal from "../../../components/Modals/User/UserModal";

import { julianIntToDate } from "../../../utils/dateConvert";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CountryTreeView from "../../../components/CountryComponent/CountryTreeView";
import CluesModal from "../../../components/Modals/Clues/CluesModal";
import {renderCalendarSwitch,renderCalendarLocaleSwitch} from '../../../utils/calenderLang'
import CircularProgress from '@mui/material/CircularProgress';
import Map from '../../../components/map'
import { SelectBox } from "devextreme-react";
import DateObject from "react-date-object";
import { getLangDate } from "../../../utils/getLangDate";

const Factor = [];
export const CreateProject = () => {
    const [location, setLocation] = useState({})
    const [address, setAddress] = useState()
    const [addressLoading, setAddressLoading] = useState(false)
  const { t, i18n } = useTranslation();
    const [alignment, setAlignment] = React.useState("");
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const theme = useTheme();
    const dateRef1=useRef()
    const dateRef2=useRef()
    const [factor, setFactor] = React.useState(Factor);
    const formik = useFormik({
        validateOnChange: false,
        initialValues: {
            id: Math.floor(Math.random() * 1000),
            name: "",
            condition: "",
            startDate: new DateObject(),
            endDate: new DateObject(),
            typeOfProject: "",
            importance: "",
            mainAccount: "",
            user: "",
            description: "",
            invoiceCountry: "",
            invoiceCity: "",
            invoiceProvince: "",
            clues: "",
            locationLat: '',
            locationLng: '',
            address: '',
            log: "",
            postalCode: "",
            invoiceGeography: "",
            accountingNumber: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, t("نام باید شامل 15 حرف یا کمتر باشد"))
                .required(t("نام الزامیست")),
            startDate: Yup.string()
            .required("مشخص کردن تاریخ شروع الزامیست"),
            condition: Yup.string(),
            endDate: Yup.string()
            .required("مشخص کردن تاریخ پایان الزامیست")
            .when("startDate", (startDate) => {
                if (Date.parse(formik.values.endDate) - Date.parse(startDate) < 0)
                {
                  return Yup.date().min(startDate, "تاریخ پایان باید پیش از تاریخ شروع باشد")
                }
              }), 
            description: Yup.string(),

            importance: Yup.string(),
            address: Yup.string(),
            postalCode: Yup.string()
                .length(10, t("کد پستی باید 10 رقم باشد"))
                .matches(/^\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/, "کد پستی صحیح نمیباشد"),

        }),
        onSubmit: (values) => {

            console.log('all values', values)
            setFactor([...factor, values]);
            factorSub()
        },
    });
    function getMainAccountData(val) {

        formik.setFieldValue('mainAccount', val.mainAccount)
        console.log(formik.values.mainAccount)
    }
    function clearMainAccountField() {
        formik.setFieldValue('mainAccount', "")
    }
    function getUserData(val) {

        formik.setFieldValue('user', val.user)
        console.log(formik.values.user)
    }
    function clearUserField() {
        formik.setFieldValue('user', "")
    }
    function getCluesData(val) {

        formik.setFieldValue('clues', val.clues)
        console.log(formik.values.clues)
    }
    function clearCluesField() {
        formik.setFieldValue('clues', "")
    }

    function getAccountingNumberData(val) {
        formik.setFieldValue('accountingNumber', val.accountingNumber)
        console.log(formik.values.accountingNumber)
    }
    function clearAccountingNumberField() {
        formik.setFieldValue('accountingNumber', "")
    }
    function getMapData(address, location) {
        setLocation(location)
        setAddress(address)
    }

    const [panel1, setPanel1] = React.useState(true);
    const [panel2, setPanel2] = React.useState(true);

    const handlePanel1 = () => (event, newExpanded) => {
        setPanel1(newExpanded);
    };
    const handlePanel2 = () => (event, newExpanded) => {
        setPanel2(newExpanded);
    };


    function getInvoiceAddress(val) {
        formik.setFieldValue('invoiceCountry', val[0])
        formik.setFieldValue('invoiceProvince', val[1])
        formik.setFieldValue('invoiceCity', val[2])
        formik.setFieldValue('invoiceGeography', `${val[0]}، ${val[1]}، ${val[2]}`)
    }
    function clearInvoiceAddress() {
        formik.setFieldValue('invoiceCountry', "")
        formik.setFieldValue('invoiceProvince', "")
        formik.setFieldValue('invoiceCity', "")
        formik.setFieldValue('invoiceGeography', "")
    }

    useEffect(() => {
        if (Object.keys(location).length) {
            formik.setFieldValue('locationLat', `${location?.lat}`)
            formik.setFieldValue('locationLng', `${location?.lng}`)
        }
    }, [location])

    useEffect(() => {
        address && formik.setFieldValue('address', address)
    }, [address])


    useEffect(() => {
        if (formik.isSubmitting) {
            let condition1 = !!((formik.touched.name && formik.errors.name) ||
            (formik.touched.startDate && formik.errors.startDate) ||
            (formik.touched.endDate && formik.errors.endDate))
            setPanel1(condition1 || panel1)

            let condition2 = !!(formik.touched.postalCode && formik.errors.postalCode)
            setPanel2(condition2 || panel2)

        }

    }, [formik])
    ////////////////////////////////////////selectBox array////////////////////
    const conditionArray = [t("پیش نویس"), t("تحلیل"), t("تخمین"), t("تایید شده"), t("در حال انجام"), t("تکمیل شده"), t("لغو شده"), t("به تعویق افتاده")];
    const typeOfProjectArray = [t("داخلی"), t("خارجی")]
    const importanceArray = [t("خیلی زیاد"), t("زیاد"), t("متوسط"), t("کم")]


    //////////////////////////////////////////////////////////////////////////
    const factorSub = () => {
        swal({
            title: t("فاکتور با موفقیت ثبت شد"),
            icon: "success",
            button: t("باشه"),
        });
    };
    return (
        <>
            <div id="form" style={{ display: "block", marginRight: "10px" }}>
                {/*<h1 className='main-title'>*/}
                {/*    {t("ایجاد پروژه")}*/}
                {/*</h1>*/}
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <Accordion expanded={panel1} onChange={handlePanel1()}>

                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1b-content"
                                id="panel1b-header"
                            >
                                <Typography>{t("اطلاعات پروژه")}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="form-design">

                                    <div className="row">
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("نام")}<span className="star">*</span></span>
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
                                                        <div className='error-msg'>
                                                            {formik.errors.name}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12" onFocus={()=> dateRef1?.current?.closeCalendar()}>
                                            <div className="title">
                                                <span>{t("وضعیت")}</span>
                                            </div>
                                            <div className="wrapper">
                                                <SelectBox
                                                    dataSource={conditionArray}
                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                    onValueChanged={(e) => formik.setFieldValue('condition', e.value)}
                                                    className='selectBox'
                                                    noDataText={t('اطلاعات يافت نشد')}
                                                    itemRender={null}
                                                    placeholder=''
                                                    name='condition'
                                                    id='condition'
                                                    showClearButton
                                                    searchEnabled

                                                />
                                                {formik.touched.condition && formik.errors.condition ? (
                                                    <div className='error-msg'>
                                                        {formik.errors.condition}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12" onFocus={()=> dateRef2?.current?.closeCalendar()}>
                                            <div className="title">
                                                <span>{t("تاریخ شروع")} <span className='star'>*</span></span>
                                            </div>
                                            <div className="wrapper">
                                                <div className='date-picker position-relative' >
                                                    <DatePicker
                                                        name="startDate"
                                                        id="startDate"
                                                        ref={dateRef1}
                                                        editable={false}
                                                        calendar={renderCalendarSwitch(i18n.language)}
                                                        locale={renderCalendarLocaleSwitch(i18n.language)}
                                                        calendarPosition="bottom-right"
                                                        onBlur={formik.handleBlur}
                                                        onChange={val => {
                                                            formik.setFieldValue('startDate', julianIntToDate(val.toJulianDay()));
                                                        }}
                                                        value={getLangDate(i18n.language , formik.values.startDate)}
                                                    />
                                                    <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                                                        <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal'/></div>
                                                    </div>  
                                                </div>
                                                {formik.touched.startDate && formik.errors.startDate && !formik.values.startDate ? (<div className='error-msg'>{t(formik.errors.startDate)}</div>) : null}
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12" onFocus={()=> dateRef1?.current?.closeCalendar()}>
                                            <div className="title">
                                                <span>{t("تاریخ پایان")} <span className='star'>*</span></span>
                                            </div>
                                            <div className="wrapper">
                                                <div className='date-picker position-relative' >
                                                    <DatePicker
                                                        name="endDate"
                                                        id="endDate"
                                                        ref={dateRef2}
                                                        editable={false}
                                                        calendar={renderCalendarSwitch(i18n.language)}
                                                        locale={renderCalendarLocaleSwitch(i18n.language)}
                                                        disabled={!formik.values.startDate}
                                                        minDate={new Date(formik.values.startDate)}
                                                        calendarPosition="bottom-right"
                                                        onBlur={formik.handleBlur}
                                                        onChange={val => {
                                                            formik.setFieldValue('endDate', julianIntToDate(val.toJulianDay()));
                                                        }}
                                                        value={getLangDate(i18n.language , formik.values.endDate)}
                                                    />
                                                    <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                                                        <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal'/></div>
                                                    </div>                                                 
                                                </div>
                                                {formik.touched.endDate && formik.errors.endDate? (
                                                    <div className='error-msg'>
                                                        {formik.errors.endDate}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12" onFocus={()=> dateRef2?.current?.closeCalendar()}>
                                            <div className="title">
                                                <span>{t("نوع پروژه")}</span>
                                            </div>
                                            <div className="wrapper">
                                                <SelectBox
                                                    dataSource={typeOfProjectArray}
                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                    onValueChanged={(e) => formik.setFieldValue('typeOfProject', e.value)}
                                                    className='selectBox'
                                                    noDataText={t('اطلاعات يافت نشد')}
                                                    itemRender={null}
                                                    placeholder=''
                                                    name='typeOfProject'
                                                    id='typeOfProject'
                                                    searchEnabled
                                                    showClearButton
                                                />



                                                {formik.touched.typeOfProject && formik.errors.typeOfProject ? (
                                                    <div className='error-msg'>
                                                        {formik.errors.typeOfProject}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("اهمیت")}</span>
                                            </div>
                                            <div className="wrapper">

                                                <SelectBox
                                                    dataSource={importanceArray}
                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                    onValueChanged={(e) => formik.setFieldValue('importance', e.value)}
                                                    className='selectBox'
                                                    noDataText={t('اطلاعات يافت نشد')}
                                                    itemRender={null}
                                                    placeholder=''
                                                    name='importance'
                                                    id='importance'
                                                    searchEnabled
                                                    showClearButton
                                                />
                                                {formik.touched.importance && formik.errors.importance ? (
                                                    <div className='error-msg'>
                                                        {formik.errors.importance}
                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("حساب اصلی")}</span>
                                            </div>
                                            <div className="wrapper">
                                                <div style={{ position: "relative" }}>
                                                    <input
                                                        className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                        type="text"
                                                        id="account"
                                                        name="account"
                                                        style={{ width: "100%" }}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.mainAccount}
                                                        disabled
                                                    />{formik.touched.account && formik.errors.mainAccount ? (
                                                        <div className='error-msg'>
                                                            {formik.errors.mainAccount}
                                                        </div>
                                                    ) : null}
                                                    <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >

                                                        <MainAccountModal getData={getMainAccountData} />
                                                        <Button ><CancelIcon onClick={clearMainAccountField} /></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("کاربر")}</span>
                                            </div>
                                            <div className="wrapper">
                                                <div style={{ position: "relative" }}>
                                                    <input
                                                        className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                        type="text"
                                                        id="user"
                                                        name="user"
                                                        style={{ width: "100%" }}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.user}
                                                        disabled
                                                    />
                                                    {formik.touched.user && formik.errors.user ? (
                                                        <div className='error-msg'>
                                                            {formik.errors.user}
                                                        </div>
                                                    ) : null}
                                                    <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >
                                                        <UserModal getData={getUserData} />
                                                        <Button > <CancelIcon onClick={clearUserField} /></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion >
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
                                    <div className="row">
                                        <div className='content col-lg-6 col-md-6 col-xs-12'>
                                            <div className='row'>
                                                <div className='content col-lg-12 col-md-12 col-xs-12'>
                                                    <div className='title'>
                                                        <span> {t("منطقه جغرافيایی اصلی")} </span>
                                                    </div>
                                                    <div className='wrapper'>
                                                        <div className='d-flex' style={{ position: "relative" }}>
                                                            <input
                                                                className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                                type="text"
                                                                id="invoiceGeography"
                                                                name="invoiceGeography"
                                                                style={{ width: "100%" }}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.invoiceGeography}
                                                                disabled
                                                            />
                                                            <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >
                                                                <CountryTreeView className='modal' getAddress={getInvoiceAddress} />
                                                                <Button><CancelIcon onClick={clearInvoiceAddress} /></Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='content col-lg-12 col-md-12 col-xs-12'>
                                                    <div className='title'>
                                                        <span> {t("کشور")} </span>
                                                    </div>
                                                    <div className='wrapper'>
                                                        <div className='d-flex' style={{ position: "relative" }}>
                                                            <input
                                                                className='form-input'
                                                                type="text"
                                                                id="invoiceCountry"
                                                                name="invoiceCountry"
                                                                style={{ width: "100%" }}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.invoiceCountry}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='content col-lg-12 col-md-12 col-xs-12'>
                                                    <div className='title'>
                                                        <span> {t("استان")} </span>
                                                    </div>
                                                    <div className='wrapper'>
                                                        <div className='d-flex' style={{ position: "relative" }}>
                                                            <input
                                                                className='form-input'
                                                                type="text"
                                                                id="invoiceProvince"
                                                                name="invoiceProvince"
                                                                style={{ width: "100%" }}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.invoiceProvince}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='content col-lg-12 col-md-12 col-xs-12'>
                                                    <div className='title'>
                                                        <span> {t("شهر")} </span>
                                                    </div>
                                                    <div className='wrapper'>
                                                        <div className='d-flex' style={{ position: "relative" }}>
                                                            <input
                                                                className='form-input'
                                                                type="text"
                                                                id="invoiceCity"
                                                                name="invoiceCity"
                                                                style={{ width: "100%" }}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.invoiceCity}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='content col-lg-6 col-md-6 col-xs-12'>
                                            <div className='row'>
                                                <div className="content col-lg-12 col-md-12 col-xs-12">
                                                    <div className="title">
                                                        <span>{t("کد پستی")}</span>
                                                    </div>
                                                    <div className="wrapper">
                                                        <div style={{ position: "relative" }}>
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
                                                                    {formik.errors.postalCode}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-md-12 col-12' style={{ position: 'relative' }}>
                                                    {addressLoading ? <div className='loading-sec'><CircularProgress /></div> : ''}
                                                    <div className='row align-items-center'>
                                                        <div className="content col-sm-5 col-xs-12">
                                                            <div className="title">
                                                                <span>{t("عرض جغرافیایی")}</span>
                                                            </div>
                                                            <div className="wrapper">
                                                                <div>
                                                                    <input
                                                                        className="form-input"
                                                                        type="text"
                                                                        id="locationLat"
                                                                        name="locationLat"
                                                                        style={{ width: "100%" }}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        value={formik.values.locationLat}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="content col-sm-5 col-xs-12">
                                                            <div className="title">
                                                                <span>{t("طول جغرافیایی")}</span>
                                                            </div>
                                                            <div style={{ position: "relative" }}>
                                                                <div className="wrapper">
                                                                    <input
                                                                        className="form-input"
                                                                        type="text"
                                                                        id="locationLng"
                                                                        name="locationLng"
                                                                        style={{ width: "100%" }}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        value={formik.values.locationLng}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="content col-sm-2 col-xs-12">
                                                            <div className='title'>
                                                                <span> ‌</span>
                                                            </div>
                                                            <Map
                                                                defaultLoc={location}
                                                                setAddressLoading={setAddressLoading}
                                                                getMapData={getMapData}
                                                            />
                                                        </div>

                                                        <div className="content col-lg-12 col-md-12 col-xs-12">
                                                            <div className="title">
                                                                <span>{t("آدرس اصلی")}</span>
                                                            </div>
                                                            <div className="wrapper">
                                                                <div>
                                                                    <textarea
                                                                        className="form-input"
                                                                        id="address"
                                                                        name="address"
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        value={formik.values.address}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("شماره حسابداری")}</span>
                                            </div>
                                            <div className="wrapper">
                                                <div style={{ position: "relative" }}>
                                                    <input
                                                        className="form-input"
                                                        type="text"
                                                        id="accountingNumber"
                                                        name="accountingNumber"
                                                        style={{ width: "100%" }}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.accountingNumber}

                                                    />
                                                    {formik.touched.accountingNumber && formik.errors.accountingNumber ? (
                                                        <div className='error-msg'>
                                                            {formik.errors.accountingNumber}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className='title'>
                                                <span> {t("سر نخ ها")} </span>
                                            </div>
                                            <div className='wrapper'>
                                                <div className='d-flex' style={{ position: "relative" }}>
                                                    <input
                                                        className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                        type="text"
                                                        id="clues"
                                                        name="clues"
                                                        style={{ width: "100%" }}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.clues}
                                                        disabled
                                                    />
                                                    <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >
                                                        <CluesModal getData={getCluesData} />
                                                        <Button > <CancelIcon onClick={clearCluesField} /></Button>
                                                    </div>
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
                                        <div className='content col-lg-6 col-md-6 col-xs-12'>
                                            <div className='title'>
                                                <span> {t("توضیحات")} </span>
                                            </div>
                                            <div className='wrapper'>
                                                <div className='d-flex' style={{ position: "relative" }}>
                                                    <textarea
                                                        className='form-input'
                                                        id="description"
                                                        name="description"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.description}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='content col-lg-6 col-md-6 col-xs-12'>
                                            <div className='title'>
                                                <span> {t("لاگ")} </span>
                                            </div>
                                            <div className='wrapper'>
                                                <div className='d-flex' style={{ position: "relative" }}>
                                                    <textarea
                                                        className='form-input'
                                                        id="log"
                                                        name="log"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.log}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion >


                    </div>

                    <div className="button-pos">
                        <button
                            id="submit"
                            type="button"
                                      onClick={formik.handleSubmit}
                            className="btn btn-success"
                        >
                            {t("ثبت")}
                        </button>
                    </div>
                </form>
            </div >
        </>
    );
};

export default CreateProject;
