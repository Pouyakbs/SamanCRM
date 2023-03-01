import React, { useRef, useState, useEffect } from "react";
import { FieldArray, useFormik, FormikProvider} from "formik";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import swal from "sweetalert";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Username from "../../../components/Modals/FeedBackUserNameModal/UsernameModal";
import { SelectBox } from "devextreme-react";
import DatePicker from "react-multi-date-picker";
import { julianIntToDate } from "../../../utils/dateConvert";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import ReactStars from "react-rating-stars-component";
import SettingsIcon from "@mui/icons-material/Settings";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { array, object, string } from 'yup';
import TextEditor from "../../../components/textEditor/textEditor";
import { renderCalendarLocaleSwitch } from "../../../utils/calenderLang";
import { renderCalendarSwitch} from '../../../utils/calenderLang'


const Factor = [];
export const Fidback = () => {
  const { t, i18n } = useTranslation();
  const [alignment, setAlignment] = useState("");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };



  const [panel1, setPanel1] = useState(true);
  const handlePanel1 = () => (event, newExpanded) => {
    setPanel1(newExpanded);
  };
  const [panel2, setPanel2] = useState(true);
  const handlePanel2 = () => (event, newExpanded) => {
    setPanel2(newExpanded);
  };
  const [panel3, setPanel3] = useState(true);
  const handlePanel3 = () => (event, newExpanded) => {
    setPanel3(newExpanded);
  };


  /////////////////////////////////dinamic add//////////////////////////
  const emptyQuestion = { question: "", answereType: "", fieldExample: [] };
  const emptyQuestionTouch = {
    question: false,
    answereType: false,
    fieldExample: false,
  };
  const [questionTouch, setQuestionFieldsTouch] = useState([
    emptyQuestionTouch,
  ]);


  const emptyDropDownTouch = { dropDown: false };
  const [dropDownTouch, setDropDownFieldsTouch] = useState([emptyDropDownTouch])



  const emptyRadioTouch = { radio: false };
  const [radioTouch, setRadioFieldsTouch] = useState([emptyRadioTouch])


  const emptyMultiSelectTouch = { multiSelect: false };
  const [multiSelectTouch, setMultiSelectFieldsTouch] = useState([emptyMultiSelectTouch])


  const [time, setTime] = useState("");
  const [tempArray, setTempArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState();

  const dateRef1=useRef()
  const dateRef2=useRef()

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      id: Math.floor(Math.random() * 1000),
      name: "",
      username: "",
      status: "",
      description: "",
      sendMessage: "",
      satisfactionaryMessage: "",
      nutralMessage: "",
      nonSatisfactionaryMessage: "",
      thankYouNote: "",
      header: "",
      body: "",
      footer: "",
      question: [emptyQuestion],
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, ("نام باید شامل 15 حرف یا کمتر باشد"))
        .required(() => {
          return ("نام الزامیست");
        }),
      sendMessage: Yup.string()
        .max(150, ("متن ارسال باید شامل 150 حرف یا کمتر باشد"))
        .required(() => {
          return ("متن ارسال الزامیست");
        }),
      nutralMessage: Yup.string()
        .max(150, ("متن ممتنع باید شامل 150 حرف یا کمتر باشد"))
        .required(() => {
          return ("متن ممتنع الزامیست");
        }),
      nonSatisfactionaryMessage: Yup.string()
        .max(150, ("متن عدم رضایت باید شامل 150 حرف یا کمتر باشد"))
        .required(() => {
          return ("متن عدم رضایت الزامیست");
        }),
      thankYouNote: Yup.string()
        .max(150, ("متن  تشکر باید شامل 150 حرف یا کمتر باشد"))
        .required(() => {
          return ("متن تشکر الزامیست");
        }),  
        
        question: array(
          object({
              question: string()
                  .required('فیلد الزامی است'),
              answereType: string()
                  .required('فیلد الزامی است'),
          })
      )
    }),
    onSubmit: (values) => {
      // setFactor([...factor, values]);
      console.log("herere",values)
      factorSub();
    },
  });
  const factorSub = () => {
    swal({
      title: t("فاکتور با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };
  function getData(val) {
    formik.setFieldValue("username", val.username);
  }
  function clearField() {
    formik.setFieldValue("username", "");
  }


  useEffect(() => {
    if (formik.isSubmitting) {
      let condition1 = !!(formik.touched.name && formik.errors.name);
      let condition2 = !!(
        (formik.touched.sendMessage && formik.errors.sendMessage) ||
        (formik.touched.nutralMessage && formik.errors.nutralMessage) ||
        (formik.touched.nonSatisfactionaryMessage &&
          formik.errors.nonSatisfactionaryMessage) ||
        (formik.touched.thankYouNote && formik.errors.thankYouNote)
      );
      let condition3 = !!(
        (formik?.errors?.question?.length)
      );
      setPanel1(condition1 || panel1);
      setPanel2(condition2 || panel2);
      setPanel3(condition3 || panel3)
    }
  }, [formik]);


  const answereTypeUnits = [
    {name:t("Text"),value:'Text'},
    {name:t("Textarea"),value:'Textarea'},
    {name:t("Checkbox"),value:'Checkbox'},
    {name:t("Radio"),value:'Radio'},
    {name:t("Dropdown"),value:'Dropdown'},
    {name:t("Multiselect"),value:'Multiselect'},
    {name:t("Date"),value:'Date'},
    {name:t("Datetime"),value:'Datetime'},
    {name:t("Rating"),value:'Rating'},
  ];
  useEffect(() => {
    if (time) {
      let t = new Date(time);
    }
  }, [time]);
  const ratingChanged = (newRating) => {
  };
   


  function addInFieldArray(){
    
    let temp=tempArray.filter((item)=>item!=='')

    console.log('----index-------------',currentIndex)
     formik.setFieldValue(`question[${currentIndex}].fieldExample`,temp)
     setTempArray([])
     setOpen(false);
    
  }


  console.log('----question-------------',formik.values.question)



  const [open, setOpen] = React.useState(false);

  const handleClickToOpen = (index) => {
    console.log('index open',index)
    console.log('formik.values?.question[index]?.fieldExample',formik.values?.question[index]?.fieldExample)
    let tArr=formik.values?.question[index]?.fieldExample?.length?formik.values?.question[index]?.fieldExample:['']
    setTempArray(tArr)
    setOpen(true);
    setCurrentIndex(index)
  };



  const handleClose = () => {
    setOpen(false);
  };
 
const [value, setvalue] = useState("");

  const handleOnchange = val => {
    setvalue(val)
  };


  function getMultiData(index){
    let data=[...formik.values.question[index]?.fieldExample]
    let temp=data.map((item)=>(
      { label: item, value: item}
    ))
    return temp
  }
     
 
    function getSecondValue(e) {
        formik.setFieldValue("header", e);
    }
    function getThirdValue(e) {
        formik.setFieldValue("body", e);
    }
    function getValue(e) {
        formik.setFieldValue("footer", e);
    }

    const measurementUnits = [t("پیش نویس"), t("مذاکره"), t("ارسال شده")];




  return (
    <>
      <div>
              <FormikProvider value={formik}>
                  {/*<h1 className='main-title'>*/}
                  {/*    {t("نظرسنجی")}*/}
                  {/*</h1>*/}
           <form onSubmit={formik.handleSubmit}>
            <div>
              <Accordion expanded={panel1} onChange={handlePanel1()}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1b-content"
                  id="panel1b-header"
                >
                  <Typography>{t("اطلاعات کلی")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="form-design">
                    <div className="row ">
                      <div className="col-lg-12 col-12">
                        <div className="row">
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                                <span>
                                  {t("نام")}
                                  <span className="star">*</span>
                                </span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <input
                                  className="form-input form-control "
                                  type="text"
                                  id="name"
                                  name="name"
                                  onChange={formik.handleChange.bind(this)}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.name}
                                />
                                {formik.touched.name &&
                                formik.errors.name ? (
                                  <div className='error-msg'>
                                    {t(formik.errors.name)}
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
                              <div className="divModal position-relative">
                                <input
                                  disabled
                                  className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                  type="text"
                                  id="username"
                                  name="username"
                                  onChange={(evt) => formik.handleChange(evt)}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.username}
                                />
                                <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr':''}`} >
                                  <Username className='modal' getData={getData} />
                                  <Button> <CancelIcon onClick={clearField} /></Button>
                                </div>


                                {formik.touched.username &&
                                formik.errors.username ? (
                                  <div className='error-msg'>
                                    {t(formik.errors.username)}
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
                                >
                                </SelectBox>
                                {formik.touched.status &&
                                formik.errors.status ? (
                                  <div className='error-msg'>
                                    {t(formik.errors.status)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                                <span>{t("توضیحات")}</span>
                            </div>
                            <div className="wrapper">
                              <div className="divModal">
                                    <textarea
                                      className="form-input"
                                      id="description"
                                      name="description"
                                      onChange={(evt) => formik.handleChange(evt)}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.description}
                                    />
                                {formik.touched.description &&
                                formik.errors.description ? (
                                  <div className='error-msg'>
                                    {t(formik.errors.description)}
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
                  <Typography>{t("سوالات نظر‌سنجی")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="form-design">
                    <div className="row ">
                      <FieldArray
                        name="question"
                        render={({ push, remove }) => (
                          <React.Fragment>
                            <div className="row align-items-center mb-0">
                              <div className="content col-lg-6 col-md-12 col-xs-12 d-flex justify-content-start">
                                <Button
                                  className="AddRow"
                                  onClick={()=>{
                                    push(emptyQuestion)
                                    setQuestionFieldsTouch(oldArray => [...oldArray,emptyQuestionTouch])
                                  }}
                                >
                                  {t("افزودن سوال")}
                                </Button>
                              </div>

                              {formik?.values?.question?.map(
                                (question, indexMain) => (
                                  <div className='question'>
                                    <div
                                      className="row mb-0"
                                      key={indexMain}
                                      style={{ display: "flex" }}
                                    >
                                      <div className="content col-lg-1 col-1">
                                        <div className='title' style={{"margin-bottom":'20px'}}><span>‌</span></div>
                                        <div className="wrapper">
                                          <div className="count ">
                                            {indexMain + 1}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="content col-lg-3 col-11">
                                        <div className="row">
                                          <div style={{ textAlign: "center" }} className="title">
                                            <label>{t("متن سوال")}</label>
                                          </div>
                                          <div className="wrapper">
                                            <div className="divModal d-flex">
                                              <input
                                                className="form-input"
                                                type="text"
                                                id="question"
                                                name={`question[${indexMain}].question`}
                                                onChange={(evt) => formik.handleChange(evt)}
                                                onBlur={() => {
                                                  let temp = questionTouch.map(
                                                    (item, i) =>
                                                      i === indexMain
                                                        ? {
                                                          ...item,
                                                          question: true,
                                                        }
                                                        : item
                                                  );
                                                  setQuestionFieldsTouch(temp);
                                                }}
                                                value={
                                                  formik.values.question[indexMain]
                                                    .question
                                                }
                                              />
                                            </div>
                                            {Array.isArray(
                                              formik.errors.question
                                            ) && Array.isArray(questionTouch)
                                              ? formik.errors.question[indexMain]
                                                ?.question &&
                                              questionTouch[indexMain]
                                                ?.question && (
                                                <div className='error-msg'>
                                                  {t(
                                                    formik.errors.question[
                                                      indexMain
                                                      ]?.question
                                                  )}
                                                </div>
                                              )
                                              : ""}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="content col-lg-3 col-sm-5 col-12" onFocus={()=> {
                                        dateRef1?.current?.closeCalendar();
                                        dateRef2?.current?.closeCalendar();
                                      }}>
                                        <div className="row">
                                          <div style={{textAlign:"center"}} className="title">
                                            <label>{t("نوع جواب سوال")}</label>
                                          </div>
                                          <div className="wrapper">
                                            <div className="divModal">
                                              <SelectBox
                                                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                dataSource={answereTypeUnits}
                                                displayExpr="name"
                                                valueExpr="value"
                                                onValueChanged={(e) =>{
                                                  formik.setFieldValue(
                                                    `question[${indexMain}].answereType`,
                                                    e.value
                                                  )
                                                  formik.setFieldValue(
                                                    `question[${indexMain}].fieldExample`,
                                                    []
                                                  )
                                                  setTempArray([''])
                                                }

                                                }
                                                className="selectBox"
                                                noDataText={t("اطلاعات یافت نشد")}
                                                itemRender={null}
                                                placeholder=""
                                                id="answereType"
                                                name={`question[${indexMain}].answereType`}
                                                searchEnabled
                                                onChange={(evt) => formik.handleChange(evt)}
                                                onBlur={() => {
                                                  let temp = questionTouch.map(
                                                    (item, i) =>
                                                      i === indexMain
                                                        ? {
                                                          ...item,
                                                          answereType: true,
                                                        }
                                                        : item
                                                  );
                                                  setQuestionFieldsTouch(temp);
                                                }}
                                                value={
                                                  formik.values.question[indexMain]
                                                    .answereType
                                                }
                                              />
                                              {Array.isArray(
                                                formik.errors.question
                                              ) && Array.isArray(questionTouch)
                                                ? formik.errors.question[indexMain]
                                                  ?.answereType &&
                                                questionTouch[indexMain]
                                                  ?.question && (
                                                  <div className='error-msg'>
                                                    {t(
                                                      formik.errors.question[
                                                        indexMain
                                                        ]?.answereType
                                                    )}
                                                  </div>
                                                )
                                                : ""}
                                            </div>
                                          </div>

                                        </div>
                                      </div>
                                      <div className="content col-lg-4 col-sm-6 col-11">
                                        <div className="row">
                                          <div style={{ textAlign: "center" }} className="title">
                                            <label>{t("نمونه فیلد")}</label>
                                          </div>
                                          <div className="wrapper">
                                            <div className="divModal">
                                              {formik.values.question[indexMain]
                                                .answereType === "Text" && (
                                                <input
                                                  className="form-input"
                                                  type="text"
                                                  id="fieldExample"
                                                  name={`question[${indexMain}].fieldExample`}
                                                  onChange={(evt) => formik.handleChange(evt)}
                                                  onBlur={() => {
                                                    let temp = questionTouch.map(
                                                      (item, i) =>
                                                        i === indexMain
                                                          ? {
                                                            ...item,
                                                            fieldExample: true,
                                                          }
                                                          : item
                                                    );
                                                    setQuestionFieldsTouch(temp);
                                                  }}
                                                  value={
                                                    formik.values.question[indexMain]
                                                      .fieldExample
                                                  }
                                                />
                                              )}
                                              {formik.values.question[indexMain]
                                                .answereType === "Textarea" && (
                                                <textarea
                                                  className="form-input"
                                                  id="fieldExample"
                                                  name={`question[${indexMain}].fieldExample`}
                                                  onChange={(evt) => formik.handleChange(evt)}
                                                  onBlur={() => {
                                                    let temp = questionTouch.map(
                                                      (item, i) =>
                                                        i === indexMain
                                                          ? {
                                                            ...item,
                                                            fieldExample: true,
                                                          }
                                                          : item
                                                    );
                                                    setQuestionFieldsTouch(temp);
                                                  }}
                                                  value={
                                                    formik.values.question[indexMain]
                                                      .fieldExample
                                                  }
                                                />
                                              )}
                                              {formik.values.question[indexMain]
                                                .answereType === "Checkbox" && (
                                                <label className='checkbox-label justify-content-center'>
                                                  <input
                                                    className='form-input'
                                                    type={'checkbox'}
                                                    id="fieldExample"
                                                    name={`question[${indexMain}].fieldExample`}
                                                    onChange={(evt) => formik.handleChange(evt)}
                                                    onBlur={() => {
                                                      let temp = questionTouch.map(
                                                        (item, i) =>
                                                          i === indexMain
                                                            ? {
                                                              ...item,
                                                              fieldExample: true,
                                                            }
                                                            : item
                                                      );
                                                      setQuestionFieldsTouch(temp);
                                                    }}
                                                    value={
                                                      formik.values.question[indexMain]
                                                        .fieldExample
                                                    }
                                                  />
                                                </label>
                                              )}
                                              {formik.values.question[indexMain]
                                                .answereType === "Radio" && (
                                                <div className="row">
                                                  <div className="col-9 d-flex justify-content-evenly align-items-center flex-wrap">

                                                    {formik.values?.question[indexMain]?.fieldExample?.map((item,index)=>(
                                                      <div key={index}>
                                                        <label
                                                          className='d-flex ml-2'>
                                                          <input type="radio"
                                                                 name={`tempArray[${index}]`}
                                                                 id={`tempArray[${index}]`}
                                                                 value={item}
                                                          />
                                                          {item}
                                                        </label>

                                                      </div>

                                                    ))}
                                                  </div>
                                                  <div className="col-3 d-flex justify-content-end">
                                                    <Button
                                                      color="primary"
                                                      onClick={()=>handleClickToOpen(indexMain)}
                                                    >
                                                      <SettingsIcon />
                                                    </Button>

                                                  </div>

                                                </div>
                                              )}
                                              {formik.values.question[indexMain]
                                                .answereType === "Dropdown" && (
                                                <div className="row">
                                                  <div className="col-9">

                                                    <SelectBox
                                                      dataSource={formik.values.question[indexMain].fieldExample}
                                                      rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                      className="selectBox"
                                                      noDataText={t(
                                                        "اطلاعات یافت نشد"
                                                      )}
                                                      itemRender={null}
                                                      placeholder=""
                                                      id="fieldExample"
                                                      name={`question[${indexMain}].fieldExample`}
                                                      searchEnabled
                                                      onChange={(evt) => formik.handleChange(evt)}
                                                      // displayExpr="dropDown"
                                                      onBlur={() => {
                                                        let temp =
                                                          questionTouch.map(
                                                            (item, i) =>
                                                              i === indexMain
                                                                ? {
                                                                  ...item,
                                                                  fieldExample: true,
                                                                }
                                                                : item
                                                          );
                                                        setQuestionFieldsTouch(
                                                          temp
                                                        );
                                                      }}
                                                      value={
                                                        formik.values.question[
                                                          indexMain
                                                          ].fieldExample
                                                      }
                                                    />
                                                  </div>
                                                  <div className="col-3 d-flex justify-content-end">
                                                    <Button
                                                      color="primary"
                                                      onClick={()=>handleClickToOpen(indexMain)}
                                                    >
                                                      <SettingsIcon />
                                                    </Button>

                                                  </div>
                                                </div>
                                              )}
                                              {formik.values.question[indexMain]
                                                .answereType === "Multiselect" && (
                                                <div className="row d-flex align-content-center">
                                                  <div className="col-9">
                                                    <MultiSelect
                                                      onChange={handleOnchange}
                                                      options={getMultiData(indexMain)}
                                                      placeholder={t("انتخاب کنید")}
                                                      className={i18n.dir()==='rtl'&&'multi-rtl'}
                                                    />

                                                  </div>
                                                  <div className="col-3 d-flex justify-content-end">
                                                    <Button
                                                      color="primary"
                                                      onClick={()=>handleClickToOpen(indexMain)}
                                                    >
                                                      <SettingsIcon />
                                                    </Button>

                                                  </div>
                                                </div>
                                              )}
                                              {formik.values.question[indexMain]
                                                .answereType === "Date" && (
                                                <div className="wrapper date-picker position-relative"  >
                                                  <DatePicker
                                                    name={`question[${indexMain}].fieldExample`}
                                                    id="fieldExample"
                                                    ref={dateRef2}
                                                    editable={false}
                                                    calendar={renderCalendarSwitch(i18n.language)}
                                                    locale={renderCalendarLocaleSwitch(i18n.language)}
                                                    onBlur={formik.handleBlur}
                                                  />
                                                  <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                                                    <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal'/></div>
                                                  </div>
                                                </div>
                                              )}
                                              {formik.values.question[indexMain]
                                                .answereType === "Datetime" && (
                                                <div className="row d-flex">
                                                  <div
                                                    className="wrapper col-6 date-picker position-relative"
                                                  >
                                                    <DatePicker
                                                      ref={dateRef1}
                                                      id="fieldExample"
                                                      editable={false}
                                                      name={`question[${indexMain}].fieldExample`}
                                                      calendar={renderCalendarSwitch(i18n.language)}
                                                      locale={renderCalendarLocaleSwitch(i18n.language)}
                                                      onBlur={formik.handleBlur}
                                                    />
                                                    <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                                                      <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal' /></div>
                                                    </div>
                                                  </div>

                                                  <div className="col-6" onFocus={()=> dateRef1?.current?.closeCalendar()}>
                                                    <LocalizationProvider
                                                      dateAdapter={AdapterDayjs}
                                                    >
                                                      <TimePicker
                                                        ampm={false}
                                                        className="time-picker"
                                                        id="fieldExample"
                                                        name={`question[${indexMain}].fieldExample`}
                                                        views={["hours", "minutes"]}
                                                        inputFormat="HH:mm"
                                                        mask="__:__"
                                                        value={time}
                                                        onChange={(newValue) => {
                                                          setTime(newValue);
                                                        }}
                                                        renderInput={(params) => (
                                                          <TextField {...params} />
                                                        )}
                                                      />
                                                    </LocalizationProvider>
                                                  </div>

                                                </div>
                                              )}
                                              {formik.values.question[indexMain]
                                                .answereType === "Rating" && (
                                                <div className="d-flex justify-content-center">
                                                  <ReactStars
                                                    count={5}
                                                    onChange={ratingChanged.bind(this)}
                                                    size={24}
                                                    isHalf={false}
                                                    emptyIcon={
                                                      <i className="far fa-star"></i>
                                                    }
                                                    halfIcon={
                                                      <i className="fa fa-star-half-alt"></i>
                                                    }
                                                    fullIcon={
                                                      <i className="fa fa-star"></i>
                                                    }
                                                    activeColor="#ffd700"
                                                  />
                                                </div>
                                              )}
                                              {Array.isArray(
                                                formik.errors.question
                                              ) && Array.isArray(questionTouch)
                                                ? formik.errors.question[indexMain]
                                                  ?.fieldExample &&
                                                questionTouch[indexMain]
                                                  ?.question && (
                                                  <div className='error-msg'>
                                                    {t(
                                                      formik.errors.question[
                                                        indexMain
                                                        ]?.fieldExample
                                                    )}
                                                  </div>
                                                )
                                                : ""}
                                            </div>
                                          </div>
                                          {/* {formik.values.emmail===1&&<div></div} */}
                                        </div>
                                      </div>
                                      <div className="content col-lg-1 col-sm-1 col-1" onFocus={()=> {
                                        dateRef1?.current?.closeCalendar();
                                        dateRef2?.current?.closeCalendar();
                                      }}>
                                        <div className="row justify-content-center justify-content-lg-start">
                                          <div  className="title">
                                            <span>‌</span>
                                          </div>
                                          <button style={{width:"70px"}}
                                                  type="button"
                                                  onClick={() => remove(indexMain)}
                                                  className="remove-btn "
                                          >
                                            <DeleteIcon fontSize="medium" />
                                          </button>
                                        </div>
                                      </div>
                                      <Dialog open={open} onClose={()=>handleClose()} style={{direction:`${i18n.dir()}`}}>
                                        <DialogTitle>{t("تنظیمات گزینه های فیلد")}</DialogTitle>
                                        <DialogContent>
                                          <DialogContentText>
                                            <FieldArray
                                              name={`radio`}
                                              render={({ push, remove }) => (
                                                <React.Fragment>
                                                  <div className="row align-items-center mb-0">
                                                    <div className="content col-lg-6 col-md-12 col-xs-12">

                                                      <Button
                                                        className="AddRow"
                                                        onClick={() =>  {

                                                          setTempArray([...tempArray,''])

                                                        }}

                                                      >
                                                        {t("افزودن گزینه جدید")}</Button>
                                                    </div>
                                                    {tempArray?.map((radio, index)=> (
                                                      <div className="row mb-0" key={index} style={{ display: 'flex' }}>

                                                        <div className="content col-lg-11 col-md-6 col-xs-12 form-design">
                                                          <div className='title'>
                                                            <span>{t('مقدار گزینه‌ها')}</span>
                                                          </div>
                                                          <input
                                                            className="form-input form-control "
                                                            type="text"
                                                            id="name"
                                                            name="name"
                                                            onChange={(e) => {

                                                              let temp=[...tempArray]
                                                              temp[index]=e.target.value
                                                              setTempArray(temp)

                                                            }}
                                                            onBlur={() => {
                                                              let temp = radioTouch.map((item, i) => (
                                                                i === index ? { ...item, radio: true } : item
                                                              ))
                                                              setRadioFieldsTouch(temp)
                                                            }}
                                                            value={tempArray[index]}
                                                          />


                                                        </div>

                                                        <div className="content col-lg-1 col-md-3 col-xs-12">
                                                          <div className="title">
                                                            <span>‌‌</span>
                                                          </div>
                                                          <button
                                                            type="button"
                                                            onClick={() => {
                                                              let temp=tempArray.filter((item,index2)=>index2!==index)
                                                              setTempArray(temp)
                                                            }}
                                                            className="remove-btn"
                                                          >
                                                            <DeleteIcon fontSize="medium" />
                                                          </button>
                                                        </div>
                                                      </div>
                                                    ))}
                                                  </div>
                                                </React.Fragment>
                                              )}>
                                            </FieldArray>

                                          </DialogContentText>

                                        </DialogContent>
                                        <DialogActions>
                                          <Button onClick={() => handleClose()}>{t("بستن")}</Button>
                                          <Button onClick={() => addInFieldArray()}>{t("تایید") }</Button>
                                        </DialogActions>
                                      </Dialog>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </React.Fragment>
                        )}
                      ></FieldArray>
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
                                <span>
                                  {t("متن ارسال")}
                                  <span className="star">*</span>
                                </span>
                            </div>
                            <div className="wrapper">
                              <div className="divModal">
                                    <textarea
                                      className="form-input"
                                      id="sendMessage"
                                      name="sendMessage"
                                      onChange={(evt) => formik.handleChange(evt)}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.sendMessage}
                                    />
                                {formik.touched.sendMessage &&
                                formik.errors.sendMessage ? (
                                  <div className='error-msg'>
                                    {t(formik.errors.sendMessage)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                                <span>{t("متن رضایت")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                    <textarea
                                      className="form-input"
                                      id="satisfactionaryMessage"
                                      name="satisfactionaryMessage"
                                      onChange={(evt) => formik.handleChange(evt)}
                                      onBlur={formik.handleBlur}
                                      value={
                                        formik.values.satisfactionaryMessage
                                      }
                                    />
                                {formik.touched.satisfactionaryMessage &&
                                formik.errors.satisfactionaryMessage ? (
                                  <div className='error-msg'>
                                    {t(formik.errors.satisfactionaryMessage)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                                <span>
                                  {t("متن ممتنع")}
                                  <span className="star">*</span>
                                </span>
                            </div>
                            <div className="wrapper">
                              <div className="divModal">
                                    <textarea
                                      className="form-input"
                                      id="nutralMessage"
                                      name="nutralMessage"

                                      onChange={(evt) => formik.handleChange(evt)}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.nutralMessage}
                                    />
                                {formik.touched.nutralMessage &&
                                formik.errors.nutralMessage ? (
                                  <div className='error-msg'>
                                    {t(formik.errors.nutralMessage)}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                                <span>
                                  {t("متن عدم رضایت")}
                                  <span className="star">*</span>
                                </span>
                            </div>
                            <div className="wrapper">
                              <div className="divModal">
                                    <textarea
                                      className="form-input"
                                      id="nonSatisfactionaryMessage"
                                      name="nonSatisfactionaryMessage"

                                      onChange={(evt) => formik.handleChange(evt)}
                                      onBlur={formik.handleBlur}
                                      value={
                                        formik.values.nonSatisfactionaryMessage
                                      }
                                    />
                                {formik.touched.nonSatisfactionaryMessage &&
                                formik.errors.nonSatisfactionaryMessage ? (
                                  <div className='error-msg'>
                                    {
                                      t(formik.errors
                                        .nonSatisfactionaryMessage)
                                    }
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="content col-lg-6 col-md-6 col-xs-12">
                            <div className="title">
                                <span>
                                  {t("متن تشکر")}
                                  <span className="star">*</span>
                                </span>
                            </div>
                            <div className="wrapper">
                              <div className="divModal">
                                    <textarea
                                      className="form-input"
                                      id="thankYouNote"
                                      name="thankYouNote"
                                      onChange={(evt) => formik.handleChange(evt)}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.thankYouNote}
                                    />
                                {formik.touched.thankYouNote &&
                                formik.errors.thankYouNote ? (
                                  <div className='error-msg'>
                                    {t(formik.errors.thankYouNote)}
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
              <Accordion defaultExpanded={true}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1b-content"
                  id="panel1b-header"
                >
                  <Typography>{t("سربرگ")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="form-design">
                    <div className="row">
                      <div className="col-12">
                       <TextEditor name="header" id="header" getValue={getSecondValue} />
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
                  <Typography>{t("بدنه")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="form-design">
                    <div className="row">
                      <div className="col-12">
                        <TextEditor name="body" id="body" getValue={getThirdValue} />
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
                  <Typography>{t("ته برگ")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="form-design">
                    <div className="row">
                      <div className="col-12">
                      <TextEditor name="footer" id="footer" getValue={getValue} />
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              <div className="button-pos">
                <button
                onClick={()=>{
                  let temp = questionTouch.map((item,i)=>({
                    question:true,answereType:true
                  }))
                  setQuestionFieldsTouch(temp)
                }}
                  id="submit"
                  // onClick={factorSub}
                  type="submit"
                  className="btn btn-success"
                >
                  {t("ثبت فاکتور")}
                </button>
              </div>
            </div>
          </form>
        </FormikProvider>
      </div>
    </>
  );
};

export default Fidback;
