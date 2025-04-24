import React, { useState, useRef } from "react";
import { Typography, Container, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Apply: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Congratulations on your first step to applying for SureStep
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <img
          src="/images/polycam.avif"
          alt="Scan preview"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>

      <Box
        onClick={() => inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        sx={{
          border: `2px dashed ${isDragging ? "#1976d2" : "#aaa"}`,
          borderRadius: 2,
          p: 5,
          textAlign: "center",
          backgroundColor: "#f7faff",
          cursor: "pointer",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
        <Typography variant="body1">Drag & drop files here</Typography>
        <Typography variant="body1" sx={{ my: 1 }}>
          or
        </Typography>
        <Box
          component="span"
          sx={{
            px: 3,
            py: 1,
            borderRadius: 1,
            backgroundColor: "#1976d2",
            color: "#fff",
            display: "inline-block",
          }}
        >
          Upload from Computer
        </Box>

        {file && (
          <Typography variant="body2" color="success.main" sx={{ mt: 2 }}>
            ✅ Uploaded: <strong>{file.name}</strong>
          </Typography>
        )}
      </Box>

      <Box textAlign="center" mt={4}>
        <Button
          variant="contained"
          disabled={!file}
          onClick={() => navigate(`/apply`)}
        >
          Apply Now
        </Button>
      </Box>
    </Container>
  );
};

export default Apply;
