import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, useTheme } from "@mui/material";
import { getLangDate } from "../../../../utils/getLangDate";
import RKGrid from "../../../../components/RKGrid/RKGrid";
import axios from "axios";
import IndexCell from "../../../../components/RKGrid/IndexCell";
import { ColumnMenu, DateMenu } from "../../../../components/RKGrid/ColumnMenu";
import DateCell from "../../../../components/RKGrid/DateCell";
import FooterSome from "../../../../components/RKGrid/FooterSome";
import ServiceActionCell from "../../../../components/RKGrid/ServiceActionCell";
import PicturesCell from "../../../../components/RKGrid/PicturesCell";
import BooleanCell from "../../../../components/RKGrid/BooleanCell";
import MoneyCell from "../../../../components/RKGrid/MoneyCell";
import { history } from "../../../../utils/history";

const ServiceManagement = () => {
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
          desc: data.desc.length > 60 ? data.desc.substring(0 , 60).concat("...") : data.desc
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
    // }
  }, [i18n.language, rawData]);

  const theme = useTheme();

  console.log("rawData:", rawData);

  const CustomFooterSome = (props) => (
    <FooterSome {...props} data={dataRef.current} />
  );
  const getData = () => {
    axios
      .get(`${appConfig.BaseURL}/api/Service`)
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
    <ServiceActionCell {...props} getData={getData} />
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
      name: "??????",
      // orderIndex:5
    },
    {
      field: "limitation",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "???? ????????",
      // orderIndex:6
    },
    {
      field: "price",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "????????",
      cell: MoneyCell,
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
      field: "serviceUnit",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "???????? ?????????? ??????????",
      // orderIndex:4
    },
    {
      field: "desc",
      columnMenu: ColumnMenu,
      filterable: true,
      width: "150px",
      name: "??????????????",
      // orderIndex:4
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
          gridId={"serviceID"}
          gridData={data}
          excelData={excelData}
          columnList={tempColumn}
          showSetting={true}
          showChart={true}
          showExcelExport={true}
          showPrint={true}
          showAdd={true}
          excelFileName={"serviceDetails"}
          chartDependent={chartObj}
          rowCount={10}
          addUrl={"/Support/Service"}
          addTitle={"???????????? ????????"}
          savedChartsList={savedCharts}
          getSavedCharts={getSavedCharts}
          sortable={true}
          pageable={true}
          reorderable={true}
          selectionMode={"multiple"} //single , multiple
          selectKeyField={"serviceID"}
          getSelectedRows={getSelectedRows}
          getSelectedKeys={getSelectedKeys}
        />
      </div>
    </>
  );
};

export default ServiceManagement;