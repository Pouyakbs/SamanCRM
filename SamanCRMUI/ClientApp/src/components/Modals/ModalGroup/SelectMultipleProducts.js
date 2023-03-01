import React, { useState, useEffect, useRef } from "react";
import DataGrid, {
  Column,
  Selection,
  Editing,
  Texts,
} from "devextreme-react/data-grid";
import { dummy } from "../../Modals/ModalGroup/dummy";
import { SelectBox } from "devextreme-react/select-box";
import Button from "@mui/material/Button";
import axios from "axios";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

export const SelectMultipleProducts = ({ getdata, closDialog, supplierID }) => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = React.useState([]);
  const appConfig = window.globalConfig;

  const formik = useFormik({
    initialValues: {
      productName: "",
      productCode: "",
      serialNumber: "",
      MainUnit: 1,
      UnitPrice: "",
      subset: 0,
      Discount: 0,
      discountAmount: "",
      PriceAfterDiscount: "",
      taxamount: 1,
      totalprice: "",
      unit: "",
      description: "",
      Note: "",
      list: [],
    },

    onSubmit: (values) => {},
  });

  const getProducts = () => {
    if (supplierID != undefined) {
      axios
        .get(`${appConfig.BaseURL}/api/supplier/${supplierID}`)
        .then((res) => {
          setProducts(
            res.data.data.productFields.map((item) => {
              let items = JSON.parse(item);
              return items.Products;
            })
          );
        })
        .catch((error) => error);
    } else {
      axios
        .get(`${appConfig.BaseURL}/api/products`)
        .then((res) => {
          setProducts(res.data.data);
        })
        .catch((error) => error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  console.log("uiiiiiigku", formik.values.list);

  const [selectedProduct, setSelectedProducts] = useState([]);
  console.log("selectedProduct", selectedProduct);

  useEffect(() => {
    if (supplierID != undefined) {
      if (selectedProduct.length) {
        for (let i = 0; i < selectedProduct.length; i++) {
          formik.setFieldValue(
            `list[${i}].MainUnit`,
            selectedProduct[i].count || 1
          );
          let sum = selectedProduct[i].SalePrice * 1;
          console.log("sum of products", sum);
          formik.setFieldValue(`list[${i}].id`, selectedProduct[i].ProductID);
          formik.setFieldValue(
            `list[${i}].productName`,
            selectedProduct[i].ProductName
          );
          formik.setFieldValue(
            `list[${i}].productCode`,
            selectedProduct[i].ProductCode
          );
          formik.setFieldValue(
            `list[${i}].serialNumber`,
            selectedProduct[i].SerialNum
          );
          formik.setFieldValue(
            `list[${i}].UnitPrice`,
            selectedProduct[i].SalePrice
          );
          formik.setFieldValue(`list[${i}].subset`, sum);
          formik.setFieldValue(`list[${i}].totalprice`, sum);
          formik.setFieldValue(`list[${i}].PriceAfterDiscount`, sum);
          formik.setFieldValue(`list[${i}].Discount`, 0);
          formik.setFieldValue(`list[${i}].discountAmount`, 0);
          formik.setFieldValue(`list[${i}].taxamount`, 1);
          formik.setFieldValue(`list[${i}].unit`, "");
          formik.setFieldValue(`list[${i}].description`, "");
          formik.setFieldValue(`list[${i}].Note`, "");
        }
      }
    }
    else {
      
    if (selectedProduct.length) {
      for (let i = 0; i < selectedProduct.length; i++) {
        formik.setFieldValue(
          `list[${i}].MainUnit`,
          selectedProduct[i].count || 1
        );
        let sum = selectedProduct[i].salePrice * 1;
        console.log("sum of products", sum);
        formik.setFieldValue(`list[${i}].id`, selectedProduct[i].productID);
        formik.setFieldValue(
          `list[${i}].productName`,
          selectedProduct[i].productName
        );
        formik.setFieldValue(
          `list[${i}].productCode`,
          selectedProduct[i].productCode
        );
        formik.setFieldValue(
          `list[${i}].serialNumber`,
          selectedProduct[i].serialNum
        );
        formik.setFieldValue(
          `list[${i}].UnitPrice`,
          selectedProduct[i].salePrice
        );
        formik.setFieldValue(`list[${i}].subset`, sum);
        formik.setFieldValue(`list[${i}].totalprice`, sum);
        formik.setFieldValue(`list[${i}].PriceAfterDiscount`, sum);
        formik.setFieldValue(`list[${i}].Discount`, 0);
        formik.setFieldValue(`list[${i}].discountAmount`, 0);
        formik.setFieldValue(`list[${i}].taxamount`, 1);
        formik.setFieldValue(`list[${i}].unit`, "");
        formik.setFieldValue(`list[${i}].description`, "");
        formik.setFieldValue(`list[${i}].Note`, "");
      }
    }
    }
  }, [selectedProduct]);

  const getrows = ({ selectedRowsData }) => {
    setSelectedProducts(selectedRowsData);

    console.log("ddddd", selectedProduct);
  };

  const getsave = (val) => {
    let temp = selectedProduct.map((item) => {
      if (item.id === val.data.id) {
        return { ...item, count: val.data.count };
      }
      return item;
    });
    setSelectedProducts(temp);

    console.log(val);

    //setSelectedProducts(selectedRowsData)
  };

  console.log("selectedProduct", selectedProduct);

  const setData = () => {
    getdata(formik.values.list);
    closDialog();
  };

  //useEffect(() => {

  //    setSelectedProducts({ selectedRowsData })

  //}, [{ selectedRowsData }]);

  console.log("selectedProduct------", selectedProduct);

  // const refg=useRef()

  // useEffect(()=>{
  //   if(refg.current){
  //     console.log('refg',refg)
  //     // refg.current.getElementsByClassName('dx-scrollable-container').scrollableX(0)
  //   }
  // },[refg])

  //  let el=document.getElementsByClassName('dx-scrollable-container')
  //
  // if (el) {
  //   let sl = el.scrollLeft,
  //     cw = el.scrollWidth;
  //   // el.scrollLeft = 50;
  //   el.scrollTo({ x: 0, y: 0})
  //   console.log('sl +cw',sl +cw)
  //   console.log('el',el)
  //   console.log('el.scrollLeft',el.scrollLeft)
  //   console.log('el.scrollWidth',el.scrollWidth)
  // }

  // if (el)el.scrollTo((sl +cw), 0)

  return (
    <>
      <div className="row">
        <div className="content content col-lg-4 col-md-12 col-xs-12">
          <h3>{t("محصولات انتخاب شده")}</h3>
          {supplierID != undefined ? 
          <DataGrid
            // ref={refg}
            showBorders={true}
            hoverStateEnabled={true}
            keyExpr="ProductID"
            dataSource={selectedProduct}
            noDataText={t("داده‌ای موجود نیست")}
            onRowUpdated={getsave}
            scrolling={true}
            width={"100%"}
            rtlEnabled={!(i18n.dir() == "ltr")}
          >
            <Column
              caption={t("نام محصول")}
              dataField="ProductName"
              width={130}
            />
            <Column
              caption={t("قیمت خرید")}
              dataField="PurchasePrice"
              width={130}
            />
            <Column
              caption={t("قیمت فروش")}
              dataField="SalePrice"
              width={130}
            />
            <Column
              caption={t("موجودی انبار")}
              dataField="StoreInventory"
              width={130}
            />
          </DataGrid>
          :
          
          <DataGrid
            // ref={refg}
            showBorders={true}
            hoverStateEnabled={true}
            keyExpr="productID"
            dataSource={selectedProduct}
            noDataText={t("داده‌ای موجود نیست")}
            onRowUpdated={getsave}
            scrolling={true}
            width={"100%"}
            rtlEnabled={!(i18n.dir() == "ltr")}
          >
            <Column
              caption={t("نام محصول")}
              dataField="productName"
              width={130}
            />
            <Column
              caption={t("قیمت خرید")}
              dataField="purchasePrice"
              width={130}
            />
            <Column
              caption={t("قیمت فروش")}
              dataField="salePrice"
              width={130}
            />
            <Column
              caption={t("موجودی انبار")}
              dataField="storeInventory"
              width={130}
            />
          </DataGrid>
        }
        </div>

        <div className="content content col-lg-8 col-md-12 col-xs-12">
          <h3>{t("لیست محصولات")}</h3>
          {supplierID != undefined ? (
            <DataGrid
              showBorders={true}
              hoverStateEnabled={true}
              keyExpr="ProductID"
              width={"100%"}
              dataSource={products}
              scrolling={true}
              onSelectionChanged={getrows}
              rtlEnabled={!(i18n.dir() == "ltr")}
            >
              <Selection mode="multiple" />

              <Column
                caption={t("نام محصول")}
                dataField="ProductName"
                width={130}
              />
              <Column caption={t("نام برند")} dataField="Brand" width={130} />
              <Column
                caption={t("واحد اندازه گیری اصلی")}
                dataField="MainMeasurement"
                width={130}
              />
              <Column
                caption={t("قیمت خرید")}
                dataField="PurchasePrice"
                width={130}
              />
              <Column
                caption={t("قیمت فروش")}
                dataField="SalePrice"
                width={130}
              />
              <Column
                caption={t("کد محصول")}
                dataField="ProductCode"
                width={130}
              />
              <Column
                caption={t("شماره سریال")}
                dataField="SerialNum"
                width={130}
              />
              <Column
                caption={t("موجودی قابل فروش")}
                dataField="StoreInventory"
                width={130}
              />
            </DataGrid>
          ) : (
            <DataGrid
              showBorders={true}
              hoverStateEnabled={true}
              keyExpr="productID"
              width={"100%"}
              dataSource={products}
              scrolling={true}
              onSelectionChanged={getrows}
              rtlEnabled={!(i18n.dir() == "ltr")}
            >
              <Selection mode="multiple" />

              <Column
                caption={t("نام محصول")}
                dataField="productName"
                width={130}
              />
              <Column caption={t("نام برند")} dataField="brand" width={130} />
              <Column
                caption={t("واحد اندازه گیری اصلی")}
                dataField="mainMeasurement"
                width={130}
              />
              <Column
                caption={t("قیمت خرید")}
                dataField="purchasePrice"
                width={130}
              />
              <Column
                caption={t("قیمت فروش")}
                dataField="salePrice"
                width={130}
              />
              <Column
                caption={t("کد محصول")}
                dataField="productCode"
                width={130}
              />
              <Column
                caption={t("شماره سریال")}
                dataField="serialNum"
                width={130}
              />
              <Column
                caption={t("موجودی قابل فروش")}
                dataField="storeInventory"
                width={130}
              />
            </DataGrid>
          )}
        </div>
      </div>
      <div className="row">
        <div
          className="content content col-12 mt-3"
          style={{ "text-align": "center" }}
        >
          <Button variant="contained" color="success" onClick={setData}>
            {t("اضافه کردن محصول")}
          </Button>
        </div>
      </div>
    </>
  );
};
