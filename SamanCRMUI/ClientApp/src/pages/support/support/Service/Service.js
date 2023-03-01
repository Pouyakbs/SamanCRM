import React, { useEffect } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";
import { SelectBox } from "devextreme-react";
import { useSearchParams } from "react-router-dom";
import { parsFloatFunction } from "../../../../utils/parsFloatFunction";
import CurrencyInput from "react-currency-input-field";
import { history } from "../../../../utils/history";
import axios from "axios";
import { useState } from "react";

export const Service = () => {
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const appConfig = window.globalConfig;
  const [comPublicList, setComPublicList] = useState([]);
  const [rawData, setRawData] = useState([]);
  const [result, setResult] = useState();
  const { t, i18n } = useTranslation();
  const [panel1, setPanel1] = React.useState(true);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get(`${appConfig.BaseURL}/api/ComPublic/GetByProgramPart/68`)
      .then((res) => setComPublicList(res.data.data))
      .catch((error) => error);
    axios
      .get(`${appConfig.BaseURL}/api/authenticate/GetAllUsers/`)
      .then((res) => setRawData(res.data))
      .catch((error) => error);
  }, []);

  useEffect(() => {
    if (id != null) {
      axios.get(`${appConfig.BaseURL}/api/Service/${id}`).then((res) => {
        formik.setFieldValue("name", res.data.data.name);
        formik.setFieldValue("limitation", res.data.data.limitation);
        formik.setFieldValue("price", res.data.data.price);
        formik.setFieldValue("moneyUnit", res.data.data.moneyUnit);
        formik.setFieldValue("serviceUnit", res.data.data.serviceUnit);
        formik.setFieldValue("desc", res.data.data.desc);
      });
    }
  }, [id]);
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: "",
      limitation: 0,
      price: 0,
      moneyUnit: "",
      serviceUnit: "",
      desc: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(60, t("نام باید شامل 60 حرف یا کمتر باشد"))
        .required(t("نام الزامیست")),
    }),
    onSubmit: (values) => {
      axios
        .post(`${appConfig.BaseURL}/api/Service`, values)
        .then((res) => setResult(res.data.data));
      factorSub();
      callComponent();
    },
  });

  function HandlePriceChange(value) {
    let temp = value.replaceAll(",", "");
    formik.setFieldValue("price", parsFloatFunction(temp, 2));
  }

  const handlePanel1 = () => (event, newExpanded) => {
    setPanel1(newExpanded);
  };

  const updateService = (values) => {
    if (values != null) {
      let isSuccess = false;
      axios
        .put(`${appConfig.BaseURL}/api/Service/Update/${id}`, formik.values)
        .then((res) => {
          setResult(res.data);
          isSuccess = true;
        })
        .finally(() => {
          if ((isSuccess = true)) {
            history.navigate(`/Support/ServiceManagement`);
          }
        });
    }
  };

  const serviceError = () => {
    swal({
      title: t("لطفا اطلاعات الزامی را تکمیل کنید"),
      icon: "error",
      button: t("باشه"),
    });
  };

  const callComponent = () => {
    history.navigate(`/Support/ServiceManagement`);
  };
  //////////////////////////////////////////////////////////////////////////////

  const factorSub = () => {
    swal({
      title: t("خدمت با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };
  return (
    <>
      <div id="form" style={{ display: "block", marginRight: "10px" }}>
        {/*<h1 className='main-title' >*/}
        {/*    {t("ایجاد تاییدیه")}*/}
        {/*</h1>*/}

        <form onSubmit={formik.handleSubmit}>
          <div>
            <Accordion expanded={panel1} onChange={handlePanel1()}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1b-content"
                id="panel1b-header"
              >
                <Typography>{t("اطلاعات خدمت")}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="form-design">
                  <div className="row">
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>
                          {t("نام")}
                          <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <input
                            className="form-input"
                            type="text"
                            id="name"
                            name="name"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                          />
                          {formik.touched.name && formik.errors.name ? (
                            <div className="error-msg">
                              {formik.errors.name}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("کاربر")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.moneyUnit != "" && (
                            <SelectBox
                              dataSource={rawData}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                formik.setFieldValue("moneyUnit", e.value);
                              }}
                              defaultValue={formik.values.moneyUnit}
                              displayExpr="username"
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="moneyUnit"
                              id="moneyUnit"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null && formik.values.moneyUnit == "")) && (
                            <SelectBox
                              dataSource={rawData}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                formik.setFieldValue("moneyUnit", e.value);
                              }}
                              defaultValue={formik.values.moneyUnit}
                              displayExpr="userName"
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="moneyUnit"
                              id="moneyUnit"
                              searchEnabled
                              showClearButton
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("قیمت")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <CurrencyInput
                            className="form-input"
                            style={{ width: "100%" }}
                            id="price"
                            name="price"
                            decimalsLimit={2}
                            onBlur={formik.handleBlur}
                            value={formik.values.price}
                            onChange={(e) => {
                              HandlePriceChange(e.target.value);
                            }}
                            onChangeCapture={formik.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("واحد پول")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.moneyUnit != "" && (
                            <SelectBox
                              dataSource={comPublicList.filter(
                                (item) => item.comPublicTitleID == 201
                              )}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                formik.setFieldValue(
                                  "moneyUnit",
                                  e.value.title
                                );
                              }}
                              displayExpr="title"
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="moneyUnit"
                              id="moneyUnit"
                              searchEnabled
                              showClearButton
                              defaultValue={formik.values.moneyUnit}
                            />
                          )}
                          {(!id ||
                            (id != null && formik.values.moneyUnit == "")) && (
                            <SelectBox
                              dataSource={comPublicList.filter(
                                (item) => item.comPublicTitleID == 201
                              )}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                formik.setFieldValue(
                                  "moneyUnit",
                                  e.value.title
                                );
                              }}
                              defaultValue={formik.values.moneyUnit}
                              displayExpr="title"
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="moneyUnit"
                              id="moneyUnit"
                              searchEnabled
                              showClearButton
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span> {t("واحد ارائه خدمات")} </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          {id != null && formik.values.serviceUnit != "" && (
                            <SelectBox
                              dataSource={comPublicList.filter(
                                (item) => item.comPublicTitleID == 202
                              )}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                formik.setFieldValue(
                                  "serviceUnit",
                                  e.value.title
                                );
                              }}
                              defaultValue={formik.values.serviceUnit}
                              displayExpr="title"
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="serviceUnit"
                              id="serviceUnit"
                              searchEnabled
                              showClearButton
                              //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                            />
                          )}
                          {(!id ||
                            (id != null &&
                              formik.values.serviceUnit == "")) && (
                            <SelectBox
                              dataSource={comPublicList.filter(
                                (item) => item.comPublicTitleID == 202
                              )}
                              rtlEnabled={i18n.dir() == "ltr" ? false : true}
                              onValueChanged={(e) => {
                                formik.setFieldValue(
                                  "serviceUnit",
                                  e.value.title
                                );
                              }}
                              defaultValue={formik.values.serviceUnit}
                              displayExpr="title"
                              className="selectBox"
                              noDataText="اطلاعات یافت نشد"
                              placeholder=""
                              name="serviceUnit"
                              id="serviceUnit"
                              searchEnabled
                              showClearButton
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("حد مجاز")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <input
                            className="form-input"
                            type="number"
                            id="limitation"
                            name="limitation"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.limitation}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1b-content"
                id="panel1b-header"
              >
                <Typography> {t("توضیحات")} </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="form-design">
                  <div className="row">
                    <div className="content col-lg-6 col-md-12 col-xs-12">
                      <div className="title">
                        <span>{t("توضیحات")}</span>
                      </div>
                      <div className="wrapper">
                        <div className="divModal">
                          <textarea
                            className="form-input"
                            id="desc"
                            name="desc"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.desc}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <div className="button-pos">
              <Button
                variant="contained"
                color="success"
                type="button"
                onClick={id != null ? updateService : formik.handleSubmit}
              >
                {t("ثبت")}
              </Button>
              <Button
                variant="contained"
                style={{ marginRight: "5px" }}
                color="error"
                onClick={callComponent}
              >
                {t("انصراف")}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Service;
