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
      name: "????????",
      cell: IndexCell,
      sortable: false,
      reorderable: true,
    },
    {
      field: "name",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "?????? ?????????? ????????",
      // orderIndex:5
    },
    {
      field: "status",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "??????????",
      // orderIndex:6
    },
    {
      field: "orderDate",
      columnMenu: DateMenu,
      filterable: true,
      filter: "date",
      format: "{0:d}",
      name: "?????????? ?????? ?????????? ????????",
      cell: DateCell,
      // orderIndex:4
    },
    {
      field: "forOpportunity",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "???????? ????????",
      // orderIndex:4
    },
    {
      field: "moneyUnit",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "???????? ??????",
      // orderIndex:4
    },
    {
      field: "totalprice",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "???????? ????",
      cell: MoneyCell,
      // orderIndex:4
    },
    {
      field: "discount",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "?????????? ??????????",
      cell: PercentageCell,
      // orderIndex:4
    },
    {
      field: "transport",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "?????????? ?????? ?? ??????",
      cell: MoneyCell,
      // orderIndex:4
    },
    {
      field: "transportTax",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "???????????? ?????? ?? ??????",
      cell: MoneyCell,
      // orderIndex:4
    },
    {
      field: "otherExpenses",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "?????????? ?????? ????????",
      cell: MoneyCell,
      // orderIndex:4
    },
    {
      field: "totalCount",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "???????? ??????????",
      cell: MoneyCell,
      // orderIndex:4
    },
    {
      field: "maturityDate",
      columnMenu: DateMenu,
      filterable: true,
      filter: "date",
      format: "{0:d}",
      name: "?????????? ????????????",
      cell: DateCell,
      // orderIndex:4
    },
    {
      field: "trackingNum",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "?????????? ????????????",
      // orderIndex:4
    },
    {
      field: "productSendMethod",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "???????? ?? ?????????? ????????",
      // orderIndex:4
    },
    {
      field: "productSendType",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "?????? ?????????? ????????",
      // orderIndex:4
    },
    {
      field: "paymentStatus",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "?????????? ????????????",
      // orderIndex:4
    },
    {
      field: "paymentDesc",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "?????????????? ????????????",
      width: "150px",
      // orderIndex:4
    },
    {
      field: "terms",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "?????????? ?? ??????????",
      width: "150px",
      // orderIndex:4
    },
    {
      field: "notes",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "??????????????",
      width: "150px",
      // orderIndex:4
    },
    {
      field: "createdDate",
      columnMenu: DateMenu,
      filterable: true,
      filter: "date",
      format: "{0:d}",
      name: "?????????? ??????????",
      cell: DateCell,
      // orderIndex:3
    },
    {
      field: "actionCell",
      filterable: false,
      name: "????????????",
      cell: ActionCellData,
      className: "text-center",
      width: "100px",
      // orderIndex:10,
      reorderable: false,
    },
  ];
  const chartObj = [
    { value: "DocumentBalance", title: t("???????? ??????") },
    { value: "DocumentCode", title: t("???? ??????") },
  ];

  let savedCharts = [
    { title: "?????? 1", dashboard: false },
    { title: "?????? 2", dashboard: true },
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
          addTitle={"???????????? ?????????? ????????"}
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
