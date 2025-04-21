import { Box, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';

export default function VerifyScanPage() {
  const viewerRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Viewing 3D Scan
      </Typography>
      <div ref={viewerRef} />
    </Box>
  );
}