import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, useTheme } from "@mui/material";
import { getLangDate } from "../../../utils/getLangDate";
import RKGrid from "../../../components/RKGrid/RKGrid";
import axios from "axios";
import IndexCell from "../../../components/RKGrid/IndexCell";
import { ColumnMenu, DateMenu } from "../../../components/RKGrid/ColumnMenu";
import DateCell from "../../../components/RKGrid/DateCell";
import FooterSome from "../../../components/RKGrid/FooterSome";
import PreInvoiceActionCell from "../../../components/RKGrid/PreInvoiceActionCell";
import PicturesCell from "../../../components/RKGrid/PicturesCell";
import PercentageCell from "../../../components/RKGrid/PercentageCell";
import MoneyCell from "../../../components/RKGrid/MoneyCell";
import { history } from "../../../utils/history";

const PreInvoiceManagement = () => {
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
                    preInvoiceDate: new Date(data.preInvoiceDate),
                    validityDate: new Date(data.validityDate),
                    address: data.address.length > 60 ? data.address.substring(0, 60).concat("...") : data.address,
                    desc: data.desc.length > 60 ? data.desc.substring(0, 60).concat("...") : data.desc,
                    note: data.note.length > 60 ? data.note.substring(0, 60).concat("...") : data.note
                };
            });
            setData(tempData);

            let tempExcel = rawData?.map((data, index) => {
                return {
                    ...data,
                    IndexCell: index + 1,
                    preInvoiceDate: getLangDate(i18n.language, new Date(data.preInvoiceDate)),
                    validityDate: getLangDate(i18n.language, new Date(data.validityDate)),
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
            .get(`${appConfig.BaseURL}/api/preInvoice`)
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
        <PreInvoiceActionCell {...props} getData={getData} />
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
            field: "title",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "??????????",
            // orderIndex:5
        },
        {
            field: "preInvoiceNum",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????????? ?????? ????????????",
            // orderIndex:6
        },
        {
            field: "accountID",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????? ????????",
            // orderIndex:5
        },
        {
            field: "preInvoiceLevel",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????????? ?????? ????????????",
            // orderIndex:5
        },
        {
            field: "preInvoiceDate",
            columnMenu: DateMenu,
            filterable: true,
            filter: "date",
            format: "{0:d}",
            name: "?????????? ?????? ????????????",
            cell: DateCell,
            // orderIndex:4
        },
        {
            field: "relatedTo",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????????? ????",
            // orderIndex:5
        },
        {
            field: "validityDate",
            columnMenu: DateMenu,
            filterable: true,
            filter: "date",
            format: "{0:d}",
            name: "?????????? ????????????",
            cell: DateCell,
            // orderIndex:4
        },
        {
            field: "invoiceState",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????????? ????????????",
            // orderIndex:5
        },
        {
            field: "moneyUnit",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "???????? ??????",
            // orderIndex:4
        },
        {
            field: "total",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "??????????",
            cell: MoneyCell,
            // orderIndex:4
        },
        {
            field: "discount",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "??????????",
            cell: PercentageCell,
            // orderIndex:4
        },
        {
            field: "shipment",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "??????",
            cell: MoneyCell,
            // orderIndex:4
        },
        {
            field: "shipmentTax",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "???????? ???????????? ??????",
            cell: MoneyCell,
            // orderIndex:4
        },
        {
            field: "tax",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "????????????",
            cell: MoneyCell,
            // orderIndex:4
        },
        {
            field: "totalCount",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????? ????",
            cell: MoneyCell,
            // orderIndex:4
        },
        {
            field: "totalNum",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????????? ??????????",
            // orderIndex:4
        },
        {
            field: "productSendMethod",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "???????? ?? ?????????? ????????",
            // orderIndex:4
        },
        {
            field: "paymentConditions",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????????? ????????????",
            // orderIndex:4
        },
        {
            field: "productSendType",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????? ?????????? ????????",
            // orderIndex:4
        },
        {
            field: "note",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "??????????????",
            width: "150px",
            // orderIndex:4
        },
        {
            field: "desc",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "??????????????",
            width: "150px",
            // orderIndex:4
        },
        {
            field: "address", 
            columnMenu: ColumnMenu,
            filterable: true,
            name: "???????? ?????????? ???????? ????????",
            width: "150px",
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
                    gridId={"preInvoiceID"}
                    gridData={data}
                    excelData={excelData}
                    columnList={tempColumn}
                    showSetting={true}
                    showChart={true}
                    showExcelExport={true}
                    showPrint={true}
                    showAdd={true}
                    excelFileName={"preInvoiceIDDetails"}
                    chartDependent={chartObj}
                    rowCount={10}
                    addUrl={"/sale/PreInvoice/NewPreInvoice"}
                    addTitle={"???????????? ?????????????? ?????? ????????????"}
                    savedChartsList={savedCharts}
                    getSavedCharts={getSavedCharts}
                    sortable={true}
                    pageable={true}
                    reorderable={true}
                    selectionMode={"multiple"} //single , multiple
                    selectKeyField={"preInvoiceID"}
                    getSelectedRows={getSelectedRows}
                    getSelectedKeys={getSelectedKeys}
                />
            </div>
        </>
    );
};

export default PreInvoiceManagement;
