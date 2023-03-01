import { Box, Button, Modal } from "@mui/material";
import React, { useEffect } from "react";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import { DataGrid } from "devextreme-react";
import { Column, SearchPanel, Selection } from "devextreme-react/data-grid";
import { dummy } from "../../Modals/ModalGroup/dummy";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { SelectBox } from "devextreme-react/select-box";

export default function ProductModal({ getData, supplierID }) {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const appConfig = window.globalConfig;
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [selectedCategory, setSelectedCategory] = React.useState("test");
  const [products, setProducts] = React.useState([]);
  console.log("products are here", products);
  function ChangeSelection({ selectedRowsData }) {
    const data = selectedRowsData[0];
    // setSelectedCategory(data&&data.CategoryName)
    getData(data);
    handleClose();
  }

  const getProducts = () => {
    if (supplierID != undefined) {
      axios
        .get(`${appConfig.BaseURL}/api/supplier/${supplierID}`)
        .then((res) => {
          setProducts(
            res.data.data.productFields.map((item) => {
              let items = JSON.parse(item);
              return items.Products;
            })
          );
        })
        .catch((error) => error);
    } else {
      axios
        .get(`${appConfig.BaseURL}/api/products`)
        .then((res) => {
          setProducts(res.data.data);
        })
        .catch((error) => error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Button
        onClick={handleOpen}
        style={{ position: "absolute", right: "20.6%" }}
      >
        <HighlightAltIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ zIndex: 9999 }}
      >
        <Box sx={style}>
          {supplierID != undefined ? (
            <DataGrid
              dataSource={products}
              showBorders={true}
              hoverStateEnabled={true}
              keyExpr="ProductID"
              onSelectionChanged={ChangeSelection}
              rtlEnabled={i18n.dir() == "ltr" ? false : true}
            >
              <SearchPanel
                visible={true}
                width={240}
                placeholder={t("جست و جو...")}
              />
              <Selection mode="single" />
              <Selection mode="single" />
              <Column
                caption={t("نام محصول")}
                dataField="ProductName"
                width={100}
              />
              <Column caption={t("نام برند")} dataField="Brand" />
              <Column
                caption={t("واحد اندازه گیری اصلی")}
                dataField="MainMeasurement"
              />
              <Column
                caption={t("قیمت خرید")}
                dataField="PurchasePrice"
                width={180}
              />
              <Column caption={t("قیمت فروش")} dataField="SalePrice" />
              <Column caption={t("کد محصول")} dataField="ProductCode" />
              <Column caption={t("شماره سریال")} dataField="SerialNum" />
              <Column
                caption={t("موجودی قابل فروش")}
                dataField="StoreInventory"
              />
            </DataGrid>
          ) : (
            <DataGrid
              dataSource={products}
              showBorders={true}
              hoverStateEnabled={true}
              keyExpr="productID"
              onSelectionChanged={ChangeSelection}
              rtlEnabled={i18n.dir() == "ltr" ? false : true}
            >
              <SearchPanel
                visible={true}
                width={240}
                placeholder={t("جست و جو...")}
              />
              <Selection mode="single" />
              <Selection mode="single" />
              <Column
                caption={t("نام محصول")}
                dataField="productName"
                width={100}
              />
              <Column caption={t("نام برند")} dataField="brand" />
              <Column
                caption={t("واحد اندازه گیری اصلی")}
                dataField="mainMeasurement"
              />
              <Column
                caption={t("قیمت خرید")}
                dataField="purchasePrice"
                width={180}
              />
              <Column caption={t("قیمت فروش")} dataField="salePrice" />
              <Column caption={t("کد محصول")} dataField="productCode" />
              <Column caption={t("شماره سریال")} dataField="serialNum" />
              <Column
                caption={t("موجودی قابل فروش")}
                dataField="storeInventory"
              />
            </DataGrid>
          )}
        </Box>
      </Modal>
    </>
  );
}
