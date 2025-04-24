import React from "react";
import { Typography, Grid } from "@mui/material";
import { UserListing } from "./types";
import UserCard from "./userCard";
import { fetchListings } from "../../network/listings";

const ListingsPage: React.FC = () => {
  const [listings, setListings] = React.useState<UserListing[]>([]);

  React.useEffect(() => {
    fetchListings()
      .then(setListings)
      .catch((err: any) => console.error("Error loading listings:", err));
  }, []);
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Your Listings
      </Typography>
      <Grid container spacing={4}>
        {listings.map((listing) => (
          <Grid key={listing.id}>
            <UserCard listing={listing} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ListingsPage;
