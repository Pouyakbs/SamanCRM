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
import BuyOrderActionCell from "../../../components/RKGrid/BuyOrderActionCell";
import PicturesCell from "../../../components/RKGrid/PicturesCell";
import PercentageCell from "../../../components/RKGrid/PercentageCell";
import MoneyCell from "../../../components/RKGrid/MoneyCell";
import { history } from "../../../utils/history";

const PurchaseOrderManagement = () => {
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
          orderDate: new Date(data.orderDate),
          maturityDate: new Date(data.maturityDate),
          paymentDesc: data.paymentDesc.length > 60 ? data.paymentDesc.substring(0 , 60).concat("...") : data.paymentDesc,
          terms: data.terms.length > 60 ? data.terms.substring(0 , 60).concat("...") : data.terms,
          notes: data.notes.length > 60 ? data.notes.substring(0 , 60).concat("...") : data.notes
        };
      });
      setData(tempData);

      let tempExcel = rawData?.map((data, index) => {
        return {
          ...data,
          IndexCell: index + 1,
          createdDate: getLangDate(i18n.language, new Date(data.createdDate)),
          orderDate: getLangDate(i18n.language, new Date(data.orderDate)),
          maturityDate: getLangDate(i18n.language, new Date(data.maturityDate)),
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
      .get(`${appConfig.BaseURL}/api/buyorder`)
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
    <BuyOrderActionCell {...props} getData={getData} />
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
      field: "name",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "نام سفارش خرید",
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
      field: "orderDate",
      columnMenu: DateMenu,
      filterable: true,
      filter: "date",
      format: "{0:d}",
      name: "تاریخ ثبت سفارش خرید",
      cell: DateCell,
      // orderIndex:4
    },
    {
      field: "forOpportunity",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "برای فرصت",
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
      field: "totalprice",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "قیمت کل",
      cell: MoneyCell,
      // orderIndex:4
    },
    {
      field: "discount",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "میزان تخفیف",
      cell: PercentageCell,
      // orderIndex:4
    },
    {
      field: "transport",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "هزینه حمل و نقل",
      cell: MoneyCell,
      // orderIndex:4
    },
    {
      field: "transportTax",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "مالیات حمل و نقل",
      cell: MoneyCell,
      // orderIndex:4
    },
    {
      field: "otherExpenses",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "هزینه های دیگر",
      cell: MoneyCell,
      // orderIndex:4
    },
    {
      field: "totalCount",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "قیمت نهایی",
      cell: MoneyCell,
      // orderIndex:4
    },
    {
      field: "maturityDate",
      columnMenu: DateMenu,
      filterable: true,
      filter: "date",
      format: "{0:d}",
      name: "تاریخ سررسید",
      cell: DateCell,
      // orderIndex:4
    },
    {
      field: "trackingNum",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "شماره پیگیری",
      // orderIndex:4
    },
    {
      field: "productSendMethod",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "نحوه ی ارسال کالا",
      // orderIndex:4
    },
    {
      field: "productSendType",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "نوع ارسال کالا",
      // orderIndex:4
    },
    {
      field: "paymentStatus",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "وضعیت پرداخت",
      // orderIndex:4
    },
    {
      field: "paymentDesc",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "توضیحات پرداخت",
      width: "150px",
      // orderIndex:4
    },
    {
      field: "terms",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "شرایط و ضوابط",
      width: "150px",
      // orderIndex:4
    },
    {
      field: "notes",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "یادداشت",
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
          gridId={"orderID"}
          gridData={data}
          excelData={excelData}
          columnList={tempColumn}
          showSetting={true}
          showChart={true}
          showExcelExport={true}
          showPrint={true}
          showAdd={true}
          excelFileName={"BuyOrderDetails"}
          chartDependent={chartObj}
          rowCount={10}
          addUrl={"/inventory-management/purchase-orders/create-order"}
          addTitle={"افزودن سفارش خرید"}
          savedChartsList={savedCharts}
          getSavedCharts={getSavedCharts}
          sortable={true}
          pageable={true}
          reorderable={true}
          selectionMode={"multiple"} //single , multiple
          selectKeyField={"orderID"}
          getSelectedRows={getSelectedRows}
          getSelectedKeys={getSelectedKeys}
        />
      </div>
    </>
  );
};

export default PurchaseOrderManagement;
