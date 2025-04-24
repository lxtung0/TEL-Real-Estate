import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserListing } from "./types";
import { useNavigate } from "react-router-dom";

type Props = {
  listing: UserListing;
};

const UserCard: React.FC<Props> = ({ listing }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: 420,
        width: 350,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <CardMedia
        component="img"
        image={listing.imageUrl}
        alt={listing.title}
        sx={{
          height: 180,
          objectFit: "cover",
        }}
      />
      {/* Actions */}
      <Box justifyContent="space-between" px={2} py={1}>
        <Tooltip title="Edit Listing">
          <IconButton onClick={() => navigate(`/edit/${listing.id}`)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Listing">
          <IconButton onClick={() => console.log('delete', listing.id)}>
            <DeleteIcon  />
          </IconButton>
        </Tooltip>
        {/* <Button size="small" onClick={() => navigate(`/view/${listing.id}`)}> */}
        <Button size="small" onClick={() => navigate(`/apply`)}>
          View
        </Button>
      </Box>
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <Typography variant="h6">{listing.title}</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" mb={2} noWrap>
          {listing.description}
        </Typography>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <Typography variant="body1" fontWeight={500}>
            ${listing.price} / month
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          Listed on {new Date(listing.startDate).toLocaleDateString()}
        </Typography>
      </CardContent>

      {/* Status Badge */}
      <Box
        sx={{
          position: "absolute",
          top: 8,
          left: 8,
          backgroundColor:
            listing.status === "approved"
              ? "green"
              : listing.status === "declined"
              ? "red"
              : "orange",
          color: "white",
          borderRadius: "16px",
          px: 1.5,
          py: 0.5,
          fontSize: "0.75rem",
          fontWeight: 500,
          textTransform: "capitalize",
        }}
      >
        {listing.status.toUpperCase()}
      </Box>

      {/* Status Icon */}
      {listing.status !== "pending" && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: listing.status === "approved" ? "green" : "red",
            color: "white",
            borderRadius: "50%",
            width: 32,
            height: 32,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {listing.status === "approved" ? "✓" : "✕"}
        </Box>
      )}
    </Card>
  );
};

export default UserCard;
