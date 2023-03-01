import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Grid, Toolbar, useMediaQuery } from "@mui/material";

// project import
import Drawer from "./Drawer";
import Header from "./Header";
import * as icons from '@ant-design/icons';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import axios from "axios";
import navigation from "../../menu-items";
import Breadcrumbs from "../../components/@extended/Breadcrumbs";

// types
import { openDrawer } from "../../store/reducers/menu";
import { useTranslation } from "react-i18next";
import AuthFooter from "../../components/cards/AuthFooter";

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const [datasource, setDataSource] = useState([]);
  console.log(datasource)
  const appConfig = window.globalConfig;
  const MuiIcons = {
    GroupsOutlinedIcon,
    EmojiEventsOutlinedIcon,
    SupportAgentOutlinedIcon,
    Inventory2OutlinedIcon,
    HandshakeOutlinedIcon
  }
  const matchDownLG = useMediaQuery(theme.breakpoints.down("xl"));
  const dispatch = useDispatch();

  const { drawerOpen } = useSelector((state) => state.reducer.menu);
  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(openDrawer({ drawerOpen: !matchDownLG }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);
  useEffect(() => {
    const menus = JSON.parse(localStorage.getItem('user'));
    if (menus == undefined) {
      axios.get(`${appConfig.BaseURL}/api/ProgramPart`).then((res) => {
        let temp = res.data.data.filter((a) => a.type == "MegaGroup");
        let child = res.data.data.filter((a) => a.type == "item");
        let item = res.data.data.filter(
          (a) => a.type == "item" && a.parentID == 0
        );
        const MegaGroup = temp.map((item) => {
          if (child.filter((f) => f.parentID === item.id)) {
            let t = child.filter((f) => f.parentID === item.id);
            return {
              id: item.id,
              title: item.displayName,
              type: item.type,
              icon: icons[item.icon] == null ? MuiIcons[item.icon] : icons[item.icon],
              children: t.map((childItem) => ({
                id: childItem.id,
                title: childItem.displayName,
                type: childItem.type,
                url: childItem.routeName,
                icon: icons[childItem.icon] == null ? MuiIcons[childItem.icon] : icons[childItem.icon],
                breadcrumbs: childItem.breadCrumbs,
              })),
            };
          }
        });
        const items = item.map((item) => ({
          id: item.id,
          title: item.displayName,
          type: item.type,
          url: item.routeName,
          icon: icons[item.icon],
          breadcrumbs: item.breadCrumbs == "true" ? true : false,
        }));
        items.push(...MegaGroup);
        setDataSource(items);
      });
    }
    else {
      let temp = menus.programParts.filter((a) => a.type == "MegaGroup");
      let child = menus.programParts.filter((a) => a.type == "item");
      let item = menus.programParts.filter(
        (a) => a.type == "item" && a.parentID == 0
      );
      const MegaGroup = temp.map((item) => {
        if (child.filter((f) => f.parentID === item.id)) {
          let t = child.filter((f) => f.parentID === item.id);
          return {
            id: item.id,
            title: item.displayName,
            type: item.type,
            icon: icons[item.icon] == null ? MuiIcons[item.icon] : icons[item.icon],
            children: t.map((childItem) => ({
              id: childItem.id,
              title: childItem.displayName,
              type: childItem.type,
              url: childItem.routeName,
              icon: icons[childItem.icon] == null ? MuiIcons[childItem.icon] : icons[childItem.icon],
              breadcrumbs: childItem.breadCrumbs == "true" ? true : false,
            })),
          };
        }
      });
      const items = item.map((item) => ({
        id: item.id,
        title: item.displayName,
        type: item.type,
        url: item.routeName,
        icon: icons[item.icon],
        breadcrumbs: item.breadCrumbs == "true" ? true : false,
      }));
      items.push(...MegaGroup);
      setDataSource(items);
    }
  }, []);
  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);
  const { t, i18n } = useTranslation();
  return (
    <>
    {i18n.language === "en" ? (
      <Box sx={{ display: "fixed", width: "100%", direction:"ltr" }}>
        <Header open={open} handleDrawerToggle={handleDrawerToggle} />
        <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
        <Box
          component="main"
          sx={{ width: "100%", flexGrow: 1, p: { xs: 2, sm: 3 } }}
        >
          <Toolbar />
          <Breadcrumbs
            navigation={navigation}
            title
            titleBottom
            card={false}
            divider={false}
          />
          <div className="pageContent">
          <Outlet />
        </div>
          <Grid item xs={12} sx={{ mt: 5 }}>
            <AuthFooter />
          </Grid>
        </Box>
      </Box>
      ) : (
        <Box sx={{ display: "fixed", width: "100%", direction:"rtl" }}>
        <Header open={open} handleDrawerToggle={handleDrawerToggle} />
        <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
        <Box
          component="main"
          sx={{ width: "100%", flexGrow: 1, p: { xs: 2, sm: 3 } }}
        >
          <Toolbar />
          <Breadcrumbs
            navigation={navigation}
            title
            titleBottom
            card={false}
            divider={false}
          />
          <div className="pageContent">
          <Outlet />
          </div>
          <Grid item xs={12} sx={{ mt: 5 }}>
                <AuthFooter />
            </Grid>
        </Box>
      </Box>
      )}
    </>
  );
};

export default MainLayout;
