import { Box, Button, Modal } from '@mui/material';
import React from 'react'
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import { DataGrid } from 'devextreme-react'
import { Column, SearchPanel, Selection } from 'devextreme-react/data-grid';
import { accountName } from '../../../components/Modals/Mahan_AccountNameModal/accountNames';

export default function AccountNameModal({getData , setAccount}) {
  console.log(setAccount)
    const[open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      const [selectedAccountName, setSelectedAccountName] = React.useState()
    function ChangeSelection({selectedRowsData}) {
        const data = selectedRowsData[0];
        console.log(data.accountID)
        getData(data.accountID)
        handleClose()
    }
  return (
    <>
        <Button className="iconModal" onClick={handleOpen}><HighlightAltIcon/></Button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx = {style}>
            <DataGrid
            dataSource={setAccount}
            showBorders = {true}
            hoverStateEnabled = {true}
            keyExpr = "accountID"
            onSelectionChanged={ChangeSelection}
            rtlEnabled={true}
            >
            <SearchPanel visible={true} width={240} placeholder="جست و جو..." />
        <Selection mode = "single"/>
        <Column dataField="name" caption="نام حساب"/>
    </DataGrid>
            </Box>
        
      </Modal>
    </>
  )
}
