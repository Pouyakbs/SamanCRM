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
import ClueActionCell from "../../../components/RKGrid/ClueActionCell";
import PercentageCell from "../../../components/RKGrid/PercentageCell";
import PersonCell from "../../../components/RKGrid/PersonCell";

const ClueManagement = () => {
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
                    birthDate: new Date(data.birthDate),
                    address: data.address.length > 42 ? data.address.substring(0, 42).concat("...") : data.address
                };
            });
            setData(tempData);

            let tempExcel = rawData?.map((data, index) => {
                return {
                    ...data,
                    IndexCell: index + 1,
                    birthDate: getLangDate(i18n.language, new Date(data.birthDate)),
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
            .get(`${appConfig.BaseURL}/api/clues`)
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
        <ClueActionCell {...props} getData={getData} />
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
            field: "nickName",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "لقب",
            // orderIndex:5
        },
        {
            field: "firstName",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "نام",
            // orderIndex:6
        },
        {
            field: "lastName",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "نام خانوادگی",
            // orderIndex:4
        },
        {
            field: "accountName",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "نام حساب",
            // orderIndex:7
        },
        {
            field: "accountName",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "وضعیت",
            // orderIndex:7
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
            field: "nationalCode",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "کد ملی",
            // orderIndex:3
        },
        {
            field: "birthDate",
            columnMenu: DateMenu,
            filterable: true,
            filter: "date",
            format: "{0:d}",
            name: "تاریخ تولد",
            cell: DateCell,
            // orderIndex:3
        },
        {
            field: "address",
            columnMenu: ColumnMenu,
            filterable: true,
            name: "آدرس اصلی",
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
                    gridId={"clueID"}
                    gridData={data}
                    excelData={excelData}
                    columnList={tempColumn}
                    showSetting={true}
                    showChart={true}
                    showExcelExport={true}
                    showPrint={true}
                    showAdd={true}
                    excelFileName={"ClueIDDetails"}
                    chartDependent={chartObj}
                    rowCount={10}
                    addUrl={"/sale/Clues/NewClue"}
                    addTitle={"افزودن اطلاعات سرنخ"}
                    savedChartsList={savedCharts}
                    getSavedCharts={getSavedCharts}
                    sortable={true}
                    pageable={true}
                    reorderable={true}
                    selectionMode={"multiple"} //single , multiple
                    selectKeyField={"clueID"}
                    getSelectedRows={getSelectedRows}
                    getSelectedKeys={getSelectedKeys}
                />
            </div>
        </>
    );
};

export default ClueManagement;
