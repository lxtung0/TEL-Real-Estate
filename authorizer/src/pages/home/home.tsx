import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Container, Button, CardMedia } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchListings } from "../../network/listings";
import { VerifyListing } from "../../../../types";

const Home: React.FC = () => {
  const [listings, setListings] = useState<VerifyListing[]>([]);

  useEffect(() => {
    fetchListings()
      .then(setListings)
      .catch((err) => console.error("Error loading listings:", err));
  }, []);

  const carouselSettings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Container maxWidth="md" sx={{ mx: "auto", px: 2, mt: 4, mb: 6 }}>
      {/* Hero + Statement Goal */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" gutterBottom>
          List Your Property with Confidence
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Our goal is to make finding and verifying accessible homes effortless for everyone.
        </Typography>
        <Button
          component={RouterLink}
          to="/verify"
          variant="contained"
          size="large"
          sx={{ mt: 4 }}
        >
          Verify Your Listing
        </Button>
      </Box>

      {/* Image Carousel */}
      {listings.length > 0 && (
        <Slider {...carouselSettings}>
          {listings.map((l) => (
            <Box key={l.id} px={1}>
              <CardMedia
                component="img"
                image={l.imageUrl}
                alt={l.title}
                sx={{
                  height: 300,
                  objectFit: "cover",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
              <Typography variant="subtitle1" align="center" sx={{ mt: 1 }}>
                {l.title}
              </Typography>
            </Box>
          ))}
        </Slider>
      )}
    </Container>
  );
};

export default Home;
