// server/server.js

const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

app.use(fileUpload());

// Serve static files from the 'uploads' directory
app.use(express.static(path.join(__dirname, 'uploads')));

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFile = req.files.file;
  const fileName = uploadedFile.name;

  // Move the uploaded file to the 'uploads' directory
  uploadedFile.mv(path.join(__dirname, 'uploads', fileName), (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    // Send back the download link
    const downloadLink = `/uploads/${fileName}`;
    res.json({ downloadLink });
 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));