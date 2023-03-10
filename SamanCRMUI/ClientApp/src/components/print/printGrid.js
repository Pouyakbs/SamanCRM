import React, { useEffect, useState ,useRef} from 'react'
import '@progress/kendo-theme-default/dist/all.css';
import {loadLangMsg} from '../../utils/loadLangMsg'
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { LocalizationProvider } from "@progress/kendo-react-intl";
import { getLangDate } from "../../utils/getLangDate";
import { useSearchParams } from 'react-router-dom';
import '../../components/RKGrid/style.css'

const PrintGrid = ({printData,columnList}) => {



    const [searchParams] = useSearchParams();
    const lang = searchParams.get('lang')

    const { t, i18n } = useTranslation();
    const [gridW, setGridW] = useState();
    const gridContainer=useRef()

    let tempColumn=columnList


    let pObj={}

    tempColumn.forEach((item)=>{
        pObj[item.field]=true
    })

    const [fields,setFields]=useState(pObj)


    useEffect(()=>{
        loadLangMsg(lang)
    },[lang])


    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return ()=>{
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    function timeout(delay) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const handleResize = async () => {
        await timeout(500);
        setGridW(gridContainer?.current?.offsetWidth-20)
    };

    useEffect(()=>{
        setGridW(gridContainer?.current?.offsetWidth-20)
    },[])


    return (

        <div className='p-3 print-page'>
            <div className='row justify-content-center'>
                <div className='col-lg-10 col-md-12 col-sm-12 col-12'>
                    <div
                        style={{ direction: `${lang == 'en' ? 'ltr' : 'rtl'}` }}>

                        <div className='grid' >
                            <div className={`print-grid ${i18n.dir()==='ltr'?'ltr-p':''}`} ref={gridContainer}>

                                <LocalizationProvider
                                  language={`${i18n.language === 'fa' ? 'fa-IR' : i18n.language === 'ar' ? 'ar' : 'en'}`}>
                                    <Grid
                                      total={printData.length}
                                      take={printData.length}
                                      data={printData}
                                      pageable={false}
                                      sortable={false}
                                      filterable={false}
                                      reorderable={false}
                                      className={`main-grid ${lang==='en'?'ltr':'rtl'}`}
                                    >
                                        {tempColumn?.map((column,index)=>{
                                            if (!column?.children?.length){
                                                return fields[column.field]&&<GridColumn {...column} key={index} title={t(`${column.name}`)} />

                                            }else{
                                                return (fields[column.field]&&<GridColumn key={index} {...column} title={t(`${column.name}`)} >
                                                    {column?.children.map((children,indexC)=>{
                                                          return <GridColumn {...children} key={indexC} title={t(`${children.name}`)} />
                                                      }
                                                    )}
                                                </GridColumn>)
                                            }
                                        })}

                                    </Grid>
                                </LocalizationProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PrintGrid









