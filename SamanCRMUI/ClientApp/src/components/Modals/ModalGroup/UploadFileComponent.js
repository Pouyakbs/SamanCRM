
import React, { useState, useEffect } from "react";
import UploadFile from "../../UploadComponent/UploadFile";
import { useTranslation } from "react-i18next";
import { SelectBox } from 'devextreme-react/select-box';



export const UploadFileComponent = () => {



    const [fileList,setFileList]=useState([])
    const [uploadError,setUploadError]=useState(false)
    
    useEffect(()=>{
        if(fileList.length){
            setUploadError(false)
        }
    },[fileList])


    function updateFileList(list) {
        setFileList(list)
    }

    const { t, i18n } = useTranslation();

  return (
 <>



 <h4>
               CSV{t("وارد کردن ردیف محصولات از طریق فایل") }
 </h4>
    <UploadFile
                title={t("بارگذاری فایل")}
                multiple={true}
                uploadError={uploadError}
                updateFileList={updateFileList}
                //accept={".png , .jpeg, .gif, .jpg, .bmp"}
            />

            <button
                id="submit"
                onClick={()=>{
                    if(!fileList.length){
                        setUploadError(true)
                    }
                }}
                type="button"
                className="btn btn-success"
            >
                {t("ارسال فایل")}
            </button>

 </>
  )
}
