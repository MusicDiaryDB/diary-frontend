import React from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import "../assets/css/pages/Landing.css";

const LandingPage: React.FC = () => {
  return (
    <Container className="landing-page" maxWidth="lg">
      <Box className="content" textAlign="center">
        <Typography variant="h2" component="h1" className="headline">
          Welcome to Music Diary
        </Typography>
        <Typography variant="h4" component="h2" className="subheadline">
          Track your musical journey and share your experiences with friends.
        </Typography>

        <Box mt={4}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            size="large"
            className="cta-button"
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;
