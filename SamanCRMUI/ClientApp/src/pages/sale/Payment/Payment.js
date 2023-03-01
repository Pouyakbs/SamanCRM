import React, { useRef, useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import * as Yup from "yup";
import { array, number, object, string } from 'yup';
import { useFormik } from "formik";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import DatePicker from "react-multi-date-picker";
import CategoryModal from '../../../components/Modals/CategoryModal/CategoryModal';
import CancelIcon from '@mui/icons-material/Cancel';
import { julianIntToDateTime } from '../../../utils/dateConvert';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Formik, Form, Field, FieldArray, ErrorMessage, FormikProvider } from "formik";
import DeleteIcon from '@mui/icons-material/Delete';
import FactorModal from '../../../components/Modals/FactorModal'
import SelectBox from 'devextreme-react/select-box';
import { renderCalendarSwitch, renderCalendarLocaleSwitch } from '../../../utils/calenderLang'
import { Typography } from "@mui/material";
import swal from 'sweetalert';
import DisableInputModal from "../../../components/Modals/SupportDisableInputModal/DisableInputModal";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { history } from "../../../utils/history";
import CurrencyInput from "react-currency-input-field";
import { parsFloatFunction } from "../../../utils/parsFloatFunction";
import DateObject from "react-date-object";
import { getLangDate } from "../../../utils/getLangDate";

export const Payment = () => {
    const { t, i18n } = useTranslation()
    const [alignment, setAlignment] = React.useState("")
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    }
    const appConfig = window.globalConfig;
    const [SearchParams] = useSearchParams();
    const id = SearchParams.get("id");
    const [result, setResult] = React.useState([]);
    const [open, setOpen] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [paymentDetail, setPaymentDetail] = React.useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [expanded, setExpanded] = React.useState(true);
    const [expanded2, setExpanded2] = React.useState(true);


    const [assignedTotal, setAssignedTotal] = React.useState(0)

    const [remainTotal, setRemainTotal] = React.useState(0)

    const onChangeHandller = (event, inindex, inlabel, arrhelper, props) => {
        formik.setFieldValue(`factor[${inindex}].${inlabel}`, event.target.value);
    };

    const dateRef1 = useRef()
    const dateRef2 = useRef()

    const initfactor =
    {
        factornumber: "",
        factorname: "",
        assignedto: 0,
        remainBefore: "",
        remainAfter: "",
        detail: ""
    }

    const callComponent = () => {
        history.navigate(`/sale/Payment/PaymentManagement`);
    };
    const formik = useFormik({
        validateOnChange: false,
        initialValues: {
            name: "",
            number: "",
            parentName: "",
            associated: "",
            direction: "",
            forecastedDate: new DateObject(),
            moneyUnit: "",
            doneDate: new DateObject(),
            amount: 0,
            type: "",
            status: "",
            paymentMethod: "",
            customerSMS: "",
            customer: "",
            referenceNum: "",
            paymentCompany: "",
            branch: "",
            fund: "",
            assignedcount: "",
            remaincount: "",
            desc: "",
            factor: [],
        },

        validationSchema: Yup.object().shape({
            name: Yup.string()
                .max(15, "نام باید شامل 15 حرف یا کمتر باشد")
                .required("نام الزامیست"),

            type: Yup.string().required("نوع الزامیست"),

            forecastedDate: Yup.date().required("انتخاب تاریخ الزامی است"),

            moneyUnit: Yup.string().required("واحد پول الزامیست"),

            doneDate: Yup.date().required("انتخاب تاریخ الزامی است"),

            associated: Yup.string()
                .required("نام والد الزامیست"),

            paymentMethod: Yup.string()
                .required("نحوه پرداخت الزامیست"),


            direction: Yup.string()
                .required("جهت الزامیست"),




            factor: array(
                object({

                    factornumber: number()
                        .required('شماره فاکتور الزامی است')

                })
            ),



        }),

        onSubmit: (values) => {
            var factor = JSON.stringify(values.factor);
            var assignedcount = JSON.stringify(values.assignedcount);
            var remaincount = JSON.stringify(values.remaincount);
            values.factor = factor;
            values.assignedcount = assignedcount;
            values.remaincount = remaincount;
            axios
                .post(`${appConfig.BaseURL}/api/payment`, values)
                .then((res) => setResult(res.data.data));
            factorSub();
            callComponent();
        },

    });
    const factorSub = () => {
        swal({
            title: t("اطلاعات پرداخت با موفقیت ثبت شد"),
            icon: "success",
            button: t("باشه"),
        });
    };

    useEffect(() => {
        if (id != null) {
            axios.get(`${appConfig.BaseURL}/api/payment/${id}`).then((res) => {
                setPaymentDetail(res.data.data);
                formik.setFieldValue("name", res.data.data.name);
                formik.setFieldValue("number", res.data.data.number);
                formik.setFieldValue("parentName", res.data.data.parentName);
                formik.setFieldValue("associated", res.data.data.associated);
                formik.setFieldValue("direction", res.data.data.direction);
                formik.setFieldValue("forecastedDate", res.data.data.forecastedDate);
                formik.setFieldValue("moneyUnit", res.data.data.moneyUnit);
                formik.setFieldValue("doneDate", res.data.data.doneDate);
                formik.setFieldValue("amount", res.data.data.amount);
                formik.setFieldValue("type", res.data.data.type);
                formik.setFieldValue("status", res.data.data.status);
                formik.setFieldValue("paymentMethod", res.data.data.paymentMethod);
                formik.setFieldValue("customerSMS", res.data.data.customerSMS);
                formik.setFieldValue("customer", res.data.data.customer);
                formik.setFieldValue("referenceNum", res.data.data.referenceNum);
                formik.setFieldValue("paymentCompany", res.data.data.paymentCompany);
                formik.setFieldValue("branch", res.data.data.branch);
                formik.setFieldValue("fund", res.data.data.fund);
                formik.setFieldValue("assignedcount", res.data.data.assignedcount);
                formik.setFieldValue("remaincount", res.data.data.remaincount);
                formik.setFieldValue("desc", res.data.data.desc);
            });
        }
    }, [id]);

    const updatePayment = (values) => {
        if (values != null) {
            formik.values.factor = JSON.stringify(formik.values.factor);
            formik.values.assignedcount = JSON.stringify(formik.values.assignedcount);
            formik.values.remaincount = JSON.stringify(formik.values.remaincount);
            let isSuccess = false;
            axios
                .put(
                    `${appConfig.BaseURL}/api/payment/Update/${id}`,
                    formik.values
                )
                .then((res) => {
                    setResult(res.data);
                    isSuccess = true;
                })
                .finally(() => {
                    if ((isSuccess = true)) {
                        callComponent();
                    }
                });
        }
    };
    const handleChange2 = () => (event, newExpanded) => {
        setExpanded(newExpanded);
    };


    const handleChange3 = () => (event, newExpanded) => {
        setExpanded2(newExpanded);
    };

    const [dropdown, setDropdown] = React.useState()

    function getBranch(val) {

        formik.setFieldValue('branch', val.CategoryName)

    }
    function getfund(val) {

        formik.setFieldValue('fund', val.CategoryName)

    }
    function getCustomer(val) {

        formik.setFieldValue('customer', val.CategoryName)

    }
    function getParentData(val) {
        formik.setFieldValue("associated", val.machineWhereaboutsInput);
    }

    function clearFieldAssociated() {
        formik.setFieldValue('associated', "")
    }

    function clearFieldCustomer() {
        formik.setFieldValue('customer', "")
    }

    function clearFieldfund() {
        formik.setFieldValue('fund', "")
    }

    function clearFieldBranch() {
        formik.setFieldValue('branch', "")
    }


    function clearfieldfactor(index) {
        formik.setFieldValue(`factor[${index}].factorname`, "")
        formik.setFieldValue(`factor[${index}].remainBefore`, "")
        formik.setFieldValue(`factor[${index}].factornumber`, "")

    }

    function HandleSalePriceChange(value) {
        let temp = value.replaceAll(",", "");
        formik.setFieldValue("amount", parsFloatFunction(temp, 2));
      }

    React.useEffect(() => {
        if (formik.isSubmitting) {

            let condition1 = !!((formik.touched.name && formik.errors.name) ||
                (formik.touched.type && formik.errors.type) ||
                (formik.touched.associated && formik.errors.associated) ||
                (formik.touched.startDate && formik.errors.startDate) ||
                (formik.touched.paymentMethod && formik.errors.paymentMethod) ||
                (formik.touched.direction && formik.errors.direction) ||
                (formik.touched.moneyUnit && formik.errors.moneyUnit))

            let condition2 = !!(
                (formik.errors.factor)
            )
            setExpanded(condition1 || expanded)
            setExpanded2(condition2 || expanded2)
        }

    }, [formik])




    React.useEffect(() => {
        if (formik.values.factor) {
            const result = formik?.values?.factor?.reduce((total, currentValue) => total = total + currentValue.remainBefore, 0);
            setRemainTotal(result)
            const assignedresult = formik?.values?.factor?.reduce((total, currentValue) => total = total + parseInt(currentValue.assignedto), 0);
            setAssignedTotal(assignedresult)
        }

    }, [formik.values.factor])

    React.useEffect(() => {
        formik.setFieldValue('remaincount', remainTotal || 0);

    }, [remainTotal])

    React.useEffect(() => {
        formik.setFieldValue('assignedcount', assignedTotal || 0)
    }, [assignedTotal])

    const getinfo = (val, index) => {

        formik.setFieldValue(`factor[${index}].factornumber`, val.num);
        formik.setFieldValue(`factor[${index}].remainBefore`, val.remain);
        formik.setFieldValue(`factor[${index}].factorname`, val.name);

    }

    const currencySelectList = ["Rial : ریال", "Dollar : $", "Euro : €"];
    const directionSelectList = [t("ورودی"), t("خروجی")];
    const testSelectList = [t("تست 1"), t("تست 2"), t("تست 3")];
    const associatedselectList = [t("حساب"), t("مرکز سرویس"), t("تامین کننده")];
    const statusSelectList = [t("مانده باز"), t("توافق شده"), t("لغو شده"), t("پرداخت شده")];
    const typeSelectList = [t("پرداخت وجه فاکتور فروش"), t("پیش پرداخت"), t("تهاتر"), t("سپرده بیمه"), t("سپرده حسن انجام کار"), t("استرداد بیمه")];
    const paymentSelectList = [t("نقدی"), t("چک"), t("انلاین"), t("حواله بانکی"), t("حواله ارزی")];
    const messageSelectList = [t("یک دقیقه قبل از شروع"), t("یک ساعت قبل از شروع"), t("سه ساعت قبل از شروع"), t("یک روز قبل از شروع"), t("دو روز قبل از شروع")];




    return (
        <>


            <div id='form'>
                <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                        {/*<h1 className={'main-title'}>{t('ایجاد پرداخت')}</h1>*/}
                        <Accordion expanded={expanded} onChange={handleChange2()} >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"

                            >
                                <Typography><span>{t("اطلاعات پرداخت")}</span></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div  >
                                    <div className="form-design">
                                        <div className="row">
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <span>{t("نام")} <span className='star'>*</span></span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <input
                                                            className="form-input"
                                                            type="text"
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
                                                    <span>{t("شماره")} </span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <input
                                                            className="form-input"
                                                            type="text"
                                                            name="number"
                                                            style={{ width: "100%" }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.number}

                                                        />


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="row">
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span className="spanDisableInput">
                                                                {t("نام والد")}
                                                                <span className="star">*</span>
                                                            </span>
                                                        </div>
                                                        <div className="wrapper">
                                                            {id != null && formik.values.parentName != "" && (
                                                                <SelectBox
                                                                    dataSource={associatedselectList}
                                                                    rtlEnabled={
                                                                        i18n.dir() == "ltr" ? false : true
                                                                    }
                                                                    onValueChanged={(e) => {
                                                                        console.log("------e111", e);
                                                                        formik.setFieldValue("parentName", e.value);
                                                                    }}
                                                                    defaultValue={formik.values.parentName}
                                                                    className="selectBox"
                                                                    noDataText="اطلاعات یافت نشد"
                                                                    placeholder=""
                                                                    name="parentName"
                                                                    id="parentName"
                                                                    searchEnabled
                                                                    showClearButton
                                                                //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                                                                />
                                                            )}
                                                            {(!id ||
                                                                (id != null &&
                                                                    formik.values.parentName == "")) && (
                                                                    <SelectBox
                                                                        dataSource={associatedselectList}
                                                                        rtlEnabled={
                                                                            i18n.dir() == "ltr" ? false : true
                                                                        }
                                                                        onValueChanged={(e) => {
                                                                            console.log("------e555555555555", e);
                                                                            formik.setFieldValue("parentName", e.value);
                                                                        }}
                                                                        defaultValue={formik.values.parentName}
                                                                        className="selectBox"
                                                                        noDataText="اطلاعات یافت نشد"
                                                                        placeholder=""
                                                                        name="parentName"
                                                                        id="parentName"
                                                                        searchEnabled
                                                                        showClearButton
                                                                    //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                                                                    />
                                                                )}
                                                            {formik.touched.parentName &&
                                                                formik.errors.parentName &&
                                                                !formik.values.parentName ? (
                                                                <div className="error-msg">
                                                                    {t(formik.errors.parentName)}
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                                        <div className="title">
                                                            <span className="spanDisableInput">‌</span>
                                                        </div>
                                                        <div
                                                            className="wrapper"
                                                            style={{ position: "relative" }}
                                                        >
                                                            <input
                                                                className={`form-input modal-input ${i18n.dir() === "ltr" ? "ltr" : ""
                                                                    }`}
                                                                type="text"
                                                                id="associated"
                                                                name="associated"
                                                                style={{ width: "100%" }}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.associated}
                                                                disabled
                                                            />
                                                            {formik.touched.associated &&
                                                                formik.errors.associated ? (
                                                                <div className="error-msg">
                                                                    {t(formik.errors.associated)}
                                                                </div>
                                                            ) : null}
                                                            <div
                                                                className={`modal-action-button  ${i18n.dir() == "ltr" ? "action-ltr" : ""
                                                                    }`}
                                                            >
                                                                <DisableInputModal
                                                                    disabled={!formik.values.parentName}
                                                                    className="modal"
                                                                    getData={getParentData}
                                                                />
                                                                <Button>
                                                                    {" "}
                                                                    <CancelIcon
                                                                        onClick={() =>
                                                                            formik.setFieldValue("associated", "")
                                                                        }
                                                                    />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12" onFocus={() => dateRef1?.current?.closeCalendar()}>
                                                <div className="title">
                                                    <span>{t("جهت")} <span className='star'>*</span></span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={directionSelectList}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            className='selectBox'
                                                            noDataText={t('اطلاعات یافت نشد')}
                                                            itemRender={null}
                                                            placeholder=''
                                                            searchEnabled
                                                            onValueChanged={(e) => formik.setFieldValue('direction', e.value)}
                                                            defaultValue={null}
                                                        />
                                                        {formik.touched.direction && formik.errors.direction &&
                                                            !formik.values.direction ? (
                                                            <div className='error-msg'>{t(formik.errors.direction)}</div>) : null}


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <span>{t("تاریخ پیش بینی شده")} <span className="star">*</span></span>
                                                </div>
                                                <div className="wrapper">

                                                    <div className='date-picker position-relative' >
                                                        <DatePicker
                                                            id="forecastedDate"
                                                            editable={false}
                                                            ref={dateRef1}
                                                            calendar={renderCalendarSwitch(i18n.language)}
                                                            locale={renderCalendarLocaleSwitch(i18n.language)}
                                                            calendarPosition="bottom-right"
                                                            name='forecastedDate'
                                                            onBlur={formik.handleBlur}
                                                            onChange={(val) => {
                                                                formik.setFieldValue(
                                                                    "forecastedDate",
                                                                    julianIntToDateTime(val.toJulianDay())
                                                                );
                                                            }}
                                                            value={getLangDate(i18n.language , formik.values.forecastedDate)}
                                                        />
                                                        <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                                                            <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal' /></div>
                                                        </div>
                                                        {formik.touched.forecastedDate && formik.errors.forecastedDate && !formik.values.forecastedDate ? (<div className='error-msg'>{t(formik.errors.forecastedDate)}</div>) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12" onFocus={() => {
                                                dateRef1?.current?.closeCalendar();
                                                dateRef2?.current?.closeCalendar();
                                            }}>
                                                <div className="title">
                                                    <span>{t("واحد پول")} <span className='star'>*</span></span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={currencySelectList}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            className='selectBox'
                                                            noDataText={t('اطلاعات یافت نشد')}
                                                            itemRender={null}
                                                            placeholder=''
                                                            searchEnabled
                                                            onValueChanged={(e) => formik.setFieldValue('moneyUnit', e.value)}
                                                            defaultValue={currencySelectList[0]}
                                                        />
                                                        {formik.touched.moneyUnit && formik.errors.moneyUnit &&
                                                            !formik.values.moneyUnit ? (
                                                            <div className='error-msg'>
                                                                {t(formik.errors.moneyUnit)}</div>) : null}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <span>{t("تاریخ انجام شده")} <span className="star">*</span></span>
                                                </div>
                                                <div className="wrapper">

                                                    <div className='date-picker position-relative' >
                                                        <DatePicker
                                                            id="doneDate"
                                                            editable={false}
                                                            ref={dateRef2}
                                                            calendar={renderCalendarSwitch(i18n.language)}
                                                            locale={renderCalendarLocaleSwitch(i18n.language)}
                                                            calendarPosition="bottom-right"
                                                            name='doneDate'
                                                            onChange={(val) => {
                                                                formik.setFieldValue(
                                                                    "doneDate",
                                                                    julianIntToDateTime(val.toJulianDay())
                                                                );
                                                            }}
                                                            value={getLangDate(i18n.language , formik.values.doneDate)}
                                                            onBlur={formik.handleBlur}
                                                        />
                                                        <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                                                            <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal' /></div>
                                                        </div>
                                                        {formik.touched.doneDate && formik.errors.doneDate && !formik.values.doneDate ? (<div className='error-msg'>{t(formik.errors.doneDate)}</div>) : null}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12" onFocus={() => dateRef2?.current?.closeCalendar()}>
                                                <div className="title">
                                                    <span>{t("مقدار")}</span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <CurrencyInput
                                                            className="form-input"
                                                            style={{ width: "100%" }}
                                                            id="amount"
                                                            name="amount"
                                                            decimalsLimit={2}
                                                            onChange={(e) =>
                                                                HandleSalePriceChange(e.target.value)
                                                            }
                                                        />
                                                        {formik.touched.amount && formik.errors.amount ? (
                                                            <div className='error-msg'>
                                                                {t(formik.errors.amount)}
                                                            </div>
                                                        ) : null}


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <span>{t("نوع")} <span className='star'>*</span></span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={typeSelectList}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            className='selectBox'
                                                            noDataText={t('اطلاعات یافت نشد')}
                                                            itemRender={null}
                                                            placeholder=''
                                                            searchEnabled
                                                            onValueChanged={(e) => formik.setFieldValue('type', e.value)}
                                                            defaultValue={null}
                                                        />
                                                        {formik.touched.type && formik.errors.type &&
                                                            !formik.values.type ? (
                                                            <div className='error-msg'>{t(formik.errors.type)}</div>) : null}

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
                                                            dataSource={statusSelectList}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            className='selectBox'
                                                            noDataText={t('اطلاعات یافت نشد')}
                                                            itemRender={null}
                                                            placeholder=''
                                                            searchEnabled
                                                            onValueChanged={(e) => formik.setFieldValue('status', e.value)}
                                                            showClearButton
                                                            defaultValue={null}
                                                        />


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <span>{t("نحوه پرداخت")} <span className='star'>*</span></span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={paymentSelectList}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            className='selectBox'
                                                            noDataText={t('اطلاعات یافت نشد')}
                                                            itemRender={null}
                                                            placeholder=''
                                                            searchEnabled
                                                            onValueChanged={(e) => formik.setFieldValue('paymentMethod', e.value)}
                                                            defaultValue={null}
                                                        />
                                                        {formik.touched.paymentMethod && formik.errors.paymentMethod &&
                                                            !formik.values.paymentMethod ? (
                                                            <div className='error-msg'>{t(formik.errors.paymentMethod)}</div>) : null}

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
                                expandIcon={<ExpandMoreIcon style={{ float: 'right' }} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography><span>{t("اطلاعات بیشتر")}</span></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div  >
                                    <div className="form-design">
                                        <div className="row">
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <span>{t("پیامک یاداوری به مشتری")}</span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={messageSelectList}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            className='selectBox'
                                                            noDataText={t('اطلاعات یافت نشد')}
                                                            itemRender={null}
                                                            placeholder=''
                                                            searchEnabled
                                                            onValueChanged={(e) => formik.setFieldValue('customerSMS', e.value)}
                                                            showClearButton
                                                            defaultValue={null}
                                                        />



                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12" >
                                                <div className="title">
                                                    <span>{t("فرد")} </span>
                                                </div>
                                                <div className="wrapper">
                                                    <div className='row'>
                                                        <div className='content col-lg-12 col-md-12 col-xs-12' style={{ position: 'relative' }}>

                                                            <input
                                                                className={`form-input modal-input ${i18n.dir() === 'ltr' ? 'ltr' : ''}`}
                                                                type="text"
                                                                disabled
                                                                name="customer"
                                                                style={{ width: "100%" }}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.customer}

                                                            />
                                                            <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`}>
                                                                <CategoryModal className='modal2' getData={getCustomer} />
                                                                <Button className='modal' > <CancelIcon onClick={clearFieldCustomer} /></Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <span>{t("شماره مرجع")}</span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <input

                                                            className="form-input"
                                                            type="text"
                                                            name="referenceNum"
                                                            style={{ width: "100%" }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.referenceNum}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <span>{t("شرکت پرداخت")}</span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={testSelectList}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            className='selectBox'
                                                            noDataText={t('اطلاعات یافت نشد')}
                                                            itemRender={null}
                                                            placeholder=''
                                                            searchEnabled
                                                            showClearButton
                                                            onValueChanged={(e) => formik.setFieldValue('paymentCompany', e.value)}
                                                            defaultValue={null}
                                                        />


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <span>{t("شعبه")}</span>
                                                </div>
                                                <div className="wrapper">
                                                    <div className='row'>
                                                        <div className="content col-lg-12 col-md-12 col-xs-12" style={{ position: 'relative' }}>
                                                            <input
                                                                className={`form-input modal-input ${i18n.dir() === 'ltr' ? 'ltr' : ''}`}
                                                                type="text"
                                                                disabled
                                                                name="branch"
                                                                style={{ width: "100%" }}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.branch}

                                                            />
                                                            <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`}>
                                                                <CategoryModal className='modal2' getData={getBranch} />
                                                                <Button className='modal' > <CancelIcon onClick={clearFieldBranch} /></Button>
                                                            </div>

                                                        </div>





                                                    </div>
                                                </div>
                                            </div>
                                            <div className="content col-lg-6 col-md-6 col-xs-12">
                                                <div className="title">
                                                    <span>{t("صندوق")}</span>
                                                </div>
                                                <div className="wrapper">
                                                    <div className='row'>
                                                        <div className="content col-lg-12 col-md-12 col-xs-12" style={{ position: 'relative' }}>
                                                            <input
                                                                className={`form-input modal-input ${i18n.dir() === 'ltr' ? 'ltr' : ''}`}
                                                                type="text"
                                                                disabled
                                                                name="fund"
                                                                style={{ width: "100%" }}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.fund}

                                                            />
                                                            <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`}>
                                                                <CategoryModal className='modal2' getData={getfund} />
                                                                <Button className='modal' > <CancelIcon onClick={clearFieldfund} /></Button>
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

                        <Accordion expanded={expanded2} onChange={handleChange3()}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{ float: 'right' }} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography><span>{t("اقلام خط")}</span></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="form-design">
                                    <FieldArray
                                        name="factor"
                                        render={({ push, remove }) => (
                                            <>
                                                <div className="content">
                                                    <Button style={{ fontWeight: "bold", margin: "10px" }} onClick={() => push(initfactor)}> {t("افزودن فاکتور")}</Button>
                                                </div>
                                                <div >
                                                    {formik.values.factor.map((factor, index) => (
                                                        <div key={index}>
                                                            <div className="wrapper">
                                                                <div className="row align-items-center" style={{ marginTop: '10px' }}>
                                                                    <div className="content col-lg-1 col-md-3 col-xs-12">
                                                                        <div className="title">
                                                                            <span>{t("شماره")} <span className='star'>*</span></span>
                                                                        </div>
                                                                        <div className="wrapper">
                                                                            <input
                                                                                className="disabled-form-input form-input"
                                                                                type="text"
                                                                                name={`factor[${index}].factornumber`}
                                                                                style={{ width: "100%" }}
                                                                                onChange={(e) =>
                                                                                    onChangeHandller(e, index, "factornumber")
                                                                                }
                                                                                onBlur={formik.handleBlur}
                                                                                value={formik.values.factor[index].factornumber}
                                                                                disabled
                                                                            />


                                                                        </div>
                                                                    </div>
                                                                    <div className="content col-lg-2 col-md-3 col-xs-12">
                                                                        <div className="title">
                                                                            <span>{t("نام فاکتور")}</span>
                                                                        </div>
                                                                        <div className="wrapper">

                                                                            <div className='row'>
                                                                                <div className="content col-lg-12 col-md-12 col-xs-12" style={{ position: 'relative' }}>
                                                                                    <input
                                                                                        className={`form-input modal-input ${i18n.dir() === 'ltr' ? 'ltr' : ''}`}
                                                                                        type="text"
                                                                                        name={`factor[${index}].factorname`}
                                                                                        style={{ width: "100%" }}
                                                                                        onChange={(e) =>
                                                                                            onChangeHandller(e, index, "factorname")
                                                                                        }
                                                                                        onBlur={formik.handleBlur}
                                                                                        value={formik.values.factor[index].factorname}
                                                                                        disabled
                                                                                    />

                                                                                    <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >
                                                                                        <FactorModal className='modal2' getData={(val) => getinfo(val, index)} />
                                                                                        <Button className='modal' > <CancelIcon onClick={() => clearfieldfactor(index)} /></Button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div className="content col-lg-2 col-md-3 col-xs-12">
                                                                        <div className="title">
                                                                            <span>{t("تخصیص یافته")}</span>
                                                                        </div>
                                                                        <div className="wrapper">
                                                                            <input
                                                                                className="form-input"
                                                                                type="number"
                                                                                name={`factor[${index}].assignedto`}
                                                                                style={{ width: "100%" }}
                                                                                onChange={(e) =>
                                                                                    onChangeHandller(e, index, "assignedto")
                                                                                }
                                                                                onBlur={formik.handleBlur}
                                                                                value={formik.values.factor[index].assignedto}

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="content col-lg-2 col-md-3 col-xs-12">
                                                                        <div className="title">
                                                                            <span>{t("مانده(قبل)")}</span>
                                                                        </div>
                                                                        <div className="wrapper">
                                                                            <input
                                                                                className="disabled-form-input form-input"
                                                                                type="text"
                                                                                name={`factor[${index}].remainBefore`}
                                                                                style={{ width: "100%" }}
                                                                                onChange={(e) =>
                                                                                    onChangeHandller(e, index, "remainBefore")
                                                                                }
                                                                                onBlur={formik.handleBlur}
                                                                                value={formik.values.factor[index].remainBefore}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="content col-lg-2 col-md-3 col-xs-12">
                                                                        <div className="title">
                                                                            <span>{t("مانده(بعد)")}</span>
                                                                        </div>
                                                                        <div className="wrapper">
                                                                            <input
                                                                                className="disabled-form-input form-input"
                                                                                type="text"
                                                                                name={`factor[${index}].remainAfter`}
                                                                                style={{ width: "100%" }}
                                                                                onChange={(e) =>
                                                                                    onChangeHandller(e, index, "remainAfter")
                                                                                }
                                                                                onBlur={formik.handleBlur}
                                                                                value={formik.values.factor[index].remainAfter}
                                                                                disabled
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="content col-lg-2 col-md-3 col-xs-12">
                                                                        <div className="title">
                                                                            <span>{t("توضیحات")}</span>
                                                                        </div>
                                                                        <div className="wrapper">
                                                                            <input
                                                                                className="form-input"
                                                                                type="text"
                                                                                name={`factor[${index}].detail`}
                                                                                style={{ width: "100%" }}
                                                                                onChange={(e) =>
                                                                                    onChangeHandller(e, index, "detail")
                                                                                }
                                                                                onBlur={formik.handleBlur}
                                                                                value={formik.values.factor[index].detail}

                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="content col-auto col-xs-12">
                                                                        <div className="title">
                                                                            <span>‌</span>
                                                                        </div>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => remove(index)}
                                                                            className="remove-btn"
                                                                        >
                                                                            <DeleteIcon fontSize="medium" />
                                                                        </button>

                                                                    </div>

                                                                    <div className="content col-12 ">

                                                                        {Array.isArray(formik.errors.factor) ?
                                                                            formik.errors.factor[index]?.factornumber &&
                                                                            <div className='error-msg'>{t(formik.errors.factor[index]?.factornumber)}</div> : null}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    ))}

                                                </div>
                                            </>
                                        )}
                                    />

                                    <div className="row">
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("مجموع تخصیص یافته")}</span>
                                            </div>
                                            <div className="wrapper">

                                                <div style={{ position: 'relative' }}>
                                                    <input
                                                        className="disabled-form-input form-input"
                                                        type="text"
                                                        name="assignedcount"
                                                        style={{ width: "100%" }}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.assignedcount}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6 col-md-6'></div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("مجموع باقیمانده")}</span>
                                            </div>
                                            <div className="wrapper">

                                                <div style={{ position: 'relative' }}>
                                                    <input
                                                        className="disabled-form-input form-input"
                                                        type="text"
                                                        name="remaincount"
                                                        style={{ width: "100%" }}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.remaincount}

                                                        disabled

                                                    />


                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon style={{ float: 'right' }} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography><span>{t("توضیحات")}</span></Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="form-design">
                                    <div className="row">
                                        <div className="content col-lg-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("توضیحات")} </span>
                                            </div>
                                            <div className="wrapper">
                                                <div>
                                                    <textarea
                                                        className="form-input"
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

                            </AccordionDetails>
                        </Accordion>

                        <div className="button-pos">
                            <Button
                                variant="contained"
                                color="success"
                                type="button"
                                onClick={id != null ? updatePayment : formik.handleSubmit}
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

                    </form>
                </FormikProvider>
            </div>


        </>
    )
}

export default Payment;