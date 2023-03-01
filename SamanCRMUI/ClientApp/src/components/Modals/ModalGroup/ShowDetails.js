import React from 'react'
import DataGrid, { Column, Selection, Editing } from 'devextreme-react/data-grid';
import { useTranslation } from "react-i18next";



export const ShowDetails = ({getprops}) => {


    console.log('detail', getprops)
    const { t, i18n } = useTranslation();


  return (
      <>
      <div style={{display:"flex",justifyContent:"center"}}>

     
    <DataGrid
    showBorders={true}
    hoverStateEnabled={true}
    dataSource={getprops}
    keyExpr="id"
    width={"80%"}
    rtlEnabled
    
  >
       <Editing
            mode="row"
            allowUpdating={true}
                  allowDeleting={true}
                 useIcons={true}
            
           />


    <Selection mode="single" />
    <Column caption={t("محصول")} dataField="productName"   />
    <Column caption={t("مقدار")} dataField="MainUnit" />
    <Column caption={t("قیمت واحد")} dataField="UnitPrice" />
    <Column caption={t("زیر مجموع")} dataField="subset"  />
    <Column caption={t("مقدار پس از تخفیف")} dataField="PriceAfterDiscount"/>
    <Column caption={t("جمع کل")} dataField="totalprice"/>
    

  </DataGrid>
   </div>
  </>
      
  )
}
