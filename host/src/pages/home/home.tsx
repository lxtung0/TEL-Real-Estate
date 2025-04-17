import React from "react";
import { Button, Typography, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", py: 8 }}>
      <Typography variant="h3" gutterBottom>
        List Your Property with Confidence
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Our platform helps property owners verify their listings for accessibility, safety, and authenticity.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        component={Link}
        to="/listings"
      >
        Verify Your Listing
      </Button>
    </Container>
  );
};

export default Home;
