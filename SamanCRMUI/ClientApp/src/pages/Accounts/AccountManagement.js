import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, useTheme } from "@mui/material";
import { getLangDate } from "../../utils/getLangDate";
import { history } from "../../utils/history";
import RKGrid from "../../components/RKGrid/RKGrid";
import axios from "axios";
import IndexCell from "../../components/RKGrid/IndexCell";
import { ColumnMenu, DateMenu } from "../../components/RKGrid/ColumnMenu";
import DateCell from "../../components/RKGrid/DateCell";
import FooterSome from "../../components/RKGrid/FooterSome";
import AccountActionCell from "../../components/RKGrid/AccountActionCell";
import PercentageCell from "../../components/RKGrid/PercentageCell";
import PersonCell from "../../components/RKGrid/PersonCell";
import AccountProfileCell from "../../components/RKGrid/AccountProfileCell";

const AccountManagement = () => {
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
          expireTime: new Date(data.expireTime),
          address: data.address.length > 42 ? data.address.substring(0 , 42).concat("...") : data.address
        };
      });
      setData(tempData);

      let tempExcel = rawData?.map((data, index) => {
        return {
          ...data,
          IndexCell: index + 1,
          expireTime: getLangDate(i18n.language, new Date(data.expireTime)),
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
      .get(`${appConfig.BaseURL}/api/account`)
      .then((res) => setRawData(res.data.data))
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
    <AccountActionCell {...props} getData={getData} />
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
      field: "nickName",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "لقب",
      // orderIndex:5
    },
    {
      field: "name",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "نام",
      // orderIndex:6
    },
    {
      field: "surname",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "نام خانوادگی",
      // orderIndex:4
    },
    {
      field: "accountType",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "نوع حساب",
      // orderIndex:7
    },
    {
      field: "attractiveness",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "میزان جذابیت",
      // orderIndex:7
    },
    {
      field: "ecoCode",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "کد اقتصادی",
      // orderIndex:7
    },
    {
      field: "nationalNum",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "کد ملی",
      // orderIndex:3
    },
    {
      field: "expireTime",
      columnMenu: DateMenu,
      filterable: true,
      filter: "date",
      format: "{0:d}",
      name: "تاریخ انقضا",
      cell: DateCell,
      // orderIndex:3
    },
    {
      field: "address",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "آدرس",
      // orderIndex:7
    },
    {
      field: "saleDiscount",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "میزان تخفیف",
      cell: PercentageCell,
      // orderIndex:8
    },
    {
      field: "saleDiscount",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "میزان تخفیف",
      cell: PercentageCell,
      // orderIndex:8
    },
    {
      field: "Profile",
      filterable: false,
      name: "پروفایل حساب",
      cell: AccountProfileCell,
      reorderable: false,
      // orderIndex:8
    },
    {
      field: "Persons",
      filterable: false,
      name: "افراد",
      cell: PersonCell,
      reorderable: false,
      // orderIndex:8
    },
    {
      field: "actionCell",
      filterable: false,
      width: "150px",
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
          gridId={"accountID"}
          gridData={data}
          excelData={excelData}
          columnList={tempColumn}
          showSetting={true}
          showChart={true}
          showExcelExport={true}
          showPrint={true}
          showAdd={true}
          excelFileName={"AccountIDDetails"}
          chartDependent={chartObj}
          rowCount={10}
          addUrl={"/accounts/NewAccount"}
          addTitle={"افزودن طرف حساب"}
          savedChartsList={savedCharts}
          getSavedCharts={getSavedCharts}
          sortable={true}
          pageable={true}
          reorderable={true}
          selectionMode={"multiple"} //single , multiple
          selectKeyField={"accountID"}
          getSelectedRows={getSelectedRows}
          getSelectedKeys={getSelectedKeys}
        />
      </div>
    </>
  );
};

export default AccountManagement;
