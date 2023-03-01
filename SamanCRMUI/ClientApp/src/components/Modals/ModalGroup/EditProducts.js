import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import CancelIcon from "@mui/icons-material/Cancel";
import { Button } from "@mui/material";
import DataGrid, {
    Column,
    FilterRow,
    HeaderFilter,
    SearchPanel
} from "devextreme-react/data-grid";
import { Grid, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import Buttons from "react-multi-date-picker/components/button";
import { width } from "@mui/system";
import ProductModal from "../../Modals/ModalGroup/ProductModal";
import CurrencyInput from 'react-currency-input-field';
import { SelectBox } from 'devextreme-react/select-box';
import { parsFloatFunction } from "../../../utils/parsFloatFunction";

const Factor = [];
export const EditProducts = ({ getedit,getdata }) => {
    const { t, i18n } = useTranslation();
    const [alignment, setAlignment] = React.useState("");
    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    console.log('....................................',getedit)
    const theme = useTheme();
    const [factor, setFactor] = React.useState(Factor);
    const formik = useFormik({
        initialValues: {
            id: "",
            productName: "",
            productCode: "",
            serialNumber: "",
            MainUnit: 1,
            UnitPrice: "",
            subset: 0,
            Discount: 0,
            discountAmount: "",
            PriceAfterDiscount: "",
            taxamount: "",
            totalprice: "",
            unit: "",
            description: "",
            Note: ""
        },
        validationSchema: Yup.object({
            Discount: Yup.number().lessThan(101, ' بیشتر از 100 مجاز نیست')


        }),
        onSubmit: (values) => {

            setFactor(values);
            getdata(values);
            formik.resetForm()

        }
    });
    const factorSub = () => {
        swal({
            title: t("فاکتور با موفقیت ثبت شد"),
            icon: "success",
            button: t("باشه")
        });
    };

    function getData(val) {

        formik.setFieldValue("seen", val.seen);
        console.log(formik.values.seen);
    }
     useEffect(() => {


         getdata(formik.values)


     }, [formik.values]);
   

    const [subset, setsubset] = React.useState(0);
    const [disc, setdisc] = React.useState(0);
    const [newprice, setnewprice] = React.useState(0);
    const [tax, settax] = React.useState(0);
    const [editt, setEditt] = React.useState();
 

 
    useEffect(() => {


        setsubset(parseInt(formik.values.UnitPrice) * parseInt(formik.values.MainUnit) || 0);


    }, [formik.values.UnitPrice, formik.values.MainUnit]);

    useEffect(() => {

        formik.setFieldValue("subset", subset);

    }, [subset]);

    useEffect(() => {


    }, [formik.values.subset, formik.values.Discount]);


    useEffect(() => {


        formik.setFieldValue("discountAmount", disc);


    }, [disc]);


    useEffect(() => {


        setdisc(parseInt(formik.values.subset) * parseInt(formik.values.Discount) / 100 || 0);


    }, [formik.values.subset, formik.values.Discount]);


    useEffect(() => {


        formik.setFieldValue("discountAmount", disc);


    }, [disc]);


    useEffect(() => {


        setnewprice(parseInt(formik.values.subset) - parseInt(formik.values.discountAmount) || 0);


    }, [formik.values.subset, formik.values.discountAmount]);


    useEffect(() => {


        formik.setFieldValue("PriceAfterDiscount", newprice);


    }, [newprice]);


    useEffect(() => {

        console.log(formik.values.taxamount);
        console.log(formik.values.PriceAfterDiscount);

        settax(formik.values.PriceAfterDiscount * formik.values.taxamount || formik.values.PriceAfterDiscount);

        console.log(tax);


    }, [formik.values.PriceAfterDiscount, formik.values.taxamount]);


    useEffect(() => {


        formik.setFieldValue("totalprice", parsFloatFunction(tax,2));


    }, [tax]);


    useEffect(() => {

        formik.setFieldValue("productName", getedit.productName);
        formik.setFieldValue("productCode", getedit.productCode);
        formik.setFieldValue("UnitPrice", getedit.UnitPrice);
        formik.setFieldValue("serialNumber", getedit.serialNumber);
        formik.setFieldValue("id", getedit.id);



        formik.setFieldValue("MainUnit", getedit.MainUnit);
        formik.setFieldValue("subset", getedit.subset);
        formik.setFieldValue("Discount", getedit.Discount);
        formik.setFieldValue("discountAmount", getedit.discountAmount);
        formik.setFieldValue("PriceAfterDiscount", getedit.PriceAfterDiscount);


        formik.setFieldValue("taxamount", getedit.taxamount);
        formik.setFieldValue("totalprice", getedit.totalprice);
        formik.setFieldValue("unit", getedit.unit);
        formik.setFieldValue("description", getedit.description);
        formik.setFieldValue("Note", getedit.Note);




    }, [getedit]);

    function setproductmodal(val) {

        formik.setFieldValue("productName", val.productName);
        formik.setFieldValue("productCode", val.productCode);
        // formik.setFieldValue('totalprice', val.fullprice)
        formik.setFieldValue("UnitPrice", val.price);
        formik.setFieldValue("serialNumber", val.serialNumber);
        formik.setFieldValue("id", val.id);


    }


    function clearproductmodalField() {

        // formik.setFieldValue("productName", "");
        // formik.setFieldValue("productCode", "");
        // formik.setFieldValue("UnitPrice", "");
        formik.resetForm()
    }


    const taxamount = [{ Name: "0%", value: 0 }, { Name: "9%", value: 1.09 }];
    const unit = [{ Name: "0%", value: 0 }, { Name: "9%", value: 1.09 }];


    return (
        <>
            <div id="form" style={{ display: "block", marginRight: "10px" }}>

                <form onSubmit={formik.handleSubmit}>
                    {/*<h2 className='modal-title'>*/}
                    {/*  {t("انتخاب محصول")}*/}
                    {/*</h2>*/}
                    <div
                        className="form-template"
                        style={{
                            backgroundColor: `${theme.palette.background.paper}`,
                            borderWidth: "0",
                            "margin": "0 auto",
                            padding: 0
                        }}
                    >
                        <div className="form-design">
                            <div className="row">
                                <div className="content col-lg-4 col-md-6 col-xs-12">
                                    <div className="title">
                                        <span>{t("محصول")}</span>
                                    </div>
                                    <div className="wrapper">
                                        <div className='position-relative'>
                                            <input
                                                className="form-input"
                                                type="text"
                                                id="productName"
                                                name="productName"
                                                style={{ width: "100%" }}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.productName}
                                                disabled
                                            />

                                            {/*<div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >*/}
                                            {/*    <ProductModal className='modal' getData={setproductmodal} disabled />*/}
                                            {/*    <Button> <CancelIcon onClick={clearproductmodalField} /></Button>*/}
                                            {/*</div>*/}

                                             
                                            {formik.touched.productName && formik.errors.productName ? (
                                                <div style={{ color: "red" }}>
                                                    {formik.errors.productName}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="content col-lg-4 col-md-6 col-xs-12">
                                    <div className="title">
                                        <span>{t("کد محصول")}</span>
                                    </div>
                                    <div className="wrapper">
                                        <div>
                                            <input
                                                className="form-input"
                                                type="text"
                                                id="productCode"
                                                name="productCode"
                                                style={{ width: "100%" }}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.productCode}
                                                disabled
                                            />
                                            {formik.touched.productCode && formik.errors.productCode ? (
                                                <div style={{ color: "red" }}>
                                                    {formik.errors.productCode}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="content col-lg-4 col-md-6 col-xs-12">
                                    <div className="title">
                                        <span>{t("شماره سریال")}</span>
                                    </div>
                                    <div className="wrapper">
                                        <div>
                                            <input
                                                className="form-input"
                                                type="text"
                                                id="serialNumber"
                                                name="serialNumber"
                                                style={{ width: "100%" }}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.serialNumber}
                                                disabled
                                            />
                                            {formik.touched.serialNumber && formik.errors.serialNumber ? (
                                                <div style={{ color: "red" }}>
                                                    {formik.errors.serialNumber}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="content col-lg-4 col-md-6 col-xs-12">
                                    <div className="title">
                                        <span>{t("مقدار واحد اصلی")}</span>
                                    </div>
                                    <div className="wrapper">
                                        <div>
                                            <input
                                                className="form-input"
                                                type="text"
                                                id="MainUnit"
                                                name="MainUnit"
                                                style={{ width: "100%" }}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.MainUnit}

                                            />
                                            {formik.touched.MainUnit && formik.errors.MainUnit ? (
                                                <div style={{ color: "red" }}>
                                                    {formik.errors.MainUnit}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="content col-lg-4 col-md-6 col-xs-12">
                                    <div className="title">
                                        <span>{t("قیمت واحد")}</span>
                                    </div>
                                    <div className="wrapper">
                                        <div>


                                            {/*   <CurrencyInput*/}
                                            {/*    className='form-input'*/}
                                            {/*    style={{ width: "100%" }}*/}
                                            {/*    id="price"*/}
                                            {/*    name="price"*/}
                                            {/*    decimalsLimit={2}*/}
                                            {/*    onChange={(e) => HandleSalePriceChange(e.target.value)}*/}
                                            {/*/>*/}

                                            <CurrencyInput
                                                className="form-input"
                                                type="text"
                                                id="UnitPrice"
                                                name="UnitPrice"
                                                style={{ width: "100%" }}
                                                decimalsLimit={2}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.UnitPrice}
                                                disabled
                                            />
                                            {formik.touched.UnitPrice && formik.errors.UnitPrice ? (
                                                <div style={{ color: "red" }}>
                                                    {formik.errors.UnitPrice}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>

                                </div>
                                <div className="content col-lg-4 col-md-6 col-xs-12">
                                    <div className="title">
                                        <span>{t("زیر مجموع")}</span>
                                    </div>
                                    <div className="wrapper">
                                        <div>
                                            <CurrencyInput
                                                className="form-input"
                                                type="text"
                                                id="subset"
                                                name="subset"
                                                decimalsLimit={2}
                                                style={{ width: "100%" }}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.subset}
                                                disabled
                                            />
                                            {formik.touched.subset && formik.errors.subset ? (
                                                <div style={{ color: "red" }}>
                                                    {formik.errors.subset}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="content col-lg-4 col-md-6 col-xs-12">
                                    <div className="title">
                                        <span>{t("تخفیف (%)")}</span>
                                    </div>
                                    <div className="wrapper">
                                        <div>
                                            <input
                                                className="form-input"
                                                type="number"
                                                id="Discount"
                                                name="Discount"
                                                style={{ width: "100%" }}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.Discount}
                                            />
                                            {  formik.errors.Discount ? (
                                                <div style={{ color: "red" }}>
                                                    {formik.errors.Discount}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>

                                </div>
                                <div className="content col-lg-4 col-md-6 col-xs-12">
                                    <div className="title">
                                        <span>{t("مقدار تخفیف")}</span>
                                    </div>
                                    <div className="wrapper">
                                        <div>
                                            <CurrencyInput

                                                className="form-input"
                                                type="text"
                                                id="discountAmount"
                                                name="discountAmount"
                                                style={{ width: "100%" }}
                                                decimalsLimit={2}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.discountAmount}
                                                disabled

                                            />

                                            {formik.touched.discountAmount && formik.errors.discountAmount ? (
                                                <div style={{ color: "red" }}>
                                                    {formik.errors.discountAmount}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>

                                </div>
                                <div className="content col-lg-4 col-md-6 col-xs-12">
                                    <div className="title">
                                        <span>{t("مقدار پس از تخفیف")}</span>
                                    </div>
                                    <div className="wrapper">
                                        <div>
                                            <CurrencyInput
                                                className="form-input"
                                                type="text"
                                                id="PriceAfterDiscount"
                                                name="PriceAfterDiscount"
                                                style={{ width: "100%" }}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                disabled
                                                decimalsLimit={2}
                                                value={formik.values.PriceAfterDiscount}
                                            />
                                            {formik.touched.PriceAfterDiscount && formik.errors.PriceAfterDiscount ? (
                                                <div style={{ color: "red" }}>
                                                    {formik.errors.PriceAfterDiscount}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>

                                </div>
                                <div className="content col-lg-4 col-md-6 col-xs-12">
                                    <div className="title">
                                        <span>{t("مبلغ مالیات")}</span>
                                    </div>
                                    <div className="wrapper">
                                        <div>
                                           <SelectBox
                                              dataSource={taxamount}
                                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                              onValueChanged={(e) => formik.setFieldValue('taxamount', e.value)}
                                              className='selectBox'
                                              noDataText='اطلاعات یافت نشد'
                                              itemRender={null}
                                              placeholder=''
                                              displayExpr="Name"
                                              valueExpr="value"
                                              name='taxamount'
                                              id='taxamount'
                                              searchEnabled
                                              showClearButton           امکان پاک کردن فیلد
                                          //defaultValue={measurementUnits[0]}       نشان دادن مقدار اولیه
                                          />
                                          {formik.touched.taxamount && formik.errors.taxamount && !formik.values.taxamount ? (<div className='error-msg'>{t(formik.errors.taxamount)}</div>) : null}
                                        </div>
                                    </div>

                                </div>
                                <div className="content col-lg-4 col-md-6 col-xs-12">
                                    <div className="title">
                                        <span>{t("جمع کل")}</span>
                                    </div>
                                    <div className="wrapper">
                                        <div>
                                            <CurrencyInput
                                                className="form-input"
                                                type="text"
                                                id="totalprice"
                                                name="totalprice"
                                                style={{ width: "100%" }}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                disabled
                                                decimalsLimit={2}
                                                value={formik.values.totalprice}
                                            />
                                            {formik.touched.totalprice && formik.errors.totalprice ? (
                                                <div style={{ color: "red" }}>
                                                    {formik.errors.totalprice}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="content col-lg-4 col-md-6 col-xs-12">
                                    <div className="title">
                                        <span>{t("واحد")}</span>
                                    </div>
                                    <div className="wrapper">
                                        <div>

                                            <SelectBox
                                                dataSource={unit}
                                                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                onValueChanged={(e) => formik.setFieldValue('unit', e.value)}
                                                className='selectBox'
                                                noDataText='اطلاعات یافت نشد'
                                                itemRender={null}
                                                placeholder=''
                                                displayExpr="Name"
                                                valueExpr="value"
                                                name='unit'
                                                id='unit'
                                                searchEnabled
                                                showClearButton امکان پاک کردن فیلد
                                            //defaultValue={measurementUnits[0]}       نشان دادن مقدار اولیه
                                            />
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="content col-lg-6 col-md-6 col-xs-12">
                                    <div className="title">
                                        <span>{t("توضیحات")}</span>
                                    </div>
                                    <div className="wrapper">
                                        <div>
                                            <textarea
                                                className="form-input"
                                                id="description"
                                                name="description"
                                                style={{ width: "100%" }}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.description}
                                            />
                                            {formik.touched.description && formik.errors.description ? (
                                                <div style={{ color: "red" }}>
                                                    {formik.errors.description}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="content col-lg-6 col-md-6 col-xs-12">
                                    <div className="title">
                                        <span>{t("یادداشت")}</span>
                                    </div>
                                    <div className="wrapper">
                                        <div>
                                            <textarea
                                                className="form-input"
                                                id="Note"
                                                name="Note"
                                                style={{ width: "100%" }}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.Note}
                                            />
                                            {formik.touched.Note && formik.errors.Note ? (
                                                <div style={{ color: "red" }}>
                                                    {formik.errors.Note}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditProducts;
