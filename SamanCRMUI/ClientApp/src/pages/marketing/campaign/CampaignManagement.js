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
import BooleanCell from "../../../components/RKGrid/BooleanCell";
import MoneyCell from "../../../components/RKGrid/MoneyCell";
import CampaignActionCell from "../../../components/RKGrid/CampaignActionCell";

const CampaignManagement = () => {
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
                    startDate: new Date(data.startDate),
                    endDate: new Date(data.endDate),
                    target: data.target.length > 60 ? data.target.substring(0 , 60).concat("...") : data.target,
                    desc: data.desc.length > 60 ? data.desc.substring(0 , 60).concat("...") : data.desc,
                };
            });
            setData(tempData);

            let tempExcel = rawData?.map((data, index) => {
                return {
                    ...data,
                    IndexCell: index + 1,
                    startDate: getLangDate(i18n.language, new Date(data.startDate)),
                    endDate: getLangDate(i18n.language, new Date(data.endDate)),
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
            .get(`${appConfig.BaseURL}/api/campaign`)
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
        <CampaignActionCell {...props} getData={getData} />
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
            field: "campaignName",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "نام کمپین",
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
            field: "repetitionRate",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "نرخ تکرار",
            // orderIndex:7
        },
        {
          field: "startDate",
          columnMenu: DateMenu,
          filterable: true,
          filter: "date",
          format: "{0:d}",
          name: "تاریخ شروع",
          cell: DateCell,
          // orderIndex:3
        },
        {
          field: "endDate",
          columnMenu: DateMenu,
          filterable: true,
          filter: "date",
          format: "{0:d}",
          name: "تاریخ پایان",
          cell: DateCell,
          // orderIndex:3
        },
        {
            field: "moneyUnit",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "واحد پول",
            // orderIndex:3
        },
        {
            field: "budget",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "بودجه",
            cell: MoneyCell,
            // orderIndex:7
        },
        {
            field: "realCost",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "هزینه واقعی",
            cell: MoneyCell,
            // orderIndex:7
        },
        {
            field: "expectedIncome",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "درآمد مورد انتظار",
            cell: MoneyCell,
            // orderIndex:7
        },
        {
            field: "expectedCost",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "هزینه مورد انتظار",
            cell: MoneyCell,
            // orderIndex:7
        },
        {
            field: "expectedAnswer",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "پاسخ مورد انتظار",
            // orderIndex:7
        },
        {
            field: "target",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "هدف",
            width: "150px",
            // orderIndex:3
        },
        {
            field: "desc",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "توضیحات",
            width: "150px",
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
                    gridId={"campaignID"}
                    gridData={data}
                    excelData={excelData}
                    columnList={tempColumn}
                    showSetting={true}
                    showChart={true}
                    showExcelExport={true}
                    showPrint={true}
                    showAdd={true}
                    excelFileName={"CampaignDetails"}
                    chartDependent={chartObj}
                    rowCount={10}
                    addUrl={"/marketing/Campaign/newCampaign"}
                    addTitle={"افزودن کمپین"}
                    savedChartsList={savedCharts}
                    getSavedCharts={getSavedCharts}
                    sortable={true}
                    pageable={true}
                    reorderable={true}
                    selectionMode={"multiple"} //single , multiple
                    selectKeyField={"campaignID"}
                    getSelectedRows={getSelectedRows}
                    getSelectedKeys={getSelectedKeys}
                />
            </div>
        </>
    );
};

export default CampaignManagement;
