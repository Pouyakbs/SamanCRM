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
import PersonnelActionCell from "../../../components/RKGrid/PersonnelActionCell";

const GetAllUsers = () => {
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
          birthDate: new Date(data.birthDate),
          createdDate: new Date(data.createdDate),
          address: data.address.length ? data.address.substring(0 , 42).concat("...") : data.address
        };
      });
      setData(tempData);

      let tempExcel = rawData?.map((data, index) => {
        return {
          ...data,
          IndexCell: index + 1,
          birthDate: getLangDate(i18n.language, new Date(data.birthDate)),
          createdDate: getLangDate(i18n.language, new Date(data.createdDate)),
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
  const callComponent = () => {
    history.navigate(`/BaseInfo/Personnels/NewPersonnel`);
  };
  const getData = () => {
    axios
      .get(`${appConfig.BaseURL}/api/personnel`)
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
    <PersonnelActionCell {...props} getData={getData} />
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
      field: "username",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "نام کاربری",
      // orderIndex:7
    },
    {
      field: "managerName",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "نام سرپرست",
      // orderIndex:7
    },
    {
      field: "workingUnit",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "واحد کاری",
      // orderIndex:7
    },
    {
      field: "birthDate",
      columnMenu: DateMenu,
      filterable: true,
      filter: "date",
      format: "{0:d}",
      name: "تاریخ تولد",
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
      field: "createdDate",
      columnMenu: DateMenu,
      filter: "date",
      format: "{0:d}",
      filterable: true,
      name: "تاریخ ایجاد",
      cell: DateCell,
      // orderIndex:8
    },
    {
      field: "actionCell",
      filterable: false,
      width: "100px",
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
          gridId={"personnelID"}
          gridData={data}
          excelData={excelData}
          columnList={tempColumn}
          showSetting={true}
          showChart={true}
          showExcelExport={true}
          showPrint={true}
          showAdd={true}
          excelFileName={"PersonnelDetails"}
          chartDependent={chartObj}
          rowCount={10}
          addUrl={"/BaseInfo/Personnels/NewPersonnel"}
          addTitle={"افزودن پرسنل"}
          savedChartsList={savedCharts}
          getSavedCharts={getSavedCharts}
          sortable={true}
          pageable={true}
          reorderable={true}
          selectionMode={"multiple"} //single , multiple
          selectKeyField={"personnelID"}
          getSelectedRows={getSelectedRows}
          getSelectedKeys={getSelectedKeys}
        />
      </div>
    </>
  );
};

export default GetAllUsers;
