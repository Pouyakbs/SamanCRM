// material-ui
import { Box, Typography } from "@mui/material";

// project import
import NavGroup from "./NavGroup";
import * as icons from "@ant-design/icons";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import menuItem from "../../../../../menu-items";
import NavSuperGroup from "./NavSuperGroup";
import NavMegaGroup from "./NavMegaGroup";
import NavItem from "./NavItem";
import axios from "axios";
import { useEffect, useState } from "react";

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const [datasource, setDataSource] = useState([]);
  const appConfig = window.globalConfig;
  const MuiIcons = {
    GroupsOutlinedIcon,
    EmojiEventsOutlinedIcon,
    SupportAgentOutlinedIcon,
    Inventory2OutlinedIcon,
    HandshakeOutlinedIcon,
  };
  useEffect(() => {
    console.log("miam");
    const menus = JSON.parse(localStorage.getItem("user"));
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
              icon:
                icons[item.icon] == null
                  ? MuiIcons[item.icon]
                  : icons[item.icon],
              children: t.map((childItem) => ({
                id: childItem.id,
                title: childItem.displayName,
                type: childItem.type,
                url: childItem.routeName,
                icon:
                  icons[childItem.icon] == null
                    ? MuiIcons[childItem.icon]
                    : icons[childItem.icon],
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
          breadcrumbs: item.breadCrumbs,
        }));
        items.push(...MegaGroup);
        setDataSource(items);
      });
    } else {
      const arrayToTree = (arr, parent = 0) =>
        arr
          .filter((item) => item.parentID === parent)
          .map((child) => ({
            ...child,
            icon:
              icons[child.icon] == null
                ? MuiIcons[child.icon]
                : icons[child.icon],
            children: arrayToTree(arr, child.id),
          }));
      setDataSource(arrayToTree(menus.programParts));
    }
  }, []);

  const navGroups = datasource.map((item) => {
    switch (item.type) {
      case "item":
        return <NavItem key={item.id} item={item} level={1} />;
      case "group":
        return <NavGroup key={item.id} item={item} />;
      case "SuperGroup":
        return <NavSuperGroup key={item.id} item={item} />;
      case "MegaGroup":
        return <NavMegaGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
