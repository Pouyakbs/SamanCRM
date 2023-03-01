import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import CancelIcon from '@mui/icons-material/Cancel';
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FrameModal from "../../../components/Modals/ConnectionFrameModal/FrameModal";
import 'devextreme/dist/css/dx.light.css';
import axios from "axios";
import { SelectBox } from 'devextreme-react/select-box';
import { useSearchParams } from "react-router-dom";
import { history } from "../../../utils/history";

const Factor = [];
export const Connections = () => {
    const { t, i18n } = useTranslation();
    const appConfig = window.globalConfig;
    const [alignment, setAlignment] = React.useState("");
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    // const [expanded, setExpanded] = React.useState('panel1');
    // const handleChange2 = (panel) => (event, newExpanded) => {
    //   setExpanded(newExpanded ? panel : false);
    // }
    const [panel1, setPanel1] = useState(true);
    const handlePanel1 = () => (event, newExpanded) => {
        setPanel1(newExpanded);
    };
    const [SearchParams] = useSearchParams();
    const id = SearchParams.get("id");
    const [result, setResult] = useState();

    const theme = useTheme();
    const [factor, setFactor] = React.useState(Factor);

    const callComponent = () => {
        history.navigate(`/marketing/connections/ConnectionsManagement`);
    };
    const formik = useFormik({
        validateOnChange: false,
        initialValues: {
            title: "",
            activeConnection: false,
            maduleName: "",
            recordType: "",
            condition: "",
            conditionAmount: "",
            sendMessage: false,
            sendEmail: false,
            messageTitle: "",
            emailTitle: "",
            frame: "",
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(15, ("عنوان باید شامل 15 حرف یا کمتر باشد"))
                .required(() => {
                    return (
                        ("عنوان الزامیست")
                    )
                }),
            condition: Yup.string()
                .max(15, ("شرط باید شامل 15 حرف یا کمتر باشد"))
                .required(() => {
                    return (
                        ("شرط الزامیست")
                    )
                }).nullable(true),
            recordType: Yup.string()
                .max(15, ("نوع رکورد باید شامل 15 حرف یا کمتر باشد"))
                .required(() => {
                    return (
                        ("نوع رکورد الزامیست")
                    )
                }).nullable(true),
            conditionAmount: Yup.string()
                .max(15, ("مقدار شرط باید شامل 15 حرف یا کمتر باشد"))
                .required(() => {
                    return (
                        ("مقدار شرط الزامیست")
                    )
                }),
            maduleName: Yup.string()
                .max(15, ("نام ماژول شرط باید شامل 15 حرف یا کمتر باشد"))
                .required(() => {
                    return (
                        ("نام ماژول شرط الزامیست")
                    )
                }).nullable(true),
        }),
        onSubmit: (values) => {
            axios
                .post(`${appConfig.BaseURL}/api/connections`, values)
                .then((res) => setResult(res.data.data));
            factorSub();
            callComponent();
        },
    });

    const updateConnections = (values) => {
        if (values != null) {
            console.log(values);
            let isSuccess = false;
            axios
                .put(`${appConfig.BaseURL}/api/connections/Update/${id}`, formik.values)
                .then((res) => {
                    setResult(res.data);
                    isSuccess = true;
                })
                .finally(() => {
                    if ((isSuccess = true)) {
                        history.navigate(`/marketing/connections/ConnectionsManagement`);
                    }
                });
        }
    };

    useEffect(() => {
        if (id != null) {
          axios.get(`${appConfig.BaseURL}/api/connections/${id}`).then((res) => {
            formik.setFieldValue("title", res.data.data.title);
            formik.setFieldValue("activeConnection", res.data.data.activeConnection);
            formik.setFieldValue("maduleName", res.data.data.maduleName);
            formik.setFieldValue("recordType", res.data.data.recordType);
            formik.setFieldValue("condition", res.data.data.condition);
            formik.setFieldValue("conditionAmount", res.data.data.conditionAmount);
            formik.setFieldValue("sendMessage", res.data.data.sendMessage);
            formik.setFieldValue("sendEmail", res.data.data.sendEmail);
            formik.setFieldValue("messageTitle", res.data.data.messageTitle);
            formik.setFieldValue("emailTitle", res.data.data.emailTitle);
            formik.setFieldValue("frame", res.data.data.frame);
          });
        }
      }, [id]);
    const factorSub = () => {
        swal({
            title: t("اطلاعات ارتباط با موفقیت ثبت شد"),
            icon: "success",
            button: t("باشه"),
        });
    };
    function getData(val) {
        formik.setFieldValue('frame', val.frame)
        // console.log(formik.values.usernameCategory)
    }
    function clearField() {
        formik.setFieldValue('frame', "")
    }
    useEffect(() => {
        if (formik.isSubmitting) {
            let condition1 = !!((formik.touched.title && formik.errors.title) ||
                (formik.touched.maduleName && formik.errors.maduleName) ||
                (formik.touched.recordType && formik.errors.recordType) ||
                (formik.touched.condition && formik.errors.condition) ||
                (formik.touched.conditionAmount && formik.errors.conditionAmount))

            setPanel1(condition1 || panel1)

        }

    }, [formik])
    const measurementUnits = [t("جعبه"), t("دستگاه"), t("ساعت"), t("شاخه"), t("عدد"), t("کارتن"), t("کیلوگرم"), t("لیتر"), t("متر"), t("متر مربع"), t("ورقه"), t("ماه")];
    return (
        <>

            <div id="form" style={{ display: "block", marginRight: "10px" }}>
                {/*<h1 className='main-title'>*/}
                {/*    {t("ارتباطات")}*/}
                {/*</h1>*/}
                <form onSubmit={formik.handleSubmit}>
                    <div
                        className="form-template"
                        style={{
                            border: 'none'
                        }}
                    >
                        <Accordion expanded={panel1} onChange={handlePanel1()}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography><span>{t("اطلاعات ارتباط")}</span></Typography>
                            </AccordionSummary>
                            <AccordionDetails>

                                <div className="form-design">
                                    <div className="row">
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("عنوان")} <span className="star">*</span></span>
                                            </div>
                                            <div className="wrapper">
                                                <div>
                                                    <input
                                                        className="form-input"
                                                        type="text"
                                                        id="title"
                                                        name="title"
                                                        style={{ width: "100%" }}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.title}
                                                    />
                                                    {formik.touched.title && formik.errors.title ? (
                                                        <div className='error-msg'>
                                                            {t(formik.errors.title)}
                                                        </div>
                                                    ) : null}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>‌</span>
                                            </div>
                                            <div className="wrapper" style={{ paddingTop: "8px" }}>
                                                <label className="checkbox-label">
                                                    <input
                                                        className="form-input"
                                                        type="checkbox"
                                                        id="activeConnection"
                                                        name="activeConnection"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.activeConnection}
                                                    />
                                                    {t("فعال")}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("نام ماژول")}<span className="star">*</span></span>
                                            </div>
                                            <div className="wrapper">
                                                <div>
                                                    <SelectBox
                                                        dataSource={measurementUnits}
                                                        rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                        onValueChanged={(e) => formik.setFieldValue('maduleName', e.value)}
                                                        className='selectBox'
                                                        noDataText={t("اطلاعات یافت نشد")}
                                                        itemRender={null}
                                                        placeholder=''
                                                        name='maduleName'
                                                        id='maduleName'
                                                        searchEnabled

                                                    />

                                                    {formik.touched.maduleName && formik.errors.maduleName && !formik.values.maduleName ? (<div className='error-msg'>{t(formik.errors.maduleName)}</div>) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("نوع رکورد")}<span className="star">*</span></span>
                                            </div>
                                            <div className="wrapper">
                                                <div>
                                                    <SelectBox
                                                        dataSource={measurementUnits}
                                                        rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                        onValueChanged={(e) => formik.setFieldValue('recordType', e.value)}
                                                        className='selectBox'
                                                        noDataText='اطلاعات یافت نشد'
                                                        itemRender={null}
                                                        placeholder=''
                                                        name='recordType'
                                                        id='recordType'
                                                        searchEnabled

                                                    />

                                                    {formik.touched.recordType && formik.errors.recordType && !formik.values.recordType ? (<div className='error-msg'>{t(formik.errors.recordType)}</div>) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("شرط")}<span className="star">*</span></span>
                                            </div>
                                            <div className="wrapper">
                                                <div>
                                                    <SelectBox
                                                        dataSource={measurementUnits}
                                                        rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                        onValueChanged={(e) => formik.setFieldValue('condition', e.value)}
                                                        className='selectBox'
                                                        noDataText='اطلاعات یافت نشد'
                                                        itemRender={null}
                                                        placeholder=''
                                                        name='condition'
                                                        id='condition'
                                                        searchEnabled

                                                    />

                                                    {formik.touched.condition && formik.errors.condition && !formik.values.condition ? (<div className='error-msg'>{t(formik.errors.condition)}</div>) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("مقدار شرط")}<span className="star">*</span></span>
                                            </div>
                                            <div className="wrapper">
                                                <div>
                                                    <input
                                                        className="form-input"
                                                        type="text"
                                                        id="conditionAmount"
                                                        name="conditionAmount"
                                                        style={{ width: "100%" }}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.conditionAmount}
                                                    />
                                                    {formik.touched.conditionAmount && formik.errors.conditionAmount ? (
                                                        <div className='error-msg'>
                                                            {t(formik.errors.conditionAmount)}
                                                        </div>
                                                    ) : null}
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
                                    <Typography><span>{t("اطلاعات ارسال")}</span></Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className="form-design">
                                        <div className="row">
                                            <div className="content col-6">
                                                <div className="title">
                                                    <span>‌</span>
                                                </div>
                                                <div className="wrapper">
                                                    <label className="checkbox-label">
                                                        <input
                                                            className="form-input"
                                                            type="checkbox"
                                                            id="sendMessage"
                                                            name="sendMessage"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.sendMessage}
                                                        />
                                                        {t("پیامک")}
                                                        {formik.touched.sendMessage && formik.errors.sendMessage ? (
                                                            <div className='error-msg'>
                                                                {formik.errors.sendMessage}
                                                            </div>
                                                        ) : null}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="content col-6">
                                                <div className="title">
                                                    <span>‌</span>
                                                </div>
                                                <div className="wrapper">
                                                    <label className="checkbox-label">
                                                        <input
                                                            className="form-input"
                                                            type="checkbox"
                                                            id="sendEmail"
                                                            name="sendEmail"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.sendEmail}
                                                        />
                                                        {t("ایمیل")}
                                                        {formik.touched.sendEmail && formik.errors.sendEmail ? (
                                                            <div className='error-msg'>
                                                                {formik.errors.sendEmail}
                                                            </div>
                                                        ) : null}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <span>{t("عنوان پیامک")}</span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <input
                                                            className="form-input"
                                                            type="text"
                                                            id="messageTitle"
                                                            name="messageTitle"
                                                            style={{ width: "100%" }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.messageTitle}
                                                        />
                                                        {formik.touched.messageTitle && formik.errors.messageTitle ? (
                                                            <div className='error-msg'>
                                                                {formik.errors.messageTitle}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <span>{t("عنوان ایمیل")}</span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <input
                                                            className="form-input"
                                                            type="text"
                                                            id="emailTitle"
                                                            name="emailTitle"
                                                            style={{ width: "100%" }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.emailTitle}
                                                        />
                                                        {formik.touched.emailTitle && formik.errors.emailTitle ? (
                                                            <div className='error-msg'>
                                                                {formik.errors.emailTitle}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <span>{t("قالب")}</span>
                                                </div>
                                                <div className="wrapper">
                                                    <div className="divModal">
                                                        <input
                                                            disabled
                                                            className={`form-input modal-input ${i18n.dir() === 'ltr' ? 'ltr' : ''}`}
                                                            type="text"
                                                            id="frame"
                                                            name="frame"
                                                            style={{ width: "100%" }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.frame}
                                                        />
                                                        <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`}>
                                                            <FrameModal getData={getData} />
                                                            <Button> <CancelIcon onClick={clearField} /></Button>
                                                        </div>
                                                        {formik.touched.frame && formik.errors.frame ? (
                                                            <div className='error-msg'>
                                                                {formik.errors.frame}
                                                            </div>
                                                        ) : null}
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
                                    onClick={id != null ? updateConnections : formik.handleSubmit}
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
                    </div>
                </form>
            </div>
        </>
    );
};

export default Connections;
