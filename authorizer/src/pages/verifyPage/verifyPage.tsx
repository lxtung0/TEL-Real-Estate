import React from "react";
import {
  Typography,
  Grid,
  Box,
  Container,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { VerifyListing } from "./types";
import { mockVerifyListings } from "./mockData";
import VerifyCard from "./verifyCard";

const VerifyPage: React.FC = () => {
  const [listings, setListings] =
    React.useState<VerifyListing[]>(mockVerifyListings);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<
    "all" | "pending" | "approved" | "declined"
  >("all");
  const [sortOrder, setSortOrder] = React.useState<"newest" | "oldest">(
    "newest"
  );

  const handleStatusChange = (id: number, status: "approved" | "declined") => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id ? { ...listing, status } : listing
      )
    );
  };
  const filteredListings = listings
    .filter((listing) =>
      statusFilter === "all" ? true : listing.status === statusFilter
    )
    .filter(
      (listing) =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.startDate);
      const dateB = new Date(b.startDate);
      return sortOrder === "newest"
        ? dateB.getTime() - dateA.getTime()
        : dateA.getTime() - dateB.getTime();
    });
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Verify Listings
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Tabs
          value={statusFilter}
          onChange={(_, newVal) => setStatusFilter(newVal)}
          textColor="primary"
        >
          <Tab label="All" value="all" />
          <Tab label="Pending" value="pending" />
          <Tab label="Approved" value="approved" />
          <Tab label="Declined" value="declined" />
        </Tabs>

        <TextField
          variant="outlined"
          placeholder="Search listings..."
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Select
          value={sortOrder}
          size="small"
          onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </Box>

      <Grid container spacing={4}>
        {filteredListings.map((listing) => (
          <Grid key={listing.id}>
            <VerifyCard listing={listing} onStatusChange={handleStatusChange} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VerifyPage;
