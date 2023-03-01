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
import ProductCategoryActionCell from "../../../components/RKGrid/ProductCategoryActionCell";

const ProductCategoriesManagement = () => {
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
        };
      });
      setData(tempData);

      let tempExcel = rawData?.map((data, index) => {
        return {
          ...data,
          IndexCell: index + 1,
          createdDate: getLangDate(i18n.language, new Date(data.createdDate)),
          desc: data.desc.length ? data.desc.substring(0 , 60).concat("...") : data.desc
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
      .get(`${appConfig.BaseURL}/api/ProductCategory`)
      .then((res) => {
        let temp = res.data.data.map((item) => {
          let parents = res.data.data.filter(a => a.categoryID == item.parentID)
          if(item.parentID != 0) {
            return {
              categoryID: item.categoryID,
              categoryName: item.categoryName,
              parentCategory: parents[0].categoryName,
              createdDate: item.createdDate,
              desc: item.desc,
            }
          }
          else {
            return {
              categoryID: item.categoryID,
              categoryName: item.categoryName,
              parentCategory: "ندارد",
              createdDate: item.createdDate,
              desc: item.desc,
            }
          }
        })
        setRawData(temp)
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
    <ProductCategoryActionCell {...props} getData={getData} />
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
      field: "categoryName",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "نام دسته بندی",
      // orderIndex:5
    },
    {
      field: "parentCategory",
      columnMenu: ColumnMenu,
      filterable: true,
      name: "دسته والد",
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
          gridId={"categoryID"}
          gridData={data}
          excelData={excelData}
          columnList={tempColumn}
          showSetting={true}
          showChart={true}
          showExcelExport={true}
          showPrint={true}
          showAdd={true}
          excelFileName={"CategoryDetails"}
          chartDependent={chartObj}
          rowCount={10}
          addUrl={"/inventory-management/productCategories/create-category"}
          addTitle={"افزودن دسته بندی"}
          savedChartsList={savedCharts}
          getSavedCharts={getSavedCharts}
          sortable={true}
          pageable={true}
          reorderable={true}
          selectionMode={"multiple"} //single , multiple
          selectKeyField={"categoryID"}
          getSelectedRows={getSelectedRows}
          getSelectedKeys={getSelectedKeys}
        />
      </div>
    </>
  );
};

export default ProductCategoriesManagement;
