import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Container,
  Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessibleIcon from "@mui/icons-material/Accessible";
import ShowerIcon from "@mui/icons-material/Shower";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import ElevatorIcon from "@mui/icons-material/Elevator";

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  features: {
    wheelchairAccess?: boolean;
    rollInShower?: boolean;
    accessibleParking?: boolean;
    elevator?: boolean;
  };
}

const mockListings: Listing[] = [
  {
    id: 1,
    title: "Cozy Apartment in the City",
    description: "A beautiful and cozy apartment located in the heart of the city.",
    price: 1200,
    imageUrl: "/images/listing1.avif",
    features: {
      wheelchairAccess: true,
      rollInShower: true,
      accessibleParking: false,
      elevator: true,
    },
  },
  {
    id: 2,
    title: "Spacious Suburban Home",
    description: "A large home with a backyard, perfect for families.",
    price: 2500,
    imageUrl: "https://via.placeholder.com/300x200",
    features: {
      wheelchairAccess: false,
      rollInShower: false,
      accessibleParking: true,
      elevator: false,
    },
  },
  {
    id: 3,
    title: "Modern Studio",
    description: "A sleek and modern studio apartment.",
    price: 900,
    imageUrl: "https://via.placeholder.com/300x200",
    features: {
      wheelchairAccess: true,
      rollInShower: false,
      accessibleParking: true,
      elevator: true,
    },
  },
];

const ListingsPage: React.FC = () => {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Listings
      </Typography>
      <Grid container spacing={4}>
        {mockListings.map((listing) => (
          <Grid key={listing.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={listing.imageUrl}
                alt={listing.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <HomeIcon color="primary" />
                  <Typography variant="h6">{listing.title}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {listing.description}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <AttachMoneyIcon color="action" />
                  <Typography variant="body1" fontWeight={500}>
                    ${listing.price} / month
                  </Typography>
                </Box>

                {/* Accessibility Features */}
                <Box display="flex" gap={1} mt={2} flexWrap="wrap">
                  {listing.features.wheelchairAccess && (
                    <Tooltip title="Wheelchair Accessible">
                      <AccessibleIcon color="success" />
                    </Tooltip>
                  )}
                  {listing.features.rollInShower && (
                    <Tooltip title="Roll-in Shower">
                      <ShowerIcon color="primary" />
                    </Tooltip>
                  )}
                  {listing.features.accessibleParking && (
                    <Tooltip title="Accessible Parking">
                      <LocalParkingIcon color="info" />
                    </Tooltip>
                  )}
                  {listing.features.elevator && (
                    <Tooltip title="Elevator Available">
                      <ElevatorIcon color="secondary" />
                    </Tooltip>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListingsPage;
