// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import { IconButton } from "@mui/material";
import MDBox from "../../../components/MDBox/index";
import MDTypography from "../../../components/MDTypography/index";
import colors from "../../../assets/base/colors";
import typography from "../../../assets/base/typography";
import { IconPencil } from "@tabler/icons";
import AnimateButton from "../../../components/@extended/AnimateButton";

function LeaveInfoCard({ title, description, shadow }) {
  const labels = [];
  const values = [];


  // Render the card info items
//   const renderItems = labels.map((label, key) => (
//     <MDBox key={label} display="flex" py={1} pr={2}>
//       <MDTypography
//         variant="button"
//         fontWeight="bold"
//         textTransform="capitalize"
//       >
//         {label}: &nbsp;
//       </MDTypography>
//       <MDTypography variant="button" fontWeight="regular" color="text">
//         &nbsp;{values[key]}
//       </MDTypography>
//     </MDBox>
//   ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none", width: "100%" }}>
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
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
LeaveInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
LeaveInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  shadow: PropTypes.bool,
};

export default LeaveInfoCard;
