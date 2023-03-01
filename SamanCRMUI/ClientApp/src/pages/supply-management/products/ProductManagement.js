import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, useTheme } from "@mui/material";
import { getLangDate } from "../../../utils/getLangDate";
import RKGrid from "../../../components/RKGrid/RKGrid";
import axios from "axios";
import IndexCell from "../../../components/RKGrid/IndexCell";
import { ColumnMenu, DateMenu } from "../../../components/RKGrid/ColumnMenu";
import DateCell from "../../../components/RKGrid/DateCell";
import FooterSome from "../../../components/RKGrid/FooterSome";
import ProductActionCell from "../../../components/RKGrid/ProductActionCell";
import PicturesCell from "../../../components/RKGrid/PicturesCell";
import BooleanCell from "../../../components/RKGrid/BooleanCell";
import MoneyCell from "../../../components/RKGrid/MoneyCell";
import { history } from "../../../utils/history";

const ProductManagement = () => {
  const { t, i18n } = useTranslation();
  const appConfig = window.globalConfig;
  const [rawData, setRawData] = useState([]);
  const [data, setData] = useState([]);
  const [excelData, setExcelData] = useState([]);

  const dataRef = useRef();
  dataRef.current = rawData;

  useEffect(() => {
    // if (rawData.length) {
      let tempData = rawData.map((data) => {
        return {
          ...data,
          createdDate: new Date(data.createdDate),
          validityDate: new Date(data.validityDate),
          desc: data.desc.length ? data.desc.substring(0 , 60).concat("...") : data.desc
        };
      });
      setData(tempData);

      let tempExcel = rawData?.map((data, index) => {
        return {
          ...data,
          IndexCell: index + 1,
          createdDate: getLangDate(i18n.language, new Date(data.createdDate)),
          validityDate: getLangDate(i18n.language, new Date(data.validityDate)),
        };
      });
      setExcelData(tempExcel);
    // }
  }, [i18n.language, rawData]);

  const theme = useTheme();

  console.log("rawData:", rawData);

  const CustomFooterSome = (props) => (
    <FooterSome {...props} data={dataRef.current} />
  );
  const getData = () => {
    axios
      .get(`${appConfig.BaseURL}/api/Products`)
      .then((res) => {
        setRawData(res.data.data)
      })
      .catch((error) => error);
  };
  useEffect(() => {
    getData();
  }, []);

  function getSavedCharts(list) {
    console.log("save charts list to request and save:", list);
  }

  function getSelectedRows(list) {
    console.log("selected row list to request:", list);
  }

  function getSelectedKeys(list) {
    console.log("selected key list to request:", list);
  }
  const ActionCellData = (props) => (
    <ProductActionCell {...props} getData={getData} />
  );
  let tempColumn = [
    {
      field: "IndexCell",
      filterable: false,
      width: "60px",
      name: "ردیف",
      cell: IndexCell,
      sortable: false,
      reorderable: true,
    },
    {
      field: "productName",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "نام محصول",
      // orderIndex:5
    },
    {
      field: "status",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "وضعیت",
      // orderIndex:6
    },
    {
      field: "type",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "نوع",
      // orderIndex:4
    },
    {
      field: "brand",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "برند",
      // orderIndex:4
    },
    {
      field: "productCode",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "کد محصول",
      // orderIndex:4
    },
    {
      field: "moneyUnit",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "واحد پول",
      // orderIndex:4
    },
    {
      field: "salePrice",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "قیمت فروش",
      cell: MoneyCell,
      // orderIndex:4
    },
    {
      field: "purchasePrice",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "قیمت خرید",
      cell: MoneyCell,
      // orderIndex:4
    },
    {
      field: "mainMeasurement",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "واحد اندازه گیری",
      // orderIndex:4
    },
    {
      field: "serialNum",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "شماره سریال",
      // orderIndex:4
    },
    {
      field: "validityDate",
      columnMenu: DateMenu,
      filterable: true,
      filter: "date",
      format: "{0:d}",
      name: "تاریخ انقضا",
      cell: DateCell,
      // orderIndex:4
    },
    {
      field: "invoiceType",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "نوع فاکتور",
      // orderIndex:4
    },
    {
      field: "saleable",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "قابل فروش",
      cell: BooleanCell,
      // orderIndex:4
    },
    {
      field: "needProductReturn",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "قابل مرجوع",
      cell: BooleanCell,
      // orderIndex:4
    },
    {
      field: "desc",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "توضیحات",
      width: "150px",
      // orderIndex:4
    },
    {
      field: "createdDate",
      columnMenu: DateMenu,
      filterable: true,
      filter: "date",
      format: "{0:d}",
      name: "تاریخ ایجاد",
      cell: DateCell,
      // orderIndex:3
    },
    {
      field: "productID",
      filterable: false,
      name: "تصاویر محصول",
      cell: PicturesCell,
      className: "text-center",
      width: "100px",
      // orderIndex:10,
      reorderable: false,
    },
    {
      field: "actionCell",
      filterable: false,
      name: "عملیات",
      cell: ActionCellData,
      className: "text-center",
      width: "100px",
      // orderIndex:10,
      reorderable: false,
    },
  ];
  const chartObj = [
    { value: "DocumentBalance", title: t("تراز سند") },
    { value: "DocumentCode", title: t("کد سند") },
  ];

  let savedCharts = [
    { title: "تست 1", dashboard: false },
    { title: "تست 2", dashboard: true },
  ];

  console.log("data---", data);

  return (
    <>
      <div
        style={{
          backgroundColor: `${theme.palette.background.paper}`,
          padding: "20px",
        }}
      >
        <RKGrid
          gridId={"productID"}
          gridData={data}
          excelData={excelData}
          columnList={tempColumn}
          showSetting={true}
          showChart={true}
          showExcelExport={true}
          showPrint={true}
          showAdd={true}
          excelFileName={"ProductsDetails"}
          chartDependent={chartObj}
          rowCount={10}
          addUrl={"/inventory-management/product/create-product"}
          addTitle={"افزودن محصول"}
          savedChartsList={savedCharts}
          getSavedCharts={getSavedCharts}
          sortable={true}
          pageable={true}
          reorderable={true}
          selectionMode={"multiple"} //single , multiple
          selectKeyField={"productID"}
          getSelectedRows={getSelectedRows}
          getSelectedKeys={getSelectedKeys}
        />
      </div>
    </>
  );
};

export default ProductManagement;
