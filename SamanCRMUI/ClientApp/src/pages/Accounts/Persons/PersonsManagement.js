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
import PersonActionCell from "../../../components/RKGrid/PersonActionCell";

const PersonsManagement = () => {
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
          address: data.address.length > 42 ? data.address.substring(0 , 42).concat("...") : data.address
        };
      });
      setData(tempData);

      let tempExcel = rawData?.map((data, index) => {
        return {
          ...data,
          IndexCell: index + 1,
          birthDate: getLangDate(i18n.language, new Date(data.birthDate)),
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
      .get(`${appConfig.BaseURL}/api/persons`)
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
    <PersonActionCell {...props} getData={getData} />
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
      field: "nickName",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "??????",
      // orderIndex:5
    },
    {
      field: "personName",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "??????",
      // orderIndex:6
    },
    {
      field: "surname",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "?????? ????????????????",
      // orderIndex:4
    },
    {
      field: "accountName",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "?????? ???????? (????????)",
      // orderIndex:7
    },
    {
      field: "clueSource",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "???????? ????????",
      // orderIndex:7
    },
    {
      field: "section",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "??????",
      // orderIndex:7
    },
    {
      field: "nationalCode",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "???? ??????",
      // orderIndex:3
    },
    {
      field: "birthDate",
      columnMenu: DateMenu,
      filterable: true,
      filter: "date",
      format: "{0:d}",
      name: "?????????? ????????",
      cell: DateCell,
      // orderIndex:3
    },
    {
      field: "address",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "????????",
      // orderIndex:7
    },
    {
      field: "actionCell",
      filterable: false,
      width: "90px",
      name: "????????????",
      cell: ActionCellData,
      className: "text-center",
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
          gridId={"personID"}
          gridData={data}
          excelData={excelData}
          columnList={tempColumn}
          showSetting={true}
          showChart={true}
          showExcelExport={true}
          showPrint={true}
          showAdd={true}
          excelFileName={"personIDDetails"}
          chartDependent={chartObj}
          rowCount={10}
          addUrl={"/accounts/people/NewPerson"}
          addTitle={"???????????? ??????"}
          savedChartsList={savedCharts}
          getSavedCharts={getSavedCharts}
          sortable={true}
          pageable={true}
          reorderable={true}
          selectionMode={"multiple"} //single , multiple
          selectKeyField={"personID"}
          getSelectedRows={getSelectedRows}
          getSelectedKeys={getSelectedKeys}
        />
      </div>
    </>
  );
};

export default PersonsManagement;
