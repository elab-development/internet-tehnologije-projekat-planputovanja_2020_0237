import React from 'react';


const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://127.0.0.1:8000/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('File uploaded successfully');
    } else {
      console.error('Error uploading file');
    }
  } catch (error) {
    console.error('Error uploading file', error);
  }
};

const FileUpload = ({ onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
      onUpload(file);
    }
  };

  return (
    <div style={dropzoneStyles}>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #ccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  color: '#007bff',
};

export default FileUpload;