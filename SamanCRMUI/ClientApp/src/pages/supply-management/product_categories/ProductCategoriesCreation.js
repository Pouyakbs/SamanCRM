import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  Button,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { history } from "../../../utils/history";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import swal from "sweetalert";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import CategoryModal from "../../../components/Modals/Ghafourian_CategoryModal/CategoryModal";
import CancelIcon from "@mui/icons-material/Cancel";
import UserModal from "../../../components/Modals/Ghafourian_UserModal/UserModal";
import { SelectBox } from "devextreme-react";

const ProductCategory = [];
export const ProductCategoriesCreation = () => {
  const [SearchParams] = useSearchParams();
  const id = SearchParams.get("id");
  const [datasource, setDataSource] = useState([]);
  const [categoryDetail , setCategoryDetail] = useState([]);
  const [result, setResult] = useState();
  const appConfig = window.globalConfig;
  const { t, i18n } = useTranslation();
  const [alignment, setAlignment] = useState("");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const theme = useTheme();
  const [productCategory, SetProductCategory] = useState(ProductCategory);

  const [panel1, setPanel1] = useState(true);

  const handlePanel1 = () => (event, newExpanded) => {
    setPanel1(newExpanded);
  };
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      categoryID: 0,
      categoryName: "",
      parentID: 0,
      parentCategory: "",
      user: "",
      desc: "",
    },
    validationSchema: Yup.object({
      categoryName: Yup.string()
        .max(30, "نام دسته‌بندی باید شامل 30 حرف یا کمتر باشد")
        .required("نام دسته الزامیست"),
    }),
    onSubmit: (values) => {
        axios
          .post(`${appConfig.BaseURL}/api/ProductCategory`, values)
          .then((res) => setResult(res.data.data));
      productCategorySub();
      callComponent();
    },
  });

  const callComponent = () => {
    history.navigate(
      `/inventory-management/productCategories/ProductCategoriesManagement`
    );
  };
  const productCategorySub = () => {
    swal({
      title: t("دسته بندی با موفقیت ثبت شد"),
      icon: "success",
      button: t("باشه"),
    });
  };
  const updateCategory = (values) => {
    if (values != null) {
      let isSuccess = false;
      axios
        .put(
          `${appConfig.BaseURL}/api/ProductCategory/Update/${id}`,
          formik.values
        )
        .then((res) => {
          setResult(res.data);
          isSuccess = true;
        })
        .finally(() => {
          if ((isSuccess = true)) {
            history.navigate(
              `/inventory-management/productCategories/ProductCategoriesManagement`
            );
          }
        });
    }
  };
  useEffect(() => {
    if(id != null) {
      axios
        .get(`${appConfig.BaseURL}/api/ProductCategory/${id}`)
        .then((res) => {
          setCategoryDetail(res.data.data)
          formik.setFieldValue("categoryID", res.data.data.categoryID)
          formik.setFieldValue("categoryName", res.data.data.categoryName)
          formik.setFieldValue("parentID", res.data.data.parentID)
          formik.setFieldValue("parentCategory", res.data.data.parentCategory)
          formik.setFieldValue("desc", res.data.data.desc)
        })
    }
  }, [id]);
  useEffect(() => {
    if (formik.isSubmitting) {
      let nameCondition = !!(
        formik.touched.categoryName && formik.errors.categoryName
      );
      setPanel1(nameCondition || panel1);
    }
  }, [formik]);

  useEffect(() => {
    axios
      .get(`${appConfig.BaseURL}/api/ProductCategory`)
      .then((res) => setDataSource(res.data.data));
  }, []);

  function getParentCategoryData(val) {
    formik.setFieldValue("parentCategory", val.CategoryName);
    console.log(formik.values.parentCategory);
  }
  function clearParentCategoryData() {
    formik.setFieldValue("parentCategory", "");
  }
  function getUserData(val) {
    formik.setFieldValue("user", val.Name);
    console.log(formik.values.user);
  }
  function clearUserField() {
    formik.setFieldValue("user", "");
  }

  return (
    <>
      <div id="form" style={{ display: "block", marginRight: "10px" }}>
        {/*<h1 className='main-title'>*/}
        {/*    {t("ایجاد دسته محصول")}*/}
        {/*</h1>*/}

        <form onSubmit={formik.handleSubmit} noValidate>
          <Accordion expanded={panel1} onChange={handlePanel1()}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography style={{ color: `${theme.palette.text.primary}` }}>
                {t("اطلاعات دسته")}{" "}
              </Typography>
            </AccordionSummary>
            <div>
              <div className="form-design">
                <div className="row">
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span>
                        {" "}
                        {t("نام")} <span className="star">*</span>
                      </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <input
                          className="form-input"
                          type="text"
                          id="categoryName"
                          name="categoryName"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.categoryName}
                        />
                        {formik.touched.categoryName &&
                        formik.errors.categoryName &&
                        !formik.values.categoryName ? (
                          <div className="error-msg">
                            {t(formik.errors.categoryName)}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("دسته والد")} </span>
                    </div>
                    <div className="wrapper">
                      {id != null && formik.values.parentID != 0 && (
                        <SelectBox
                          dataSource={datasource}
                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                          onValueChanged={(e) => {
                            console.log("------e111", e);
                            formik.setFieldValue("parentID", e.value == null ? 0 : e.value);
                          }}
                          displayExpr={"categoryName"}
                          valueExpr={"categoryID"}
                          defaultValue={formik.values.parentID}
                          className="selectBox"
                          noDataText="اطلاعات یافت نشد"
                          placeholder=""
                          name="parentID"
                          id="parentID"
                          searchEnabled
                          showClearButton
                          //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                        />
                      )}
                      {(!id || (id != null && formik.values.parentID == 0)) && (
                        <SelectBox
                          dataSource={datasource}
                          rtlEnabled={i18n.dir() == "ltr" ? false : true}
                          onValueChanged={(e) => {
                            console.log("------eeeeeeeeeee", e);
                            formik.setFieldValue("parentID", e.value);
                          }}
                          displayExpr={"categoryName"}
                          valueExpr={"categoryID"}
                          defaultValue={formik.values.parentID}
                          className="selectBox"
                          noDataText="اطلاعات یافت نشد"
                          placeholder=""
                          name="parentID"
                          id="parentID"
                          searchEnabled
                          showClearButton
                          //defaultValue={GroupingOne[0]}       نشان دادن مقدار اولیه
                        />
                      )}
                    </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("کاربر")} </span>
                    </div>
                    <div className="wrapper">
                      <div className="d-flex" style={{ position: "relative" }}>
                        <input
                          className={`form-input modal-input ${
                            i18n.dir() === "ltr" ? "ltr" : ""
                          }`}
                          type="text"
                          id="user"
                          name="user"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.user}
                          disabled
                        />
                        <div
                          className={`modal-action-button  ${
                            i18n.dir() === "ltr" ? "action-ltr" : ""
                          }`}
                        >
                          <UserModal getData={getUserData} />
                          <Button>
                            <CancelIcon onClick={clearUserField} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography style={{ color: `${theme.palette.text.primary}` }}>
                {t("توضیحات")}{" "}
              </Typography>
            </AccordionSummary>
            <div>
              <div className="form-design">
                <div className="row">
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span> {t("توضیحات")} </span>
                    </div>
                    <div className="wrapper">
                      <div>
                        <textarea
                          className="form-input"
                          id="desc"
                          name="desc"
                          style={{ width: "100%" }}
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
          </Accordion>
          <div className="button-pos">
            <Button
              variant="contained"
              color="success"
              type="button"
              onClick={id != null ? updateCategory : formik.handleSubmit}
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

export default ProductCategoriesCreation;
