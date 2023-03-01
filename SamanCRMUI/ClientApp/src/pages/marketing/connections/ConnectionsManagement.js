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
import ConnectionsActionCell from "../../../components/RKGrid/ConnectionsActionCell";

const ConnectionsManagement = () => {
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
            .get(`${appConfig.BaseURL}/api/connections`)
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
        <ConnectionsActionCell {...props} getData={getData} />
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
            field: "title",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "عنوان",
            // orderIndex:5
        },
        {
            field: "maduleName",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "نام ماژول",
            // orderIndex:6
        },
        {
            field: "recordType",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "نوع رکورد",
            // orderIndex:4
        },
        {
            field: "condition",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "شرط",
            // orderIndex:7
        },
        {
            field: "conditionAmount",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "مقدار شرط",
            // orderIndex:3
        },
        {
            field: "messageTitle",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "عنوان پیامک",
            // orderIndex:7
        },
        {
            field: "emailTitle",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "عنوان ایمیل",
            // orderIndex:7
        },
        {
            field: "activeConnection",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "فعال",
            cell: BooleanCell,
            // orderIndex:7
        },
        {
            field: "sendMessage",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "پیامک",
            cell: BooleanCell,
            // orderIndex:7
        },
        {
            field: "sendEmail",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "ایمیل",
            cell: BooleanCell,
            // orderIndex:7
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
                    gridId={"connectionsID"}
                    gridData={data}
                    excelData={excelData}
                    columnList={tempColumn}
                    showSetting={true}
                    showChart={true}
                    showExcelExport={true}
                    showPrint={true}
                    showAdd={true}
                    excelFileName={"connectionsIDDetails"}
                    chartDependent={chartObj}
                    rowCount={10}
                    addUrl={"/marketing/connections/newConnections"}
                    addTitle={"افزودن ارتباطات"}
                    savedChartsList={savedCharts}
                    getSavedCharts={getSavedCharts}
                    sortable={true}
                    pageable={true}
                    reorderable={true}
                    selectionMode={"multiple"} //single , multiple
                    selectKeyField={"connectionsID"}
                    getSelectedRows={getSelectedRows}
                    getSelectedKeys={getSelectedKeys}
                />
            </div>
        </>
    );
};

export default ConnectionsManagement;
