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
            name: "????????",
            cell: IndexCell,
            sortable: false,
            reorderable: true,
        },
        {
            field: "campaignName",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????? ??????????",
            // orderIndex:5
        },
        {
            field: "status",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "??????????",
            // orderIndex:6
        },
        {
            field: "type",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "??????",
            // orderIndex:4
        },
        {
            field: "repetitionRate",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????? ??????????",
            // orderIndex:7
        },
        {
          field: "startDate",
          columnMenu: DateMenu,
          filterable: true,
          filter: "date",
          format: "{0:d}",
          name: "?????????? ????????",
          cell: DateCell,
          // orderIndex:3
        },
        {
          field: "endDate",
          columnMenu: DateMenu,
          filterable: true,
          filter: "date",
          format: "{0:d}",
          name: "?????????? ??????????",
          cell: DateCell,
          // orderIndex:3
        },
        {
            field: "moneyUnit",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "???????? ??????",
            // orderIndex:3
        },
        {
            field: "budget",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "??????????",
            cell: MoneyCell,
            // orderIndex:7
        },
        {
            field: "realCost",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????????? ??????????",
            cell: MoneyCell,
            // orderIndex:7
        },
        {
            field: "expectedIncome",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????????? ???????? ????????????",
            cell: MoneyCell,
            // orderIndex:7
        },
        {
            field: "expectedCost",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "?????????? ???????? ????????????",
            cell: MoneyCell,
            // orderIndex:7
        },
        {
            field: "expectedAnswer",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "???????? ???????? ????????????",
            // orderIndex:7
        },
        {
            field: "target",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "??????",
            width: "150px",
            // orderIndex:3
        },
        {
            field: "desc",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "??????????????",
            width: "150px",
            // orderIndex:3
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
                    addTitle={"???????????? ??????????"}
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
