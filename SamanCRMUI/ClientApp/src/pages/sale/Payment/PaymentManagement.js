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
import PaymentActionCell from "../../../components/RKGrid/PaymentActionCell";
import PercentageCell from "../../../components/RKGrid/PercentageCell";
import PersonCell from "../../../components/RKGrid/PersonCell";

const PaymentManagement = () => {
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
                    forecastedDate: new Date(data.forecastedDate),
                    doneDate: new Date(data.doneDate),
                    desc: data.desc.length > 42 ? data.desc.substring(0, 42).concat("...") : data.desc
                };
            });
            setData(tempData);

            let tempExcel = rawData?.map((data, index) => {
                return {
                    ...data,
                    IndexCell: index + 1,
                    forecastedDate: getLangDate(i18n.language, new Date(data.forecastedDate)),
                    doneDate: getLangDate(i18n.language, new Date(data.doneDate)),
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
            .get(`${appConfig.BaseURL}/api/payment`)
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
        <PaymentActionCell {...props} getData={getData} />
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
            field: "name",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "نام",
            // orderIndex:6
        },
        {
            field: "parentName",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "نام والد",
            // orderIndex:5
        },
        {
            field: "direction",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "جهت",
            // orderIndex:4
        },
        {
            field: "moneyUnit",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "واحد پول ",
            // orderIndex:7
        },
        {
            field: "type",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "نوع",
            // orderIndex:7
        },
        {
            field: "paymentMethod",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "نحوه پرداخت",
            // orderIndex:7
        },
        {
            field: "customerSMS",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "پیامک یاداوری به مشتری",
            // orderIndex:7
        },
        {
            field: "forecastedDate",
            columnMenu: DateMenu,
            filterable: true,
            filter: "date",
            format: "{0:d}",
            name: "تاریخ پیش بینی شده",
            cell: DateCell,
            // orderIndex:3
        },
        {
            field: "doneDate",
            columnMenu: DateMenu,
            filterable: true,
            filter: "date",
            format: "{0:d}",
            name: "تاریخ انجام شده",
            cell: DateCell,
            // orderIndex:3
        },
        {
            field: "desc",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "توضیحات",
            // orderIndex:7
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
                    gridId={"paymentID"}
                    gridData={data}
                    excelData={excelData}
                    columnList={tempColumn}
                    showSetting={true}
                    showChart={true}
                    showExcelExport={true}
                    showPrint={true}
                    showAdd={true}
                    excelFileName={"PaymentIDDetails"}
                    chartDependent={chartObj}
                    rowCount={10}
                    addUrl={"/sale/Payment/createPayment"}
                    addTitle={"افزودن اطلاعات پرداخت"}
                    savedChartsList={savedCharts}
                    getSavedCharts={getSavedCharts}
                    sortable={true}
                    pageable={true}
                    reorderable={true}
                    selectionMode={"multiple"} //single , multiple
                    selectKeyField={"paymentID"}
                    getSelectedRows={getSelectedRows}
                    getSelectedKeys={getSelectedKeys}
                />
            </div>
        </>
    );
};

export default PaymentManagement;
