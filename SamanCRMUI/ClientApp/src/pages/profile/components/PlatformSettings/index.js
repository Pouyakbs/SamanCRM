import { useState, useRef, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";

// Material Dashboard 2 React components
import MDBox from "../../../../components/MDBox";
import { ColorPicker } from "@progress/kendo-react-inputs";
import MDTypography from "../../../../components/MDTypography";
import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from "react-i18next";
import DataSource from "devextreme/data/data_source";
import { SelectBox } from "devextreme-react";
import axios from "axios";
import { useFormik } from "formik";

function PlatformSettings({ getData }) {
  const contactColorPicker = useRef();
  const sessionColorPicker = useRef();
  const dutyColorPicker = useRef();
  const closedColorPicker = useRef();
  const [followsMe, setFollowsMe] = useState(true);
  const [answersPost, setAnswersPost] = useState(false);
  const [mentionsMe, setMentionsMe] = useState(true);
  const [newLaunches, setNewLaunches] = useState(false);
  const [productUpdate, setProductUpdate] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  const [user] = useState(JSON.parse(localStorage.getItem("user")));
  const appConfig = window.globalConfig;
  const { t, i18n } = useTranslation();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const weekDays = [
    { id: 5, value: t("شنبه") },
    { id: 6, value: t("یکشنبه") },
    { id: 0, value: t("دوشنبه") },
    { id: 1, value: t("سه شنبه") },
    { id: 2, value: t("چهارشنبه") },
    { id: 3, value: t("پنجشنبه") },
    { id: 4, value: t("جمعه") },
  ];

  useEffect(() => {
    if (startTime) {
      let t = new Date(startTime);
      getData.values.push({
        variableName: "آغاز ساعت کاری",
        value: `${("0" + t.getHours()).slice(-2)}:${("0" + t.getMinutes()).slice(-2)}`,
        personnelID: user.id,
      });
    }
  }, [startTime]);

  useEffect(() => {
    if (endTime) {
      let t = new Date(endTime);
      getData.values.push({
        variableName: "پایان ساعت کاری",
        value: `${("0" + t.getHours()).slice(-2)}:${("0" + t.getMinutes()).slice(-2)}`,
        personnelID: user.id,
      });
    }
  }, [endTime]);


  const weekDaysDataSource = new DataSource({
    store: {
      type: "array",
      data: weekDays,
      key: "id",
    },
  });
  return (
    <Card sx={{ boxShadow: "none" }}>
      <MDBox p={2}>
        <MDTypography
          className="profiletitle"
          variant="h5"
          fontWeight="medium"
          textTransform="capitalize"
        >
          تنظیمات تقویم
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
        <MDTypography
          variant="caption"
          fontWeight="bold"
          color="text"
          textTransform="uppercase"
        >
          رنگ های تقویم
        </MDTypography>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              تماس ها:
            </MDTypography>
          </MDBox>
          <div className="wrapper">
            <div
              onClick={(e) => {
                let btn =
                  contactColorPicker.current.element.querySelector("button");
                btn.click();
              }}
            >
              <ColorPicker
                onChange={(e) => {
                  getData.values.push({
                    variableName: "رنگ تماس ها",
                    value: e.value,
                    personnelID: user.id,
                  });
                }}
                ref={contactColorPicker}
                name="value"
                id="value"
                // defaultValue={selectedColor}
                view="gradient"
              />
            </div>
          </div>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              وظایف:
            </MDTypography>
          </MDBox>
          <div className="wrapper">
            <div
              onClick={(e) => {
                let btn =
                  sessionColorPicker.current.element.querySelector("button");
                btn.click();
              }}
            >
              <ColorPicker
                ref={sessionColorPicker}
                onChange={(e) => {
                  getData.values.push({
                    variableName: "رنگ جلسات",
                    value: e.value,
                    personnelID: user.id,
                  });
                }}
                name="Color"
                id="Color"
                // defaultValue={selectedColor}
                view="gradient"
              />
            </div>
          </div>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              جلسات:
            </MDTypography>
          </MDBox>
          <div className="wrapper">
            <div
              onClick={(e) => {
                let btn =
                  dutyColorPicker.current.element.querySelector("button");
                btn.click();
              }}
            >
              {/* <ColorPicker ref={colorPicker3} name="Color" id="Color" value={formik.values.Color}  onChange={(e)=>{
                    formik.setFieldValue('Color',e.value)
                }}
                defaultValue={selectedColor}
                paletteSettings={paletteSettings}
                           />       */}
              <ColorPicker
                ref={dutyColorPicker}
                onChange={(e) => {
                  getData.values.push({
                    variableName: "رنگ وظایف",
                    value: e.value,
                    personnelID: user.id,
                  });
                }}
                name="Color"
                id="Color"
                // defaultValue={selectedColor}
                view="gradient"
              />
            </div>
          </div>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              روز های تعطیل:
            </MDTypography>
          </MDBox>
          <div className="wrapper">
            <div
              onClick={(e) => {
                let btn =
                  closedColorPicker.current.element.querySelector("button");
                btn.click();
              }}
            >
              {/* <ColorPicker ref={colorPicker3} name="Color" id="Color" value={formik.values.Color}  onChange={(e)=>{
                    formik.setFieldValue('Color',e.value)
                }}
                defaultValue={selectedColor}
                paletteSettings={paletteSettings}
                           />       */}
              <ColorPicker
                ref={closedColorPicker}
                onChange={(e) => {
                  getData.values.push({
                    variableName: "رنگ روز های تعطیل",
                    value: e.value,
                    personnelID: user.id,
                  });
                }}
                name="Color"
                id="Color"
                // defaultValue={selectedColor}
                view="gradient"
              />
            </div>
          </div>
        </MDBox>
      </MDBox>
      <MDBox pt={1} pb={2} px={2} lineHeight={1.25}>
        <MDTypography
          variant="caption"
          fontWeight="bold"
          color="text"
          textTransform="uppercase"
        >
          تنظیمات زمان
        </MDTypography>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox width="80%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              ساعات کاری:
            </MDTypography>
          </MDBox>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              ampm={false}
              className="time-picker"
              views={["hours", "minutes"]}
              inputFormat="HH:mm"
              id="time"
              name="time"
              mask="__:__"
              value={startTime}
              onChange={(newValue) => {
                setStartTime(newValue);
              }}
              renderInput={(params) => <TextField {...params}></TextField>}
            />
          </LocalizationProvider>
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            margin="0 10px"
          >
            الی
          </MDTypography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              ampm={false}
              className="time-picker"
              views={["hours", "minutes"]}
              inputFormat="HH:mm"
              id="time"
              name="time"
              mask="__:__"
              value={endTime}
              onChange={(newValue) => {
                setEndTime(newValue);
              }}
              renderInput={(params) => <TextField {...params}></TextField>}
            />
          </LocalizationProvider>
        </MDBox>
        <MDBox display="flex" alignItems="center" mb={0.5} ml={-1.5}>
          <MDBox width="100%" ml={0.5}>
            <MDTypography variant="button" fontWeight="regular" color="text">
              اولین روز هفته:
            </MDTypography>
            <SelectBox
              dataSource={weekDaysDataSource}
              rtlEnabled={i18n.dir() == "ltr" ? false : true}
              onValueChanged={(e) => {
                console.log(e)
                getData.values.push({
                  variableName: "اولین روز هفته",
                  value: JSON.stringify(e.value.id),
                  personnelID: user.id,
                });
              }}
              className="selectBox"
              noDataText={t("اطلاعات یافت نشد")}
              itemRender={null}
              placeholder=""
              name="type"
              id="type"
              defaultValue={weekDays[0]}
              displayExpr="value"
            />
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default PlatformSettings;
