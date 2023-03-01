import { Box, Button, Dialog, DialogContent, Modal } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import axios from "axios";
import { PictureOutlined } from "@ant-design/icons";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Carousel from "react-material-ui-carousel";
import CloseIcon from "@mui/icons-material/Close";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));
const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
export default function PictureModal({ getData }) {
  const [expanded, setExpanded] = React.useState("panel1");
  const [productImageList, setProductImageList] = useState([]);
  const appConfig = window.globalConfig;
  const [productBarcodeList, setProductBarcodeList] = useState([]);
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = useState(false);
  const handleClickOpen = () => {
    setOpen2(true);
  };
  const [maxWidth, setMaxWidth] = React.useState("lg");
  const [fullWidth, setFullWidth] = React.useState(true);
  const { t, i18n } = useTranslation();
  const style = {
    top: "50%",
    left: "50%",
    bgcolor: "background.paper",
  };
  useEffect(() => {
    if (getData != null) {
      axios.get(`${appConfig.BaseURL}/api/products/${getData}`).then((res) => {
        setProductImageList(
          res.data.data.productImage.map((item) => {
            let image = item.split(",");
            let imageName = image[0].split(":");
            return {
              fileName: imageName[1],
              file: `${image[1]},${image[2]}`,
            };
          })
        );
        setProductBarcodeList(
          res.data.data.barcodeImage.map((item) => {
            let image = item.split(",");
            let imageName = image[0].split(":");
            return {
              fileName: imageName[1],
              file: `${image[1]},${image[2]}`,
            };
          })
        );
      });
    }
  }, [getData]);
  return (
    <>
      <Button onClick={handleClickOpen}>
        <PictureOutlined style={{ color: "green", fontSize: "23px" }} />
      </Button>
      <Dialog
        open={open2}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        dir={i18n.dir()}
      >
        <div
          className={`modal-header ${i18n.dir() === "ltr" ? "header-ltr" : ""}`}
        >
          <h2>{t("تصاویر محصول")}</h2>
          <button
            type="button"
            className="close-btn"
            onClick={() => setOpen2(false)}
          >
            <CloseIcon />
          </button>
        </div>
        <DialogContent>
          <Box sx={style}>
            <div>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <Typography>تصاویر محصول</Typography>
                </AccordionSummary>
                <AccordionDetails >
                  <Carousel autoPlay={false}>
                    {productImageList.map((item, i) => (
                      <div 
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}>
                      <img
                        src={item.file}
                        alt="pic"
                        style={{ width: "800px", height: "300px" }}
                      />
                      </div>
                    ))}
                  </Carousel>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                >
                  <Typography>تصاویر بارکد</Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {productBarcodeList.map((item, i) => (
                    <img src={item.file} alt="pic" />
                  ))}
                </AccordionDetails>
              </Accordion>
            </div>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
