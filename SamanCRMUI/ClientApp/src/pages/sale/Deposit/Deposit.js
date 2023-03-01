import React, { useEffect, useRef } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import * as Yup from "yup";
import { useFormik } from "formik";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import Button from '@mui/material/Button';
import DatePicker from "react-multi-date-picker";
import CategoryModal from '../../../components/Modals/CategoryModal/CategoryModal';
import CancelIcon from '@mui/icons-material/Cancel';
import { julianIntToDate } from '../../../utils/dateConvert';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CurrencyInput from 'react-currency-input-field';
import SelectBox from 'devextreme-react/select-box';
import { Typography } from "@mui/material";
import {renderCalendarSwitch,renderCalendarLocaleSwitch} from '../../../utils/calenderLang'
import {parsFloatFunction} from '../../../utils/parsFloatFunction'
import swal from 'sweetalert';
import DateObject from "react-date-object";
import { getLangDate } from "../../../utils/getLangDate";




export const Deposit = () => {
    const { t, i18n } = useTranslation();
    const [alignment, setAlignment] = React.useState("");
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dateRef=useRef()

    const formik = useFormik({
        validateOnChange: false,
        initialValues: {

            title: "",
            number: "",
            account: "",
            contract: "",
            registerDate: new DateObject(),
            price: "",
            currency: "",
            status: "",
            referalCode: "",
            user: "",
            recieptsendercompany: "",
            detail: "",

        },

        validationSchema: Yup.object({
            title: Yup.string().max(15, "عنوان باید شامل 15 حرف یا کمتر باشد").required("عنوان الزامیست"),
            account: Yup.string().required("وارد کردن حساب الزامیست"),
            price: Yup.string().required("مبلغ الزامیست"),
            registerDate: Yup.date().required("انتخاب تاریخ الزامی است")

            }),
    

        onSubmit: (values) => {

            console.log(values);
            factorSub()
        }

    });
    const factorSub = () => {
        swal({
            title: t("فاکتور با موفقیت ثبت شد"),
            icon: "success",
            button: t("باشه"),
        });
    };
    const [expanded, setExpanded] = React.useState(true);

    const handleChange2 = () => (event, newExpanded) => {
        setExpanded(newExpanded);
    };

    const [dropdown, setDropdown] = React.useState()

    function getData(val) {

        formik.setFieldValue('productCategory', val.CategoryName)
        console.log(formik.values.productCategory)
    }
    function setaccount(val) {

        formik.setFieldValue('account', val.CategoryName)

    }

    function setcontract(val) {

        formik.setFieldValue('contract', val.CategoryName)

    }

    function setuser(val) {

        formik.setFieldValue('user', val.CategoryName)

    }
    function getassociated(val) {

        formik.setFieldValue('associated', val.CategoryName)

    }



    function clearField() {
        formik.setFieldValue('account', "")
    }

    function clearFieldcontract() {
        formik.setFieldValue('contract', "")
    }
    function clearFielduser() {
        formik.setFieldValue('user', "")
    }



    function HandleSalePriceChange(value) {
        let temp = value.replaceAll(',', '')
        formik.setFieldValue('price', parsFloatFunction(temp, 2))
    }

    const currencySelectList = ["Rial : ریال", "Dollar : $", "Euro : €"];
    const testSelectList = [ t("تست 1"), t("تست 2"), t("تست 3")];






    useEffect(() => {
        if (formik.isSubmitting) {

            let condition1 = !!((formik.touched.title && formik.errors.title) ||
                (formik.touched.account && formik.errors.account) ||
                (formik.touched.price && formik.errors.price) ||
                (formik.touched.registerDate && formik.errors.registerDate))


            setExpanded(condition1 || expanded)

        }

    }, [formik])




    return (
        <>
            <div id='form'>
                <form onSubmit={formik.handleSubmit}>
                    {/*<h1*/}
                    {/*  className={"main-title"}*/}
                    {/*>*/}
                    {/*    {t("ایجاد ودیعه")}*/}
                    {/*</h1>*/}
                    <Accordion expanded={expanded} onChange={handleChange2()} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"

                        >
                            <Typography><span>{t("اطلاعات ودیعه")}</span></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="form-design">
                                <div className="row">
                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                        <div className="title">
                                            <span>{t("عنوان")} <span className='star'>*</span></span>
                                        </div>
                                        <div className="wrapper">
                                            <div>
                                                <input
                                                  className="form-input"
                                                  type="text"
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
                                        <div className="title">
                                            <span>{t("حساب")} <span className='star'>*</span></span>
                                        </div>
                                        <div className="wrapper">
                                            <div className="row">
                                                <div className="content col-lg-12 col-md-12 col-xs-12">
                                                    <div style={{ position: 'relative' }}>
                                                        <input
                                                          className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                          type="text"
                                                          name="account"
                                                          style={{ width: "100%" }}
                                                          onChange={formik.handleChange}
                                                          onBlur={formik.handleBlur}
                                                          value={formik.values.account}
                                                          disabled
                                                        />
                                                        {formik.touched.account && formik.errors.account ? (
                                                          <div className='error-msg'>
                                                              {t(formik.errors.account)}
                                                          </div>
                                                        ) : null}
                                                        <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`}>
                                                            <CategoryModal className='modal2' getData={setaccount} />
                                                            <Button className='modal' > <CancelIcon onClick={clearField} /></Button>
                                                        </div>
                                                    </div>

                                                </div>






                                            </div>
                                        </div>
                                    </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("واحد پول")} </span>
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
                                                      onValueChanged={(e) => formik.setFieldValue('currency', e.value)}
                                                      defaultValue={currencySelectList[0]}
                                                    />
                                                    {formik.touched.currency && formik.errors.currency &&
                                                    !formik.values.currency ? (
                                                      <div className='error-msg'>{t(formik.errors.currency)}</div>) : null}


                                                </div>
                                            </div>
                                    </div>


                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                        <div className="title">
                                            <span>{t("قرارداد")}</span>
                                        </div>
                                        <div className="wrapper">
                                            <div className="row">
                                                <div className="content col-lg-12 col-md-12 col-xs-12">
                                                    <div style={{ position: 'relative' }}>
                                                        <input
                                                          className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                          type="text"
                                                          disabled
                                                          name="contract"
                                                          style={{ width: "100%" }}
                                                          onChange={formik.handleChange}
                                                          onBlur={formik.handleBlur}
                                                          value={formik.values.contract}

                                                        />
                                                        <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`}>
                                                            <CategoryModal className='modal2' getData={setcontract} />
                                                            <Button className='modal' > <CancelIcon onClick={clearFieldcontract} /></Button>
                                                        </div>

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="content col-lg-6 col-md-6 col-xs-12" onFocus={()=> dateRef?.current?.closeCalendar()}>
                                        <div className="title">
                                            <span>{t("مبلغ")} <span className='star'>*</span></span>
                                        </div>
                                        <div className="wrapper">
                                            <div>
                                                <CurrencyInput
                                                  className='form-input'
                                                  style={{ width: "100%" }}
                                                  id="price"
                                                  name="price"
                                                  decimalsLimit={2}
                                                  onChange={(e) => HandleSalePriceChange(e.target.value)}
                                                />

                                                {formik.touched.price && formik.errors.price ? (
                                                  <div className='error-msg'>
                                                      {t(formik.errors.price)}
                                                  </div>
                                                ) : null}

                                            </div>
                                        </div>
                                    </div>

                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                        <div className="title">
                                            <span>{t("تاریخ صدور")} <span className="star">*</span></span>
                                        </div>
                                        <div className="wrapper">

                                            <div className='date-picker position-relative' >
                                                <DatePicker
                                                  calendar={renderCalendarSwitch(i18n.language)}
                                                  locale={renderCalendarLocaleSwitch(i18n.language)}
                                                  editable={false}
                                                  ref={dateRef}
                                                  calendarPosition="bottom-right"
                                                  name='registerDate'
                                                  onBlur={formik.handleBlur}
                                                  onChange={(val) => {
                                                      formik.setFieldValue(
                                                        "registerDate",
                                                        julianIntToDate(val.toJulianDay())
                                                      );
                                                  }}
                                                  value={getLangDate(i18n.language , formik.values.registerDate)}
                                                />
                                                <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                                                    <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal'/></div>
                                                </div>
                                                {formik.touched.registerDate && formik.errors.registerDate && !formik.values.registerDate ? (<div className='error-msg'>{t(formik.errors.registerDate)}</div>) : null}

                                            </div>
                                        </div>
                                    </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12" onFocus={()=> dateRef?.current?.closeCalendar()}>
                                            <div className="title">
                                                <span>{t("وضعیت")}</span>
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
                                                      onValueChanged={(e) => formik.setFieldValue('status', e.value)}
                                                      defaultValue={null}
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
                            <Typography><span>{t("اطلاعات بیشتر")}</span></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="form-design">
                                <div className="row">
                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                        <div className="title">
                                            <span>{t("کد مرجع")}</span>
                                        </div>
                                        <div className="wrapper">
                                            <div>
                                                <input
                                                  className="form-input"
                                                  type="text"
                                                  name="referalCode"
                                                  style={{ width: "100%" }}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  value={formik.values.referalCode}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content col-lg-6 col-md-6 col-xs-12">
                                        <div className="title">
                                            <span>{t("کاربر")}</span>
                                        </div>
                                        <div className="wrapper">
                                            <div className='row'>
                                                <div className="content col-lg-12 col-md-12 col-xs-12" style={{ position: 'relative' }}>
                                                    <input
                                                      className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                      type="text"
                                                      name="user"
                                                      style={{ width: "100%" }}
                                                      onChange={formik.handleChange}
                                                      onBlur={formik.handleBlur}
                                                      value={formik.values.user}
                                                      disabled
                                                    />
                                                    <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`}>
                                                        <CategoryModal className='modal2' getData={setuser} />
                                                        <Button className='modal' > <CancelIcon onClick={clearFielduser} /></Button>
                                                    </div>

                                                </div>






                                            </div>

                                        </div>
                                    </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("شرکت ارسال کننده فاکتور")}</span>
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
                                                      onValueChanged={(e) => formik.setFieldValue(' recieptsendercompany', e.value)}
                                                      defaultValue={null}
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
                                                      type="text"

                                                      name="detail"
                                                      style={{ width: "100%" }}
                                                      onChange={formik.handleChange}
                                                      onBlur={formik.handleBlur}
                                                      value={formik.values.detail}

                                                    />
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
                </form>
            </div>

        </>
    )
}

export default Deposit;
