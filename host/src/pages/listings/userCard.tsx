import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  CardActions,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserListing } from "./types";

type Props = {
  listing: UserListing;
};

const UserCard: React.FC<Props> = ({ listing }) => {
  return (
    <>
      <Card
        sx={{
          height: 420,
          width: 350,
          borderRadius: 5,
          boxShadow: 5,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          backgroundColor: "white",
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
        <CardActions disableSpacing sx={{paddingBottom: "0px"}}>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
          <Button size="small" >View</Button>
        </CardActions>

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
          <Typography
            alignItems="end"
            variant="caption"
            color="text.secondary"
            mt={1}
          >
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
      </Card>
    </>
  );
};

export default UserCard;
