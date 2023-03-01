import React, { useState, useEffect,useRef } from "react";
import { FieldArray, useFormik, FormikProvider } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import DatePicker from "react-multi-date-picker";
import CancelIcon from '@mui/icons-material/Cancel';
import CircularProgress from '@mui/material/CircularProgress';
import CountryTreeView from "../../../components/CountryComponent/CountryTreeView"
import Map from "../../../components/map";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserNameModal from "../../../components/Modals/Mahan_UserNameModal/UserNameModal";
import ManagerNameModal from "../../../components/Modals/Mahan_ManagerNameModal/ManagerNameModal";
import { julianIntToDate } from "../../../utils/dateConvert";
import { SelectBox } from "devextreme-react";
import DeleteIcon from '@mui/icons-material/Delete';
import useCountryList from '../../../customHook/useCountryList'
import { renderCalendarSwitch, renderCalendarLocaleSwitch } from '../../../utils/calenderLang'
import DateObject from "react-date-object";
import { getLangDate } from "../../../utils/getLangDate";


export const CreatePersonnel = () => {
    const { t, i18n } = useTranslation();
    const emptyContact = { prefixNamePhoneNumber: '', phoneNumber: "", prefixNumberPhoneNumber: "", internal: '', mainPhone: false, fax: false, mobile: false };
    const emptyContactFieldsTouch = { prefixNamePhoneNumber: false, phoneNumber: false, prefixNumberPhoneNumber: false, internal: false, mainPhone: false, fax: false, mobile: false };
    const [contactFieldsTouch, setContactFieldsTouch] = useState([emptyContactFieldsTouch])
    const emptyEmailsField = { emailAddress: '' };
    const emptyEmailsFieldTouch = { emailAddress: false };
    const [emailsFieldTouch, setEmailsFieldTouch] = useState([emptyEmailsFieldTouch])

    const countryList = useCountryList()

    const theme = useTheme();

    const phoneRegMatch = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
    const nationalIdRegMatch = /^[0-9]{10}$/
    const iranPostalCodeRegMatch = /^\b(?!(\d)\1{ Yup.string().3})[13-9]{4}[1346-9][013-9]{5}\b/

    const formik = useFormik({
        validateOnChange: false,
        initialValues: {
            id: Math.floor(Math.random() * 1000),
            nickName: "",
            personName: "",
            surname: "",
            post: "",
            part: "",
            userName: "",
            managerName: "",
            birthdate: new DateObject(),
            nationalCode: "",
            workingUnit: "",
            name: "",
            nameOfUser: "",
            condition: "",
            mainGeographicalArea: "",
            otherGeographicalArea: "",
            invoiceCountry: "",
            invoiceCity: "",
            invoiceProvince: "",
            locationLat: '',
            locationLng: '',
            mainAddress: '',
            postalCode: "",
            contactFields: [{ ...emptyContact, mainPhone: true }],
            emails: [emptyEmailsField],

        },
        validationSchema: Yup.object({
            personName: Yup.string()
                .max(20, "نام باید شامل 20 حرف یا کمتر باشد")
                .when("type", (type) => {
                    return Yup.string().required("نام الزامیست")
                }),
            surname: Yup.string()
                .max(20, "نام خانوادگی باید شامل 20 حرف یا کمتر باشد")
                .when("type", (type) => {
                    return Yup.string().required("نام خانوادگی الزامیست")
                }),
            postalCode: Yup.string()
                .length(10, "کد پستی باید 10 رقم باشد")
                .matches(iranPostalCodeRegMatch, "کد پستی صحیح نمیباشد"),
            otherPostalCode: Yup.string()
                .length(10, "کد پستی باید 10 رقم باشد")
                .matches(iranPostalCodeRegMatch, "کد پستی صحیح نمیباشد"),
            contactFields: Yup.array(
                Yup.object({
                    phoneNumber: Yup.string()
                        .matches(phoneRegMatch, "شماره تلفن صحیح نمیباشد"),
                    internal: Yup.number()
                        .typeError("تنها عدد مجاز است"),
                })
            ),
            birthdate: Yup.date()
              .required(() => {
                  return (
                    ("تاریخ الزامیست")
                  )
              }),
              emails: Yup.array(
                Yup.object({
                    emailAddress: Yup.string().email("ایمیل صحیح نمیباشد"),
                })
            ),
            post: Yup.string(),
            nationalCode: Yup.string()
                .matches(nationalIdRegMatch, "کد ملی صحیح نمیباشد"),

        }),


        onSubmit: (values) => {
            console.log("here", values)
            factorSub()
        },
    });
    const factorSub = () => {
        swal({
            title: t("فاکتور با موفقیت ثبت شد"),
            icon: "success",
            button: t("باشه"),
        });
    };
    function getUserData(val) {
        console.log(val)
        formik.setFieldValue('userName', val.userName)
    }
    function clearUserNameField() {
        formik.setFieldValue('userName', "")
    }

    function getManagerNameData(val) {
        formik.setFieldValue('managerName', val.managerName)
    }
    function clearManagerNameField() {
        formik.setFieldValue('managerName', "")
    }
    //////////////////////Address Funcs/////////////////////////////////////////
    const [location, setLocation] = useState({})
    const [address, setAddress] = useState()
    const [addressLoading, setAddressLoading] = useState(false)
    const [location1, setLocation1] = useState({})
    const [address1, setAddress1] = useState()

    const dateRef=useRef()

    function getInvoiceAddress(val) {
        formik.setFieldValue('invoiceCountry', val[0])
        formik.setFieldValue('invoiceProvince', val[1])
        formik.setFieldValue('invoiceCity', val[2])
        formik.setFieldValue('mainGeographicalArea', `${val[0]}، ${val[1]}، ${val[2]}`)
    }
    function clearInvoiceAddress() {
        formik.setFieldValue('invoiceCountry', "")
        formik.setFieldValue('invoiceProvince', "")
        formik.setFieldValue('invoiceCity', "")
        formik.setFieldValue('mainGeographicalArea', "")
    }
    function getMapData(address, location) {
        setLocation(location)
        setAddress(address)
    }
    useEffect(() => {
        if (Object.keys(location).length) {
            formik.setFieldValue('locationLat', `${location?.lat}`)
            formik.setFieldValue('locationLng', `${location?.lng}`)
        }
    }, [location])
    useEffect(() => {
        if (Object.keys(location1).length) {
            formik.setFieldValue('otherLocationLat', `${location1?.lat}`)
            formik.setFieldValue('otherLocationLng', `${location1?.lng}`)
        }
    }, [location1])
    useEffect(() => {
        address && formik.setFieldValue('mainAddress', address)
    }, [address])
    useEffect(() => {
        address1 && formik.setFieldValue('otherMainAddress', address1)
    }, [address1])


    const [panel1, setPanel1] = React.useState(true);
    const [panel3, setPanel3] = React.useState(true);
    const [panel4, setPanel4] = React.useState(true);
    const [panel5, setPanel5] = React.useState(true)
    const [panel6, setPanel6] = React.useState(true)
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
            let condition1 = !!(formik.touched.personName && formik.errors.personName) ||
                !!(formik.touched.surname && formik.errors.surname) ||
                !!(formik.touched.accountName && formik.errors.accountName) ||
                !!(formik.touched.contactFields && formik.errors.contactFields) ||
                !!(formik.touched.emails && formik.errors.emails) 
            let condition3 = !!((formik.touched.birthdate && formik.errors.birthdate)||
            (formik.touched.nationalCode && formik.errors.nationalCode))
            let condition4 = !!(formik.touched.userEmail && formik.errors.userEmail)
            let condition5 = !!((formik.touched.postalCode && formik.errors.postalCode) ||
            (formik.touched.otherPostalCode && formik.errors.otherPostalCode))
            let condition6 = !!((formik.touched.website && formik.errors.website) ||
            (formik.touched.linkedIn && formik.errors.linkedIn) ||
            (formik.touched.instagram && formik.errors.instagram) ||
            (formik.touched.blog && formik.errors.blog) ||
            (formik.touched.facebook && formik.errors.facebook) ||
            (formik.touched.twitter && formik.errors.twitter))
            setPanel1(condition1 || panel1)
            setPanel3(condition3 || panel3)
            setPanel4(condition4 || panel4)
            setPanel5(condition5 || panel5)
            setPanel6(condition6 || panel6)
        }
    }, [formik])


    const nickName = [t("آقای"), t("خانم"), t("مهندس"), t("دکتر"), t("استاد"), t("آقای مهندس"), t("خانم مهندس"), t("آقای دکتر"), t("خانم دکتر")];
    const GroupingOne = [t("Category 1"), t("Category 2"), t("Category 3")];
    const condition = [t("فعال"), t("غیرفعال")];
    const prefixNamePhoneNumberArray = [t("دفتر"), t("همراه"), t("فکس"), t("کارخانه"), t("منزل"), t("واتس اپ"), t("سایر")]

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
                                                            <SelectBox
                                                                dataSource={nickName}
                                                                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                onValueChanged={(e) => formik.setFieldValue('nickName', e.value)}
                                                                className='selectBox'
                                                                noDataText='اطلاعات یافت نشد'
                                                                itemRender={null}
                                                                placeholder=''
                                                                name='nickName'
                                                                id='nickName'
                                                                searchEnabled
                                                                showClearButton
                                                            //defaultValue={nickName[0]}       نشان دادن مقدار اولیه 
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

                                                <div className="content col-lg-3 col-md-6 col-xs-12">
                                                    <div className="title">

                                                        <span>{t("نام")} <span className="star">*</span></span>
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
                                                            {formik.touched.personName && formik.errors.personName ? (
                                                                <div className='error-msg'>
                                                                    {t(formik.errors.personName)}
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="content col-lg-3 col-md-6 col-xs-12">
                                                    <div className="title">

                                                        <span>{t("نام خانوادگی")} <span className="star">*</span></span>
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
                                                            {formik.touched.surname && formik.errors.surname ? (
                                                                <div className='error-msg'>
                                                                    {t(formik.errors.surname)}
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="content col-lg-3 col-md-6 col-xs-12">
                                                    <div className="title">

                                                        <span>{t("سمت")}</span>
                                                    </div>
                                                    <div className="wrapper">
                                                        <div>
                                                            <input
                                                                className="form-input"
                                                                type="text"
                                                                id="post"
                                                                name="post"
                                                                style={{ width: "100%" }}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.post}
                                                            />
                                                            {formik.touched.post && formik.errors.post ? (
                                                                <div className='error-msg'>
                                                                    {t(formik.errors.post)}
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

                                                                    <Button className="AddRow"
                                                                        disabled={formik.values.contactFields.length >= 5}
                                                                        onClick={() => {
                                                                            formik.values.contactFields.length < 5 && push(emptyContact)

                                                                            setContactFieldsTouch(oldArray => [...oldArray, emptyContactFieldsTouch])

                                                                        }}>
                                                                        {t("افزودن شماره تماس")}</Button>

                                                                    </div>
                                                                    {formik?.values?.contactFields?.map((contactFields, index) => (
                                                                        <div className='row mb-0' key={index}>
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
                                                                                                <div className='error-msg'>
                                                                                                    {t(formik.errors.contactFields[index]?.phoneNumber)}
                                                                                                </div>
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
                                                                                                <div className='error-msg'>
                                                                                                    {t(formik.errors.contactFields[index]?.internal)}
                                                                                                </div>
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
                                                                </div>
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

                                                        <span>{t("بخش")}</span>
                                                    </div>
                                                    <div className="wrapper">
                                                        <div>
                                                            <input
                                                                className="form-input"
                                                                type="text"
                                                                id="part"
                                                                name="part"
                                                                style={{ width: "100%" }}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.part}
                                                            />
                                                            {formik.touched.part && formik.errors.part ? (
                                                                <div sclassName='error-msg'>
                                                                    {t(formik.errors.part)}
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
                                                                className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                                type="text"
                                                                id="userName"
                                                                name="userName"
                                                                style={{ width: "100%" }}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.userName}
                                                                disabled
                                                            />
                                                            <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >
                                                                <UserNameModal className="modal" getData={getUserData} />
                                                                <Button> <CancelIcon onClick={clearUserNameField} /></Button>
                                                            </div>

                                                            {formik.touched.userName && formik.errors.userName ? (
                                                                <div className='error-msg'>
                                                                    {t(formik.errors.userName)}
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
                                                                    className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                                    type="text"
                                                                    id="managerName"
                                                                    name="managerName"
                                                                    style={{ width: "100%" }}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.managerName}
                                                                    disabled
                                                                />
                                                                <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >
                                                                    <ManagerNameModal className="modal" getData={getManagerNameData} />
                                                                    <Button> <CancelIcon onClick={clearManagerNameField} /></Button>
                                                                </div>

                                                                {formik.touched.managerName && formik.errors.managerName ? (
                                                                    <div className='error-msg'>
                                                                        {t(formik.errors.managerName)}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("تاریخ تولد")}<span className="star">*</span></span>
                                                        </div>
                                                        <div className="wrapper date-picker position-relative" >
                                                            <DatePicker
                                                                name={"birthdate"}
                                                                id={"birthdate"}
                                                                ref={dateRef}
                                                                calendar={renderCalendarSwitch(i18n.language)}
                                                                locale={renderCalendarLocaleSwitch(i18n.language)}
                                                                editable={false}
                                                                maxDate={new Date()}
                                                                onBlur={formik.handleBlur}
                                                                onChange={(val) => {
                                                                    formik.setFieldValue(
                                                                        "birthdate",
                                                                        julianIntToDate(val.toJulianDay())
                                                                    );
                                                                }}
                                                                value={getLangDate(i18n.language , formik.values.birthdate)}
                                                            />
                                                            <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                                                                <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal'/></div>
                                                            </div> 
                                                        </div>
                                                        {formik.touched.birthdate && formik.errors.birthdate &&
                                                        !formik.values.birthdate ? (
                                                          <div className='error-msg'>
                                                              {t(formik.errors.birthdate)}
                                                          </div>
                                                        ) : null}
                                                    </div>

                                                    <div className="content col-lg-6 col-md-6 col-xs-12" onFocus={()=> dateRef?.current?.closeCalendar()}>
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
                                                            <span>{t("عضو واحد")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div>
                                                                <SelectBox
                                                                    dataSource={GroupingOne}
                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                    onValueChanged={(e) => formik.setFieldValue('GroupingOne', e.value)}
                                                                    className='selectBox'
                                                                    noDataText='اطلاعات یافت نشد'
                                                                    itemRender={null}
                                                                    placeholder=''
                                                                    name='GroupingOne'
                                                                    id='GroupingOne'
                                                                    searchEnabled
                                                                    showClearButton
                                                                //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه 
                                                                />
                                                                {formik.touched.GroupingOne && formik.errors.GroupingOne &&
                                                                    !formik.values.GroupingOne ? (
                                                                    <div className='error-msg'>
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
                                                                    <div className='error-msg'>
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
                                                                {formik.touched.nameOfUser && formik.errors.nameOfUser ? (
                                                                    <div className='error-msg'>
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
                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                    onValueChanged={(e) => formik.setFieldValue('condition', e.value)}
                                                                    className='selectBox'
                                                                    noDataText='اطلاعات یافت نشد'
                                                                    itemRender={null}
                                                                    placeholder=''
                                                                    name='condition'
                                                                    id='condition'
                                                                    searchEnabled
                                                                    showClearButton
                                                                //defaultValue={condition[0]}       نشان دادن مقدار اولیه 
                                                                />
                                                                {formik.touched.condition && formik.errors.condition &&
                                                                    !formik.values.condition ? (
                                                                    <div className='error-msg'>
                                                                        {t(formik.errors.condition)}
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
                                            <div className='col-md-12 col-12'>
                                                <div className='row'>
                                                    <div className="content col-12">
                                                        <div className='title'>
                                                            <span> {t("منطقه جغرافيایی اصلی")} </span>
                                                        </div>
                                                        <div className='wrapper'>
                                                            <div className='d-flex' style={{ position: "relative" }}>
                                                                <input
                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                    className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                                    type="text"
                                                                    id="mainGeographicalArea"
                                                                    name="mainGeographicalArea"
                                                                    style={{ width: "100%" }}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.mainGeographicalArea}
                                                                    disabled
                                                                />
                                                                <div className={`modal-action-button ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`}
                                                                >
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
                                                    <div className="content col-12">
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
                                                    <div className="content col-12">
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
                                                                        <div className='error-msg'>
                                                                            {t(formik.errors.postalCode)}
                                                                        </div>
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
                                                                            id="mainAddress"
                                                                            name="mainAddress"
                                                                            style={{ width: "100%" }}
                                                                            onChange={formik.handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                            value={formik.values.mainAddress}
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
                                                                <div className="wrapper">
                                                                    <div>
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
                                <button
                                    id="submit"
                                    type="button"
                                    onClick={formik.handleSubmit}
                                    className="btn btn-success"
                                >
                                    {t("ثبت تغییرات")}
                                </button>
                            </div>

                        </div>
                    </form>
                </FormikProvider>
            </div>
        </>
    );
};

export default CreatePersonnel;