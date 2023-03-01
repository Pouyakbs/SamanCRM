import ReactApexChart from "react-apexcharts";
import React, {useEffect, useRef} from "react";
import {useTranslation} from "react-i18next";
import './style.css'


var ar = require("apexcharts/dist/locales/ar.json")
var fa = require("apexcharts/dist/locales/fa.json")
var en = require("apexcharts/dist/locales/en.json")

const Chart = ({xaxis,chartSeries,height,width,type,chartMap,chartGrid}) =>{

    const { t, i18n } = useTranslation();
    const chart=useRef()

    useEffect(()=>{
        chart?.current?.chart?.setLocale(i18n.language)
    },[i18n.language])

    const chartOptions= {
        chart: {
            defaultLocale: i18n.language==='fa'?'fa':i18n.language==='ar'?'ar':'en',
            locales: [en,fa,ar],
        },
        xaxis: {
            categories: xaxis,
            axisBorder: {
                show: true
            },
            axisTicks: {
                show: true
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 3,
        },
        fill: {
            opacity: 1
        },
        grid: {
            show: chartGrid
        },
        legend: {
            show: chartMap,
            fontFamily: 'IRANSansWeb',
            offsetX: 10,
            offsetY: 10,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: '50%',
                offsexX: 2,
                offsexY: 2
            },
            itemMargin: {
                horizontal: 15,
                vertical: 50
            }
        },

    }

    return(
        <>
            <ReactApexChart
                ref={chart}
                options={chartOptions}
                series={chartSeries}
                type={type}
                height={height}
                width={width}
            />
        </>
    )
}

export default React.memo(Chart)