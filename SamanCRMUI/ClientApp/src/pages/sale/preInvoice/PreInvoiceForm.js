import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import { julianIntToDateTime } from "../../../utils/dateConvert";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionSummary from '@mui/material/AccordionSummary';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Map from "../../../components/map/index"
import CircularProgress from '@mui/material/CircularProgress';
import { Accordion, Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SelectProducts } from "../../../components/Modals/ModalGroup/SelectProducts";
import { SelectMultipleProducts } from "../../../components/Modals/ModalGroup/SelectMultipleProducts";
import { UploadFileComponent } from "../../../components/Modals/ModalGroup/UploadFileComponent";
import { ApplyChanges } from "../../../components/Modals/ModalGroup/ApplyChanges";
import { Packaging } from "../../../components/Modals/ModalGroup/Packaging";
import CurrencyInput from 'react-currency-input-field';
import PersonModal from "../../../components/Modals/Invoice_PersonModal/PersonModal";
import NothingModal from "../../../components/Modals/Invoice_NothingModal/NothingModal";
import CountryTreeView from "../../../components/CountryComponent/CountryTreeView";
import { useRef, useEffect } from "react";
import { SelectBox } from 'devextreme-react/select-box';
import AccordionDetails from '@mui/material/AccordionDetails';
import { renderCalendarSwitch, renderCalendarLocaleSwitch } from '../../../utils/calenderLang'
import { EditProducts } from "../../../components/Modals/ModalGroup/EditProducts";
import DataGrid, { Column, Selection, Editing, Popup, Form, Texts, RowDragging } from 'devextreme-react/data-grid';
import CloseIcon from '@mui/icons-material/Close';
import { parsFloatFunction } from "../../../utils/parsFloatFunction";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { history } from "../../../utils/history";
import DateObject from "react-date-object";
import { getLangDate } from "../../../utils/getLangDate";

const Factor = [];
let idList=[2,3,4,5,21]
export const PreInvoiceForm = () => {

  const { t, i18n } = useTranslation();
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const appConfig = window.globalConfig;
  const [result, setResult] = useState();
  const [alignment, setAlignment] = React.useState("");
  const [location, setLocation] = useState({})
  const [datasource, setDatasource] = useState([]);
  const [personsData, setPersonsData] = useState([]);
  const [opportunitiesData, setOpportunitiesData] = useState([]);
  const [relatedToRes, setRelatedToRes] = useState([]);
  const [selectedRelatedTo, setSelectedRelatedTo] = useState();
  const [relatedToData, setRelatedToData] = useState([]);
  const [address, setAddress] = useState()
  const [addressLoading, setAddressLoading] = useState(false)
  const dateRef = useRef()
  const [location1, setLocation1] = useState({})

  const [preInvoiceDetail, setPreInvoiceDetail] = useState([]);
  const [otherAddress, setOtherAddress] = useState()
  const [addressLoading1, setAddressLoading1] = useState(false)

  const dateRef1 = useRef()
  const dateRef2 = useRef()

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  // const theme = useTheme();
  const [factor, setFactor] = React.useState(Factor);

  const callComponent = () => {
    history.navigate(`/sale/PreInvoice/PreInvoiceManagement`);
  };

  useEffect(() => {
    axios
      .get(`https://localhost:44329/api/Entities`)
      .then((res) => setRelatedToData(res.data.data))
      .catch((error) => error);
  }, []);

  const currencies = ["Rial : ریال", "Dollar : $", "Euro : €"];
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      title: "",
      preInvoiceNum: "",
      accountID: "",
      preInvoiceLevel: "",
      preInvoiceDate: new DateObject(),
      relatedTo: "",
      relatedToInput: "",
      validityDate: new DateObject(),
      invoiceState: "",
      project: "",
      user: "",
      moneyUnit: id != null ? "" : currencies[0],
      total: 0,
      discount: 0,
      subTotal: 0,
      otherAdditions: "",
      productsID: [],
      shipment: 0,
      shipmentTax: 0,
      shipmentTaxPercentage: "",
      tax: 0,
      insuranceAmount: 0,
      insuranceAmountPercentage: "",
      goodJobDeposit: 0,
      goodJobDepositPercentage: "",
      totalCount: 0,
      totalNum: "",
      personsID: "",
      note: "",
      desc: "",
      customerSMS: "",
      productSendMethod: "",
      paymentConditions: "",
      productSendType: "",
      internalVerify: "",
      internalVerifyProblems: "",
      preInvoiceSenderCompany: "",
      preInvoicePrintFrame: "",
      geographyLoc: "",
      otherGeographyLoc: "",
      country: "",
      otherCountry: "",
      state: "",
      otherState: "",
      city: "",
      otherCity: "",
      postalCode: "",
      otherPostalCode: "",
      address: "",
      otherAddress: "",
      lat: "",
      otherLat: "",
      long: "",
      otherLong: "",
      validityLimit: "",
      totalReceivable: 0,
      opportunitiesID: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("عنوان الزامیست"),
      preInvoiceLevel: Yup.string().required("وارد کردن مرحله پیش فاکتور الزامی است").nullable(true),
      accountID: Yup.string().required("وارد کردن حساب الزامی است"),
      personsID: Yup.string().required("وارد کردن فرد الزامی است"),
      postalCode: Yup.string()
        .length(10, "کد پستی باید 10 رقم باشد")
        .matches(/^\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/, "کد پستی صحیح نمیباشد"),
      otherPostalCode: Yup.string()
        .length(10, "کد پستی باید 10 رقم باشد")
        .matches(/^\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/, "کد پستی صحیح نمیباشد"),
      preInvoiceDate: Yup.string().required("وارد کردن تاریخ پیش فاکتور الزامی است"),
      validityDate: Yup.string().required("وارد کردن تاریخ اعتبار الزامی است"),

      moneyUnit: Yup.string().required("واحد پول الزامیست"),

      relatedTo: Yup.string().required("وارد کردن مرتبط با الزامی است").nullable(true),
      relatedToInput: Yup.string().required("وارد کردن این قسمت الزامیست"),

    }),
    onSubmit: (values) => {
      values.productsID = values.productsID.map((item) => JSON.stringify(item))
      console.log("values", values);
      axios
        .post(`${appConfig.BaseURL}/api/preInvoice`, values)
        .then((res) => setResult(res.data.data));
      factorSub();
      callComponent();
    },
  });

  function renderRelatedToArray(params) {
    switch (selectedRelatedTo) {
      case t("فرصت"):
        axios
          .get(`${appConfig.BaseURL}/api/Opportunities`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.opportunityName,
                id: item?.opportunityID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("وظایف"):
        axios
          .get(`${appConfig.BaseURL}/api/activities/Duty`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.subject,
                id: item?.detailID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("تماس ها"):
        axios
      .get(`${appConfig.BaseURL}/api/activities/Contact`)
      .then((res) => {
        setRelatedToRes(
          res.data.data.map((item) => ({
            title: item?.subject,
            id: item?.detailID,
          }))
        );
      })
      .catch((error) => error);
    return null;
    break;
      case t("جلسه"):
        axios
          .get(`${appConfig.BaseURL}/api/activities/Session`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.subject,
                id: item?.detailID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      case t("بازدید"):
        return setRelatedToRes([]);
        break;
      case t("یادداشت ها"):
        axios
          .get(`${appConfig.BaseURL}/api/activities/Note`)
          .then((res) => {
            setRelatedToRes(
              res.data.data.map((item) => ({
                title: item?.subject,
                id: item?.detailID,
              }))
            );
          })
          .catch((error) => error);
        return null;
        break;
      default:
        return null;
        break;
    }
  }
  useEffect(() => {
    axios
      .get(`${appConfig.BaseURL}/api/Opportunities`)
      .then((res) => setOpportunitiesData(res.data.data));
  }, []);
  const factorSub = () => {
    swal({
      title: t("اطلاعات پیش فاکتور با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };

  useEffect(() => {
    renderRelatedToArray(selectedRelatedTo);
  }, [selectedRelatedTo]);
  
  const updatePreInvoice = (values) => {
    console.log("allValues", formik.values);
    formik.values.productsID = formik.values.productsID.map((item) => JSON.stringify(item))
    if (values != null) {
      let isSuccess = false;
      axios
        .put(`${appConfig.BaseURL}/api/preInvoice/Update/${id}`, formik.values)
        .then((res) => {
          setResult(res.data);
          isSuccess = true;
        })
        .finally(() => {
          if ((isSuccess = true)) {
            history.navigate(`/sale/PreInvoice/PreInvoiceManagement`);
          }
        });
    }
  };

  useEffect(() => {
    if (id != null) {
      axios.get(`${appConfig.BaseURL}/api/preInvoice/${id}`).then((res) => {
        setPreInvoiceDetail(res.data.data);
        formik.setFieldValue("title", res.data.data.title);
        formik.setFieldValue("preInvoiceNum", res.data.data.preInvoiceNum);
        formik.setFieldValue("accountID", res.data.data.accountID);
        formik.setFieldValue("preInvoiceLevel", res.data.data.preInvoiceLevel);
        formik.setFieldValue("personsID", res.data.data.personsID);
        formik.setFieldValue("preInvoiceDate", res.data.data.preInvoiceDate);
        formik.setFieldValue("relatedTo", res.data.data.relatedTo);
        formik.setFieldValue("relatedToInput", res.data.data.relatedToInput);
        formik.setFieldValue("validityDate", res.data.data.validityDate);
        formik.setFieldValue("invoiceState", res.data.data.invoiceState);
        formik.setFieldValue("project", res.data.data.project);
        formik.setFieldValue("user", res.data.data.user);
        formik.setFieldValue("moneyUnit", res.data.data.moneyUnit);
        formik.setFieldValue("total", res.data.data.total);
        formik.setFieldValue("discount", res.data.data.discount);
        formik.setFieldValue("subTotal", res.data.data.subTotal);
        formik.setFieldValue("otherAdditions", res.data.data.otherAdditions);
        formik.setFieldValue("productsID", [JSON.parse(res.data.data.productsID).Products.ProductID]);
        setReciept([JSON.parse(res.data.data.productsID).Products].map((item) => {
          return {
            id: item.ProductID,
            productName: item.ProductName,
            MainUnit: 1,
            UnitPrice: item.SalePrice,
            subset: item.SalePrice,
            PriceAfterDiscount: item.SalePrice,
            totalprice: item.SalePrice,
          }
        }))
        formik.setFieldValue("shipment", res.data.data.shipment);
        formik.setFieldValue("opportunitiesID", res.data.data.opportunitiesID);
        formik.setFieldValue("shipmentTax", res.data.data.shipmentTax);
        formik.setFieldValue("shipmentTaxPercentage", res.data.data.shipmentTaxPercentage);
        formik.setFieldValue("tax", res.data.data.tax);
        formik.setFieldValue("insuranceAmount", res.data.data.insuranceAmount);
        formik.setFieldValue("insuranceAmountPercentage", res.data.data.insuranceAmountPercentage);
        formik.setFieldValue("goodJobDeposit", res.data.data.goodJobDeposit);
        formik.setFieldValue("goodJobDepositPercentage", res.data.data.goodJobDepositPercentage);
        formik.setFieldValue("totalCount", res.data.data.totalCount);
        formik.setFieldValue("totalNum", res.data.data.totalNum);
        formik.setFieldValue("note", res.data.data.note);
        formik.setFieldValue("desc", res.data.data.desc);
        formik.setFieldValue("customerSMS", res.data.data.customerSMS);
        formik.setFieldValue("productSendMethod", res.data.data.productSendMethod);
        formik.setFieldValue("paymentConditions", res.data.data.paymentConditions);
        formik.setFieldValue("productSendType", res.data.data.productSendType);
        formik.setFieldValue("internalVerify", res.data.data.internalVerify);
        formik.setFieldValue("internalVerifyProblems", res.data.data.internalVerifyProblems);
        formik.setFieldValue("preInvoiceSenderCompany", res.data.data.preInvoiceSenderCompany);
        formik.setFieldValue("preInvoicePrintFrame", res.data.data.preInvoicePrintFrame);
        formik.setFieldValue("geographyLoc", res.data.data.geographyLoc);
        formik.setFieldValue("otherGeographyLoc", res.data.data.otherGeographyLoc);
        formik.setFieldValue("country", res.data.data.country);
        formik.setFieldValue("otherCountry", res.data.data.otherCountry);
        formik.setFieldValue("state", res.data.data.state);
        formik.setFieldValue("otherState", res.data.data.otherState);
        formik.setFieldValue("city", res.data.data.city);
        formik.setFieldValue("otherCity", res.data.data.otherCity);
        formik.setFieldValue("postalCode", res.data.data.postalCode);
        formik.setFieldValue("otherPostalCode", res.data.data.otherPostalCode);
        formik.setFieldValue("address", res.data.data.address);
        formik.setFieldValue("otherAddress", res.data.data.otherAddress);
        formik.setFieldValue("lat", res.data.data.lat);
        formik.setFieldValue("otherLat", res.data.data.otherLat);
        formik.setFieldValue("long", res.data.data.long);
        formik.setFieldValue("otherLong", res.data.data.otherLong);
        formik.setFieldValue("validityLimit", res.data.data.validityLimit);
        formik.setFieldValue("totalReceivable", res.data.data.totalReceivable);
      });
    }
  }, [id]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const percentselectList = [t("0%"), t("9%"), t("20%")];
  const [run, setRun] = useState(0);

  const [reciept, setReciept] = useState([]);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen2(true);

  };
  const handleClose = () => {

  };
  const [openmulti, setOpenMultiple] = useState(false);
  const handleClickOpenMultipleProducts = () => {
    setOpenMultiple(true);

  };
  const [open2, setOpen2] = useState(false);

  React.useEffect(() => {

    if (reciept) {
      const result = reciept?.reduce((total, currentValue) => total = total + parseInt(currentValue.price), 0);
      formik.setFieldValue("total", result)
    }

  }, [reciept])


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
  function getMapData(address, location) {
    setLocation(location)
    setAddress(address)
  }
  function getMapData1(address, location) {
    setLocation1(location)
    setOtherAddress(address)
  }

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
    otherAddress && formik.setFieldValue('otherAddress', otherAddress)
  }, [otherAddress])

  function setFieldNothingData(val) {
    formik.setFieldValue('relatedToInput', val.nothings)
  }

  function clearNothingField() {
    formik.setFieldValue('relatedToInput', "")
  }

  useEffect(() => {
    if (formik.isSubmitting) {
      let condition1 = !!((formik.touched.title && formik.errors.title) ||
        (formik.touched.preInvoiceLevel && formik.errors.preInvoiceLevel) ||
        (formik.touched.accountID && formik.errors.accountID) ||
        (formik.touched.personsID && formik.errors.personsID) ||
        (formik.touched.preInvoiceDate && formik.errors.preInvoiceDate) ||
        (formik.touched.validityDate && formik.errors.validityDate) ||
        (formik.touched.relatedToInput && formik.errors.relatedToInput) ||
        (formik.touched.relatedTo && formik.errors.relatedTo)
      )
      let condition2 = !!((formik.touched.moneyUnit && formik.errors.moneyUnit))

      let condition5 = !!((formik.touched.otherPostalCode && formik.errors.otherPostalCode) ||
        (formik.touched.postalCode && formik.errors.postalCode))

      setPanel1(condition1 || panel1)
      setPanel2(condition2 || panel2)
      setPanel5(condition5 || panel5)
    }
  }, [formik])

  function setProjectFieldData(val) {

    formik.setFieldValue('project', val.projects)

  }

  function clearProjectField() {
    formik.setFieldValue('project', "")
  }
  const [maxWidth, setMaxWidth] = React.useState('lg');
  const [fullWidth, setFullWidth] = React.useState(true);

  function getInvoiceAddress(val) {
    formik.setFieldValue('country', val[0])
    formik.setFieldValue('state', val[1])
    formik.setFieldValue('city', val[2])
    formik.setFieldValue('geographyLoc', `${val[0]}، ${val[1]}، ${val[2]}`)
  }
  function clearInvoiceAddress() {
    formik.setFieldValue('country', "")
    formik.setFieldValue('state', "")
    formik.setFieldValue('city', "")
    formik.setFieldValue('geographyLoc', "")
  }

  function getInvoiceAddresstwo(val) {
    formik.setFieldValue('otherCountry', val[0])
    formik.setFieldValue('otherState', val[1])
    formik.setFieldValue('otherCity', val[2])
    formik.setFieldValue('otherGeographyLoc', `${val[0]}، ${val[1]}، ${val[2]}`)
  }
  function clearInvoiceAddresstwo() {
    formik.setFieldValue('otherCountry', "")
    formik.setFieldValue('otherState', "")
    formik.setFieldValue('otherCity', "")
    formik.setFieldValue('otherGeographyLoc', "")
  }

  const clickArr = [t("نمایش جزئیات"), t("نمایش جزئیات بیشتر"), t("نمایش جزئیات کمتر")];

  const [count, setCount] = React.useState(0);
  const buttonText = clickArr[count % clickArr.length];
  const handleClick = () => setCount((c) => c + 1);

  const copy = () => {
    formik.setFieldValue('otherCountry', formik.values.country)
    formik.setFieldValue('otherState', formik.values.state)
    formik.setFieldValue('otherCity', formik.values.city)
    formik.setFieldValue('otherPostalCode', formik.values.postalCode)
    formik.setFieldValue('otherAddress', formik.values.address)
    formik.setFieldValue('otherLat', formik.values.lat)
    formik.setFieldValue('otherLong', formik.values.long)
    formik.setFieldValue('otherGeographyLoc', formik.values.geographyLoc)
  }

  const [panel1, setPanel1] = useState(true);
  const [panel2, setPanel2] = useState(true);
  const [panel5, setPanel5] = useState(true)

  const handlePanel1 = () => (event, newExpanded) => {
    setPanel1(newExpanded);
  };

  const handlePanel2 = () => (event, newExpanded) => {
    setPanel2(newExpanded);
  };

  const handlePanel5 = () => (event, newExpanded) => {
    setPanel5(newExpanded);
  };

  const setFactorr = (val) => {
    setReciept([...reciept, val])
  }

  const [difference, setDifference] = useState();

  const setchanges = (val) => {
    setDifference(val)
  }

  useEffect(() => {
    if (difference) {
      var taxchange = parseFloat(difference.taxamount) || 1;
      var newprice = parseFloat(difference.NewPrice) || 1;
      var discountpercent = parseFloat(difference.discountpercentage) || 0;

      if (difference.select === 'Add') {
        let temp = reciept.map((obj) => ({
          ...obj,
          PriceAfterDiscount: (obj.subTotal) * (1 - (discountpercent / 100)),
          total: (((obj.subTotal) * (1 - (discountpercent / 100))) * taxchange) * (1 + (newprice / 100)),
          discountAmount: ((obj.subTotal) * (discountpercent / 100)),
          taxamount: (((obj.subTotal * ((100 - discountpercent) / 100))) * taxchange)
        }));
        setReciept(temp)
      }

      if (difference.select === 'replace') {
        let temp1 = reciept.map((obj) => ({
          ...obj,
          PriceAfterDiscount: (obj.subTotal) * (1 - (obj.Discount + discountpercent / 100)),
          total: ((obj.subTotal * (1 - (obj.Discount + discountpercent / 100))) * taxchange) * (1 + (newprice / 100)),
          discountAmount: ((obj.subTotal) * (discountpercent / 100)),
          taxamount: (((obj.subTotal * ((100 - discountpercent) / 100))) * taxchange)
        }
        ));
        setReciept(temp1)
      }
    }
  }, [difference])

  const setmultipleproduct = (val) => {
    setReciept([...reciept, ...val])
  }

  const status = [t("جعبه"), t("دستگاه"), t("ساعت"), t("شاخه"), t("عدد"), t("کارتن"), t("کیلوگرم"), t("لیتر"), t("متر"), t("متر مربع"), t("ورقه"), t("ماه")];
  const receiptprintframe = [t("جعبه"), t("دستگاه"), t("ساعت"), t("شاخه"), t("عدد"), t("کارتن"), t("کیلوگرم"), t("لیتر"), t("متر"), t("متر مربع"), t("ورقه"), t("ماه")];
  const receiptsubmitterfirm = [t("جعبه"), t("دستگاه"), t("ساعت"), t("شاخه"), t("عدد"), t("کارتن"), t("کیلوگرم"), t("لیتر"), t("متر"), t("متر مربع"), t("ورقه"), t("ماه")];
  const packagetransmissiontype = [t("جعبه"), t("دستگاه"), t("ساعت"), t("شاخه"), t("عدد"), t("کارتن"), t("کیلوگرم"), t("لیتر"), t("متر"), t("متر مربع"), t("ورقه"), t("ماه")];
  const termsofpayment = [t("جعبه"), t("دستگاه"), t("ساعت"), t("شاخه"), t("عدد"), t("کارتن"), t("کیلوگرم"), t("لیتر"), t("متر"), t("متر مربع"), t("ورقه"), t("ماه")];
  const packagetransmissionmethod = [t("جعبه"), t("دستگاه"), t("ساعت"), t("شاخه"), t("عدد"), t("کارتن"), t("کیلوگرم"), t("لیتر"), t("متر"), t("متر مربع"), t("ورقه"), t("ماه")];
  const customerremindermessege = [t("جعبه"), t("دستگاه"), t("ساعت"), t("شاخه"), t("عدد"), t("کارتن"), t("کیلوگرم"), t("لیتر"), t("متر"), t("متر مربع"), t("ورقه"), t("ماه")];
  const inconnectionwith = [t("جعبه"), t("دستگاه"), t("ساعت"), t("شاخه"), t("عدد"), t("کارتن"), t("کیلوگرم"), t("لیتر"), t("متر"), t("متر مربع"), t("ورقه"), t("ماه")];

  const renderContent = (e) => {

    return (
      <EditProducts getedit={editdata} getdata={seteditval} />
    );
  };
  const [sentEditdata, setSentEditData] = useState();

  const seteditval = (e) => {
    setSentEditData(e)
  }

  const [showDragIcons, setShowDragIcons] = React.useState();

  const onReorder = (e) => {
    const visibleRows = e.component.getVisibleRows();
    const newTasks = [...reciept];
    const toIndex = newTasks.findIndex((item) => item.id === visibleRows[e.toIndex].data.id);
    const fromIndex = newTasks.findIndex((item) => item.id === e.itemData.id);
    newTasks.splice(fromIndex, 1);
    newTasks.splice(toIndex, 0, e.itemData);
    setReciept(newTasks);
  }

  function HandleSalePriceChange(value) {
    let temp = value.replaceAll(',', '')
    formik.setFieldValue('otherAdditions', parsFloatFunction(temp, 2))
  }

  const onShowDragIconsChanged = (args) => {
    setShowDragIcons(args.value);
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
    setRun(run + 1)
  }

  const [editdata, setEditdata] = useState()

  function getinfo(e) {
    setEditdata(e.data)
  }

  React.useEffect(() => {

    if (reciept.length) {

      const sub = reciept?.reduce((total, currentValue) => total = total + parseFloat(currentValue.subTotal), 0);
      const Discountresult = reciept?.reduce((total, currentValue) => total = total + parseFloat(currentValue.discountAmount), 0);
      const total = reciept?.reduce((total, currentValue) => total = total + parseFloat(currentValue.total), 0);
      const tax = reciept?.reduce((total, currentValue) => total = total + parseFloat(currentValue.taxamount * currentValue.PriceAfterDiscount), 0);
      const totalnumber = reciept?.reduce((total, currentValue) => total = total + parseFloat(currentValue.MainUnit), 0);

      formik.setFieldValue('subTotal', parsFloatFunction(sub, 2) || 0);
      formik.setFieldValue('total', parsFloatFunction(total, 2) || 0);
      formik.setFieldValue('discount', parsFloatFunction(Discountresult, 2) || 0);
      formik.setFieldValue('tax', parsFloatFunction(tax, 2) || 0);
      formik.setFieldValue('totalNum', parsFloatFunction(totalnumber, 2) || 0)
    }

    else {
      formik.setFieldValue('subTotal', 0);
      formik.setFieldValue('total', 0);
      formik.setFieldValue('discount', 0);
      formik.setFieldValue('tax', 0);
      formik.setFieldValue('totalNum', 0)
    }
    console.log("reciept", reciept)
    formik.setFieldValue('productsID', reciept.map((item) => item.id))
  }, [reciept, run])

  React.useEffect(() => {
    let num = parseFloat(formik.values.shipmentTaxPercentage.replace('%', ''))

    const res = (parseFloat(formik.values.shipment) * num) / 100
    formik.setFieldValue('shipmentTax', res || 0);

  },
    [formik.values.shipment, formik.values.shipmentTaxPercentage, reciept])

  React.useEffect(() => {
    let num = parseFloat(formik.values.goodJobDepositPercentage.replace('%', ''))

    const res = (parseFloat(formik.values.total) * num) / 100
    formik.setFieldValue('goodJobDeposit', res || 0);

  },
    [formik.values.goodJobDepositPercentage, formik.values.total])

  React.useEffect(() => {
    let num = parseFloat(formik.values.insuranceAmountPercentage.replace('%', ''))

    const res = (parseFloat(formik.values.total) * num) / 100
    formik.setFieldValue('insuranceAmount', res || 0);

  },
    [formik.values.insuranceAmountPercentage, reciept, formik.values.total])

  const [totalCount, setTotalCount] = useState(0);

  React.useEffect(() => {
    let res = (parseFloat(formik.values.total) + parseFloat(formik.values.shipment) + parseFloat(formik.values.shipmentTax) +
      parseFloat(formik.values.insuranceAmount) + parseFloat(formik.values.goodJobDeposit) + parseFloat(formik.values.otherAdditions)
    )
    setTotalCount(res)

  },
    [formik.values, reciept])

  React.useEffect(() => {
    console.log('totalCount:', totalCount)

    formik.setFieldValue('totalCount', parsFloatFunction(totalCount, 2) || 0);

  },
    [totalCount, reciept])
    console.log("Values Are Here" , formik.values)
  return (
    <>
      <div id="form" style={{ display: "block", marginRight: "10px", position: 'relative' }}>
        {/*<h1 className='main-title' >*/}
        {/*  {t("پیش فاکتور")}*/}
        {/*</h1>*/}

        <form className="Position-relative" onSubmit={formik.handleSubmit}>
          <Accordion expanded={panel1} onChange={handlePanel1()}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography><span>{t("اطلاعات پیش فاکتور")}</span></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                style={{
                  // backgroundColor: `${theme.palette.background.paper}`,
                  borderWidth: "1px",
                  // borderColor: `${theme.palette.divider}`,
                }}
              >
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
                        <span>{t("شماره پیش فاکتور")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <input
                            className="form-input"
                            type="text"
                            id="preInvoiceNum"
                            name="preInvoiceNum"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.preInvoiceNum}
                          />
                          {formik.touched.preInvoiceNum && formik.errors.preInvoiceNum ? (
                            <div className='error-msg'>
                              {formik.errors.preInvoiceNum}
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
                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("مرحله پیش فاکتور")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.preInvoiceLevel != "" && (
                            <SelectBox
                              dataSource={status}
                              rtlEnabled={
                                i18n.dir() == "ltr" ? false : true
                              }
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("preInvoiceLevel", e.value);
                              }}
                              defaultValue={formik.values.preInvoiceLevel}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="preInvoiceLevel"
                              id="preInvoiceLevel"
                              searchEnabled
                              showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.preInvoiceLevel == "")) && (
                              <SelectBox
                                dataSource={status}
                                rtlEnabled={
                                  i18n.dir() == "ltr" ? false : true
                                }
                                onValueChanged={(e) => {
                                  console.log("------e555555555555", e);
                                  formik.setFieldValue("preInvoiceLevel", e.value);
                                }}
                                defaultValue={formik.values.preInvoiceLevel}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="preInvoiceLevel"
                                id="preInvoiceLevel"
                                searchEnabled
                                showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />
                            )}
                          {formik.touched.preInvoiceLevel &&
                            formik.errors.preInvoiceLevel &&
                            !formik.values.preInvoiceLevel ? (
                            <div className="error-msg">
                              {t(formik.errors.preInvoiceLevel)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("فرد")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <div style={{ position: 'relative' }}>
                          {id != null && formik.values.personsID != 0 && (
                            <SelectBox
                              dataSource={personsData}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                formik.setFieldValue(
                                  "personsID",
                                  e.value
                                );
                              }}
                              displayExpr={"personName"}
                              defaultValue={formik.values.personsID}
                              valueExpr={"personID"}
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
                                    e.value.personID
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
                          {formik.touched.personsID &&
                            formik.errors.personsID ? (
                            <div className="error-msg">
                              {t(formik.errors.personsID)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("تاریخ پیش فاکتور")} <span className="star">*</span></span>
                      </div>
                      <div className="wrapper date-picker position-relative" >
                        <DatePicker
                          id="preInvoiceDate"
                          ref={dateRef1}
                          name="preInvoiceDate"
                          editable={false}
                          calendar={renderCalendarSwitch(i18n.language)}
                          locale={renderCalendarLocaleSwitch(i18n.language)}
                          onBlur={formik.handleBlur}
                          onChange={(val) => {
                            formik.setFieldValue(
                              "preInvoiceDate",
                              julianIntToDateTime(val.toJulianDay())
                            );
                          }}
                          value={getLangDate(i18n.language , formik.values.preInvoiceDate)}
                        />
                        <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                          <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal' /></div>
                        </div>
                      </div>
                      {formik.touched.preInvoiceDate && formik.errors.preInvoiceDate ? (
                        <div className='error-msg'>
                          {t(formik.errors.preInvoiceDate)}
                        </div>
                      ) : null}
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="row">
                        <div className="content col-lg-6 col-md-6 col-xs-12">
                          <div className="title">
                            <span className="spanDisableInput">
                              {t("مرتبط با")}
                              <span className="star">*</span>
                            </span>
                          </div>
                          <div className="wrapper">
                            {id != null && formik.values.relatedTo != "" && (
                              <SelectBox
                                dataSource={relatedToData.filter((item) => idList.includes(item.entitiesID))}
                                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                onValueChanged={(e) => {
                                  setSelectedRelatedTo(e.value.displayName)
                                  formik.setFieldValue("relatedTo", e.value.entitiesID);
                                }}
                                defaultValue={formik.values.relatedTo}
                                displayExpr="displayName"
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="relatedTo"
                                id="relatedTo"
                                searchEnabled
                                showClearButton
                                //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />
                            )}
                            {(!id ||
                              (id != null &&
                                formik.values.relatedTo == "")) && (
                              <SelectBox
                                dataSource={relatedToData.filter((item) => idList.includes(item.entitiesID))}
                                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                onValueChanged={(e) => {
                                  setSelectedRelatedTo(e.value.displayName)
                                  formik.setFieldValue("relatedTo", e.value.entitiesID);
                                }}
                                defaultValue={formik.values.relatedTo}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                displayExpr="displayName"
                                placeholder=""
                                name="relatedTo"
                                id="relatedTo"
                                searchEnabled
                                showClearButton
                                //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />
                            )}
                            {formik.touched.relatedTo &&
                            formik.errors.relatedTo &&
                            !formik.values.relatedTo ? (
                              <div className="error-msg">
                                {t(formik.errors.relatedTo)}
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
                            <SelectBox
                              dataSource={relatedToRes}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                formik.setFieldValue("relatedToInput", e.value);
                              }}
                              defaultValue={formik.values.relatedToInput}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              displayExpr="title"
                              valueExpr="title"
                              key="id"
                              placeholder=""
                              name="relatedToInput"
                              id="relatedToInput"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                            {formik.touched.relatedToInput &&
                            formik.errors.relatedToInput ? (
                              <div className="error-msg">
                                {t(formik.errors.relatedToInput)}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("تاریخ اعتبار")} <span className="star">*</span></span>
                      </div>
                      <div className="wrapper date-picker position-relative" >
                        <DatePicker
                          id="validityDate"
                          ref={dateRef2}
                          name="validityDate"
                          editable={false}
                          calendar={renderCalendarSwitch(i18n.language)}
                          locale={renderCalendarLocaleSwitch(i18n.language)}
                          onBlur={formik.handleBlur}
                          onChange={(val) => {
                            formik.setFieldValue(
                              "validityDate",
                              julianIntToDateTime(val.toJulianDay())
                            );
                          }}
                          value={getLangDate(i18n.language , formik.values.validityDate)}
                        />
                        <div className={`modal-action-button  ${i18n.dir() === "ltr" ? 'action-ltr' : ''}`}>
                          <div className='d-flex align-items-center justify-content-center'><CalendarMonthIcon className='calanderButton modal' /></div>
                        </div>
                      </div>
                      {formik.touched.validityDate && formik.errors.validityDate ? (
                        <div className='error-msg'>
                          {t(formik.errors.validityDate)}
                        </div>
                      ) : null}
                    </div>

                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("وضعیت فاکتور")}
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.invoiceState != "" && (
                            <SelectBox
                              dataSource={inconnectionwith}
                              rtlEnabled={
                                i18n.dir() == "ltr" ? false : true
                              }
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("invoiceState", e.value);
                              }}
                              defaultValue={formik.values.invoiceState}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="invoiceState"
                              id="invoiceState"
                              searchEnabled
                              showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.invoiceState == "")) && (
                              <SelectBox
                                dataSource={inconnectionwith}
                                rtlEnabled={
                                  i18n.dir() == "ltr" ? false : true
                                }
                                onValueChanged={(e) => {
                                  console.log("------e555555555555", e);
                                  formik.setFieldValue("invoiceState", e.value);
                                }}
                                defaultValue={formik.values.invoiceState}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="invoiceState"
                                id="invoiceState"
                                searchEnabled
                                showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />
                            )}
                          {formik.touched.invoiceState &&
                            formik.errors.invoiceState &&
                            !formik.values.invoiceState ? (
                            <div className="error-msg">
                              {t(formik.errors.invoiceState)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("پروژه")}
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.project != "" && (
                            <SelectBox
                              dataSource={status}
                              rtlEnabled={
                                i18n.dir() == "ltr" ? false : true
                              }
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("project", e.value);
                              }}
                              defaultValue={formik.values.project}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="project"
                              id="project"
                              searchEnabled
                              showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.project == "")) && (
                              <SelectBox
                                dataSource={status}
                                rtlEnabled={
                                  i18n.dir() == "ltr" ? false : true
                                }
                                onValueChanged={(e) => {
                                  console.log("------e555555555555", e);
                                  formik.setFieldValue("project", e.value);
                                }}
                                defaultValue={formik.values.project}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="project"
                                id="project"
                                searchEnabled
                                showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />
                            )}
                          {formik.touched.project &&
                            formik.errors.project &&
                            !formik.values.project ? (
                            <div className="error-msg">
                              {t(formik.errors.project)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("کاربر")}
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.user != "" && (
                            <SelectBox
                              dataSource={status}
                              rtlEnabled={
                                i18n.dir() == "ltr" ? false : true
                              }
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("user", e.value);
                              }}
                              defaultValue={formik.values.user}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="user"
                              id="user"
                              searchEnabled
                              showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.user == "")) && (
                              <SelectBox
                                dataSource={status}
                                rtlEnabled={
                                  i18n.dir() == "ltr" ? false : true
                                }
                                onValueChanged={(e) => {
                                  console.log("------e555555555555", e);
                                  formik.setFieldValue("user", e.value);
                                }}
                                defaultValue={formik.values.user}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="user"
                                id="user"
                                searchEnabled
                                showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />
                            )}
                          {formik.touched.user &&
                            formik.errors.user &&
                            !formik.values.user ? (
                            <div className="error-msg">
                              {t(formik.errors.user)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("فرصت")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <div style={{ position: 'relative' }}>
                          {id != null && formik.values.opportunitiesID != 0 && (
                            <SelectBox
                              dataSource={opportunitiesData}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                formik.setFieldValue(
                                  "opportunitiesID",
                                  e.value
                                );
                              }}
                              displayExpr={"opportunityName"}
                              defaultValue={formik.values.opportunitiesID}
                              valueExpr={"opportunityID"}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="opportunitiesID"
                              id="opportunitiesID"
                              searchEnabled
                              showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null && formik.values.opportunitiesID == 0)) && (
                              <SelectBox
                                dataSource={opportunitiesData}
                                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                onValueChanged={(e) => {
                                  formik.setFieldValue(
                                    "opportunitiesID",
                                    e.value.opportunityID
                                  );
                                }}
                                displayExpr={"opportunityName"}
                                defaultValue={formik.values.opportunitiesID}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="opportunitiesID"
                                id="opportunitiesID"
                                searchEnabled
                                showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />
                            )}
                          {formik.touched.opportunitiesID &&
                            formik.errors.opportunitiesID ? (
                            <div className="error-msg">
                              {t(formik.errors.opportunitiesID)}
                            </div>
                          ) : null}
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
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography><span>{t("ردیف محصولات")}</span></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                style={{
                  // backgroundColor: `${theme.palette.background.paper}`,
                  borderWidth: "1px",
                  // borderColor: `${theme.palette.divider}`,
                }}
              >
                <div className="form-design">
                  <div className='row mb-0'>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("واحد پول")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.moneyUnit != "" && (
                            <SelectBox
                              dataSource={currencies}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                formik.setFieldValue("moneyUnit", e.value);
                              }}
                              defaultValue={formik.values.moneyUnit}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="moneyUnit"
                              id="moneyUnit"
                              searchEnabled
                              showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id || (id != null && formik.values.moneyUnit == "")) && (
                            <SelectBox
                              dataSource={currencies}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                formik.setFieldValue("moneyUnit", e.value);
                              }}
                              defaultValue={formik.values.moneyUnit}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="moneyUnit"
                              id="moneyUnit"
                              searchEnabled
                              showClearButton
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center">

                    <div className="content col-12">
                      <ToggleButtonGroup
                        className="content button-group row justify-content-center mb-3"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                      >
                        <div className='col-lg-auto col-sm-4 col-xs-6'>
                          <Button variant="contained" size="medium" color="primary" onClick={handleClickOpen} > {t("انتخاب محصول")} </Button>
                        </div>
                        <div className='col-lg-auto col-sm-4 col-xs-6'>
                          <Button variant="contained" size="medium" color="primary" onClick={handleClickOpenMultipleProducts} >{t('انتخاب چند محصول')}</Button>
                        </div>
                        <div className='col-lg-auto col-sm-4 col-xs-6'>
                          <Button variant="contained" size="medium" color="primary" onClick={handleClickOpenuploadfile} >{t('وارد کردن اطلاعات')}</Button>
                        </div>
                        <div className='col-lg-auto col-sm-4 col-xs-6'>
                          <Button variant="contained" disabled={!reciept.length} size="medium" color="primary" onClick={handleClickOpenapplychanges} >{t('اعمال تغییرات')}</Button>
                        </div>
                        <div className='col-lg-auto col-sm-4 col-xs-6'>
                          <Button variant="contained" size="medium" color="primary" onClick={handleClickOpenpackaging} >{t('انتخاب بسته بندی محصول')}</Button>
                        </div>
                        <div className='col-lg-auto col-sm-4 col-xs-6'>
                          <Button variant="contained" size="medium" color="primary" onClick={handleClick}  >{buttonText}</Button>
                        </div>

                      </ToggleButtonGroup>
                    </div>
                  </div>
                </div>
                <div className="form-design">
                  <div className="row">
                    <div
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <DataGrid
                        showBorders={true}
                        hoverStateEnabled={true}
                        keyExpr="id"
                        width={"100%"}
                        rtlEnabled={!(i18n.dir() == "ltr")}
                        dataSource={reciept}
                        onRowRemoved={() => getDeleteChange(reciept)}
                        onSaved={getsave}
                        noDataText={t('داده‌ای موجود نیست')}
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
                            confirmDeleteMessage={t("آیا مطمئین هستید؟")}
                            saveRowChanges={t("ذخیره")}
                            cancelRowChanges={t("لغو")}
                          />

                          <Popup title="ویرایش محصول" height={'60vh'} showtitle={true} contentRender={renderContent} />

                        </Editing>

                        <Selection mode="single" />
                        <Column caption={t("محصول")} dataField="productName" width={150} alignment={"center"} />
                        <Column caption={t("مقدار")} dataField="MainUnit" width={110} alignment={"center"} />
                        <Column caption={t("قیمت واحد")} dataField="UnitPrice" width={110} alignment={"center"} />
                        <Column caption={t("زیر مجموع")} dataField="subset" width={110} alignment={"center"} />
                        <Column caption={t("مقدار پس از تخفیف")} dataField="PriceAfterDiscount" width={130} alignment={"center"} />
                        <Column caption={t("جمع کل")} dataField="totalprice" width={110} alignment={"center"} />

                        {(buttonText === (t('نمایش جزئیات بیشتر')) || buttonText === (t('نمایش جزئیات کمتر'))) && <Column caption={t("مبلغ تخفیف")} dataField="discountAmount" width={110} alignment={"center"} />}
                        {(buttonText === (t('نمایش جزئیات بیشتر')) || buttonText === (t('نمایش جزئیات کمتر'))) && <Column caption={t("مالیات")} dataField="taxamount" width={110} alignment={"center"} />}

                        {(buttonText === (t('نمایش جزئیات بیشتر')) || buttonText === (t('نمایش جزئیات کمتر'))) && <Column caption={t("شماره سریال")} dataField="serialNumber" width={100} alignment={"center"} />}
                        {(buttonText === (t('نمایش جزئیات بیشتر')) || buttonText === (t('نمایش جزئیات کمتر'))) && <Column caption={t("کد محصول")} dataField="productCode" width={110} alignment={"center"} />}
                        {(buttonText === (t('نمایش جزئیات بیشتر')) || buttonText === (t('نمایش جزئیات کمتر'))) && <Column caption={t("بسته محصول")} dataField="HireDate" width={110} alignment={"center"} />}
                        {(buttonText === (t('نمایش جزئیات بیشتر')) || buttonText === (t('نمایش جزئیات کمتر'))) && <Column caption={t("توضیحات")} dataField="description" width={150} alignment={"center"} />}
                        {(buttonText === (t('نمایش جزئیات بیشتر')) || buttonText === (t('نمایش جزئیات کمتر'))) && <Column caption={t("یادداشت")} dataField="Note" width={150} alignment={"center"} />}
                        {buttonText === (t('نمایش جزئیات کمتر')) && <Column caption={t("واحد اصلی")} dataField="HireDate" width={110} alignment={"center"} />}
                        {buttonText === (t('نمایش جزئیات کمتر')) && <Column caption={t("واحد ثانویه")} dataField="HireDate" width={110} alignment={"center"} />}
                        {buttonText === (t('نمایش جزئیات کمتر')) && <Column caption={t("مقدار واحد ثانویه")} dataField="HireDate" width={110} alignment={"center"} />}

                      </DataGrid>
                    </div>
                  </div>
                </div>
                <div className="form-design">
                  <div className="row">
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("مجموع")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <CurrencyInput
                            className="disabled-form-input"
                            type="text"
                            id="total"
                            name="total"
                            decimalsLimit={2}
                            style={{ width: "100%" }}
                            value={formik.values.total}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("تخفیف")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <CurrencyInput
                            className="disabled-form-input"
                            type="text"
                            id="discount"
                            name="discount"
                            style={{ width: "100%" }}
                            value={formik.values.discount}
                            decimalsLimit={2}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("زیر مجموع")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <CurrencyInput
                            className="disabled-form-input"
                            type="text"
                            id="subTotal"
                            name="subTotal"
                            style={{ width: "100%" }}
                            value={formik.values.subTotal}
                            decimalsLimit={2}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("سایر اضافات")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <CurrencyInput
                            className="disabled-form-input"
                            type="text"
                            id="otherAdditions"
                            name="otherAdditions"
                            style={{ width: "100%" }}
                            decimalsLimit={2}
                            onChange={(e) => HandleSalePriceChange(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-12 col-xs-12">
                      <div className="title">
                        <span>{t("حمل")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <CurrencyInput
                            className="form-input"
                            type="text"
                            id="shipment"
                            name="shipment"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}

                            decimalsLimit={2}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-3 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("مبلغ مالیات حمل")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <CurrencyInput
                            className="form-input"
                            type="text"
                            id="shipmentTax"
                            name="shipmentTax"
                            style={{ width: "100%" }}
                            value={formik.values.shipmentTax}
                            disabled
                            decimalsLimit={2}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-3 col-md-6 col-xs-12">
                      <div className="title">
                        <span>‌</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <SelectBox
                            dataSource={percentselectList}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => formik.setFieldValue('shipmentTaxPercentage', e.value)}
                            className='selectBox'
                            noDataText={t('اطلاعات یافت نشد')}
                            itemRender={null}
                            placeholder=''
                            name='shipmentTaxPercentage'
                            id='shipmentTaxPercentage'
                            searchEnabled
                            showClearButton
                          //defaultValue={measurementUnits[0]}       نشان دادن مقدار اولیه 
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-12 col-xs-12 ">
                      <div className="title">
                        <span> {t("مالیات")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <CurrencyInput
                            className="disabled-form-input"
                            type="text"
                            id="tax"
                            name="tax"
                            style={{ width: "100%" }}
                            value={formik.values.tax}
                            decimalsLimit={2}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-3 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("مقدار سپرده بیمه")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <CurrencyInput
                            className="disabled-form-input"
                            type="text"
                            id="insuranceAmount"
                            name="insuranceAmount"
                            value={formik.values.insuranceAmount}
                            style={{ width: "100%" }}
                            disabled
                            decimalsLimit={2}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-3 col-md-6 col-xs-12">
                      <div className="title">
                        <span style={{ visibility: "hidden", opacity: "0%" }} > {t("don't see this")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <SelectBox
                            dataSource={percentselectList}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => formik.setFieldValue('insuranceAmountPercentage', e.value)}
                            className='selectBox'
                            noDataText={t('اطلاعات یافت نشد')}
                            itemRender={null}
                            placeholder=''
                            name='insuranceAmountPercentage'
                            id='insuranceAmountPercentage'
                            searchEnabled
                            showClearButton
                          //defaultValue={measurementUnits[0]}       نشان دادن مقدار اولیه 
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-3 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("مقدار سپرده حسن انجام کار")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <CurrencyInput
                            className="disabled-form-input"
                            type="text"
                            id="goodJobDeposit"
                            name="goodJobDeposit"
                            style={{ width: "100%" }}
                            value={formik.values.goodJobDeposit}
                            disabled
                            decimalsLimit={2}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-3 col-md-6 col-xs-12">
                      <div className="title">
                        <span>‌</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <SelectBox
                            dataSource={percentselectList}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => formik.setFieldValue('goodJobDepositPercentage', e.value)}
                            className='selectBox'
                            noDataText={t('اطلاعات یافت نشد')}
                            itemRender={null}
                            placeholder=''
                            name='goodJobDepositPercentage'
                            id='goodJobDepositPercentage'
                            searchEnabled
                            showClearButton
                          //defaultValue={measurementUnits[0]}       نشان دادن مقدار اولیه 
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("جمع کل")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <CurrencyInput
                            className="disabled-form-input"
                            type="text"
                            id="totalCount"
                            value={formik.values.totalCount}
                            name="totalCount"
                            style={{ width: "100%" }}
                            disabled
                            decimalsLimit={2}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("مجموع تعداد")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <CurrencyInput
                            className="disabled-form-input"
                            type="text"
                            id="totalNum"
                            value={formik.values.totalNum}
                            name="totalNum"
                            disabled
                            decimalsLimit={2}
                          />
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
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography><span>{t("توضیحات")}</span></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                className="form-design"
                style={{
                  // backgroundColor: `${theme.palette.background.paper}`,
                  borderWidth: "1px",
                }}
              >
                <div className="row">
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("یادداشت")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <textarea
                          className="disabled-form-input"
                          type="text"
                          id="note"
                          name="note"
                          value={formik.values.note}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          style={{ width: "100%", height: "100px" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("توضیحات")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <textarea
                          className="disabled-form-input"
                          type="text"
                          id="desc"
                          name="desc"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.desc}
                          style={{ width: "100%", height: "100px" }}
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
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography><span>{t("اطلاعات بیشتر")}</span></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                style={{
                  // backgroundColor: `${theme.palette.background.paper}`,
                  borderWidth: "1px",
                }}
              >
                <div className="form-design">
                  <div className="row">
                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("پیامک یادآوری به مشتری")}
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.customerSMS != "" && (
                            <SelectBox
                              dataSource={customerremindermessege}
                              rtlEnabled={
                                i18n.dir() == "ltr" ? false : true
                              }
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("customerSMS", e.value);
                              }}
                              defaultValue={formik.values.customerSMS}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="customerSMS"
                              id="customerSMS"
                              searchEnabled
                              showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.customerSMS == "")) && (
                              <SelectBox
                                dataSource={customerremindermessege}
                                rtlEnabled={
                                  i18n.dir() == "ltr" ? false : true
                                }
                                onValueChanged={(e) => {
                                  console.log("------e555555555555", e);
                                  formik.setFieldValue("customerSMS", e.value);
                                }}
                                defaultValue={formik.values.customerSMS}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="customerSMS"
                                id="customerSMS"
                                searchEnabled
                                showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />
                            )}
                          {formik.touched.customerSMS &&
                            formik.errors.customerSMS &&
                            !formik.values.customerSMS ? (
                            <div className="error-msg">
                              {t(formik.errors.customerSMS)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("نحوه ی ارسال کالا")}
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.productSendMethod != "" && (
                            <SelectBox
                              dataSource={packagetransmissionmethod}
                              rtlEnabled={
                                i18n.dir() == "ltr" ? false : true
                              }
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("productSendMethod", e.value);
                              }}
                              defaultValue={formik.values.productSendMethod}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="productSendMethod"
                              id="productSendMethod"
                              searchEnabled
                              showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.productSendMethod == "")) && (
                              <SelectBox
                                dataSource={packagetransmissionmethod}
                                rtlEnabled={
                                  i18n.dir() == "ltr" ? false : true
                                }
                                onValueChanged={(e) => {
                                  console.log("------e555555555555", e);
                                  formik.setFieldValue("productSendMethod", e.value);
                                }}
                                defaultValue={formik.values.productSendMethod}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="productSendMethod"
                                id="productSendMethod"
                                searchEnabled
                                showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />
                            )}
                          {formik.touched.productSendMethod &&
                            formik.errors.productSendMethod &&
                            !formik.values.productSendMethod ? (
                            <div className="error-msg">
                              {t(formik.errors.productSendMethod)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("شرایط پرداخت")}
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.paymentConditions != "" && (
                            <SelectBox
                              dataSource={termsofpayment}
                              rtlEnabled={
                                i18n.dir() == "ltr" ? false : true
                              }
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("paymentConditions", e.value);
                              }}
                              defaultValue={formik.values.paymentConditions}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="paymentConditions"
                              id="paymentConditions"
                              searchEnabled
                              showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.paymentConditions == "")) && (
                              <SelectBox
                                dataSource={termsofpayment}
                                rtlEnabled={
                                  i18n.dir() == "ltr" ? false : true
                                }
                                onValueChanged={(e) => {
                                  console.log("------e555555555555", e);
                                  formik.setFieldValue("paymentConditions", e.value);
                                }}
                                defaultValue={formik.values.paymentConditions}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="paymentConditions"
                                id="paymentConditions"
                                searchEnabled
                                showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />
                            )}
                          {formik.touched.paymentConditions &&
                            formik.errors.paymentConditions &&
                            !formik.values.paymentConditions ? (
                            <div className="error-msg">
                              {t(formik.errors.paymentConditions)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("نوع ارسال کالا")}
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.productSendType != "" && (
                            <SelectBox
                              dataSource={packagetransmissiontype}
                              rtlEnabled={
                                i18n.dir() == "ltr" ? false : true
                              }
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("productSendType", e.value);
                              }}
                              defaultValue={formik.values.productSendType}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="productSendType"
                              id="productSendType"
                              searchEnabled
                              showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.productSendType == "")) && (
                              <SelectBox
                                dataSource={packagetransmissiontype}
                                rtlEnabled={
                                  i18n.dir() == "ltr" ? false : true
                                }
                                onValueChanged={(e) => {
                                  console.log("------e555555555555", e);
                                  formik.setFieldValue("productSendType", e.value);
                                }}
                                defaultValue={formik.values.productSendType}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="productSendType"
                                id="productSendType"
                                searchEnabled
                                showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />
                            )}
                          {formik.touched.productSendType &&
                            formik.errors.productSendType &&
                            !formik.values.productSendType ? (
                            <div className="error-msg">
                              {t(formik.errors.productSendType)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("وضعیت تائید داخلی")}
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.internalVerify != "" && (
                            <SelectBox
                              dataSource={packagetransmissiontype}
                              rtlEnabled={
                                i18n.dir() == "ltr" ? false : true
                              }
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("internalVerify", e.value);
                              }}
                              defaultValue={formik.values.internalVerify}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="internalVerify"
                              id="internalVerify"
                              searchEnabled
                              showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.internalVerify == "")) && (
                              <SelectBox
                                dataSource={packagetransmissiontype}
                                rtlEnabled={
                                  i18n.dir() == "ltr" ? false : true
                                }
                                onValueChanged={(e) => {
                                  console.log("------e555555555555", e);
                                  formik.setFieldValue("internalVerify", e.value);
                                }}
                                defaultValue={formik.values.internalVerify}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="internalVerify"
                                id="internalVerify"
                                searchEnabled
                                showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />
                            )}
                          {formik.touched.internalVerify &&
                            formik.errors.internalVerify &&
                            !formik.values.internalVerify ? (
                            <div className="error-msg">
                              {t(formik.errors.internalVerify)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("مشکلات تائید داخلی")}
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.internalVerifyProblems != "" && (
                            <SelectBox
                              dataSource={packagetransmissiontype}
                              rtlEnabled={
                                i18n.dir() == "ltr" ? false : true
                              }
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("internalVerifyProblems", e.value);
                              }}
                              defaultValue={formik.values.internalVerifyProblems}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="internalVerifyProblems"
                              id="internalVerifyProblems"
                              searchEnabled
                              showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.internalVerifyProblems == "")) && (
                              <SelectBox
                                dataSource={packagetransmissiontype}
                                rtlEnabled={
                                  i18n.dir() == "ltr" ? false : true
                                }
                                onValueChanged={(e) => {
                                  console.log("------e555555555555", e);
                                  formik.setFieldValue("internalVerifyProblems", e.value);
                                }}
                                defaultValue={formik.values.internalVerifyProblems}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="internalVerifyProblems"
                                id="internalVerifyProblems"
                                searchEnabled
                                showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />
                            )}
                          {formik.touched.internalVerifyProblems &&
                            formik.errors.internalVerifyProblems &&
                            !formik.values.internalVerifyProblems ? (
                            <div className="error-msg">
                              {t(formik.errors.internalVerifyProblems)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("شرکت ارسال کننده فاکتور")}
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.preInvoiceSenderCompany != "" && (
                            <SelectBox
                              dataSource={receiptsubmitterfirm}
                              rtlEnabled={
                                i18n.dir() == "ltr" ? false : true
                              }
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("preInvoiceSenderCompany", e.value);
                              }}
                              defaultValue={formik.values.preInvoiceSenderCompany}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="preInvoiceSenderCompany"
                              id="preInvoiceSenderCompany"
                              searchEnabled
                              showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.preInvoiceSenderCompany == "")) && (
                              <SelectBox
                                dataSource={receiptsubmitterfirm}
                                rtlEnabled={
                                  i18n.dir() == "ltr" ? false : true
                                }
                                onValueChanged={(e) => {
                                  console.log("------e555555555555", e);
                                  formik.setFieldValue("preInvoiceSenderCompany", e.value);
                                }}
                                defaultValue={formik.values.preInvoiceSenderCompany}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="preInvoiceSenderCompany"
                                id="preInvoiceSenderCompany"
                                searchEnabled
                                showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />
                            )}
                          {formik.touched.preInvoiceSenderCompany &&
                            formik.errors.preInvoiceSenderCompany &&
                            !formik.values.preInvoiceSenderCompany ? (
                            <div className="error-msg">
                              {t(formik.errors.preInvoiceSenderCompany)}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div
                      className="content col-lg-6 col-md-6 col-xs-12"
                      onFocus={() => dateRef?.current?.closeCalendar()}
                    >
                      <div className="title">
                        <span>
                          {t("قالب چاپ فاکتور")}
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.preInvoicePrintFrame != "" && (
                            <SelectBox
                              dataSource={receiptprintframe}
                              rtlEnabled={
                                i18n.dir() == "ltr" ? false : true
                              }
                              onValueChanged={(e) => {
                                console.log("------e111", e);
                                formik.setFieldValue("preInvoicePrintFrame", e.value);
                              }}
                              defaultValue={formik.values.preInvoicePrintFrame}
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="preInvoicePrintFrame"
                              id="preInvoicePrintFrame"
                              searchEnabled
                              showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.preInvoicePrintFrame == "")) && (
                              <SelectBox
                                dataSource={receiptprintframe}
                                rtlEnabled={
                                  i18n.dir() == "ltr" ? false : true
                                }
                                onValueChanged={(e) => {
                                  console.log("------e555555555555", e);
                                  formik.setFieldValue("preInvoicePrintFrame", e.value);
                                }}
                                defaultValue={formik.values.preInvoicePrintFrame}
                                className="selectBox"
                                noDataText="اطلاعات یافت نشد"
                                placeholder=""
                                name="preInvoicePrintFrame"
                                id="preInvoicePrintFrame"
                                searchEnabled
                                showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                              />
                            )}
                          {formik.touched.preInvoicePrintFrame &&
                            formik.errors.preInvoicePrintFrame &&
                            !formik.values.preInvoicePrintFrame ? (
                            <div className="error-msg">
                              {t(formik.errors.preInvoicePrintFrame)}
                            </div>
                          ) : null}
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
                  <div className='col-md-6 col-12'>
                    <div className='row'>
                      <div className="content col-12">
                        <div className='title'>
                          <span> {t("منطقه جغرافیایی ارسال محصول")} </span>
                        </div>
                        <div className='wrapper'>
                          <div className='d-flex' style={{ position: "relative" }}>
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
                              <span>{t("آدرس ارسال صورت حساب")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <textarea
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
                          <span> {t("منطقه جغرافيایی ارسال صورت حساب")} </span>
                        </div>
                        <div className='wrapper'>
                          <div className='d-flex' style={{ position: "relative" }}>
                            <input
                              className={`form-input modal-input ${i18n.dir() === 'ltr' ? 'ltr' : ''}`}
                              type="text"
                              id="otherGeographyLoc"
                              name="otherGeographyLoc"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.otherGeographyLoc}
                              disabled
                            />
                            <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >
                              <CountryTreeView className='modal' getAddress={getInvoiceAddresstwo} />
                              <Button><CancelIcon onClick={clearInvoiceAddresstwo} /></Button>
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
                              <span>{t("آدرس حمل کالا")}</span>
                            </div>
                            <div className="wrapper">
                              <div>
                                <textarea
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

          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography><span>{t("اطلاعات اعتبارسنجی")}</span></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div
                style={{
                  // backgroundColor: `${theme.palette.background.paper}`,
                  borderWidth: "1px",
                  // borderColor: `${theme.palette.divider}`,
                }}
              >
                <div className="form-design">
                  <div className="row">
                    <div className="content col-sm-6 col-12">
                      <div className="title">
                        <span>{t("سقف اعتبار")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <textarea
                            className="disabled-form-input"
                            type="text"
                            id="validityLimit"
                            name="validityLimit"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.validityLimit}
                            style={{ width: "100%", height: "100px" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-sm-6 col-12">
                      <div className="title">
                        <span>{t("مجموع قابل دریافت")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <textarea
                            className="disabled-form-input"
                            type="text"
                            id="totalReceivable"
                            name="totalReceivable"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.totalReceivable}
                            style={{ width: "100%", height: "100px" }}
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
            <Button
              variant="contained"
              color="success"
              type="button"
              onClick={id != null ? updatePreInvoice : formik.handleSubmit}
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
          {/*<div style={{display:"flex",justifyContent:"center"}}>*/}
          {/*  <button*/}
          {/*  className="button"*/}
          {/*  onClick={factorSub}*/}
          {/*  type="submit">*/}
          {/*    <span>{t("ثبت")}</span>*/}
          {/*  </button>*/}
          {/*</div>*/}

          <Dialog open={open2} fullWidth={fullWidth} maxWidth={maxWidth} dir={i18n.dir()} >

            <div className={`modal-header ${i18n.dir() == "ltr" ? 'header-ltr' : ''}`}>
              <h2>{t('انتخاب محصول')}</h2>
              <button type='button' className='close-btn' onClick={() => setOpen2(false)}><CloseIcon /></button>
            </div>
            <DialogContent>
              <SelectProducts getdata={setFactorr} />
            </DialogContent>
          </Dialog>

          <Dialog open={openmulti} fullWidth={fullWidth} maxWidth={maxWidth} dir={i18n.dir()}>

            <div className={`modal-header ${i18n.dir() == "ltr" ? 'header-ltr' : ''}`}>
              <h2>{t('انتخاب چند محصول')}</h2>
              <button type='button' className='close-btn' onClick={() => setOpenMultiple(false)}><CloseIcon /></button>
            </div>
            <DialogContent>
              <SelectMultipleProducts getdata={setmultipleproduct} closDialog={() => setOpenMultiple(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={openuploadfile} fullWidth={fullWidth} maxWidth={maxWidth} dir={i18n.dir()}>


            <div className={`modal-header ${i18n.dir() == "ltr" ? 'header-ltr' : ''}`}>
              <h2>{t('اپلود فایل')}</h2>
              <button type='button' className='close-btn' onClick={() => setOpenuploadfile(false)}><CloseIcon /></button>
            </div>
            <DialogContent>
              <UploadFileComponent />
            </DialogContent>
          </Dialog>

          <Dialog open={openapplychanges} fullWidth={fullWidth} maxWidth={maxWidth} dir={i18n.dir()}>
            <div className={`modal-header ${i18n.dir() == "ltr" ? 'header-ltr' : ''}`}>
              <h2>{t('اعمال تغییرات')}</h2>
              <button type='button' className='close-btn' onClick={() => setOpenapplychanges(false)}><CloseIcon /></button>
            </div>
            <DialogContent>

              <ApplyChanges getchange={setchanges} closDialog={() => setOpenapplychanges(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={openpackaging} fullWidth={fullWidth} maxWidth={maxWidth} dir={i18n.dir()}>
            <div className={`modal-header ${i18n.dir() == "ltr" ? 'header-ltr' : ''}`}>
              <h2>{t('انتخاب بسته محصول')}</h2>
              <button type='button' className='close-btn' onClick={() => setOpenpackaging(false)}><CloseIcon /></button>
            </div>
            <DialogContent>
              <Packaging />
            </DialogContent>
          </Dialog>

        </form>
      </div>
    </>
  );
};
export default PreInvoiceForm;