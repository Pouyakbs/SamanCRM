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
import CompetitorActionCell from "../../../components/RKGrid/CompetitorActionCell";
import ProductNameCell from "../../../components/RKGrid/ProductNameCell";
import MinPriceCell from "../../../components/RKGrid/MinPriceCell";
import MaxPriceCell from "../../../components/RKGrid/MaxPriceCell";

const CompetitorManagement = () => {
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
                console.log("address length" , data.compAddress.length)
                return {
                    ...data,
                    contactFields: JSON.parse(data.contactFields),
                    productFields: JSON.parse(data.productFields),
                    compAddress: data.compAddress.length > 42 ? data.compAddress.substring(0 , 42).concat("...") : data.compAddress
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
            .get(`${appConfig.BaseURL}/api/competitor`)
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
        <CompetitorActionCell {...props} getData={getData} />
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
            // orderIndex:5
        },
        {
            field: "ceoName",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "نام مدیرعامل",
            // orderIndex:6
        },
        {
            field: "activityField",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "زمینه فعالیت",
            // orderIndex:4
        },
        {
            field: "activityExp",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "سابقه فعالیت",
            // orderIndex:7
        },
        {
            field: "productFields",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "نام محصول",
            cell: ProductNameCell,
            // orderIndex:7
        },
        {
            field: "productFields",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "رنج قیمت از",
            cell: MinPriceCell,
        },
        {
            field: "productFields",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "رنج قیمت تا",
            cell: MaxPriceCell,
        },
        {
            field: "website",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "آدرس سایت",
            // orderIndex:3
        },
        {
            field: "compAddress",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "آدرس رقیب",
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
                    gridId={"competitorID"}
                    gridData={data}
                    excelData={excelData}
                    columnList={tempColumn}
                    showSetting={true}
                    showChart={true}
                    showExcelExport={true}
                    showPrint={true}
                    showAdd={true}
                    excelFileName={"CompetitorIDDetails"}
                    chartDependent={chartObj}
                    rowCount={10}
                    addUrl={"/accounts/Competitor/NewCompetitor"}
                    addTitle={"افزودن اطلاعات رقیب"}
                    savedChartsList={savedCharts}
                    getSavedCharts={getSavedCharts}
                    sortable={true}
                    pageable={true}
                    reorderable={true}
                    selectionMode={"multiple"} //single , multiple
                    selectKeyField={"competitorID"}
                    getSelectedRows={getSelectedRows}
                    getSelectedKeys={getSelectedKeys}
                />
            </div>
        </>
    );
};

export default CompetitorManagement;
