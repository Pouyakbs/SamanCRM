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
import SupplierActionCell from "../../../components/RKGrid/SupplierActionCell";
import PercentageCell from "../../../components/RKGrid/PercentageCell";

const SupplierManagement = () => {
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
                    billAddress: data.billAddress.length > 60 ? data.billAddress.substring(0 , 60).concat("...") : data.billAddress
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
            .get(`${appConfig.BaseURL}/api/supplier`)
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
        <SupplierActionCell {...props} getData={getData} />
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
            name: "نام حساب",
            // orderIndex:6
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
            name: "شناسه ملی",
            // orderIndex:3
        },
        {
            field: "subNum",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "شماره ثبت",
            // orderIndex:3
        },
        {
            field: "billAddress",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "آدرس",
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

    return (
        <>
            <div
                style={{
                    backgroundColor: `${theme.palette.background.paper}`,
                    padding: "20px",
                }}
            >
                <RKGrid
                    gridId={"supplierID"}
                    gridData={data}
                    excelData={excelData}
                    columnList={tempColumn}
                    showSetting={true}
                    showChart={true}
                    showExcelExport={true}
                    showPrint={true}
                    showAdd={true}
                    excelFileName={"SupplierIDDetails"}
                    chartDependent={chartObj}
                    rowCount={10}
                    addUrl={"/inventory-management/suppliers/create-supplier"}
                    addTitle={"افزودن تامین کننده"}
                    savedChartsList={savedCharts}
                    getSavedCharts={getSavedCharts}
                    sortable={true}
                    pageable={true}
                    reorderable={true}
                    selectionMode={"multiple"} //single , multiple
                    selectKeyField={"supplierID"}
                    getSelectedRows={getSelectedRows}
                    getSelectedKeys={getSelectedKeys}
                />
            </div>
        </>
    );
};

export default SupplierManagement;
