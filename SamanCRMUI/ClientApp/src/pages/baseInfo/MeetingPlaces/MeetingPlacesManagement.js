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
import BooleanCell from "../../../components/RKGrid/BooleanCell";
import FooterSome from "../../../components/RKGrid/FooterSome";
import MeetingPlacesActionCell from "../../../components/RKGrid/MeetingPlacesActionCell";

const MeetingPlacesManagement = () => {
  const { t, i18n } = useTranslation();
  const appConfig = window.globalConfig;
  const [rawData, setRawData] = useState([]);
  const [data, setData] = useState([]);
  const [excelData, setExcelData] = useState([]);

  const dataRef = useRef();
  dataRef.current = rawData;

  useEffect(() => {
  
      let tempData = rawData?.map((data) => {
        return {
          ...data,
          desc: data.desc.length ? data.desc.substring(0 , 60).concat("...") : data.desc
        };
      });

      
      setData(tempData);

      let tempExcel = rawData?.map((data, index) => {
        return {
          ...data,
          IndexCell: index + 1,
        };
      });
      setExcelData(tempExcel);
    
  }, [i18n.language, rawData]);

  const theme = useTheme();

  console.log('data--------',data)

  console.log("rawData:", rawData);

  const CustomFooterSome = (props) => (
    <FooterSome {...props} data={dataRef.current} />
  );
  const getData = () => {
    console.log('getData.............................................................')
    axios
      .get(`${appConfig.BaseURL}/api/meetingPlaces`)
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
    <MeetingPlacesActionCell {...props} getData={getData} />
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
      field: "placeName",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "نام اتاق",
      width: "100px",
      // orderIndex:5
    },
    {
      field: "roomCapacity",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "ظرفیت",
      width: "100px",
      // orderIndex:6
    },
    {
      field: "lapTop",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "لپ تاپ",
      width: "100px",
      cell: BooleanCell,
      // orderIndex:4
    },
    {
      field: "monitor",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "مانیتور",
      width: "100px",
      cell: BooleanCell,
      // orderIndex:7
    },
    {
      field: "internet",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "اینترنت",
      width: "100px",
      cell: BooleanCell,
      // orderIndex:7
    },
    {
      field: "network",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "شبکه",
      width: "100px",
      cell: BooleanCell,
      // orderIndex:7
    },
    {
      field: "microPhone",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "میکروفون",
      width: "100px",
      cell: BooleanCell,
      // orderIndex:7
    },
    {
      field: "projector",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "ویدیو پروژکتور و پرده ی نمایش",
      width: "100px",
      cell: BooleanCell,
      // orderIndex:7
    },
    {
      field: "whiteBoard",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "وایت برد",
      width: "100px",
      cell: BooleanCell,
      // orderIndex:7
    },
    {
      field: "coolingAndHeating",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "لوازم سرمایشی و گرمایشی اختصاصی",
      width: "100px",
      cell: BooleanCell,
      // orderIndex:7
    },
    {
      field: "desc",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "توضیحات",
      width: "140px",
      // orderIndex:3
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
          gridId={"placeID"}
          gridData={data}
          excelData={excelData}
          columnList={tempColumn}
          showSetting={true}
          showChart={true}
          showExcelExport={true}
          showPrint={true}
          showAdd={true}
          excelFileName={"PlacesDetails"}
          chartDependent={chartObj}
          rowCount={10}
          addUrl={"/baseInfo/CreateMeetingPlace"}
          addTitle={"افزودن فرد"}
          savedChartsList={savedCharts}
          getSavedCharts={getSavedCharts}
          sortable={true}
          pageable={true}
          reorderable={true}
          selectionMode={"multiple"} //single , multiple
          selectKeyField={"placeID"}
          getSelectedRows={getSelectedRows}
          getSelectedKeys={getSelectedKeys}
        />
      </div>
    </>
  );
};

export default MeetingPlacesManagement;
