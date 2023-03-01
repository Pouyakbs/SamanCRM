import {useEffect,useState} from "react";
import {useTranslation} from "react-i18next";
import {getLangDate} from '../../utils/getLangDate'



const DateCell=(props)=>{

  const [currentDate,setCurrentDate]=useState()
  const { t, i18n } = useTranslation();

  useEffect(()=>{
    setCurrentDate(getLangDate(i18n.language,props.dataItem[props.field]))
  },[i18n.language,props.dataItem[props.field]])



  return(
    <td colSpan="1" >
      <span>{currentDate}</span>
    </td>

  )
}

export default DateCell