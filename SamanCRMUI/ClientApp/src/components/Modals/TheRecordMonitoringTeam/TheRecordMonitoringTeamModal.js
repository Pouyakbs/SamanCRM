
import { Box, Button, Modal } from '@mui/material';
import React from 'react'
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import { DataGrid } from 'devextreme-react'
import { Column, SearchPanel, Selection } from 'devextreme-react/data-grid';
import { theRecordMonitoringTeam } from './theRecordMonitoringTeam';
import { useTranslation } from "react-i18next";





export default function TheRecordMonitoringTeamModal({ getData }) {
    const { t, i18n } = useTranslation();
    const [open, setOpen] = React.useState(false)
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
    const [selectedTheRecordMonitoringTeam, setselectedTheRecordMonitoringTeam] = React.useState("test")
    function ChangeSelection({ selectedRowsData }) {
        const data = selectedRowsData[0];
        console.log(data)

        getData(data)
        handleClose()
    }
    return (
        <>
            <Button onClick={handleOpen}><HighlightAltIcon /></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <DataGrid
                        dataSource={theRecordMonitoringTeam}
                        showBorders={true}
                        hoverStateEnabled={true}
                        keyExpr="ID"
                        onSelectionChanged={ChangeSelection}
                        rtlEnabled={i18n.dir() == "ltr" ? false : true}
                    >
                        <SearchPanel visible={true} width={240} placeholder="جست و جو..." />
                        <Selection mode="single" />
                        <Column dataField="theRecordMonitoringTeam" caption="دسته" />
                    </DataGrid>
                </Box>

            </Modal>
        </>
    )
}
