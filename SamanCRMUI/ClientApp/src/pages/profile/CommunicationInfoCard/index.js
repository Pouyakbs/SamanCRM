// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import MDBox from "../../../components/MDBox/index";
import MDTypography from "../../../components/MDTypography/index";

function CommunicationInfoCard({ title, info, shadow }) {
  const labels = [];
  const values = [];

  // Convert this form `objectKey` of the object key in to this `object key`
  Object.keys(info).forEach((el) => {
    // if (el.match(/[A-Z\s]+/)) {
    //   const uppercaseLetter = Array.from(el).find((i) => i.match(/[A-Z]+/));
    //   const newElement = el.replace(uppercaseLetter, ` ${uppercaseLetter.toLowerCase()}`);

    //   labels.push(newElement);
    // } else {
    labels.push(el);
    // }
  });

  // Push the object values into the values array
  Object.values(info).forEach((el) => values.push(el));

  // Render the card info items
  const renderItems = labels.map((label, key) => (
    <MDBox key={label} display="flex" py={1} pr={2}>
      <MDTypography
        variant="button"
        fontWeight="bold"
        textTransform="capitalize"
      >
        {label}: &nbsp;
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" color="text">
        &nbsp;{values[key]}
      </MDTypography>
    </MDBox>
  ));

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" , display: "block" , width: "100%" }}>
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
        <MDBox opacity={0.3}>
          <Divider />
        </MDBox>
        <MDBox>
          {renderItems}
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfileInfoCard
CommunicationInfoCard.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfileInfoCard
CommunicationInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  shadow: PropTypes.bool,
};

export default CommunicationInfoCard;
