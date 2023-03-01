import React,{useEffect, useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import Button from '@mui/material/Button';
import { Grid, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Add } from "@mui/icons-material";
import { SelectBox } from 'devextreme-react/select-box';



const Factor = [];
export const ApplyChanges = ({getchange,closDialog}) => {
  const { t, i18n } = useTranslation();
  const [alignment, setAlignment] = React.useState("");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    };
    
  const theme = useTheme();
  const [factor, setFactor] = React.useState([]);
  const formik = useFormik({
    initialValues: {
    
      change:"",
      taxamount:"",
      NewPrice:"",
      discountpercentage:0,
      select:"Add",
      
    },
    validationSchema: Yup.object({
      discountpercentage: Yup.number().lessThan(101,'بیشتر از 100 مجاز نیست'),
      NewPrice: Yup.number().lessThan(101,'بیشتر از 100 مجاز نیست')


    }),
    onSubmit: (values) => {
      console.log(values)

      // setFactor([...factor,values]);
      getchange(values)
      closDialog()
      console.log('changes',factor)
    },
  });
    const change = [t("یافت نشد")];
    const taxamount = [{ Name: "0%", value: 0 }, { Name: "9%", value: 1.09 }, { Name: "20%", value: 1.20 }];


      
  return (
    <>
      <div id="form" style={{ display: "block", marginRight: "10px" , position:'relative'}}>

        <form className="Position-relative" onSubmit={formik.handleSubmit}>
          <h4 style={{ marginTop: "10px" }}>{t("تغییرات ثبت شده در این قسمت روی تمامی ردیف محصولات اعمال خواهد شد") }</h4>
          <div
            
            style={{
              backgroundColor: `${theme.palette.background.paper}`,
             
              borderColor: `${theme.palette.divider}`,
          
            }}
          >             
              <div className="form-design">
                <div className="row">
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span>{t("تغییر روی")}</span>
                     
                          </div>
                         <div className="wrapper">
                        <div>
                        <SelectBox
                            dataSource={change}
                            rtlEnabled={i18n.dir() == "ltr" ? false : true}
                            onValueChanged={(e) => formik.setFieldValue('change', e.value)}
                            className='selectBox'
                            noDataText='اطلاعات یافت نشد'
                            itemRender={null}
                            placeholder=''
                            name='change'
                            id='change'
                            searchEnabled
                            showClearButton           امکان پاک کردن فیلد
                        //defaultValue={measurementUnits[0]}       نشان دادن مقدار اولیه
                        />
                        {formik.touched.change && formik.errors.change && !formik.values.change ? (<div className='error-msg'>{t(formik.errors.change)}</div>) : null}
                        </div>
                      </div>
                  </div>
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                      <span>{t("مالیات")}</span>
                     
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
                
                  <div className="content col-lg-6 col-md-6 col-xs-12">
                    <div className="title">
                          <span>{t("افزایش مبلغ(درصد)")}</span>
                      </div>
                      <div className="wrapper">
                        <div>
                          <input
                            className="form-input"
                            type="text"
                            id="NewPrice"
                            name="NewPrice"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.NewPrice}
                          />
                        </div>
                        { formik.errors.NewPrice ? (
                          <div style={{ color: "red" }}>
                            {formik.errors.NewPrice}
                          </div>
                        ) : null}
                    </div>
                  </div>
                  <div className="content col-lg-4 col-md-6 col-xs-12">
                    <div className="title">
                      <span>{t("تخفیف(درصد)")}</span> </div>
                      <div className="wrapper">
                        <div>
                          <input
                            className="form-input"
                            type="number"
                            id="discountpercentage"
                            name="discountpercentage"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.discountpercentage}                           
                          />
                          { formik.errors.discountpercentage ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.discountpercentage}
                            </div>
                          ) : null}
                        </div>
                    </div>
                  </div>
                  <div className="content col-lg-1 col-md-3 col-6">
                    <div className='title'>
                      <span>‌</span>
                    </div>
                  <div style={{position:"relative", display:"flex"}} className="activeConnection">
                    <div className="wrapper" >

                      <label className="d-flex align-items-center">
                        <input
                            className="form-input"
                            type="radio"
                            id="Add"
                            name="select"
                            style={{ width: "100%" }}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={'Add'}
                            checked={formik.values.select==='Add' }
                        />
                        {t("افزایش")}
                       
                      </label>
                  </div>
                    <span className="spanCheckBox"></span>
                  </div>
                </div>
                <div className="content col-lg-1 col-md-3 col-6">
                  <div className='title'>
                    <span>‌</span>
                  </div>
                  <div style={{position:"relative", display:"flex"}} className="activeConnection">
                    <div className="wrapper" >
                   
                      <label className="d-flex align-items-center">
                        <input
                          className="form-input"
                          type="radio"
                          id="replace"
                          name="select"
                          style={{ width: "100%" }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={'replace'}
                        />
                        {t("جایگزین")}
                       
                      </label>
                  </div>
                    <span className="spanCheckBox"></span>
                  </div>
                </div>
                  <div style={{display:"flex",justifyContent:"center"} }>
                    <Button
                      type='submit'
                      sx={{ margin: 0, width: 120, height: 50, }}
                      variant="contained"
                      color="success"
                      disabled={!formik.values.taxamount&&!formik.values.NewPrice&&!formik.values.discountpercentage}

                    >{t("ثبت") }</Button>
                  </div>
                  </div>
                </div>   
             </div>
        </form>
      </div>
    </>
  );
};

export default ApplyChanges;
