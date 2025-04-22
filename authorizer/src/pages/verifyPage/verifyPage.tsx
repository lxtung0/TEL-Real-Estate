
import React, { useEffect, useState } from "react";
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
import { VerifyListing } from "../../../../types";
import VerifyCard from "./verifyCard";
import { fetchListings, updateListingStatus } from "../../network/listings";

const VerifyPage: React.FC = () => {
  const [listings, setListings] = useState<VerifyListing[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "pending" | "approved" | "declined"
  >("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  useEffect(() => {
    fetchListings()
      .then(setListings)
      .catch((err) => console.error("Error loading listings:", err));
  }, [listings]);

  const handleDecision = async (
    id: number,
    newStatus: "approved" | "declined"
  ) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  
    try {
      await updateListingStatus(id, newStatus);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const filtered = listings
    .filter((l) => (statusFilter === "all" ? true : l.status === statusFilter))
    .filter(
      (l) =>
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const da = new Date(a.startDate).getTime();
      const db = new Date(b.startDate).getTime();
      return sortOrder === "newest" ? db - da : da - db;
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
          onChange={(_, v) => setStatusFilter(v)}
          textColor="primary"
        >
          <Tab label="All" value="all" />
          <Tab label="Pending" value="pending" />
          <Tab label="Approved" value="approved" />
          <Tab label="Declined" value="declined" />
        </Tabs>

        <TextField
          placeholder="Search listings..."
          size="small"
          variant="outlined"
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
          size="small"
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value as "newest" | "oldest")
          }
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </Box>

      <Grid container spacing={4}>
        {filtered.map((listing) => (
          <Grid key={listing.id}>
            <VerifyCard listing={listing} onStatusChange={handleDecision} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VerifyPage;
