import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { VerifyListing } from "../../../../types";
import { useNavigate } from 'react-router-dom';

type Props = {
  listing: VerifyListing;
  onStatusChange: (id: number, status: "approved" | "declined") => void;
};

const VerifyCard: React.FC<Props> = ({ listing, onStatusChange }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        onClick={() => navigate(`/scan/${listing.id}`)}
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

        <CardContent sx={{ flexGrow: 1 }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Typography variant="h6">{listing.title}</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {listing.description}
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1" fontWeight={500}>
              ${listing.price} / month
            </Typography>
          </Box>
          <Typography alignItems="end" variant="caption" color="text.secondary" mt={1}>
              Listed on {new Date(listing.startDate).toLocaleDateString()}
            </Typography>
        </CardContent>

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

        {listing.status === "pending" && (
          <Box display="flex" justifyContent="center" gap={2} mt={2} pb={2}>
            <Tooltip title="Approve Listing">
              <IconButton
                onClick={() => onStatusChange(listing.id, "approved")}
                color="success"
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Decline Listing">
              <IconButton
                onClick={() => onStatusChange(listing.id, "declined")}
                color="error"
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Card>
    </>
  );
};

export default VerifyCard;
