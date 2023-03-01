// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { IconButton } from "@mui/material";
import MDBox from "../../../../components/MDBox/index";
import MDTypography from "../../../../components/MDTypography/index";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { IconPencil } from "@tabler/icons";
import AnimateButton from "../../../../components/@extended/AnimateButton";

function EmailsInfoCard({ title, description, action, shadow, icons }) {
  const [selectedIndex, setSelectedIndex] = React.useState();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  // Render the card info items
  const renderItems = icons.map(({ icon, info } , key) => (
    <ListItemButton
      selected={selectedIndex === key}
      onClick={(event) => handleListItemClick(event, key)}
    >
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={info} />
    </ListItemButton>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pt={2}
        px={2}
      >
        <MDTypography
          className="profiletitle"
          variant="h5"
          fontWeight="medium"
          textTransform="capitalize"
        >
          {title}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        {/* <MDBox mb={2} lineHeight={1}>
          <MDTypography variant="button" color="text" fontWeight="light">
            {description}
          </MDTypography>
        </MDBox> */}
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>
          <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            sx={{ width: "100%" }}
          >
            <MDBox display="flex" py={1} pr={2}>
              <List
                component="nav"
                aria-label="main mailbox folders"
                sx={{ width: "100%" }}
              >
                {renderItems}
              </List>
            </MDBox>
          </ButtonGroup>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
EmailsInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
EmailsInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icons: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default EmailsInfoCard;
