import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, useTheme } from "@mui/material";
import { getLangDate } from "../../../utils/getLangDate";
import { history } from "../../../utils/history";
import RKGrid from "../../../components/RKGrid/RKGrid";
import axios from "axios";
import IndexCell from "../../../components/RKGrid/IndexCell";
import { ColumnMenu, DateMenu } from "../../../components/RKGrid/ColumnMenu";
import DateCell from "../../../components/RKGrid/DateCell";
import FooterSome from "../../../components/RKGrid/FooterSome";
import OpportunitiesActionCell from "../../../components/RKGrid/OpportunitiesActionCell";

const OpportunitiesManagement = () => {
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
          saleDate: new Date(data.saleDate),
          payTermEndDate: new Date(data.payTermEndDate),
          desc: data.desc.length > 60 ? data.desc.substring(0 , 60).concat("...") : data.desc
        };
      });
      setData(tempData);

      let tempExcel = rawData?.map((data, index) => {
        return {
          ...data,
          IndexCell: index + 1,
          createdDate: getLangDate(i18n.language, new Date(data.createdDate)),
          saleDate: getLangDate(i18n.language, new Date(data.saleDate)),
          payTermEndDate: getLangDate(i18n.language, new Date(data.payTermEndDate)),
          desc: data.desc.length > 60 ? data.desc.substring(0 , 60).concat("...") : data.desc
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
      .get(`${appConfig.BaseURL}/api/Opportunities`)
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
    <OpportunitiesActionCell {...props} getData={getData} />
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
      field: "opportunityName",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "نام فرصت",
      // orderIndex:5
    },
    {
      field: "moneyUnit",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "واحد پول",
      // orderIndex:6
    },
    {
      field: "PriceBased",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "قیمت براساس",
      // orderIndex:6
    },
    {
      field: "saleProcess",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "روند فروش",
      // orderIndex:6
    },
    {
      field: "price",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "قیمت",
      // orderIndex:6
    },
    {
      field: "expectedPrice",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "مبلغ مورد انتظار",
      // orderIndex:6
    },
    {
      field: "successProssibility",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "احتمال موفقیت",
      // orderIndex:6
    },
    {
      field: "saleDate",
      columnMenu: DateMenu,
      filterable: true,
      filter: "date",
      format: "{0:d}",
      name: "تاریخ فروش",
      cell: DateCell,
      // orderIndex:6
    },
    {
      field: "clueSource",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "منبع سرنخ",
      // orderIndex:6
    },
    {
      field: "priority",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "اولویت",
      // orderIndex:6
    },
    {
      field: "type",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "نوع",
      // orderIndex:6
    },
    {
      field: "reasonofLoss",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "دلیل از دست رفتن",
      // orderIndex:6
    },
    {
      field: "saleForecast",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "پیش بینی فروش",
      // orderIndex:6
    },
    {
      field: "payTermEndDate",
      columnMenu: DateMenu,
      filterable: true,
      filter: "date",
      format: "{0:d}",
      name: "تاریخ پایان دوره پرداخت",
      cell: DateCell,
      // orderIndex:6
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
      field: "desc",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "توضیحات",
      width: "140px",
      // orderIndex:4
    },
    {
      field: "actionCell",
      filterable: false,
      width: "90px",
      name: "عملیات",
      cell: ActionCellData,
      className: "text-center",
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
          gridId={"opportunityID"}
          gridData={data}
          excelData={excelData}
          columnList={tempColumn}
          showSetting={true}
          showChart={true}
          showExcelExport={true}
          showPrint={true}
          showAdd={true}
          excelFileName={"OpportunitiesDetails"}
          chartDependent={chartObj}
          rowCount={10}
          addUrl={"/sale/Opportunities/NewOpportunities"}
          addTitle={"افزودن فرصت"}
          savedChartsList={savedCharts}
          getSavedCharts={getSavedCharts}
          sortable={true}
          pageable={true}
          reorderable={true}
          selectionMode={"multiple"} //single , multiple
          selectKeyField={"opportunityID"}
          getSelectedRows={getSelectedRows}
          getSelectedKeys={getSelectedKeys}
        />
      </div>
    </>
  );
};

export default OpportunitiesManagement;
