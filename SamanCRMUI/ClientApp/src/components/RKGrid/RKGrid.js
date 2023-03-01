import React, { useEffect, useRef, useState, useCallback } from "react";
import { Grid, GridColumn, getSelectedState } from "@progress/kendo-react-grid";
import { getter } from "@progress/kendo-react-common";
import './default-main-dark.css'
import './default-ocean-blue.css'
import './style.css'
import { process } from "@progress/kendo-data-query";
import SettingsIcon from '@mui/icons-material/Settings';
import Checkbox from '@mui/material/Checkbox';
import {
    LocalizationProvider,
} from "@progress/kendo-react-intl";
// import { useReactToPrint } from "react-to-print";
import { ExcelExport, ExcelExportColumn } from "@progress/kendo-react-excel-export";
import { useTranslation } from "react-i18next";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import BarChartIcon from '@mui/icons-material/BarChart';
import Button from '@mui/material/Button';
import { IconFileSpreadsheet, IconPrinter } from '@tabler/icons'
import { FormControlLabel, Radio, RadioGroup, useTheme } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { getLangDate } from '../../utils/getLangDate'
import { loadLangMsg } from '../../utils/loadLangMsg'
import AddIcon from '@mui/icons-material/Add';
// import ActionCellMain from './ActionCellMain'
import { SelectBox } from "devextreme-react/select-box";
import { ColorPicker } from "@progress/kendo-react-inputs";
import Chart from "../../components/chart";
import PieChart from "../../components/chart/PieChart";
import PieChartIcon from "@mui/icons-material/PieChart";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { AreaChartOutlined } from "@ant-design/icons";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import { orderBy } from "@progress/kendo-data-query";
import chartPreview from './chart-preview.gif'
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useLocation } from "react-router-dom";

// const pSize=['A3','A4','A5','B4','B5','letter','landscape','portrait']

let style1 = [
    "background: pink",
    "color: #fff",
    "padding: 10px",
    "font-weight: bold",
    "font-size: 12px",
    "border-radius: 4px 0 0 4px",
].join(" ;");

let style2 = [
    "background: pink",
    "color: red",
    "padding: 10px 0",
    "margin: 0 -7px",
    "font-weight: bold",
    "font-size: 12px",
].join(" ;");

let style3 = [
    "background: pink",
    "color: #fff",
    "padding: 10px",
    "font-weight: bold",
    "font-size: 12px",
    "border-radius:0 4px 4px 0",
].join(" ;");


const EmptyHeaderCell = (props) => <span></span>

const RKGrid = ({
    gridId,
    gridData = [],
    showSetting = true,
    showChart = true,
    showExcelExport = true,
    showPrint = true,
    showAdd = false,
    addUrl,
    addTitle,
    excelData = [],
    columnList = [],
    chartDependent = [],
    rowCount = 10,
    savedChartsList = [],
    excelFileName = 'download',
    getSavedCharts,
    sortable = true,
    pageable = true,
    selectable = false,
    selectionMode = 'multiple',
    selectKeyField,
    getSelectedKeys,
    getSelectedRows,
    reorderable = true,

    expandDetail = false,
    detail,
    expandField = "expanded",
    onExpandChange,
    activeClickRow = false,
    getClickRow,
    extraBtn = <></>

}) => {

    const location = useLocation()
    const { pathname } = location


    useEffect(() => {
        console.log("%c RKGrid developed by Roya Kalhory with  %c❤  %chttps://www.linkedin.com/in/roya-kalhory-6952859a/ ", style1, style2, style3);
    }, [])


    const colorPicker1 = useRef()
    const colorPicker2 = useRef()
    const colorPicker3 = useRef()


    const printSetting = showPrint ? JSON.parse(localStorage.getItem(`print_${gridId}`)) : null;
    const chartSetting = showChart ? JSON.parse(localStorage.getItem(`chart_${gridId}`)) : null;
    const gridSetting = showSetting ? JSON.parse(localStorage.getItem(`settings_${gridId}`)) : null;
    const order = reorderable ? JSON.parse(localStorage.getItem(`order_${gridId}`)) : null;

    const theme = useTheme();
    const { t, i18n } = useTranslation();
    const [data, setData] = useState([])
    const [coloring, setColoring] = useState(false)

    const [autoWidth, setAutoWidth] = useState('90px')


    let tempColumn = columnList?.map(item => {
        if (item?.children?.length) {
            let t = item?.children.map((c) => {
                if (c?.width) {
                    return c
                } else {
                    return {
                        ...c,
                        width: autoWidth
                    }
                }
            })
            return {
                ...item,
                children: t
            }

        } else {
            if (item?.width) {
                return item
            } else {
                return {
                    ...item,
                    width: autoWidth
                }
            }
        }


    })

    const columnsObj = columnList?.map((item) => {
        // if(item?.children?.length){
        //     let temp=item?.children.map((c)=>{
        //         return {value: c.field, title:`${t(item.name)} - ${t(c.name)}`,parent:item.field}
        //     })
        //     return [...temp]
        // }else{
        //     if(item.field!=='actionCell') return  {value: item.field, title: t(item.name)}
        // }
        if (item.field !== 'actionCell') return { value: item.field, title: t(item.name) }

        // }).filter(Boolean).flat(3)
    }).filter(Boolean)


    const chartObj = columnList?.map((item) => {
        if (item?.children?.length) {
            let temp = item?.children.map((c) => {
                return { value: c.field, title: `${t(item.name)} - ${t(c.name)}`, parent: item.field }
            })
            return [...temp]
        } else {
            if (item.field !== 'actionCell') return { value: item.field, title: t(item.name) }
        }
        // if(item.field!=='actionCell') return  {value: item.field, title: t(item.name)}

    }).filter(Boolean).flat(3)


    let fObj = {}

    columnList?.forEach((item) => {
        // if(item?.children?.length){
        //     fObj[item.field]={}
        //  item?.children.forEach((c)=>{
        //         fObj[item.field][c.field]={grid:true, excel:true}
        //     })
        // }else{
        //     if(item.field!=='actionCell'){
        //         fObj[item.field]={grid:true, excel:true}
        //     }else{
        //         fObj[item.field]={grid:true, excel:false}
        //     }
        // }

        if (item.field !== 'actionCell') {
            fObj[item.field] = { grid: true, excel: true }
        } else {
            fObj[item.field] = { grid: true, excel: false }
        }

    })

    const [fields, setFields] = useState(gridSetting?.fields || fObj)



    let pObj = {}

    columnList?.forEach((item) => {
        if (item?.children?.length) {
            pObj[item.field] = {}
            item?.children.forEach((c) => {
                pObj[item.field][c.field] = true
            })
        } else {
            if (item.field !== 'actionCell') {
                pObj[item.field] = true
            }
        }
    })

    const [printField, setPrintField] = useState(printSetting || pObj)

    let body = document.querySelector('body')

    useEffect(() => {
        if (theme.palette.mode === 'light') {
            body.classList.remove('dark-theme-grid')
        } else {
            body.classList.add('dark-theme-grid')
        }
    }, [theme.palette.mode])

    useEffect(() => {
        if (i18n.dir() === 'rtl') {
            body.classList.add('rtl-kendo-grid')
            body.classList.remove('ltr-kendo-grid')
        } else {
            body.classList.add('ltr-kendo-grid')
            body.classList.remove('rtl-kendo-grid')
        }
    }, [i18n.language])


    const [result, setResult] = useState([]);
    const [sort, setSort] = React.useState([]);
    const sortChange = (event) => {
        setData(getData(event.sort));
        setSort(event.sort);
    };
    const getData = (sort) => {
        return orderBy(data, sort);
    };

    const defaultLightRowColor1 = '#fff'
    const defaultLightRowColor2 = '#ebebeb'
    const defaultDarkRowColor1 = '#101010'
    const defaultDarkRowColor2 = 'rgba(255, 255, 255, 0.04)'
    // const defaultRowColor2='#1890ff14'


    const [take, setTake] = useState(!pageable ? gridData?.length : parseInt(gridSetting?.take) || rowCount);
    const [skip, setSkip] = useState(0);
    // const [printSize, setPrintSize] = useState(pSize[0]);
    const [filterExcelFields, setFilterExcelFields] = useState(true);
    const [rowColor1, setRowColor1] = useState(gridSetting?.rowColor1 || '')
    const [rowColor2, setRowColor2] = useState(gridSetting?.rowColor2 || '')
    const [rowClickColor, setRowClickColor] = useState('inherit')
    const [newChart, setNewChart] = useState('')
    const [savedCharts, setSavedCharts] = useState(savedChartsList)

    useEffect(() => {
        showChart && getSavedCharts && getSavedCharts(savedCharts)
    }, [savedCharts])


    const gridContainer = useRef(null)
    const gridRef = useRef()

    const columnReorder = (e) => {
        let temp = e.target.columnResize.columns.map(item => ({ field: item.field, index: item.index }))
        let tempOrder = tempColumn?.map(item => {
            let field = e.columns.filter((f) => f.field === item.field)[0]
            return {
                ...item,
                // orderIndex:field?.orderIndex||item.orderIndex
            }
        })
        setColumnArr(tempOrder)
        reorderable && localStorage.setItem(`order_${gridId}`, JSON.stringify(temp))
    }

    const setOrder = (order) => {
        let tempOrder = order?.map(item => {
            let field = tempColumn.filter((f) => f.field === item.field)[0]
            return field
        })

        return tempOrder
    }


    let saveOrder = order?.length ? setOrder(order) : tempColumn
    const [columnArr, setColumnArr] = useState(saveOrder)
    const chartTypes = [
        { name: t('میله ای'), value: 'bar', icon: <BarChartIcon /> },
        { name: t('دایره ای'), value: 'pie', icon: <PieChartIcon /> },
        { name: t('خطی'), value: 'line', icon: <ShowChartIcon /> },
        { name: t('مساحت'), value: 'area', icon: <AreaChartOutlined style={{ fontSize: '22px' }} /> },
        { name: t('پراکندگی'), value: 'scatter', icon: <ScatterPlotIcon /> },
    ]
    const createDataState = (dataState) => {
        return {
            result: process(data?.slice(0), dataState),
            dataState: dataState,
        };
    };

    const [dataState, setDataState] = useState();
    let initialState = createDataState({
        take: take,
        skip: skip,
        // group:[{field:'DocumentBalance'}]
    });

    const dataStateChange = (event) => {
        let updatedState = createDataState(event.dataState);
        setResult(updatedState.result);
        setDataState(updatedState.dataState);
    };


    const [anchorSetting, setAnchorSetting] = useState(null);
    const [anchorEcxel, setAnchorEcxel] = useState(null);
    const [anchorPrint, setAnchorPrint] = useState(null);
    const [anchorChart, setAnchorChart] = useState(null);
    const [gridW, setGridW] = useState();
    const [selectedState, setSelectedState] = useState({});
    const [chartMap, setChartMap] = useState(chartSetting?.chartMap);
    const [chartGrid, setChartGrid] = useState(chartSetting?.chartGrid);
    const [xaxis, setXaxis] = useState([]);
    const [pieSeries, setPieSeries] = useState([])
    let CObj = {}
    chartDependent?.forEach((item) => {
        CObj[item.value] = false
    })

    const [dependentField, setDependentField] = useState(chartSetting?.dependentField || CObj)
    const [pieDependent, setPieDependent] = useState(chartSetting?.pieDependent)
    const [chartSeries, setChartSeries] = useState([])
    const [pieLabels, setPieLabels] = useState([])
    const [mainChartField, setMainChartField] = useState(chartSetting?.mainChartField);
    const [chartType, setChartType] = useState(chartSetting?.chartType);


    const Item = (data) => {
        return (
            <div className={`custom-select-item ${i18n.dir() === 'rtl' ? 'rtl' : ''}`}>
                {data.icon}
                <div className="name">{data.name}</div>
            </div>
        );
    }




    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const handleResize = async () => {
        await timeout(500);
        setGridW(gridContainer?.current?.offsetWidth - 20)
    };

    useEffect(() => {
        let widthList = tempColumn?.map((item) => {
            if (item?.width !== autoWidth) {
                let wi = item?.width?.replace('px', '')
                return parseInt(wi)
            }
        })
        widthList = widthList.filter(Boolean)
        let fixWidth = widthList?.reduce((a, b) => a + b, 0)
        let selecFielsWidth = selectable ? 40 : 0
        fixWidth = fixWidth + selecFielsWidth
        let w = gridW - fixWidth
        let count = Object.keys(fields).length - widthList.length
        let cellW = parseInt(w / count)
        cellW = cellW < 90 ? 90 : cellW
        setAutoWidth(`${cellW}px`)
    }, [gridW])

    const openSetting = Boolean(anchorSetting);
    const idSetting = openSetting ? 'simple-popover' : undefined;
    const openEcxel = Boolean(anchorEcxel);
    const idEcxel = openEcxel ? 'simple-popover' : undefined;
    const openPrint = Boolean(anchorPrint);
    const idPrint = openPrint ? 'simple-popover' : undefined;
    const openChart = Boolean(anchorChart);
    const idChart = openChart ? 'simple-popover' : undefined;


    // const setPercentage = (percentage) => {
    //     console.log('f%%%%',Math.round(gridW / 100) * percentage)
    //     return Math.round(gridW / 100) * percentage;
    // };


    // const printRef = useRef();
    const _export = useRef(null);
    const excelExport = () => {
        if (_export.current !== null) {
            _export.current.save();
        }
    };


    useEffect(() => {

        if (dataState) {
            let updatedState = createDataState(dataState);
            updatedState.dataState.filter = { filters: [], logic: '' }
            setResult(updatedState.result);
            setDataState(updatedState.dataState);
        }
        loadLangMsg(i18n.language)

    }, [i18n.language, gridData])

    useEffect(() => {
        if (selectable) {
            let tempData = gridData?.map((data, index) => {
                return {
                    ...data,
                    selected: selectedState[idGetter(data)] || data.selected || false,
                }
            })
            setData(tempData)
        } else {
            setData(gridData)
        }

    }, [selectedState, gridData])


    // const reactToPrintContent = useCallback(() => {
    //     return printRef.current;
    // }, [printRef.current]);
    //
    // const handlePrint = useReactToPrint({
    //     content: reactToPrintContent,
    //     documentTitle: "AwesomeFileName",
    //     removeAfterPrint: true
    // });


    useEffect(() => {

        // if (data?.length){
        initialState.dataState.take = parseInt(take)
        initialState.dataState.skip = skip
        setResult(initialState.result)
        // }
    }, [data, take, skip])

    function clearAllFilterClass() {
        const filterButton = document.querySelectorAll('.k-grid-header-menu');
        filterButton.forEach(btn => {
            btn.classList.remove('open-filter');
        });
    }

    useEffect(() => {
        const filterButton = document.querySelectorAll('.k-grid-header-menu');
        window.addEventListener('blur', blurDoc);

        function blurDoc() {
            clearAllFilterClass()
        }

        function toggleFilterClass(e) {
            let btnClick = e.target.closest('.k-grid-header-menu')
            filterButton.forEach(btn => {
                if (btn === btnClick) {
                    btnClick.classList.toggle('open-filter')
                } else {
                    btn.classList.remove('open-filter');
                }
            });

        }

        function removeFilterClass(e) {
            if (e.target.closest('.k-actions') && !(!!e.target.classList.contains('k-actions') && !!e.target.querySelector('button:disabled'))) {
                clearAllFilterClass()
            } else if (!(e.target.closest('.k-grid-header-menu')) && !(e.target.closest('.k-animation-container')) && !(e.target.closest('.rmdp-day'))) {
                clearAllFilterClass()
            }
        }
        window.addEventListener('click', removeFilterClass);
        filterButton.forEach(btn => {
            btn.addEventListener('click', toggleFilterClass, false);
        });
        setGridW(gridContainer?.current?.offsetWidth - 20)
        return () => {
            window.removeEventListener('blur', blurDoc);
            window.removeEventListener('click', removeFilterClass);
            filterButton.forEach(btn => {
                btn.removeEventListener('click', toggleFilterClass);
            });
        }
    }, [])


    const componentRef = React.useRef();

    useEffect(() => {
        if (Object.keys(dependentField)?.length && data?.length) {
            let temp = chartDependent?.map((field) => {
                let obj1 = dependentField[field.value] ? {
                    name: field.title,
                    data: data?.map((item) => (item[field.value]))
                } : null
                return obj1
            })
            temp = temp.filter(item => item != null)
            setChartSeries(temp)
        }

    }, [dependentField, data])


    function clickRow(e) {
        if (coloring) {
            let td = e.syntheticEvent.target.closest('tr').querySelectorAll('td')
            td.forEach((item) => {
                if (item.classList.contains('row-custom-bg')) {
                    item.classList.remove('row-custom-bg')
                } else {
                    item.classList.add('row-custom-bg')
                }

            })
        }
        if (activeClickRow && !coloring) {
            getClickRow(e)
        }
    }


    useEffect(() => {
        if (chartDependent?.length && dependentField?.length && data?.length) {
            let temp = chartDependent?.map((field) => {
                let obj1 = dependentField[field.value] ? {
                    name: field.title,
                    data: data?.map((item) => {
                        let temp = (item[field.value] instanceof Date) ? getLangDate(i18n.language, item[field.value]) : item[field.value]
                        return `${temp}`
                    })
                } : null
                return obj1
            })
            temp = temp.filter(item => item != null)
            setChartSeries(temp)
        }

    }, [dependentField, i18n.language])

    useEffect(() => {
        if (mainChartField?.length && data?.length) {
            let temp = data?.map((item) => {
                let temp = (item[mainChartField] instanceof Date) ? getLangDate(i18n.language, item[mainChartField]) : item[mainChartField]
                return `${temp}`
            })
            setXaxis(temp)
            setPieLabels(temp)
        }
    }, [mainChartField, i18n.language, data])


    useEffect(() => {
        if (pieDependent?.length && data?.length) {
            let temp = data?.map((item) => (item[pieDependent]))
            setPieSeries(temp)
        }

    }, [pieDependent, data])


    useEffect(() => {
        let settingTemp = {
            mainChartField: mainChartField,
            chartType: chartType,
            chartMap: chartMap,
            chartGrid: chartGrid,
        }

        if (chartType === 'pie') {
            settingTemp.pieDependent = pieDependent
            showChart && localStorage.setItem(`chart_${gridId}`, JSON.stringify(settingTemp))
        } else {
            settingTemp.dependentField = dependentField
            showChart && localStorage.setItem(`chart_${gridId}`, JSON.stringify(settingTemp))
        }
    }, [mainChartField, pieDependent, dependentField, chartType, chartGrid, chartMap])

    useEffect(() => {
        let settingTemp = {
            fields: fields,
            take: take,
            rowColor1: rowColor1,
            rowColor2: rowColor2,
        }
        showSetting && localStorage.setItem(`settings_${gridId}`, JSON.stringify(settingTemp))

    }, [fields, take, rowColor1, rowColor2])


    useEffect(() => {
        showPrint && localStorage.setItem(`print_${gridId}`, JSON.stringify(printField))

    }, [printField])

    const pageChange = (event) => {
        setSkip(event.page.skip)
    };

    useEffect(() => {
        let selected = data?.filter(item => item.selected === true)
        selectable && getSelectedRows && getSelectedRows(selected)
        selectable && getSelectedKeys && getSelectedKeys(selectedState)
    }, [data, selectedState])


    // --------selection-----
    const idGetter = getter(selectKeyField);


    const onSelectionChange = React.useCallback(
        (event) => {
            if (selectionMode === 'single' && event?.dataItem?.selected) {
                setSelectedState({});
            } else {
                const newSelectedState = getSelectedState({
                    event,
                    selectedState: selectedState,
                    dataItemKey: selectKeyField,
                });
                setSelectedState(newSelectedState);
            }

        },
        [selectedState]
    );

    const onHeaderSelectionChange = React.useCallback((event) => {
        const checkboxElement = event.syntheticEvent.target;
        const checked = checkboxElement.checked;
        const newSelectedState = {};
        event?.dataItems?.forEach((item) => {
            newSelectedState[idGetter(item)] = checked;
        });
        setSelectedState({ ...selectedState, ...newSelectedState });
    }, [selectedState]);



    // --------selection-----

    return (
        <>
            <div style={{ backgroundColor: `${theme.palette.background.paper}`, padding: '20px' }} ref={componentRef}>
                <div className='grid-setting'>
                    <div className='row mb-1 justify-content-between'>
                        <div className="col-5 d-flex">
                            {showSetting && <div>
                                <Tooltip title={t("تنظیمات")} arrow>
                                    <Button
                                        aria-describedby={idSetting}
                                        variant="outlined"
                                        className="kendo-setting-btn"
                                        onClick={(e) => setAnchorSetting(e.currentTarget)}
                                        disabled={!result?.data?.length}

                                    >
                                        <SettingsIcon />
                                    </Button>
                                </Tooltip>
                                <Popover
                                    id={idSetting}
                                    open={openSetting}
                                    anchorEl={anchorSetting}
                                    onClose={() => setAnchorSetting(null)}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: i18n.dir() === "rtl" ? "right" : "left"
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: i18n.dir() === "rtl" ? "right" : "left"
                                    }}
                                    PaperProps={{
                                        style: { width: "460px" }
                                    }}
                                    sx={{ direction: i18n.dir() }}
                                    className="grid-popover"
                                >
                                    <div className="row">
                                        <div className="col-5">
                                            <h5 className="popover-title">
                                                {t("ستون های قابل نمایش")}
                                            </h5>
                                            <ul className="field-list">
                                                {columnsObj?.map((item, index) => {
                                                    // if(item?.parent){
                                                    //     return (<li key={index}>
                                                    //         <FormControlLabel
                                                    //             control={
                                                    //                 <Checkbox
                                                    //                     checked={fields[item.value]?.grid}
                                                    //                     onChange={(event) => {
                                                    //                         let temp = { ...fields };
                                                    //                         temp[item.parent][item.value].grid = event.target.checked;
                                                    //                         setFields(temp);
                                                    //                     }
                                                    //                     }
                                                    //                     name="checked"
                                                    //                     color="primary"
                                                    //                     size="small"
                                                    //                 />
                                                    //             }
                                                    //             label={
                                                    //                 <Typography variant="h6">
                                                    //                     {item.title}
                                                    //                 </Typography>
                                                    //             }
                                                    //         />
                                                    //     </li>)
                                                    // }else{
                                                    return <li key={index}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={!!fields[item.value]?.grid}
                                                                    onChange={(event) => {
                                                                        let temp = { ...fields };
                                                                        temp[item.value].grid = event.target.checked;
                                                                        setFields(temp);
                                                                    }
                                                                    }
                                                                    name="checked"
                                                                    color="primary"
                                                                    size="small"
                                                                />
                                                            }
                                                            label={
                                                                <Typography variant="h6">
                                                                    {item.title}
                                                                </Typography>
                                                            }
                                                        />
                                                    </li>
                                                    // }
                                                })}
                                            </ul>
                                        </div>
                                        <div className="col-7">
                                            <h5 className="popover-title">
                                                {t("تنظیمات")}
                                            </h5>
                                            <div className="content form-design p-0">
                                                <div className="title">
                                                    <span>{t("تعداد سطر در صفحه")}</span>
                                                </div>
                                                <div className="wrapper">
                                                    <div>
                                                        <input
                                                            className="form-input"
                                                            type="number"
                                                            id="take"
                                                            name="take"
                                                            onChange={e => setTake(parseInt(e.target.value))}
                                                            value={take}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <h5 className="popover-title mt-5">
                                                {t("رنگ آمیزی سطرهای جدول")}
                                            </h5>
                                            <div className="content">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="title">
                                                            <span>{t("سطرهای فرد")}</span>
                                                        </div>
                                                        <div onClick={e => {
                                                            let btn = colorPicker1.current.element.querySelector('button')
                                                            if (!e.target.closest('.k-animation-container')) {
                                                                btn.click()
                                                            }
                                                        }
                                                        }>
                                                            <ColorPicker ref={colorPicker1} view="gradient" value={rowColor1}
                                                                onChange={c => setRowColor1(c.value)} />
                                                        </div>

                                                    </div>
                                                    <div className="col-6">
                                                        <div className="title">
                                                            <span>{t("سطرهای زوج")}</span>
                                                        </div>
                                                        <div onClick={e => {
                                                            let btn = colorPicker2.current.element.querySelector('button')
                                                            if (!e.target.closest('.k-animation-container')) {
                                                                btn.click()
                                                            }
                                                        }
                                                        }>
                                                            <ColorPicker ref={colorPicker2} view="gradient" value={rowColor2}
                                                                onChange={c => setRowColor2(c.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center mt-3">
                                                    <div className="col-8">
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={!!coloring}
                                                                    onChange={(event) => {
                                                                        setColoring(event.target.checked);
                                                                    }}
                                                                    name="checked"
                                                                    color="primary"
                                                                    size="small"
                                                                />
                                                            }
                                                            label={
                                                                <Typography variant="h6">
                                                                    {t("رنگ آمیزی سطر با کلیک")}
                                                                </Typography>
                                                            }
                                                        />
                                                    </div>

                                                    <div className="col-4">
                                                        <div onClick={e => {
                                                            let btn = colorPicker3.current.element.querySelector('button')
                                                            if (!e.target.closest('.k-animation-container')) {
                                                                btn.click()
                                                            }
                                                        }
                                                        }>
                                                            <ColorPicker ref={colorPicker3} view="gradient" value={rowClickColor}
                                                                onChange={c => setRowClickColor(c.value)} />
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="d-flex justify-content-center mt-3">
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        onClick={() => {
                                                            setColoring(false);
                                                            setRowColor1("");
                                                            setRowColor2("");
                                                            setRowClickColor("");
                                                            gridContainer?.current?.querySelectorAll("tbody tr")?.forEach((item) => {
                                                                item.removeAttribute("style");
                                                            });
                                                            let settingTemp = {
                                                                fields: fields,
                                                                take: take,
                                                                rowColor1: "",
                                                                rowColor2: ""
                                                            };
                                                            showSetting && localStorage.setItem(`settings_${gridId}`, JSON.stringify(settingTemp));
                                                            setColoring(false);

                                                        }}
                                                        style={i18n.dir() === "rtl" ? { marginRight: "10px" } : { marginLeft: "10px" }}
                                                    >
                                                        {t("پاک کردن رنگ آمیزی ها")}
                                                    </Button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </Popover>
                            </div>}
                            {extraBtn}
                        </div>
                        <div className='col-7'>
                            <div className='d-flex justify-content-end grid-btn-section'>
                                {showAdd && <div className="grid-btn-section-item">
                                    <Tooltip title={addTitle} arrow>
                                        <Button
                                            variant="outlined"
                                            className="kendo-setting-btn"
                                        >
                                            <Link to={addUrl}>
                                                <AddIcon />
                                            </Link>
                                        </Button>
                                    </Tooltip>
                                </div>}
                                {showChart && <div className="grid-btn-section-item">
                                    <Tooltip title={t("نمودار")} arrow>
                                        <Button
                                            aria-describedby={idChart}
                                            variant="outlined"
                                            className="kendo-setting-btn"
                                            onClick={(e) => setAnchorChart(e.currentTarget)}
                                            disabled={!result?.data?.length}
                                        >
                                            <BarChartIcon />
                                        </Button>
                                    </Tooltip>
                                    <Popover
                                        id={idChart}
                                        open={openChart}
                                        anchorEl={anchorChart}
                                        onClose={() => setAnchorChart(null)}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: i18n.dir() === "rtl" ? "left" : "right"
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: i18n.dir() === "rtl" ? "left" : "right"
                                        }}
                                        PaperProps={{
                                            style: { width: "700px", maxWidth: "100vw" }
                                        }}
                                        sx={{ direction: i18n.dir() }}
                                        className="grid-popover chart"
                                    >
                                        <div className="row">
                                            <div className="col-sm-4 col-12">
                                                <h5 className="popover-title">
                                                    {t("تنظیمات")}
                                                </h5>
                                                <div className="title">
                                                    <span>{t("نوع نمودار")}</span>
                                                </div>
                                                <SelectBox
                                                    dataSource={chartTypes}
                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                    onValueChanged={(e) => setChartType(e.value)}
                                                    defaultValue={chartType}
                                                    className="selectBox"
                                                    noDataText={t("اطلاعات یافت نشد")}
                                                    itemRender={Item}
                                                    valueExpr="value"
                                                    displayExpr="name"
                                                    placeholder={""}
                                                    name="chartType"
                                                    id="chartType"
                                                    searchEnabled
                                                />
                                                <div>

                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={!!chartMap}
                                                                onChange={(event) => setChartMap(event.target.checked)
                                                                }
                                                                name="chartMap"
                                                                color="primary"
                                                                size="small"
                                                            />
                                                        }
                                                        label={
                                                            <Typography variant="h6">
                                                                {t("نمایش نقشه راهنما")}
                                                            </Typography>
                                                        }
                                                        className="mt-3"
                                                    />
                                                </div>
                                                <div>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={!!chartGrid}
                                                                onChange={(event) => setChartGrid(event.target.checked)
                                                                }
                                                                name="chartGrid"
                                                                color="primary"
                                                                size="small"
                                                            />
                                                        }
                                                        label={
                                                            <Typography variant="h6">
                                                                {t("نمایش خطوط راهنما")}
                                                            </Typography>
                                                        }
                                                        className="mt-3"
                                                    />
                                                </div>

                                                <div className="title mt-3">
                                                    <span>{t("مولفه اصلی")}</span>
                                                </div>
                                                <SelectBox
                                                    dataSource={chartObj}
                                                    value={mainChartField}
                                                    rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                    onValueChanged={(e) => setMainChartField(e.value)}
                                                    className="selectBox"
                                                    noDataText={t("اطلاعات یافت نشد")}
                                                    itemRender={null}
                                                    displayExpr="title"
                                                    valueExpr="value"
                                                    placeholder={""}
                                                    name="chartType"
                                                    id="chartType"
                                                    searchEnabled
                                                />
                                                <h2 className="title mt-3">{t("مولفه وابسته")}</h2>
                                                <ul className="field-list">
                                                    {chartType === "pie" ?
                                                        <RadioGroup
                                                            name="pie-field"
                                                            defaultChecked={pieDependent}
                                                            defaultValue={pieDependent}
                                                            onChange={e => setPieDependent(e.target.defaultValue)}
                                                        >
                                                            {chartDependent?.map((item, index) => (
                                                                mainChartField !== item.value &&
                                                                <li key={index}><FormControlLabel value={item.value}
                                                                    control={<Radio />}
                                                                    label={item.title} /></li>
                                                            ))}

                                                        </RadioGroup>

                                                        : chartDependent?.map((item, index) => (
                                                            mainChartField !== item.value && <li key={index}>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={!!dependentField[item.value]}
                                                                            onChange={(event) => {
                                                                                let temp = { ...dependentField };
                                                                                temp[item.value] = event.target.checked;
                                                                                setDependentField(temp);
                                                                            }
                                                                            }
                                                                            name="checked"
                                                                            color="primary"
                                                                            size="small"
                                                                        />
                                                                    }
                                                                    label={
                                                                        <Typography variant="h6">
                                                                            {item.title}
                                                                        </Typography>
                                                                    }
                                                                />
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                            <div className="col-sm-8 col-12" style={{ minHeight: "360px" }}>
                                                <h5 className="popover-title">
                                                    {t("پیش نمایش")}
                                                </h5>
                                                {chartSeries?.length && xaxis?.length && chartType !== "pie" ? <>

                                                    <div style={{ direction: "ltr" }}
                                                        className={i18n.dir() === "rtl" ? "rtl-chart" : ""}>
                                                        {chartType === "bar" &&
                                                            <Chart xaxis={xaxis} chartSeries={chartSeries}
                                                                type={"bar"} height={300} width={"100%"}
                                                                chartMap={chartMap} chartGrid={chartGrid} />}
                                                        {chartType === "line" &&
                                                            <Chart xaxis={xaxis} chartSeries={chartSeries}
                                                                type={"line"} height={300} width={"100%"}
                                                                chartMap={chartMap} chartGrid={chartGrid} />
                                                        }
                                                        {chartType === "area" &&
                                                            <Chart xaxis={xaxis} chartSeries={chartSeries}
                                                                type={"area"} height={300} width={"100%"}
                                                                chartMap={chartMap} chartGrid={chartGrid} />
                                                        }
                                                        {chartType === "scatter" &&
                                                            <Chart xaxis={xaxis} chartSeries={chartSeries}
                                                                type={"scatter"} height={300} width={"100%"}
                                                                chartMap={chartMap} chartGrid={chartGrid} />
                                                        }

                                                    </div>

                                                </>
                                                    : pieDependent && mainChartField && chartType === "pie" ?
                                                        <div style={{ direction: "ltr" }}
                                                            className={i18n.dir() === "rtl" ? "rtl-chart" : ""}>
                                                            <PieChart pieLabels={pieLabels} pieSeries={pieSeries}
                                                                height={300} width={"100%"} chartMap={chartMap}
                                                                chartGrid={chartGrid} />
                                                        </div> : <div
                                                            className="d-flex align-items-center justify-content-center h-100">
                                                            <img src={chartPreview} alt={"chart"} /></div>
                                                }

                                            </div>
                                            <div className="col-12">
                                                <h5 className="popover-title">
                                                    {t("نمودارهای ذخیره شده")}
                                                </h5>
                                                <div className="row">
                                                    <div className="col-12 col-sm-10">
                                                        {savedCharts?.map((item, index) => (
                                                            <div className="saved-item d-flex" key={index}>
                                                                <span className="index">{index + 1}</span>
                                                                <span className="title">{item.title}</span>
                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={!!savedCharts[index].dashboard}
                                                                            onChange={(event) => {
                                                                                let temp = savedCharts;
                                                                                temp[index].dashboard = event.target.checked;
                                                                                setSavedCharts([...temp]);
                                                                            }
                                                                            }
                                                                            name={`savedCharts[${index}].dashboard`}
                                                                            color="primary"
                                                                            size="small"
                                                                        />
                                                                    }
                                                                    label={
                                                                        <Typography variant="h6">
                                                                            {t("نمایش در داشبورد")}
                                                                        </Typography>
                                                                    }
                                                                />
                                                                <IconButton variant="contained" color="primary"
                                                                    className="kendo-action-btn"
                                                                    onClick={() => console.log("view")}>
                                                                    <VisibilityIcon />
                                                                </IconButton>
                                                                <IconButton variant="contained" color="error"
                                                                    className="kendo-action-btn" onClick={() => {
                                                                        let temp = savedCharts.filter(s => s.title !== item.title);
                                                                        setSavedCharts(temp);
                                                                    }}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </div>
                                                        ))}
                                                        <div className="d-flex mt-2">
                                                            <div style={{ width: "70%" }}>
                                                                <div className="form-design p-0">
                                                                    <div className="title"><span>{t("عنوان")}</span>
                                                                    </div>
                                                                    <input
                                                                        className="form-input"
                                                                        type="text"
                                                                        id="title"
                                                                        name="title"
                                                                        onChange={(e) => setNewChart(e.target.value)}
                                                                        value={newChart}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div
                                                                style={i18n.dir() === "rtl" ? { marginRight: "10px" } : { marginLeft: "10px" }}>
                                                                <div className="form-design p-0">
                                                                    <div className="title"><span>‌</span></div>
                                                                    <Button
                                                                        variant="outlined"
                                                                        color="success"
                                                                        onClick={() => {
                                                                            setSavedCharts(s => [...s, {
                                                                                title: newChart,
                                                                                dashboard: false
                                                                            }]);
                                                                            setNewChart("");
                                                                        }}
                                                                        style={{
                                                                            padding: "3px 15px 4px",
                                                                            fontSize: "12px"
                                                                        }}
                                                                    >
                                                                        {t("ذخیره نمودار")}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 d-flex justify-content-center">

                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => {
                                                        setAnchorChart(null);
                                                    }}
                                                >
                                                    <Link
                                                        to={`${pathname}/Chart?id=${gridId}`}
                                                        target={"_blank"}
                                                        className={"link-tag"}>
                                                        {t("باز کردن نمودار")}
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => {
                                                        setAnchorChart(null);
                                                    }}
                                                    style={i18n.dir() === "rtl" ? { marginRight: "10px" } : { marginLeft: "10px" }}
                                                >
                                                    {t("انصراف")}
                                                </Button>
                                            </div>
                                        </div>

                                    </Popover>
                                </div>}
                                {showExcelExport && <div className="grid-btn-section-item">
                                    <Tooltip title={t("خروجی اکسل")} arrow>
                                        <Button
                                            aria-describedby={idEcxel}
                                            variant="outlined"
                                            className="kendo-setting-btn"
                                            onClick={(e) => setAnchorEcxel(e.currentTarget)}
                                            disabled={!excelData?.length}
                                        >
                                            <IconFileSpreadsheet />
                                        </Button>
                                    </Tooltip>

                                    <Popover
                                        id={idEcxel}
                                        open={openEcxel}
                                        anchorEl={anchorEcxel}
                                        onClose={() => setAnchorEcxel(null)}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: i18n.dir() === "rtl" ? "left" : "right"
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: i18n.dir() === "rtl" ? "left" : "right"
                                        }}
                                        PaperProps={{
                                            style: { width: "400px" }
                                        }}
                                        sx={{ direction: i18n.dir() }}
                                        className="grid-popover"
                                    >
                                        <div className="row">
                                            <div className="col-6">
                                                <h5 className="popover-title">
                                                    {t("ستون های قابل نمایش")}
                                                </h5>
                                                <ul className="field-list">
                                                    {columnsObj?.map((item, index) => {
                                                        // if(item?.parent){
                                                        //     return (<li key={index}>
                                                        //         <FormControlLabel
                                                        //             control={
                                                        //                 <Checkbox
                                                        //                     checked={fields[item.parent][item.value]?.excel}
                                                        //                     onChange={(event) => {
                                                        //                         let temp = { ...fields };
                                                        //                         temp[item.parent][item.value].excel = event.target.checked;
                                                        //                         setFields(temp);
                                                        //                     }
                                                        //                     }
                                                        //                     name="checked"
                                                        //                     color="primary"
                                                        //                     size="small"
                                                        //                 />
                                                        //             }
                                                        //             label={
                                                        //                 <Typography variant="h6">
                                                        //                     {item.title}
                                                        //                 </Typography>
                                                        //             }
                                                        //         />
                                                        //     </li>)
                                                        // }else{
                                                        return <li key={index}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={!!fields[item.value]?.excel}
                                                                        onChange={(event) => {
                                                                            let temp = { ...fields };
                                                                            temp[item.value].excel = event.target.checked;
                                                                            setFields(temp);
                                                                        }
                                                                        }
                                                                        name="checked"
                                                                        color="primary"
                                                                        size="small"
                                                                    />
                                                                }
                                                                label={
                                                                    <Typography variant="h6">
                                                                        {item.title}
                                                                    </Typography>
                                                                }
                                                            />
                                                        </li>
                                                        // }
                                                    })}
                                                </ul>
                                            </div>
                                            <div className="col-6">
                                                <h5 className="popover-title">
                                                    {t("تنظیمات")}
                                                </h5>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={!!filterExcelFields}
                                                            onChange={(event) => setFilterExcelFields(event.target.checked)
                                                            }
                                                            name="filterExcelFields"
                                                            color="primary"
                                                            size="small"
                                                        />
                                                    }
                                                    label={
                                                        <Typography variant="h6">
                                                            {t("قابل فیلتر شدن")}
                                                        </Typography>
                                                    }
                                                />
                                            </div>
                                            <div className="col-12 d-flex justify-content-center">
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => {
                                                        excelExport();
                                                        setAnchorEcxel(null);
                                                    }}
                                                >
                                                    {t("خروجی اکسل")}
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => {
                                                        setAnchorEcxel(null);
                                                    }}
                                                    style={i18n.dir() === "rtl" ? { marginRight: "10px" } : { marginLeft: "10px" }}
                                                >
                                                    {t("انصراف")}
                                                </Button>
                                            </div>
                                        </div>

                                    </Popover>
                                </div>}
                                {showPrint && <div className="grid-btn-section-item">
                                    <Tooltip title={t("چاپ")} arrow>
                                        <Button
                                            aria-describedby={idPrint}
                                            variant="outlined"
                                            className="kendo-setting-btn"
                                            onClick={(e) => setAnchorPrint(e.currentTarget)}
                                            disabled={!data?.length}
                                        >
                                            <IconPrinter />
                                        </Button>
                                    </Tooltip>
                                    <Popover
                                        id={idPrint}
                                        open={openPrint}
                                        anchorEl={anchorPrint}
                                        onClose={() => setAnchorPrint(null)}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: i18n.dir() === "rtl" ? "left" : "right"
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: i18n.dir() === "rtl" ? "left" : "right"
                                        }}
                                        PaperProps={{
                                            style: { width: "250px" }
                                        }}
                                        sx={{ direction: i18n.dir() }}
                                        className="grid-popover"
                                    >
                                        <div className="row">
                                            <div className="col-12">
                                                <h5 className="popover-title">
                                                    {t("ستون های قابل نمایش")}
                                                </h5>
                                                <ul className="field-list">
                                                    {columnsObj?.map((item, index) => {
                                                        // if(item?.parent){
                                                        //     return (<li key={index}>
                                                        //         <FormControlLabel
                                                        //             control={
                                                        //                 <Checkbox
                                                        //                     checked={printField[item.parent][item.value]}
                                                        //                     onChange={(event) => {
                                                        //                         let temp = { ...printField };
                                                        //                         temp[item.parent][item.value] = event.target.checked;
                                                        //                         setPrintField(temp);
                                                        //                     }
                                                        //                     }
                                                        //                     name="checked"
                                                        //                     color="primary"
                                                        //                     size="small"
                                                        //                 />
                                                        //             }
                                                        //             label={
                                                        //                 <Typography variant="h6">
                                                        //                     {item.title}
                                                        //                 </Typography>
                                                        //             }
                                                        //         />
                                                        //     </li>)
                                                        // }else{
                                                        return <li key={index}>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        checked={!!printField[item.value]}
                                                                        onChange={(event) => {
                                                                            let temp = { ...printField };
                                                                            temp[item.value] = event.target.checked;
                                                                            setPrintField(temp);
                                                                        }
                                                                        }
                                                                        name="checked"
                                                                        color="primary"
                                                                        size="small"
                                                                    />
                                                                }
                                                                label={
                                                                    <Typography variant="h6">
                                                                        {item.title}
                                                                    </Typography>
                                                                }
                                                            />
                                                        </li>
                                                        // }
                                                    })}
                                                    {/*{columnsObj?.map((item, index) => (*/}
                                                    {/*  <li key={index}>*/}
                                                    {/*      <FormControlLabel*/}
                                                    {/*        control={*/}
                                                    {/*            <Checkbox*/}
                                                    {/*              checked={printField[item.value]}*/}
                                                    {/*              onChange={(event) => {*/}
                                                    {/*                  let temp = { ...printField };*/}
                                                    {/*                  temp[item.value] = event.target.checked;*/}
                                                    {/*                  setPrintField(temp);*/}
                                                    {/*              }*/}
                                                    {/*              }*/}
                                                    {/*              name="checked"*/}
                                                    {/*              color="primary"*/}
                                                    {/*              size="small"*/}
                                                    {/*            />*/}
                                                    {/*        }*/}
                                                    {/*        label={*/}
                                                    {/*            <Typography variant="h6">*/}
                                                    {/*                {item.title}*/}
                                                    {/*            </Typography>*/}
                                                    {/*        }*/}
                                                    {/*      />*/}
                                                    {/*  </li>*/}
                                                    {/*))}*/}
                                                </ul>
                                            </div>
                                            {/*/!*<div className='col-6'>*!/*/}
                                            {/*/!*  <h5 className="popover-title">*!/*/}
                                            {/*/!*    تنظیمات*!/*/}
                                            {/*/!*  </h5>*!/*/}
                                            {/*/!*  <div className="title">*!/*/}
                                            {/*/!*    <span>{t("اندازه صفحه")}</span>*!/*/}
                                            {/*/!*  </div>*!/*/}
                                            {/*/!*  <SelectBox*!/*/}
                                            {/*/!*    dataSource={pSize}*!/*/}
                                            {/*/!*    rtlEnabled={i18n.dir() == "ltr" ? false : true}*!/*/}
                                            {/*/!*    onValueChanged={(e) => setPrintSize(e.value)}*!/*/}
                                            {/*//     defaultValue={printSize}*/}
                                            {/*//     className='selectBox'*/}
                                            {/*/!*    noDataText={t('اطلاعات یافت نشد')}*!/*/}
                                            {/*/!*    itemRender={null}*!/*/}
                                            {/*/!*    name='pSize'*!/*/}
                                            {/*/!*    id='pSize'*!/*/}
                                            {/*/!*    searchEnabled*!/*/}

                                            {/*/!*  />*!/*/}
                                            {/*/!*</div>*!/*/}
                                            <div className="col-12 d-flex justify-content-center">
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    className={'link-tag-btn'}
                                                    onClick={() => {
                                                        setAnchorPrint(null);
                                                    }}
                                                >
                                                    <Link
                                                        to={`${pathname}/Print?id=${gridId}`}
                                                        target={"_blank"}
                                                        className={"link-tag"}>
                                                        {t("چاپ")}
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => {
                                                        setAnchorPrint(null);
                                                    }}
                                                    style={i18n.dir() === "rtl" ? { marginRight: "10px" } : { marginLeft: "10px" }}
                                                >
                                                    {t("انصراف")}
                                                </Button>
                                            </div>
                                        </div>

                                    </Popover>
                                </div>}
                            </div>

                        </div>

                    </div>
                </div>
                <div className={`my-kendo-grid ${i18n.dir() === 'rtl' ? 'rtl-grid' : ''}`} ref={gridContainer}>
                    <LocalizationProvider
                        language={`${i18n.language === 'fa' ? 'fa-IR' : i18n.language === 'ar' ? 'ar' : 'en'}`}>
                        <ExcelExport
                            data={excelData}
                            ref={_export}
                            fileName={`${excelFileName}.xlsx`}
                            filterable={filterExcelFields}
                            dir={i18n.dir()}
                        >
                            {columnList?.map((column, index) => {
                                if (column?.children?.length) {
                                    return <React.Fragment key={index}>
                                        {column?.children.map((children, indexC) => {
                                            return fields[column?.field]?.excel && <ExcelExportColumn key={indexC} field={children.field} title={`${t(column.name)}>${t(children.name)}`} />
                                        }
                                        )}
                                    </React.Fragment>
                                } else {
                                    return (column.field !== 'actionCell' && fields[column.field]?.excel) && <ExcelExportColumn key={index} field={column.field} title={t(column.name)} />
                                }
                            })}

                        </ExcelExport>
                        <div>

                            {rowColor1 !== '' && <style>{`
                .k-grid tbody tr:not(.k-alt) {
                    background-color: ${rowColor1}!important;
                }
               
            `}</style>}
                            {rowColor2 !== '' && <style>{`
                .k-grid tbody tr.k-alt {
                    background-color: ${rowColor2}!important;
                }
            `}</style>}
                            {rowClickColor !== '' && <style>{`
                .k-grid tbody tr td.row-custom-bg {
                    background-color: ${rowClickColor}!important;
                }
            `}</style>}
                            <Grid
                                ref={gridRef}
                                total={gridData?.length}
                                data={result}
                                {...dataState}
                                take={take}
                                skip={skip}
                                onDataStateChange={dataStateChange}
                                sortable={sortable}
                                pageable={pageable}
                                reorderable={reorderable}
                                onRowClick={clickRow}
                                onColumnReorder={columnReorder}
                                dataItemKey={selectKeyField}
                                selectedField={'selected'}
                                selectable={{
                                    enabled: selectable,
                                    drag: false,
                                    cell: false,
                                    mode: selectionMode,
                                }}

                                onSelectionChange={onSelectionChange}
                                onHeaderSelectionChange={onHeaderSelectionChange}
                                sort={sort}
                                onSortChange={sortChange}
                                className={`main-grid ${i18n.dir()} ${coloring ? 'color-pointer' : ''}`}
                                onPageChange={pageChange}
                                // groupable={true}

                                detail={expandDetail && detail}
                                expandField={expandDetail ? expandField : ''}
                                onExpandChange={expandDetail ? onExpandChange : () => { }}

                            >
                                {selectable && !coloring && <GridColumn
                                    field={'selected'}
                                    width="40px"
                                    headerCell={selectionMode === 'single' && EmptyHeaderCell}
                                    headerSelectionValue={
                                        result?.data?.findIndex((item) => !selectedState[idGetter(item)]) === -1
                                    }
                                    reorderable={false}
                                    filterable={false}
                                    sortable={false}

                                />}
                                {selectable && coloring && <GridColumn
                                    field={'notselect'}
                                    width="40px"
                                    headerCell={EmptyHeaderCell}
                                    reorderable={false}
                                    filterable={false}
                                    sortable={false}

                                />}
                                {columnArr?.map((column, index) => {
                                    if (!column?.children?.length) {
                                        return (column?.field === 'actionCell' || fields[column?.field]?.grid) && <GridColumn {...column} key={index} title={t(`${column.name}`)} />

                                    } else {
                                        return (fields[column?.field]?.grid && <GridColumn key={index} {...column} title={t(`${column.name}`)} >
                                            {column?.children.map((children, indexC) => {
                                                return <GridColumn {...children} key={indexC} title={t(`${children.name}`)} />
                                            }
                                            )}
                                        </GridColumn>)
                                    }
                                })}
                            </Grid>
                        </div>
                    </LocalizationProvider>
                </div>
            </div>
        </>
    );
};

export default React.memo(RKGrid)
