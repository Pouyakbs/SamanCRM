import { Box, Button, Modal } from '@mui/material';
import React from 'react'
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import { DataGrid } from 'devextreme-react'
import { Column, SearchPanel, Selection } from 'devextreme-react/data-grid';
import { useTranslation } from 'react-i18next';
import { persons } from './persons';

export default function PersonModal({getData}) {
    const[open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {t, i18n} = useTranslation();
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
      const [selectedSupplier, setSelectedSupplier] = React.useState("test")
    function ChangeSelection({selectedRowsData}) {
        const data = selectedRowsData[0];
        // setSelectedCategory(data&&data.CategoryName)
        getData(data)
        handleClose()
    }
    return (
        <>
            <Button onClick={handleOpen}><HighlightAltIcon/></Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx = {style}>
                <DataGrid
                dataSource={persons}
                showBorders = {true}
                hoverStateEnabled = {true}
                keyExpr = "ID"
                onSelectionChanged={ChangeSelection}
                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                >
                  <SearchPanel visible={true} width={240} placeholder={t("جست و جو...")} />
                  <Selection mode = "single"/>
                  <Column dataField="PersonName" caption = {t("فرد")}/>
                </DataGrid>
                </Box>
            
          </Modal>
        </>
      )
}
