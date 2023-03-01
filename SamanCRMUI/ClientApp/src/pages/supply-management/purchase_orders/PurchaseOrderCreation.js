import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import swal from "sweetalert";
import { useFormik } from "formik";
import {
  Accordion,
  AccordionSummary,
  Button,
  Dialog,
  DialogContent,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import SupplierModal from "../../../components/Modals/Ghafourian_SupplierModal/SupplierModal";
import CancelIcon from "@mui/icons-material/Cancel";
import { ExpandMore } from "@mui/icons-material";
import PersonModal from "../../../components/Modals/Ghafourian_PersonModal/PersonModal";
import AccountModal from "../../../components/Modals/Ghafourian_AccountModal/AccountModal";
import OpportunityModal from "../../../components/Modals/Ghafourian_OpportunityModal/OpportunityModal";
import { julianIntToDateTime } from "../../../utils/dateConvert";
import DatePicker from "react-multi-date-picker";
import UserModal from "../../../components/Modals/Ghafourian_UserModal/UserModal";
import CountryTreeView from "../../../components/CountryComponent/CountryTreeView";
import MyMap from "../../../components/map/index";
import CircularProgress from "@mui/material/CircularProgress";
import UploadFile from "../../../components/UploadComponent/UploadFile";
import axios from "axios";
import { history } from "../../../utils/history";
import { useSearchParams } from "react-router-dom";
import { SelectProducts } from "../../../components/Modals/ModalGroup/SelectProducts";
import { EditProducts } from "../../../components/Modals/ModalGroup/EditProducts";
import { SelectMultipleProducts } from "../../../components/Modals/ModalGroup/SelectMultipleProducts";
import { UploadFileComponent } from "../../../components/Modals/ModalGroup/UploadFileComponent";
import { ApplyChanges } from "../../../components/Modals/ModalGroup/ApplyChanges";
import { Packaging } from "../../../components/Modals/ModalGroup/Packaging";
import { SelectBox } from "devextreme-react";
import DataGrid, {
  Column,
  Editing,
  Popup,
  RowDragging,
  Selection,
  Texts,
} from "devextreme-react/data-grid";
import CloseIcon from "@mui/icons-material/Close";
import { parsFloatFunction } from "../../../utils/parsFloatFunction";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CurrencyInput from "react-currency-input-field";
import {
  renderCalendarLocaleSwitch,
  renderCalendarSwitch,
} from "../../../utils/calenderLang";
import DateObject from "react-date-object";
import { getLangDate } from "../../../utils/getLangDate";

const PurchaseOrder = [];
export const PurchaseOrderCreation = () => {
  const { t, i18n } = useTranslation();
  const [result, setResult] = useState();
  const [buyOrderDetail, setBuyOrderDetail] = useState([]);
  const [alignment, setAlignment] = useState("");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const theme = useTheme();
  const [reciept, setReciept] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [panel1, setPanel1] = useState(true);
  const [panel3, setPanel3] = useState(true);
  const [panel4, setPanel4] = useState(true);
  const [panel5, setPanel5] = useState(true);

  const dateRef1 = useRef();
  const dateRef2 = useRef();

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

  const [uploadError, setUploadError] = useState(false);
  const [fileList1, setFileList1] = useState([]);

  const iranPostalCodeRegMatch =
    /^\b(?!(\d)\1{ Yup.string().3})[13-9]{4}[1346-9][013-9]{5}\b/;

    const updateBuyOrder = (values) => {
      console.log("allValues", formik.values); 
      formik.values.productList = JSON.stringify(formik.values.productList);
      if (values != null) {
        let isSuccess = false;
        axios
          .put(`${appConfig.BaseURL}/api/BuyOrder/Update/${id}`, formik.values)
          .then((res) => {
            setResult(res.data);
            isSuccess = true;
          })
          .finally(() => {
            if ((isSuccess = true)) {
              history.navigate(`/inventory-management/purchase-orders/PurchaseOrderManagement`);
            }
          });
      }
    };
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const appConfig = window.globalConfig;
  const status = [t("ایجاد شده"), t("ایجاد نشده")];
  const currencies = ["Rial : ریال", "Dollar : $", "Euro : €"];
  const taxRates = ["0%", "9%"];
  const customerReminders = [
    t("یک دقیقه قبل از شروع"),
    t("یک ساعت قبل از شروع"),
    t("سه ساعت قبل از شروع"),
    t("یک روز قبل از شروع"),
    t("دو روز قبل از شروع"),
    t("سه روز قبل از شروع"),
    t("یک هفته قبل از شروع"),
    t("دو هفته قبل از شروع"),
  ];
  const productSendMethods = [t("دریایی"), t("هوایی"), t("زمینی"), t("قطار")];
  const productSendTypes = [t("فوری"), t("معمولی")];
  const partialSendings = [t("مجاز"), t("غیرمجاز")];
  const categories = [t("داخلی"), t("خارجی")];
  const paymentMethods = [t("بانک"), t("نقدی"), t("قسطی"), t("دیگر")];
  const paymentStates = [
    t("پرداخت شده"),
    t("پرداخت نشده"),
    t("بخشی پرداخت شده"),
  ];


  useEffect(() => {
    if (id != null) {
      axios.get(`${appConfig.BaseURL}/api/BuyOrder/${id}`).then((res) => {
        setBuyOrderDetail(res.data.data);
        setFileList1(res.data.data.files.map((item) => {
          let image = item.split(",")
          let imageName = image[0].split(":")
          return {
            fileName: imageName[1],
            file: `${image[1]},${image[2]}`
          }
        }))
        formik.setFieldValue("name", res.data.data.name);
        formik.setFieldValue("supplierID", res.data.data.supplierID);
        formik.setFieldValue("status", res.data.data.status);
        formik.setFieldValue("orderDate", res.data.data.orderDate);
        formik.setFieldValue("forOpportunity", res.data.data.forOpportunity);
        formik.setFieldValue("moneyUnit", res.data.data.moneyUnit);
        formik.setFieldValue("totalprice", res.data.data.totalprice);
        formik.setFieldValue("discount", res.data.data.discount);
        formik.setFieldValue("subset", res.data.data.subset);
        formik.setFieldValue("transport", res.data.data.transport);
        formik.setFieldValue("transportTax", res.data.data.transportTax);
        formik.setFieldValue("taxRate", res.data.data.taxRate);
        formik.setFieldValue("tax", res.data.data.tax);
        formik.setFieldValue("productList", JSON.parse(res.data.data.productList));
        setReciept(JSON.parse(res.data.data.productList))
        formik.setFieldValue("totalAmount", res.data.data.totalAmount);
        formik.setFieldValue("otherExpenses", res.data.data.otherExpenses);
        formik.setFieldValue("productSubTotal", res.data.data.productSubTotal);
        formik.setFieldValue("totalCount", res.data.data.totalCount);
        formik.setFieldValue("serviceSubTotal", res.data.data.serviceSubTotal);
        formik.setFieldValue("maturityDate", res.data.data.maturityDate);
        formik.setFieldValue("supplierReqNum", res.data.data.supplierReqNum);
        formik.setFieldValue("trackingNum", res.data.data.trackingNum);
        formik.setFieldValue("productSendMethod", res.data.data.productSendMethod);
        formik.setFieldValue("productSendType", res.data.data.productSendType);
        formik.setFieldValue("phasedDelivery", res.data.data.phasedDelivery);
        formik.setFieldValue("paymentMethod", res.data.data.paymentMethod);
        formik.setFieldValue("paymentStatus", res.data.data.paymentStatus);
        formik.setFieldValue("paymentDesc", res.data.data.paymentDesc);
        formik.setFieldValue("category", res.data.data.category);
        formik.setFieldValue("terms", res.data.data.terms);
        formik.setFieldValue("notes", res.data.data.notes);
        formik.setFieldValue("billSendGeoLoc", res.data.data.billSendGeoLoc);
        formik.setFieldValue("prodSendGeoLoc", res.data.data.prodSendGeoLoc);
        formik.setFieldValue("billCountry", res.data.data.billCountry);
        formik.setFieldValue("prodCountry", res.data.data.prodCountry);
        formik.setFieldValue("billState", res.data.data.billState);
        formik.setFieldValue("prodState", res.data.data.prodState);
        formik.setFieldValue("billCity", res.data.data.billCity);
        formik.setFieldValue("billPostalCode", res.data.data.billPostalCode);
        formik.setFieldValue("prodPostalCode", res.data.data.prodPostalCode);
        formik.setFieldValue("billAddress", res.data.data.billAddress);
        formik.setFieldValue("prodAddress", res.data.data.prodAddress);
        formik.setFieldValue("billLat", res.data.data.billLat);
        formik.setFieldValue("billLong", res.data.data.billLong);
        formik.setFieldValue("prodLat", res.data.data.prodLat);
        formik.setFieldValue("prodLong", res.data.data.prodLong);
      });
    }
  }, [id]);
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: "",
      supplierID: "",
      status: "",
      orderDate: new DateObject(),
      forOpportunity: "",
      moneyUnit: id != null ? "" : currencies[0],
      totalprice: 0,
      discount: 0,
      subset: 0,
      transport: 0,
      transportTax: 0,
      taxRate: "0%",
      tax: 0,
      productList: [],
      totalAmount: 0,
      otherExpenses: 0,
      productSubTotal: 0,
      totalCount: 0,
      serviceSubTotal: 0,
      customerReminder: "",
      maturityDate: new DateObject(),
      supplierReqNum: "",
      trackingNum: "",
      productSendMethod: "",
      productSendType: "",
      phasedDelivery: "",
      paymentMethod: "",
      paymentStatus: "",
      paymentDesc: "",
      category: "",
      terms: "",
      notes: "",
      files: "",
      billSendGeoLoc: "",
      prodSendGeoLoc: "",
      billCountry: "",
      prodCountry: "",
      billState: "",
      prodState: "",
      billCity: "",
      prodCity: "",
      billPostalCode: "",
      prodPostalCode: "",
      billAddress: "",
      prodAddress: "",
      billLat: "",
      billLong: "",
      prodLat: "",
      prodLong: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "نام سفارش باید شامل 30 حرف یا کمتر باشد")
        .required("نام سفارش الزامیست"),
        supplierID: Yup.string().required("مشخص کردن تامین‌کننده الزامیست"),
      status: Yup.string().required("مشخص کردن وضعیت سفارش الزامیست"),
      orderDate: Yup.string().required("مشخص کردن تاریخ سفارش خرید الزامیست"),
      maturityDate: Yup.string().required("مشخص کردن تاریخ سررسید الزامیست"),
      billPostalCode: Yup.string()
        .length(10, "کد پستی باید 10 رقم باشد")
        .matches(iranPostalCodeRegMatch, "کد پستی صحیح نیست"),
      prodPostalCode: Yup.string()
        .length(10, "کد پستی باید 10 رقم باشد")
        .matches(iranPostalCodeRegMatch, "کد پستی صحیح نیست"),
    }),
    onSubmit: (values) => {
        values.productList = JSON.stringify(values.productList);
        console.log("values", values);
        axios
          .post(`${appConfig.BaseURL}/api/BuyOrder`, values)
          .then((res) => setResult(res.data.data));
      purchaseOrderSub();
      callComponent();
    },
  });

  useEffect(() => {
    axios
      .get(`${appConfig.BaseURL}/api/Supplier`)
      .then((res) => setSuppliers(res.data.data));
  }, []);
  const purchaseOrderSub = () => {
    swal({
      title: t("سفارش خرید با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };
  function getOpportunityData(val) {
    formik.setFieldValue("forOpportunity", val.OpportunityName);
  }
  function clearOpportunityField() {
    formik.setFieldValue("forOpportunity", "");
  }
  function getInvoiceAddress(val) {
    formik.setFieldValue("billCountry", val[0]);
    formik.setFieldValue("billState", val[1]);
    formik.setFieldValue("billCity", val[2]);
    formik.setFieldValue("billSendGeoLoc", `${val[0]}-${val[1]}-${val[2]}`);
  }
  function clearInvoiceAddress() {
    formik.setFieldValue("billCountry", "");
    formik.setFieldValue("billState", "");
    formik.setFieldValue("billCity", "");
    formik.setFieldValue("billSendGeoLoc", "");
  }
  function getProductAddress(val) {
    formik.setFieldValue("prodCountry", val[0]);
    formik.setFieldValue("prodState", val[1]);
    formik.setFieldValue("prodCity", val[2]);
    formik.setFieldValue("prodSendGeoLoc", `${val[0]}-${val[1]}-${val[2]}`);
  }
  function clearProductAddress() {
    formik.setFieldValue("prodCountry", "");
    formik.setFieldValue("prodState", "");
    formik.setFieldValue("prodCity", "");
    formik.setFieldValue("prodSendGeoLoc", "");
  }

  const [invoiceLocation, SetInvoiceLocation] = useState({});
  const [invoiceAddress, SetInvoiceAddress] = useState();
  const [invoiceAddressLoading, SetInvoiceAddressLoading] = useState(false);
  function getInvoiceMapData(address, location) {
    SetInvoiceLocation(location);
    SetInvoiceAddress(address);
  }

  useEffect(() => {
    if (Object.keys(invoiceLocation).length) {
      formik.setFieldValue("billLat", invoiceLocation?.lat);
      formik.setFieldValue("billLong", invoiceLocation?.lng);
    }
  }, [invoiceLocation]);

  useEffect(() => {
    invoiceAddress && formik.setFieldValue("billAddress", invoiceAddress);
  }, [invoiceAddress]);

  const [productLocation, SetProductLocation] = useState({});
  const [productAddress, SetProductAddress] = useState();
  const [productAddressLoading, SetProductAddressLoading] = useState(false);
  function getProductMapData(address, location) {
    SetProductLocation(location);
    SetProductAddress(address);
  }

  useEffect(() => {
    if (Object.keys(productLocation).length) {
      formik.setFieldValue("prodLat", productLocation?.lat);
      formik.setFieldValue("prodLong", productLocation?.lng);
    }
  }, [productLocation]);

  useEffect(() => {
    productAddress && formik.setFieldValue("prodAddress", productAddress);
  }, [productAddress]);

  function CopyInvoiceToProduct() {
    formik.setFieldValue("prodSendGeoLoc", formik.values.billSendGeoLoc);
    formik.setFieldValue("prodCountry", formik.values.billCountry);
    formik.setFieldValue("prodState", formik.values.billState);
    formik.setFieldValue("prodCity", formik.values.billCity);
    formik.setFieldValue("billPostalCode", formik.values.billPostalCode);
    formik.setFieldValue("prodAddress", formik.values.billAddress);
    formik.setFieldValue("prodLat", formik.values.billLat);
    formik.setFieldValue("prodLong", formik.values.billLong);
  }

  function HandleTotalPriceChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("totalprice", parsFloatFunction(temp, 2));
  }
  function HandleDiscountChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("discount", parsFloatFunction(temp, 2));
  }
  function HandleSubsetChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("subset", parsFloatFunction(temp, 2));
  }
  function HandleTransportChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("transport", parsFloatFunction(temp, 2));
  }
  function HandleTransportTaxChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("transportTax", parsFloatFunction(temp, 2));
  }
  function HandleTaxChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("tax", parsFloatFunction(temp, 2));
  }
  function HandleTotalAmountChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("totalAmount", parsFloatFunction(temp, 2));
  }
  function HandleOtherExpensesChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("otherExpenses", parsFloatFunction(temp, 2));
  }
  function HandleProductSubTotalChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("productSubTotal", parsFloatFunction(temp, 2));
  }
  function HandleTotalCountChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("totalCount", parsFloatFunction(temp, 2));
  }
  function HandleServiceSubTotalChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("serviceSubTotal", parsFloatFunction(temp, 2));
  }

  useEffect(() => {
    if (fileList1.length) {
      setUploadError(false);
    }
  }, [fileList1]);

  useEffect(() => {
    if (formik.isSubmitting) {
      let panel1Condition = !!(
        (formik.touched.name && formik.errors.name) ||
        (formik.touched.supplierID && formik.errors.supplierID) ||
        (formik.touched.status && formik.errors.status) ||
        (formik.touched.orderDate && formik.errors.orderDate)
      );
      setPanel1(panel1Condition || panel1);

      let panel3Condition = !!(
        formik.touched.maturityDate && formik.errors.maturityDate
      );
      setPanel3(panel3Condition || panel3);

      let panel5Condition = !!(
        (formik.touched.billPostalCode && formik.errors.billPostalCode) ||
        (formik.touched.prodPostalCode && formik.errors.prodPostalCode)
      );
      setPanel5(panel5Condition || panel5);
    }
  }, [formik]);

  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [open2, setOpen2] = useState(false);

  const handleClickOpen = () => {
    setOpen2(true);
  };

  const [openmulti, setOpenMultiple] = useState(false);
  const handleClickOpenMultipleProducts = () => {
    setOpenMultiple(true);
  };

  const callComponent = () => {
    history.navigate(`/inventory-management/purchase-orders/PurchaseOrderManagement`);
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

  const clickArr = [
    t("نمایش جزئیات"),
    t("نمایش جزئیات بیشتر"),
    t("نمایش جزئیات کمتر"),
  ];

  const [count, setCount] = React.useState(0);
  const buttonText = clickArr[count % clickArr.length];
  const handleClick = () => setCount((c) => c + 1);

  const setFactorr = (val) => {
    setReciept([...reciept, val]);
  };

  const [difference, setDifference] = useState();

  const setchanges = (val) => {
    setDifference(val);
  };

  function updateFileList(list) {
    var typeArr = [];
    list.forEach((element) => {
      let sp = element.file.split(";");
      let type = sp[0].split(":");
      typeArr.push(
        JSON.stringify({
          FileName: element.fileName,
          FileFormat: type[1],
          File: element.file.replace(
            /^data:application\/(vnd.openxmlformats-officedocument.spreadsheetml.sheet|pdf|png|jpeg|jpg);base64,/,
            ""
          ),
        })
      );
    });
    formik.setFieldValue("files", typeArr);
  }
  const [run, setRun] = useState(0);

  React.useEffect(() => {
    if (reciept.length) {
      const sub = reciept?.reduce(
        (total, currentValue) =>
          (total = total + parseFloat(currentValue.subset)),
        0
      );
      const Discountresult = reciept?.reduce(
        (total, currentValue) =>
          (total = total + parseFloat(currentValue.discountAmount)),
        0
      );
      const total = reciept?.reduce(
        (total, currentValue) =>
          (total = total + parseFloat(currentValue.totalprice)),
        0
      );
      const tax = reciept?.reduce(
        (total, currentValue) =>
          (total =
            total +
            parseFloat(
              currentValue.taxamount * currentValue.PriceAfterDiscount
            )),
        0
      );
      const totalnumber = reciept?.reduce(
        (total, currentValue) =>
          (total = total + parseFloat(currentValue.MainUnit)),
        0
      );
      formik.setFieldValue("subset", parsFloatFunction(sub, 2) || 0);
      formik.setFieldValue("totalprice", parsFloatFunction(total, 2) || 0);
      formik.setFieldValue(
        "discount",
        parsFloatFunction(Discountresult, 2) || 0
      );
      formik.setFieldValue("tax", parsFloatFunction(tax, 2) || 0);
      formik.setFieldValue(
        "totalAmount",
        parsFloatFunction(totalnumber, 2) || 0
      );
    } else {
      formik.setFieldValue("subset", 0);
      formik.setFieldValue("totalprice", 0);
      formik.setFieldValue("discount", 0);
      formik.setFieldValue("tax", 0);
      formik.setFieldValue("totalAmount", 0);
    }
  }, [reciept, run]);

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

  React.useEffect(() => {
    let num = parseFloat(formik.values.taxRate.replace("%", ""));

    const res = (parseFloat(formik.values.transport) * num) / 100;
    formik.setFieldValue("transportTax", parsFloatFunction(res, 2) || 0);
  }, [formik.values.transport, formik.values.taxRate, reciept]);

  const [totalcount, setTotalCount] = useState(0);
  const [subproduct, setSubProduct] = useState();

  React.useEffect(() => {
    let productres =
      parseFloat(formik.values.totalprice) +
      parseFloat(formik.values.transport) +
      parseFloat(formik.values.transportTax) +
      parseFloat(formik.values.otherExpenses);

    setTotalCount(productres);

    let res =
      parseFloat(formik.values.totalprice) +
      parseFloat(formik.values.transport) +
      parseFloat(formik.values.transportTax);

    setSubProduct(res);
  }, [formik.values, reciept]);

  React.useEffect(() => {
    formik.setFieldValue("productList", reciept);
  }, [reciept]);

  React.useEffect(() => {
    formik.setFieldValue("totalCount", parsFloatFunction(totalcount, 2) || 0);
  }, [totalcount, reciept]);

  React.useEffect(() => {
    formik.setFieldValue("productSubTotal", subproduct || 0);
  }, [subproduct, reciept]);

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

  const [editdata, setEditdata] = useState();

  function getinfo(e) {
    setEditdata(e.data);
  }

  const renderContent = (e) => {
    return <EditProducts getedit={editdata} getdata={seteditval} />;
  };

  const [sentEditdata, setSentEditData] = useState();

  const seteditval = (e) => {
    setSentEditData(e);
  };

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

  // const onShowDragIconsChanged = (args) => {
  //     setShowDragIcons(args.value);
  // }

  return (
    <>
      <div id="form" style={{ display: "block", marginRight: "10px" }}>
        {/*<h1 className='main-title'>*/}
        {/*    {t("ایجاد سفارش خرید")}*/}
        {/*</h1>*/}
        <form onSubmit={formik.handleSubmit}>
          <Accordion expanded={panel1} onChange={handlePanel1()}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography style={{ color: `${theme.palette.text.primary}` }}>
                {t("اطلاعات سفارش خرید")}{" "}
              </Typography>
            </AccordionSummary>
            <div className="form-design">
              <div className="row">
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span>
                      {" "}
                      {t("نام")} <span className="star">*</span>{" "}
                    </span>
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
                      {formik.touched.name &&
                      formik.errors.name &&
                      !formik.values.name ? (
                        <div className="error-msg">{t(formik.errors.name)}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("شماره")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <input
                        className="form-input"
                        type="number"
                        id="number"
                        name="name"
                        style={{ width: "100%" }}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span>
                      {" "}
                      {t("تامین‌کننده")} <span className="star">*</span>{" "}
                    </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      {id != null && formik.values.supplierID != "" && (
                        <SelectBox
                          dataSource={suppliers}
                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                          onValueChanged={(e) => {
                            formik.setFieldValue("supplierID", e.value);
                          }}
                          defaultValue={formik.values.supplierID}
                          className="selectBox"
                          noDataText="اطلاعات یافت نشد"
                          placeholder=""
                          displayExpr="name"
                          valueExpr={"supplierID"}
                          name="supplierID"
                          id="supplierID"
                          searchEnabled
                          showClearButton
                          //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                        />
                      )}
                      {(!id ||
                        (id != null && formik.values.supplierID == "")) && (
                        <SelectBox
                          dataSource={suppliers}
                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                          onValueChanged={(e) => {
                            formik.setFieldValue(
                              "supplierID",
                              e.value.supplierID
                            );
                          }}
                          defaultValue={formik.values.supplierID}
                          className="selectBox"
                          noDataText="اطلاعات یافت نشد"
                          displayExpr="name"
                          placeholder=""
                          name="supplierID"
                          id="supplierID"
                          searchEnabled
                          showClearButton
                          //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                        />
                      )}
                      {formik.touched.supplier &&
                      formik.errors.supplier &&
                      !formik.values.supplier ? (
                        <div className="error-msg">
                          {t(formik.errors.supplier)}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span>
                      {" "}
                      {t("وضعیت")} <span className="star">*</span>{" "}
                    </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      {id != null && formik.values.status != "" && (
                          <SelectBox
                            dataSource={status}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("status", e.value);
                            }}
                            defaultValue={formik.values.status}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="status"
                            id="status"
                            searchEnabled
                            showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                          />
                        )}
                        {(!id || (id != null && formik.values.status == "")) && (
                          <SelectBox
                            dataSource={status}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("status", e.value);
                            }}
                            defaultValue={formik.values.status}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="status"
                            id="status"
                            searchEnabled
                            showClearButton
                          />
                        )}
                    </div>
                    {formik.touched.status &&
                    formik.errors.status &&
                    !formik.values.status ? (
                      <div className="error-msg">{t(formik.errors.status)}</div>
                    ) : null}
                  </div>
                </div>
                <div
                  className="content col-lg-6 col-md-6 col-xs-12"
                  onFocus={() => dateRef1?.current?.closeCalendar()}
                >
                  <div className="title">
                    <span> {t("برای فرصت")} </span>
                  </div>
                  <div className="wrapper">
                    <div className="d-flex" style={{ position: "relative" }}>
                      <input
                        className={`form-input modal-input ${
                          i18n.dir() === "ltr" ? "ltr" : ""
                        }`}
                        type="text"
                        id="forOpportunity"
                        name="forOpportunity"
                        style={{ width: "100%" }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.forOpportunity}
                        disabled
                      />
                      <div
                        className={`modal-action-button  ${
                          i18n.dir() === "ltr" ? "action-ltr" : ""
                        }`}
                      >
                        <OpportunityModal
                          className="modal"
                          getData={getOpportunityData}
                        />
                        <Button>
                          <CancelIcon onClick={clearOpportunityField} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span>
                      {" "}
                      {t("تاریخ سفارش خرید")} <span className="star">*</span>{" "}
                    </span>
                  </div>
                  <div className="wrapper date-picker position-relative">
                    <DatePicker
                      editable={false}
                      ref={dateRef1}
                      name="orderDate"
                      id="orderDate"
                      calendar={renderCalendarSwitch(i18n.language)}
                      locale={renderCalendarLocaleSwitch(i18n.language)}
                      calendarPosition="bottom-right"
                      onBlur={formik.handleBlur}
                      onChange={(val) => {
                        formik.setFieldValue(
                          "orderDate",
                          julianIntToDateTime(val.toJulianDay())
                        );
                      }}
                      value={getLangDate(i18n.language , formik.values.orderDate)}
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
                  {formik.touched.orderDate &&
                  formik.errors.orderDate &&
                  !formik.values.orderDate ? (
                    <div className="error-msg">
                      {t(formik.errors.orderDate)}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography style={{ color: `${theme.palette.text.primary}` }}>
                {t("ردیف محصولات")}{" "}
              </Typography>
            </AccordionSummary>
            <div className="form-design">
              <div className="row">
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
                <div className="content col-lg-6 col-md-6 col-xs-12"></div>
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
                    >
                      <div className="col-lg-auto col-sm-4 col-xs-6">
                        <Button
                          variant="contained"
                          size="medium"
                          color="primary"
                          onClick={handleClickOpen}
                        >
                          {" "}
                          {t("انتخاب محصول")}{" "}
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
                          disabled={!reciept.length}
                          size="medium"
                          color="primary"
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

                    <Dialog
                      open={open2}
                      fullWidth={fullWidth}
                      maxWidth={maxWidth}
                      dir={i18n.dir()}
                    >
                      <div
                        className={`modal-header ${
                          i18n.dir() === "ltr" ? "header-ltr" : ""
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
                        <SelectProducts
                          getdata={setFactorr}
                          supplierID={
                            formik.values.supplierID != ""
                              ? formik.values.supplierID
                              : null
                          }
                        />
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
                          i18n.dir() === "ltr" ? "header-ltr" : ""
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
                          supplierID={
                            formik.values.supplierID != ""
                              ? formik.values.supplierID
                              : null
                          }
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
                          i18n.dir() === "ltr" ? "header-ltr" : ""
                        }`}
                      >
                        <h2>{t("بارگذاری فایل")}</h2>
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
                          i18n.dir() === "ltr" ? "header-ltr" : ""
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
                          i18n.dir() === "ltr" ? "header-ltr" : ""
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
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <DataGrid
                            showBorders={true}
                            hoverStateEnabled={true}
                            keyExpr="id"
                            width={"100%"}
                            rtlEnabled={i18n.dir() === "ltr" ? false : true}
                            dataSource={reciept}
                            onRowRemoved={() => getDeleteChange(reciept)}
                            onSaved={getsave}
                            onEditingStart={getinfo}
                            scrolling={true}
                            noDataText={t("داده‌ای موجود نیست")}
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
                                confirmDeleteMessage={t("آیا مطمئن هستید؟")}
                                saveRowChanges={t("ذخیره")}
                                cancelRowChanges={t("لغو")}
                              />

                              <Popup
                                title={t("ویرایش محصول")}
                                height={"60vh"}
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
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("مجموع")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <CurrencyInput
                        className="form-input"
                        id="totalprice"
                        name="totalprice"
                        style={{ width: "100%" }}
                        decimalsLimit={2}
                        onChange={(e) => HandleTotalPriceChange(e.target.value)}
                        value={formik.values.totalprice}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("تخفیف")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <CurrencyInput
                        className="form-input"
                        id="discount"
                        name="discount"
                        style={{ width: "100%" }}
                        onChange={(e) => HandleDiscountChange(e.target.value)}
                        decimalsLimit={2}
                        value={formik.values.discount}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("زیرمجموع")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <CurrencyInput
                        className="form-input"
                        id="subset"
                        name="subset"
                        style={{ width: "100%" }}
                        onChange={(e) => HandleSubsetChange(e.target.value)}
                        decimalsLimit={2}
                        value={formik.values.subset}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("حمل")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <CurrencyInput
                        className="form-input"
                        id="transport"
                        name="transport"
                        style={{ width: "100%" }}
                        onChange={(e) => HandleTransportChange(e.target.value)}
                        decimalsLimit={2}
                      />
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("مالیات حمل")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <CurrencyInput
                        className="form-input"
                        id="transportTax"
                        name="transportTax"
                        style={{ width: "100%" }}
                        onChange={(e) =>
                          HandleTransportTaxChange(e.target.value)
                        }
                        decimalsLimit={2}
                        value={formik.values.transportTax}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span>‌</span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <SelectBox
                        dataSource={taxRates}
                        rtlEnabled={i18n.dir() === "ltr" ? false : true}
                        onValueChanged={(e) =>
                          formik.setFieldValue("taxRate", e.value)
                        }
                        className="selectBox"
                        noDataText={t("اطلاعات یافت نشد")}
                        itemRender={null}
                        placeholder=""
                        name="taxRate"
                        id="taxRate"
                        defaultValue={taxRates[0]}
                      />
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("مالیات")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <CurrencyInput
                        className="form-input"
                        id="tax"
                        name="tax"
                        style={{ width: "100%" }}
                        onChange={(e) => HandleTaxChange(e.target.value)}
                        decimalsLimit={2}
                        value={formik.values.tax}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("مجموع مقدار")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <CurrencyInput
                        className="form-input"
                        id="totalAmount"
                        name="totalAmount"
                        style={{ width: "100%" }}
                        onChange={(e) =>
                          HandleTotalAmountChange(e.target.value)
                        }
                        value={formik.values.totalAmount}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("خرج‌های دیگر")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <CurrencyInput
                        className="form-input"
                        id="otherExpenses"
                        name="otherExpenses"
                        style={{ width: "100%" }}
                        onChange={(e) =>
                          HandleOtherExpensesChange(e.target.value)
                        }
                        decimalsLimit={2}
                      />
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("زیرمجموع محصول")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <CurrencyInput
                        className="form-input"
                        id="productSubTotal"
                        name="productSubTotal"
                        style={{ width: "100%" }}
                        onChange={(e) =>
                          HandleProductSubTotalChange(e.target.value)
                        }
                        decimalsLimit={2}
                        value={formik.values.productSubTotal}
                        disabled
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
                        className="form-input"
                        id="totalCount"
                        name="totalCount"
                        style={{ width: "100%" }}
                        onChange={(e) => HandleTotalCountChange(e.target.value)}
                        decimalsLimit={2}
                        value={formik.values.totalCount}
                        disabled
                      />
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("زیرمجموع سرویس")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <CurrencyInput
                        className="form-input"
                        id="serviceSubTotal"
                        name="serviceSubTotal"
                        style={{ width: "100%" }}
                        onChange={(e) =>
                          HandleServiceSubTotalChange(e.target.value)
                        }
                        decimalsLimit={2}
                        value={formik.values.serviceSubTotal}
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion>
          <Accordion expanded={panel3} onChange={handlePanel3()}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography style={{ color: `${theme.palette.text.primary}` }}>
                {t("اطلاعات بیشتر")}{" "}
              </Typography>
            </AccordionSummary>
            <div className="form-design">
              <div className="row">
                <div
                  className="content col-lg-6 col-md-6 col-xs-12"
                  onFocus={() => dateRef2?.current?.closeCalendar()}
                >
                  <div className="title">
                    <span> {t("پیامک یادآوری به مشتری")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      {id != null && formik.values.customerReminder != "" && (
                          <SelectBox
                            dataSource={customerReminders}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("customerReminder", e.value);
                            }}
                            defaultValue={formik.values.customerReminder}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="customerReminder"
                            id="customerReminder"
                            searchEnabled
                            showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                          />
                        )}
                        {(!id || (id != null && formik.values.customerReminder == "")) && (
                          <SelectBox
                            dataSource={customerReminders}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("customerReminder", e.value);
                            }}
                            defaultValue={formik.values.customerReminder}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="customerReminder"
                            id="customerReminder"
                            searchEnabled
                            showClearButton
                          />
                        )}
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span>
                      {" "}
                      {t("تاریخ سررسید")}
                      <span className="star">*</span>{" "}
                    </span>
                  </div>
                  <div className="">
                    <div className="date-picker position-relative">
                      <DatePicker
                        editable={false}
                        ref={dateRef2}
                        name="maturityDate"
                        id="maturityDate"
                        calendar={renderCalendarSwitch(i18n.language)}
                        locale={renderCalendarLocaleSwitch(i18n.language)}
                        calendarPosition="bottom-right"
                        onBlur={formik.handleBlur}
                        onChange={(val) => {
                          formik.setFieldValue(
                            "maturityDate",
                            julianIntToDateTime(val.toJulianDay())
                          );
                        }}
                        value={getLangDate(i18n.language , formik.values.maturityDate)}
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
                    {formik.touched.maturityDate &&
                    formik.errors.maturityDate &&
                    !formik.values.maturityDate ? (
                      <div className="error-msg">
                        {t(formik.errors.maturityDate)}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div
                  className="content col-lg-6 col-md-6 col-xs-12"
                  onFocus={() => dateRef2?.current?.closeCalendar()}
                >
                  <div className="title">
                    <span> {t("شماره درخواست تامین‌کننده")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <input
                        className="form-input"
                        type="number"
                        id="supplierReqNum"
                        name="supplierReqNum"
                        style={{ width: "100%" }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.supplierReqNum}
                      />
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("شماره پیگیری")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <input
                        className="form-input"
                        type="number"
                        id="trackingNum"
                        name="trackingNum"
                        style={{ width: "100%" }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.trackingNum}
                      />
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("نحوه ارسال کالا")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      {id != null && formik.values.productSendMethod != "" && (
                          <SelectBox
                            dataSource={productSendMethods}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
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
                        {(!id || (id != null && formik.values.productSendMethod == "")) && (
                          <SelectBox
                            dataSource={productSendMethods}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
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
                          />
                        )}
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("نوع ارسال کالا")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      {id != null && formik.values.productSendType != "" && (
                          <SelectBox
                            dataSource={productSendTypes}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
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
                        {(!id || (id != null && formik.values.productSendType == "")) && (
                          <SelectBox
                            dataSource={productSendTypes}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
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
                          />
                        )}
                    </div>
                  </div>
                </div>

                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("ارسال مرحله‌ای")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      {id != null && formik.values.phasedDelivery != "" && (
                          <SelectBox
                            dataSource={partialSendings}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("phasedDelivery", e.value);
                            }}
                            defaultValue={formik.values.phasedDelivery}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="phasedDelivery"
                            id="phasedDelivery"
                            searchEnabled
                            showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                          />
                        )}
                        {(!id || (id != null && formik.values.phasedDelivery == "")) && (
                          <SelectBox
                            dataSource={partialSendings}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("phasedDelivery", e.value);
                            }}
                            defaultValue={formik.values.phasedDelivery}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="phasedDelivery"
                            id="phasedDelivery"
                            searchEnabled
                            showClearButton
                          />
                        )}
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("دسته")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      {id != null && formik.values.category != "" && (
                          <SelectBox
                            dataSource={categories}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("category", e.value);
                            }}
                            defaultValue={formik.values.category}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="category"
                            id="category"
                            searchEnabled
                            showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                          />
                        )}
                        {(!id || (id != null && formik.values.category == "")) && (
                          <SelectBox
                            dataSource={categories}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("category", e.value);
                            }}
                            defaultValue={formik.values.category}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="category"
                            id="category"
                            searchEnabled
                            showClearButton
                          />
                        )}
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("روش پرداخت")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      {id != null && formik.values.paymentMethod != "" && (
                          <SelectBox
                            dataSource={paymentMethods}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("paymentMethod", e.value);
                            }}
                            defaultValue={formik.values.paymentMethod}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="paymentMethod"
                            id="paymentMethod"
                            searchEnabled
                            showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                          />
                        )}
                        {(!id || (id != null && formik.values.paymentMethod == "")) && (
                          <SelectBox
                            dataSource={paymentMethods}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("paymentMethod", e.value);
                            }}
                            defaultValue={formik.values.paymentMethod}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="paymentMethod"
                            id="paymentMethod"
                            searchEnabled
                            showClearButton
                          />
                        )}
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("وضعیت پرداخت")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      {id != null && formik.values.paymentStatus != "" && (
                          <SelectBox
                            dataSource={paymentStates}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("paymentStatus", e.value);
                            }}
                            defaultValue={formik.values.paymentStatus}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="paymentStatus"
                            id="paymentStatus"
                            searchEnabled
                            showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                          />
                        )}
                        {(!id || (id != null && formik.values.paymentStatus == "")) && (
                          <SelectBox
                            dataSource={paymentStates}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("paymentStatus", e.value);
                            }}
                            defaultValue={formik.values.paymentStatus}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="paymentStatus"
                            id="paymentStatus"
                            searchEnabled
                            showClearButton
                          />
                        )}
                    </div>
                  </div>
                </div>
                <div className="content col-lg-12 col-md-12 col-xs-12">
                  <div className="title">
                    <span> {t("توضیحات پرداخت")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <textarea
                        className="form-input"
                        id="paymentDesc"
                        name="paymentDesc"
                        style={{ width: "100%" }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.paymentDesc}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion>
          <Accordion expanded={panel4} onChange={handlePanel4()}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel4-content"
              id="panel4-header"
            >
              <Typography style={{ color: `${theme.palette.text.primary}` }}>
                {t("توضیحات")}{" "}
              </Typography>
            </AccordionSummary>
            <div className="form-design">
              <div className="row">
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("شرایط و ضوابط")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <textarea
                        className="form-input"
                        id="terms"
                        name="terms"
                        style={{ width: "100%" }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.terms}
                      />
                    </div>
                  </div>
                </div>
                <div className="content col-lg-6 col-md-6 col-xs-12">
                  <div className="title">
                    <span> {t("یادداشت")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <textarea
                        className="form-input"
                        id="notes"
                        name="notes"
                        style={{ width: "100%" }}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.notes}
                      />
                    </div>
                  </div>
                </div>
                <div className="content col-lg-12 col-md-12 col-xs-12">
                  <div className="title">
                    <span className="span"> {t("افزودن فایل")} </span>
                  </div>
                  <div className="wrapper">
                    <div>
                      <UploadFile
                        title={t("بارگذاری فایل")}
                        multiple={true}
                        uploadError={uploadError}
                        updateFileList={updateFileList}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion>
          <Accordion expanded={panel5} onChange={handlePanel5()}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel5-content"
              id="panel5-header"
            >
              <Typography style={{ color: `${theme.palette.text.primary}` }}>
                {t("آدرس")}{" "}
              </Typography>
            </AccordionSummary>
            <div
              style={{ backgroundColor: `${theme.palette.background.paper}` }}
            >
              <div className="form-design">
                <div className="row">
                  <div className="col-md-6 col-12">
                    <div className="row">
                      <div className="content col-12">
                        <div className="title">
                          <span> {t("منطقه جغرافیایی ارسال صورت حساب")} </span>
                        </div>
                        <div className="wrapper">
                          <div
                            className="d-flex"
                            style={{ position: "relative" }}
                          >
                            <input
                              className={`form-input modal-input ${
                                i18n.dir() === "ltr" ? "ltr" : ""
                              }`}
                              type="text"
                              id="billSendGeoLoc"
                              name="billSendGeoLoc"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.billSendGeoLoc}
                              disabled
                            />
                            <div
                              className={`modal-action-button  ${
                                i18n.dir() === "ltr" ? "action-ltr" : ""
                              }`}
                            >
                              <CountryTreeView
                                className="modal"
                                getAddress={getInvoiceAddress}
                              />
                              <Button>
                                <CancelIcon onClick={clearInvoiceAddress} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="content col-12">
                        <div className="title">
                          <span> {t("کشور")} </span>
                        </div>
                        <div className="wrapper">
                          <div>
                            <input
                              className="form-input"
                              type="text"
                              id="billCountry"
                              name="billCountry"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.billCountry}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="content col-12">
                        <div className="title">
                          <span> {t("استان")} </span>
                        </div>
                        <div className="wrapper">
                          <div>
                            <input
                              className="form-input"
                              type="text"
                              id="billState"
                              name="billState"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.billState}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="content col-12">
                        <div className="title">
                          <span> {t("شهر")} </span>
                        </div>
                        <div className="wrapper">
                          <div>
                            <input
                              className="form-input"
                              type="text"
                              id="billCity"
                              name="billCity"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.billCity}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="content col-12">
                        <div className="title">
                          <span> {t("کد پستی")} </span>
                        </div>
                        <div className="wrapper">
                          <div>
                            <input
                              className="form-input"
                              type="text"
                              id="billPostalCode"
                              name="billPostalCode"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.billPostalCode}
                            />
                            {formik.touched.billPostalCode &&
                            formik.errors.billPostalCode ? (
                              <div className="error-msg">
                                {t(formik.errors.billPostalCode)}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="content col-12">
                        <div className="title">
                          <span> {t("آدرس")} </span>
                        </div>
                        <div className="wrapper">
                          <div>
                            <textarea
                              className="form-input"
                              type="text"
                              id="billAddress"
                              name="billAddress"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.billAddress}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="content col-12 position-relative">
                        {invoiceAddressLoading ? (
                          <div className="loading-sec">
                            <CircularProgress />
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="row align-items-center">
                          <div className="content col-sm-5 col-xs-12">
                            <div className="title">
                              <span> {t("عرض جغرافیایی")} </span>
                            </div>
                            <div className="wrapper">
                              <div
                                className="d-flex"
                                style={{ position: "relative" }}
                              >
                                <input
                                  className="form-input"
                                  type="text"
                                  id="billLong"
                                  name="billLong"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.billLong}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="content col-sm-5 col-xs-12">
                            <div className="title">
                              <span> {t("طول جغرافیایی")} </span>
                            </div>
                            <div className="wrapper">
                              <div
                                className="d-flex"
                                style={{ position: "relative" }}
                              >
                                <input
                                  className="form-input"
                                  type="text"
                                  id="billLat"
                                  name="billLat"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.billLat}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="content col-sm-2 col-xs-12 d-flex justify-content-end">
                            <div className="title">
                              <span> ‌ </span>
                            </div>
                            <div
                              className="wrapper"
                              style={{ position: "relative" }}
                            >
                              <div
                                className={`modal-action-button  ${
                                  i18n.dir() === "ltr" ? "action-ltr" : ""
                                }`}
                              >
                                <MyMap
                                  defaultLoc={invoiceLocation}
                                  setAddressLoading={SetInvoiceAddressLoading}
                                  getMapData={getInvoiceMapData}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="row">
                      <div className="content col-12">
                        <div className="title">
                          <span> {t("منطقه جغرافیایی ارسال محصول")} </span>
                        </div>
                        <div className="wrapper">
                          <div
                            className="d-flex"
                            style={{ position: "relative" }}
                          >
                            <input
                              className={`form-input modal-input ${
                                i18n.dir() === "ltr" ? "ltr" : ""
                              }`}
                              type="text"
                              id="prodSendGeoLoc"
                              name="prodSendGeoLoc"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.prodSendGeoLoc}
                              disabled
                            />
                            <div
                              className={`modal-action-button  ${
                                i18n.dir() === "ltr" ? "action-ltr" : ""
                              }`}
                            >
                              <CountryTreeView
                                className="modal"
                                getAddress={getProductAddress}
                              />
                              <Button>
                                <CancelIcon onClick={clearProductAddress} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="content col-12">
                        <div className="title">
                          <span> {t("کشور")} </span>
                        </div>
                        <div className="wrapper">
                          <div>
                            <input
                              className="form-input"
                              type="text"
                              id="prodCountry"
                              name="prodCountry"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.prodCountry}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="content col-12">
                        <div className="title">
                          <span> {t("استان")} </span>
                        </div>
                        <div className="wrapper">
                          <div>
                            <input
                              className="form-input"
                              type="text"
                              id="prodState"
                              name="prodState"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.prodState}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="content col-12">
                        <div className="title">
                          <span> {t("شهر")} </span>
                        </div>
                        <div className="wrapper">
                          <div>
                            <input
                              className="form-input"
                              type="text"
                              id="prodCity"
                              name="prodCity"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.prodCity}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="content col-12">
                        <div className="title">
                          <span> {t("کد پستی")} </span>
                        </div>
                        <div className="wrapper">
                          <div>
                            <input
                              className="form-input"
                              type="text"
                              id="prodPostalCode"
                              name="prodPostalCode"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.prodPostalCode}
                            />
                            {formik.touched.prodPostalCode &&
                            formik.errors.prodPostalCode ? (
                              <div className="error-msg">
                                {t(formik.errors.prodPostalCode)}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="content col-12">
                        <div className="title">
                          <span> {t("آدرس حمل")} </span>
                        </div>
                        <div className="wrapper">
                          <div>
                            <textarea
                              className="form-input"
                              type="text"
                              id="prodAddress"
                              name="prodAddress"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.prodAddress}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="content col-12 position-relative">
                        {productAddressLoading ? (
                          <div className="loading-sec">
                            <CircularProgress />
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="row align-items-center">
                          <div className="content col-sm-5 col-xs-12">
                            <div className="title">
                              <span> {t("عرض جغرافیایی")} </span>
                            </div>
                            <div className="wrapper">
                              <div
                                className="d-flex"
                                style={{ position: "relative" }}
                              >
                                <input
                                  className="form-input"
                                  type="text"
                                  id="prodLong"
                                  name="prodLong"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.prodLong}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="content col-sm-5 col-xs-12">
                            <div className="title">
                              <span> {t("طول جغرافیایی")} </span>
                            </div>
                            <div className="wrapper">
                              <div
                                className="d-flex"
                                style={{ position: "relative" }}
                              >
                                <input
                                  className="form-input"
                                  type="text"
                                  id="prodLat"
                                  name="prodLat"
                                  style={{ width: "100%" }}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  value={formik.values.prodLat}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="content col-sm-2 col-xs-12 d-flex justify-content-end">
                            <span> ‌ </span>
                            <div
                              className="wrapper"
                              style={{ position: "relative" }}
                            >
                              <div
                                className={`modal-action-button  ${
                                  i18n.dir() === "ltr" ? "action-ltr" : ""
                                }`}
                              >
                                <MyMap
                                  defaultLoc={productLocation}
                                  setAddressLoading={SetProductAddressLoading}
                                  getMapData={getProductMapData}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12" />
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="wrapper">
                      <div>
                        <Button
                          variant="contained"
                          className="copy-btn"
                          onClick={CopyInvoiceToProduct}
                        >
                          {t("کپی از فیلد صورت‌حساب")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion>
          <div className="button-pos">
            <Button
              variant="contained"
              color="success"
              type="button"
              onClick={id != null ? updateBuyOrder : formik.handleSubmit}
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
      </div>
    </>
  );
};
export default PurchaseOrderCreation;
