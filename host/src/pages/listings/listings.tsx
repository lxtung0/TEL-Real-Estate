import React from "react";
import { Typography, Grid } from "@mui/material";
import { UserListing } from "./types";
import UserCard from "./userCard";
import { mockVerifyListings } from "./mockData";

const ListingsPage: React.FC = () => {
  const [listings, setListings] =
    React.useState<UserListing[]>(mockVerifyListings);

  React.useEffect(() => {
    setListings(mockVerifyListings);
  }, [listings]);

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
