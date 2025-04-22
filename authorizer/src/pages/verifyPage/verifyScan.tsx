import { Box, Typography, Button, IconButton, Tooltip } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { VerifyListing } from "../../../../types";
import { fetchListings, updateListingStatus } from "../../network/listings";
export default function VerifyScanPage() {
  const viewerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [listings, setListings] = useState<VerifyListing[]>([]);
  const listing = listings.find((l) => l.id === Number(id));
  const [status, setStatus] = useState<VerifyListing["status"]>("pending");

  useEffect(() => {
    fetchListings()
      .then((all) => {
        setListings(all);
        const found = all.find((l: { id: number }) => l.id === Number(id));
        if (found) setStatus(found.status);
      })
      .catch((err) => console.error("Error loading listings:", err));
  }, [id]);
  
  useEffect(() => {
    if (viewerRef.current) {
      viewerRef.current.innerHTML = `
        <model-viewer
          src="/models/4_21_2025.glb"
          alt="3D scan"
          auto-rotate
          camera-controls
          environment-image="neutral"
          exposure="0.6"
          shadow-intensity="1"
          shadow-softness="1"
          style="width: 100%; height: 500px"
        ></model-viewer>
      `;
    }
  }, [listings]);
  const handleDecision = async (newStatus: "approved" | "declined") => {
    if (!listing) return;
    setStatus(newStatus);
    try {
      await updateListingStatus(listing.id, newStatus);
      setListings((prev) =>
        prev.map((l) => (l.id === listing.id ? { ...l, status: newStatus } : l))
      );
    } catch (err) {
      console.error("Failed status change", err);
      setStatus("pending");
    }
  };

  if (!listing) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">Listing not found</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          ← Back
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Button onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        ← Back to listings
      </Button>

      <Typography variant="h4" gutterBottom>
        Verify: {listing.title}
      </Typography>

      <div ref={viewerRef} />

      <Box mt={3}>
        <Typography variant="body1" gutterBottom>
          {listing.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${listing.price} / month — Listed on{" "}
          {new Date(listing.startDate).toLocaleDateString()}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" gap={2} mt={4}>
        {status === "pending" ? (
          <>
            <Tooltip title="Approve Listing">
              <IconButton
                onClick={() => handleDecision("approved")}
                color="success"
              >
                <AddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Decline Listing">
              <IconButton
                onClick={() => handleDecision("declined")}
                color="error"
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <Typography>
            Status:{" "}
            <Box
              component="span"
              sx={{
                fontWeight: 600,
                color: status === "approved" ? "green" : "red",
              }}
            >
              {status.toUpperCase()}
            </Box>
          </Typography>
        )}
      </Box>
    </Box>
  );
}
