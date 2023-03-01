import { Box, Button, Modal } from '@mui/material';
import React from 'react'
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import { DataGrid } from 'devextreme-react'
import { Column, SearchPanel, Selection } from 'devextreme-react/data-grid';
import { useTranslation } from "react-i18next";


const fac = [

  {
    ID:1,
    num: 1,
    name: "فاکتور 1",
    remain: 20

  },
  {
    ID:2,
    num: 2,
    name: "فاکتور 2",
    remain: 10

  },
  {
    ID:3,
    num: 3,
    name: "فاکتور 3",
    remain: 15

  },
  {
    ID:4,
    num: 4,
    name: "فاکتور 4",
    remain: 30

  },

];


export default function FactorModal({getData }) {
  const { t, i18n } = useTranslation();
    const[open, setOpen] = React.useState(false)
    const handleOpen = () => {
      setOpen(true)
     
    };
    const handleClose = () => setOpen(false);
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      const [selectedCategory, setSelectedCategory] = React.useState("test")
    function ChangeSelection({selectedRowsData}) {
        const data = selectedRowsData[0];
        
        getData(data)
        handleClose()
    }

  
  return (
    <>
        <Button   className='modal2'  onClick={handleOpen}><HighlightAltIcon/></Button>     
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >          
            <Box sx = {style}>
            <DataGrid
            dataSource={fac}
            showBorders = {true}
            hoverStateEnabled = {true}
            keyExpr = "ID"
            onSelectionChanged={ChangeSelection}
            rtlEnabled={i18n.dir() == "ltr" ? false : true}
            >
            <SearchPanel visible={true} width={240} placeholder="جست و جو..." />
        <Selection mode = "single"/>
        <Selection mode="single" />
    <Column caption="شماره " dataField="num"  />
    <Column caption="عنوان" dataField="name"/>
    <Column caption="مانده "dataField="remain" />
    
   
    </DataGrid>
            </Box>
        
      </Modal>
    </>
  )
}
