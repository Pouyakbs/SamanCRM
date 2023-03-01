import React from 'react'
import DataGrid, { Column, Selection,Editing } from 'devextreme-react/data-grid';
import { useTranslation } from "react-i18next";


export const ShowMoreDetails = ({getdifference}) => {

 
  const { t, i18n } = useTranslation();


  return (
      <>
      <div style={{display:"flex",justifyContent:"center"}}>

     
    <DataGrid
    showBorders={true}
    hoverStateEnabled={true}
    keyExpr="id"
    width={"95%"}
    rtlEnabled
    dataSource={getdifference}
    
  >

<Editing
            mode="row"
            allowUpdating={true}
                      allowDeleting={true}
                      useIcons={true}
            
           />

    <Selection mode="single" />
    <Column caption={t("محصول")} dataField="productName"  width={70} />
    <Column  caption={t("شماره سریال")} dataField="serialNumber" width={100}/>
    <Column caption={t("کد محصول")} dataField="productCode" />
    <Column  caption={t("مقدار")} dataField="MainUnit"  />
    <Column caption={t("قیمت واحد")} dataField="UnitPrice"/>
    <Column  caption={t("زیر مجموع")}dataField="subset"/>
    <Column  caption={t("تخفیف")} dataField="Discount"/>
    <Column  caption={t("مبلغ تخفیف")}dataField="discountAmount"/>
    <Column  caption={t("مقدار پس از تخفیف")}dataField="PriceAfterDiscount" width={150}/>
    <Column  caption={t("مالیات")} dataField="taxamount"/>
    <Column  caption={t("مبلغ مالیات")}dataField="HireDate"/>
    <Column  caption={t("جمع کل")}dataField="totalprice"/>
    <Column  caption={t("بسته محصول")}dataField="HireDate"/>
    <Column  caption={t("توضیحات")}dataField="description"/>
    <Column  caption={t("یادداشت")}dataField="Note"/>
    

  </DataGrid>
   </div>
  </>
      
  )
}
