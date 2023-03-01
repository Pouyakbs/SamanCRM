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
import DutyActionCell from "../../../components/RKGrid/DutyActionCell";
import BooleanCell from "../../../components/RKGrid/BooleanCell";


const DutyManagement = () => {
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
                    date: new Date(data.date),
                    deadline: new Date(data.deadline),
                };
            });
            setData(tempData);

            let tempExcel = rawData?.map((data, index) => {
                return {
                    ...data,
                    IndexCell: index + 1,
                    date: getLangDate(i18n.language, new Date(data.date)),
                    deadline: getLangDate(i18n.language, new Date(data.deadline)),
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
            .get(`${appConfig.BaseURL}/api/activities/Duty`)
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
        <DutyActionCell {...props} getData={getData} />
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
            field: "subject",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "موضوع",
            // orderIndex:5
        },
        {
            field: "relatedTo",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "مرتبط با",
            // orderIndex:6
        },
        {
            field: "priority",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "اولویت",
            // orderIndex:7
        },
        {
            field: "status",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "وضعیت",
            // orderIndex:3
        },
        {
            field: "duration",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "تعداد ساعت",
            // orderIndex:4
        },
        {
            field: "date",
            columnMenu: DateMenu,
            filterable: true,
            filter: "date",
            format: "{0:d}",
            name: "تاریخ شروع",
            cell: DateCell,
            // orderIndex:7
        },
        {
            field: "startTime",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "زمان شروع",
            // orderIndex:7
        },
        {
            field: "deadline",
            columnMenu: DateMenu,
            filterable: true,
            filter: "date",
            format: "{0:d}",
            name: "مهلت انجام",
            cell: DateCell,
            // orderIndex:7
        },
        {
            field: "time",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "زمان اتمام",
            // orderIndex:7
        },
        {
            field: "desc",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "توضیحات",
            width: "150px",
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
                    gridId={"dutyID"}
                    gridData={data}
                    excelData={excelData}
                    columnList={tempColumn}
                    showSetting={true}
                    showChart={true}
                    showExcelExport={true}
                    showPrint={true}
                    showAdd={true}
                    excelFileName={"dutyIDDetails"}
                    chartDependent={chartObj}
                    rowCount={10}
                    addUrl={"/Activities/Duty/CreateDuty"}
                    addTitle={"افزودن وظیفه"}
                    savedChartsList={savedCharts}
                    getSavedCharts={getSavedCharts}
                    sortable={true}
                    pageable={true}
                    reorderable={true}
                    selectionMode={"multiple"} //single , multiple
                    selectKeyField={"dutyID"}
                    getSelectedRows={getSelectedRows}
                    getSelectedKeys={getSelectedKeys}
                />
            </div>
        </>
    );
};

export default DutyManagement;
