import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { SelectBox } from "devextreme-react";
import swal from "sweetalert";
// material-ui
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Link,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

// third party
import * as Yup from "yup";

// project import
import FirebaseSocial from "./FirebaseSocial";
import AnimateButton from "../../../components/@extended/AnimateButton";
import {
  strengthColor,
  strengthIndicator,
} from "../../../utils/password-strength";

// assets
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { history } from "../../../utils/history";

// ============================|| FIREBASE - REGISTER ||============================ //

const AuthRegister = () => {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [datasource, setDataSource] = useState([]);
  const [result, setResult] = useState("");
  const { t, i18n } = useTranslation();
  const appConfig = window.globalConfig;
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    // redirect to home if already logged in
    if (result.succeeded == true) history.navigate("/Login");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };
  useEffect(() => {
    axios
      .get(`${appConfig.BaseURL}/api/Personnel`)
      .then((res) => setDataSource(res.data.data));
  }, []);
  useEffect(() => {
    changePassword("");
  }, []);
  const callComponent = () => {
    history.navigate(
      `/`
    );
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      personnelID: 0,
      submit: null,
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().max(255).required("?????? ???????????? ????????????????"),
      password: Yup.string().max(255).required("?????? ???????? ????????????????"),
      personnelID: Yup.number().required("???????????? ?????????? ????????????????"),
    }),
    onSubmit: async (values, { setErrors, setStatus, setSubmitting }) => {
      let isSuccess = false
      axios
        .post(`${appConfig.BaseURL}/api/authenticate/register/`, values)
        .then((res) => {
          setResult(res.data)
          isSuccess = true
        }).finally(() => {
          if(isSuccess = true) {
            UserSub()
            history.navigate(`/`)
          }
        })
    },
  });
  const UserSub = () => {
    swal({
      title: t("?????????? ???? ???????????? ?????? ????"),
      icon: "success",
      button: t("????????"),
    });
  };
  return (
    <>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={3} style={{ direction: "rtl" }}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="username-signup">?????? ????????????</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(
                  formik.touched.username && formik.errors.username
                )}
                id="username-signup"
                value={formik.values.username}
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="???????? ???????? ???????? ????????"
                inputProps={{}}
              />
              {formik.touched.username && formik.errors.username && (
                <FormHelperText error id="helper-text-username-signup">
                  {formik.errors.username}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="password-signup">?????? ????????</InputLabel>
              <OutlinedInput
                fullWidth
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                id="password-signup"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                name="password"
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.handleChange(e);
                  changePassword(e.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? (
                        <EyeOutlined />
                      ) : (
                        <EyeInvisibleOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                placeholder="******"
                inputProps={{}}
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText error id="helper-text-password-signup">
                  {formik.errors.password}
                </FormHelperText>
              )}
            </Stack>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Box
                    sx={{
                      bgcolor: level?.color,
                      width: 85,
                      height: 8,
                      borderRadius: "7px",
                    }}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" fontSize="0.75rem">
                    {level?.label}
                  </Typography>
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel htmlFor="username-signup">??????????</InputLabel>
              <SelectBox
                dataSource={datasource}
                rtlEnabled={i18n.dir() == "ltr" ? false : true}
                onValueChanged={(e) =>
                  formik.setFieldValue("personnelID", e.value)
                }
                className="selectBox"
                valueExpr="personnelID"
                displayExpr="surname"
                noDataText="?????????????? ???????? ??????"
                itemRender={null}
                placeholder=""
                name="personnelID"
                id="personnelID"
                searchEnabled
                showClearButton
                //defaultValue={nickName[0]}       ???????? ???????? ?????????? ??????????
              />
              {formik.touched.personnelID && formik.errors.personnelID && (
                <FormHelperText error id="helper-text-personnelID-signup">
                  {formik.errors.personnelID}
                </FormHelperText>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              ???????????? ???? ???? &nbsp;
              <Link variant="subtitle2" component={RouterLink} to="#">
                ???????????? ????
              </Link>
              &nbsp; ?? &nbsp;
              <Link variant="subtitle2" component={RouterLink} to="#">
                ?????????? ?????? ???????? ??????????
              </Link>
            </Typography>
          </Grid>
          {formik.errors.submit && (
            <Grid item xs={12}>
              <FormHelperText error>{formik.errors.submit}</FormHelperText>
            </Grid>
          )}
          <Grid item xs={12}>
            <AnimateButton>
              <Button
                disableElevation
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="button"
                onClick={formik.handleSubmit}
                variant="contained"
                color="primary"
              >
                ???????? ????????
              </Button>
            </AnimateButton>
            <AnimateButton>
              <Button
                disableElevation
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="button"
                onClick={callComponent}
                variant="contained"
                color="error"
              >
                ????????????
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AuthRegister;
