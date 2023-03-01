import React from 'react'
import DataGrid, { Column, Selection } from 'devextreme-react/data-grid';
import { useTranslation } from "react-i18next";
import { SelectBox } from 'devextreme-react/select-box';











export const Packaging = () => {
    const { t, i18n } = useTranslation();
  return (
      <>

      <h4>
              {t("لیست محصولات") }
      </h4>
    <DataGrid
    showBorders={true}
    hoverStateEnabled={true}
              keyExpr="ID"
              noDataText={t('داده‌ای موجود نیست')}
    
  >

    <Selection mode="single" />
              <Column dataField={t("نام")} width={70} />
              <Column dataField={t("وضعیت")} width={1050} />

  </DataGrid>
  </>
  )
}
