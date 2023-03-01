import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import * as React from "react";
import { useEffect } from "react";
// material-ui
import { Box, List, ListItemIcon, Tooltip, Typography, useTheme } from "@mui/material";
// project import
import NavItem from "./NavItem";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const menu = useSelector((state) => state.reducer.menu);
  const { drawerOpen } = menu;
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const Icon = item.icon;
  const itemIcon = item.icon ? (
    <Icon style={{ fontSize: drawerOpen ? "20px" : "1.25rem" }} />
  ) : (
    false
  );
  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case "item":
        return (
          <>
            <NavItem key={menuItem.id} item={menuItem} level={1} />
          </>
        );
      default:
    }
  });
  console.log(navCollapse)
  const [expanded, setExpanded] = React.useState();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
     <Accordion id={item.id} expanded={expanded === item.id} onChange={handleChange(item.id)} sx={{boxShadow: "unset!important"}} TransitionProps={{ unmountOnExit: true }} disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={item.id}
          id= {item.id}
          sx={{ mb: drawerOpen ? 0.5 : 0, py: 0, zIndex: 0, height: "5px"  , marginBottom: 0 ,"&:hover" : {
              bgcolor: `${theme.palette.background.default}`
            }}}
        >
          {itemIcon && (drawerOpen &&
            <ListItemIcon
              sx={{
                minWidth: 28,
                marginTop: "20px",
                ...(!drawerOpen && {
                  borderRadius: 1.5,
                  width: 30,
                  height: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": {
                    bgcolor: `${theme.palette.background.default}`,
                  },
                }),
              }}
            >
              {itemIcon}
            </ListItemIcon>
          )}
          {!drawerOpen && (
            <Tooltip title={t(item.displayName)} placement="left">
              <ListItemIcon
                sx={{
                  minWidth: 28,
                  ...(!drawerOpen && {
                    borderRadius: 1.5,
                    width: 30,
                    height: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                      bgcolor: `${theme.palette.background.default}`,
                    },
                  }),
                  ...(!drawerOpen &&
                    {
                      bgcolor: `${theme.palette.background.paper}`,
                      "&:hover": {
                        bgcolor: `${theme.palette.background.default}`,
                      },
                    }),
                }}
              >
                {itemIcon}
              </ListItemIcon>
            </Tooltip>
          )

          }
          {item.title && drawerOpen && (
            <Box sx={{ pl: 3, mb: 1.5 }}>
              <Typography
                variant="subtitle2"
                style={{ marginTop: "15px", fontSize: "17px" }}
                color="textSecondary"
              >
                {t(item.displayName)}
              </Typography>
            </Box>
          )}
        </AccordionSummary>
        <AccordionDetails>{navCollapse}</AccordionDetails>
      </Accordion>
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;
