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
            field: "ceoName",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????? ????????????????",
            // orderIndex:6
        },
        {
            field: "activityField",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????????? ????????????",
            // orderIndex:4
        },
        {
            field: "activityExp",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????????? ????????????",
            // orderIndex:7
        },
        {
            field: "productFields",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????? ??????????",
            cell: ProductNameCell,
            // orderIndex:7
        },
        {
            field: "productFields",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????? ???????? ????",
            cell: MinPriceCell,
        },
        {
            field: "productFields",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????? ???????? ????",
            cell: MaxPriceCell,
        },
        {
            field: "website",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "???????? ????????",
            // orderIndex:3
        },
        {
            field: "compAddress",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "???????? ????????",
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
                    addTitle={"???????????? ?????????????? ????????"}
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
