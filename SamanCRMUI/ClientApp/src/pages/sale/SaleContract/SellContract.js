import React, { useEffect, useRef, useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import * as Yup from "yup";
import { useFormik } from "formik";
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTranslation } from "react-i18next";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Button from '@mui/material/Button';
import DatePicker from "react-multi-date-picker";
import CategoryModal from '../../../components/Modals/CategoryModal/CategoryModal';
import CancelIcon from '@mui/icons-material/Cancel';
import { julianIntToDate } from '../../../utils/dateConvert';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SelectBox from 'devextreme-react/select-box';
import { renderCalendarSwitch, renderCalendarLocaleSwitch } from '../../../utils/calenderLang'
import { SelectProducts } from "../../../components/Modals/ModalGroup/SelectProducts";
import { EditProducts } from "../../../components/Modals/ModalGroup/EditProducts";
import { SelectMultipleProducts } from "../../../components/Modals/ModalGroup/SelectMultipleProducts";
import { UploadFileComponent } from "../../../components/Modals/ModalGroup/UploadFileComponent";
import { ApplyChanges } from "../../../components/Modals/ModalGroup/ApplyChanges";
import { Packaging } from "../../../components/Modals/ModalGroup/Packaging";
import { ShowLessDetails } from "../../../components/Modals/ModalGroup/ShowLessDetails";
import { ShowMoreDetails } from "../../../components/Modals/ModalGroup/ShowMoreDetails";
import { ShowDetails } from "../../../components/Modals/ModalGroup/ShowDetails";
import CloseIcon from '@mui/icons-material/Close';
import CurrencyInput from 'react-currency-input-field';
import DateObject from "react-date-object";
import DataGrid, { Column, Selection, Editing, Popup, Form, Texts, RowDragging } from 'devextreme-react/data-grid';
import { parsFloatFunction } from '../../../utils/parsFloatFunction'
import { getLangDate } from "../../../utils/getLangDate";

export const SellContract = () => {
    const { t, i18n } = useTranslation();
    const [alignment, setAlignment] = React.useState("");
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const [reciept, setReciept] = useState([]);

    const dateRef1=useRef()
    const dateRef2=useRef()
    const dateRef3=useRef()
    const dateRef4=useRef()
    const dateRef5=useRef()
    const dateRef6=useRef()


    const [open, setOpen] = React.useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const notesEditorOptions = { height: 100 };




    const [maxWidth, setMaxWidth] = React.useState('lg');
    const [fullWidth, setFullWidth] = React.useState(true);


    const [dropdown, setDropdown] = React.useState()


    const formik = useFormik({
        validateOnChange: false,
        initialValues: {

            title: "",
            state: "",
            startDate: new DateObject(),
            endDate: new DateObject(),
            associated: "",
            person: "",
            sellchance: "",
            referalcode: "",
            contracttype: "",
            manager: "",
            currency: "",
            total: 0,
            endtotal:0,
            discount: 0,
            transportation: 0,
            transportiontaxprice: 0,
            tax: 0,
            insurancedeposit: 0,
            jobdeposit: 0,
            obligationwarranty: 0,
            totalcount: 0,
            detail: "",
            customarsigndate: new DateObject(),
            companysigndate: new DateObject(),
            recieptsendercompany: "",
            duerecieptdate: new DateObject(),
            recieptsendperiod: "",
            recieptsendtype: "",
            reciepttype: "",
            rememberdate: new DateObject(),
            sellforecast: "",
            successChance: "",
            transportiontaxpricePercentage: '',
            insurancedepositPercentage: '',
            jobdepositPercentage: '',
            obligationwarrantyPercentage: '',
            invoice: []

        },


        validationSchema: Yup.object({
            title: Yup.string()
                .max(15, "?????????? ???????? ???????? 15 ?????? ???? ???????? ????????")
                .required("?????????? ????????????????"),
            state: Yup.string().required("?????????? ????????????????"),

            startDate: Yup.string().required(" ?????????? ???????? ????????????????"),

            endDate: Yup.string().required("?????????? ?????????? ????????????????")
            .when("startDate", (startDate) => {
                if (Date.parse(formik.values.endDate) - Date.parse(startDate) < 0)
                {
                  return Yup.date().min(startDate, "?????????? ?????????? ???????? ?????? ???? ?????????? ???????? ????????")
                }
              }),

            associated: Yup.string().required("?????????? ????  ????????????????"),

            currency: Yup.string().required("???????? ?????? ????????????????"),

            rememberdate: Yup.string().required("?????????? ??????????????  ????????????????"),
            companysigndate: Yup.string().required("?????????? ?????????? ????????  ????????????????"),
            customarsigndate: Yup.string().required("?????????? ?????????? ??????????  ????????????????"),
            duerecieptdate: Yup.string().required("???????????? ?????? ???? ????????????????"),


        }),



        onSubmit: (values) => {


            console.log(values);
        }

    });

   

    function getassociated(val) {

        formik.setFieldValue('associated', val.CategoryName)

    }

    function getData(val) {

        formik.setFieldValue('manager', val.CategoryName)

    }
    function getperson(val) {

        formik.setFieldValue('person', val.CategoryName)

    }
    function getchance(val) {

        formik.setFieldValue('sellchance', val.CategoryName)

    }

    function clearFieldAssociated() {
        formik.setFieldValue('associated', "")
    }
    function clearFieldmanager() {
        formik.setFieldValue('manager', "")
    }
    function clearFieldperson() {
        formik.setFieldValue('person', "")
    }
    function clearFieldsellchance() {
        formik.setFieldValue('sellchance', "")
    }

    const [endtotal, setEndtotal] = useState();
    const [panel1, setPanel1] = useState(true);
    const [panel2, setPanel2] = useState(true);
    const [panel4, setPanel4] = useState(true)


    const handlePanel1 = () => (event, newExpanded) => {

        setPanel1(newExpanded);
    };
    const handlePanel2 = () => (event, newExpanded) => {
        setPanel2(newExpanded);
    };
    const handlePanel4 = () => (event, newExpanded) => {
        setPanel4(newExpanded)
    }

    useEffect(() => {
        if (formik.isSubmitting) {

            let condition1 = !!((formik.touched.title && formik.errors.title) ||
                (formik.touched.state && formik.errors.state) ||
                (formik.touched.endDate && formik.errors.endDate) ||
                (formik.touched.startDate && formik.errors.startDate) ||
                (formik.touched.associated && formik.errors.associated))

            let condition2 = !!(formik.touched.currency && formik.errors.currency)
            let condition4 = !!((formik.touched.rememberdate && formik.errors.rememberdate) ||
            (formik.touched.companysigndate && formik.errors.companysigndate) ||
            (formik.touched.customarsigndate && formik.errors.customarsigndate) ||
            (formik.touched.duerecieptdate && formik.errors.duerecieptdate))


            setPanel1(condition1 || panel1)
            setPanel2(condition2 || panel2)
            setPanel4(condition4 || panel4)
        }

    }, [formik])

    const currencySelectList = ["Rial : ????????", "Dollar : $", "Euro : ???"];
    const sellforecastSelectList = [t("??????????"), t("?????? ??????????")];
    const testSelectList = [t("?????? 1"), t("?????? 2"), t("?????? 3")];
    const sendSelectList = [t("???? ??????"), t("???? 2 ??????"), t("???? 3 ??????"), t("???? 4 ??????"), t("???? 5 ??????"), t("???? 6 ??????"), t("????  ??????")];
    const contractSelectList = [t("???? ?????? ?????? ??????????????"), t("???????? ????????"), t("???? ?????? ????????"), t("???????????? ???? ?????????????? ????????"), t("?????????? ??????????")];
    const associatedselectList = [t("????????"), t("???????? ?????????? "), t("?????????? ??????????")];
    const percentselectList = [t("0%"), t("9%"), t("20%")];



    const [open2, setOpen2] = useState(false);

    const handleClickOpen = () => {
        setOpen2(true);

    };


    const [openmulti, setOpenMultiple] = useState(false);
    const handleClickOpenMultipleProducts = () => {
        setOpenMultiple(true);

    };

  

    const [openuploadfile, setOpenuploadfile] = useState(false);
    const handleClickOpenuploadfile = () => {
        setOpenuploadfile(true);

    };
   

    const [openapplychanges, setOpenapplychanges] = useState(false);
    const handleClickOpenapplychanges = () => {
        setOpenapplychanges(true);

    };
   
    const [openpackaging, setOpenpackaging] = useState(false);
    const handleClickOpenpackaging = () => {
        setOpenpackaging(true);

    };
  

   





    const clickArr = [t("?????????? ????????????"), t("?????????? ???????????? ??????????"), t("?????????? ???????????? ????????")];

    const [count, setCount] = React.useState(0);
    const buttonText = clickArr[count % clickArr.length];
    const handleClick = () => setCount((c) => c + 1);




    const handleClose2 = () => { setOpen2(false) }

    


    const setFactorr = (val) => {

        setReciept([...reciept, val])

       
    }

    const [difference, setDifference] = useState();

    const setchanges = (val) => {
        setDifference(val)

    }

    
    const [run, setRun] = useState(0);

    React.useEffect(() => {


        if (reciept.length) {

            const sub = reciept?.reduce((total, currentValue) => total = total + parseFloat(currentValue.subset), 0);
            const Discountresult = reciept?.reduce((total, currentValue) => total = total + parseFloat(currentValue.discountAmount), 0);
            const total = reciept?.reduce((total, currentValue) => total = total + parseFloat(currentValue.totalprice), 0);
            const tax = reciept?.reduce((total, currentValue) => total = total + parseFloat((currentValue.taxamount-1) * currentValue.PriceAfterDiscount), 0);
            formik.setFieldValue('total', parsFloatFunction(sub,2) || 0);
            formik.setFieldValue('endtotal', parsFloatFunction(total,2) || 0);
            formik.setFieldValue('discount', parsFloatFunction(Discountresult,2) || 0);
            formik.setFieldValue('tax', parsFloatFunction(tax,2) || 0);


        }

        else {
            const sub = 0;
            const Discountresult = 0;
            const total = 0;
            const tax = 0;

            formik.setFieldValue('total', sub || 0);
            formik.setFieldValue('endtotal', total || 0);
            formik.setFieldValue('discount', Discountresult || 0);
            formik.setFieldValue('tax', tax || 0);

        }

        formik.setFieldValue('invoice', reciept)
          
       

    }, [reciept,run])


    


    useEffect(() => {

        console.log('ghjgh',difference)
        if (difference) {


            var taxchange = parseFloat(difference.taxamount) || 1;
            var newprice = parseFloat(difference.NewPrice) || 1;
            var discountpercent = parseFloat(difference.discountpercentage) || 0;
           
            



            if (difference.select === 'Add') {


                let temp = reciept.map((obj) => ({
                    ...obj,

                    PriceAfterDiscount: (obj.subset) * (1 - (discountpercent / 100)),

                    totalprice: (((obj.subset) * (1 - (discountpercent / 100))) * taxchange) * (1 + (newprice / 100)),
                    discountAmount: ((obj.subset) * (discountpercent / 100)),
                    taxamount: (((obj.subset * ((100 - discountpercent) / 100))) * taxchange)
                 


                }));

                setReciept(temp)
            }

            if (difference.select === 'replace') {



                let temp1 = reciept.map((obj) => ({
                    ...obj,

                    PriceAfterDiscount: (obj.subset) * ((100 - discountpercent) / 100),

                    totalprice: (((obj.subset * ((100 - discountpercent) / 100))) * taxchange) * (1 + (newprice / 100)),
                    discountAmount: ((obj.subset) * (discountpercent / 100)),
                    taxamount:(((obj.subset * ((100 - discountpercent) / 100))) * taxchange)

                }



                ));



                setReciept(temp1)


            }



        }


    }, [difference])


    const setmultipleproduct = (val) => {

        setReciept([...reciept, ...val])

    }



    React.useEffect(() => {
        let num = parseFloat(formik.values.transportiontaxpricePercentage.replace('%', ''))

        const res =( parseFloat(formik.values.transportation) * num)/100
        formik.setFieldValue('transportiontaxprice', res || 0);
      

    }, [formik.values.transportation, formik.values.transportiontaxpricePercentage,reciept])




    React.useEffect(() => {
        let num = parseFloat(formik.values.jobdepositPercentage.replace('%', ''))


        const res = (parseFloat(endtotal) * num) / 100
        formik.setFieldValue('jobdeposit', res || 0);


    }, [formik.values.jobdepositPercentage])


    React.useEffect(() => {
        let num = parseFloat(formik.values.obligationwarrantyPercentage.replace('%', ''))


        const res = (parseFloat(endtotal) * num) / 100
        formik.setFieldValue('obligationwarranty', res || 0);


    }, [formik.values.obligationwarrantyPercentage,reciept])


    React.useEffect(() => {
        let num = parseFloat(formik.values.insurancedepositPercentage.replace('%', ''))


        const res = (parseFloat(endtotal) * num) / 100
        formik.setFieldValue('insurancedeposit', res || 0);


    }, [formik.values.insurancedepositPercentage, reciept])




    React.useEffect(() => {
        setEndtotal(formik.values.endtotal)

    }, [formik.values.endtotal])

    const [totalcount, setTotalCount] = useState(0);

    React.useEffect(() => {

        let res = (parseFloat(formik.values.endtotal) + parseFloat(formik.values.transportation) + parseFloat(formik.values.transportiontaxprice)+
            parseFloat(formik.values.obligationwarranty) + parseFloat(formik.values.insurancedeposit) + parseFloat(formik.values.jobdeposit)
        )

            setTotalCount(res)


    }, [formik.values, reciept])


    React.useEffect(() => {

        formik.setFieldValue('totalcount', parsFloatFunction(totalcount,2) || 0);


    }, [totalcount, reciept])





    function HandleSalePriceChange(value) {
        let temp = value.replaceAll(',', '')
        formik.setFieldValue('transportation', parsFloatFunction(temp, 2))
    }


    const getsave = (e) => {
        if (editdata && Object.keys(editdata).length) {
            let temp = reciept.map((item) => {
                if ((item.id === editdata.id)) {
                    return sentEditdata
                }
                return item
            })

            setReciept([...temp])
            setRun(run + 1)
        }


    }

   
    


    function getDeleteChange(v) {
        setReciept(v)
        setRun(run+1)

    }

    const[editdata,setEditdata]=useState()

    function getinfo(e) {
        setEditdata(e.data)
    }


    const renderContent = (e) => {
        return (
            <EditProducts getedit={editdata} getdata={seteditval }/>
        );
    };

    const [sentEditdata, setSentEditData] = useState();

    const seteditval = (e) => {


        setSentEditData(e)



    }


    const [showDragIcons, setShowDragIcons] = useState();
    const onReorder = (e) => {
        const visibleRows = e.component.getVisibleRows();
        const newTasks = [...reciept];
        const toIndex = newTasks.findIndex((item) => item.id === visibleRows[e.toIndex].data.id);
        const fromIndex = newTasks.findIndex((item) => item.id === e.itemData.id);
        newTasks.splice(fromIndex, 1);
        newTasks.splice(toIndex, 0, e.itemData);

        setReciept(newTasks);
    }
    const onShowDragIconsChanged = (args) => {
        setShowDragIcons(args.value);
    }


    return (
        <>
            <div id='form'>
                <form onSubmit={formik.handleSubmit}>
                    {/*<h1 className={'main-title'}>{t('?????????? ?????????????? ????????')}</h1>*/}
                    <Accordion expanded={panel1} onChange={handlePanel1()} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"

                        >
                            <Typography><span>{t("?????????????? ?????????????? ????????")}</span></Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            <div >
                                <div className="form-design">
                                    <div className="row">
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("?????????? ??????????????")} <span className='star'>*</span></span>
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
                                                <span>{t("??????????")} <span className='star'>*</span></span>
                                            </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={contractSelectList}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            className='selectBox'
                                                            noDataText={t('?????????????? ???????? ??????')}
                                                            itemRender={null}
                                                            placeholder=''
                                                            onValueChanged={(e) => formik.setFieldValue('state', e.value)}
                                                            searchEnabled
                                                            //showClearButton         
                                                            defaultValue={null}
                                                        />
                                                        {formik.touched.state && formik.errors.state &&
                                                            !formik.values.state ? (
                                                            <div className='error-msg'>{t(formik.errors.state)}</div>) : null}

                                                    </div>
                                                </div>
                                            </div>
                                      
                                        <div className="content col-lg-6 col-md-12 col-xs-12" onFocus={()=> dateRef1?.current?.closeCalendar()}>
                                            <div className="title">
                                                <span>{t("?????????? ????")} <span className='star'>*</span></span>
                                            </div>
                                                <div className="wrapper">
                                                    <div className="row">
                                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                                            <div>
                                                                <SelectBox
                                                                    dataSource={associatedselectList}
                                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                    className='selectBox'
                                                                    noDataText={t('?????????????? ???????? ??????')}
                                                                    itemRender={null}
                                                                    placeholder=''
                                                                    onValueChanged={(e) => setDropdown(e.value)}
                                                                    searchEnabled
                                                                    //showClearButton         
                                                                    defaultValue={null}
                                                                />
                                                                {formik.touched.associated && formik.errors.associated &&
                                                                    !formik.values.associated ? (
                                                                    <div className='error-msg'>{t(formik.errors.associated)}</div>) : null}
                                                            </div>

                                                        </div>
                                                        <div className="content col-lg-6 col-md-6 col-xs-12" style={{ position: 'relative' }}>
                                                            <div>
                                                                <input
                                                                    className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                                    type="text"
                                                                    name="associated"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.associated}
                                                                    disabled

                                                                />

                                                                <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`}>
                                                                    <CategoryModal disabled={!dropdown} className='modal2' getData={getassociated} />
                                                                    <Button className='modal' > <CancelIcon onClick={clearFieldAssociated} /></Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("?????????? ????????")} <span className='star'>*</span></span>
                                            </div>
                                                <div className="wrapper">
                                                    <div className='date-picker position-relative' >

                                                        <DatePicker
                                                            name='startDate'
                                                            ref={dateRef1}
                                                            calendar={renderCalendarSwitch(i18n.language)}
                                                            locale={renderCalendarLocaleSwitch(i18n.language)}
                                                            calendarPosition="bottom-right"
                                                            onBlur={formik.handleBlur}
                                                            onChange={(val) => {
                                                                formik.setFieldValue(
                                                                    "startDate",
                                                                    julianIntToDate(val.toJulianDay())
                                                                );
                                                            }}
                                                            value={getLangDate(i18n.language , formik.values.startDate)}
                                                            // value={formik.values.startDate}

                                                        />
                                                        {/*<button onClick={()=>formik.setFieldValue('startDate','')}>clear</button>*/}
                                                        <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                                                            <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal'/></div>
                                                        </div>
                                                    </div>
                                                    {formik.touched.startDate && formik.errors.startDate ? (
                                                        <div className='error-msg'>
                                                            {t(formik.errors.startDate)}
                                                        </div>
                                                    ) : null}



                                                </div>
                                            </div>
                                    
                                        <div className="content col-lg-6 col-md-6 col-xs-12" onFocus={()=> {
                                            dateRef1?.current?.closeCalendar();
                                            dateRef2?.current?.closeCalendar();
                                        }}>
                                            <div className="title">
                                                <span>{t("??????")}</span>
                                            </div>
                                                <div className="wrapper">
                                                    <div className="row">
                                                        <div className="content col-lg-12 col-md-12 col-xs-12">
                                                            <div style={{ position: 'relative' }}>
                                                                <input
                                                                    className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                                    type="text"
                                                                    name="person"
                                                                    style={{ width: "100%" }}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.person}
                                                                    disabled
                                                                />
                                                                <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`}>
                                                                    <CategoryModal className='modal2' getData={getperson} />
                                                                    <Button className='modal' > <CancelIcon onClick={clearFieldperson} /></Button>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                               
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("?????????? ??????????")} <span className='star'>*</span></span>
                                            </div>
                                                <div className="wrapper">
                                                    <div className='date-picker position-relative' >
                                                        <DatePicker
                                                            ref={dateRef2}
                                                            calendar={renderCalendarSwitch(i18n.language)}
                                                            locale={renderCalendarLocaleSwitch(i18n.language)}
                                                            calendarPosition="bottom-right"
                                                            name='endDate'
                                                            disabled={!formik.values.startDate}
                                                            minDate={new Date(formik.values.startDate)}
                                                            onBlur={formik.handleBlur}
                                                            onChange={(val) => {
                                                                formik.setFieldValue(
                                                                    "endDate",
                                                                    julianIntToDate(val.toJulianDay())
                                                                );
                                                            }}
                                                            value={getLangDate(i18n.language , formik.values.endDate)}
                                                        />

                                                        <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                                                            <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal'/></div>
                                                        </div>
                                                    </div>
                                                    {formik.touched.endDate && formik.errors.endDate ? (
                                                        <div className='error-msg'>
                                                            {t(formik.errors.endDate)}
                                                        </div>
                                                    ) : null}


                                                </div>
                                            </div>
                                      
                                 
                                        <div className="content col-lg-6 col-md-6 col-xs-12" onFocus={()=> dateRef2?.current?.closeCalendar()}>
                                            <div className="title">
                                                <span>{t("???????? ????????")}</span>
                                            </div>
                                                <div className="wrapper">
                                                    <div className="row">
                                                        <div className="content col-lg-12 col-md-12 col-xs-12" >
                                                            <div style={{ position: 'relative' }}>
                                                                <input
                                                                    className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                                    type="text"
                                                                    disabled
                                                                    name="sellchance"
                                                                    style={{ width: "100%" }}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.sellchance}

                                                                />

                                                                <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >
                                                                    <CategoryModal className='modal2' getData={getchance} />
                                                                    <Button className='modal' > <CancelIcon onClick={clearFieldsellchance} /></Button>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                              
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("???? ????????")}</span>
                                            </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <input
                                                            className="form-input"
                                                            type="text"
                                                            name="referalcode"
                                                            style={{ width: "100%" }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.referalcode}

                                                        />

                                                    </div>
                                                </div>
                                            </div>

                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("?????? ??????????????")}</span>
                                            </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={testSelectList}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            className='selectBox'
                                                            noDataText={t('?????????????? ???????? ??????')}
                                                            itemRender={null}
                                                            onValueChanged={(e) => formik.setFieldValue('contracttype', e.value)}
                                                            placeholder=''
                                                            searchEnabled
                                                            showClearButton
                                                            defaultValue={null}
                                                        />


                                                    </div>
                                                </div>
                                           
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("???????? ??????????????")}</span>
                                            </div>
                                                <div className="wrapper">
                                                    <div style={{ position: 'relative' }}>
                                                        <input
                                                            className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                            type="text"
                                                            disabled
                                                            name="manager"
                                                            style={{ width: "100%" }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.manager}

                                                        />
                                                        <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`}>
                                                            <CategoryModal className='modal2' getData={getData} />
                                                            <Button className='modal' > <CancelIcon onClick={clearFieldmanager} /></Button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                    
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("???????????? ????????????")}</span>
                                            </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <input
                                                            className="form-input"
                                                            type="text"

                                                            name="successChance"
                                                            style={{ width: "100%" }}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.successChance}

                                                        />

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
                            expandIcon={<ExpandMoreIcon style={{ float: 'right' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography><span>{t("???????? ??????????????")}</span></Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            <div  >
                                <div className="form-design">
                                    <div className="row">
                                        <div className="content col-lg-4 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("???????? ??????")}  <span className='star'>*</span></span>
                                            </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={currencySelectList}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            className='selectBox'
                                                            noDataText={t('?????????????? ???????? ??????')}
                                                            itemRender={null}
                                                            placeholder=''
                                                            searchEnabled
                                                            //showClearButton         
                                                            onValueChanged={(e) => formik.setFieldValue('currency', e.value)}
                                                            defaultValue={currencySelectList[0]}
                                                        />
                                                        {formik.touched.currency && formik.errors.currency &&
                                                            !formik.values.currency ? (
                                                            <div className='error-msg'>{t(formik.errors.currency)}</div>) : null}


                                                    </div>
                                                </div>
                                           
                                        </div>
                                        <div className="row">
                                            <div className="content content col-lg-12 col-md-12 col-xs-12" style={{ textAlign: 'center' }} >
                                                <ToggleButtonGroup
                                                    className="content button-group row justify-content-center mb-3"
                                                    value={alignment}
                                                    exclusive
                                                    onChange={handleChange}
                                                    aria-label="Platform"
                                                    style={{
                                                        marginTop: "15px",
                                                        backgroundColor: "transparent",


                                                    }}>
                                                    <div className='col-lg-auto col-sm-4 col-xs-6'>
                                                        <Button variant="contained" size="medium" color="primary" onClick={handleClickOpen} > {t("???????????? ??????????")} </Button>
                                                    </div>
                                                    <div className='col-lg-auto col-sm-4 col-xs-6'>
                                                        <Button variant="contained" size="medium" color="primary" onClick={handleClickOpenMultipleProducts} >{t("???????????? ?????? ??????????")}</Button>
                                                    </div>
                                                    <div className='col-lg-auto col-sm-4 col-xs-6'>
                                                        <Button variant="contained" size="medium" color="primary" onClick={handleClickOpenuploadfile} >{t("???????? ???????? ??????????????")}</Button>
                                                    </div>
                                                    <div className='col-lg-auto col-sm-4 col-xs-6'>
                                                        <Button variant="contained" size="medium" disabled={!reciept.length} color="primary" onClick={handleClickOpenapplychanges} >{t("?????????? ??????????????")}</Button>
                                                    </div>
                                                    <div className='col-lg-auto col-sm-4 col-xs-6'>
                                                        <Button variant="contained" size="medium" color="primary" onClick={handleClickOpenpackaging} >{t("???????????? ???????? ???????? ??????????")}</Button>
                                                    </div>
                                                    <div className='col-lg-auto col-sm-4 col-xs-6'>
                                                        <Button variant="contained" size="medium" color="primary" onClick={handleClick}  >{buttonText}</Button>
                                                    </div>


                                                </ToggleButtonGroup>


                                                <Dialog open={open2} fullWidth={fullWidth} maxWidth={maxWidth} dir={i18n.dir()} >
                                                    
                                                    <div className={`modal-header ${i18n.dir() == "ltr" ? 'header-ltr':''}`}>
                                                        <h2>{t('???????????? ??????????')}</h2>
                                                        <button type='button' className='close-btn' onClick={() => setOpen2(false)}><CloseIcon/></button>
                                                    </div>
                                                    <DialogContent>
                                                        <SelectProducts getdata={setFactorr} />
                                                    </DialogContent>
                                                   
                                                </Dialog>


                                                <Dialog open={openmulti}  fullWidth={fullWidth} maxWidth={maxWidth} dir={i18n.dir()}>

                                                    <div className={`modal-header ${i18n.dir() == "ltr" ? 'header-ltr' : ''}`}>
                                                        <h2>{t('???????????? ?????? ??????????')}</h2>
                                                        <button type='button' className='close-btn' onClick={() => setOpenMultiple(false)}><CloseIcon /></button>
                                                    </div>
                                                    <DialogContent>
                                                        <SelectMultipleProducts getdata={setmultipleproduct} closDialog={() => setOpenMultiple(false) } />
                                                    </DialogContent>

                                                </Dialog>

                                                <Dialog open={openuploadfile}  fullWidth={fullWidth} maxWidth={maxWidth} dir={i18n.dir()}>


                                                    <div className={`modal-header ${i18n.dir() == "ltr" ? 'header-ltr' : ''}`}>
                                                        <h2>{t('?????????? ????????')}</h2>
                                                        <button type='button' className='close-btn' onClick={() => setOpenuploadfile(false)}><CloseIcon /></button>
                                                    </div>
                                                    <DialogContent>
                                                        <UploadFileComponent />
                                                    </DialogContent>

                                                </Dialog>


                                                <Dialog open={openapplychanges}  fullWidth={fullWidth} maxWidth={maxWidth} dir={i18n.dir()}>
                                                    <div className={`modal-header ${i18n.dir() == "ltr" ? 'header-ltr' : ''}`}>
                                                        <h2>{t('?????????? ??????????????')}</h2>
                                                        <button type='button' className='close-btn' onClick={() => setOpenapplychanges(false)}><CloseIcon /></button>
                                                    </div>
                                                    <DialogContent>
                                                        
                                                        <ApplyChanges getchange={setchanges} closDialog={() => setOpenapplychanges(false) }/>
                                                    </DialogContent>
                                                   

                                                </Dialog>



                                                <Dialog open={openpackaging}  fullWidth={fullWidth} maxWidth={maxWidth} dir={i18n.dir()}>
                                                    <div className={`modal-header ${i18n.dir() == "ltr" ? 'header-ltr' : ''}`}>
                                                        <h2>{t('???????????? ???????? ??????????')}</h2>
                                                        <button type='button' className='close-btn' onClick={() => setOpenpackaging(false)}><CloseIcon /></button>
                                                    </div>
                                                    <DialogContent>
                                                      
                                                        <Packaging />
                                                    </DialogContent>
                                                    
                                                </Dialog>
                                                    <div className="row">
                                                        <div className='col-12'>
                                                            <DataGrid
                                                              showBorders={true}
                                                              hoverStateEnabled={true}
                                                              keyExpr="id"
                                                              width={"100%"}
                                                              rtlEnabled={!(i18n.dir() == "ltr")}
                                                              dataSource={reciept}
                                                              onRowRemoved={() => getDeleteChange(reciept)}
                                                              onSaved={getsave}
                                                              noDataText={t('??????????????? ?????????? ????????')}
                                                              onEditingStart={getinfo}
                                                              scrolling={true}
                                                            >

                                                                <RowDragging
                                                                  allowReordering={true}
                                                                  onReorder={onReorder}
                                                                  showDragIcons={showDragIcons}
                                                                />



                                                                <Editing
                                                                  mode="popup"
                                                                  allowUpdating={true}
                                                                  allowDeleting={true}
                                                                  useIcons={true}
                                                                >


                                                                    <Texts
                                                                      confirmDeleteMessage={t("?????? ???????????? ????????????")}
                                                                      saveRowChanges={t("??????????")}
                                                                      cancelRowChanges={t("??????")}
                                                                    />

                                                                    <Popup title="???????????? ??????????" height={'60vh'} showtitle={true} contentRender={renderContent} />

                                                                </Editing>

                                                                <Selection mode="single" />

                                                                <Column caption={t("??????????")} dataField="productName" width={150}alignment={"center"} />
                                                                <Column caption={t("??????????")} dataField="MainUnit" width={110} alignment={"center"}/>
                                                                <Column caption={t("???????? ????????")} dataField="UnitPrice" width={110} alignment={"center"}/>
                                                                <Column caption={t("?????? ??????????")} dataField="subset" width={110} alignment={"center"}/>
                                                                <Column caption={t("?????????? ???? ???? ??????????")} dataField="PriceAfterDiscount" width={130} alignment={"center"}/>
                                                                <Column caption={t("?????? ????")} dataField="totalprice" width={110} alignment={"center"} />

                                                                {(buttonText === (t('?????????? ???????????? ??????????')) || buttonText === (t('?????????? ???????????? ????????'))) && <Column caption={t("???????? ??????????")} dataField="discountAmount" width={110} alignment={"center"}/>}
                                                                {(buttonText === (t('?????????? ???????????? ??????????')) || buttonText === (t('?????????? ???????????? ????????'))) && <Column caption={t("????????????")} dataField="taxamount" width={110} alignment={"center"}/>}
                                            
                                                                {(buttonText === (t('?????????? ???????????? ??????????')) || buttonText === (t('?????????? ???????????? ????????'))) && <Column caption={t("?????????? ??????????")} dataField="serialNumber" width={100} alignment={"center"}/>}
                                                                {(buttonText === (t('?????????? ???????????? ??????????')) || buttonText === (t('?????????? ???????????? ????????'))) && <Column caption={t("???? ??????????")} dataField="productCode" width={110} alignment={"center"}/>}
                                                                {(buttonText === (t('?????????? ???????????? ??????????')) || buttonText === (t('?????????? ???????????? ????????'))) && <Column caption={t("???????? ??????????")} dataField="HireDate" width={110} alignment={"center"}/>}
                                                                {(buttonText === (t('?????????? ???????????? ??????????')) || buttonText === (t('?????????? ???????????? ????????'))) && <Column caption={t("??????????????")} dataField="description" width={150} alignment={"center"}/>}
                                                                {(buttonText === (t('?????????? ???????????? ??????????')) || buttonText === (t('?????????? ???????????? ????????'))) && <Column caption={t("??????????????")} dataField="Note" width={150} alignment={"center"}/>}
                                                                {buttonText === (t('?????????? ???????????? ????????')) && <Column caption={t("???????? ????????")} dataField="HireDate" width={110} alignment={"center"}/>}
                                                                {buttonText === (t('?????????? ???????????? ????????')) && <Column caption={t("???????? ????????????")} dataField="HireDate" width={110} alignment={"center"}/>}
                                                                {buttonText === (t('?????????? ???????????? ????????')) && <Column caption={t("?????????? ???????? ????????????")} dataField="HireDate" width={110} alignment={"center"}/>}



                                                            </DataGrid>

                                                        </div>

                                                    </div>
                                            </div>
                                        </div>
                                        <div className="form-design">
                                            <div className="row">
                                                <div className='col-lg-6 col-12'>
                                                    <div className='row'>
                                                        <div className="content col-lg-12 col-md-12 col-12">
                                                            <div className="title">
                                                                <span>{t("??????????")} </span>
                                                            </div>
                                                            <div className="wrapper">
                                                                <div>
                                                                    <CurrencyInput
                                                                      className="disabled-form-input"
                                                                      type="text"
                                                                      decimalsLimit={2}
                                                                      name="total"
                                                                      style={{ width: "100%" }}
                                                                      disabled
                                                                      onChange={formik.handleChange}
                                                                      onBlur={formik.handleBlur}
                                                                      value={formik.values.total}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="content col-lg-12 col-md-12 col-xs-12">
                                                            <div className="title">
                                                                <span>{t("??????????")} </span>
                                                            </div>
                                                            <div className="wrapper">
                                                                <div>
                                                                    <CurrencyInput
                                                                      className="disabled-form-input"
                                                                      type="text"
                                                                      decimalsLimit={2}
                                                                      name="discount"
                                                                      style={{ width: "100%" }}
                                                                      disabled
                                                                      onChange={formik.handleChange}
                                                                      onBlur={formik.handleBlur}
                                                                      value={formik.values.discount}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="content col-lg-12 col-md-12 col-xs-12">
                                                            <div className="title">
                                                                <span>{t("??????????")} </span>
                                                            </div>
                                                            <div className="wrapper">
                                                                <div>
                                                                    <CurrencyInput
                                                                      className="disabled-form-input"
                                                                      type="text"
                                                                      decimalsLimit={2}
                                                                      name="endtotal"
                                                                      style={{ width: "100%" }}
                                                                      disabled
                                                                      onChange={formik.handleChange}
                                                                      onBlur={formik.handleBlur}
                                                                      value={formik.values.endtotal}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="content col-lg-12 col-md-12 col-xs-12">
                                                            <div className="title">
                                                                <span>{t("??????")} </span>
                                                            </div>
                                                            <div className="wrapper">
                                                                <div>
                                                                    <CurrencyInput
                                                                      className="form-input"
                                                                      type="text"
                                                                      name="transportation"
                                                                      style={{ width: "100%" }}
                                                                      decimalsLimit={2}
                                                                      onChange={(e) => HandleSalePriceChange(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="content col-lg-12 col-md-12 col-xs-12">
                                                            <div className="title">
                                                                <span>{t("???????? ???????????? ??????")} </span>
                                                            </div>
                                                            <div className="wrapper">
                                                                <div className="row">
                                                                    <div className="content col-lg-6 col-md-6 col-xs-12" >
                                                                        <CurrencyInput
                                                                          className="disabled-form-input"
                                                                          type="text"
                                                                          decimalsLimit={2}
                                                                          name="transportiontaxprice"
                                                                          style={{ width: "100%" }}
                                                                          disabled
                                                                          onChange={formik.handleChange}
                                                                          onBlur={formik.handleBlur}
                                                                          value={formik.values.transportiontaxprice}
                                                                        />
                                                                    </div>

                                                                    <div className="content col-lg-6 col-md-6 col-xs-12" >
                                                                        <SelectBox
                                                                          dataSource={percentselectList}
                                                                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                          className='selectBox'
                                                                          noDataText={t('?????????????? ???????? ??????')}
                                                                          onValueChanged={(e) => formik.setFieldValue('transportiontaxpricePercentage', e.value)}
                                                                          itemRender={null}
                                                                          placeholder=''
                                                                          searchEnabled
                                                                          showClearButton
                                                                          defaultValue={null}
                                                                        />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="content col-lg-12 col-md-12 col-xs-12">
                                                            <div className="title">
                                                                <span>{t("????????????")} </span>
                                                            </div>
                                                            <div className="wrapper">
                                                                <div>
                                                                    <CurrencyInput
                                                                      className="disabled-form-input"
                                                                      type="text"
                                                                      name="tax"
                                                                      style={{ width: "100%" }}
                                                                      decimalsLimit={2}
                                                                      disabled
                                                                      onChange={formik.handleChange}
                                                                      onBlur={formik.handleBlur}
                                                                      value={formik.values.tax}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="content col-lg-12 col-md-12 col-xs-12">
                                                            <div className="title">
                                                                <span>{t("?????????? ?????????? ????????")} </span>
                                                            </div>
                                                            <div className="wrapper">
                                                                <div className="row">
                                                                    <div className="content col-lg-6 col-md-6 col-xs-12" >
                                                                        <CurrencyInput
                                                                          className="disabled-form-input"
                                                                          type="text"
                                                                          decimalsLimit={2}
                                                                          name="insurancedeposit"
                                                                          style={{ width: "100%" }}
                                                                          disabled
                                                                          onChange={formik.handleChange}
                                                                          onBlur={formik.handleBlur}
                                                                          value={formik.values.insurancedeposit}
                                                                        />
                                                                    </div>

                                                                    <div className="content col-lg-6 col-md-6 col-xs-12" >
                                                                        <SelectBox
                                                                          dataSource={percentselectList}
                                                                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                          className='selectBox'
                                                                          noDataText={t('?????????????? ???????? ??????')}
                                                                          itemRender={null}
                                                                          onValueChanged={(e) => formik.setFieldValue('insurancedepositPercentage', e.value)}
                                                                          placeholder=''
                                                                          searchEnabled
                                                                          showClearButton
                                                                          defaultValue={null}
                                                                        />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="content col-lg-12 col-md-12 col-xs-12">
                                                            <div className="title">
                                                                <span>{t("?????????? ?????????? ?????? ?????????? ??????")} </span>
                                                            </div>
                                                            <div className="wrapper">
                                                                <div className="row">
                                                                    <div className="content col-lg-6 col-md-6 col-xs-12" >
                                                                        <CurrencyInput
                                                                          className="disabled-form-input"
                                                                          type="text"
                                                                          decimalsLimit={2}
                                                                          name="jobdeposit"
                                                                          style={{ width: "100%" }}
                                                                          disabled
                                                                          onChange={formik.handleChange}
                                                                          onBlur={formik.handleBlur}
                                                                          value={formik.values.jobdeposit}
                                                                        />
                                                                    </div>

                                                                    <div className="content col-lg-6 col-md-6 col-xs-12" >
                                                                        <SelectBox
                                                                          dataSource={percentselectList}
                                                                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                          className='selectBox'
                                                                          noDataText={t('?????????????? ???????? ??????')}
                                                                          itemRender={null}
                                                                          placeholder=''
                                                                          searchEnabled
                                                                          onValueChanged={(e) => formik.setFieldValue('jobdepositPercentage', e.value)}
                                                                          showClearButton
                                                                          defaultValue={null}
                                                                        />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <div className="content col-lg-12 col-md-12 col-xs-12">
                                                            <div className="title">
                                                                <span>{t("?????????? ?????????? ?????????? ????????????")} </span>
                                                            </div>
                                                            <div className="wrapper">
                                                                <div className="row">
                                                                    <div className="content col-lg-6 col-md-6 col-xs-12" >
                                                                        <CurrencyInput
                                                                          className="disabled-form-input"
                                                                          type="text"
                                                                          decimalsLimit={2}
                                                                          name="obligationwarranty"
                                                                          style={{ width: "100%" }}
                                                                          disabled
                                                                          onChange={formik.handleChange}
                                                                          onBlur={formik.handleBlur}
                                                                          value={formik.values.obligationwarranty}
                                                                        />
                                                                    </div>

                                                                    <div className="content col-lg-6 col-md-6 col-xs-12" >
                                                                        <SelectBox
                                                                          dataSource={percentselectList}
                                                                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                                          className='selectBox'
                                                                          noDataText={t('?????????????? ???????? ??????')}
                                                                          itemRender={null}
                                                                          placeholder=''
                                                                          searchEnabled
                                                                          onValueChanged={(e) => formik.setFieldValue('obligationwarrantyPercentage', e.value)}
                                                                          showClearButton
                                                                          defaultValue={null}
                                                                        />
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>
                                                        <div className="content col-lg-12 col-md-12 col-xs-12">
                                                            <div className="title">
                                                                <span>{t("?????? ????")} </span>
                                                            </div>
                                                            <div className="wrapper">
                                                                <div>
                                                                    <CurrencyInput
                                                                      className="disabled-form-input"
                                                                      type="text"
                                                                      decimalsLimit={2}
                                                                      name="totalcount"
                                                                      style={{ width: "100%" }}
                                                                      disabled
                                                                      onChange={formik.handleChange}
                                                                      onBlur={formik.handleBlur}
                                                                      value={formik.values.totalcount}
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
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded={true} onFocus={()=> dateRef3?.current?.closeCalendar()}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ float: 'right' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography><span>{t("??????????????")}</span></Typography>

                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="form-design">
                                <div className="row">
                                    <div className="content col-lg-6 col-xs-12">
                                        <div className="title">
                                            <span>{t("??????????????")} </span>
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
                    <Accordion expanded={panel4} onChange={handlePanel4()} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ float: 'right' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography><span>{t("?????????????? ??????????")}</span></Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div  >
                                <div className="form-design">
                                    <div className="row">
                                        <div className="content col-lg-4 col-md-6 col-xs-12" onFocus={()=> dateRef4?.current?.closeCalendar()}>
                                            <div className="title">
                                                <span>{t("?????????? ?????????? ??????????")}<span className='star'>*</span></span>
                                            </div>
                                                
                                                <div className="wrapper">
                                                    <div className='date-picker position-relative' >
                                                        <DatePicker
                                                            id="creditDate"
                                                            ref={dateRef3}
                                                            calendar={renderCalendarSwitch(i18n.language)}
                                                            locale={renderCalendarLocaleSwitch(i18n.language)}
                                                            name='customarsigndate'
                                                            calendarPosition="bottom-right"
                                                            onBlur={formik.handleBlur}
                                                            onChange={(val) => {
                                                                formik.setFieldValue(
                                                                    "customarsigndate",
                                                                    julianIntToDate(val.toJulianDay())
                                                                );
                                                            }}
                                                            value={getLangDate(i18n.language , formik.values.customarsigndate)}

                                                        />
                                                        <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                                                            <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal'/></div>
                                                        </div>
                                                </div>
                                                {formik.touched.customarsigndate && formik.errors.customarsigndate &&
                                                    !formik.values.customarsigndate ? (
                                                        <div className='error-msg'>{t(formik.errors.customarsigndate)}</div>) : null}
                                               
                                            </div>
                                        </div>
                                        <div className="content col-lg-4 col-md-6 col-xs-12" onFocus={()=> dateRef3?.current?.closeCalendar()}>
                                            <div className="title">
                                                <span>{t("?????????? ?????????? ????????")}<span className='star'>*</span></span>
                                            </div>
                                                <div className="wrapper">
                                                    <div className='date-picker position-relative' >
                                                        <DatePicker
                                                            id="creditDate"
                                                            ref={dateRef4}
                                                            calendar={renderCalendarSwitch(i18n.language)}
                                                            locale={renderCalendarLocaleSwitch(i18n.language)}
                                                            name='companysigndate'
                                                            calendarPosition="bottom-right"
                                                            onBlur={formik.handleBlur}
                                                            onChange={(val) => {
                                                                formik.setFieldValue(
                                                                    "companysigndate",
                                                                    julianIntToDate(val.toJulianDay())
                                                                );
                                                            }}
                                                            value={getLangDate(i18n.language , formik.values.companysigndate)}

                                                        />
                                                        <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                                                            <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal'/></div>
                                                        </div>
                                                </div>
                                                {formik.touched.companysigndate && formik.errors.companysigndate &&
                                                    !formik.values.companysigndate ? (
                                                        <div className='error-msg'>{t(formik.errors.companysigndate)}</div>) : null}
                                                </div>
                                           
                                        </div>
                                        <div className="content col-lg-4 col-md-6 col-xs-12" onFocus={()=> {
                                            dateRef4?.current?.closeCalendar();
                                            dateRef5?.current?.closeCalendar();
                                        }}>
                                            <div className="title">
                                                <span>{t("???????? ?????????? ?????????? ????????????")}</span>
                                            </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={testSelectList}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            className='selectBox'
                                                            noDataText={t('?????????????? ???????? ??????')}
                                                            itemRender={null}
                                                            placeholder=''
                                                            searchEnabled
                                                            showClearButton
                                                            onValueChanged={(e) => formik.setFieldValue('recieptsendercompany', e.value)}
                                                            defaultValue={null}
                                                        />

                                                    </div>
                                                </div>
                                           
                                        </div>
                                        <div className="content col-lg-4 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("???????????? ?????? ????")}<span className='star'>*</span></span>
                                            </div>
                                                <div className="wrapper">
                                                    <div className='date-picker position-relative'>
                                                        <DatePicker
                                                            id="creditDate"
                                                            ref={dateRef5}
                                                            calendar={renderCalendarSwitch(i18n.language)}
                                                            locale={renderCalendarLocaleSwitch(i18n.language)}
                                                            name='duerecieptdate'
                                                            calendarPosition="bottom-right"
                                                            onBlur={formik.handleBlur}
                                                            onChange={(val) => {
                                                                formik.setFieldValue(
                                                                    "duerecieptdate",
                                                                    julianIntToDate(val.toJulianDay())
                                                                );
                                                            }}
                                                            value={getLangDate(i18n.language , formik.values.duerecieptdate)}


                                                        />
                                                        <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                                                            <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal'/></div>
                                                        </div>
                                                </div>
                                                {formik.touched.duerecieptdate && formik.errors.duerecieptdate &&
                                                    !formik.values.duerecieptdate ? (
                                                        <div className='error-msg'>{t(formik.errors.duerecieptdate)}</div>) : null}
                                                </div>
                                          
                                        </div>
                                        <div className="content col-lg-4 col-md-6 col-xs-12" onFocus={()=> dateRef5?.current?.closeCalendar()}>
                                            <div className="title">
                                                <span>{t("???????? ?????? ?????????? ????????????")}</span>
                                            </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={sendSelectList}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            className='selectBox'
                                                            noDataText={t('?????????????? ???????? ??????')}
                                                            itemRender={null}
                                                            placeholder=''
                                                            onValueChanged={(e) => formik.setFieldValue('recieptsendperiod', e.value)}
                                                            searchEnabled
                                                            showClearButton
                                                            defaultValue={null}
                                                        />

                                                    </div>
                                                </div>
                                           
                                        </div>
                                        <div className="content col-lg-4 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("?????? ?????????? ????????????")}</span>
                                            </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={testSelectList}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            className='selectBox'
                                                            noDataText={t('?????????????? ???????? ??????')}
                                                            itemRender={null}
                                                            placeholder=''
                                                            searchEnabled
                                                            onValueChanged={(e) => formik.setFieldValue('recieptsendtype', e.value)}
                                                            showClearButton
                                                            defaultValue={null}
                                                        />

                                                    </div>
                                                </div>
                                          
                                        </div>
                                        <div className="content col-lg-4 col-md-6 col-xs-12" onFocus={()=> dateRef6?.current?.closeCalendar()}>
                                            <div className="title">
                                                <span>{t("???????? ?????? ????????????")}</span>
                                            </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={testSelectList}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            className='selectBox'
                                                            noDataText={t('?????????????? ???????? ??????')}
                                                            itemRender={null}
                                                            placeholder=''
                                                            searchEnabled
                                                            onValueChanged={(e) => formik.setFieldValue('reciepttype', e.value)}
                                                            showClearButton
                                                            defaultValue={null}
                                                        />

                                                    </div>
                                                </div>
                                           
                                        </div>
                                        <div className="content col-lg-4 col-md-6 col-xs-12" >
                                            <div className="title">
                                                <span>{t("?????????? ?????????????? ???????? ??????????")}<span className='star'>*</span></span>
                                            </div>
                                                <div className="wrapper">
                                                    <div className='date-picker position-relative'>
                                                        <DatePicker
                                                            id="creditDate"
                                                            ref={dateRef6}
                                                            name='rememberdate'
                                                            calendar={renderCalendarSwitch(i18n.language)}
                                                            locale={renderCalendarLocaleSwitch(i18n.language)}
                                                            calendarPosition="bottom-right"
                                                            onBlur={formik.handleBlur}
                                                            onChange={(val) => {
                                                                formik.setFieldValue(
                                                                    "rememberdate",
                                                                    julianIntToDate(val.toJulianDay())
                                                                );
                                                            }}
                                                            value={getLangDate(i18n.language , formik.values.rememberdate)}

                                                        />
                                                        <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                                                            <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal'/></div>
                                                        </div>
                                                </div>
                                                {formik.touched.rememberdate && formik.errors.rememberdate &&
                                                    !formik.values.rememberdate ? (
                                                        <div className='error-msg'>{t(formik.errors.rememberdate)}</div>) : null}
                                                </div>
                                          
                                        </div>
                                        <div className="content col-lg-4 col-md-6 col-xs-12" onFocus={()=> dateRef6?.current?.closeCalendar()}>
                                            <div className="title">
                                                <span>{t("?????? ???????? ????????")}</span>
                                            </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <SelectBox
                                                            dataSource={sellforecastSelectList}
                                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                            className='selectBox'
                                                            noDataText={t('?????????????? ???????? ??????')}
                                                            itemRender={null}
                                                            placeholder=''
                                                            searchEnabled
                                                            onValueChanged={(e) => formik.setFieldValue('sellforecast', e.value)}
                                                            showClearButton
                                                            defaultValue={null}
                                                        />


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
                            type="button"
                            id="submit"
                            onClick={formik.handleSubmit}
                            className="btn btn-success"
                        >
                            {t("??????")}
                        </button>
                    </div>
                </form>
            </div>

        </>
    )
}

export default SellContract;
