import React, { useEffect, useRef, useState } from "react";
import { FieldArray,FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import DatePicker from "react-multi-date-picker";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DataGrid, {
  Column,
  Popup,
  Texts,
  Editing,
  Selection,
  RowDragging,
} from "devextreme-react/data-grid";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogContent,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";
import AccountModal from "../../../components/Modals/OpportunitiesModal/account/AccountModal";
import CampaignModal from "../../../components/Modals/OpportunitiesModal/campaign/CampaignModal";
import { julianIntToDate, julianIntToDateTime } from "../../../utils/dateConvert";
import ProjectModal from "../../../components/Modals/OpportunitiesModal/project/ProjectModal";
import { SelectProducts } from "../../../components/Modals/ModalGroup/SelectProducts";
import { SelectMultipleProducts } from "../../../components/Modals/ModalGroup/SelectMultipleProducts";
import DeleteIcon from "@mui/icons-material/Delete";
import { UploadFileComponent } from "../../../components/Modals/ModalGroup/UploadFileComponent";
import { ApplyChanges } from "../../../components/Modals/ModalGroup/ApplyChanges";
import { Packaging } from "../../../components/Modals/ModalGroup/Packaging";
import { parsFloatFunction } from "../../../utils/parsFloatFunction";
import CurrencyInput from "react-currency-input-field";
import { useSearchParams } from "react-router-dom";
import { history } from "../../../utils/history";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { SelectBox } from "devextreme-react";
import {
  renderCalendarLocaleSwitch,
  renderCalendarSwitch,
} from "../../../utils/calenderLang";
import EditProducts from "../../../components/Modals/ModalGroup/EditProducts";
import DateObject from "react-date-object";
import { getLangDate } from "../../../utils/getLangDate";

const Factor = [];
const NewOpportunities = () => {
    const [SearchParams] = useSearchParams();
    const id = SearchParams.get("id");
    const [result, setResult] = useState();
  ////////////////states//////////////////////////
  const { t, i18n } = useTranslation();
  const [alignment, setAlignment] = React.useState("");
  const [expanded, setExpanded] = React.useState(null);
  const [accountData, setAccountsData] = useState([]);
  const [factor, setFactor] = React.useState(Factor);
  const [opportunitiesDetail, setOpportunitiesDetail] = useState([]);
  const [campaignDetail, setCampaignDetail] = useState([]);
  const appConfig = window.globalConfig;
  const theme = useTheme();
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [clues, setClues] = useState([]);
  const dateRef1 = useRef();
  const dateRef2 = useRef();
  const emptyCamapignsID = { CampaignID: "" };
  const emptyCamapignsIDTouch = {
    CampaignID: false,
  };
  const [CamapignsIDTouch, setCamapignsIDTouch] = useState([
    emptyCamapignsIDTouch,
  ]);
  /////////////////////formik////////////////////
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      opportunityName: "",
      moneyUnit: "",
      accountID: 0,
      accountName: "",
      PriceBased: "",
      saleProcess: "",
      clueID: 0,
      salesStage: "",
      price: "",
      successProssibility: "",
      expectedPrice: "",
      saleDate: new DateObject(),
      productsID: [],
      campaignsID: [{ ...emptyCamapignsID }],
      clueSource: "",
      campaign: "",
      priority: "",
      project: "",
      nextStep: "",
      type: "",
      reasonofLoss: "",
      saleForecast: "",
      sendingInvoiceTerms: "",
      payTermEndDate: new DateObject(),
      desc: "",
    },
    validationSchema: Yup.object({
      opportunityName: Yup.string()
        .max(15, "نام باید شامل 15 حرف یا کمتر باشد")
        .required("نام  فرصت الزامیست"),
      saleProcess: Yup.string().required(
        "انتخاب نوع روند فروش الزامیست"
      ),
      campaignsID: Yup.array(
        Yup.object({
          CampaignID: Yup.string().required("انتخاب کمپین الزامیست")
        })
      ),
      salesStage: Yup.string().required("انتخاب مرحله فروش الزامیست"),
      price: Yup.number()
        .typeError("تنها عدد مجاز است")
        .required("مشخص کردن مبلغ الزامی است"),
        successProssibility: Yup.number()
        .typeError("تنها عدد مجاز است")
        .max(100, "بیشتر از 100 مجاز نیست"),
      saleDate: Yup.date().required("انتخاب تاریخ الزامی است"),
      payTermEndDate: Yup.date()
        .required("انتخاب تاریخ الزامی است")
        .when("saleDate", (saleDate) => {
          if (
            Date.parse(formik.values.payTermEndDate) -
              Date.parse(saleDate) < 0
          ) {
            return Yup.date().min(
              saleDate,
              "تاریخ پایان باید پیش از تاریخ فروش باشد"
            );
          }
        }),
    }),
    onSubmit: (values) => {
      values.productsID = values.productsID.map((item) => JSON.stringify(item))
      values.campaignsID = values.campaignsID.map((item) => JSON.stringify(item))
      console.log(values);
      axios
          .post(`${appConfig.BaseURL}/api/Opportunities`, values)
          .then((res) => setResult(res.data.data));
      factorSub();
      callComponent();
    },
  });
  
  const updateOpportunities = (values) => {
    formik.values.productList = JSON.stringify(formik.values.productList);
    if (values != null) {
      let isSuccess = false;
      axios
        .put(`${appConfig.BaseURL}/api/Opportunities/Update/${id}`, formik.values)
        .then((res) => {
          setResult(res.data);
          isSuccess = true;
        })
        .finally(() => {
          if ((isSuccess = true)) {
            history.navigate(`/sale/Opportunities/OpportunitiesManagement`);
          }
        });
    }
  };
  useEffect(() => {
    if (id != null) {
      axios.get(`${appConfig.BaseURL}/api/Opportunities/${id}`).then((res) => {
        setOpportunitiesDetail(res.data.data);
        formik.setFieldValue("opportunityName", res.data.data.opportunityName);
        formik.setFieldValue("moneyUnit", res.data.data.moneyUnit);
        formik.setFieldValue("accountName", res.data.data.accountName);
        formik.setFieldValue("PriceBased", res.data.data.PriceBased);
        formik.setFieldValue("saleProcess", res.data.data.saleProcess);
        formik.setFieldValue("clueID", res.data.data.clueID);
        formik.setFieldValue("salesStage", res.data.data.salesStage);
        formik.setFieldValue("price", res.data.data.price);
        formik.setFieldValue("successProssibility", res.data.data.successProssibility);
        formik.setFieldValue("expectedPrice", res.data.data.expectedPrice);
        formik.setFieldValue("saleDate", res.data.data.saleDate);
        formik.setFieldValue("productList", res.data.data.productList);
        setReciept(JSON.parse(res.data.data.productList))
        formik.setFieldValue("clueSource", res.data.data.clueSource);
        formik.setFieldValue("campaign", res.data.data.campaign);
        formik.setFieldValue("priority", res.data.data.priority);
        formik.setFieldValue("project", res.data.data.project);
        formik.setFieldValue("nextStep", res.data.data.nextStep);
        formik.setFieldValue("type", res.data.data.type);
        formik.setFieldValue("reasonofLoss", res.data.data.reasonofLoss);
        formik.setFieldValue("saleForecast", res.data.data.saleForecast);
        formik.setFieldValue("sendingInvoiceTerms", res.data.data.sendingInvoiceTerms);
        formik.setFieldValue("payTermEndDate", res.data.data.payTermEndDate);
        formik.setFieldValue("desc", res.data.data.desc);
      });
    }
  }, [id]);
  useEffect(() => {
    axios
      .get(`${appConfig.BaseURL}/api/Clues`)
      .then((res) => setClues(res.data.data));
  }, []);
  useEffect(() => {
    axios
      .get(`${appConfig.BaseURL}/api/account`)
      .then((res) => setAccountsData(res.data.data));
  }, []);
  const callComponent = () => {
    history.navigate(
      `/sale/Opportunities/OpportunitiesManagement`
    );
  };
  ////////////////////////modal//////////////
  const handleChange2 = (panel1) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel1 : false);
  };
  function getAccountData(val) {
    formik.setFieldValue("accountName", val.accountName);
  }
  function clearAccountField() {
    formik.setFieldValue("accountName", "");
  }
  function getUserData(val) {
    formik.setFieldValue("user", val.user);
  }
  function clearUserField() {
    formik.setFieldValue("user", "");
  }
  function getCampaignData(val) {
    formik.setFieldValue("campaign", val.campaign);
  }
  function clearCampaignField() {
    formik.setFieldValue("campaign", "");
  }
  function getProjectData(val) {
    formik.setFieldValue("project", val.project);
  }
  function clearProjectField() {
    formik.setFieldValue("project", "");
  }
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  //////////////////Calculations////////////////////
  const [amountExpected, setAmountExpected] = React.useState("");
  useEffect(() => {
    formik.values.successProssibility <= 100 &&
      setAmountExpected(
        parseFloat(
          (formik.values.successProssibility * formik.values.price) / 100,
          2
        )
      );
  }, [formik]);
  useEffect(() => {
    console.log("1", amountExpected);
    console.log("2", parsFloatFunction(amountExpected, 2));
    formik.setFieldValue(
      "expectedPrice",
      parsFloatFunction(amountExpected, 2)
    );
  }, [amountExpected]);

  ///////////////////modal group////////////////////
  const [reciept, setReciept] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openuploadfile, setOpenuploadfile] = React.useState(false);
  const [openmulti, setOpenMultiple] = React.useState(false);
  const [openapplychanges, setOpenapplychanges] = React.useState(false);
  const [openpackaging, setOpenpackaging] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [sentEditdata, setSentEditData] = React.useState();
  const [editdata, setEditdata] = React.useState();
  const clickArr = [
    t("نمایش جزئیات"),
    t("نمایش جزئیات بیشتر"),
    t("نمایش جزئیات کمتر"),
  ];
  const [count, setCount] = React.useState(0);
  const [run, setRun] = React.useState(0);
  const handleClickOpen = () => {
    setOpen(true);
    setOpen2(true);
  };
  const handleClose = () => {};
  const handleClickOpenMultipleProducts = () => {
    setOpenMultiple(true);
  };
  const handleCloseMultipleProducts = () => {};
  const [total, setTotal] = React.useState();
  React.useEffect(() => {
    if (reciept) {
      const result = reciept?.reduce(
        (total, currentValue) => (total = total + parseInt(currentValue.price)),
        0
      );
      setTotal(result);
      formik.setFieldValue("productsID", reciept.map((item) => item.id));
    }
  }, [reciept]);
  React.useEffect(() => {
    formik.setFieldValue("totalprice", total || 0);
  }, [total]);
  const handleClickOpenuploadfile = () => {
    setOpenuploadfile(true);
  };
  const handlecloseuploadfile = () => {};
  const handleClickOpenapplychanges = () => {
    setOpenapplychanges(true);
  };
  const handlecloseapplychanges = () => {};
  const handleClickOpenpackaging = () => {
    setOpenpackaging(true);
  };
  useEffect(() => {
    axios
      .get(`${appConfig.BaseURL}/api/Campaign`)
      .then((res) => setCampaignDetail(res.data.data));
  }, []);
  const handleclosepackaging = () => {};
  function HandleSalePriceChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("price", parsFloatFunction(temp, 2));
  }
  const buttonText = clickArr[count % clickArr.length];
  const handleClick = () => setCount((c) => c + 1);
  const setFactorr = (val) => {
    setReciept([...reciept, val]);
  };
  const [difference, setDifference] = React.useState();
  const setchanges = (val) => {
    setDifference(val);
  };
  useEffect(() => {
    if (difference) {
      var taxchange = parseFloat(difference.taxamount) || 1;
      var newprice = parseFloat(difference.NewPrice) || 1;
      var discountpercent = parseFloat(difference.discountpercentage) || 0;
      if (difference.select === "Add") {
        let temp = reciept.map((obj) => ({
          ...obj,
          PriceAfterDiscount: obj.subset * (1 - discountpercent / 100),
          totalprice:
            obj.subset *
            (1 - discountpercent / 100) *
            taxchange *
            (1 + newprice / 100),
        }));

        setReciept(temp);
      }
      if (difference.select === "replace") {
        let temp1 = reciept.map((obj) => ({
          ...obj,

          PriceAfterDiscount: obj.subset * ((100 - discountpercent) / 100),

          totalprice:
            obj.subset *
            ((100 - discountpercent) / 100) *
            taxchange *
            (1 + newprice / 100),
        }));

        setReciept(temp1);
      }
    }
  }, [difference]);
  const setmultipleproduct = (val) => {
    setReciept([...reciept, ...val]);
  };
  const getsave = (e) => {
    if (editdata && Object.keys(editdata).length) {
      let temp = reciept.map((item) => {
        if (item.id === editdata.id) {
          return sentEditdata;
        }
        return item;
      });

      setReciept([...temp]);
      setRun(run + 1);
    }
  };
  function getDeleteChange(v) {
    setReciept(v);
    setRun(run + 1);
  }
  const renderContent = (e) => {
    return <EditProducts getedit={editdata} getdata={seteditval} />;
  };
  const seteditval = (e) => {
    setSentEditData(e);
  };
  function getinfo(e) {
    setEditdata(e.data);
  }
  /////////////////////////////dragable//////////////////////////////////////

  const [showDragIcons, setShowDragIcons] = React.useState();

  const onReorder = (e) => {
    const visibleRows = e.component.getVisibleRows();
    const newTasks = [...reciept];
    const toIndex = newTasks.findIndex(
      (item) => item.id === visibleRows[e.toIndex].data.id
    );
    const fromIndex = newTasks.findIndex((item) => item.id === e.itemData.id);
    newTasks.splice(fromIndex, 1);
    newTasks.splice(toIndex, 0, e.itemData);

    setReciept(newTasks);
  };

  const onShowDragIconsChanged = (args) => {
    setShowDragIcons(args.value);
  };
  /////////////////////////////select Box Array/////////////////////////////
  const currencyArray = [t("دلار"), t("یورو"), t("ریال")];
  const PriceBasedArray = [t("ردیف محصولات")];
  const typeOfSalesProcessArray = [t("پیش فرض")];
  const salesStageArray = [
    t("آشنایی اولیه"),
    t("ارزیابی و تحلیل نیاز"),
    t("ارائه پیشنهاد/پیش فاکتور"),
    t("مذاکره نهایی"),
    t("فروش موفق"),
    t("فروش ناموفق"),
  ];
  const leadsourceArray = [
    t("کنفرانس"),
    t("نمایشگاه"),
    t("معرفی پرسنل"),
    t("معرفی مشتریان"),
    t("معرفی دیگران"),
    t("وب"),
    t("بازاریابی حضوری"),
    t(" بازاریابی ایمیلی"),
    t(" بازاریابی تلفنی"),
    t("معرفی شرکای تجاری"),
    t("سایر"),
  ];
  const priorityArray = [
    t("خیلی زیاد"),
    t("زیاد"),
    t("متوسط"),
    t("کم"),
    t("خیلی کم"),
  ];
  const typeArray = [t("کسب و کار موجود"), t("کسب و کار جدید")];
  const reasonForTheLossArray = [
    t("انجام خرید از رقیب"),
    t("عدم علاقه مندی به محصول/خدمت"),
    t("قیمت بالای محصول/خدمت"),
    t("عدم پاسخگویی محصول/خدمت به نیازها"),
  ];
  const salesForecastArray = [t("اعمال"), t("عدم اعمال")];
  const invoiceSendingPeriodsArray = [
    t("هر ماه"),
    t("هر 2 ماه"),
    t("هر 3 ماه"),
    t("هر 4 ماه"),
    t("هر 6 ماه"),
    t("هر سال"),
  ];

  ///////////////////////open and close pannels////////////////////////////////
  const [panel1, setPanel1] = React.useState(true);
  const [panel2, setPanel2] = React.useState(true);
  const [panel3, setPanel3] = React.useState(true);
  const handlePanel1 = () => (event, newExpanded) => {
    setPanel1(newExpanded);
  };
  const handlePanel2 = () => (event, newExpanded) => {
    setPanel2(newExpanded);
  };
  const handlePanel3 = () => (event, newExpanded) => {
    setPanel3(newExpanded);
  };
  useEffect(() => {
    if (formik.isSubmitting) {
      let condition2 =
        !!(formik.touched.opportunityName && formik.errors.opportunityName) ||
        !!(formik.touched.accountName && formik.errors.accountName) ||
        !!(
          formik.touched.saleProcess && formik.errors.saleProcess
        ) ||
        !!(formik.touched.salesStage && formik.errors.salesStage) ||
        !!(formik.touched.price && formik.errors.price) ||
        !!(
          formik.touched.successProssibility &&
          formik.errors.successProssibility
        ) ||
        !!(formik.touched.saleDate && formik.errors.saleDate);
      setPanel2(condition2 || panel2);

      let condition3 = !!(
        formik.touched.payTermEndDate &&
        formik.errors.payTermEndDate
      );
      setPanel3(condition3 || panel3);
    }
  }, [formik]);
  const factorSub = () => {
    swal({
      title: t("فرصت با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };
  /////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <div id="form" style={{ display: "block", marginRight: "10px" }}>
        {/*<h1 className='main-title'>*/}
        {/*    {t("ایجاد فرصت")}*/}
        {/*</h1>*/}
        <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <Accordion expanded={panel2} onChange={handlePanel2()}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1b-content"
                id="panel1b-header"
              >
                <Typography>{t("اطلاعات فرصت")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="form-design">
                  <div className="row">
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>
                          {t("نام فرصت")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <input
                          className="form-input"
                          type="text"
                          id="opportunityName"
                          name="opportunityName"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.opportunityName}
                        />
                        {formik.touched.opportunityName &&
                        formik.errors.opportunityName ? (
                          <div className="error-msg">
                            {t(formik.errors.opportunityName)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("واحد پول")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <SelectBox
                            dataSource={currencyArray}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) =>
                              formik.setFieldValue("moneyUnit", e.value)
                            }
                            className="selectBox"
                            noDataText={t("اطلاعات یافت نشد")}
                            itemRender={null}
                            placeholder=""
                            selectionMode="multiple"
                            name="moneyUnit"
                            id="moneyUnit"
                            searchEnabled
                            showClearButton
                          />
                          {formik.touched.moneyUnit && formik.errors.moneyUnit ? (
                            <div className="error-msg">
                              {t(formik.errors.moneyUnit)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                          <div className="title">
                            <span>{t("نام حساب")}</span>
                          </div>
                          <div className="wrapper">
                              {id != null && formik.values.accountID != "" && (
                          <SelectBox
                            dataSource={accountData}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("accountID", e.value);
                            }}
                            defaultValue={formik.values.accountID}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            displayExpr={"name"}
                            valueExpr={"accountID"}
                            placeholder=""
                            name="accountID"
                            id="accountID"
                            searchEnabled
                            showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                          />
                        )}
                        {(!id || (id != null && formik.values.accountID == "")) && (
                          <SelectBox
                            dataSource={accountData}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("accountID", e.value.accountID);
                            }}
                            defaultValue={formik.values.accountID}
                            className="selectBox"
                            displayExpr={"name"}
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="accountID"
                            id="accountID"
                            searchEnabled
                            showClearButton
                          />
                        )}
                            </div>
                        </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("قیمت براساس")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <SelectBox
                            dataSource={PriceBasedArray}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) =>
                              formik.setFieldValue("PriceBased", e.value)
                            }
                            className="selectBox"
                            noDataText={t("اطلاعات یافت نشد")}
                            itemRender={null}
                            placeholder=""
                            name="PriceBased"
                            id="PriceBased"
                            searchEnabled
                            showClearButton
                          />
                          {formik.touched.PriceBased &&
                          formik.errors.PriceBased ? (
                            <div className="error-msg">
                              {t(formik.errors.PriceBased)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>
                          {t("نوع روند فروش")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <SelectBox
                          dataSource={typeOfSalesProcessArray}
                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                          onValueChanged={(e) =>
                            formik.setFieldValue("saleProcess", e.value)
                          }
                          className="selectBox"
                          noDataText={t("اطلاعات یافت نشد")}
                          itemRender={null}
                          placeholder=""
                          name="saleProcess"
                          id="saleProcess"
                          searchEnabled
                        />
                        {formik.touched.saleProcess &&
                        formik.errors.saleProcess ? (
                          <div className="error-msg">
                            {t(formik.errors.saleProcess)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>
                          {t("مرحله فروش")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <SelectBox
                            dataSource={salesStageArray}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) =>
                              formik.setFieldValue("salesStage", e.value)
                            }
                            className="selectBox"
                            noDataText={t("اطلاعات یافت نشد")}
                            itemRender={null}
                            placeholder=""
                            name="salesStage"
                            id="salesStage"
                            searchEnabled
                          />
                          {formik.touched.salesStage &&
                          formik.errors.salesStage ? (
                            <div className="error-msg">
                              {t(formik.errors.salesStage)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("سرنخ")} </span>
                    </div>
                    <div className="wrapper">
                      {id != null && formik.values.clueID != "" && (
                        <SelectBox
                          dataSource={clues}
                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                          onValueChanged={(e) => {
                            formik.setFieldValue(
                              "clueID",
                              e.value
                            );
                          }}
                          defaultValue={formik.values.clueID}
                          className="selectBox"
                          noDataText="اطلاعات یافت نشد"
                          placeholder=""
                          displayExpr="firstName"
                          valueExpr={"clueID"}
                          name="clueID"
                          id="clueID"
                          searchEnabled
                          showClearButton
                          //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                        />
                      )}
                      {(!id ||
                        (id != null && formik.values.clueID == "")) && (
                        <SelectBox
                          dataSource={clues}
                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                          onValueChanged={(e) => {
                            formik.setFieldValue(
                              "clueID",
                              e.value.clueID
                            );
                          }}
                          defaultValue={formik.values.clueID}
                          className="selectBox"
                          noDataText="اطلاعات یافت نشد"
                          displayExpr="firstName"
                          placeholder=""
                          name="clueID"
                          id="clueID"
                          searchEnabled
                          showClearButton
                          //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                        />
                      )}
                      {formik.touched.clueID &&
                      formik.errors.clueID &&
                      !formik.values.clueID ? (
                        <div className="error-msg">
                          {t(formik.errors.clueID)}
                        </div>
                      ) : null}
                    </div>
                  </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>
                          {t("مبلغ")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <div className="divModal">
                          <CurrencyInput
                            className="form-input"
                            style={{ width: "100%" }}
                            id="price"
                            name="price"
                            decimalsLimit={2}
                            onChange={(e) =>
                              HandleSalePriceChange(e.target.value)
                            }
                          />
                          {formik.touched.price && formik.errors.price ? (
                            <div className="error-msg">
                              {t(formik.errors.price)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef1?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>{t("احتمال موفقیت")} (%)</span>
                      </div>
                      <div className="wrapper">
                        <input
                          className="form-input"
                          type="text"
                          id="successProssibility"
                          name="successProssibility"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.successProssibility}
                        />
                        {formik.touched.successProssibility &&
                        formik.errors.successProssibility ? (
                          <div className="error-msg">
                            {t(formik.errors.successProssibility)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("مبلغ (موردانتظار)")}</span>
                      </div>
                      <div className="wrapper">
                        <CurrencyInput
                          className="form-input"
                          style={{ width: "100%" }}
                          id="expectedPrice"
                          name="expectedPrice"
                          decimalsLimit={2}
                          disabled
                          value={formik.values.expectedPrice}
                        />
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>
                          {t("تاریخ فروش")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <div className="date-picker position-relative">
                          <DatePicker
                            name={"saleDate"}
                            id={"saleDate"}
                            ref={dateRef1}
                            editable={false}
                            calendar={renderCalendarSwitch(i18n.language)}
                            locale={renderCalendarLocaleSwitch(i18n.language)}
                            onBlur={formik.handleBlur}
                            onChange={(val) => {
                              formik.setFieldValue(
                                "saleDate",
                                julianIntToDateTime(val.toJulianDay())
                              );
                            }}
                            value={getLangDate(i18n.language , formik.values.saleDate)}
                          />
                          <div
                            className={`modal-action-button  ${
                              i18n.dir() === "ltr" ? "action-ltr" : ""
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center">
                              <CalendarMonthIcon className="calanderButton modal" />
                            </div>
                          </div>
                        </div>

                        {formik.touched.saleDate &&
                        formik.errors.saleDate &&
                        !formik.values.saleDate ? (
                          <div className="error-msg">
                            {t(formik.errors.saleDate)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            {/* start */}
            {formik.values.PriceBased == t("ردیف محصولات") ? (
              <Accordion expanded={panel1} onChange={handlePanel1(false)}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1b-content"
                  id="panel1b-header"
                >
                  <Typography> {t("ردیف محصولات")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="form-design">
                    <div className="row">
                      <div
                        className="content content col-lg-12 col-md-12 col-xs-12"
                        style={{ textAlign: "center" }}
                      >
                        <ToggleButtonGroup
                          className="content button-group row justify-content-center mb-3"
                          value={alignment}
                          exclusive
                          onChange={handleChange}
                          aria-label="Platform"
                          style={{
                            marginTop: "15px",
                            backgroundColor: "transparent",
                          }}
                        >
                          <div className="col-lg-auto col-sm-4 col-xs-6">
                            <Button
                              variant="contained"
                              size="medium"
                              color="primary"
                              onClick={handleClickOpen}
                            >
                              {" "}
                              {t("انتخاب محصول")}
                            </Button>
                          </div>
                          <div className="col-lg-auto col-sm-4 col-xs-6">
                            <Button
                              variant="contained"
                              size="medium"
                              color="primary"
                              onClick={handleClickOpenMultipleProducts}
                            >
                              {t("انتخاب چند محصول")}
                            </Button>
                          </div>
                          <div className="col-lg-auto col-sm-4 col-xs-6">
                            <Button
                              variant="contained"
                              size="medium"
                              color="primary"
                              onClick={handleClickOpenuploadfile}
                            >
                              {t("وارد کردن اطلاعات")}
                            </Button>
                          </div>
                          <div className="col-lg-auto col-sm-4 col-xs-6">
                            <Button
                              variant="contained"
                              size="medium"
                              color="primary"
                              disabled={!reciept.length}
                              onClick={handleClickOpenapplychanges}
                            >
                              {t("اعمال تغییرات")}
                            </Button>
                          </div>
                          <div className="col-lg-auto col-sm-4 col-xs-6">
                            <Button
                              variant="contained"
                              size="medium"
                              color="primary"
                              onClick={handleClickOpenpackaging}
                            >
                              {t("انتخاب بسته بندی محصول")}
                            </Button>
                          </div>
                          <div className="col-lg-auto col-sm-4 col-xs-6">
                            <Button
                              variant="contained"
                              size="medium"
                              color="primary"
                              onClick={handleClick}
                            >
                              {buttonText}
                            </Button>
                          </div>
                        </ToggleButtonGroup>
                      </div>
                      <Dialog
                        open={open2}
                        fullWidth={fullWidth}
                        maxWidth={maxWidth}
                        dir={i18n.dir()}
                      >
                        <div
                          className={`modal-header ${
                            i18n.dir() == "ltr" ? "header-ltr" : ""
                          }`}
                        >
                          <h2>{t("انتخاب محصول")}</h2>
                          <button
                            type="button"
                            className="close-btn"
                            onClick={() => setOpen2(false)}
                          >
                            <CloseIcon />
                          </button>
                        </div>
                        <DialogContent>
                          <SelectProducts getdata={setFactorr} />
                        </DialogContent>
                      </Dialog>
                      <Dialog
                        open={openmulti}
                        fullWidth={fullWidth}
                        maxWidth={maxWidth}
                        dir={i18n.dir()}
                      >
                        <div
                          className={`modal-header ${
                            i18n.dir() == "ltr" ? "header-ltr" : ""
                          }`}
                        >
                          <h2>{t("انتخاب چند محصول")}</h2>
                          <button
                            type="button"
                            className="close-btn"
                            onClick={() => setOpenMultiple(false)}
                          >
                            <CloseIcon />
                          </button>
                        </div>
                        <DialogContent>
                          <SelectMultipleProducts
                            getdata={setmultipleproduct}
                            closDialog={() => setOpenMultiple(false)}
                          />
                        </DialogContent>
                      </Dialog>
                      <Dialog
                        open={openuploadfile}
                        fullWidth={fullWidth}
                        maxWidth={maxWidth}
                        dir={i18n.dir()}
                      >
                        <div
                          className={`modal-header ${
                            i18n.dir() == "ltr" ? "header-ltr" : ""
                          }`}
                        >
                          <h2>{t("اپلود فایل")}</h2>
                          <button
                            type="button"
                            className="close-btn"
                            onClick={() => setOpenuploadfile(false)}
                          >
                            <CloseIcon />
                          </button>
                        </div>
                        <DialogContent>
                          <UploadFileComponent />
                        </DialogContent>
                      </Dialog>
                      <Dialog
                        open={openapplychanges}
                        fullWidth={fullWidth}
                        maxWidth={maxWidth}
                        dir={i18n.dir()}
                      >
                        <div
                          className={`modal-header ${
                            i18n.dir() == "ltr" ? "header-ltr" : ""
                          }`}
                        >
                          <h2>{t("اعمال تغییرات")}</h2>
                          <button
                            type="button"
                            className="close-btn"
                            onClick={() => setOpenapplychanges(false)}
                          >
                            <CloseIcon />
                          </button>
                        </div>
                        <DialogContent>
                          <ApplyChanges
                            getchange={setchanges}
                            closDialog={() => setOpenapplychanges(false)}
                          />
                        </DialogContent>
                      </Dialog>
                      <Dialog
                        open={openpackaging}
                        fullWidth={fullWidth}
                        maxWidth={maxWidth}
                        dir={i18n.dir()}
                      >
                        <div
                          className={`modal-header ${
                            i18n.dir() == "ltr" ? "header-ltr" : ""
                          }`}
                        >
                          <h2>{t("انتخاب بسته محصول")}</h2>
                          <button
                            type="button"
                            className="close-btn"
                            onClick={() => setOpenpackaging(false)}
                          >
                            <CloseIcon />
                          </button>
                        </div>
                        <DialogContent>
                          <Packaging />
                        </DialogContent>
                      </Dialog>
                      <div className="form-design">
                        <div className="row">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <DataGrid
                              showBorders={true}
                              hoverStateEnabled={true}
                              keyExpr="id"
                              width={"100%"}
                              rtlEnabled
                              dataSource={reciept}
                              onRowRemoved={() => getDeleteChange(reciept)}
                              onSaved={getsave}
                              onEditingStart={getinfo}
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
                                  confirmDeleteMessage={t("آیا مطمئین هستید؟")}
                                  saveRowChanges={t("ذخیره")}
                                  cancelRowChanges={t("کنسل")}
                                />
                                <Popup
                                  title={t("ویرایش محصول")}
                                  showtitle={true}
                                  contentRender={renderContent}
                                />
                              </Editing>
                              <Selection mode="single" />
                              <Column
                                caption={t("محصول")}
                                dataField="productName"
                                width={150}
                                alignment={"center"}
                              />
                              <Column
                                caption={t("مقدار")}
                                dataField="MainUnit"
                                width={110}
                                alignment={"center"}
                              />
                              <Column
                                caption={t("قیمت واحد")}
                                dataField="UnitPrice"
                                width={110}
                                alignment={"center"}
                              />
                              <Column
                                caption={t("زیر مجموع")}
                                dataField="subset"
                                width={110}
                                alignment={"center"}
                              />
                              <Column
                                caption={t("مقدار پس از تخفیف")}
                                dataField="PriceAfterDiscount"
                                width={130}
                                alignment={"center"}
                              />
                              <Column
                                caption={t("جمع کل")}
                                dataField="totalprice"
                                width={110}
                                alignment={"center"}
                              />

                              {(buttonText === t("نمایش جزئیات بیشتر") ||
                                buttonText === t("نمایش جزئیات کمتر")) && (
                                <Column
                                  caption={t("تخفیف")}
                                  dataField="Discount"
                                  width={110}
                                  alignment={"center"}
                                />
                              )}
                              {(buttonText === t("نمایش جزئیات بیشتر") ||
                                buttonText === t("نمایش جزئیات کمتر")) && (
                                <Column
                                  caption={t("تخفیف")}
                                  dataField="Discount"
                                  width={110}
                                  alignment={"center"}
                                />
                              )}
                              {(buttonText === t("نمایش جزئیات بیشتر") ||
                                buttonText === t("نمایش جزئیات کمتر")) && (
                                <Column
                                  caption={t("مبلغ تخفیف")}
                                  dataField="discountAmount"
                                  width={110}
                                  alignment={"center"}
                                />
                              )}
                              {(buttonText === t("نمایش جزئیات بیشتر") ||
                                buttonText === t("نمایش جزئیات کمتر")) && (
                                <Column
                                  caption={t("مالیات")}
                                  dataField="taxamount"
                                  width={110}
                                  alignment={"center"}
                                />
                              )}
                              {(buttonText === t("نمایش جزئیات بیشتر") ||
                                buttonText === t("نمایش جزئیات کمتر")) && (
                                <Column
                                  caption={t("مبلغ مالیات")}
                                  dataField="HireDate"
                                  width={110}
                                  alignment={"center"}
                                />
                              )}
                              {(buttonText === t("نمایش جزئیات بیشتر") ||
                                buttonText === t("نمایش جزئیات کمتر")) && (
                                <Column
                                  caption={t("شماره سریال")}
                                  dataField="serialNumber"
                                  width={100}
                                  alignment={"center"}
                                />
                              )}
                              {(buttonText === t("نمایش جزئیات بیشتر") ||
                                buttonText === t("نمایش جزئیات کمتر")) && (
                                <Column
                                  caption={t("کد محصول")}
                                  dataField="productCode"
                                  width={110}
                                  alignment={"center"}
                                />
                              )}
                              {(buttonText === t("نمایش جزئیات بیشتر") ||
                                buttonText === t("نمایش جزئیات کمتر")) && (
                                <Column
                                  caption={t("بسته محصول")}
                                  dataField="HireDate"
                                  width={110}
                                  alignment={"center"}
                                />
                              )}
                              {(buttonText === t("نمایش جزئیات بیشتر") ||
                                buttonText === t("نمایش جزئیات کمتر")) && (
                                <Column
                                  caption={t("توضیحات")}
                                  dataField="description"
                                  width={150}
                                  alignment={"center"}
                                />
                              )}
                              {(buttonText === t("نمایش جزئیات بیشتر") ||
                                buttonText === t("نمایش جزئیات کمتر")) && (
                                <Column
                                  caption={t("یادداشت")}
                                  dataField="Note"
                                  width={150}
                                  alignment={"center"}
                                />
                              )}
                              {buttonText === t("نمایش جزئیات کمتر") && (
                                <Column
                                  caption={t("واحد اصلی")}
                                  dataField="HireDate"
                                  width={110}
                                  alignment={"center"}
                                />
                              )}
                              {buttonText === t("نمایش جزئیات کمتر") && (
                                <Column
                                  caption={t("واحد ثانویه")}
                                  dataField="HireDate"
                                  width={110}
                                  alignment={"center"}
                                />
                              )}
                              {buttonText === t("نمایش جزئیات کمتر") && (
                                <Column
                                  caption={t("مقدار واحد ثانویه")}
                                  dataField="HireDate"
                                  width={110}
                                  alignment={"center"}
                                />
                              )}
                            </DataGrid>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
            ) : (
              ""
            )}
            {/* end */}
            <Accordion expanded={panel3} onChange={handlePanel3()}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1b-content"
                id="panel1b-header"
              >
                <Typography> {t("اطلاعات بیشتر")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="form-design">
                  <div className="row">
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("منبع سرنخ")}</span>
                      </div>
                      <div className="wrapper">
                        <SelectBox
                          dataSource={leadsourceArray}
                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                          onValueChanged={(e) =>
                            formik.setFieldValue("clueSource", e.value)
                          }
                          className="selectBox"
                          noDataText={t("اطلاعات یافت نشد")}
                          itemRender={null}
                          placeholder=""
                          name="clueSource"
                          id="clueSource"
                          searchEnabled
                          showClearButton
                        />
                        {formik.touched.clueSource &&
                        formik.errors.clueSource ? (
                          <div className="error-msg">
                            {t(formik.errors.clueSource)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("اولویت")}</span>
                      </div>
                      <div className="wrapper">
                        <SelectBox
                          dataSource={priorityArray}
                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                          onValueChanged={(e) =>
                            formik.setFieldValue("priority", e.value)
                          }
                          className="selectBox"
                          noDataText={t("اطلاعات یافت نشد")}
                          itemRender={null}
                          placeholder=""
                          name="priority"
                          id="priority"
                          searchEnabled
                          showClearButton
                        />
                        {formik.touched.priority && formik.errors.priority ? (
                          <div className="error-msg">
                            {t(formik.errors.priority)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("پروژه")}</span>
                      </div>
                      <div className="wrapper">
                        <div className="divModal">
                          <input
                            disabled
                            className={`form-input modal-input ${
                              i18n.dir() === "ltr" ? "ltr" : ""
                            }`}
                            type="text"
                            id="project"
                            name="project"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.project}
                          />
                          {formik.touched.project && formik.errors.project ? (
                            <div className="error-msg">
                              {t(formik.errors.project)}
                            </div>
                          ) : null}
                          <div
                            className={`modal-action-button  ${
                              i18n.dir() == "ltr" ? "action-ltr" : ""
                            }`}
                          >
                            <ProjectModal getData={getProjectData} />
                            <Button>
                              {" "}
                              <CancelIcon onClick={clearProjectField} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("قدم بعد")}</span>
                      </div>
                      <div className="wrapper">
                        <div className="divModal">
                          <input
                            className="form-input"
                            type="text"
                            id="nextStep"
                            name="nextStep"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.nextStep}
                          />
                          {formik.touched.nextStep && formik.errors.nextStep ? (
                            <div className="error-msg">
                              {t(formik.errors.nextStep)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("نوع")}</span>
                      </div>
                      <div className="wrapper">
                        <SelectBox
                          dataSource={typeArray}
                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                          onValueChanged={(e) =>
                            formik.setFieldValue("type", e.value)
                          }
                          className="selectBox"
                          noDataText={t("اطلاعات یافت نشد")}
                          itemRender={null}
                          placeholder=""
                          name="type"
                          id="type"
                          searchEnabled
                          showClearButton
                        />

                        {formik.touched.type && formik.errors.type ? (
                          <div className="error-msg">
                            {t(formik.errors.type)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("دلیل از دست رفتن")}</span>
                      </div>
                      <div className="wrapper">
                        <SelectBox
                          dataSource={reasonForTheLossArray}
                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                          onValueChanged={(e) =>
                            formik.setFieldValue("reasonofLoss", e.value)
                          }
                          className="selectBox"
                          noDataText={t("اطلاعات یافت نشد")}
                          itemRender={null}
                          placeholder=""
                          name="reasonofLoss"
                          id="reasonofLoss"
                          searchEnabled
                          showClearButton
                        />
                        {formik.touched.reasonofLoss &&
                        formik.errors.reasonofLoss ? (
                          <div className="error-msg">
                            {t(formik.errors.reasonofLoss)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("پیش بینی فروش")}</span>
                      </div>
                      <div className="wrapper">
                        <SelectBox
                          dataSource={salesForecastArray}
                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                          onValueChanged={(e) =>
                            formik.setFieldValue("saleForecast", e.value)
                          }
                          className="selectBox"
                          noDataText={t("اطلاعات یافت نشد")}
                          itemRender={null}
                          placeholder=""
                          name="saleForecast"
                          id="saleForecast"
                          searchEnabled
                          showClearButton
                        />
                        {formik.touched.saleForecast &&
                        formik.errors.saleForecast ? (
                          <div className="error-msg">
                            {t(formik.errors.saleForecast)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef2?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>{t("دوره های ارسال فاکتور")}</span>
                      </div>
                      <div className="wrapper">
                        <SelectBox
                          dataSource={invoiceSendingPeriodsArray}
                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                          onValueChanged={(e) =>
                            formik.setFieldValue(
                              "sendingInvoiceTerms",
                              e.value
                            )
                          }
                          className="selectBox"
                          noDataText={t("اطلاعات یافت نشد")}
                          itemRender={null}
                          placeholder=""
                          name="sendingInvoiceTerms"
                          id="sendingInvoiceTerms"
                          searchEnabled
                          showClearButton
                        />
                        {formik.touched.sendingInvoiceTerms &&
                        formik.errors.sendingInvoiceTerms ? (
                          <div className="error-msg">
                            {t(formik.errors.sendingInvoiceTerms)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>
                          {t("تاریخ پایان دوره پرداخت")}{" "}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <div className="divModal date-picker position-relative">
                          <DatePicker
                            name={"payTermEndDate"}
                            id={"payTermEndDate"}
                            editable={false}
                            ref={dateRef2}
                            calendar={renderCalendarSwitch(i18n.language)}
                            locale={renderCalendarLocaleSwitch(i18n.language)}
                            disabled={!formik.values.saleDate}
                            minDate={new Date(formik.values.saleDate)}
                            onBlur={formik.handleBlur}
                            onChange={(val) => {
                              formik.setFieldValue(
                                "payTermEndDate",
                                julianIntToDateTime(val.toJulianDay())
                              );
                            }}
                            value={getLangDate(i18n.language , formik.values.payTermEndDate)}
                          />
                          <div
                            className={`modal-action-button  ${
                              i18n.dir() === "ltr" ? "action-ltr" : ""
                            }`}
                          >
                            <div className="d-flex align-items-center justify-content-center">
                              <CalendarMonthIcon className="calanderButton modal" />
                            </div>
                          </div>
                        </div>
                        {formik.touched.payTermEndDate &&
                        formik.errors.payTermEndDate ? (
                          <div className="error-msg">
                            {t(formik.errors.payTermEndDate)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-12 col-xs-12">
                      <FieldArray
                        name="campaignsID"
                        render={({ push, remove }) => (
                          <React.Fragment>
                            <div className="row align-items-center mb-0">
                              <div className="content col-lg-6 col-md-12 col-xs-12">
                                <Button
                                  className="AddRow"
                                  disabled={
                                    formik.values.campaignsID?.length >= 5
                                  }
                                  // onClick={() => formik.values.productFields.length < 5 && push(emptyProductFields)}
                                  onClick={() => {
                                    formik.values.campaignsID?.length < 5 &&
                                      push(emptyCamapignsID);
                                    setCamapignsIDTouch((oldArray) => [
                                      ...oldArray,
                                      emptyCamapignsIDTouch,
                                    ]);
                                  }}
                                >
                                  {t("افزودن کمپین")}
                                </Button>
                              </div>
                            </div>
                            {formik?.values?.campaignsID?.map(
                              (campaignsID, index) => (
                                <div
                                  className="row mb-0"
                                  key={index}
                                  style={{ display: "flex" }}
                                >
                                  <div className="content col-lg-11 col-md-6 col-xs-12">
                                    <div className="title">
                                      <span>
                                        {t("نام کمپین")}
                                        <span className="star">*</span>
                                      </span>
                                    </div>
                                    <div className="wrapper">
                                      <div className="divModal">
                                        {id != null && formik.values.campaignsID[index].CampaignID != "" && (
                                          <SelectBox
                                            dataSource={campaignDetail}
                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                            onBlur={() => {
                                              let temp = emptyCamapignsIDTouch.map(
                                                (item, i) =>
                                                  i === index
                                                    ? {
                                                        ...item,
                                                        CampaignID: true,
                                                      }
                                                    : item
                                              );
                                              setCamapignsIDTouch(temp);
                                            }}
                                            onValueChanged={(e) => {
                                              formik.setFieldValue(
                                                `campaignsID[${index}].CampaignID`,
                                                e.value
                                              );
                                            }}
                                            defaultValue={
                                                formik.values.campaignsID[index]
                                                  .CampaignID}
                                            className="selectBox"
                                            noDataText="اطلاعات یافت نشد"
                                            placeholder=""
                                            displayExpr="campaignName"
                                            valueExpr={"campaignID"}
                                            id="campaignID"
                                            name={`campaignsID[${index}].CampaignID`}
                                            searchEnabled
                                            showClearButton
                                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                                          />
                                        )}
                                    
                                        {(!id ||
                                          (id != null && formik.values.campaignsID[index].CampaignID == "")) && (
                                          <SelectBox
                                            dataSource={campaignDetail}
                                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                            onValueChanged={(e) => {
                                              formik.setFieldValue(
                                                `campaignsID[${index}].CampaignID`,
                                                e.value.campaignID
                                              );
                                            }}
                                            defaultValue={formik.values.campaignsID[index]
                                                .campaignID}
                                            className="selectBox"
                                            noDataText="اطلاعات یافت نشد"
                                            displayExpr="campaignName"
                                            placeholder=""
                                            id="campaignID"
                                            name={`campaignsID[${index}].CampaignID`}
                                            searchEnabled
                                            showClearButton
                                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                                          />
                                        )}
                                        {Array.isArray(
                                          formik.errors.campaignsID
                                        ) && Array.isArray(CamapignsIDTouch)
                                          ? formik.errors.campaignsID[index]
                                              ?.CampaignID &&
                                            emptyCamapignsIDTouch[index]
                                              ?.CampaignID && (
                                              <div className="error-msg">
                                                {t(
                                                  formik.errors.campaignsID[
                                                    index
                                                  ]?.CampaignID
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
                                          let temp = CamapignsIDTouch.filter(
                                            (_, i) => i !== index
                                          );
                                          setCamapignsIDTouch(temp);
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
              </AccordionDetails>
            </Accordion>
            <Accordion
              defaultExpanded={true}
              onFocus={() => dateRef2?.current?.closeCalendar()}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1b-content"
                id="panel1b-header"
              >
                <Typography> {t("توضیحات")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="form-design">
                  <div className="row">
                    <div className="content col-lg-6 col-md-12 col-xs-12">
                      <div className="title">
                        <span>{t("توضیحات")}</span>
                      </div>
                      <div className="wrapper">
                        <textarea
                          className="form-input"
                          type="text"
                          id="desc"
                          name="desc"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.desc}
                        />
                        {formik.touched.desc &&
                        formik.errors.desc ? (
                          <div className="error-msg">
                            {t(formik.errors.desc)}
                          </div>
                        ) : null}
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
                onClick={id != null ? updateOpportunities : formik.handleSubmit}
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

export default NewOpportunities;
