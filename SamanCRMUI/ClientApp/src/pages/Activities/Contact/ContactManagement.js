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
import ContactActionCell from "../../../components/RKGrid/ContactActionCell";

const ContactManagement = () => {
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
                };
            });
            setData(tempData);

            let tempExcel = rawData?.map((data, index) => {
                return {
                    ...data,
                    IndexCell: index + 1,
                    date: getLangDate(i18n.language, new Date(data.date)),
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
            .get(`${appConfig.BaseURL}/api/activities/Contact`)
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
        <ContactActionCell {...props} getData={getData} />
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
            field: "phoneNumber",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "تلفن تماس",
            // orderIndex:4
        },
        {
            field: "internalNum",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "داخلی",
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
            field: "date",
            columnMenu: DateMenu,
            filterable: true,
            filter: "date",
            format: "{0:d}",
            name: "تاریخ",
            cell: DateCell,
            // orderIndex:7
        },
        {
            field: "time",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "زمان",
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
            field: "duration",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "مدت تماس",
            // orderIndex:7
        },
        {
            field: "sendInvitation",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "ارسال دعوت نامه (پیامک)",
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
                    gridId={"contactID"}
                    gridData={data}
                    excelData={excelData}
                    columnList={tempColumn}
                    showSetting={true}
                    showChart={true}
                    showExcelExport={true}
                    showPrint={true}
                    showAdd={true}
                    excelFileName={"contactIDDetails"}
                    chartDependent={chartObj}
                    rowCount={10}
                    addUrl={"/Activities/Contact/CreateContact"}
                    addTitle={"افزودن اطلاعات تماس"}
                    savedChartsList={savedCharts}
                    getSavedCharts={getSavedCharts}
                    sortable={true}
                    pageable={true}
                    reorderable={true}
                    selectionMode={"multiple"} //single , multiple
                    selectKeyField={"contactID"}
                    getSelectedRows={getSelectedRows}
                    getSelectedKeys={getSelectedKeys}
                />
            </div>
        </>
    );
};

export default ContactManagement;
