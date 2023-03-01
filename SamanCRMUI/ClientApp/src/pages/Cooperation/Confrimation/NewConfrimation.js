import React, { useEffect } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";

import { Accordion, AccordionDetails, AccordionSummary, Button, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import ParentNameModal from "../../../components/Modals/ParentsName/ParentNameModal";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelIcon from '@mui/icons-material/Cancel';
import CorroborantModal from "../../../components/Modals/corroborant/CorroborantModal";
import UserRecordsSupervisorModal from "../../../components/Modals/records/UserRecordsSupervisorModal";
import RoleOfRecordSupervisorModal from "../../../components/Modals/RoleOfUser/RoleOfRecordSupervisorModal";
import TheRecordMonitoringTeamModal from "../../../components/Modals/TheRecordMonitoringTeam/TheRecordMonitoringTeamModal";
import { SelectBox } from "devextreme-react";

const Factor = [];
export const NewConfrimation = () => {
    const { t, i18n } = useTranslation();
    const [alignment, setAlignment] = React.useState("");


    const [panel1, setPanel1] = React.useState(true);
    const theme = useTheme();
    const [factor, setFactor] = React.useState(Factor);
    const formik = useFormik({
        validateOnChange: false,
        initialValues: {
            id: Math.floor(Math.random() * 1000),
            name: "",
            parentName1: "",
            parentName2: "",
            confirmationModel: "",
            condition: "",
            confirmationType: "",
            corroborant: "",
            confirmStep: "",
            editRecord_DuringConfirmation: "",
            editRecord_AfterConfirmation: "",
            editRecord_AfterRejection: "",
            userRecordsSupervisor: "",
            roleOfRecordSupervisor: "",
            theRecordMonitoringTeam: "",
            abilityToEditTheProductLine_DuringConfrimation: false,
            abilityToEditTheProductLine_AfterConfirmation: false,
            abilityToEditTheProductLine_AfterRejection: false,
            abilityToEditTheProductLine_ForTheUserRecordsSupervisor: false,
            abilityToEditTheProductLine_RoleOfRecordSupervisor: false,
            abilityToEditTheProductLine_ForTheRecordMonitoringTeam: false,

            description: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(15, t("نام باید شامل 15 حرف یا کمتر باشد"))
                .required(t("نام الزامیست")),
            parentName2: Yup.string().required(t("نام والد الزامیست")),

        }),
        onSubmit: (values) => {
            console.log(values)
            setFactor([...factor, values]);
            factorSub()

        },
    });

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    function getParentNameData(val) {
        formik.setFieldValue('parentName2', val.parentName2)
    }
    function clearParentNameField() {
        formik.setFieldValue('parentName2', "")
    }
    function getCorroborantData(val) {
        formik.setFieldValue('corroborant', val.corroborant)
    }
    function clearCorroborantField() {
        formik.setFieldValue('corroborant', "")
    }

    function getUserRecordsSupervisorData(val) {
        formik.setFieldValue('userRecordsSupervisor', val.userRecordsSupervisor)
    }
    function clearUserRecordsSupervisorField() {
        formik.setFieldValue('userRecordsSupervisor', "")
    }

    function getRoleOfRecordSupervisorData(val) {
        formik.setFieldValue('roleOfRecordSupervisor', val.roleOfRecordSupervisor)
    }
    function clearRoleOfRecordSupervisorField() {
        formik.setFieldValue('roleOfRecordSupervisor', "")
    }

    function getTheRecordMonitoringTeamData(val) {
        formik.setFieldValue('theRecordMonitoringTeam', val.theRecordMonitoringTeam)
    }
    function clearTheRecordMonitoringTeamField() {
        formik.setFieldValue('theRecordMonitoringTeam', "")
    }


    const handlePanel1 = () => (event, newExpanded) => {
        setPanel1(newExpanded);
    };


    useEffect(() => {
        if (formik.isSubmitting) {
            let condition1 = !!((formik.touched.name && formik.errors.name) ||
                (formik.touched.parentName2 && formik.errors.parentName2));


            setPanel1(condition1 || panel1)

        }

    }, [formik])
    ////////////////////////////select box array///////////////////////////////////
    const editRecord_AfterRejectionArray = [t("هیچ کس"), t("مدیر"), t("مدیر و کاربر مسئول"), t("تایید کننده"), t("با توجه به نقش و گروه")]
    const editRecord_AfterConfirmationArray = [t("هیچ کس"), t("مدیر"), t("مدیر و کاربر مسئول"), t("تایید کننده"), t("با توجه به نقش و گروه")]
    const editRecord_DuringConfirmationArray = [t("هیچ کس"), t("مدیر"), t("مدیر و کاربر مسئول"), t("تایید کننده"), t("با توجه به نقش و گروه")]
    const parentName1Array = [t("پیش فاکتور"), t("فاکتور"), t("سفارش خرید"), t("قرارداد فروش"), t("دستور کار"), t("حواله فروش"), t("مدیریت کلیم")]
    const confirmationModelArray = [t("تاییدیه کسب و کار"), t("تایید مشتری")]
    const conditionArray = [t("منتظر تایید"), t("تایید شده"), t("رد شده"), t("واگذار شده"), t("غیرفعال")]
    const confirmationTypeArray = [t("نیازمند تاییدیه"), t("تایید خودکار"), t("رد خودکار")]


    //////////////////////////////////////////////////////////////////////////////


    const factorSub = () => {

        swal({
            title: t("فاکتور با موفقیت ثبت شد"),
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
                                <Typography>{t("اطلاعات تاییدیه")}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="form-design">
                                    <div className="row">
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("نام")}<span className="star">*</span></span>
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
                                                        <div className='error-msg'>
                                                            {formik.errors.name}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-3 col-md-3 col-xs-12">
                                            <div className="title">
                                                <span>{t("نام والد")}<span className="star">*</span></span>
                                            </div>
                                            <div className="wrapper">
                                                <div>
                                                    <SelectBox
                                                        dataSource={parentName1Array}
                                                        rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                        onValueChanged={(e) => formik.setFieldValue('parentName1', e.value)}
                                                        className='selectBox'
                                                        noDataText={t('اطلاعات يافت نشد')}
                                                        itemRender={null}
                                                        placeholder=''
                                                        name='parentName1'
                                                        id='parentName1'
                                                        searchEnabled
                                                    //showClearButton           امکان پاک کردن فیلد
                                                    //defaultValue={measurementUnits[0]}       نشان دادن مقدار اولیه 
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-3 col-md-3 col-xs-12">
                                            <div className="title">
                                                <span>‌</span>
                                            </div>
                                            <div className="wrapper">
                                                <div className="divModal">
                                                    <input
                                                        disabled
                                                        className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                        type="text"
                                                        id="parentName2"
                                                        name="parentName2"
                                                        style={{ width: "100%" }}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.parentName2}
                                                    />
                                                    {formik.touched.parentName2 && formik.errors.parentName2 ? (
                                                        <div className='error-msg'>
                                                            {formik.errors.parentName2}
                                                        </div>
                                                    ) : null}

                                                    <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >

                                                        <ParentNameModal disabled={!(formik.values.parentName1)} getData={getParentNameData} />
                                                        <Button> <CancelIcon onClick={clearParentNameField} /></Button>

                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("مدل تاییدیه")}</span>
                                            </div>
                                            <div className="wrapper">
                                                <div>
                                                    <SelectBox
                                                        dataSource={confirmationModelArray}
                                                        rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                        onValueChanged={(e) => formik.setFieldValue('confirmationModel', e.value)}
                                                        className='selectBox'
                                                        noDataText={t('اطلاعات يافت نشد')}
                                                        itemRender={null}
                                                        placeholder=''
                                                        name='confirmationModel'
                                                        id='confirmationModel'
                                                        searchEnabled
                                                        showClearButton
                                                    />
                                                    {formik.touched.confirmationModel && formik.errors.confirmationModel ? (
                                                        <div className='error-msg'>
                                                            {formik.errors.confirmationModel}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("وضعیت")}</span>
                                            </div>
                                            <div className="wrapper">
                                                <div>
                                                    <SelectBox
                                                        dataSource={conditionArray}
                                                        rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                        onValueChanged={(e) => formik.setFieldValue('condition', e.value)}
                                                        className='selectBox'
                                                        noDataText={t('اطلاعات يافت نشد')}
                                                        itemRender={null}
                                                        placeholder=''
                                                        name='condition'
                                                        id='condition'
                                                        searchEnabled
                                                        showClearButton
                                                    />
                                                    {formik.touched.condition && formik.errors.condition ? (
                                                        <div className='error-msg'>
                                                            {formik.errors.condition}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("نوع تاییدیه")}</span>
                                            </div>
                                            <div className="wrapper">
                                                <div>

                                                    <SelectBox
                                                        dataSource={confirmationTypeArray}
                                                        rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                        onValueChanged={(e) => formik.setFieldValue('confirmationType', e.value)}
                                                        className='selectBox'
                                                        noDataText={t('اطلاعات يافت نشد')}
                                                        itemRender={null}
                                                        placeholder=''
                                                        name='confirmationType'
                                                        id='confirmationType'
                                                        searchEnabled
                                                        showClearButton
                                                    />
                                                    {formik.touched.confirmationType && formik.errors.confirmationType ? (
                                                        <div className='error-msg'>
                                                            {formik.errors.confirmationType}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("گام تایید")}</span>
                                            </div>
                                            <div className="wrapper">
                                                <div className="divModal">
                                                    <input
                                                        className="form-input"
                                                        type="text"
                                                        id="confirmStep"
                                                        name="confirmStep"
                                                        style={{ width: "100%" }}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.confirmStep}
                                                    />
                                                    {formik.touched.teamName && formik.errors.teamName ? (
                                                        <div className='error-msg'>
                                                            {formik.errors.teamName}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("تایید کننده")}</span>
                                            </div>
                                            <div className="wrapper">
                                                <div className="divModal" >
                                                    <input
                                                        disabled
                                                        className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                        type="text"
                                                        id="corroborant"
                                                        name="corroborant"
                                                        style={{ width: "100%" }}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.corroborant}
                                                    />

                                                    {formik.touched.corroborant && formik.errors.corroborant ? (
                                                        <div className='error-msg'>
                                                            {formik.errors.corroborant}
                                                        </div>
                                                    ) : null}

                                                    <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >
                                                        <CorroborantModal getData={getCorroborantData} />
                                                        <Button ><CancelIcon onClick={clearCorroborantField} /></Button>
                                                    </div>



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
                                <Typography>{t("قابلیت ویرایش رکورد")}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="form-design">
                                    <div className="row align-items-center">
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("ویرایش رکورد(در حین تایید)")}</span>
                                            </div>
                                            <div className="wrapper">
                                                <div>
                                                    <SelectBox
                                                        dataSource={editRecord_DuringConfirmationArray}
                                                        rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                        onValueChanged={(e) => formik.setFieldValue('editRecord_DuringConfirmation', e.value)}
                                                        className='selectBox'
                                                        noDataText={t('اطلاعات يافت نشد')}
                                                        itemRender={null}
                                                        placeholder=''
                                                        name='editRecord_DuringConfirmation'
                                                        id='editRecord_DuringConfirmation'
                                                        showClearButton
                                                        searchEnabled
                                                 
                                                    />
                                                    {formik.touched.editRecord_DuringConfirmation && formik.errors.editRecord_DuringConfirmation ? (
                                                        <div className='error-msg'>
                                                            {formik.errors.editRecord_DuringConfirmation}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>‌</span>
                                            </div>
                                            <div className="wrapper">
                                                <div className="divModal" style={{ position: "relative" }}>
                                                    <label className='checkbox-label'>
                                                        <input
                                                            className="form-input"
                                                            type="checkbox"
                                                            id="abilityToEditTheProductLine_DuringConfrimation"
                                                            name="abilityToEditTheProductLine_DuringConfrimation"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.abilityToEditTheProductLine_DuringConfrimation}
                                                        />{t("امکان ویرایش ردیف محصولات (در حین تایید)")}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("ویرایش رکورد(بعد از تایید شدن)")}</span>
                                            </div>
                                            <div className="wrapper">
                                                <div>
                                                    <SelectBox
                                                        dataSource={editRecord_AfterConfirmationArray}
                                                        rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                        onValueChanged={(e) => formik.setFieldValue('editRecord_AfterConfirmation', e.value)}
                                                        className='selectBox'
                                                        noDataText={t('اطلاعات يافت نشد')}
                                                        itemRender={null}
                                                        placeholder=''
                                                        name='editRecord_AfterConfirmation'
                                                        id='editRecord_AfterConfirmation'
                                                        showClearButton
                                                        searchEnabled

                                                    />
                                                    {formik.touched.editRecord_AfterConfirmation && formik.errors.editRecord_AfterConfirmation ? (
                                                        <div className='error-msg'>
                                                            {formik.errors.editRecord_AfterConfirmation}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>‌</span>
                                            </div>
                                            <div className="wrapper">
                                                <div className="divModal" style={{ position: "relative" }}>
                                                    <label className='checkbox-label'>
                                                        <input
                                                            className="form-input"
                                                            type="checkbox"
                                                            id="abilityToEditTheProductLine_AfterConfirmation"
                                                            name="abilityToEditTheProductLine_AfterConfirmation"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.abilityToEditTheProductLine_AfterConfirmation}
                                                        />
                                                        {t("امکان ویرایش ردیف محصولات(بعد از تایید شدن)")}
                                                    </label>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("ویرایش رکورد(بعد از رد شدن)")}</span>
                                            </div>
                                            <div className="wrapper">
                                                <div>
                                                    <SelectBox
                                                        dataSource={editRecord_AfterRejectionArray}
                                                        rtlEnabled={i18n.dir() == "ltr" ? false : true}
                                                        onValueChanged={(e) => formik.setFieldValue('editRecord_AfterRejection', e.value)}
                                                        className='selectBox'
                                                        noDataText={t('اطلاعات يافت نشد')}
                                                        itemRender={null}
                                                        placeholder=''
                                                        name='editRecord_AfterRejection'
                                                        id='editRecord_AfterRejection'
                                                        showClearButton
                                                        searchEnabled
                                                    />
                                                    {formik.touched.editRecord_AfterRejection && formik.errors.editRecord_AfterRejection ? (
                                                        <div className='error-msg'>
                                                            {formik.errors.editRecord_AfterRejection}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>‌</span>
                                            </div>
                                            <div className="wrapper">
                                                <div className="divModal" style={{ position: "relative" }}>
                                                    <label className='checkbox-label'>
                                                        <input
                                                            className="form-input"
                                                            type="checkbox"
                                                            id="abilityToEditTheProductLine_AfterRejection"
                                                            name="abilityToEditTheProductLine_AfterRejection"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.abilityToEditTheProductLine_AfterRejection}
                                                        />{t("امکان ویرایش ردیف محصولات(بعد از رد شدن)")}

                                                    </label>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("کاربر ناظر رکورد(قابلیت ویرایش در تمامی مواقع)")}</span>
                                            </div>
                                            <div className="wrapper">
                                                <div className="divModal">
                                                    <input
                                                        disabled
                                                        className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                        type="text"
                                                        id="userRecordsSupervisor"
                                                        name="userRecordsSupervisor"
                                                        style={{ width: "100%" }}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.userRecordsSupervisor}
                                                    />
                                                    {formik.touched.userRecordsSupervisor && formik.errors.userRecordsSupervisor ? (
                                                        <div className='error-msg'>
                                                            {formik.errors.userRecordsSupervisor}
                                                        </div>
                                                    ) : null}

                                                    <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >
                                                        <UserRecordsSupervisorModal getData={getUserRecordsSupervisorData} />
                                                        <Button><CancelIcon onClick={clearUserRecordsSupervisorField} /></Button>


                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>‌</span>
                                            </div>
                                            <div className="wrapper">
                                                <div className="divModal" style={{ position: "relative" }}>
                                                    <label className='checkbox-label'>
                                                        <input

                                                            className="form-input"
                                                            type="checkbox"
                                                            id="abilityToEditTheProductLine_ForTheUserRecordsSupervisor"
                                                            name="abilityToEditTheProductLine_ForTheUserRecordsSupervisor"

                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.abilityToEditTheProductLine_ForTheUserRecordsSupervisor}
                                                        />{t("امکان ویرایش ردیف محصولات(برای کاربر ناظر)")}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("نقش ناظر رکورد(قابلیت ویرایش در تمامی مواقع)")}</span>
                                            </div>
                                            <div className="wrapper">
                                                <div className="divModal">
                                                    <input
                                                        disabled
                                                        className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                        type="text"
                                                        id="roleOfRecordSupervisor"
                                                        name="roleOfRecordSupervisor"
                                                        style={{ width: "100%" }}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.roleOfRecordSupervisor}
                                                    />
                                                    {formik.touched.roleOfRecordSupervisor && formik.errors.roleOfRecordSupervisor ? (
                                                        <div className='error-msg'>
                                                            {formik.errors.roleOfRecordSupervisor}
                                                        </div>
                                                    ) : null}
                                                    <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >
                                                        <RoleOfRecordSupervisorModal getData={getRoleOfRecordSupervisorData} />
                                                        <Button><CancelIcon onClick={clearRoleOfRecordSupervisorField} /></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>‌</span>
                                            </div>
                                            <div className="wrapper">
                                                <div className="divModal" style={{ position: "relative" }}>
                                                    <label className='checkbox-label'>
                                                        <input

                                                            className="form-input"
                                                            type="checkbox"
                                                            id="abilityToEditTheProductLine_RoleOfRecordSupervisor"
                                                            name="abilityToEditTheProductLine_RoleOfRecordSupervisor"

                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.abilityToEditTheProductLine_RoleOfRecordSupervisor}
                                                        />
                                                        {t("امکان ویرایش ردیف محصولات(برای نقش ناظر)")}
                                                    </label>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>{t("تیم ناظر رکورد(قابلیت ویرایش در تمامی مواقع)")}</span>
                                            </div>
                                            <div className="wrapper">
                                                <div className="divModal">
                                                    <input
                                                        disabled
                                                        className={`form-input modal-input ${i18n.dir()==='ltr'?'ltr':''}`}
                                                        type="text"
                                                        id="theRecordMonitoringTeam"
                                                        name="theRecordMonitoringTeam"
                                                        style={{ width: "100%" }}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.theRecordMonitoringTeam}
                                                    />
                                                    {formik.touched.theRecordMonitoringTeam && formik.errors.theRecordMonitoringTeam ? (
                                                        <div className='error-msg'>
                                                            {formik.errors.roleOfRecordSupervisor}
                                                        </div>
                                                    ) : null}
                                                    <div className={`modal-action-button  ${i18n.dir() == "ltr" ? 'action-ltr' : ''}`} >
                                                        <TheRecordMonitoringTeamModal getData={getTheRecordMonitoringTeamData} />
                                                        <Button><CancelIcon onClick={clearTheRecordMonitoringTeamField} /></Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="content col-lg-6 col-md-6 col-xs-12">
                                            <div className="title">
                                                <span>‌</span>
                                            </div>
                                            <div className="wrapper">
                                                <div className="divModal">
                                                    <label className='checkbox-label'>
                                                        <input

                                                            className="form-input"
                                                            type="checkbox"
                                                            id="abilityToEditTheProductLine_ForTheRecordMonitoringTeam"
                                                            name="abilityToEditTheProductLine_ForTheRecordMonitoringTeam"

                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.abilityToEditTheProductLine_ForTheRecordMonitoringTeam}
                                                        />
                                                        {t("امکان ویرایش ردیف محصولات(برای تیم ناظر رکورد)")}
                                                    </label>
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
                                                        id="description"
                                                        name="description"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.description}
                                                    />
                                                    {formik.touched.description && formik.errors.description ? (
                                                        <div className='error-msg'>
                                                            {formik.errors.description}
                                                        </div>
                                                    ) : null}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <div className="button-pos">
                            <button
                                id="submit"
                                type="button"
                                      onClick={formik.handleSubmit}
                                className="btn btn-success"
                            >
                                {t("ثبت")}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default NewConfrimation;
