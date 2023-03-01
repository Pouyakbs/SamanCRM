import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Button,
  Checkbox,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import swal from "sweetalert";
import * as Yup from "yup";
import CategoryModal from "../../../components/Modals/Ghafourian_CategoryModal/CategoryModal";
import CancelIcon from "@mui/icons-material/Cancel";
import UserModal from "../../../components/Modals/Ghafourian_UserModal/UserModal";
import DatePicker from "react-multi-date-picker";
import UploadFile from "../../../components/UploadComponent/UploadFile";
import { julianIntToDateTime } from "../../../utils/dateConvert";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSearchParams } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CurrencyInput from "react-currency-input-field";
import { SelectBox } from "devextreme-react";
import { history } from "../../../utils/history";
import { parsFloatFunction } from "../../../utils/parsFloatFunction";
import {
  renderCalendarLocaleSwitch,
  renderCalendarSwitch,
} from "../../../utils/calenderLang";
import axios from "axios";
import DateObject from "react-date-object";
import { getLangDate } from "../../../utils/getLangDate";

const Product = [];
export const ProductCreation = () => {
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const appConfig = window.globalConfig;
  const { t, i18n } = useTranslation();
  const [result, setResult] = useState();
  const [productCategory, setProductCategory] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [productImageList, setProductImageList] = useState([]);
  const [productFileList, setProductFileList] = useState([]);
  const [productBarcodeList, setProductBarcodeList] = useState([]);
  const [alignment, setAlignment] = React.useState("");
  const updateProduct = (values) => {
    console.log("allValues", formik.values); 
    if (values != null) {
      let isSuccess = false;
      axios
        .put(`${appConfig.BaseURL}/api/Products/Update/${id}`, formik.values)
        .then((res) => {
          setResult(res.data);
          isSuccess = true;
        })
        .finally(() => {
          if ((isSuccess = true)) {
            history.navigate(`/inventory-management/product/ProductManagement`);
          }
        });
    }
  };



let def=[]

  useEffect(() => {
    if (id != null) {
      axios.get(`${appConfig.BaseURL}/api/products/${id}`).then((res) => {
        setProductDetail(res.data.data);
        setProductImageList(res.data.data.productImage.map((item) => {
          let image = item.split(",")
          let imageName = image[0].split(":")
          return {
            fileName: imageName[1],
            file: `${image[1]},${image[2]}`
          }
        }))
        console.log("here----------------" , res.data.data.productImage)
        setProductFileList(res.data.data.productFiles.map((item) => {
          let image = item.split(",")
          let imageName = image[0].split(":")
          return {
            fileName: imageName[1],
            file: `${image[1]},${image[2]}`
          }
        }))
        setProductBarcodeList(res.data.data.barcodeImage.map((item) => {
          let image = item.split(",")
          let imageName = image[0].split(":")
          return {
            fileName: imageName[1],
            file: `${image[1]},${image[2]}`
          }
        }))
        formik.setFieldValue("productName", res.data.data.productName);
        formik.setFieldValue("status", res.data.data.status);
        formik.setFieldValue("type", res.data.data.type);
        formik.setFieldValue("parentCategory", res.data.data.parentCategory);
        formik.setFieldValue("brand", res.data.data.brand);
        formik.setFieldValue("productCode", res.data.data.productCode);
        formik.setFieldValue("categoryID", res.data.data.categoryID);
        formik.setFieldValue("hoursCount", res.data.data.hoursCount);
        formik.setFieldValue("moneyUnit", res.data.data.moneyUnit);
        formik.setFieldValue("salePrice", res.data.data.salePrice);
        formik.setFieldValue("purchasePrice", res.data.data.purchasePrice);
        formik.setFieldValue("mainMeasurement", res.data.data.mainMeasurement);
        formik.setFieldValue(
          "secondMeasurement",
          res.data.data.secondMeasurement
        );
        formik.setFieldValue("batchNum", res.data.data.batchNum);
        formik.setFieldValue("serialNum", res.data.data.serialNum);
        formik.setFieldValue("latNum", res.data.data.latNum);
        formik.setFieldValue("validityDate", res.data.data.validityDate);
        formik.setFieldValue("productURL", res.data.data.productURL);
        formik.setFieldValue("barcode", res.data.data.barcode);
        formik.setFieldValue("invoiceType", res.data.data.invoiceType);
        formik.setFieldValue("saleable", res.data.data.saleable);
        formik.setFieldValue(
          "needProductReturn",
          res.data.data.needProductReturn
        );
        formik.setFieldValue("length", res.data.data.length);
        formik.setFieldValue("width", res.data.data.width);
        formik.setFieldValue("height", res.data.data.height);
        formik.setFieldValue("netWeight", res.data.data.netWeight);
        formik.setFieldValue("grossWeight", res.data.data.grossWeight);
        formik.setFieldValue("pocketNum", res.data.data.pocketNum);
        formik.setFieldValue("desc", res.data.data.desc);
        formik.setFieldValue("numPerUnit", res.data.data.numPerUnit);
        formik.setFieldValue("storeInventory", res.data.data.storeInventory);
        formik.setFieldValue("orderRate", res.data.data.orderRate);
        formik.setFieldValue(
          "availableForSale",
          res.data.data.availableForSale
        );
        formik.setFieldValue("safetyStock", res.data.data.safetyStock);
        formik.setFieldValue("pursuer", res.data.data.pursuer);
      });
    }
  }, [id]);
  const theme = useTheme();
  const [product, SetProduct] = React.useState(Product);

  const [fileList, setFileList] = useState([]);
  const [uploadError, setUploadError] = useState(false);
  const [barcodeImage, setBarcodeImage] = useState([]);

  const [panel1, setPanel1] = useState(true);
  const [panel2, setPanel2] = useState(true);
  const [panel6, setPanel6] = useState(true);

  const dateRef = useRef();

  const handlePanel1 = () => (event, newExpanded) => {
    setPanel1(newExpanded);
  };
  const handlePanel2 = () => (event, newExpanded) => {
    setPanel2(newExpanded);
  };
  const handlePanel6 = () => (event, newExpanded) => {
    setPanel6(newExpanded);
  };

  function updateFileList(list) {
    var typeArr = []
    list.forEach(element => {
      let sp=element.file.split(';')
      let type=sp[0].split(':')
      typeArr.push(JSON.stringify({
        FileName: element.fileName,
        FileFormat: type[1],
        File: element.file.replace(/^data:application\/(vnd.openxmlformats-officedocument.spreadsheetml.sheet|pdf|png|jpeg|jpg);base64,/, ''),
      }))
    });
    formik.setFieldValue("productFiles" , typeArr)
  }
  function updateProductImageList(list) {
    console.log("photos" , list)
    var typeArr = []
    list.forEach(element => {
      let sp=element.file.split(';')
      let type=sp[0].split(':')
      typeArr.push(JSON.stringify({
        FileName: element.fileName,
        FileFormat: type[1],
        File: element.file.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''),
      }))
    });
    formik.setFieldValue("productImage" , typeArr)
  }
  function updateBarcodeImage(list) {
    var typeArr = []
    list.forEach(element => {
      let sp=element.file.split(';')
      let type=sp[0].split(':')
      typeArr.push(JSON.stringify({
        FileName: element.fileName,
        FileFormat: type[1],
        File: element.file.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''),
      }))
    });
    formik.setFieldValue("barcodeImage" , typeArr)
  }
  useEffect(() => {
    axios
      .get(`${appConfig.BaseURL}/api/ProductCategory`)
      .then((res) => setProductCategory(res.data.data));
  }, []);
  const urlRegMatch =
    /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
  const priceRegMatch = /^[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
  const inventoryRegMatch = /^[+]?\d*$/;
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      productID: 0,
      productName: "",
      status: id != null ? "" : "فعال",
      type: id != null ? "" : "محصول",
      brand: "",
      productCode: "",
      categoryID: 0,
      hoursCount: 0,
      moneyUnit: id != null ? "" : "Rial : ریال",
      salePrice: 0,
      purchasePrice: 0,
      mainMeasurement: id != null ? "" : "جعبه",
      secondMeasurement: "",
      batchNum: "",
      serialNum: "",
      latNum: "",
      validityDate: new DateObject(),
      productURL: "",
      productImage: "",
      barcode: "",
      barcodeImage: "",
      invoiceType: "",
      saleable: false,
      needProductReturn: false,
      productFiles: "",
      length: 0,
      width: 0,
      height: 0,
      netWeight: 0,
      grossWeight: 0,
      pocketNum: 0,
      desc: "",
      numPerUnit: "",
      storeInventory: "",
      orderRate: "",
      availableForSale: "",
      safetyStock: "",
      pursuer: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string()
        .max(30, "نام محصول باید شامل 30 حرف یا کمتر باشد")
        .required("نام محصول الزامیست"),
      brand: Yup.string().max(30, "نام برند باید شامل 30 حرف یا کمتر باشد"),
      mainMeasurement: Yup.string()
        .required("ثبت حداقل یک واحد اندازه‌گیری الزامیست")
        .nullable(true),
      hoursCount: Yup.string().matches(
        priceRegMatch,
        ".تعداد ساعت نمی‌تواند منفی بوده یا شامل کاراکتری غیر از جداکننده اعشاری (.) باشد"
      ),
      productURL: Yup.string().matches(
        urlRegMatch,
        "آدرس وارد شده نامعتبر است"
      ),
      latNum: Yup.string().matches(
        inventoryRegMatch,
        "شماره لات نمی‌تواند منفی،اعشاری یا غیر عدد باشد"
      ),
      validityDate: Yup.string().required("مشخص کردن تاریخ انقضا الزامیست"),
      numPerUnit: Yup.string().matches(
        inventoryRegMatch,
        "تعداد کالا نمی‌تواند منفی،اعشاری یا غیر عدد باشد"
      ),
      storeInventory: Yup.string().matches(
        inventoryRegMatch,
        "موجودی نمی‌تواند منفی،اعشاری یا غیر عدد باشد"
      ),
      orderRate: Yup.string().matches(
        inventoryRegMatch,
        "میزان سفارش نمی‌تواند منفی،اعشاری یا غیر عدد باشد"
      ),
      availableForSale: Yup.string().matches(
        inventoryRegMatch,
        "موجودی نمونه نمی‌تواند منفی،اعشاری یا غیر عدد باشد"
      ),
      safetyStock: Yup.string().matches(
        inventoryRegMatch,
        "ذخیره احتیاطی نمی‌تواند منفی،اعشاری یا غیر عدد باشد"
      ),
    }),
    onSubmit: (values) => {
      let allValues = values;
      values.hoursCount = parseInt(values.hoursCount);
      // if (values.productImage.length != 0) {
        // var image = convertToBase64(values.productImage[0]);
        // image.then((val) => values.productImage == val)
      // }
      console.log("all values", values);
      // axios req with allValues
      axios
        .post(`${appConfig.BaseURL}/api/Products`, values)
        .then((res) => setResult(res.data.data));
      productSub();
      callComponent();
      // }
    },
  });
  const productSub = () => {
    swal({
      title: t("محصول با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };
  const productError = () => {
    swal({
      title: t("لطفا اطلاعات الزامی را تکمیل کنید"),
      icon: "error",
      button: t("باشه"),
    });
  };

  function HandleSalePriceChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("salePrice", parsFloatFunction(temp, 2));
  }
  function HandlePurchasePriceChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("purchasePrice", parsFloatFunction(temp, 2));
  }

  function HandleGrossWeightChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("grossWeight", parsFloatFunction(temp, 2));
  }
  function HandleNetWeightChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("netWeight", parsFloatFunction(temp, 2));
  }
  function HandleHeightChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("height", parsFloatFunction(temp, 2));
  }
  function HandleWidthChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("width", parsFloatFunction(temp, 2));
  }
  function HandleLengthChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("length", parsFloatFunction(temp, 2));
  }
  const callComponent = () => {
    history.navigate(`/inventory-management/product/ProductManagement`);
  };
  useEffect(() => {
    if (formik.isSubmitting) {
      let panel1Condition = !!(
        (formik.touched.productName && formik.errors.productName) ||
        (formik.touched.mainMeasurement && formik.errors.mainMeasurement) ||
        (formik.touched.brand && formik.errors.brand) ||
        (formik.touched.hoursCount && formik.errors.hoursCount)
      );
      setPanel1(panel1Condition || panel1);

      let panel2Condition = !!(
        (formik.touched.productURL && formik.errors.productURL) ||
        (formik.touched.latNum && formik.errors.latNum) ||
        (formik.touched.validityDate && formik.errors.validityDate)
      );
      setPanel2(panel2Condition || panel2);

      let panel6Condition = !!(
        (formik.touched.numPerUnit && formik.errors.numPerUnit) ||
        (formik.touched.storeInventory && formik.errors.storeInventory) ||
        (formik.touched.orderRate && formik.errors.orderRate) ||
        (formik.touched.availableForSale && formik.errors.availableForSale) ||
        (formik.touched.safetyStock && formik.errors.safetyStock)
      );
      setPanel6(panel6Condition || panel6);
    }
  }, [formik]);

  function getPursuerData(val) {
    formik.setFieldValue("pursuer", val.Name);
    console.log(formik.values.pursuer);
  }
  function clearPursuerField() {
    formik.setFieldValue("pursuer", "");
  }

  const measurementUnits = [
    t("جعبه"),
    t("دستگاه"),
    t("ساعت"),
    t("شاخه"),
    t("عدد"),
    t("کارتن"),
    t("کیلوگرم"),
    t("لیتر"),
    t("متر"),
    t("متر مربع"),
    t("ورقه"),
    t("ماه"),
  ];
  const states = [t("فعال"), t("غیرفعال")];
  const types = [t("محصول"), t("خدمت"), t("هزینه")];
  const currencies = ["Rial : ریال", "Dollar : $", "Euro : €"];
  const invoiceTypes = [t("دوره‌ای"), t("یک بار")];
  const countVariables = [
    t("ارتفاع"),
    t("تعداد"),
    t("روز"),
    t("ساعت"),
    t("طول"),
    t("عرض"),
    t("کاربر"),
    t("کیلوگرم"),
    t("ماه"),
    t("مگابیت"),
  ];
  console.log("productImageList" , productImageList)
  return (
    <>
      <div id="form" style={{ display: "block", marginRight: "10px" }}>
        {/*<h1 className='main-title'>*/}
        {/*    {t("ایجاد محصول")}*/}
        {/*</h1>*/}
        <form onSubmit={formik.handleSubmit} noValidate>
          <Accordion expanded={panel1} onChange={handlePanel1()}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography style={{ color: `${theme.palette.text.primary}` }}>
                {t("اطلاعات محصول")}{" "}
              </Typography>
            </AccordionSummary>
            <div
              style={{
                backgroundColor: `${theme.palette.background.paper}`,
              }}
            >
              <div className="form-design">
                <div className="row">
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span>
                        {" "}
                        {t("نام محصول")} <span className="star">*</span>
                      </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <input
                          className="form-input"
                          type="text"
                          id="productName"
                          name="productName"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.productName}
                        />
                        {formik.touched.productName &&
                        formik.errors.productName &&
                        !formik.values.productName ? (
                          <div className="error-msg">
                            {t(formik.errors.productName)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("وضعیت")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        {id != null && formik.values.status != "" && (
                          <SelectBox
                            dataSource={states}
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
                            dataSource={states}
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
                            defaultValue={states[0]}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("نوع")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        {id != null && formik.values.type != "" && (
                          <SelectBox
                            dataSource={types}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              console.log("------e111", e);
                              formik.setFieldValue("type", e.value);
                            }}
                            defaultValue={formik.values.type}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="type"
                            id="type"
                            searchEnabled
                            showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                          />
                        )}
                        {(!id || (id != null && formik.values.type == "")) && (
                          <SelectBox
                            dataSource={types}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              console.log("------e555555555555", e);
                              formik.setFieldValue("type", e.value);
                            }}
                            defaultValue={formik.values.type}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="type"
                            id="type"
                            searchEnabled
                            showClearButton
                            defaultValue={types[0]}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("نام برند")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <input
                          className="form-input"
                          type="text"
                          id="brand"
                          name="brand"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.brand}
                        />
                        {formik.touched.brand && formik.errors.brand ? (
                          <div className="error-msg">
                            {t(formik.errors.brand)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("کد محصول")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <input
                          className="form-input"
                          type="text"
                          id="productCode"
                          name="productCode"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.productCode}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("دسته محصول")} </span>
                    </div>
                    <div className="wrapper">
                      {id != null && formik.values.categoryID != "" && (
                        <SelectBox
                          dataSource={productCategory}
                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                          onValueChanged={(e) => {
                            formik.setFieldValue(
                              "categoryID",
                              e.value
                            );
                          }}
                          defaultValue={formik.values.categoryID}
                          className="selectBox"
                          noDataText="اطلاعات یافت نشد"
                          placeholder=""
                          displayExpr="categoryName"
                          valueExpr={"categoryID"}
                          name="categoryID"
                          id="categoryID"
                          searchEnabled
                          showClearButton
                          //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                        />
                      )}
                      {(!id ||
                        (id != null && formik.values.categoryID == "")) && (
                        <SelectBox
                          dataSource={productCategory}
                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                          onValueChanged={(e) => {
                            formik.setFieldValue(
                              "categoryID",
                              e.value.categoryID
                            );
                          }}
                          defaultValue={formik.values.categoryID}
                          className="selectBox"
                          noDataText="اطلاعات یافت نشد"
                          displayExpr="categoryName"
                          placeholder=""
                          name="categoryID"
                          id="categoryID"
                          searchEnabled
                          showClearButton
                          //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                        />
                      )}
                      {formik.touched.categoryID &&
                      formik.errors.categoryID &&
                      !formik.values.categoryID ? (
                        <div className="error-msg">
                          {t(formik.errors.categoryID)}
                        </div>
                      ) : null}
                    </div>
                  </div>
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
                              console.log("------e111", e);
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
                              console.log("------e555555555555", e);
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
                            defaultValue={currencies[0]}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("قیمت فروش")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <CurrencyInput
                          className="form-input"
                          style={{ width: "100%" }}
                          id="salePrice"
                          name="salePrice"
                          decimalsLimit={2}
                          onBlur={formik.handleBlur}
                          value={formik.values.salePrice}
                          onChange={(e) => {
                            HandleSalePriceChange(e.target.value)
                          }}
                          onChangeCapture={formik.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("قیمت خرید")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <CurrencyInput
                          className="form-input"
                          style={{ width: "100%" }}
                          id="purchasePrice"
                          name="purchasePrice"
                          decimalsLimit={2}
                          onBlur={formik.handleBlur}
                          value={formik.values.purchasePrice}
                          onChangeCapture={formik.handleChange}
                          onChange={(e) =>
                            HandlePurchasePriceChange(e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span>
                        {" "}
                        {t("واحد اندازه‌گیری اصلی")}{" "}
                        <span className="star">*</span>
                      </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        {id != null && formik.values.mainMeasurement != "" && (
                          <SelectBox
                            dataSource={measurementUnits}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("mainMeasurement", e.value);
                            }}
                            defaultValue={formik.values.mainMeasurement}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="mainMeasurement"
                            id="mainMeasurement"
                            searchEnabled
                            showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                          />
                        )}
                        {(!id || (id != null && formik.values.mainMeasurement == "")) && (
                          <SelectBox
                            dataSource={measurementUnits}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("mainMeasurement", e.value);
                            }}
                            defaultValue={formik.values.mainMeasurement}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="mainMeasurement"
                            id="mainMeasurement"
                            searchEnabled
                            showClearButton
                            defaultValue={measurementUnits[0]}
                          />
                        )}
                        {formik.touched.mainMeasurement &&
                        formik.errors.mainMeasurement &&
                        !formik.values.mainMeasurement ? (
                          <div className="error-msg">
                            {t(formik.errors.mainMeasurement)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("واحد اندازه‌گیری ثانویه")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        {id != null && formik.values.secondMeasurement != "" && (
                          <SelectBox
                            dataSource={measurementUnits}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("secondMeasurement", e.value);
                            }}
                            defaultValue={formik.values.secondMeasurement}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="secondMeasurement"
                            id="secondMeasurement"
                            searchEnabled
                            showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                          />
                        )}
                        {(!id || (id != null && formik.values.secondMeasurement == "")) && (
                          <SelectBox
                            dataSource={measurementUnits}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("secondMeasurement", e.value);
                            }}
                            defaultValue={formik.values.secondMeasurement}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="secondMeasurement"
                            id="secondMeasurement"
                            searchEnabled
                            showClearButton
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("تعداد ساعت")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <input
                          className="form-input"
                          type="text"
                          id="hoursCount"
                          name="hoursCount"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          value={formik.values.hoursCount}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion>
          <Accordion expanded={panel2} onChange={handlePanel2()}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography style={{ color: `${theme.palette.text.primary}` }}>
                {t("اطلاعات بیشتر")}{" "}
              </Typography>
            </AccordionSummary>
            <div>
              <div className="form-design">
                <div className="row">
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("شماره بچ")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <input
                          className="form-input"
                          type="text"
                          id="batchNum"
                          name="batchNum"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.batchNum}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("شماره سریال")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <input
                          className="form-input"
                          type="text"
                          id="serialNum"
                          name="serialNum"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.serialNum}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="content col-lg-6 col-md-6 col-xs-12"
                    onFocus={() => dateRef?.current?.closeCalendar()}
                  >
                    <div className="title">
                      <span> {t("شماره لات")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <input
                          className="form-input"
                          type="text"
                          id="latNum"
                          name="latNum"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.latNum}
                        />
                        {formik.touched.latNum && formik.errors.latNum ? (
                          <div className="error-msg">
                            {t(formik.errors.latNum)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span>
                        {" "}
                        {t("تاریخ انقضا")} <span className="star">*</span>
                      </span>
                    </div>
                    <div className="wrapper">
                      <div className="date-picker position-relative">
                        <DatePicker
                          name="validityDate"
                          id="validityDate"
                          ref={dateRef}
                          editable={false}
                          calendar={renderCalendarSwitch(i18n.language)}
                          locale={renderCalendarLocaleSwitch(i18n.language)}
                          calendarPosition="bottom-right"
                          onBlur={formik.handleBlur}
                          onChange={(val) => {
                            formik.setFieldValue(
                              "validityDate",
                              julianIntToDateTime(val.toJulianDay())
                            );
                          }}
                          value={getLangDate(i18n.language , formik.values.validityDate)}
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
                      {formik.touched.validityDate &&
                      formik.errors.validityDate &&
                      !formik.values.validityDate ? (
                        <div className="error-msg">
                          {t(formik.errors.validityDate)}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div
                    className="content col-lg-6 col-md-6 col-xs-12"
                    onFocus={() => dateRef?.current?.closeCalendar()}
                  >
                    <div className="title">
                      <span> {t("آدرس اینترنتی")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <input
                          className="form-input"
                          type="text"
                          id="productURL"
                          name="productURL"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.productURL}
                        />
                        {formik.touched.productURL &&
                        formik.errors.productURL ? (
                          <div className="error-msg">
                            {t(formik.errors.productURL)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("بارکد")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <input
                          className="form-input"
                          type="text"
                          id="barcode"
                          name="barcode"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.barcode}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("عکس محصول")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <UploadFile
                          title={t("بارگذاری عکس")}
                          multiple={true}
                          uploadError={uploadError}
                          updateFileList={updateProductImageList}
                          accept={".png , .jpeg, .gif, .jpg, .bmp"}
                          defaultFiles={productImageList != [] ? productImageList : null}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("عکس بارکد")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <UploadFile
                          title={t("بارگذاری عکس")}
                          multiple={false}
                          uploadError={uploadError}
                          updateFileList={updateBarcodeImage}
                          accept={".png , .jpeg, .gif, .jpg, .bmp"}
                          defaultFiles={productBarcodeList != [] ? productBarcodeList : null}
                          style={{}}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("نوع فاکتور شدن")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        {id != null && formik.values.invoiceType != "" && (
                          <SelectBox
                            dataSource={invoiceTypes}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("invoiceType", e.value);
                            }}
                            defaultValue={formik.values.invoiceType}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="invoiceType"
                            id="invoiceType"
                            searchEnabled
                            showClearButton
                            //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                          />
                        )}
                        {(!id || (id != null && formik.values.invoiceType == "")) && (
                          <SelectBox
                            dataSource={invoiceTypes}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => {
                              formik.setFieldValue("invoiceType", e.value);
                            }}
                            defaultValue={formik.values.invoiceType}
                            className="selectBox"
                            noDataText="اطلاعات یافت نشد"
                            placeholder=""
                            name="invoiceType"
                            id="invoiceType"
                            searchEnabled
                            showClearButton
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-3 col-md-3 col-xs-6">
                    <div className="title">
                      <span>‌</span>
                    </div>
                    <div className="wrapper">
                      <div>
                          <FormControlLabel
                            value="end"
                            control={
                              <Checkbox
                                checked={formik.values.saleable}
                                id="saleable"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="saleable"
                              />
                            }
                            label="قابل فروش"
                            labelPlacement="end"
                          />
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-3 col-md-3 col-xs-6">
                    <div className="title">
                      <span> ‌</span>
                    </div>
                    <div className="wrapper">
                      <div>
                          <FormControlLabel
                            value="end"
                            control={
                              <Checkbox
                                checked={formik.values.needProductReturn}
                                id="needProductReturn"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="needProductReturn"
                              />
                            }
                            label="نیازمند بازگشت محصول"
                            labelPlacement="end"
                          />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography style={{ color: `${theme.palette.text.primary}` }}>
                {t("فایل‌ها")}{" "}
              </Typography>
            </AccordionSummary>
            <div>
              <div className="form-design">
                <div className="row">
                  <div className="content col-lg-12 col-md-12 col-xs-12">
                    <div className="title">
                      <span className="span"> {t("افزودن فایل")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <UploadFile
                          title={t("بارگذاری عکس")}
                          multiple={true}
                          uploadError={uploadError}
                          updateFileList={updateFileList}
                          accept={".png , .jpeg, .gif, .jpg, .bmp"}
                          defaultFiles={productFileList != [] ? productFileList : null}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel4-content"
              id="panel4-header"
            >
              <Typography style={{ color: `${theme.palette.text.primary}` }}>
                {t("ویژگی های محصول")}{" "}
              </Typography>
            </AccordionSummary>
            <div>
              <div className="form-design">
                <div className="row">
                  <div className="content col-lg-4 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("طول")} </span>
                    </div>
                    <div className="wrapper">
                      <div className="row">
                        <div className="content col-lg-9 col-md-6 col-xs-12">
                          <CurrencyInput
                            className="form-input"
                            style={{ width: "100%" }}
                            name="length"
                            id="length"
                            decimalsLimit={2}
                            onChange={(e) => HandleLengthChange(e.target.value)}
                          />
                        </div>
                        <div className="content col-lg-3 col-md-6 col-xs-12">
                          <div>
                            <p>سانتی متر</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-4 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("عرض")} </span>
                    </div>
                    <div className="wrapper">
                      <div className="row">
                        <div className="content col-lg-9 col-md-6 col-xs-12">
                          <CurrencyInput
                            className="form-input"
                            style={{ width: "100%" }}
                            name="width"
                            id="width"
                            decimalsLimit={2}
                            onChange={(e) => HandleWidthChange(e.target.value)}
                          />
                        </div>
                        <div className="content col-lg-3 col-md-6 col-xs-12">
                          <div>
                            <p>سانتی متر</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-4 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("ارتفاع")} </span>
                    </div>
                    <div className="wrapper">
                      <div className="row">
                        <div className="content col-lg-9 col-md-6 col-xs-12">
                          <CurrencyInput
                            className="form-input"
                            style={{ width: "100%" }}
                            name="height"
                            id="height"
                            decimalsLimit={2}
                            onChange={(e) => HandleHeightChange(e.target.value)}
                          />
                        </div>
                        <div className="content col-lg-3 col-md-6 col-xs-12">
                          <div>
                            <p>سانتی متر</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-4 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("وزن خالص")} </span>
                    </div>
                    <div className="wrapper">
                      <div className="row">
                        <div className="content col-lg-9 col-md-6 col-xs-12">
                          <CurrencyInput
                            className="form-input"
                            style={{ width: "100%" }}
                            name="netWeight"
                            id="netWeight"
                            decimalsLimit={2}
                            onChange={(e) =>
                              HandleNetWeightChange(e.target.value)
                            }
                          />
                        </div>
                        <div className="content col-lg-3 col-md-6 col-xs-12">
                          <div>
                            <p>کیلوگرم</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-4 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("وزن ناخالص")} </span>
                    </div>
                    <div className="wrapper">
                      <div className="row">
                        <div className="content col-lg-9 col-md-6 col-xs-12">
                          <CurrencyInput
                            className="form-input"
                            style={{ width: "100%" }}
                            name="grossWeight"
                            id="grossWeight"
                            decimalsLimit={2}
                            onChange={(e) =>
                              HandleGrossWeightChange(e.target.value)
                            }
                          />
                        </div>
                        <div className="content col-lg-3 col-md-6 col-xs-12">
                          <div>
                            <p>کیلوگرم</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-4 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("تعداد در بسته")} </span>
                    </div>
                    <div className="wrapper">
                      <div className="row">
                        <div className="content col-lg-9 col-md-6 col-xs-12">
                          <div>
                            <input
                              className="form-input"
                              type="number"
                              name="pocketNum"
                              id="pocketNum"
                              style={{ width: "100%" }}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.pocketNum}
                            />
                          </div>
                        </div>
                        <div className="content col-lg-3 col-md-6 col-xs-12">
                          <div>
                            <p>عدد</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel5-content"
              id="panel5-header"
            >
              <Typography style={{ color: `${theme.palette.text.primary}` }}>
                {t("توضیحات")}{" "}
              </Typography>
            </AccordionSummary>
            <div>
              <div className="form-design">
                <div className="row">
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("توضیحات")} </span>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion>
          <Accordion expanded={panel6} onChange={handlePanel6()}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel6-content"
              id="panel6-header"
            >
              <Typography style={{ color: `${theme.palette.text.primary}` }}>
                {t("اطلاعات موجودی")}{" "}
              </Typography>
            </AccordionSummary>
            <div>
              <div className="form-design">
                <div className="row">
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("تعداد در هر واحد")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <input
                          className="form-input"
                          type="text"
                          id="numPerUnit"
                          name="numPerUnit"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.numPerUnit}
                        />
                        {formik.touched.numPerUnit &&
                        formik.errors.numPerUnit ? (
                          <div className="error-msg">
                            {t(formik.errors.numPerUnit)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("موجودی انبار")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <input
                          className="form-input"
                          type="text"
                          id="storeInventory"
                          name="storeInventory"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.storeInventory}
                        />
                        {formik.touched.storeInventory &&
                        formik.errors.storeInventory ? (
                          <div className="error-msg">
                            {t(formik.errors.storeInventory)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("میزان سفارش‌دهی")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <input
                          className="form-input"
                          type="text"
                          id="orderRate"
                          name="orderRate"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.orderRate}
                        />
                        {formik.touched.orderRate && formik.errors.orderRate ? (
                          <div className="error-msg">
                            {t(formik.errors.orderRate)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("موجودی نمونه")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <input
                          className="form-input"
                          type="text"
                          id="availableForSale"
                          name="availableForSale"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.availableForSale}
                        />
                        {formik.touched.availableForSale &&
                        formik.errors.availableForSale ? (
                          <div className="error-msg">
                            {t(formik.errors.availableForSale)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("ذخیره احتیاطی")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <input
                          className="form-input"
                          type="text"
                          id="safetyStock"
                          name="safetyStock"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.safetyStock}
                        />
                        {formik.touched.safetyStock &&
                        formik.errors.safetyStock ? (
                          <div className="error-msg">
                            {t(formik.errors.safetyStock)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("پیگیری‌کننده")} </span>
                    </div>
                    <div className="wrapper">
                      <div className="d-flex" style={{ position: "relative" }}>
                        <input
                          className={`form-input modal-input ${
                            i18n.dir() === "ltr" ? "ltr" : ""
                          }`}
                          type="text"
                          id="pursuer"
                          name="pursuer"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          value={formik.values.pursuer}
                          disabled
                        />
                        <div
                          className={`modal-action-button  ${
                            i18n.dir() === "ltr" ? "action-ltr" : ""
                          }`}
                        >
                          <UserModal getData={getPursuerData} />
                          <Button>
                            {" "}
                            <CancelIcon onClick={clearPursuerField} />
                          </Button>
                        </div>
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
              onClick={formik.errors ? productError : id != null ? updateProduct : formik.handleSubmit}
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
export default ProductCreation;
