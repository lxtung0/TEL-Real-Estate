import React, { useState,useRef } from "react";
import {
  Typography,
  Container,
} from "@mui/material";


const Apply: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

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
    return (<Container sx={{ py: 6 }}>
        <Typography>
            Congratulations on your first step to applying for SureStep
        </Typography>
        <img src="/images/polycam.avif" />

        <div
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            style={{
                border: `2px dashed ${isDragging ? '#1976d2' : '#aaa'}`,
                borderRadius: '12px',
                padding: '40px',
                textAlign: 'center',
                backgroundColor: '#f7faff',
                cursor: 'pointer',
            }}
        >
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />
            <p>Drag & drop files here</p>
            <p style={{ margin: '8px 0' }}>or</p>
            <div
                style={{
                display: 'inline-block',
                padding: '10px 20px',
                borderRadius: '6px',
                backgroundColor: '#1976d2',
                color: '#fff',
                }}
            >
                Upload from Computer
            </div>

            {file && (
                <p style={{ color: 'green', marginTop: '20px' }}>
                ✅ Uploaded: <strong>{file.name}</strong>
                </p>
            )}
        </div>

    </Container>);
}

export default Apply;