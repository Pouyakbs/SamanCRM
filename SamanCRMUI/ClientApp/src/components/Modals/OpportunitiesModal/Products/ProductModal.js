import { Box, Button, Modal } from '@mui/material';
import React from 'react'
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import { DataGrid } from 'devextreme-react'
import { Column, SearchPanel, Selection } from 'devextreme-react/data-grid';
import {dummy} from "./dummy"


export default function ProductModal({getData}) {
    const[open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      const [selectedCategory, setSelectedCategory] = React.useState("test")
    function ChangeSelection({selectedRowsData}) {
        const data = selectedRowsData[0];
        // setSelectedCategory(data&&data.CategoryName)
        getData(data)
        handleClose()
    }

  
  return (
    <>
        <Button onClick={handleOpen} style={{position:"absolute",right:"20.6%"}}><HighlightAltIcon/></Button>     
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >          
            <Box sx = {style}>
            <DataGrid
            dataSource={dummy}
            showBorders = {true}
            hoverStateEnabled = {true}
            keyExpr = "ID"
            onSelectionChanged={ChangeSelection}
            rtlEnabled={i18n.dir() == "ltr" ? false : true}
            >
            <SearchPanel visible={true} width={240} placeholder="جست و جو..." />
        <Selection mode = "single"/>
        <Selection mode="single" />
    <Column caption="نام محصول" dataField="mahsulname" width={100} />
    <Column caption="نام برند" dataField="brandname"/>
    <Column caption="واحد اندازه گیری اصلی"dataField="measurement" />
    <Column caption="قیمت خرید"dataField="price"  width={180} />
    <Column caption="قیمت فروش" dataField="fullprice" />
    <Column caption="کد محصول" dataField="productCode" />
    <Column caption="شماره محصول" dataField="pronum" />
    <Column caption = "موجودی قابل فروش" dataField="dummy" />
    </DataGrid>
            </Box>
        
      </Modal>
    </>
  )
}
