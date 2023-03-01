import React, { useRef, useState, useEffect } from "react";
import UploadFile from "../../../components/UploadComponent/UploadFile";
import { FieldArray, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import CancelIcon from "@mui/icons-material/Cancel";
import CountryTreeView from "../../../components/CountryComponent/CountryTreeView";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";
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
import AccountName from "../../../components/Modals/SupportAccountNameModal/AccountNameModal";
import TeamName from "../../../components/Modals/SupportTeamNameModal/TeamNameModal";
import ServiceReason from "../../../components/Modals/SupportServiceReasonModal/ServiceReasonModal";
import PersonName from "../../../components/Modals/SupportPersonNameModal/PersonNameModal";
import { julianIntToDate } from "../../../utils/dateConvert";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CircularProgress from "@mui/material/CircularProgress";
import { history } from "../../../utils/history";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Map from "../../../components/map/index";
import DisableInputModal from "../../../components/Modals/SupportDisableInputModal/DisableInputModal";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { renderCalendarSwitch, renderCalendarLocaleSwitch } from '../../../utils/calenderLang'
import { SelectBox } from 'devextreme-react/select-box';
import DateObject from "react-date-object";
import { getLangDate } from "../../../utils/getLangDate";
import DeleteIcon from "@mui/icons-material/Delete";

const Factor = [];



export const Support = () => {
    const { t, i18n } = useTranslation();
    const [alignment, setAlignment] = useState("");
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const [datasource, setDatasource] = useState([]);
    const [personsData, setPersonsData] = useState([]);
    const [time, setTime] = useState('')
    const [result, setResult] = useState();
    const [SearchParams] = useSearchParams();
    const id = SearchParams.get("id");
    const appConfig = window.globalConfig;
    const dateRef = useRef()
    const [products, setProducts] = React.useState([])
    // const [expanded, setExpanded] = useState('panel1');
    // const handleChange2 = (panel) => (event, newExpanded) => {
    //   setExpanded(newExpanded ? panel : false);
    // }
    const [panel1, setPanel1] = useState(true);
    const [panel3, setPanel3] = useState(true)
    const handlePanel1 = () => (event, newExpanded) => {
        setPanel1(newExpanded);
    };
    const handlePanel3 = () => (event, newExpanded) => {
        setPanel3(newExpanded);
    };

    const theme = useTheme();
    const [factor, setFactor] = useState(Factor);
    const [location, setLocation] = useState({});

    const [address, setAddress] = useState();
    const [addressLoading, setAddressLoading] = useState(false);

    const emptyProductFields = { productID: "" };
    const emptyProductFieldsTouch = {
        productID: false,
    };
    const [productFieldsTouch, setProductFieldsTouch] = useState([
        emptyProductFieldsTouch,
    ]);
    const callComponent = () => {
        history.navigate(`/Support/Support/SupportManagement`);
    };
    const formik = useFormik({
        validateOnChange: false,
        initialValues: {
            subject: "",
            serviceNum: "",
            desc: "",
            accountID: "",
            status: "",
            teamName: "",
            serviceType: "",
            firstLayerUser: "",
            secondLayerUser: "",
            productFields: [{ ...emptyProductFields }],
            customerReason: "",
            serviceReason: "",
            priority: "",
            intensity: "",
            announceChannel: "",
            personsID: "",
            category: "",
            receiveDate: new DateObject(),
            time: "",
            installLoc: "",
            deviceLoc: "",
            deviceLocInput: "",
            geographyLoc: "",
            country: "",
            state: "",
            city: "",
            postalCode: "",
            address: "",
            lat: "",
            long: "",
            fileTitle: "",
            internalDesc: "",
            solution: "",

        },
        validationSchema: Yup.object({
            subject: Yup.string()
                .max(15, ("موضوع باید شامل 15 حرف یا کمتر باشد"))
                .required(("موضوع الزامیست")),
            accountID: Yup.string().required(" نام حساب الزامیست"),
            personsID: Yup.string().required("وارد کردن نام فرد الزامیست"),
            postalCode: Yup.string()
                .length(10, ("کد پستی باید 10 رقم باشد"))
                .matches(/^\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/, "کد پستی صحیح نمیباشد"),
            receiveDate: Yup.date().required("انتخاب تاریخ الزامی است")
        }),
        onSubmit: (values) => {
            let allValues = values;
            values.hoursCount = parseInt(values.hoursCount);
            var productFields = values.productFields.map((item) => JSON.stringify({
                ProductID: item.productID,
            }));
            values.productFields = productFields
            console.log("all values", values);
            axios
                .post(`${appConfig.BaseURL}/api/Products`, values)
                .then((res) => setResult(res.data.data));
            factorSub();
            callComponent();
            // }
        },
    });
    const factorSub = () => {
        swal({
            title: t("اطلاعات پشتیبانی با موفقیت ثبت شد"),
            icon: "success",
            button: t("باشه"),
        });
    };
    const supportError = () => {
        swal({
            title: t("لطفا اطلاعات الزامی را تکمیل کنید"),
            icon: "error",
            button: t("باشه"),
        });
    };
    const updateSupport = (values) => {
        console.log("allValues", formik.values);
        if (values != null) {
            formik.values.productFields = formik.values.productFields.map((item) => JSON.stringify({
                ProductID: item.productID,
            }));
            let isSuccess = false;
            axios
                .put(`${appConfig.BaseURL}/api/Products/Update/${id}`, formik.values)
                .then((res) => {
                    setResult(res.data);
                    isSuccess = true;
                })
                .finally(() => {
                    if ((isSuccess = true)) {
                        history.navigate(`/Support/Support/SupportManagement`);
                    }
                });
        }
    };

    const [fileList, setFileList] = useState([]);

    function getSecondData(val) {
        formik.setFieldValue("teamName", val.teamName);
        // console.log(formik.values.usernameCategory)
    }
    function clearSecondField() {
        formik.setFieldValue("teamName", "");
    }
    function getSixthData(val) {
        formik.setFieldValue("serviceReason", val.serviceReason);
        // console.log(formik.values.usernameCategory)
    }
    function clearSixthField() {
        formik.setFieldValue("serviceReason", "");
    }

    function updateFileList(list) {
        setFileList(list);
    }

    function getMapData(address, location) {
        setLocation(location);
        setAddress(address);
    }
    useEffect(() => {
        if (formik.isSubmitting) {
            let condition1 = !!(
                (formik.touched.subject && formik.errors.subject) ||
                (formik.touched.accountID && formik.errors.accountID)
            );
            setPanel1(condition1 || panel1);

            let condition3 = !!(
                (formik.touched.postalCode && formik.errors.postalCode) ||
                (formik.touched.receiveDate && formik.errors.receiveDate)
            )
            setPanel3(condition3 || panel3)
        }
    }, [formik]);
    useEffect(() => {
        if (Object.keys(location).length) {
            formik.setFieldValue("lat", `${location?.lat}`);
            formik.setFieldValue("long", `${location?.lng}`);
        }
    }, [location]);

    useEffect(() => {
        axios
            .get(`${appConfig.BaseURL}/api/Account`)
            .then((res) => setDatasource(res.data.data));
    }, []);

    useEffect(() => {
        axios
            .get(`${appConfig.BaseURL}/api/Persons`)
            .then((res) => setPersonsData(res.data.data));
    }, []);
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
        address && formik.setFieldValue("address", address);
    }, [address]);
    function getInvoiceAddress(val) {
        formik.setFieldValue("country", val[0]);
        formik.setFieldValue("state", val[1]);
        formik.setFieldValue("city", val[2]);
        formik.setFieldValue('geographyLoc', `${val[0]}، ${val[1]}، ${val[2]}`)
    }
    function clearInvoiceAddress() {
        formik.setFieldValue("country", "");
        formik.setFieldValue("state", "");
        formik.setFieldValue("city", "");
        formik.setFieldValue('geographyLoc', "")
    }
    function getParentData(val) {
        formik.setFieldValue("deviceLocInput", val.disableInput);
    }

    function clearParentField() {
        formik.setFieldValue("deviceLocInput", "");
    }
    useEffect(() => {
        if (time) {
            let t = (new Date(time))
            formik.setFieldValue('time', `${('0' + t.getHours()).slice(-2)}:${('0' + t.getMinutes()).slice(-2)}`)
        }
    }, [time])
    const measurementUnits = [t("پیش نویس"), t("مذاکره"), t("ارسال شده")]

    return (
        <>
            <div id="form" style={{ display: "block", marginRight: "10px" }}>
                {/*<h1 className='main-title'>*/}
                {/*    {t("پشتیبانی")}*/}
                {/*</h1>*/}
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        <div
                            style={{
                                // backgroundColor: `${theme.palette.background.paper}`,
                                borderColor: `${theme.palette.divider}`,
                            }}>
                            <Accordion expanded={panel1} onChange={handlePanel1()}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1b-content"
                                    id="panel1b-header"
                                >
                                    <Typography><span>{t("اطلاعات سرویس")}</span></Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="form-design">
                                        <div className="row ">
                                            <div className="col-lg-12 col-12">
                                                <div className="row">
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>
                                                                {t("موضوع")}
                                                                <span className="star">*</span>
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
                                                                {formik.touched.subject &&
                                                                    formik.errors.subject ? (
                                                                    <div className='error-msg'>
                                                                        {t(formik.errors.subject)}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("شماره")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div>
                                                                <input
                                                                    className="form-input"
                                                                    type="text"
                                                                    id="serviceNum"
                                                                    name="serviceNum"
                                                                    style={{ width: "100%" }}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.serviceNum}
                                                                />
                                                                {formik.touched.serviceNum && formik.errors.serviceNum ? (
                                                                    <div className='error-msg'>
                                                                        {formik.errors.serviceNum}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-12 col-md-12 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("توضیحات")}</span>
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
                                                                {formik.touched.desc &&
                                                                    formik.errors.desc ? (
                                                                    <div className='error-msg'>
                                                                        {formik.errors.desc}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
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
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("وضعیت")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div>
                                                                <SelectBox
                                                                    dataSource={measurementUnits}
                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                    onValueChanged={(e) => formik.setFieldValue('status', e.value)}
                                                                    className='selectBox'
                                                                    noDataText={t('اطلاعات یافت نشد')}
                                                                    itemRender={null}
                                                                    placeholder=''
                                                                    name='status'
                                                                    id='status'
                                                                    searchEnabled
                                                                    showClearButton

                                                                />

                                                                {formik.touched.status && formik.errors.status && !formik.values.status ? (<div className='error-msg'>{formik.errors.status}</div>) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("نام تیم")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div className="divModal">
                                                                <input
                                                                    disabled
                                                                    className={`form-input modal-input ${i18n.dir() === 'ltr' ? 'ltr' : ''}`}
                                                                    type="text"
                                                                    id="teamName"
                                                                    name="teamName"
                                                                    style={{ width: "100%" }}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.teamName}
                                                                />
                                                                <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`}>
                                                                    <TeamName getData={getSecondData} />
                                                                    <Button>
                                                                        {" "}
                                                                        <CancelIcon onClick={clearSecondField} />
                                                                    </Button>
                                                                </div>

                                                                {formik.touched.teamName &&
                                                                    formik.errors.teamName ? (
                                                                    <div className='error-msg'>
                                                                        {formik.errors.teamName}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("نوع سرویس")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div>
                                                                <SelectBox
                                                                    dataSource={measurementUnits}
                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                    onValueChanged={(e) => formik.setFieldValue('serviceType', e.value)}
                                                                    className='selectBox'
                                                                    noDataText={t('اطلاعات یافت نشد')}
                                                                    itemRender={null}
                                                                    placeholder=''
                                                                    name='serviceType'
                                                                    id='serviceType'
                                                                    searchEnabled
                                                                    showClearButton

                                                                />

                                                                {formik.touched.serviceType && formik.errors.serviceType && !formik.values.serviceType ? (<div className='error-msg'>{formik.errors.serviceType}</div>) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("کاربر(لایه1)")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div>
                                                                <SelectBox
                                                                    dataSource={measurementUnits}
                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                    onValueChanged={(e) => formik.setFieldValue('firstLayerUser', e.value)}
                                                                    className='selectBox'
                                                                    noDataText={t('اطلاعات یافت نشد')}
                                                                    itemRender={null}
                                                                    placeholder=''
                                                                    name='firstLayerUser'
                                                                    id='firstLayerUser'
                                                                    searchEnabled
                                                                    showClearButton

                                                                />

                                                                {formik.touched.firstLayerUser && formik.errors.firstLayerUser && !formik.values.firstLayerUser ? (<div className='error-msg'>{formik.errors.firstLayerUser}</div>) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("کاربر(لایه2)")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div>
                                                                <SelectBox
                                                                    dataSource={measurementUnits}
                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                    onValueChanged={(e) => formik.setFieldValue('secondLayerUser', e.value)}
                                                                    className='selectBox'
                                                                    noDataText={t('اطلاعات یافت نشد')}
                                                                    itemRender={null}
                                                                    placeholder=''
                                                                    name='secondLayerUser'
                                                                    id='secondLayerUser'
                                                                    searchEnabled
                                                                    showClearButton

                                                                />

                                                                {formik.touched.secondLayerUser && formik.errors.secondLayerUser && !formik.values.secondLayerUser ? (<div className='error-msg'>{formik.errors.secondLayerUser}</div>) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded={true}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1b-content"
                                    id="panel1b-header"
                                >
                                    <Typography><span>{t("اطلاعات محصول‌ و ‌دستگاه")}</span> </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="form-design">
                                        <div className="row ">
                                            <div className="col-lg-12 col-12">
                                                <div className="row">
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
                                    <Typography> {t("اطلاعات بیشتر")} </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="form-design">
                                        <div className="row ">
                                            <div className="col-lg-12 col-12">
                                                <div className="row">
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("دلیل اعلام شده مشتری")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div>
                                                                <SelectBox
                                                                    dataSource={measurementUnits}
                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                    onValueChanged={(e) => formik.setFieldValue('customerReason', e.value)}
                                                                    className='selectBox'
                                                                    noDataText={t('اطلاعات یافت نشد')}
                                                                    itemRender={null}
                                                                    placeholder=''
                                                                    name='customerReason'
                                                                    id='customerReason'
                                                                    searchEnabled
                                                                    showClearButton

                                                                />

                                                                {formik.touched.customerReason && formik.errors.customerReason && !formik.values.customerReason ? (<div className='error-msg'>{formik.errors.customerReason}</div>) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("دلیل ارائه سرویس")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div className="divModal">
                                                                <input
                                                                    disabled
                                                                    className={`form-input modal-input ${i18n.dir() === 'ltr' ? 'ltr' : ''}`}
                                                                    type="text"
                                                                    id="serviceReason"
                                                                    name="serviceReason"
                                                                    style={{ width: "100%" }}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.serviceReason}
                                                                />
                                                                <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`}>
                                                                    <ServiceReason getData={getSixthData} />
                                                                    <Button>
                                                                        {" "}
                                                                        <CancelIcon onClick={clearSixthField} />
                                                                    </Button>
                                                                </div>
                                                                {formik.touched.serviceReason &&
                                                                    formik.errors.serviceReason ? (
                                                                    <div className='error-msg'>
                                                                        {formik.errors.serviceReason}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("اولویت")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div>
                                                                <SelectBox
                                                                    dataSource={measurementUnits}
                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                    onValueChanged={(e) => formik.setFieldValue('priority', e.value)}
                                                                    className='selectBox'
                                                                    noDataText={t('اطلاعات یافت نشد')}
                                                                    itemRender={null}
                                                                    placeholder=''
                                                                    name='priority'
                                                                    id='priority'
                                                                    searchEnabled
                                                                    showClearButton

                                                                />

                                                                {formik.touched.priority && formik.errors.priority && !formik.values.priority ? (<div className='error-msg'>{formik.errors.priority}</div>) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("شدت")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div>
                                                                <SelectBox
                                                                    dataSource={measurementUnits}
                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                    onValueChanged={(e) => formik.setFieldValue('intensity', e.value)}
                                                                    className='selectBox'
                                                                    noDataText={t('اطلاعات یافت نشد')}
                                                                    itemRender={null}
                                                                    placeholder=''
                                                                    name='intensity'
                                                                    id='intensity'
                                                                    searchEnabled
                                                                    showClearButton

                                                                />

                                                                {formik.touched.intensity && formik.errors.intensity && !formik.values.intensity ? (<div className='error-msg'>{formik.errors.intensity}</div>) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("کانال اعلام")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div>
                                                                <SelectBox
                                                                    dataSource={measurementUnits}
                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                    onValueChanged={(e) => formik.setFieldValue('announceChannel', e.value)}
                                                                    className='selectBox'
                                                                    noDataText={t('اطلاعات یافت نشد')}
                                                                    itemRender={null}
                                                                    placeholder=''
                                                                    name='announceChannel'
                                                                    id='announceChannel'
                                                                    searchEnabled
                                                                    showClearButton

                                                                />

                                                                {formik.touched.announceChannel && formik.errors.announceChannel && !formik.values.announceChannel ? (<div className='error-msg'>{formik.errors.announceChannel}</div>) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>
                                                                {t("نام فرد")}
                                                                <span className="star">*</span>
                                                            </span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div style={{ position: "relative" }}>
                                                                {id != null && formik.values.personsID != 0 && (
                                                                    <SelectBox
                                                                        dataSource={personsData}
                                                                        rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                        onValueChanged={(e) => {
                                                                            formik.setFieldValue("personsID", e.value);
                                                                        }}
                                                                        displayExpr={"personName"}
                                                                        defaultValue={formik.values.personsID}
                                                                        valueExpr={"personsID"}
                                                                        className="selectBox"
                                                                        noDataText="اطلاعات یافت نشد"
                                                                        placeholder=""
                                                                        name="personsID"
                                                                        id="personsID"
                                                                        searchEnabled
                                                                        showClearButton
                                                                    //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                                                                    />
                                                                )}
                                                                {(!id ||
                                                                    (id != null && formik.values.personsID == 0)) && (
                                                                        <SelectBox
                                                                            dataSource={personsData}
                                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                            onValueChanged={(e) => {
                                                                                formik.setFieldValue(
                                                                                    "personsID",
                                                                                    e.value.personsID
                                                                                );
                                                                            }}
                                                                            displayExpr={"personName"}
                                                                            defaultValue={formik.values.personsID}
                                                                            className="selectBox"
                                                                            noDataText="اطلاعات یافت نشد"
                                                                            placeholder=""
                                                                            name="personsID"
                                                                            id="personsID"
                                                                            searchEnabled
                                                                            showClearButton
                                                                        //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                                                                        />
                                                                    )}
                                                                {formik.touched.personsID && formik.errors.personsID ? (
                                                                    <div className="error-msg">
                                                                        {t(formik.errors.personsID)}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-6 col-md-6 col-xs-12" onFocus={() => dateRef?.current?.closeCalendar()}>
                                                        <div className="title">
                                                            <span>{t("دسته")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div>
                                                                <SelectBox
                                                                    dataSource={measurementUnits}
                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                    onValueChanged={(e) => formik.setFieldValue('category', e.value)}
                                                                    className='selectBox'
                                                                    noDataText={t('اطلاعات یافت نشد')}
                                                                    itemRender={null}
                                                                    placeholder=''
                                                                    name='category'
                                                                    id='category'
                                                                    searchEnabled
                                                                    showClearButton

                                                                />

                                                                {formik.touched.category && formik.errors.category && !formik.values.category ? (<div className='error-msg'>{formik.errors.category}</div>) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="row">
                                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                                <div className="title">
                                                                    <span>{t("تاریخ دریافت")} <span className='star'>*</span></span>
                                                                </div>
                                                                <div
                                                                    className="wrapper date-picker position-relative"
                                                                >
                                                                    <DatePicker
                                                                        name={"receiveDate"}
                                                                        id={"receiveDate"}
                                                                        ref={dateRef}
                                                                        calendar={renderCalendarSwitch(i18n.language)}
                                                                        locale={renderCalendarLocaleSwitch(i18n.language)}
                                                                        onBlur={formik.handleBlur}
                                                                        onChange={(val) => {
                                                                            formik.setFieldValue(
                                                                                "receiveDate",
                                                                                julianIntToDate(val.toJulianDay())
                                                                            );
                                                                        }}
                                                                        value={getLangDate(i18n.language, formik.values.receiveDate)}
                                                                        editable={false}
                                                                    />
                                                                    <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                                                                        <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal' /></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="content col-lg-6 col-md-6 col-xs-12" onFocus={() => dateRef?.current?.closeCalendar()}>
                                                                <div className="title">
                                                                    <span>{t("زمان")}</span>
                                                                </div>
                                                                <div className="wrapper">
                                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                        <TimePicker
                                                                            ampm={false}
                                                                            className='time-picker'
                                                                            views={['hours', 'minutes']}
                                                                            inputFormat="HH:mm"
                                                                            mask="__:__"
                                                                            value={time}
                                                                            onChange={(newValue) => {
                                                                                setTime(newValue);
                                                                            }}
                                                                            renderInput={(params) => <TextField {...params} />}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("محل نصب")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div>
                                                                <input
                                                                    className="form-input"
                                                                    type="text"
                                                                    id="installLoc"
                                                                    name="installLoc"
                                                                    style={{ width: "100%" }}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.installLoc}
                                                                />
                                                                {formik.touched.installLoc &&
                                                                    formik.errors.installLoc ? (
                                                                    <div className='error-msg'>
                                                                        {formik.errors.installLoc}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span className="spanDisableInput">
                                                                {t("محل دستگاه")}
                                                            </span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div
                                                                style={{ position: "relative" }}
                                                                className="row"
                                                            >
                                                                <div className="col-6">
                                                                    <SelectBox
                                                                        dataSource={measurementUnits}
                                                                        rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                        onValueChanged={(e) => formik.setFieldValue('deviceLoc', e.value)}
                                                                        className='selectBox'
                                                                        noDataText={t('اطلاعات یافت نشد')}
                                                                        itemRender={null}
                                                                        placeholder=''
                                                                        name='deviceLoc'
                                                                        id='deviceLoc'
                                                                        searchEnabled
                                                                        showClearButton

                                                                    />

                                                                    {formik.touched.deviceLoc && formik.errors.deviceLoc && !formik.values.deviceLoc ? (<div className='error-msg'>{formik.errors.deviceLoc}</div>) : null}
                                                                </div>
                                                                <div className="col-6">
                                                                    <input
                                                                        className={`form-input modal-input ${i18n.dir() === 'ltr' ? 'ltr' : ''}`}
                                                                        type="text"
                                                                        disabled
                                                                        id="deviceLocInput"
                                                                        name="deviceLocInput"
                                                                        style={{ width: "100%" }}
                                                                        onChange={formik.handleChange}
                                                                        onBlur={formik.handleBlur}
                                                                        value={formik.values.deviceLocInput}
                                                                    />
                                                                    {formik.touched.deviceLocInput &&
                                                                        formik.errors.deviceLocInput ? (
                                                                        <div className='error-msg'>
                                                                            {formik.errors.deviceLoc}
                                                                        </div>
                                                                    ) : null}
                                                                    <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`}>
                                                                        <DisableInputModal
                                                                            disabled={
                                                                                !formik.values.deviceLoc
                                                                            }
                                                                            getData={getParentData}
                                                                        />
                                                                        <Button>
                                                                            <CancelIcon
                                                                                onClick={clearParentField}
                                                                            />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className='row'>
                                                            <div className="content col-lg-12 col-md-12 col-xs-12">
                                                                <div className="title">
                                                                    <span>
                                                                        {t("منطقه جغرافيایی ارسال صورت حساب")}
                                                                    </span>
                                                                </div>
                                                                <div className="wrapper">
                                                                    <div
                                                                        className="d-flex"
                                                                        style={{ position: "relative" }}
                                                                    >
                                                                        <input
                                                                            className={`form-input modal-input ${i18n.dir() === 'ltr' ? 'ltr' : ''}`}
                                                                            type="text"
                                                                            id="geographyLoc"
                                                                            name="geographyLoc"
                                                                            style={{ width: "100%" }}
                                                                            onChange={formik.handleChange}
                                                                            onBlur={formik.handleBlur}
                                                                            value={formik.values.geographyLoc}
                                                                            disabled
                                                                        />
                                                                        <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`}>
                                                                            <CountryTreeView
                                                                                className="modal"
                                                                                getAddress={getInvoiceAddress}
                                                                            />
                                                                            <Button>
                                                                                <CancelIcon
                                                                                    onClick={clearInvoiceAddress}
                                                                                />
                                                                            </Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="content col-lg-12 col-md-12 col-xs-12">
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
                                                            <div className="content col-lg-12 col-md-12 col-xs-12">
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

                                                            <div className="content col-lg-12 col-md-12 col-xs-12">
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
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div
                                                            className="content"
                                                            style={{ position: "relative" }}
                                                        >
                                                            <div className='row' style={{ marginBottom: 0 }}>
                                                                <div className='col-12'>
                                                                    <div className="title">
                                                                        <span>{t("کدپستی")}</span>
                                                                    </div>
                                                                    <div className="wrapper">
                                                                        <div

                                                                        >
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
                                                                                <div className='error-msg'>
                                                                                    {t(formik.errors.postalCode)}
                                                                                </div>
                                                                            ) : null}
                                                                        </div>
                                                                    </div>

                                                                </div>






                                                            </div>


                                                        </div>
                                                        <div className="row" style={{ position: "relative", alignItems: 'center' }}>
                                                            {addressLoading ? (
                                                                <div className="loading-sec">
                                                                    <CircularProgress />
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                            <div
                                                                className="content col-lg-12 col-md-12 col-xs-12"
                                                                style={{ position: "relative" }}
                                                            >

                                                                <div className="title">
                                                                    <span>{t("آدرس")}</span>
                                                                </div>
                                                                <div className="wrapper">
                                                                    <div
                                                                        className="d-flex"
                                                                        style={{ position: "relative" }}
                                                                    >
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
                                                            <div className="content col-lg-5 col-md-12 col-xs-12">
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
                                                            <div className="content col-lg-5 col-md-12 col-xs-12">
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
                                                            <div className="content col-lg-2 col-md-12 col-xs-12 d-flex justify-content-end">
                                                                <div>
                                                                    <div className='title'><span>&zwnj;</span></div>
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
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded={true}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1b-content"
                                    id="panel1b-header"
                                >
                                    <Typography><span>{t("پیوست‌ها")}</span></Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="form-design">
                                        <div className="row">
                                            <div
                                                className="content col-lg-6 col-md-6 col-xs-12"
                                            >
                                                <div className="title">
                                                    <span>{t("عنوان فایل")}</span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={measurementUnits}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            onValueChanged={(e) => formik.setFieldValue('fileTitle', e.value)}
                                                            className='selectBox'
                                                            noDataText={t('اطلاعات یافت نشد')}
                                                            itemRender={null}
                                                            placeholder=''
                                                            name='fileTitle'
                                                            id='fileTitle'
                                                            searchEnabled
                                                            showClearButton

                                                        />

                                                        {formik.touched.fileTitle && formik.errors.fileTitle && !formik.values.fileTitle ? (<div className='error-msg'>{formik.errors.fileTitle}</div>) : null}


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="teamName">
                                                    <UploadFile
                                                        title={t("بارگذاری فایل")}
                                                        multiple={true}
                                                        //  uploadError={uploadError}
                                                        updateFileList={updateFileList}
                                                    // accept={".png , .jpeg, .gif, .jpg, .bmp"}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion defaultExpanded={true}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1b-content"
                                    id="panel1b-header"
                                >
                                    <Typography><span>{t("توضیحات")}</span></Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="form-design">
                                        <div className="row ">
                                            <div className="col-lg-12 col-12">
                                                <div className="row">
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("توضیحات داخلی")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div className="divModal">
                                                                <textarea
                                                                    className="form-input"
                                                                    type="text"
                                                                    id="internalDesc"
                                                                    name="internalDesc"
                                                                    style={{ width: "100%" }}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.internalDesc}
                                                                />
                                                                {formik.touched.internalDesc &&
                                                                    formik.errors.internalDesc ? (
                                                                    <div className='error-msg'>
                                                                        {formik.errors.internalDesc}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span>{t("راه حل")}</span>
                                                        </div>
                                                        <div className="wrapper">
                                                            <div className="divModal">
                                                                <textarea
                                                                    className="form-input"
                                                                    type="text"
                                                                    id="solution"
                                                                    name="solution"
                                                                    style={{ width: "100%" }}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.solution}
                                                                />
                                                                {formik.touched.solution &&
                                                                    formik.errors.solution ? (
                                                                    <div className='error-msg'>
                                                                        {formik.errors.solution}
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
                                    onClick={formik.errors ? supportError : id != null ? updateSupport : () => {
                                        formik.handleSubmit()
                                        let temp = productFieldsTouch.map(item => ({
                                            productID: true,
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
        </>
    );
};

export default Support;
