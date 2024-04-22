// src/FileUpload.js

import axios from 'axios';
import React, { useState } from 'react';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [downloadLink, setDownloadLink] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setDownloadLink(response.data.downloadLink);
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    setUploading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {downloadLink && (
        <p>
          File uploaded! You can download it from{' '}
          <a href={downloadLink} target="_blank" rel="noopener noreferrer">
            here
          </a>
          .
        </p>
      )}
    </div>
  );
};

export default FileUpload;
