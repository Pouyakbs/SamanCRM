import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import Checkbox from "@mui/material/Checkbox";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import swal from "sweetalert";
import { useSearchParams } from "react-router-dom";
import { history } from "../../../utils/history";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";

const CreateMeetingPlace = () => {
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const { t, i18n } = useTranslation();

  const theme = useTheme();
  const appConfig = window.globalConfig;
  const callComponent = () => {
    history.navigate(`/BaseInfo/MeetingPlacesManagement`);
  };
  const [panel1, setPanel1] = React.useState(true);
  const [meetingPlaceDetail, setMeetingPlaceDetail] = React.useState([]);
  const [result, setResult] = React.useState([]);
  const handlePanel1 = () => (event, newExpanded) => {
    setPanel1(newExpanded);
  };

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      placeID: 0,
      placeName: "",
      roomCapacity: 0,
      lapTop: false,
      monitor: false,
      internet: false,
      network: false,
      microPhone: false,
      projector: false,
      whiteBoard: false,
      coolingAndHeating: false,
      desc: "",
    },
    validationSchema: Yup.object({
      placeName: Yup.string()
        .max(50, t("نام باید شامل 50 حرف یا کمتر باشد"))
        .required(t("نام اتاق الزامیست")),
      roomCapacity: Yup.number().required(t("ظرفیت الزامیست")),
    }),
    onSubmit: (values) => {
      axios
        .post(`${appConfig.BaseURL}/api/meetingPlaces`, values)
        .then((res) => setResult(res.data.data));
      factorSub();
      callComponent();
    },
  });
  const factorSub = () => {
    swal({
      title: t("مکان جلسه با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };

  useEffect(() => {
    if (id != null) {
      axios.get(`${appConfig.BaseURL}/api/meetingPlaces/${id}`).then((res) => {
        setMeetingPlaceDetail(res.data.data);
        formik.setFieldValue("placeName", res.data.data.placeName);
        formik.setFieldValue("roomCapacity", res.data.data.roomCapacity);
        formik.setFieldValue("lapTop", res.data.data.lapTop);
        formik.setFieldValue("monitor", res.data.data.monitor);
        formik.setFieldValue("internet", res.data.data.internet);
        formik.setFieldValue("network", res.data.data.network);
        formik.setFieldValue("microPhone", res.data.data.microPhone);
        formik.setFieldValue("projector", res.data.data.projector);
        formik.setFieldValue("whiteBoard", res.data.data.whiteBoard);
        formik.setFieldValue("coolingAndHeating", res.data.data.coolingAndHeating);
        formik.setFieldValue("desc", res.data.data.desc);
      });
    }
  }, [id]);
  useEffect(() => {
    if (formik.isSubmitting) {
      let condition1 =
        !!(formik.touched.placeName && formik.errors.placeName) ||
        !!(formik.touched.roomCapacity && formik.errors.roomCapacity);
      setPanel1(condition1 || panel1);
    }
  }, [formik.errors, formik.touched]);

  const updateMeetingPlace = (values) => {
    if (values != null) {
      let isSuccess = false;
      axios
        .put(
          `${appConfig.BaseURL}/api/meetingPlaces/Update/${id}`,
          formik.values
        )
        .then((res) => {
          setResult(res.data);
          isSuccess = true;
        })
        .finally(() => {
          if ((isSuccess = true)) {
            callComponent();
          }
        });
    }
  };
  return (
    <>
      <div id="noteform">
        <form onSubmit={formik.handleSubmit}>
          {/*<h1*/}
          {/*  className={"main-title"}*/}
          {/*>*/}
          {/*  {t("ایجاد مکان جلسات")}*/}
          {/*</h1>*/}
          <Accordion expanded={panel1} onChange={handlePanel1()}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{t("ایجاد مکان جلسات")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <div className="form-design">
                  <div className="row">
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>
                          {t("نام اتاق")} <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <input
                            className="form-input"
                            type="text"
                            name="placeName"
                            id="placeName"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.placeName}
                          />
                          {formik.touched.placeName &&
                          formik.errors.placeName ? (
                            <div className="error-msg">
                              {formik.errors.placeName}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-6 col-xs-12">
                      <div className="title">
                        <span>
                          {t("ظرفیت")} <span className="star">*</span>
                        </span>
                      </div>
                      <div className="wrapper">
                        <div className="row">
                          <div className="content col-lg-11 col-md-6 col-xs-12">
                            <div>
                              <input
                                className="form-input"
                                type="number"
                                name="roomCapacity"
                                id="roomCapacity"
                                style={{ width: "100%" }}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.roomCapacity}
                              />
                              {formik.touched.roomCapacity &&
                              formik.errors.roomCapacity ? (
                                <div className="error-msg">
                                  {formik.errors.roomCapacity}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="content col-lg-1 col-md-6 col-xs-12">
                            <div>
                              <p>نفر</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-12 col-md-6 col-xs-12">
                      <div className="title">
                        <span>{t("امکانات")}</span>
                      </div>
                      <div className="row">
                        <div className="content col-lg-3 col-md-6 col-xs-12">
                          <FormControlLabel
                            value="end"
                            control={
                              <Checkbox
                                checked={formik.values.lapTop}
                                id="lapTop"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="lapTop"
                              />
                            }
                            label="لپ تاپ"
                            labelPlacement="end"
                          />
                        </div>
                        <div className="content col-lg-3 col-md-6 col-xs-12">
                          <FormControlLabel
                            value="end"
                            control={
                              <Checkbox
                                checked={formik.values.monitor}
                                id="monitor"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="monitor"
                              />
                            }
                            label="مانیتور"
                            labelPlacement="end"
                          />
                        </div>
                        <div className="content col-lg-3 col-md-6 col-xs-12">
                          <FormControlLabel
                            value="end"
                            control={
                              <Checkbox
                                checked={formik.values.internet}
                                id="internet"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="internet"
                              />
                            }
                            label="اینترنت"
                            labelPlacement="end"
                          />
                        </div>
                        <div className="content col-lg-3 col-md-6 col-xs-12">
                          <FormControlLabel
                            value="end"
                            control={
                              <Checkbox
                                checked={formik.values.network}
                                id="network"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="network"
                              />
                            }
                            label="شبکه"
                            labelPlacement="end"
                          />
                        </div>
                        <div className="content col-lg-3 col-md-6 col-xs-12">
                          <FormControlLabel
                            value="end"
                            control={
                              <Checkbox
                                checked={formik.values.microPhone}
                                id="microPhone"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="microPhone"
                              />
                            }
                            label="میکروفون"
                            labelPlacement="end"
                          />
                        </div>
                        <div className="content col-lg-3 col-md-6 col-xs-12">
                          <FormControlLabel
                            value="end"
                            control={
                              <Checkbox
                                checked={formik.values.projector}
                                id="projector"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="projector"
                              />
                            }
                            label="ویدیو پروژکتور و پرده ی نمایش"
                            labelPlacement="end"
                          />
                        </div>
                        <div className="content col-lg-3 col-md-6 col-xs-12">
                          <FormControlLabel
                            value="end"
                            control={
                              <Checkbox
                                checked={formik.values.whiteBoard}
                                id="whiteBoard"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="whiteBoard"
                              />
                            }
                            label="وایت برد"
                            labelPlacement="end"
                          />
                        </div>
                        <div className="content col-lg-3 col-md-6 col-xs-12">
                          <FormControlLabel
                            value="end"
                            control={
                              <Checkbox
                                checked={formik.values.coolingAndHeating}
                                id="coolingAndHeating"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="coolingAndHeating"
                              />
                            }
                            label="لوازم سرمایشی و گرمایشی اختصاصی"
                            labelPlacement="end"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="content col-lg-6 col-md-12 col-xs-12">
                      <div className="title">
                        <span>{t("توضیحات")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <textarea
                            className="form-input"
                            type="text"
                            id="desc"
                            name="desc"
                            style={{ width: "100%", height: "100px" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.desc}
                          />
                        </div>
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
              onClick={id != null ? updateMeetingPlace : formik.handleSubmit}
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
        </form>
      </div>
    </>
  );
};
export default CreateMeetingPlace;
